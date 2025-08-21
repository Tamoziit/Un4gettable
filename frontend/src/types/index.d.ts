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
}

export interface AuthContextProviderProps {
    children: ReactNode;
}

export interface Project {
    _id: string;
    owner: string;
    ownerModel: "NGO" | "Govt";
    name: string;
    location: {
        city: string;
        state: string;
    };
    SDG: string[];
    aim: string;
    description: string;
    objectives: string[];
    tariff: number[];
    fundRaised: number;
    reports: string[];
}

export interface Problem {
  _id: string;
  owner: string;
  url: string;
  problem: string;
  SDG: string;
  alertLevel: string;
  actionableInsights: string[];
  NGOWorking: string[];
  GovtWorking: string[];
  reports: string[];
  statusForUser: string;
  statusForGovt: string;
  location: {
    lat: number;
    lon: number;
    address: string;
  };
  createdAt: string;
  updatedAt: string;
}