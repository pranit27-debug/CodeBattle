import Redis from 'ioredis';
import serverConfig from './server.config';

const redisConnection = new Redis({
  	host: serverConfig.redisHost,
  	port: serverConfig.redisPort,
	maxRetriesPerRequest: null,
});

export default redisConnection;