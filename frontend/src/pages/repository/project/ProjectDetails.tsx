import { useEffect, useState } from "react";
import AppNavbar from "../../../components/navbars/AppNavbar";
import { useParams } from "react-router-dom";
import useGetProjectById from "../../../hooks/useGetProjectById";
import toast from "react-hot-toast";
import type { Project } from "../../../types";


const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const { loading, getProject } = useGetProjectById();

  const fetchProject = async () => {
    if (id) {
      const data = await getProject(id);
      setProject(data);
    } else {
      toast.error("Error in fetching Project data");
    }
  }

  useEffect(() => {
    fetchProject();
  }, []);

  if (!project || loading) {
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

      <div className="px-8 md:px-16 pt-20 pb-6">
        <h1 className="text-gray-200 text-3xl md:text-4xl font-bold mb-6 text-center">
          {project.name}
        </h1>

        {/* Image */}
        <img
          src="/bg1.jpg"
          alt={project.name}
          className="w-full max-h-[400px] object-cover rounded-2xl shadow-lg mb-6"
        />

        {/* Details */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 space-y-3">
          <p className="text-gray-300">
            <span className="font-semibold">SDG:</span>{" "}
            {project.SDG.join(", ")}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Owner:</span> {project.owner}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Aim:</span> {project.aim}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Location:</span> {`${project.location.city}, ${project.location.state}`}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Timeline:</span> {project.timeline.startDate} →{" "}
            {project.timeline.endDate}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Target:</span>{" "}
            ₹ {project.target}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Funding Raised:</span>{" "}
            ₹ {project.fundRaised}
          </p>
        </div>

        {/* Tariff Plans */}
        <h2 className="text-blue-400 text-2xl font-semibold mb-4">
          Donation Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {project.tariff.map((plan, _idx) => {
            const planLabel = String.fromCharCode(65 + _idx); // 65 = 'A'
            return (
              <div
                key={_idx}
                className="bg-gray-700 p-6 rounded-xl shadow-md text-center hover:scale-105 transition"
              >
                <p className="text-xl font-bold">Plan {planLabel}</p>
                <p className="text-green-400 text-lg">₹ {plan}</p>
              </div>
            );
          })}
        </div>

        <button className="w-full py-3 text-lg font-semibold rounded-xl shadow-md bg-blue-500 text-white hover:bg-blue-600 transition">
          Donate Now
        </button>

        {/* Reports */}
        <h2 className="text-blue-400 text-2xl font-semibold mt-10 pb-4">
          Reports
        </h2>
        {project.reports.length > 0 ? (
          <div className="bg-gray-800 rounded-2xl shadow-lg p-6 overflow-y-auto space-y-3">
            {project.reports.map((report, i) => (
              <div
                key={i}
                className="bg-gray-700 rounded-xl p-3 shadow-md flex justify-between"
              >
                <span className="text-gray-400">{report}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex w-full pb-6">
            <span className="text-gray-300">No Reports submitted yet</span>
          </div>
        )}

        <button className="py-2 px-6 text-base font-semibold rounded-xl shadow-md bg-blue-500 text-white hover:bg-blue-600 transition">Submit a report</button>
      </div>
    </>
  );
};

export default ProjectDetails;
