
class BaseError extends Error {
    public statusCode: number;
    public details?: unknown;

    constructor(name: string, statusCode: number, description: string, details?: unknown) {
        super(description);

        this.name = name;
        this.statusCode = statusCode;
        this.details = details;

        Object.setPrototypeOf(this, BaseError.prototype);
    }
}

export default BaseError;
