import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

async function createSubmission(request: FastifyRequest, reply: FastifyReply) {
    const response = await request.server.submissionService.createSubmission(request.body);
    return reply.status(StatusCodes.CREATED).send({
        error: {},
        data: response,
        success: true,
        message: 'Created submission successfully'
    })

}

async function getSubmissionById(request: FastifyRequest, reply: FastifyReply) {
	const { id } = request.params as { id: string };
	const response = await request.server.submissionService.getSubmissionById(id);
	return reply.status(StatusCodes.OK).send({
		error: {},
		data: response,
		success: true,
		message: 'Fetched submission successfully'
	})
}


async function getUserByID(request: FastifyRequest, reply: FastifyReply) {
	const { id } = request.params as { id: string };
	const response = await request.server.submissionService.getUserByID(id);
	return reply.status(StatusCodes.OK).send({
		error: {},
		data: response,
		success: true,
		message: 'Fetched user successfully'
	})
}

async function getSubmissionByIds(request: FastifyRequest, reply: FastifyReply) {
	const { ids } = request.body as { ids: string[] };
	if (!ids || ids.length === 0) {
		return reply.status(StatusCodes.BAD_REQUEST).send({
			error: { message: 'No submission IDs provided' },
			data: null,
			success: false,
			message: 'Failed to fetch submissions'
		});
	}
	const response = await request.server.submissionService.getSubmissionByIds(ids);
	return reply.status(StatusCodes.OK).send({
		error: {},
		data: response,
		success: true,
		message: 'Fetched submissions successfully'
	})
}


async function createCustomRun(request: FastifyRequest, reply: FastifyReply) {
	const response = await request.server.submissionService.createCustomRun(request.body);
	return reply.status(StatusCodes.CREATED).send({
		error: {},
		data: response,
		success: true,
		message: 'Created custom run successfully'
	})
}

async function getSubmissionsByUserId(request: FastifyRequest, reply: FastifyReply) {
	const { userId } = request.params as { userId: string };
	const response = await request.server.submissionService.getSubmissionsByUserId(userId);
	return reply.status(StatusCodes.OK).send({
		error: {},
		data: response,
		success: true,
		message: 'Fetched submissions by user ID successfully'
	})
}

export default {
	createSubmission,
	getSubmissionById,
	getSubmissionByIds,
	getSubmissionsByUserId,
	getUserByID,
	createCustomRun
}