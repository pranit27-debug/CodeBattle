import Docker from 'dockerode';
import DockerStreamOutput from "../types/dockerStreamOutput";
import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants";

function decodeDockerStream(buffer: Buffer) : DockerStreamOutput{
    let offset = 0; // This variable keeps track of the current position in the buffer while parsing

    // The output that will store the accumulated stdout and stderr output as strings
    const output: DockerStreamOutput = { stdout: '' , stderr: ''}; 

    // Loop until offset reaches end of the buffer
    while(offset < buffer.length) {

        // channel is read from buffer and has value of type of stream
        const typeOfStream = buffer[offset];

        // This length variable hold the length of the value 
        // We will read this variable on an offset of 4 bytes from the start of the chunk
        const length = buffer.readUint32BE(offset + 4);

        // as now we have read the header, we can move forward to the value of the chunk
        offset += DOCKER_STREAM_HEADER_SIZE;

        if(typeOfStream === 1) {
            // stdout stream
            output.stdout += buffer.toString('utf-8', offset, offset + length);
        } else if(typeOfStream === 2) {
            // stderr stream
            output.stderr += buffer.toString('utf-8', offset, offset + length);
        }

        offset += length; // move offset to next chunk
    }

    return output;
}

export async function fetchDecodedStream(dockerContainer :Docker.Container , loggerStream: NodeJS.ReadableStream, rawLogBuffer: Buffer[], timeNeed:number ) : Promise<string>{
    
	return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            console.log("Timeout called");
			dockerContainer.kill();
            reject("TLE");
        }, timeNeed);
        loggerStream.on('end', () => {
            loggerStream.on("end", async () => {
            clearTimeout(timeout);

            try {
                // Check container exit code
                const inspectData = await dockerContainer.inspect();
                const exitCode = inspectData?.State?.ExitCode;

                if (exitCode === 137) {
                    console.log("Memory Limit Exceeded detected");
                    reject("MLE");
                    return;
                }

                const completeBuffer = Buffer.concat(rawLogBuffer);
                const decodedStream = decodeDockerStream(completeBuffer);

                if (decodedStream.stderr) {
                    reject(decodedStream.stderr);
                } else {
                    resolve(decodedStream.stdout);
                }
            } catch (err) {
                console.error("Error inspecting container:", err);
                reject("ERROR");
            }
        });

            loggerStream.on("error", (err) => {
                clearTimeout(timeout);
                console.error("Logger stream error:", err);
                reject("ERROR");
            });
        });
    })
}