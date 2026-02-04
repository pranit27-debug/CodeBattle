import { Request, Response } from "express";
import ProblemRepository from "../repositories/problemRepository";
import ProblemService from "../service/problemService";
import StatusCodes from "http-status-codes";

const problemService = new ProblemService(new ProblemRepository());

// Ping route
export function pingProblemController(req: Request, res: Response) {
  res.json({ message: 'Problem controller for Version 1 is up' });
}

export async function addProblem(req: Request, res: Response) {
  try {
    const newProblem = await problemService.createProblem(req.body);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Successfully created a new problem',
      error: {},
      data: newProblem,
    });
  } catch (error: any) {
    console.error("Add Problem Error:", error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to create problem',
      error: error.message || error,
      data: {},
    });
  }
}

export async function getProblem(req: Request, res: Response) {
  try {
    const problem = await problemService.getProblem(req.params.id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Successfully fetched a problem',
      error: {},
      data: problem,
    });
  } catch (error: any) {
    console.error("Get Problem Error:", error);

    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Problem not found',
      error: error.message || error,
      data: {},
    });
  }
}

export async function deleteProblem(req: Request, res: Response) {
  try {
    const deletedProblem = await problemService.deleteProblem(req.params.id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Successfully deleted the problem',
      error: {},
      data: deletedProblem,
    });
  } catch (error: any) {
    console.error("Delete Problem Error:", error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to delete problem',
      error: error.message || error,
      data: {},
    });
  }
}

export async function updateProblem(req: Request, res: Response) {
  try {
    const updatedProblem = await problemService.updateProblem(req.body);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Successfully updated the problem',
      error: {},
      data: updatedProblem,
    });
  } catch (error: any) {
    console.error("Update Problem Error:", error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to update problem',
      error: error.message || error,
      data: {},
    });
  }
}

export async function getProblems(req: Request, res: Response) {
  try {
    const problems = await problemService.getProblems();

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Successfully fetched all problems',
      error: {},
      data: problems,
    });
  } catch (error: any) {
    console.error("Get All Problems Error:", error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch problems',
      error: error.message || error,
      data: {},
    });
  }
}
