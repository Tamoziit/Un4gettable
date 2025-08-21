import express from 'express';
import { checkRazorpayAccount, checkVirtualAccounts, getToken, sendSMS } from '../controllers/admin.controller';
import verifyAdmin from '../middlewares/admin.middleware';

const router = express.Router();

router.post("/get-token", getToken);
router.post("/send-sms", verifyAdmin, sendSMS);
//router.post("/send-sms-2", verifyAdmin, sendSMS2);
router.get("/rpx-virtual-accounts", verifyAdmin, checkVirtualAccounts);
router.get("/rpx-check-accounts", verifyAdmin, checkRazorpayAccount);

export default router;