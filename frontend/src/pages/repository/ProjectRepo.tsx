import { use, useEffect, useState } from "react";
import AppNavbar from "../../components/navbars/AppNavbar";
import { Link } from "react-router-dom";
import useGetProjects from "../../hooks/useGetProjects";
import Spinner from "../../components/Spinner";


const ProjectRepository = () => {
  const [projects, setProjects] = useState([]);
  const {loading, getProjects} = useGetProjects();

  const fetchProjects = async () => {
    const fetchedProjects = await getProjects();
    setProjects(fetchedProjects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  
  if (loading || !projects) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center z-0">
        <Spinner size="large" />
      </div>
    );
  }

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
        <div className="w-full rounded-2xl shadow-lg p-6 space-y-4">
          {projects.map((project) => (
            <Link
              key={project._id}
              to={`/repository/project/${project._id}`}
              className="block bg-gray-700 rounded-xl p-4 hover:bg-gray-600 transition shadow-md"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-blue-300">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold">SDG:</span>{" "}
                    {project.SDG.join(", ")}
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
