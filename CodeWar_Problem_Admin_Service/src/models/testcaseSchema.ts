import {z} from "zod";

export const testcaseSchema = z.object({
	"input": z.string().min(1, "Input is required"),
	"output": z.string().min(1, "Output is required"),
	"isHidden": z.boolean().default(false).optional(),
}).strict();

export type Testcase = z.infer<typeof testcaseSchema>;