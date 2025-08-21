import { useState } from "react";
import LandingNavbar from "../../components/navbars/LandingNavbar";
import { toast } from "react-hot-toast";

type ProjectPayload = {
  name: string;
  city: string;
  state: string;
  startDate: string;   // "DD-MM-YYYY"
  endDate: string;     // "DD-MM-YYYY"
  SDG: string[];       // e.g., ["13.2","14.3","15.1"]
  aim: string;
  description: string;
  objectives: string[];
  tariff: number[];
};

const SDG_OPTIONS = [
  "13.1","13.2","13.3",
  "14.1","14.2","14.3","14.4","14.5","14.6","14.7","14.a","14.b","14.c",
  "15.1","15.2","15.3","15.4","15.5","15.6","15.7","15.8","15.9",
];

function toDDMMYYYY(input: string) {
  // Accepts "YYYY-MM-DD" from <input type='date'> and returns "DD-MM-YYYY"
  if (!input) return "";
  const [y, m, d] = input.split("-");
  return `${d}-${m}-${y}`;
}

const ProjectUpload = () => {
  const [form, setForm] = useState({
    name: "",
    city: "",
    state: "",
    start: "", // HTML date value (YYYY-MM-DD)
    end: "",   // HTML date value (YYYY-MM-DD)
    aim: "",
    description: "",
  });

  const [sdg, setSdg] = useState<string[]>([]);
  const [objectives, setObjectives] = useState<string[]>([""]);
  const [tariff, setTariff] = useState<number[]>([1000, 2500, 7500]);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as { name: keyof typeof form; value: string };
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSDG = (code: string) => {
    setSdg((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const updateObjective = (idx: number, value: string) => {
    setObjectives((prev) => prev.map((o, i) => (i === idx ? value : o)));
  };

  const addObjective = () => setObjectives((prev) => [...prev, ""]);
  const removeObjective = (idx: number) =>
    setObjectives((prev) => prev.filter((_, i) => i !== idx));

  const updateTariff = (idx: number, value: string) => {
    const num = Number(value.replace(/[^\d]/g, ""));
    setTariff((prev) => prev.map((t, i) => (i === idx ? (isNaN(num) ? 0 : num) : t)));
  };

  const addTariff = () => setTariff((prev) => [...prev, 0]);
  const removeTariff = (idx: number) =>
    setTariff((prev) => prev.filter((_, i) => i !== idx));

  const validate = () => {
    if (!form.name.trim()) return "Project name is required";
    if (!form.city.trim()) return "City is required";
    if (!form.state.trim()) return "State is required";
    if (!form.start) return "Start date is required";
    if (!form.end) return "End date is required";
    if (new Date(form.end) < new Date(form.start)) return "End date must be after start date";
    if (sdg.length === 0) return "Select at least one SDG";
    if (!form.aim.trim()) return "Aim is required";
    if (!form.description.trim()) return "Description is required";
    const nonEmptyObjectives = objectives.map(o => o.trim()).filter(Boolean);
    if (nonEmptyObjectives.length === 0) return "Add at least one objective";
    const validTariff = tariff.filter((t) => t > 0);
    if (validTariff.length === 0) return "Add at least one tariff amount";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }
    const payload: ProjectPayload = {
      name: form.name.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      startDate: toDDMMYYYY(form.start),
      endDate: toDDMMYYYY(form.end),
      SDG: sdg,
      aim: form.aim.trim(),
      description: form.description.trim(),
      objectives: objectives.map((o) => o.trim()).filter(Boolean),
      tariff: tariff.filter((t) => t > 0),
    };

    try {
      setSubmitting(true);
      // TODO: Replace with your API call
      // const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/project`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      //   body: JSON.stringify(payload),
      // });
      // const data = await res.json();
      // if (!res.ok) throw new Error(data.message || "Failed to create project");

      console.log("Project payload:", payload);
      toast.success("Project ready to submit (stub). Wire this to your API.");
      // Optional: reset form
      // setForm({ name:"", city:"", state:"", start:"", end:"", aim:"", description:"" });
      // setSdg([]);
      // setObjectives([""]);
      // setTariff([1000, 2500, 7500]);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <LandingNavbar />

      <form onSubmit={handleSubmit} className="mx-auto max-w-5xl px-6 md:px-10 py-8 md:py-12">
        <header className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-100">Upload Project</h1>
          <p className="text-subhead mt-1">
            Fill out the project details. Fields marked with an asterisk (*) are required.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Project Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Sundarbans Climate Resilience Project"
              className="w-full rounded-xl bg-gray-900/70 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-100 p-3 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">City *</label>
            <input
              name="city"
              value={form.city}
              onChange={onChange}
              placeholder="Canning"
              className="w-full rounded-xl bg-gray-900/70 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-100 p-3 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">State *</label>
            <input
              name="state"
              value={form.state}
              onChange={onChange}
              placeholder="West Bengal"
              className="w-full rounded-xl bg-gray-900/70 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-100 p-3 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Start Date *</label>
              <input
                type="date"
                name="start"
                value={form.start}
                onChange={onChange}
                className="w-full rounded-xl bg-gray-900/70 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-100 p-3 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">End Date *</label>
              <input
                type="date"
                name="end"
                value={form.end}
                onChange={onChange}
                className="w-full rounded-xl bg-gray-900/70 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-100 p-3 outline-none"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-300 mb-1">Aim *</label>
            <input
              name="aim"
              value={form.aim}
              onChange={onChange}
              placeholder="To strengthen climate resilience and biodiversity conservation in the Sundarbans region"
              className="w-full rounded-xl bg-gray-900/70 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-100 p-3 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-300 mb-1">Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              rows={5}
              placeholder="This project aims to combat climate change impacts in the Sundarbans by restoring mangroves..."
              className="w-full rounded-xl bg-gray-900/70 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-100 p-3 outline-none"
            />
          </div>

          {/* SDG multi-select */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-300 mb-2">SDGs *</label>
            <div className="flex flex-wrap gap-2">
              {SDG_OPTIONS.map((code) => {
                const active = sdg.includes(code);
                return (
                  <button
                    type="button"
                    key={code}
                    onClick={() => toggleSDG(code)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      active
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-800 text-gray-200 hover:bg-gray-700"
                    }`}
                  >
                    {code}
                  </button>
                );
              })}
            </div>
            {sdg.length > 0 && (
              <p className="text-xs text-gray-400 mt-2">Selected: {sdg.join(", ")}</p>
            )}
          </div>

          {/* Objectives dynamic list */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-300 mb-2">Objectives *</label>
            <div className="flex flex-col gap-3">
              {objectives.map((obj, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={obj}
                    onChange={(e) => updateObjective(i, e.target.value)}
                    placeholder={`Objective ${i + 1}`}
                    className="flex-1 rounded-xl bg-gray-900/70 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-100 p-3 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeObjective(i)}
                    className="px-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white transition"
                    aria-label={`Remove objective ${i + 1}`}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addObjective}
                className="self-start mt-1 px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white text-sm transition"
              >
                + Add Objective
              </button>
            </div>
          </div>

          {/* Tariff dynamic list */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-300 mb-2">Donation Plans (Tariff) *</label>
            <div className="flex flex-col gap-3">
              {tariff.map((amt, i) => (
                <div key={i} className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                    <input
                      value={amt}
                      onChange={(e) => updateTariff(i, e.target.value)}
                      inputMode="numeric"
                      className="w-full rounded-xl bg-gray-900/70 border border-gray-700 focus:border-green-500 focus:ring-green-500 text-gray-100 p-3 pl-7 outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTariff(i)}
                    className="px-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white transition"
                    aria-label={`Remove tariff ${i + 1}`}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addTariff}
                className="self-start mt-1 px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white text-sm transition"
              >
                + Add Tariff
              </button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8 flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white px-6 py-3 font-semibold transition hover:scale-105"
          >
            {submitting ? "Submitting..." : "Create Project"}
          </button>
          <p className="text-xs text-gray-400">
            Review details before submitting. You can edit later in project settings.
          </p>
        </div>
      </form>
    </>
  );
};

export default ProjectUpload;
