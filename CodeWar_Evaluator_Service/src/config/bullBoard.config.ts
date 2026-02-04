import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";

import submissionBeforeEvaluationQueue from "../queues/submissionBeforeEvaluationQueue";
import submissionAfterEvaluationQueue from "../queues/submissionAfterEvaluationQueue";
import customRunBeforeEvaluationQueue from "../queues/customRunBeforeEvaluationQueue";
import customRunAfterEvaluationQueue from "../queues/customRunAfterEvaluationQueue";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/ui');

const bullBoardQueues = [
  new BullMQAdapter(submissionBeforeEvaluationQueue),
  new BullMQAdapter(submissionAfterEvaluationQueue),
  new BullMQAdapter(customRunBeforeEvaluationQueue),
  new BullMQAdapter(customRunAfterEvaluationQueue),
];

createBullBoard({
  queues: bullBoardQueues,
  serverAdapter,
});

export default serverAdapter;