import	{z} from "zod";
import { createProblemSchema } from "./createProblemSchema";

export const updateProblemSchema = createProblemSchema.partial().extend(
	{
		"problemId": z.string().min(1, "Problem ID is required"),
	}
).strict();


export type UpdateProblem = z.infer<typeof updateProblemSchema>;