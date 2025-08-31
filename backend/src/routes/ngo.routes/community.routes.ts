import express from "express";
import verifyNGO from "../../middlewares/ngoAuth.middleware";
import { getCommunityDetails, getMyCommunities, sendMessage } from "../../controllers/ngo.controllers/community.controller";

const router = express.Router();

router.post("/send-message/:id", verifyNGO, sendMessage);
router.get("/get-community/:id", verifyNGO, getCommunityDetails);
router.get("/my-communities", verifyNGO, getMyCommunities);

export default router;