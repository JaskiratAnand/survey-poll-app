import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

interface surveyData {
    name: string; 
    questions: { 
        text: string; 
        options: { 
            text: string
        }[] 
    }[] 
}
interface appendQuestions {
    questions: {
        id: number;
        text: string;
        options: {
            id: number;
            text: string;
        }[];
    }[];
}

class SurveyController {

    // GET all surveys
    async getAllSurveys(req: Request, res: Response): Promise<void> {
        try {
            const surveys = await prisma.survey.findMany();
            res.status(200).json(surveys)
        } catch (err: unknown) {
            if (err instanceof Error) {
                res.status(500).json({message: (err as Error).message})
            } else {
                res.status(500).json({message: "An unexpected error occured"})
            }
        }
    }

    // GET survey by id
    async getSurveyById(req: Request, res:Response): Promise<Response<any, Record<string, any>> | void> {
        try {
            const id: number = parseInt(req.params.id);
            const survey = await prisma.survey.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    questions: true
                }
            });
            if(survey == null) {
                return res.status(404).json({ message: 'Survey not found' });
            }
            res.status(200).json(survey);
        } catch (err: unknown) {
            if (err instanceof Error) {
                res.status(500).json({message: (err as Error).message})
            } else {
                res.status(500).json({message: "An unexpected error occured"})
            }
        }
    }

    // CREATE survey
    async createSurvey(req: Request, res: Response): Promise<void> {
        try {
            const data: surveyData = req.body;
            const newSurvey = await prisma.survey.create({
                data: {
                    name: data.name,
                    questions: {
                        create: data.questions.map(question => ({
                            text: question.text,
                            options: {
                                create: question.options.map(option => ({
                                    text: option.text
                                }))
                            }
                        }))
                    }
                },
                include: {
                    questions: {
                        include: {
                            options: true
                        }
                    }
                }
            });
            res.status(201).json({message: "Survey created Successfully"});
        } catch (err: unknown) {
            if (err instanceof Error) {
                res.status(400).json({message: (err as Error).message});
            } else {
                res.status(500).json({message: "Unexpected error while creating survey"});
            }
        }
    }

    // UPDATE survey
    async appendSurveyQuestions(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
        try { 
            const surveyId: number = parseInt(req.params.id);
            const data: appendQuestions = req.body;
            const questions = data.questions;

            const survey = await prisma.survey.findUnique({
                where: { id: surveyId }
            });
            if(!survey) return res.status(404).json({ message: 'Survey not found' });

            await Promise.all(questions.map(async (question) => {
                await prisma.question.create({
                    data: {
                        surveyId,
                        text: question.text,
                        options: {
                            create: question.options.map(option => ({
                                text: option.text
                            }))
                        }
                    }
                });
            }));
            
            res.status(200).json({message: "Questions added successfully"});
        } catch (err: unknown) {
            if (err instanceof Error) {
                res.status(400).json({message: (err as Error).message});
            } else {
                res.status(500).json({message: "An unexpected error while updating"});
            }
        }
    }

    // DELETE survey 
    async deleteSurvey(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
        try {
            const id: number = parseInt(req.params.id);

            const survey = await prisma.survey.findUnique({
                where: { id }
            });
            if(!survey) return res.status(404).json({ message: 'Survey not found' });

            await prisma.survey.delete({ where: { id } });
            res.status(200).json({ message: 'Survey deleted' });
        } catch (err: unknown) {
            if (err instanceof Error) {
                res.status(400).json({message: (err as Error).message})
            } else {
                res.status(500).json({message: "Unexpected error while deleting survey"})
            }
        }
    }

    async deleteQuestion(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
        try {
            const id: number = parseInt(req.params.id);

            const question = await prisma.question.findUnique({
                where: { id }
            });
            if(!question) return res.status(404).json({ message: 'Question not found' });

            await prisma.question.delete({ where: { id } });
            res.status(200).json({ message: 'Question deleted' });
        } catch (err: unknown) {
            if (err instanceof Error) {
                res.status(400).json({message: (err as Error).message})
            } else {
                res.status(500).json({message: "Unexpected error while deleting survey"})
            }
        }
    }
}

export default SurveyController;
