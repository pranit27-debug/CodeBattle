import CodeExecutorStrategy, { ExecutionResponse } from '../types/CodeExecutorStrategy';
import { JAVA_IMAGE } from '../utils/constants';
import createContainer from './containerFactory';
import { fetchDecodedStream } from './dockerOutputFetcher';
import pullImage from './pullImage';

class JavaExecutor implements CodeExecutorStrategy {
    async execute(code: string, inputTestCase: string): Promise<ExecutionResponse> {
        console.log("Java executor called");
        console.log(code, inputTestCase);

        const rawLogBuffer: Buffer[] = [];

        await pullImage(JAVA_IMAGE);

        console.log("Initialising a new java docker container");
        console.log(`Code received is \n ${code.replace(/'/g, `'\\"`)}`)
        const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | java Main`;
        console.log(runCommand);
        const javaDockerContainer = await createContainer(JAVA_IMAGE, [
            '/bin/sh', 
            '-c',
            runCommand
        ]); 


        // starting / booting the corresponding docker container
        await javaDockerContainer.start();

        console.log("Started the docker container");

        const loggerStream = await javaDockerContainer.logs({
            stdout: true,
            stderr: true,
            timestamps: false,
            follow: true // whether the logs are streamed or returned as a string
        });
        
        // Attach events on the stream objects to start and stop reading
        loggerStream.on('data', (chunk) => {
            rawLogBuffer.push(chunk);
        });

        try {
            const codeResponse : string = await fetchDecodedStream( javaDockerContainer, loggerStream, rawLogBuffer , 2000);

            return {
				output: codeResponse,
				status: "COMPLETED"
			};

        } catch (error : any) {
            if(error === "MLE") {
                return { output: "Memory Limit Exceeded", status: "MLE" };
            }

            if(error === "TLE") {
                return { output: "Time Limit Exceeded", status: "TLE" };
            }
			
            return { output: error?.toString() || "Unknown Error", status: "ERROR" };
        } finally {

            await javaDockerContainer.remove();
        }
    }
        
}
  

export default JavaExecutor;