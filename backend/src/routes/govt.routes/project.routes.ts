import express from "express";
import verifyGovt from "../../middlewares/govtAuth.middleware";
import { createProject, getMyProjects, getProjectById, getProjects } from "../../controllers/govt.controllers/project.controller";

const router = express.Router();

router.post("/create-project", verifyGovt, createProject);
router.get("/get-projects", verifyGovt, getProjects);
router.get("/my-projects", verifyGovt, getMyProjects);
router.get("/project-repository/:id", verifyGovt, getProjectById);

export default router;