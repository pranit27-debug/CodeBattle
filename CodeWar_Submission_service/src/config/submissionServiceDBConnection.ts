import { PrismaClient as SubmisionServiceDBClient } from "../../generated/submissionService";

const submissionServiceDB = new SubmisionServiceDBClient({
	log: ["query", "error"]
});

export default submissionServiceDB;