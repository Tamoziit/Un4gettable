import { Request, Response } from "express";
import razorpay from "../../services/razorpay";
import { v4 as uuidv4 } from "uuid";

export const payFund = async (req: Request, res: Response) => {
    try {
        const { amount, receiverId, purpose = "P2P Transfer" } = req.body;
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
        console.log("Error in Govt. payFund controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}