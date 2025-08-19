import { Request, Response } from "express";
import { ProjectCreationProps } from "../../types";
import Project from "../../models/project.model";
import Govt from "../../models/govt.model";

export const createProject = async (req: Request, res: Response) => {
    try {
        const id = req.govt?._id;
        const {
            name,
            city,
            state,
            startDate,
            endDate,
            SDG,
            aim,
            description,
            objectives,
            tariff
        }: ProjectCreationProps = req.body;

        if (!city) {
            res.status(400).json({ error: "City is required" });
            return;
        }
        if (!state) {
            res.status(400).json({ error: "State is required" });
            return;
        }
        if (SDG.length < 1) {
            res.status(400).json({ error: "Alignment with atleast 1 SDG is required" });
            return;
        }
        if (!aim) {
            res.status(400).json({ error: "Project aim is required" });
            return;
        }
        if (!description) {
            res.status(400).json({ error: "Project description is required" });
            return;
        }
        if (objectives.length < 1) {
            res.status(400).json({ error: "Atleast 1 Project objective is required" });
            return;
        }
        if (tariff.length < 1) {
            res.status(400).json({ error: "Atleast 1 Tariff Plan is required" });
            return;
        }
        if (!startDate || !endDate) {
            res.status(400).json({ error: "Timeline is required" });
            return;
        }

        const newProject = new Project({
            owner: id,
            ownerModel: "Govt",
            name,
            location: {
                city,
                state
            },
            timeline: {
                startDate,
                endDate
            },
            SDG,
            aim,
            description,
            objectives,
            tariff
        });

        if (newProject) {
            const govt = await Govt.findById(id);
            if (!govt) {
                res.status(400).json({ error: "Cannot find Govt. Body" });
                return;
            }
            govt.projectRepoIds.push(newProject._id);

            await Promise.all([newProject.save(), govt.save()]);
            res.status(201).json(newProject);
        } else {
            res.status(400).json({ error: "Error in creating Project" });
        }
    } catch (error) {
        console.log("Error in Govt. createProject controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getProjects = async (req: Request, res: Response) => {
    try {
        const govt = await Govt.findById(req.govt?._id);
        if (!govt) {
            res.status(400).json({ error: "Cannot find NGO Data" });
            return;
        }

        const projects = await Project.find({
            _id: { $nin: govt.projectRepoIds }
        });

        if (projects) {
            res.status(200).json(projects);
        } else {
            res.status(400).json({ error: "Error in fetching Projects from Repository" });
        }
    } catch (error) {
        console.log("Error in Govt. getProjects controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMyProjects = async (req: Request, res: Response) => {
    try {
        const govt = await Govt.findById(req.govt?._id);
        if (!govt) {
            res.status(400).json({ error: "Cannot find NGO Data" });
            return;
        }

        const projects = await Project.find({
            _id: { $in: govt.projectRepoIds }
        });

        if (projects) {
            res.status(200).json(projects);
        } else {
            res.status(400).json({ error: "Error in fetching Projects from Repository" });
        }
    } catch (error) {
        console.log("Error in Govt. getMyProjects controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getProjectById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const project = await Project.findById(id);

        if (project) {
            res.status(200).json(project);
        } else {
            res.status(400).json({ error: "Error in fetching Project from Repository" });
        }
    } catch (error) {
        console.log("Error in Govt. getProjectById controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}