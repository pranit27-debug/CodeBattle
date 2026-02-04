import {z} from "zod";
import { testcaseSchema } from "./testcaseSchema";
import {difficultyLevels} from "../utils/constants";
import {solutionSchema} from "./solutionSchema";
import { codeSubsSchema } from "./codeSubsSchema";
import { availableLanguages } from "../utils/constants";


export const createProblemSchema = z.object({
	"title": z.string().min(1, "Title is required"),
	"description": z.string().min(1, "Description is required"),
	"difficulty": z.enum(difficultyLevels),
	"tags": z.array(z.string()).min(1, "At least one tag is required"),
	"companies": z.array(z.string().min(1, "Company is required")),
	"testcases": z.array(testcaseSchema).min(1, "At least one testcase is required"),
	"solutions": z.array(solutionSchema).min(1, "At least one solution is required"),
	"hints": z.array(z.string()).optional(),
	"editorial": z.string().optional(),
	"codeSubs": z.array(codeSubsSchema).min(availableLanguages.length, "At least one code substitution is for each language"),
}).strict();


export type problemSchema = z.infer<typeof createProblemSchema>;