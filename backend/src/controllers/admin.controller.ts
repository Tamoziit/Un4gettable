import { Request, Response } from "express";
import { AdminToken, Receiver, VirtualAccount } from "../types";
import jwt from "jsonwebtoken";
import twilioClient from "../services/twilio";
import axios from "axios";
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

export const checkVirtualAccounts = async (req: Request, res: Response) => {
	try {
		const response = await axios.get(
			"https://api.razorpay.com/v1/virtual_accounts",
			{
				auth: {
					username: process.env.RAZORPAY_KEY_ID!,
					password: process.env.RAZORPAY_KEY_SECRET!,
				},
			}
		);

		// Transform the data into a clean JSON structure
		const virtualAccounts = response.data.items.map((account: any, index: number) => {
			const accountData = {
				index: index + 1,
				id: account.id,
				status: account.status,
				description: account.description || 'N/A',
				amount_expected: account.amount_expected,
				amount_paid: account.amount_paid,
				customer_id: account.customer_id,
				close_by: account.close_by,
				closed_at: account.closed_at,
				created_at: account.created_at,
				receivers: [] as any[]
			};

			if (account.receivers && account.receivers.length > 0) {
				accountData.receivers = account.receivers.map((receiver: any, rIndex: number) => ({
					index: rIndex + 1,
					id: receiver.id,
					entity: receiver.entity,
					type: receiver.type,
					account_number: receiver.account_number,
					ifsc: receiver.ifsc || 'N/A',
					bank_name: receiver.bank_name || 'N/A',
					name: receiver.name || 'N/A',
					is_payout_account: receiver.type === 'bank_account',
					use_for_payouts: receiver.type === 'bank_account' ? receiver.account_number : null
				}));
			}

			return accountData;
		});

		// Find the recommended account for payouts
		const payoutAccount: VirtualAccount | undefined = (virtualAccounts as VirtualAccount[]).find((account: VirtualAccount) =>
			account.receivers.some((receiver: Receiver) => receiver.is_payout_account)
		);

		const recommendedAccountNumber = payoutAccount?.receivers.find(
			(receiver: any) => receiver.is_payout_account
		)?.account_number;

		res.status(200).json({
			success: true,
			total_accounts: response.data.count,
			recommended_payout_account: recommendedAccountNumber || null,
			accounts: virtualAccounts,
			raw_response: response.data
		});

	} catch (error) {
		if (axios.isAxiosError(error)) {
			const rzpError = error.response?.data?.error;
			const errMsg = rzpError?.description || error.message || "Unknown Razorpay error";

			return res.status(error.response?.status || 400).json({
				success: false,
				error: errMsg,
				details: rzpError || null,
			});
		}

		res.status(500).json({
			success: false,
			error: "Internal Server Error",
			details: error instanceof Error ? error.message : "Unknown error"
		});
	}
};

export const checkRazorpayAccount = async (req: Request, res: Response) => {
	const auth = {
		username: process.env.RAZORPAY_KEY_ID!,
		password: process.env.RAZORPAY_KEY_SECRET!,
	};

	try {
		// Check account details
		const accountResponse = await axios.get(
			"https://api.razorpay.com/v1/account",
			{ auth }
		);

		// Check what endpoints are accessible
		const endpointChecks = [];

		// Test various endpoints
		const endpointsToTest = [
			{ name: "Virtual Accounts", url: "https://api.razorpay.com/v1/virtual_accounts" },
			{ name: "Fund Accounts", url: "https://api.razorpay.com/v1/fund_accounts" },
			{ name: "Contacts", url: "https://api.razorpay.com/v1/contacts" },
			{ name: "Payouts", url: "https://api.razorpay.com/v1/payouts" }
		];

		for (const endpoint of endpointsToTest) {
			try {
				await axios.get(endpoint.url, { auth });
				endpointChecks.push({ name: endpoint.name, status: "accessible" });
			} catch (error) {
				if (axios.isAxiosError(error)) {
					endpointChecks.push({
						name: endpoint.name,
						status: "not_accessible",
						error: error.response?.data?.error?.description || "Unknown error"
					});
				}
			}
		}

		res.status(200).json({
			success: true,
			account_details: accountResponse.data,
			endpoint_accessibility: endpointChecks,
			recommendations: {
				razorpay_x_needed: !endpointChecks.find(e => e.name === "Virtual Accounts" && e.status === "accessible"),
				next_steps: [
					"If Virtual Accounts is not accessible, you need RazorpayX",
					"Contact Razorpay support to enable RazorpayX",
					"Once enabled, you can create virtual accounts for payouts"
				]
			}
		});

	} catch (error) {
		if (axios.isAxiosError(error)) {
			return res.status(error.response?.status || 500).json({
				success: false,
				error: error.response?.data?.error?.description || "API Error",
				details: error.response?.data
			});
		}

		return res.status(500).json({
			success: false,
			error: "Internal Server Error",
			details: error instanceof Error ? error.message : "Unknown error"
		});
	}
};