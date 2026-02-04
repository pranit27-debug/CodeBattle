import { BaseError } from "./baseError";
import { StatusCodes } from "http-status-codes";

export class InternalServerError extends BaseError {

	constructor(details?: unknown) {
		super("Internal Server Error", StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong", details);
		Object.setPrototypeOf(this, new.target.prototype);
	}
}