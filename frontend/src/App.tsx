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
import ProjectRepo from "./pages/repository/project/ProjectRepo";
import ProjectDetails from "./pages/repository/project/ProjectDetails";
import ProblemRepository from "./pages/repository/problem/ProblemRepo";
import ProblemUpload from "./pages/upload/ProblemUpload";
import ProjectUpload from "./pages/upload/ProjectUpload";
import Dashboard from "./pages/dashboard/Dashboard";
import ProblemDetails from "./pages/repository/problem/ProblemDetails";
import ProgressTracker from "./pages/progress-tracker/progressTracker";

function App() {
	const { authUser } = useAuthContext();

	return (
		<>
			<div className="min-h-screen bg-gradient-to-br from-[#1e3a2f] via-[#0f2c3f] to-[#0a1625]">
				<Routes>
					<Route path="/" element={authUser ? <Navigate to="/home" /> : <Landing />} />
					<Route path="/login" element={authUser ? <Navigate to="/home" /> : <Login />} />

					{/* Signup Routes */}
					<Route path="/user/signup" element={authUser ? <Navigate to="/home" /> : <UserSignup />} />
					<Route path="/ngo/signup" element={authUser ? <Navigate to="/home" /> : <NgoSignup />} />
					<Route path="/gov/signup" element={authUser ? <Navigate to="/home" /> : <GovSignup />} />

					{/* Repository Routes */}
					<Route path="/repository/project" element={authUser ? <ProjectRepo /> : <Navigate to="/" />} />
					<Route path="/repository/project/:id" element={authUser ? <ProjectDetails /> : <Navigate to="/" />} />
					<Route path="/repository/problem" element={authUser ? <ProblemRepository /> : <Navigate to="/" />} />

					{/* Uploads project & Problem */}
					{/* <Route path="/repository/project/upload" element={authUser ? <ProjectDetails isUpload /> : <Navigate to="/" />} /> */}
					<Route path="/repository/problem/upload" element={authUser ? <ProblemUpload /> : <Navigate to="/" />} />
					<Route path="/repository/project/upload" element={authUser ? <ProjectUpload /> : <Navigate to="/" />} />

					<Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/" />} />
					<Route path="/progress-tracker" element={authUser ? <ProgressTracker /> : <Navigate to="/" />} />

					{/* Map section */}
					<Route path="/repository/problem/:id" element={authUser ? <ProblemDetails /> : <Navigate to="/" />} />

					<Route path="/home" element={authUser ? <Home /> : <Navigate to="/" />} />
					<Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/" />} />
				</Routes>

				<Toaster />
			</div>
		</>
	)
}

export default App
