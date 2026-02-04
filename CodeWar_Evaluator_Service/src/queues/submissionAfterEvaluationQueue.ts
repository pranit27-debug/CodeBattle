import { Queue } from "bullmq";
import redisConnection from "../config/redisConnection";

const submissionAfterEvaluationQueue = new Queue("submissionAfterEvaluationQueue", {
  connection: redisConnection,
});

export default submissionAfterEvaluationQueue;