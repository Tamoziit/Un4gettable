import { Request, Response } from "express";
import { AdminToken } from "../types";
import jwt from "jsonwebtoken";
import twilioClient from "../services/twilio";
//import AWS from "aws-sdk";

export const getToken = async (req: Request, res: Response) => {
	try {
		const { password }: AdminToken = req.body;
		const adminPassword = process.env.ADMIN_PASSWORD!;

		if (!password || password !== adminPassword) {
			res.status(401).json({ error: "Invalid Admin Credentials" });
			return;
		}

		const payload = {
			adminPassword,
		};

		const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "5h" });
		res.status(200).json(token);
	} catch (error) {
		console.log("Error in getting Admin Token", error);
		res.status(500).json({ error: "Internal Server error" });
	}
}

export const sendSMS = async (req: Request, res: Response) => {
	try {
		const { phone, message } = req.body;

		const sms = await twilioClient.messages.create({
			body: message || "🚨 SOS Alert! Please help!",
			from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
			to: `+91${phone}`, // assuming Indian numbers
			messagingServiceSid: 'MGaf5170e85aba429fd3e1bf6a42f16a73'
		});

		res.json({ success: true, sid: sms.sid, status: sms.status });
	} catch (err) {
		console.error(err);
		res.status(500).json({ success: false, error: "Failed to send SMS" });
	}
}

/*export const sendSMS2 = async (req: Request, res: Response) => {
	AWS.config.update({ region: "ap-south-1" });
	const sns = new AWS.SNS();

	try {
		const { phone, message } = req.body;

		await sns.publish({
			Message: message || "🚨 SOS Alert! Please help!",
			PhoneNumber: phone,
		}).promise();

		res.json({ success: true });
	} catch (err) {
		console.error(err);
		res.status(500).json({ success: false });
	}
}*/