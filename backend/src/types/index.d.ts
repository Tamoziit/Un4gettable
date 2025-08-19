import { Types } from "mongoose";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

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

export interface NGOSignupBody {
    regId: string;
    name: string;
    email: string;
    password: string;
    mobileNo: string;
    city: string;
    state: string;
    pincode: string;
    SDG: string[];
    aim: string;
    objectives: string[];
}

export interface NGOLoginBody {
    email: string;
    password: string;
}

export interface GovtSignupBody {
    govtId: string;
    name: string;
    email: string;
    password: string;
    mobileNo: string;
    city: string;
    state: string;
    pincode: string;
}

export interface GovtLoginBody {
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

export interface NGO {
    _id: Types.ObjectId;
    role: string;
    regId: string;
    name: string;
    email: string;
    password: string;
    mobileNo: string;
    profilePic?: string | null;
    projectRepoIds: Types.ObjectId[];
    location?: {
        city: string;
        state: string;
        pincode: string
    } | null;
    SDG: string[];
    aim: string;
    objectives: string[];
}

export interface Govt {
    _id: Types.ObjectId;
    role: string;
    govtId: string;
    name: string;
    email: string;
    password: string;
    mobileNo: string;
    profilePic?: string | null;
    projectRepoIds: Types.ObjectId[];
    jurisdiction?: {
        city: string;
        state: string;
        pincode: string
    } | null;
}

declare module "express" {
    export interface Request {
        user?: User;
        ngo?: NGO;
        govt?: Govt;
    }
}

export interface DecodedToken extends JwtPayload {
    userId: string;
    role: "user" | "ngo" | "govt";
}

export interface ProjectCreationProps {
    name: string;
    city: string;
    state: string;
    startDate: string;
    endDate: string;
    SDG: string[];
    aim: string;
    description: string;
    objectives: string[];
    tariff: number[];
}

export interface PostProblemProps {
    url: string;
    description?: string | null;
    lat: number;
    lon: number;
}