import { useEffect, useState } from "react";
import AppNavbar from "../../../components/navbars/AppNavbar";
import { Link } from "react-router-dom";
import useGetProjects from "../../../hooks/useGetProjects";
import Spinner from "../../../components/Spinner";
import type { Project } from "../../../types";
import ProjectSearchBar from "../../../components/repo/SearchBar";
import ProjectCard from "../../../components/repo/ProjectCard";

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

  // 🔍 Search
  const handleSearch = (query: string) => {
    if (!projects) return;
    const results = projects.filter((project) =>
      project.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProjects(results);
  };

  // 🌍 Filter by SDG
  const handleFilterSDG = (sdg: string) => {
    if (!projects) return;
    const results = projects.filter((project) => project.SDG.includes(sdg));
    setFilteredProjects(results);
  };

  // 👤 Filter by Owner
  const handleFilterOwner = (owner: string) => {
    if (!projects) return;
    const results = projects.filter((project) => project.owner === owner);
    setFilteredProjects(results);
  };

  // 🔄 Reset
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

  // Unique dropdowns
  const sdgOptions = Array.from(new Set(projects?.flatMap((p) => p.SDG) || []));
  const ownerOptions = Array.from(new Set(projects?.map((p) => p.owner) || []));

  return (
    <>
      <AppNavbar />

      <div className="px-8 md:px-16 pt-20">
        <h1 className="text-gray-200 text-3xl md:text-4xl font-bold mb-2 text-center">
          PROJECT REPOSITORY
        </h1>

        {/* Highlight Subtitle */}
        <h2
          className="flex items-center justify-center gap-2 
            text-2xl md:text-3xl font-bold text-[#2298b9] 
            bg-[#1B2432] border-2 border-[#2298b9]
            rounded-xl px-6 py-3 w-fit mx-auto 
            shadow-lg shadow-[#2298b9]"
        >
          💡 Projects That Need Your Funding 💰
        </h2>

        {/* Onboard CTA */}
        <div className="mt-6 w-full flex items-center justify-center">
          <Link
            to="/repository/problem/onboard"
            className="inline-flex items-center justify-center gap-2
               rounded-xl px-6 py-3
               text-white font-semibold
               bg-[#2298b9] hover:bg-[#1f89a7] active:bg-[#1c7b95]
               shadow-lg shadow-[#2298b9]/30
               transition-transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#2298b9]"
          >
            On Board
          </Link>
        </div>

        {/* 🔍 Search + Filters */}
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
            filteredProjects.map((project: Project) => (
              <ProjectCard
                project={project}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectRepository;