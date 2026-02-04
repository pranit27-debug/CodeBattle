import fastify from 'fastify';
import serverConfig from "./config/serverConfig";
import errorHandler from './utils/errorhandlers';
import app from './app';
import { workerLoop } from './workers/controlLoop';

const Fastify = fastify({
    logger: true
});


Fastify.register(app);
Fastify.setErrorHandler(errorHandler);

Fastify.listen({ port: serverConfig.PORT }, (err, address) => {
    if (err) {
        Fastify.log.error(err);
        process.exit(1);
    }

    // Start the worker loop
    workerLoop().catch(error => {
        Fastify.log.error(`Worker loop failed: ${error}`);
        process.exit(1);
    });
    Fastify.log.info(`Server listening at ${address}`);
});