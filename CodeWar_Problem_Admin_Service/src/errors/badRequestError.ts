
import BaseError from './baseError';
import { StatusCodes } from 'http-status-codes';

class BadRequestError extends BaseError {
	public propertyName: string;
	public details?: unknown;

    constructor(propertyName:string, details:unknown) {
        super("BadRequest", StatusCodes.BAD_REQUEST, `Invalid structure for ${propertyName} provided`, details);

		this.propertyName = propertyName;

		Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}

export default BadRequestError;