
import BaseError  from "./baseError";
import { StatusCodes } from "http-status-codes";

class NotFoundError extends BaseError {
	public resourceName: string;

    constructor(resourceName:string) {
        super("NotFound", StatusCodes.NOT_FOUND, `The requested resource: ${resourceName} not found`, {
            resourceName,
        });

		this.resourceName = resourceName;

		Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export default NotFoundError;