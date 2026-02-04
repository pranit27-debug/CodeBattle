import { BaseError } from "./baseError";
import { StatusCodes } from "http-status-codes";

export class SubmissionCreationError extends BaseError {
	constructor(details: unknown) {
		super("Submission Creation Error", StatusCodes.BAD_REQUEST, "Not able to create submission", details);
		Object.setPrototypeOf(this, new.target.prototype);
	}
}