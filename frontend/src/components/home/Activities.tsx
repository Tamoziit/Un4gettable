import { useState } from "react";
import { Link } from "react-router-dom";
const Activities = () => {
  const [activities] = useState([
    { label: "Problem Repository", color: "bg-blue-500 hover:bg-blue-600", path: "/repository/problem" },
    { label: "Project Repository", color: "bg-green-500 hover:bg-green-600", path: "/repository/project" },
    { label: "Project Problem Dashboard", color: "bg-purple-500 hover:bg-purple-600", path: "/repository/project-problem" },
    { label: "Progress Tracker", color: "bg-orange-500 hover:bg-orange-600", path: "/repository/progress-tracker" },
  ]);


  return (
    <div id="activities" className="px-6 md:px-12 mt-12 pb-12">
      <div className="w-full flex flex-col gap-1 items-center justify-center">
        <h2 className="text-gray-200 text-2xl md:text-3xl font-semibold mb-2 text-center">
          Activities
        </h2>
        <p className="text-subhead text-center">Explore our key features and tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {activities.map((activity, index) => (
          <Link
            key={index}
            className={`w-full flex item-center justify-center cursor-pointer py-6 text-lg font-semibold rounded-2xl shadow-md text-white hover:scale-105 transition ${activity.color}`}
            to={activity.path}
          >
            {activity.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Activities;

