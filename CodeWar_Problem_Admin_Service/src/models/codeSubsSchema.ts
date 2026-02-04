import {z} from "zod";
import { availableLanguages } from "../utils/constants";

export const codeSubsSchema = z.object({
	"language": z.enum(availableLanguages),
	"startSnippet" : z.string(),
	"userSnippet": z.string(),
	"endSnippet": z.string(),
}).strict();

export type CodeSubs = z.infer<typeof codeSubsSchema>;