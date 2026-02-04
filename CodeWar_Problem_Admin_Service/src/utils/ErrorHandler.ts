import { Request,Response,NextFunction } from "express";
import BaseError from "../errors/baseError";
import { StatusCodes } from "http-status-codes";

export function errorHandler(err:Error, req:Request, res:Response, next:NextFunction) : void {
    if(err instanceof BaseError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err.details,
            data: {} // because this is an exception so no data is going to be provided
        });
        return;
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Something went wrong !',
        error: err,
        data: {} // because this is an exception so no data is going to be provided
    });
}