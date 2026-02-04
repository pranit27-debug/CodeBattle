import express from 'express';
import { Request, Response } from 'express';
import { Server } from 'socket.io';
import createServer from "http";
import serverConfig from './config/server.config';
import redisConnection from './config/redisConnection';
import bodyParser from 'body-parser';
import { StatusCodes } from 'http-status-codes';
import cors from 'cors';



const app = express();
app.use(cors)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const httpServer = createServer.createServer(app);

const io = new Server(httpServer, {
  cors: {
	origin: serverConfig.origin,
	methods: ["GET", "POST"],
	allowedHeaders: ["Content-Type"],
	credentials: true,
  },
});

const redisCache = redisConnection;

io.on("connection", (socket) => {
    console.log("A user connected " + socket.id);

    socket.on("setUserId", async (userId) => {
		const existingSocketId = await redisCache.get(userId);
		if (existingSocketId) {
			console.log("UserId already exists, removing old socket.id", existingSocketId);
			await redisCache.del(userId);
		}
        console.log("Mapping userId", userId, "to socket.id", socket.id);
        await redisCache.set(userId, socket.id,);
    });

    socket.on('getConnectionId', async (userId) => {
        const connId = await redisCache.get(userId);
        console.log("Getting connection id for user id", userId, connId);
        socket.emit('connectionId', connId);
        const everything = await redisCache.keys('*');
        console.log("All Redis Keys:", everything);
    });

    socket.on("disconnect", async () => {
        console.log(`User disconnected ${socket.id}`);
        const keys = await redisCache.keys('*');
        for (const key of keys) {
            const id = await redisCache.get(key);
            if (id === socket.id) {
                await redisCache.del(key);
                console.log(`Removed mapping for user ${key}`);
            }
        }
    });
});

app.get('/sendPayload', async (req:Request, res:Response) => {

    const { topic , userId , ...payload } = req.body;

    console.log("Received payload for topic:", topic, "with userId:", userId, "and payload:", payload);

    if (!topic || !payload || !userId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Missing topic, payload or userId' });
    }

    const socketId = await redisCache.get(userId);

    if(socketId){
        io.to(socketId).emit(topic, payload);
        return res.status(StatusCodes.OK).json({ message: 'Payload sent successfully' });
    }else{
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not connected' });
    }
});


httpServer.listen(serverConfig.port, () => {
  console.log(`Server is running on port http://localhost:${serverConfig.port}`);
});