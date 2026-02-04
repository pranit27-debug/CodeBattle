import { FastifyInstance} from "fastify";
import fastifyPlugin from "fastify-plugin";
import { SubmissionRepository } from "./submissionRepository";
import { ProblemRepository } from "./problemRepository";

const repositoryPlugin = async (fastify: FastifyInstance) => {
    // Add submissionRepository to Fastify instance
    fastify.decorate("submissionRepository", new SubmissionRepository());
	// Add problemRepository to Fastify instance
	fastify.decorate("problemRepository", new ProblemRepository());
};

export default fastifyPlugin(repositoryPlugin,{
	name: "repositoryPlugin",
});
