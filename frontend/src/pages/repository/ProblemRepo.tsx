import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppNavbar from "../../components/navbars/AppNavbar";
import Spinner from "../../components/Spinner";
import useGetProblems from "../../hooks/useGetProblems";
import type { Problem } from "../../types";
import ProblemSearchBar from "../../components/repo/ProblemSearch";

const ProblemRepository = () => {
  const [problems, setProblems] = useState<Problem[] | null>(null);
  const [filteredProblems, setFilteredProblems] = useState<Problem[] | null>(null);
  const { loading, getProblems } = useGetProblems();

  const fetchProblems = async () => {
    const fetchedProblems = await getProblems();
    setProblems(fetchedProblems);
    setFilteredProblems(fetchedProblems);
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  // 🔍 Search by problem text
  const handleSearch = (query: string) => {
    if (!problems) return;
    const results = problems.filter((problem) =>
      problem.problem.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProblems(results);
  };

  // 🌍 Filter by SDG
  const handleFilterSDG = (sdg: string) => {
    if (!problems) return;
    const results = problems.filter((problem) => problem.SDG.includes(sdg));
    setFilteredProblems(results);
  };

  // 📍 Filter by location
  const handleFilterLocation = (location: string) => {
    if (!problems) return;
    const results = problems.filter(
      (problem) =>
        problem.location.address.toLowerCase().includes(location.toLowerCase()) ||
        problem.location.city?.toLowerCase().includes(location.toLowerCase()) ||
        problem.location.state?.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredProblems(results);
  };

  // 🔄 Reset
  const resetFilters = () => {
    setFilteredProblems(problems);
  };

  if (loading || !filteredProblems) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center z-0">
        <Spinner size="large" />
      </div>
    );
  }

  // Unique dropdown options
  const sdgOptions = Array.from(new Set(problems?.map((p) => p.SDG) || []));
  const locationOptions = Array.from(
    new Set(problems?.map((p) => p.location.state || p.location.city) || [])
  );

  return (
    <>
      <AppNavbar />

      <div className="px-8 md:px-16 pt-20">
        <h1 className="text-gray-200 text-3xl md:text-4xl font-bold mb-2 text-center">
          Problem Repository
        </h1>

        {/* Subtitle */}
        <h2 className="flex items-center justify-center gap-2 
          text-2xl md:text-3xl font-bold text-blue-300 
          bg-blue-900/40 border-2 border-blue-500 
          rounded-xl px-6 py-3 w-fit mx-auto 
          shadow-lg shadow-blue-500/30">
          🌍 Problems reported across regions ⚠️
        </h2>

        {/* Search & Filters */}
        <ProblemSearchBar
          onSearch={handleSearch}
          resetFilters={resetFilters}
          sdgOptions={sdgOptions}
          locationOptions={locationOptions}
          onFilterSDG={handleFilterSDG}
          onFilterLocation={handleFilterLocation}
        />

        <div className="w-full rounded-2xl shadow-lg p-6 space-y-4">
          {filteredProblems.length === 0 ? (
            <p className="text-gray-400 text-center">No problems found.</p>
          ) : (
            filteredProblems.map((problem) => (
              <Link
                key={problem._id}
                to={`/repository/problem/${problem._id}`}
                className="block bg-gray-700 rounded-xl p-4 hover:bg-gray-600 transition shadow-md"
              >
                <div className="flex gap-4">
                  <img
                    src={problem.url}
                    alt={problem.problem}
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-blue-300">
                      {problem.problem}
                    </h3>
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold">SDG:</span> {problem.SDG}
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold">Alert Level:</span>{" "}
                      <span
                        className={
                          problem.alertLevel === "high"
                            ? "text-red-400 font-bold"
                            : "text-yellow-400 font-bold"
                        }
                      >
                        {problem.alertLevel}
                      </span>
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold">Location:</span>{" "}
                      {problem.location.address}
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

export default ProblemRepository;
