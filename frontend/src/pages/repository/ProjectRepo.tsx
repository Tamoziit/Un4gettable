import AppNavbar from "../../components/navbars/AppNavbar";
import { Link } from "react-router-dom";

const ProjectRepository = () => {
  const projects = [
    {
      id: 1,
      name: "Flood Management System",
      sdg: ["13", "13.1"],
      owner: "Govt. of Odisha",
      aim: "IoT-based sensors for early flood detection and alerts.",
      location: "Bhubaneswar, Odisha",
      targetFund: "₹1,00,000",
    },
    {
      id: 2,
      name: "Heatwave Shelter Locator",
      sdg: ["13", "3.9"],
      owner: "NGO GreenLife",
      aim: "Mobile app to locate nearby shelters during heatwaves.",
      location: "Ahmedabad, Gujarat",
      targetFund: "₹5,00,000",
    },
    {
      id: 3,
      name: "Plastic-Free Rivers",
      sdg: ["14", "14.1"],
      owner: "RiverCare Foundation",
      aim: "Deploy river-cleaning boats to remove plastic waste.",
      location: "Varanasi, Uttar Pradesh",
      targetFund: "₹2,50,000",
    },
    {
      id: 4,
      name: "Solar Microgrid for Villages",
      sdg: ["7", "13"],
      owner: "Govt. of Rajasthan",
      aim: "Provide renewable electricity to rural households.",
      location: "Jodhpur, Rajasthan",
      targetFund: "₹10,00,000",
    },
    {
      id: 5,
      name: "Mangrove Restoration",
      sdg: ["14", "15"],
      owner: "NGO BlueEarth",
      aim: "Restore degraded mangroves to protect coastal areas.",
      location: "Sundarbans, West Bengal",
      targetFund: "₹7,50,000",
    },
  ];

  return (
    <>
      <AppNavbar />

      <div className="px-8 md:px-16 pt-20">
        <h1 className="text-gray-200 text-3xl md:text-4xl font-bold mb-2 text-center">
          Project Repository
        </h1>

        {/* Subtitle */}
        <h2 className="text-blue-400 text-xl md:text-2xl font-semibold text-center underline decoration-blue-400 decoration-2 mb-8">
          Projects that need your funding
        </h2>

        {/* Scrollable Notice-Board Style */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 h-[400px] overflow-y-auto space-y-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/repository/project/${project.id}`}
              className="block bg-gray-700 rounded-xl p-4 hover:bg-gray-600 transition shadow-md"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-blue-300">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold">SDG:</span>{" "}
                    {project.sdg.join(", ")}
                  </p>
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold">Owner:</span> {project.owner}
                  </p>
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold">Aim:</span> {project.aim}
                  </p>
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold">Location:</span>{" "}
                    {project.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-400">
                    {project.targetFund}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectRepository;
