import AppNavbar from "../../components/navbars/AppNavbar";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
	const { authUser } = useAuthContext();

	// Ata hard code kora API diye korte hbe
	const [notices] = useState([
		{ id: 1, title: "Flood Alert in Assam", date: "Aug 19, 2025" },
		{ id: 2, title: "Heatwave Warning in Delhi NCR", date: "Aug 17, 2025" },
		{ id: 3, title: "Cyclone Warning in Odisha Coast", date: "Aug 14, 2025" },
		{ id: 4, title: "Landslide Alert in Himachal Pradesh", date: "Aug 12, 2025" },
		{ id: 5, title: "Heavy Rainfall Expected in Kerala", date: "Aug 10, 2025" },
	]);

	return (
		<>
			<AppNavbar />

			{/* Hero Section */}
			<div className="flex flex-col md:flex-row items-center justify-around px-16 pt-20">
				<img
					src="/Logo.png"
					alt="Logo"
					className="size-60 lg:size-[400px]"
				/>

				<div className="flex flex-col items-center md:items-end gap-1">
					<h1 className="text-gray-200 text-3xl md:text-4xl lg:text-6xl font-semibold text-center">
						Welcome
					</h1>
					<h2 className="text-blue-400 text-4xl md:text-5xl lg:text-7xl font-bold text-center">
						{authUser?.name}
					</h2>
				</div>
			</div>

			{/* Notice Board Section */}
			<div className="px-8 md:px-16 mt-16">
				<h2 className="text-gray-200 text-2xl md:text-3xl font-semibold mb-4 text-center">
					Recent Hazard News
				</h2>

				<div className="bg-gray-800 rounded-xl shadow-lg p-4 h-64 overflow-y-auto">
					<ul className="space-y-3">
						{notices.map((notice) => (
							<li
								key={notice.id}
								className="bg-gray-700 rounded-lg p-3 flex flex-col hover:bg-gray-600 transition"
							>
								<span className="text-blue-400 font-semibold">{notice.title}</span>
								<span className="text-sm text-gray-400">{notice.date}</span>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Activities Section */}
			<div className="px-8 md:px-16 mt-16">
        <h2 className="text-gray-200 text-2xl md:text-3xl font-semibold mb-6 text-center">
          Activities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/repository/problem">
            <button className="w-full py-6 text-lg font-semibold rounded-2xl shadow-md bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 transition">
              Problem Repository
            </button>
          </Link>

          <Link to="/repository/project">
            <button className="w-full py-6 text-lg font-semibold rounded-2xl shadow-md bg-green-500 text-white hover:bg-green-600 hover:scale-105 transition">
              Project Repository
            </button>
          </Link>

          <Link to="/dashboard/project-problem">
            <button className="w-full py-6 text-lg font-semibold rounded-2xl shadow-md bg-purple-500 text-white hover:bg-purple-600 hover:scale-105 transition">
              Project Problem Dashboard
            </button>
          </Link>

          <Link to="/tracker/progress">
            <button className="w-full py-6 text-lg font-semibold rounded-2xl shadow-md bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 transition">
              Progress Tracker
            </button>
          </Link>
        </div>
			</div>
		</>
	);
};

export default Home;
