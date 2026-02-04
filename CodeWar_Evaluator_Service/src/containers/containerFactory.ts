import Docker from 'dockerode';

async function createContainer(imageName: string, cmdExecutable: string[]) :Promise<Docker.Container> {
    const docker = new Docker();

    const container = await docker.createContainer({
        Image: imageName,
        Cmd: cmdExecutable,
        AttachStdin: true, // to enable input streams
        AttachStdout: true, // to enable output streams
        AttachStderr: true, // to enable error streams
        Tty: false,
        HostConfig: {
            Memory: 1024 * 1024 * 1024, // 2GB
			NanoCpus: .5 * 1e9, // 500 million nanoseconds (0.5 CPU)
			NetworkMode: 'none', // no network access
			AutoRemove: true // automatically remove the container when it exits
        },
        OpenStdin: true // keep the input stream open even no interaction is there
    });

    return container;
}

export default createContainer;