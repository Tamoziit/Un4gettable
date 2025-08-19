import { Request, Response } from "express";
import { PostProblemProps } from "../../types";
import Problem from "../../models/problem.model";
import User from "../../models/user.model";

export const postProblem = async (req: Request, res: Response) => {
    try {
        const id = req.user?._id;
        const {
            url,
            description,
            lat,
            lon
        }: PostProblemProps = req.body;

        if (!url) {
            res.status(400).json({ error: "Image is required" });
            return;
        }
        if (!lat || !lon) {
            res.status(400).json({ error: "Error in fetching your location" });
            return;
        }

        const newProblem = new Problem({
            owner: id,
            url,
            location: {
                lat,
                lon,
                address: "Esplanade, Kolkata, West Bengal 700069, India"
            },
            problem: "Deforestation",
            SDG: "13",
            description,
            alertLevel: "high",
            actionableInsights: [
                "Deploy forest rangers to monitor and prevent illegal logging",
                "Launch community awareness campaigns on sustainable land use",
                "Collaborate with local authorities to enforce anti-deforestation laws",
                "Introduce reforestation programs with native species"
            ],
        });

        if (newProblem) {
            const user = await User.findById(id);
            if (!user) {
                res.status(400).json({ error: "Cannot find user" });
                return;
            }
            user.problemRepoIds.push(newProblem._id);

            await Promise.all([newProblem.save(), user.save()]);
            res.status(201).json(newProblem);
        } else {
            res.status(400).json({ error: "Error in posting Problem" });
        }
    } catch (error) {
        console.log("Error in User postProblem controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const viewMyProblems = async (req: Request, res: Response) => {
    try {
        const problems = await Problem.find({ owner: req.user?._id });

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