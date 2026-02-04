import CodeExecutorStrategy, { ExecutionResponse } from '../types/CodeExecutorStrategy';
import { CPP_IMAGE } from '../utils/constants';
import createContainer from './containerFactory';
import { fetchDecodedStream } from './dockerOutputFetcher';
import pullImage from './pullImage';


class CppExecutor implements CodeExecutorStrategy {

    async execute(code: string, inputTestCase: string): Promise<ExecutionResponse> {
        console.log(code, inputTestCase);
        const rawLogBuffer: Buffer[] = [];

        await pullImage(CPP_IMAGE);

        console.log("Initialising a new C++ docker container");
        const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | ./main`;

        console.log(runCommand);
        const cppDockerContainer = await createContainer(CPP_IMAGE, [
            '/bin/sh', 
            '-c',
            runCommand
        ]); 

        // starting / booting the corresponding docker container
        await cppDockerContainer.start();

        console.log("Started the docker container");

        const loggerStream = await cppDockerContainer.logs({
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
            const codeResponse : string = await fetchDecodedStream(cppDockerContainer, loggerStream, rawLogBuffer, 1000);

            return {output: codeResponse, 
                status: "COMPLETED"
            };

        } catch (error) {
            if( error === "MLE") {
                return { output: "Memory Limit Exceeded", status: "MLE" };
            }

            if( error === "TLE") {
                return { output: "Time Limit Exceeded", status: "TLE" };
            }

            return { output: error?.toString() || "Unknown Error", status: "ERROR" };
        } finally {
            await cppDockerContainer.remove();
        }
    }

        
}

export default CppExecutor;