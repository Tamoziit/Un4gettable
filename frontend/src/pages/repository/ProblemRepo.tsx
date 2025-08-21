import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppNavbar from "../../components/navbars/AppNavbar";
import Spinner from "../../components/Spinner";
import useGetProblems from "../../hooks/useGetProblems";
import type { Problem } from "../../types";

const ProblemRepository = () => {
  const [problems, setProblems] = useState<Problem[] | null>(null);
  const { loading, getProblems } = useGetProblems();

  const fetchProblems = async () => {
    const fetchedProblems = await getProblems();
    setProblems(fetchedProblems);
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  if (loading || !problems) {
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
          Problem Repository
        </h1>
        <h2 className="text-blue-400 text-xl md:text-2xl font-semibold text-center underline decoration-blue-400 decoration-2 mb-8">
          Problems reported across regions
        </h2>

        <div className="w-full rounded-2xl shadow-lg p-6 space-y-4">
          {problems.map((problem) => (
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
          ))}
        </div>
      </div>
    </>
  );
};

export default ProblemRepository;