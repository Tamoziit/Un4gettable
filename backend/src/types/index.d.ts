import { Types } from "mongoose";
import { Request } from "express";

export interface AdminToken {
    password: string
}

export interface UserSignupBody {
    name: string;
    email: string;
    password: string;
    mobileNo: string;
    gender: "M" | "F" | "O";
    city: string;
    state: string;
    pincode: string;
}

export interface UserLoginBody {
    email: string;
    password: string;
}

export interface User {
    _id: Types.ObjectId;
    role: string;
    name: string;
    email: string;
    password: string;
    mobileNo: string;
    profilePic?: string | null;
    gender: "M" | "F" | "O";
    problemRepoIds: Types.ObjectId[];
    projectRepoIds: Types.ObjectId[];
    location?: {
        city: string;
        state: string;
        pincode: string
    } | null;
}

declare module "express" {
    export interface Request {
        user?: User;
    }
}