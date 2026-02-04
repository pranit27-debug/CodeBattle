import {z} from 'zod';

export const problemSubmissionSchema = z.object({
  	problemId: z.string(),
  	userId: z.string(),
  	code: z.string(),
  	language: z.string(),
}).strict();

export type ProblemSubmission = z.infer<typeof problemSubmissionSchema>;
