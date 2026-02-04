import {sanitizeMarkdownContent} from "../utils/markdownSanitizer";
import { problemSchema } from "../models/createProblemSchema";
import ProblemRepository from "../repositories/problemRepository";
import { CodeSubs } from "../models/codeSubsSchema";
import { availableLanguages } from "../utils/constants";
import {UpdateProblem} from "../models/updateProblemSchema";
import { Testcase } from "../models/testcaseSchema";

class ProblemService {

	private problemRepository: ProblemRepository;
    constructor(problemRepository:ProblemRepository) {
        this.problemRepository = problemRepository;
    }

    async createProblem(problemData:problemSchema) : Promise<problemSchema> {
        // 1. Sanitize the markdown for description
        problemData.description = await sanitizeMarkdownContent(problemData.description);

		// 2. check the CodeSubs are present for all the languages
        const isAllCodeStubesPresnt = await this.checkCodeSubsForProblem(problemData.codeSubs);
		if (!isAllCodeStubesPresnt) {
			throw new Error("Code stubs are not present for all languages");
		}

		// 3. Put hidden testcases last
		problemData.testcases = await this.putHiddenTestcasesLast(problemData.testcases);

		// 4. Create the problem using the repository
		const createdProblem = await this.problemRepository.createProblem(problemData);
		return createdProblem;
    }

    async getProblem(problemId:string) : Promise<problemSchema> {
        const problem = await this.problemRepository.getProblem(problemId);
        return problem;
    }

    async getProblems() : Promise<problemSchema[]> {
        const problem = await this.problemRepository.getAllProblems();
        return problem;
    }

    async deleteProblem(problemId:string) : Promise<problemSchema> {
		const deletedProblem = await this.problemRepository.deleteProblem(problemId);
		return deletedProblem;
	}

	async updateProblem(problemData:UpdateProblem) : Promise<UpdateProblem> {
		
		// 1. Sanitize the markdown for description
		if(problemData.description){
			problemData.description = await sanitizeMarkdownContent(problemData.description);
		}

		// 2. Check the CodeSubs are present for all the languages
		if(problemData.codeSubs) {
			const isAllCodeStubesPresnt = await this.checkCodeSubsForProblem(problemData.codeSubs);
			if (!isAllCodeStubesPresnt) {
				throw new Error("Code stubs are not present for all languages");
			}
		}

		// 3. Update the problem using the repository
		const updatedProblem = await this.problemRepository.updateProblem(problemData);
		return updatedProblem;
	}

	async checkCodeSubsForProblem(codeSubs: CodeSubs[]) : Promise<boolean> {
		// Check if all languages in codeSubs are available in the system
		const languages = codeSubs.map(sub => sub.language);
		const isValid = languages.every(lang => availableLanguages.includes(lang));
		
		if (!isValid) {
			return false;
		}
		return true;
	}

	async putHiddenTestcasesLast(testcases: Testcase[]) : Promise<Testcase[]> {
		// Move hidden testcases to the end of the array
		testcases.map(tc => {
			if (tc.isHidden === undefined) {
				tc.isHidden = false;
			}
			return tc;
		});
		const visibleTestcases = testcases.filter(tc => !tc.isHidden);
		const hiddenTestcases = testcases.filter(tc => tc.isHidden);
		if(visibleTestcases.length === 0) {
			throw new Error("No visible testcases found");
		}
		return [...visibleTestcases, ...hiddenTestcases];
	}
}

export default ProblemService;