import { Job } from "bullmq";

import customRunAfterEvaluationProducer from "../producers/customRunAfterEvaluationProducer";
import { IJob } from "../types/bullMqJobDefinition";
import { ExecutionResponse } from "../types/CodeExecutorStrategy";
import { CustomRunPayload } from "../types/customRunPayload";
import createExecutor from "../utils/ExecutorFactory";
import { fetchSolution } from "../fetchData/fetchSolution";
import { problemSolution } from "../types/problemSolution";

export default class CustomRunJob implements IJob {
	payload: CustomRunPayload
	constructor(payload: CustomRunPayload) {
		this.payload = payload;
	}

	handle = async (job?: Job) => {
		console.log("Handler of the job called");
		console.log(this.payload);
		if(job){
			const problemId = this.payload.problemId;
			const codeLanguage = this.payload.language;
			const code = this.payload.code;
			const inputCase = this.payload.inputCase;

			const strategy = createExecutor(codeLanguage);
			console.log(strategy);
			if(strategy != null) {

				let result = "AC";

				const response: ExecutionResponse = await strategy.execute(code, inputCase);
				if(response.status === "COMPLETED") {
					const solution : problemSolution  = await fetchSolution(problemId);
					const solutionStrategy = createExecutor(solution.language);
					
					const solutionOutput = solutionStrategy ? await solutionStrategy.execute(solution.code, inputCase) : null;

					if(solutionOutput && solutionOutput.output.trim() !== response.output.trim()){
						result = "WA";
					}
				}else{
					result = response.status;
				}

				console.log("Result of code execution: ", result);
				const payload = {
					...this.payload,
					result: result,
				}

				await customRunAfterEvaluationProducer(payload);

				if(result === "AC"){
					console.log("Code executed successfully");
					console.log(result);
				}else{
					console.log("Something went wrong with code execution");
					console.log(result);
				}
			}else{
				throw new Error(`No executor found for language: ${codeLanguage}`);
			}
		}
	};

	failed = (job?: Job) : void => {
		console.log("Job failed");
		if(job) {
			console.log(job.id);
		}
	};
}