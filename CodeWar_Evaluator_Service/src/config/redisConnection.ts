import Redis from 'ioredis';
import serverConfig from './service.config';

const redisConfig = {
  host: serverConfig.REDIS_HOST,
  port: serverConfig.REDIS_PORT,
  maxRequestsPerConnection: null
};

const redisConnection = new Redis(redisConfig);
export default redisConnection;