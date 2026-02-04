import { Queue } from "bullmq";
import redisConnection from "../config/redisConnection";

const submissionBeforeEvaluationQueue = new Queue("submissionBeforeEvaluationQueue", 
  {  connection: redisConnection }
);

export default submissionBeforeEvaluationQueue;