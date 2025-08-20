import express from 'express';
import { getToken, sendSMS } from '../controllers/admin.controller';
import verifyAdmin from '../middlewares/admin.middleware';

const router = express.Router();

router.post("/get-token", getToken);
router.post("/send-sms", verifyAdmin, sendSMS);
//router.post("/send-sms-2", verifyAdmin, sendSMS2);

export default router;