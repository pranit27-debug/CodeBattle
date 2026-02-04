import prisma from "../config/db.config";
import { problemSolution } from "../types/problemSolution";

export const fetchSolution = async (problemId: string): Promise<problemSolution> => {
	try {
		const solution = await prisma.solution.findFirst({
			where: {
				problemId: problemId,
			},
			select: {
				language : true,
				code: true,
			},
		});

		return solution as problemSolution;
	} catch (error) {
		console.error("Error fetching test cases:", error);
		throw new Error("Failed to fetch test cases");
	}
}