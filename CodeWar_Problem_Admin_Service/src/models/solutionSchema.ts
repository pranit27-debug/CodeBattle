import {z} from "zod";
import {availableLanguages} from "../utils/constants";

export const solutionSchema = z.object({
	"language": z.enum(availableLanguages),
	"code": z.string().min(1, "Code is required"),
}).strict();

export type Solution = z.infer<typeof solutionSchema>;