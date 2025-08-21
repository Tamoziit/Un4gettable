import AppNavbar from "../../components/navbars/AppNavbar";
import { useParams } from "react-router-dom";

const projects = [
  {
    id: "1",
    name: "Flood Management System",
    sdg: ["13", "13.1"],
    owner: "Govt. of Odisha",
    aim: "IoT-based sensors for early flood detection and alerts.",
    location: "Bhubaneswar, Odisha",
    targetFund: "₹1,00,000",
    receivedFund: "₹35,000",
    start: "01-08-2025",
    end: "31-12-2025",
    image: "/flood.jpg",
    reports: [
      { date: "10-08-2025", title: "Initial Setup Completed" },
      { date: "15-08-2025", title: "Installed 10 IoT sensors" },
    ],
  },
  {
    id: "2",
    name: "Clean Oceans Drive",
    sdg: ["14", "14.1", "14.2"],
    owner: "BlueWave NGO",
    aim: "Removing 50 tons of plastic waste from Bay of Bengal.",
    location: "Visakhapatnam, Andhra Pradesh",
    targetFund: "₹5,00,000",
    receivedFund: "₹1,50,000",
    start: "01-07-2025",
    end: "31-03-2026",
    image: "/ocean.jpg",
    reports: [
      { date: "05-07-2025", title: "Launched awareness campaign" },
      { date: "20-07-2025", title: "Removed 2 tons of waste" },
    ],
  },
  {
    id: "3",
    name: "Solar Schools Project",
    sdg: ["7", "13"],
    owner: "Govt. of Rajasthan",
    aim: "Install solar panels in 200 rural schools.",
    location: "Jaipur, Rajasthan",
    targetFund: "₹10,00,000",
    receivedFund: "₹6,00,000",
    start: "15-06-2025",
    end: "15-12-2025",
    image: "/solar.jpg",
    reports: [
      { date: "01-07-2025", title: "First 20 schools covered" },
      { date: "10-08-2025", title: "Reached 100 schools milestone" },
    ],
  },
  {
    id: "4",
    name: "Tree Plantation Mission",
    sdg: ["15", "13"],
    owner: "GreenEarth NGO",
    aim: "Plant 1 million trees in drought-prone regions.",
    location: "Nagpur, Maharashtra",
    targetFund: "₹20,00,000",
    receivedFund: "₹7,50,000",
    start: "01-05-2025",
    end: "31-05-2026",
    image: "/trees.jpg",
    reports: [
      { date: "15-05-2025", title: "Planted 50,000 trees" },
      { date: "01-07-2025", title: "Survival rate 85% confirmed" },
    ],
  },
  {
    id: "5",
    name: "Rural Health Clinics",
    sdg: ["3", "10"],
    owner: "Govt. of Bihar",
    aim: "Set up mobile health clinics in remote villages.",
    location: "Patna, Bihar",
    targetFund: "₹8,00,000",
    receivedFund: "₹2,25,000",
    start: "10-08-2025",
    end: "30-04-2026",
    image: "/health.jpg",
    reports: [
      { date: "12-08-2025", title: "Deployed 2 mobile vans" },
      { date: "05-09-2025", title: "Served 500+ patients" },
    ],
  },
];

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <>
        <AppNavbar />
        <div className="px-8 md:px-16 pt-20 text-center text-red-400 text-xl">
          Project Not Found
        </div>
      </>
    );
  }

  return (
    <>
      <AppNavbar />

      <div className="px-8 md:px-16 pt-20">
        <h1 className="text-gray-200 text-3xl md:text-4xl font-bold mb-6 text-center">
          {project.name}
        </h1>

        {/* Image */}
        <img
          src={project.image}
          alt={project.name}
          className="w-full max-h-[400px] object-cover rounded-2xl shadow-lg mb-6"
        />

        {/* Details */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 space-y-3">
          <p className="text-gray-300">
            <span className="font-semibold">SDG:</span>{" "}
            {project.sdg.join(", ")}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Owner:</span> {project.owner}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Aim:</span> {project.aim}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Location:</span> {project.location}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Timeline:</span> {project.start} →{" "}
            {project.end}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Funding:</span>{" "}
            {project.receivedFund} / {project.targetFund}
          </p>
        </div>

        {/* Tariff Plans */}
        <h2 className="text-blue-400 text-2xl font-semibold mb-4">
          Donation Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-700 p-6 rounded-xl shadow-md text-center hover:scale-105 transition">
            <p className="text-xl font-bold">Plan A</p>
            <p className="text-green-400 text-lg">₹500</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-xl shadow-md text-center hover:scale-105 transition">
            <p className="text-xl font-bold">Plan B</p>
            <p className="text-green-400 text-lg">₹1000</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-xl shadow-md text-center hover:scale-105 transition">
            <p className="text-xl font-bold">Plan C</p>
            <p className="text-green-400 text-lg">₹2000</p>
          </div>
        </div>

        <button className="w-full py-3 text-lg font-semibold rounded-xl shadow-md bg-blue-500 text-white hover:bg-blue-600 transition">
          Donate Now
        </button>

        {/* Reports */}
        <h2 className="text-blue-400 text-2xl font-semibold mt-10 mb-4">
          Reports
        </h2>
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 h-[200px] overflow-y-auto space-y-3">
          {project.reports.map((report, i) => (
            <div
              key={i}
              className="bg-gray-700 rounded-xl p-3 shadow-md flex justify-between"
            >
              <span className="text-gray-400">{report.date}</span>
              <span className="text-gray-200">{report.title}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
