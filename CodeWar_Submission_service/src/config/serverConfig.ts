import dotenv from "dotenv";

dotenv.config();

const serverConfig = {
	PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3002,
	REDIS_PORT: process.env.REDIS_PORT,
	REDIS_HOST: process.env.REDIS_HOST,
	PROBLEM_SERVICE_DB_URL: process.env.PROBLEM_SERVICE_DB_URL,
	SUBMISSION_SERVICE_DB_URL: process.env.SUBMISSION_SERVICE_DB_URL,
	SOCKET_IO_URL: process.env.SOCKET_IO_URL
}

export default serverConfig;