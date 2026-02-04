import submissionAfterEvaluationQueue from './../queues/submissionAfterEvaluationQueue';

export default async function(payload: Record<string, unknown>) {
	await submissionAfterEvaluationQueue.add("submissionAfterEvaluationJob", payload);
	console.log("Successfully added a new submission after evaluation job to the after evaluation queue.");
}
