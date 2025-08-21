import AppNavbar from "../../components/navbars/AppNavbar";
import { useAuthContext } from "../../context/AuthContext";
import NoticeBoard from "../../components/home/RecentHazard";
import Activities from "../../components/home/Activities";
const Home = () => {
	const { authUser } = useAuthContext();
	return (
		<>
			<AppNavbar />

			{/* Hero Section */}
			<div className="flex flex-col md:flex-row items-center justify-around px-6 md:px-12 pt-12">
      <img
        src="/Logo.png"
        alt="Logo"
        className="size-40 md:size-60 lg:size-[400px]"
      />

      <div className="flex flex-col items-center md:items-end gap-1 mt-6 md:mt-0">
        <h1 className="text-gray-200 text-2xl md:text-3xl lg:text-4xl font-semibold text-center">
          Welcome
        </h1>
			
					<h2 className="text-green-400 text-4xl md:text-5xl lg:text-7xl font-bold text-center">
						{authUser?.name}
					</h2>
				</div>
			</div>

			{/* Notice Board Section */}
			<NoticeBoard />
			{/* Activities Section */}
   <Activities />
		</>
	);
};

export default Home;
