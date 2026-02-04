import prisma from "../config/db.config";
import { TestCases } from "../types/testCases";

export const fetchTestCases = async (problemId: string): Promise<TestCases> => {
	try {
		const testCases = await prisma.testcase.findMany({
			where: {
				problemId: problemId,
			},
			select: {
				input: true,
				output: true,
			},
		});

		return testCases as TestCases;
	} catch (error) {
		console.error("Error fetching test cases:", error);
		throw new Error("Failed to fetch test cases");
	}
}