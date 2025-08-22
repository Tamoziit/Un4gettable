import express from 'express';
import { addMembers, checkRazorpayAccount, checkVirtualAccounts, createTier, getToken, sendSMS } from '../controllers/admin.controller';
import verifyAdmin from '../middlewares/admin.middleware';

const router = express.Router();

router.post("/get-token", getToken);
router.post("/send-sms", verifyAdmin, sendSMS);
//router.post("/send-sms-2", verifyAdmin, sendSMS2);
router.get("/rpx-virtual-accounts", verifyAdmin, checkVirtualAccounts);
router.get("/rpx-check-accounts", verifyAdmin, checkRazorpayAccount);
router.post("/create-tiers", createTier);
router.post("/add-members", addMembers);

export default router;