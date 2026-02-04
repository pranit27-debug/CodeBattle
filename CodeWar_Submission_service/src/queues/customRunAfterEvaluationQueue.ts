import { Queue } from "bullmq";
import redisConnection from "../config/redisConnection";

const customRunAfterEvaluationQueue = new Queue("customRunAfterEvaluationQueue",
  { connection: redisConnection }
);

export default customRunAfterEvaluationQueue;