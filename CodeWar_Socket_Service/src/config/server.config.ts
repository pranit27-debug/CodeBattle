import dotenv from 'dotenv';

dotenv.config();

const serverConfig = {
  	port: process.env.PORT || 3003,
  	origin: process.env.ORIGIN,
  	redisHost: process.env.REDIS_HOST,
  	redisPort: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
};

export default serverConfig;