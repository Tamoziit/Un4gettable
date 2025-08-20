export interface UserSignupParams {
    fullName: string;
    email: string;
    city: string;
    state: string;
    pincode: string;
    mobileNo: string;
    password: string;
    gender: string;
}

export interface NgoSignupParams {
        regid: string;
        ngoname: string;
		email: string;
		city: string;
		state: string;
		pincode: string;
		mobileNo: string;
		password: string;
		aim: string;
        SDGgoal: string[];
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
    fullName: string;
    username: string;
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