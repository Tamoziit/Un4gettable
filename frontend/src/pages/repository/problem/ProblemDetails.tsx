import { Link } from "react-router-dom";
import AppNavbar from "../../../components/navbars/AppNavbar";
import MapAtCoords from "../../../components/maps/MapAtCoords";
import type { Problem } from "../../../types";


const ProblemDetails = () => {
  const problem: Problem = {
    _id: "68a8663bb74f9f3cbc73b9cb",
    owner: "68a85799748a7533bbc1674c",
    url: "https://res.cloudinary.com/dc23g63i8/image/upload/v1755866660/r0nhvtbyhbpigiom4izf.jpg",
    problem: "No Deforestation (Compliance)",
    SDG: ["15", "13", "12"],
    alertLevel: "high",
    actionableInsights: [
      "Announce no-deforestation zones; publish forest-clearance transparency dashboards",
      "Implement certification and traceability for timber and NTFPs with monitoring, reporting, and verification",
      "Strengthen urban bylaws to prevent forest-edge encroachment; tighten compensatory afforestation quality checks",
      "Embed no-deforestation clauses in national supply chains and trade agreements with long-term monitoring",
      "Conduct landscape-level planning to protect conservation corridors alongside development",
    ],
    NGOWorking: ["WWF India", "Green Earth Trust"],
    GovtWorking: ["MoEFCC", "State Forest Dept"],
    reports: ["Annual Deforestation Report 2025", "Kolkata Green Audit 2024"],
    statusForUser: "pending",
    statusForGovt: "done",
    location: {
      lat: 22.517319418548563,
      lon: 88.41849368922372,
      address:
        "GC89+WFX, Mundapara, Chak Kolarkhal, Kolkata, West Bengal 700107, India",
    },
    comments: [{ name: "gggg", message: "gvvdjcvjhca" }],
    createdAt: "2025-08-22T12:44:43.817Z",
    updatedAt: "2025-08-22T12:44:43.817Z",
  };

  const createdDate = new Date(problem.createdAt).toLocaleString();
  const isHigh = problem.alertLevel?.toLowerCase() === "high";

  // Utility to style status
  const getStatusClass = (status: string) => {
    const lower = status.toLowerCase();
    if (lower === "pending") return "text-yellow-400 font-bold";
    if (lower === "done") return "text-green-400 font-bold";
    if (lower === "rejected") return "text-red-400 font-bold";
    return "text-gray-300";
  };

  return (
    <>
      <AppNavbar />
      <div className="px-6 md:px-12 pt-24 max-w-6xl mx-auto">
        <header className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-100">
              {problem.problem}
            </h1>
            <Link
              to="/repository/problem"
              className="text-blue-400 hover:underline"
            >
              ← Back to list
            </Link>
          </div>
          <p className="text-sm text-gray-400">Reported: {createdDate}</p>
        </header>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Image + Info */}
          <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-800/60">
            <img
              src={problem.url}
              alt={problem.problem}
              className="w-full h-72 object-cover"
            />
            <div className="p-4 space-y-4">
              {/* SDGs */}
              <div>
                <p className="text-base font-semibold text-gray-200 mb-2">
                  SDGs Targeted:
                </p>
                <div className="flex flex-wrap gap-2">
                  {problem.SDG.map((sdg) => (
                    <span
                      key={sdg}
                      className="px-3 py-1 rounded-lg bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-sm font-medium"
                    >
                      SDG {sdg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Alert */}
              <p className="text-sm text-gray-300 flex items-center gap-2">
                <span className="font-semibold">Alert Level:</span>{" "}
                <span
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-base font-bold ${
                    isHigh
                      ? "bg-red-900/40 text-red-400"
                      : "bg-yellow-900/40 text-yellow-400"
                  }`}
                >
                  ⚠️ {problem.alertLevel}
                </span>
              </p>
            </div>
          </div>

          {/* Right: Map + Location */}
          <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-800/60 p-4 flex flex-col">
            <MapAtCoords
              lat={problem.location.lat}
              lon={problem.location.lon}
              height={300}
              zoom={16}
              showAddress={false}
            />
            <p className="mt-3 text-sm text-gray-300">
              <span className="font-semibold">Location:</span>{" "}
              {problem.location?.address}
            </p>
          </div>
        </div>

        {/* Actionable Insights */}
        <section className="mt-8 rounded-2xl bg-gray-800/60 p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-100 mb-3">
            Actionable Insights
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            {problem.actionableInsights.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </section>

        {/* Reports */}
        <section className="mt-8 rounded-2xl bg-gray-800/60 p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-100 mb-3">Reports</h2>
          {problem.reports.length > 0 ? (
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              {problem.reports.map((rep, idx) => (
                <li key={idx}>{rep}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No reports yet.</p>
          )}
        </section>

        {/* NGOs + Govt + Status (3 in a row) */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* NGOs */}
          <div className="rounded-2xl bg-gray-800/60 p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-100 mb-3">
              NGOs Working
            </h2>
            {problem.NGOWorking.length > 0 ? (
              <ul className="list-disc list-inside text-gray-200 space-y-1">
                {problem.NGOWorking.map((ngo, idx) => (
                  <li key={idx}>{ngo}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No NGOs reported yet.</p>
            )}
          </div>

          {/* Govt */}
          <div className="rounded-2xl bg-gray-800/60 p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-100 mb-3">
              Govt Bodies Working
            </h2>
            {problem.GovtWorking.length > 0 ? (
              <ul className="list-disc list-inside text-gray-200 space-y-1">
                {problem.GovtWorking.map((gov, idx) => (
                  <li key={idx}>{gov}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No Govt bodies reported yet.</p>
            )}
          </div>

          {/* Status */}
          <div className="rounded-2xl bg-gray-800/60 p-6 shadow-lg space-y-3">
            <h2 className="text-2xl font-semibold text-gray-100 mb-3">
              Status
            </h2>
            <p className="text-sm text-gray-300">
              <span className="font-semibold">User Status:</span>{" "}
              <span className={getStatusClass(problem.statusForUser)}>
                {problem.statusForUser}
              </span>
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-semibold">Govt Status:</span>{" "}
              <span className={getStatusClass(problem.statusForGovt)}>
                {problem.statusForGovt}
              </span>
            </p>
          </div>
        </section>

        {/* Comments */}
        <section className="mt-8 rounded-2xl bg-gray-800/60 p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-100 mb-3">
            💬 Comments
          </h2>
          {Array.isArray(problem.comments) && problem.comments.length > 0 ? (
            <div className="space-y-3">
              {problem.comments.map((c, idx) => (
                <div key={idx} className="rounded-xl bg-gray-900/60 p-3">
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-gray-100">
                      {c.name || "Anonymous"}:
                    </span>{" "}
                    {c.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex w-full pb-6">
            <span className="text-gray-300">No Reports submitted yet</span>
          </div>
          )}
        </section>

     <div className="flex justify-center mt-6">
  <Link
    to="/report/submit"
    className="py-2 px-6 text-base font-semibold rounded-xl shadow-md bg-blue-500 text-white hover:bg-blue-600 transition"
  >
    Submit a report
  </Link>
</div>

      </div>
    </>
  );
};

export default ProblemDetails;
