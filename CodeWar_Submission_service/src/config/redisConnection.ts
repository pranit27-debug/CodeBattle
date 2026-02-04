import Redis from "ioredis";

const redisConfig = {
  	host: process.env.REDIS_HOST, 
  	port: parseInt(process.env.REDIS_PORT || "6379", 10),
  	maxRetriesPerRequest: null,
};

const redisConnection = new Redis(redisConfig);

export default redisConnection;