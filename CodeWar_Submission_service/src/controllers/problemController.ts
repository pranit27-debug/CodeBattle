import { FastifyRequest , FastifyReply } from 'fastify';


async function getProblemById(request: FastifyRequest, reply: FastifyReply) {
	const { id } = request.params as { id: string };
	const response = await request.server.problemService.getProblemById(id);
	return reply.status(200).send({
		error: {},
		data: response,
		success: true,
		message: 'Fetched problem successfully'
	});
}


async function getProblemsByIds(request: FastifyRequest, reply: FastifyReply) {
	const { ids } = request.body as { ids: string[] };
	if(!ids || ids.length === 0) {
		return reply.status(400).send({
			error: { message: 'No problem IDs provided' },
			data: null,
			success: false,
			message: 'Failed to fetch problems'
		});
	}
	const response = await request.server.problemService.getProblemsByIds(ids);
	return reply.status(200).send({
		error: {},
		data: response,
		success: true,
		message: 'Fetched problems successfully'
	});
}

async function getAllProblems(request: FastifyRequest, reply: FastifyReply) {
	const response = await request.server.problemService.getAllProblems();
	return reply.status(200).send({
		error: {},
		data: response,
		success: true,
		message: 'Fetched all problems successfully'
	});
}

export default {
	getProblemById,
	getProblemsByIds,
	getAllProblems
}