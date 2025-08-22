import { useState } from "react";
import AppNavbar from "../../components/navbars/AppNavbar";

interface ReportData {
  startDate: string;
  endDate: string;
  actions: string[];
  workforce: number;
  articulateProof: string[];
}

const SubmitReport = () => {
  const [report, setReport] = useState<ReportData>({
    startDate: "",
    endDate: "",
    actions: [""],
    workforce: 0,
    articulateProof: [],
  });

  const updateAction = (index: number, value: string) => {
    const newActions = [...report.actions];
    newActions[index] = value;
    setReport({ ...report, actions: newActions });
  };

  const addAction = () => setReport({ ...report, actions: [...report.actions, ""] });

  const removeAction = (index: number) => {
    const newActions = report.actions.filter((_, i) => i !== index);
    setReport({ ...report, actions: newActions });
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setReport({ ...report, articulateProof: [...report.articulateProof, ...urls] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("✅ Report Submitted:", report);
    alert("Report submitted successfully! (check console)");
  };

  return (
    <>
    <AppNavbar />
    <form
      onSubmit={handleSubmit}
      className=" pt-40 mt-8 rounded-2xl bg-gray-800/60 p-6 shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">📑 Submit Report</h2>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 text-sm mb-1">Start Date</label>
          <input
            type="date"
            value={report.startDate}
            onChange={(e) => setReport({ ...report, startDate: e.target.value })}
            className="w-full rounded-lg p-2 bg-gray-900/70 text-gray-200 border border-gray-700"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm mb-1">End Date</label>
          <input
            type="date"
            value={report.endDate}
            onChange={(e) => setReport({ ...report, endDate: e.target.value })}
            className="w-full rounded-lg p-2 bg-gray-900/70 text-gray-200 border border-gray-700"
            required
          />
        </div>
      </div>

      {/* Workforce */}
      <div>
        <label className="block text-gray-300 text-sm mb-1">Workforce</label>
        <input
          type="number"
          min={1}
          value={report.workforce}
          onChange={(e) => setReport({ ...report, workforce: Number(e.target.value) })}
          className="w-full rounded-lg p-2 bg-gray-900/70 text-gray-200 border border-gray-700"
          required
        />
      </div>

      {/* Actions */}
      <div>
        <label className="block text-gray-300 text-sm mb-2">Actions Taken</label>
        {report.actions.map((action, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="text"
              value={action}
              onChange={(e) => updateAction(idx, e.target.value)}
              className="flex-1 rounded-lg p-2 bg-gray-900/70 text-gray-200 border border-gray-700"
              placeholder={`Action ${idx + 1}`}
              required
            />
            {idx > 0 && (
              <button
                type="button"
                onClick={() => removeAction(idx)}
                className="px-3 py-1 bg-red-600/70 text-white rounded-lg hover:bg-red-700"
              >
                ✖
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addAction}
          className="px-3 py-1 bg-blue-600/70 text-white rounded-lg hover:bg-blue-700"
        >
          ➕ Add Action
        </button>
      </div>

      {/* Proof */}
      <div>
  <label className="block text-gray-300 text-sm mb-2">
    Upload Proof (Images)
  </label>

  {/* File Upload Button */}
  <label className="inline-block px-4 py-2 bg-gray-700 text-gray-200 rounded-lg shadow cursor-pointer hover:bg-gray-600 transition">
    📂 Choose Files
    <input
      type="file"
      multiple
      accept="image/*"
      onChange={(e) => handleFiles(e.target.files)}
      className="hidden" // hide actual input
    />
  </label>

  {/* Show selected file names */}
  {report.articulateProof.length === 0 ? (
    <p className="text-sm text-gray-400 mt-2">No files chosen</p>
  ) : (
    <p className="text-sm text-emerald-400 mt-2">
      {report.articulateProof.length} file(s) selected
    </p>
  )}

  {/* Preview Images */}
  <div className="flex flex-wrap gap-3 mt-3">
    {report.articulateProof.map((url, idx) => (
      <img
        key={idx}
        src={url}
        alt={`proof-${idx}`}
        className="h-24 w-24 object-cover rounded-lg border border-gray-700"
      />
    ))}
  </div>
</div>


<div className="flex justify-center mt-6">
  <button
    type="submit"
    className="px-6 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold shadow-md transition"
  >
    ✅ Submit Report
  </button>
</div>
    </form>
    </>
  );
};

export default SubmitReport;
