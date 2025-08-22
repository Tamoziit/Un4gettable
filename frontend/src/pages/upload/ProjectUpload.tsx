import { useState } from "react";
import LandingNavbar from "../../components/navbars/LandingNavbar";
import ProjectDetailsForm from "../../components/project/ProjectDetailsForm";
import type { ProjectDetailsState } from "../../components/project/ProjectDetailsForm";
import ProjectExtrasForm from "../../components/project/ProjectExtrasForm";
import type { ProjectExtrasState } from "../../components/project/ProjectExtrasForm";
import useUploadProject from "../../hooks/useUploadProject";

// Helper: YYYY-MM-DD → DD-MM-YYYY
const toDDMMYYYY = (input: string) => {
  if (!input) return "";
  const [y, m, d] = input.split("-");
  return `${d}-${m}-${y}`;
};

// Helper: Trim array values and drop empties
const cleanArray = (arr: string[]) => arr.map((o) => o.trim()).filter(Boolean);

const ProjectUpload = () => {
  const [details, setDetails] = useState<ProjectDetailsState>({
    name: "",
    city: "",
    state: "",
    start: "",
    end: "",
    aim: "",
  });
  const [extras, setExtras] = useState<ProjectExtrasState>({
    sdg: [],
    description: "",
    objectives: [""],
    target: "",
    tariff: [1000, 2500, 7500],
  });
  const { loading, uploadProject } = useUploadProject();

  const handleSubmit = async () => {
    const payload = {
      name: details.name.trim(),
      city: details.city.trim(),
      state: details.state.trim(),
      startDate: toDDMMYYYY(details.start),
      endDate: toDDMMYYYY(details.end),
      SDG: extras.sdg,
      aim: details.aim.trim(),
      description: extras.description.trim(),
      objectives: cleanArray(extras.objectives),
      target: Number(extras.target),
      tariff: extras.tariff.filter((t) => t > 0),
    };

    await uploadProject(payload);
  };

  return (
    <>
      <LandingNavbar />
      <main className="mx-auto max-w-5xl px-6 md:px-10 py-8 md:py-12 pb-40">
        <header className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-100 pt-4 pb-4">
            Upload Project
          </h1>
          <p className="text-subhead mt-1">
            Step 1: Enter details. Step 2: Add description, SDGs, objectives, and donation plans.
          </p>
        </header>


        <section className="grid grid-cols-1 gap-8">
          <ProjectDetailsForm value={details} onChange={setDetails} />
          <ProjectExtrasForm
            value={extras}
            onChange={setExtras}
            onSubmit={handleSubmit}
            submitting={loading}
          />
        </section>
      </main>
    </>
  );
};

export default ProjectUpload;
