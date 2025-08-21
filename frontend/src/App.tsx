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
import ProjectRepo from "./pages/repository/ProjectRepo";
import ProjectDetails from "./pages/repository/ProjectDetails";
import ProblemRepository from "./pages/repository/ProblemRepo";
import ProblemUpload from "./pages/upload/ProjectUpload";

function App() {
	const { authUser } = useAuthContext();

	return (
		<>
			<div className="min-h-screen bg-gradient-to-br from-slate-800 to-black">

				<Routes>
					<Route path="/" element={authUser ? <Navigate to="/home" /> : <Landing />} />
					<Route path="/login" element={authUser ? <Navigate to="/home" /> : <Login />} />

				{/* Signup Routes */}
					<Route path="/user/signup" element={authUser ? <Navigate to="/home" /> : <UserSignup />} />
					<Route path="/ngo/signup" element={authUser ? <Navigate to="/home" /> : <NgoSignup />} />
					<Route path="/gov/signup" element={authUser ? <Navigate to="/home" /> : <GovSignup />} />

				{/* Repository Routes */}
					<Route path="/repository/project" element={authUser ? <ProjectRepo />  : <Navigate to="/" /> } />
					<Route path="/repository/project/:id" element={authUser ? <ProjectDetails/> : <Navigate to="/" />} />
					<Route path="/repository/problem" element={authUser ? <ProblemRepository /> : <Navigate to="/" />} />

 
				{/* Uploads project & Problem */}
					{/* <Route path="/repository/project/upload" element={authUser ? <ProjectDetails isUpload /> : <Navigate to="/" />} /> */}
					<Route path="/repository/problem/upload" element={authUser ? <ProblemUpload/> : <Navigate to="/" />} />
   

					<Route path="/home" element={authUser ? <Home /> : <Navigate to="/" />} />
					<Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/" />} />
				</Routes>

				<Toaster />
			</div>
		</>
	)
}

export default App
