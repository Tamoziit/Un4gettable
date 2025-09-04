import type { ReactNode } from "react";

export interface UserSignupParams {
    name: string;
    email: string;
    city: string;
    state: string;
    pincode: string;
    mobileNo: string;
    password: string;
    gender: string;
}

export interface LoginParams {
    role: "user" | "ngo" | "govt" | string;
    email: string;
    password: string;
}

export interface NgoSignupParams {
    regId: string;
    name: string;
    email: string;
    city: string;
    state: string;
    pincode: string;
    mobileNo: string;
    password: string;
    aim: string;
    SDG: string[];
}

export interface GovSignupParams {
    govtId: string;
    name: string;
    email: string;
    mobileNo: string;
    city: string;
    state: string;
    pincode: string;
    password: string;
}


export interface AuthUser {
    _id: string;
    role: "user" | "ngo" | "govt";
    name: string;
    email: string;
    mobileNo: string;
    gender: "M" | "F" | "O";
    profilePic?: string | null;
}

export interface AuthContextType {
    authUser: AuthUser | null;
    setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
    loading: boolean;
}

export interface AuthContextProviderProps {
    children: ReactNode;
}

export interface TabIconProps {
    focused: boolean;
    icon: any;
}

export interface ActivitiesButtonsProps {
    label: string;
    path: string;
}