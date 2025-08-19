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
        console.log("Error in Govt. postProblem controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}