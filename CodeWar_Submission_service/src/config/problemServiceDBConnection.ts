import { PrismaClient as ProblemServiceDBClient } from "../../generated/problemService";

const problemServiceDB = new ProblemServiceDBClient({
	log: ["query", "error"],
});

export default problemServiceDB;