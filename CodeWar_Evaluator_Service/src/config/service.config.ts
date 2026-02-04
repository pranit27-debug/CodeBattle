import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT,
  REDIS_PORT: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
  REDIS_HOST: process.env.REDIS_HOST
};