import { Job } from "bullmq";

import submissionAfterEvaluationProducer from "../producers/submissionAfterEvaluationProducer";
import { IJob } from "../types/bullMqJobDefinition";
import { ExecutionResponse } from "../types/CodeExecutorStrategy";
import { SubmissionPayload } from "../types/submissionPayload";
import createExecutor from "../utils/ExecutorFactory";
import { fetchTestCases } from "../fetchData/fetchTestcases";
import { TestCases } from "../types/testCases";

export default class SubmissionJob implements IJob {
    payload: SubmissionPayload
    constructor(payload: SubmissionPayload ) {
        this.payload = payload;
    }

    handle = async (job?: Job) => {
        console.log("Handler of the job called");
        console.log(this.payload);
        if(job) {
            const problemId = this.payload.problemId;
            const codeLanguage = this.payload.language;
            const code = this.payload.code;

            const strategy = createExecutor(codeLanguage);

            console.log(strategy);
            if(strategy != null) {

				const testcases : TestCases = await fetchTestCases(problemId);

				let result = "AC";
				for (const testcase of testcases){
					const response : ExecutionResponse = await strategy.execute(code, testcase.input);
					
					if(response.status === "COMPLETED") {
						if(response.output.trim() !== testcase.output.trim()) {
							result = "WA";
							break;
						}
					}else{
						result  = response.status || "Error";
						break;
					}
				}

                const payload = {
                    ...this.payload,
                    result: result,
                }

                await submissionAfterEvaluationProducer(payload);
                
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