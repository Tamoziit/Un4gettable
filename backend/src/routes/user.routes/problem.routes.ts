import express from "express";
import verifyUser from "../../middlewares/userAuth.middleware";
import { postProblem } from "../../controllers/user.controller/problem.controller";

const router = express.Router();

router.post("/post-problem", verifyUser, postProblem);

export default router;