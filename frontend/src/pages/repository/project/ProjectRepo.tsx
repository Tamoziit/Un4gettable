import { useEffect, useState } from "react";
import AppNavbar from "../../../components/navbars/AppNavbar";
import { Link } from "react-router-dom";
import useGetProjects from "../../../hooks/useGetProjects";
import Spinner from "../../../components/Spinner";
import type { Project } from "../../../types";
import ProjectSearchBar from "../../../components/repo/SearchBar"; 

const ProjectRepository = () => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<Project[] | null>(null);
  const { loading, getProjects } = useGetProjects();

  const fetchProjects = async () => {
    const fetchedProjects = await getProjects();
    setProjects(fetchedProjects);
    setFilteredProjects(fetchedProjects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSearch = (query: string) => {
    if (!projects) return;
    const results = projects.filter((project) =>
      project.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProjects(results);
  };

  const handleFilterSDG = (sdg: string) => {
    if (!projects) return;
    const results = projects.filter((project) => project.SDG.includes(sdg));
    setFilteredProjects(results);
  };

  const handleFilterOwner = (owner: string) => {
    if (!projects) return;
    const results = projects.filter((project) => project.owner === owner);
    setFilteredProjects(results);
  };

  const resetFilters = () => {
    setFilteredProjects(projects);
  };

  if (loading || !filteredProjects) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center z-0">
        <Spinner size="large" />
      </div>
    );
  }

  // Extract unique SDGs & Owners for dropdowns
  const sdgOptions = Array.from(new Set(projects?.flatMap((p) => p.SDG) || []));
  const ownerOptions = Array.from(new Set(projects?.map((p) => p.owner) || []));

  return (
    <>
      <AppNavbar />

      <div className="px-8 md:px-16 pt-20">
        <h1 className="text-gray-200 text-3xl md:text-4xl font-bold mb-2 text-center">
          Project Repository
        </h1>

        {/* Subtitle */}
        <h2 className="flex items-center justify-center gap-2 
  text-2xl md:text-3xl font-bold text-blue-300 
  bg-blue-900/40 border-2 border-blue-500 
  rounded-xl px-6 py-3 w-fit mx-auto 
  shadow-lg shadow-blue-500/30">
  <span className="text-blue-400">💡</span>
  Projects that need your funding
  <span className="text-blue-400">💰</span>
</h2>

        {/* Search & Filters */}
        <ProjectSearchBar
          onSearch={handleSearch}
          resetFilters={resetFilters}
          sdgOptions={sdgOptions}
          ownerOptions={ownerOptions}
          onFilterSDG={handleFilterSDG}
          onFilterOwner={handleFilterOwner}
        />

        <div className="w-full rounded-2xl shadow-lg p-6 space-y-4">
          {filteredProjects.length === 0 ? (
            <p className="text-gray-400 text-center">No projects found.</p>
          ) : (
            filteredProjects.map((project) => (
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
                      <span className="font-semibold">Owner:</span>{" "}
                      {project.owner}
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold">Aim:</span> {project.aim}
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold">Location:</span>{" "}
                      {`${project.location.city}, ${project.location.state}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-400">
                      ₹ {project.target}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectRepository;