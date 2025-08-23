import express from "express";
import verifyGovt from "../../middlewares/govtAuth.middleware";
import { getCommunityDetails, sendMessage } from "../../controllers/govt.controllers/community.controller";

const router = express.Router();

router.post("/send-message/:id", verifyGovt, sendMessage);
router.get("/get-community/:id", verifyGovt, getCommunityDetails);

export default router;