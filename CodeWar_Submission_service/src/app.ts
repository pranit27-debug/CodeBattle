import fastifyPlugin from "fastify-plugin";
import { FastifyInstance } from "fastify";
import fastifyCors from "@fastify/cors";
import respositoryPlugin from "./repositories/respositoryPlugin";
import servicePlugin from "./services/servicePlugin";
import apiRouters from "./routes/apiRouters"

async function app(fastify: FastifyInstance) {
	await fastify.register(fastifyCors);
  	await fastify.register(respositoryPlugin);
	await fastify.register(servicePlugin);
	
	await fastify.register(apiRouters, {prefix: "/api"});
}

export default fastifyPlugin(app,{
	name: "app",
});