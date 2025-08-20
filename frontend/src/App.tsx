import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Landing from "./pages/landing/Landing";
import Login from "./pages/auth/Login";
import UserSignup from "./pages/auth/UserSignup";
import NgoSignup from "./pages/auth/NgoSignup";
import GovSignup from "./pages/auth/GovSignup";
import Home from "./pages/home/Home";
import { useAuthContext } from "./context/AuthContext";
import Profile from "./pages/profile/Profile";

function App() {
	const { authUser } = useAuthContext();

	return (
		<>
			<div className="min-h-screen bg-gradient-to-br from-slate-800 to-black">

				<Routes>
					<Route path="/" element={authUser ? <Navigate to="/home" /> : <Landing />} />
					<Route path="/login" element={authUser ? <Navigate to="/home" /> : <Login />} />
					<Route path="/user/signup" element={authUser ? <Navigate to="/home" /> : <UserSignup />} />
					<Route path="/ngo/signup" element={authUser ? <Navigate to="/home" /> : <NgoSignup />} />
					<Route path="/gov/signup" element={authUser ? <Navigate to="/home" /> : <GovSignup />} />
					<Route path="/home" element={authUser ? <Home /> : <Navigate to="/" />} />
					<Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/" />} />
				</Routes>

				<Toaster />
			</div>
		</>
	)
}

export default App
