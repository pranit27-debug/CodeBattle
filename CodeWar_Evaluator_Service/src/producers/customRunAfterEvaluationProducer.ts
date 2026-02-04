import customRunAfterEvaluationQueue from "../queues/customRunAfterEvaluationQueue";

export default async function(payload: Record<string, unknown>) {
	await customRunAfterEvaluationQueue.add("customRunAfterEvaluationJob", payload);
	console.log("Successfully added a new custom run evaluation job to the after evaluation queue.");
}