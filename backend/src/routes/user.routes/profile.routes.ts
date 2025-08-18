import express from "express";
import verifyToken from "../../middlewares/userAuth.middleware";
import { updateProfile } from "../../controllers/user.controller/profile.controller";

const router = express.Router();

router.patch("/update", verifyToken, updateProfile);

export default router;