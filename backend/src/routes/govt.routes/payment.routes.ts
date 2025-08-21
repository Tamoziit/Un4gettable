import express from "express";
import verifyGovt from "../../middlewares/govtAuth.middleware";
import { payFund } from "../../controllers/govt.controllers/payment.controller";

const router = express.Router();

router.post("/pay-funds", verifyGovt, payFund);

export default router;