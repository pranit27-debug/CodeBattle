import { Job } from "bullmq";

export interface IJob {
    payload: unknown;
    handle: (job?: Job) => void 
    failed: (job?: Job) => void
}