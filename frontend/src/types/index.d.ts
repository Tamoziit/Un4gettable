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
    name: string;
    email: string;
    mobileNo: string;
    gender: "M" | "F" | "O";
    profilePic?: string | null;
}

export interface AuthContextType {
    authUser: AuthUser | null;
    setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

export interface AuthContextProviderProps {
    children: ReactNode;
}