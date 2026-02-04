import submissionBeforeEvaluationQueue from "../queues/submissionBeforeEvaluationQueue";
import { SubmissionPayload } from "../types/submissionPayload";

export default async function submissionBeforeEvaluationProducer(payload: SubmissionPayload) {
	try {
		await submissionBeforeEvaluationQueue.add("submissionBeforeEvaluationJob", payload);
		console.log("Payload added to submissionBeforeEvaluationQueue successfully.");
	} catch (error) {
		throw new Error("Failed to add payload to submissionBeforeEvaluationQueue");
	}
}