import express from "express";
import verifyUser from "../../middlewares/userAuth.middleware";
import { getCommunityDetails, sendMessage } from "../../controllers/user.controller/community.controller";

const router = express.Router();

router.post("/send-message/:id", verifyUser, sendMessage);
router.get("/get-community/:id", verifyUser, getCommunityDetails);

export default router;