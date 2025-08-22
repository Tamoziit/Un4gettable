import React from "react";

export type ProjectDetailsState = {
  name: string;
  city: string;
  state: string;
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD
  aim: string;
};

type Props = {
  value: ProjectDetailsState;
  onChange: (next: ProjectDetailsState) => void;
};

const ProjectDetailsForm: React.FC<Props> = ({ value, onChange }) => {
  const update = (patch: Partial<ProjectDetailsState>) =>
    onChange({ ...value, ...patch });

  return (
    <div className="rounded-2xl bg-gray-800/70 p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Project Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Project Name *</label>
          <input
            value={value.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="Sundarbans Climate Resilience Project"
            className="w-full rounded-xl bg-gray-900/70 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-100 p-3 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">City *</label>
          <input
            value={value.city}
            onChange={(e) => update({ city: e.target.value })}
            placeholder="Canning"
            className="w-full rounded-xl bg-gray-900/70 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-100 p-3 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">State *</label>
          <input
            value={value.state}
            onChange={(e) => update({ state: e.target.value })}
            placeholder="West Bengal"
            className="w-full rounded-xl bg-gray-900/70 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-100 p-3 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Start Date *</label>
            <input
              type="date"
              value={value.start}
              onChange={(e) => update({ start: e.target.value })}
              className="w-full rounded-xl bg-gray-900/70 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-100 p-3 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">End Date *</label>
            <input
              type="date"
              value={value.end}
              onChange={(e) => update({ end: e.target.value })}
              className="w-full rounded-xl bg-gray-900/70 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-100 p-3 outline-none"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-300 mb-1">Aim *</label>
          <input
            value={value.aim}
            onChange={(e) => update({ aim: e.target.value })}
            placeholder="To strengthen climate resilience and biodiversity conservation in the Sundarbans region"
            className="w-full rounded-xl bg-gray-900/70 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-100 p-3 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsForm;
