import { BaseError } from "./baseError";
import { StatusCodes } from "http-status-codes";

export class NotFoundError extends BaseError {
	constructor(details?: unknown) {
		super("SubmissionCreationError", StatusCodes.BAD_REQUEST, "Not able to find resourses or Wrong resource ID", details);
		Object.setPrototypeOf(this, new.target.prototype);
	}
}