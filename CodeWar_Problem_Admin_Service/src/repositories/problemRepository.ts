import BadRequestError from "../errors/badRequestError";
import { problemSchema } from "../models/createProblemSchema";
import NotFoundError from "../errors/notFoundError";
import prisma from "../config/db.config";
import { UpdateProblem ,updateProblemSchema } from "../models/updateProblemSchema";
import { createProblemSchema } from "../models/createProblemSchema";

class ProblemRepository {

    async createProblem(problemData:problemSchema) : Promise<problemSchema> {
        try {

            let createdProblem = await prisma.problem.create({
              data: {
                title: problemData.title,
                description: problemData.description,
                difficulty: problemData.difficulty,
                tags: problemData.tags,
                companies: problemData.companies,
                editorial: problemData.editorial,
                hints: problemData.hints ?? [],
                
                testcases: {
                  create: problemData.testcases,
                },
              
                solutions: {
                  create: problemData.solutions,
                },
              
                codeSubs: {
                  create: problemData.codeSubs,
                }
              },

              include: {
                testcases: true,
                solutions: true,
                codeSubs: true,
              },
            });
            
            return createProblemSchema.parse(createdProblem);
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getAllProblems() : Promise<problemSchema[]> {
      try {
        const problems = await prisma.problem.findMany({
          include: {
            testcases: true,
            solutions: true,
            codeSubs: true,
          },
        });

        return  problems.map(problem => createProblemSchema.parse(problem));
      } catch (error) {
        console.error(error);
        throw error;
      }
    }


    async getProblem(id: string): Promise<problemSchema> {
      try {
        const problem = await prisma.problem.findUnique({
          where: { id },
          include: {
            testcases: true,
            solutions: true,
            codeSubs: true,
          },
        });
      
        if (!problem) {
          throw new NotFoundError(`Problem with id ${id} not found`);
        }
      
        return createProblemSchema.parse(problem);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }


    async deleteProblem(id: string) : Promise<problemSchema> {
      try {
        const deletedProblem = await prisma.problem.delete({
          where: { id },
        });
        return createProblemSchema.parse(deletedProblem);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async updateProblem(problemData: UpdateProblem): Promise<UpdateProblem> {
      try {
        const { problemId, testcases, solutions, codeSubs, ...rest } = problemData;

        const nestedUpdates: any = {};
              
        if (testcases) {
          nestedUpdates.testcases = {
            deleteMany: {},  
            create: testcases
          };
        }
        
        if (solutions) {
          nestedUpdates.solutions = {
            deleteMany: {},
            create: solutions,
          };
        }
        
        if (codeSubs) {
          nestedUpdates.codeSubs = {
            deleteMany: {},
            create: codeSubs,
          };
        }
        
        const updatedProblem = await prisma.problem.update({
          where: { id: problemId },
          data: {
            ...rest,         
            ...nestedUpdates
          },
          include: {
            testcases: true,
            solutions: true,
            codeSubs: true,
          }
        });

        return updateProblemSchema.parse(updatedProblem);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }


}

export default ProblemRepository;