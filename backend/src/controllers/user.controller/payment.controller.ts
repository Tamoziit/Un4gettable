import { Request, Response } from "express";
import razorpay from "../../services/razorpay";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL, KEY_ID, KEY_SECRET } from "../../utils/razorpay-utils";
import { PaymentProps, PaymentVerificationProps } from "../../types";
import crypto from "crypto";
import axios from "axios";

export const payFund = async (req: Request, res: Response) => {
    try {
        const { amount, purpose = "P2P Transfer" }: PaymentProps = req.body;
        if (!amount || amount <= 0) {
            res.status(400).json({ error: "Invalid amount" });
            return;
        }

        const payload = {
            amount: Math.round(amount * 100),
            currency: "INR",
            accept_partial: false,
            description: purpose,
            reference_id: uuidv4(),
            customer: {
                name: req.user?.name || "Payer",
                email: req.user?.email || undefined,
                contact: req.user?.mobileNo || undefined
            },
            notify: {
                sms: true,
                email: true
            },
            callback_url: `${process.env.BASE_URL}/payment/payment-success`,
            callback_method: "get",
        };

        const link = await razorpay.paymentLink.create(payload);

        res.status(200).json(link.short_url);
    } catch (error) {
        console.log("Error in User payFund controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const verifyPayment = async (req: Request, res: Response) => {
    try {
        const {
            razorpay_payment_id,
            razorpay_payment_link_id,
            razorpay_payment_link_reference_id,
            razorpay_payment_link_status,
            razorpay_signature
        }: PaymentVerificationProps = req.body;

        if (!razorpay_signature) {
            res.status(400).json({ error: "Missing razorpay_signature" });
            return;
        }

        const payloadParts = [
            razorpay_payment_link_id || "",
            razorpay_payment_link_reference_id || "",
            razorpay_payment_link_status || "",
            razorpay_payment_id || ""
        ];
        const payload = payloadParts.join("|");

        const expectedSignature = crypto
            .createHmac("sha256", KEY_SECRET)
            .update(payload)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            res.status(400).json({ error: "Invalid signature" });
            return;
        }

        if (!razorpay_payment_id) {
            res.status(400).json({ error: "Missing payment id" });
            return;
        }

        // Fetching payment details from Razorpay server-side (authoritative)
        const response = await axios.get(`${BASE_URL}/payments/${encodeURIComponent(razorpay_payment_id)}`, {
            auth: { username: KEY_ID, password: KEY_SECRET }
        });
        const payment = response.data;

        if (!payment) {
            res.status(400).json({ error: "Error in verifying payment" });
            return;
        }

        res.status(200).json({
            ok: true,
            signatureVerified: true,
            paymentSummary: {
                id: payment.id,
                status: payment.status,
                amount: payment.amount,
                currency: payment.currency,
                method: payment.method,
                captured: payment.captured,
                created_at: payment.created_at
            }
        });
    } catch (error) {
        console.log("Error in User verifyPayment controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}