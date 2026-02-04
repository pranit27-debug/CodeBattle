import expess from "express";
import { Request, Response } from "express";
import { v1Router } from "./v1/index";

export const ApiRouter = expess.Router();

ApiRouter.get('/ping', (req:Request , res:Response) => {
	res.json({message: 'API is up and running'});
});

ApiRouter.use('/v1', v1Router);