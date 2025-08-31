import express from "express";
import verifyUser from "../../middlewares/userAuth.middleware";
import { getCommunityDetails, getMyCommunities, sendMessage } from "../../controllers/user.controller/community.controller";

const router = express.Router();

router.post("/send-message/:id", verifyUser, sendMessage);
router.get("/get-community/:id", verifyUser, getCommunityDetails);
router.get("/my-communities", verifyUser, getMyCommunities);

export default router;