
import BaseError from "./baseError";
import { StatusCodes } from "http-status-codes";

class InternalServerError extends BaseError {
    constructor(details: unknown) {
        super("InternalServerError", StatusCodes.INTERNAL_SERVER_ERROR, `Something went wrong !!`, details);

		Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}
export default InternalServerError;