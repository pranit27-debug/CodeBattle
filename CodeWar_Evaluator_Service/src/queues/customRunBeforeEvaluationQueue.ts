import { Queue } from "bullmq";

import redisConnection from "../config/redisConnection";

const customRunBeforeEvaluationQueue = new Queue("customRunBeforeEvaluationQueue", 
	{ connection: redisConnection}
);
export default customRunBeforeEvaluationQueue;