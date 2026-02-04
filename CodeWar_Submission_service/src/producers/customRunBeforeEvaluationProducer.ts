import customRunBeforeEvaluationQueue from "../queues/customRunBeforeEvaluationQueue";
import { CustomRun } from "../models/customRunSchema";

export default async function customRunBeforeEvaluationProducer(payload : CustomRun){
	try {
		await customRunBeforeEvaluationQueue.add("customRunBeforeEvaluationJob",payload);
		console.log("Payload added to customRunBeforeEvaluationQueue successfully.");
	} catch (error) {
		throw new Error("Failed to add payload to customRunBeforeEvaluationQueue");
	}
}