import express from "express";
import verifyNGO from "../../middlewares/ngoAuth.middleware";
import { viewProblemById, viewProblems } from "../../controllers/ngo.controllers/problem.controller";

const router = express.Router();

router.get("/problem-repository", verifyNGO, viewProblems);
router.get("/problem-repository/:id", verifyNGO, viewProblemById);

export default router;