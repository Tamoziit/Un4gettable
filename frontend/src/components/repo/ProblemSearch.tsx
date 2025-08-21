import { useState } from "react";
import { FaSearch, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type ProblemSearchBarProps = {
  onSearch: (query: string) => void;
  resetFilters: () => void;
  sdgOptions: string[];
  locationOptions: string[];
  onFilterSDG: (sdg: string) => void;
  onFilterLocation: (location: string) => void;
};

const ProblemSearchBar: React.FC<ProblemSearchBarProps> = ({
  onSearch,
  resetFilters,
  sdgOptions,
  locationOptions,
  onFilterSDG,
  onFilterLocation,
}) => {
  const [search, setSearch] = useState<string>("");

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <div className="w-full flex justify-center mt-6">
      <div className="w-full lg:w-[85%] rounded-xl shadow-lg p-4 bg-gray-700">
        <div className="flex flex-col gap-4 px-4 py-5">
          
          {/* Search Box */}
          <div className="w-full rounded-full p-2 bg-gray-600 flex items-center gap-4 border-2 border-gray-500 focus-within:border-blue-500">
            <FaSearch className="text-gray-300 ml-2" />
            <input
              className="bg-gray-600 text-gray-200 outline-none border-none rounded-md px-2 py-1 w-full"
              type="text"
              placeholder="Search by Problem Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className="rounded-full p-2 w-fit bg-blue-600 hover:bg-blue-700 mr-1"
              onClick={handleSearch}
            >
              <FaSearch className="text-white" />
            </button>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4 items-center justify-center mt-2">
            {/* SDG Dropdown */}
            <div className="flex items-center gap-2 bg-gray-600 py-1 px-3 rounded-full border-2 border-gray-500 hover:border-blue-500">
              <FaGlobe className="text-blue-400" />
              <select
                className=" bg-gray-600 text-gray-200 outline-none border-none rounded-md px-2 py-1"
                onChange={(e) => onFilterSDG(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Filter by SDG
                </option>
                {sdgOptions.map((sdg) => (
                  <option key={sdg} value={sdg}>
                    {sdg}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Dropdown */}
            <div className="flex items-center gap-2 bg-gray-600 py-1 px-3 rounded-full border-2 border-gray-500 hover:border-blue-500">
              <FaMapMarkerAlt className="text-red-400" />
              <select
                className="bg-gray-600 text-gray-200 outline-none border-none rounded-md px-2 py-1"
                onChange={(e) => onFilterLocation(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Filter by Location
                </option>
                {locationOptions.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters */}
            <button
              className="flex items-center gap-2 bg-gray-600 text-base py-1 px-3 rounded-full border-2 border-gray-500 text-gray-200 hover:border-blue-500 hover:text-blue-400"
              onClick={resetFilters}
            >
              <MdDelete className="text-red-400" />
              <span className="bg-gray-600 text-gray-200 outline-none border-none rounded-md px-2 py-1">
                Reset Filters
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSearchBar;
