import express from "express";
import verifyGovt from "../../middlewares/govtAuth.middleware";
import { viewProblemById, viewProblems } from "../../controllers/govt.controllers/problem.controller";

const router = express.Router();

router.get("/problem-repository", verifyGovt, viewProblems);
router.get("/problem-repository/:id", verifyGovt, viewProblemById);

export default router;