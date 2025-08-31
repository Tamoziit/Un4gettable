import express from "express";
import verifyGovt from "../../middlewares/govtAuth.middleware";
import { getCommunityDetails, getMyCommunities, sendMessage } from "../../controllers/govt.controllers/community.controller";

const router = express.Router();

router.post("/send-message/:id", verifyGovt, sendMessage);
router.get("/get-community/:id", verifyGovt, getCommunityDetails);
router.get("/my-communities", verifyGovt, getMyCommunities);

export default router;