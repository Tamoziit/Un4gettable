import express from "express";
import verifyUser from "../../middlewares/userAuth.middleware";
import { postProblem, viewMyProblems, viewProblemById } from "../../controllers/user.controller/problem.controller";

const router = express.Router();

router.post("/post-problem", verifyUser, postProblem);
router.get("/get-my-problems", verifyUser, viewMyProblems);
router.get("/my-problem/:id", verifyUser, viewProblemById);

export default router;