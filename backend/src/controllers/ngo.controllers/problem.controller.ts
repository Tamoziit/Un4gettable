import { Request, Response } from "express";
import Problem from "../../models/problem.model";

export const viewProblems = async (req: Request, res: Response) => {
    try {
        const problems = await Problem.find({});

        if (!problems) {
            res.status(400).json({ error: "Error in fetching problems" })
        } else {
            res.status(200).json(problems);
        }
    } catch (error) {
        console.log("Error in User viewMyProblems controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const viewProblemById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const problem = await Problem.findById(id);

        if (!problem) {
            res.status(400).json({ error: "Error in fetching problem data" })
        } else {
            res.status(200).json(problem);
        }
    } catch (error) {
        console.log("Error in User viewProblemById controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}