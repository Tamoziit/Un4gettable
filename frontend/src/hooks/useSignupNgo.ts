import { useState } from "react"
import toast from "react-hot-toast";
import type { NgoSignupParams } from "../types";
import { useAuthContext } from "../context/AuthContext";

const useSignupNgo = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const signupNgo = async ({
		regid,
        ngoname,
		email,
		city,
		state,
		pincode,
		mobileNo,
		password,
		aim,
        SDGgoal
    }: NgoSignupParams) => {
        const success = handleInputErrors({
		regid,
        ngoname,
		email,
		city,
		state,
		pincode,
		mobileNo,
		password,
		aim,
        SDGgoal
        });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("DB-token")}`
                },
                body: JSON.stringify({
                    regid,
                    ngoname,
                    email,
                    city,
                    state,
                    pincode,
                    mobileNo,
                    password,
                    aim,
                    SDGgoal
                })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Storing user data with expiry
            const now = new Date().getTime();
            const expiry = now + 30 * 24 * 60 * 60 * 1000; // 30 days

            localStorage.setItem("DB-token", data.token);
            localStorage.setItem("DB-user", JSON.stringify(data));
            localStorage.setItem("DB-expiry", expiry.toString());
            setAuthUser(data);

            if (data) {
                toast.success("Signed up Successfully");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                console.log(error);
            } else {
                console.log("An unknown error occurred", error);
            }
        } finally {
            setLoading(false);
        }
    }
    return { loading, signupNgo };
}

export default useSignupNgo;


function handleInputErrors({
    regid,
        ngoname,
		email,
		city,
		state,
		pincode,
		mobileNo,
		password,
		aim,
        SDGgoal
}: NgoSignupParams) {
    if (  !email || !password || !mobileNo || !regid || !ngoname || !city || !state || !pincode || !aim || !SDGgoal     ) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password should be atleast 6 characters long");
        return false;
    }

    if(mobileNo.length !== 10) {
        toast.error("Enter a valid Mobile No.");
        return false;
    }

    
    return true;
}