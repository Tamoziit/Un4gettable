import axios from "axios";
import { CreateContactProps, FundAccountCreationProps } from "../types";

const BASE_URL = "https://api.razorpay.com/v1";
const auth = {
    username: process.env.RP_KEY_ID!,
    password: process.env.RP_KEY_SECRET!,
};

export const createContact = async ({ name, email, contact, type = "customer", reference_id }: CreateContactProps) => {
    const body = {
        name,
        email,
        contact,
        type,
        reference_id
    };

    const res = await axios.post(`${BASE_URL}/contacts`, body, { auth });
    return res.data;
}

export const createFundAccountBank = async ({ contact_id, name, ifsc, account_number }: FundAccountCreationProps) => {
    const body = {
        contact_id,
        bank_account: {
            name, ifsc,
            account_number
        },
        type: "bank_account",
    };

    const res = await axios.post(`${BASE_URL}/fund_accounts`, body, { auth });
    return res.data;
}