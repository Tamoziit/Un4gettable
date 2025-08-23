import { Link, useParams } from "react-router-dom";
import AppNavbar from "../../../components/navbars/AppNavbar";
import MapAtCoords from "../../../components/maps/MapAtCoords";
import type { Problem } from "../../../types";
import { useEffect, useState } from "react";
import useGetProblemById from "../../../hooks/useGetProblemById";
import toast from "react-hot-toast";

const ProblemDetails = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState<Problem | null>(null);
  const { loading, getProblem } = useGetProblemById();

  // NEW: comment modal state
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentForm, setCommentForm] = useState({ name: "", message: "" });
  const [submittingComment, setSubmittingComment] = useState(false);

  const fetchProblem = async () => {
    if (!id) {
      toast.error("Cannot get Problem ID");
      return;
    }
    const data = await getProblem(id);
    setProblem(data);
  };

  useEffect(() => {
    fetchProblem();
  }, []);

  // NEW: close modal on Escape
  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setShowCommentModal(false);
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  if (loading || !problem) {
    return (
      <div className="text-center text-white p-6">Loading Problem Data...</div>
    );
  }

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

  // NEW: submit comment handler (stub -> replace with API)
  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = commentForm.name.trim();
    const message = commentForm.message.trim();
    if (!message) return;

    try {
      setSubmittingComment(true);

      // TODO: Replace with your actual API endpoint
      // Example:
      // const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/ngo/problem/${problem._id}/comment`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name: name || "Anonymous", message }),
      // });
      // const data = await res.json();
      // if (!res.ok) throw new Error(data.message || "Failed to submit comment");

      // Simulate success
      await new Promise((r) => setTimeout(r, 800));

      // Optimistic UI: add to local list (optional)
      setProblem((prev) =>
        prev
          ? {
              ...prev,
              comments: [
                ...prev.comments,
                { name: name || "Anonymous", message },
              ],
            }
          : prev
      );

      toast.success("Comment submitted");
      setShowCommentModal(false);
      setCommentForm({ name: "", message: "" });
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit comment");
    } finally {
      setSubmittingComment(false);
    }
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

              <p className="text-sm text-gray-300 flex items-center gap-2">
                <span className="font-semibold">Confidence:</span>{" "}
                <span className="font-medium">
                  {problem.confidence.toFixed(4)}
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
              // If your MapAtCoords doesn't accept showAddress, just remove this prop
              // showAddress={false}
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
              Problem Resolution Status
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

        {/* COMMENTS -> replaced with "Add Comment" button and modal */}
        <section className="mt-8 rounded-2xl bg-gray-800/60 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-100">💬 Comments</h2>
            <span className="text-sm text-gray-400">
              {Array.isArray(problem.comments) ? problem.comments.length : 0} comments
            </span>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setShowCommentModal(true);
                setCommentForm({ name: "", message: "" });
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium transition hover:scale-105 shadow-lg"
            >
              <span>➕</span>
              Add Comment
            </button>
            <p className="mt-2 text-xs text-gray-400">
              Share your thoughts or report additional details about this problem
            </p>
          </div>
        </section>

        {/* Submit report CTA */}
        <div className="flex justify-center mt-6">
          <Link
            to="/report/submit"
            className="py-2 px-6 text-base font-semibold rounded-xl shadow-md bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Submit a report
          </Link>
        </div>
      </div>

      {/* COMMENT MODAL */}
      {showCommentModal && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="comment-modal-title"
          onClick={() => setShowCommentModal(false)}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Panel */}
          <div
            className="relative z- w-full sm:max-w-lg sm:rounded-2xl bg-gray-900 text-gray-100 shadow-2xl p-5 sm:p-6 mx-0 sm:mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 id="comment-modal-title" className="text-lg font-semibold">
                Add Comment
              </h3>
              <button
                type="button"
                onClick={() => setShowCommentModal(false)}
                className="rounded-lg p-2 hover:bg-gray-800 text-gray-300"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={submitComment} className="space-y-4">

              <div>
                <label htmlFor="comment-message" className="block text-sm font-medium text-gray-300 mb-1">
                  Comment *
                </label>
                <textarea
                  id="comment-message"
                  value={commentForm.message}
                  onChange={(e) => setCommentForm((p) => ({ ...p, message: e.target.value }))}
                  placeholder="Share details or context about this problem…"
                  required
                  rows={4}
                  maxLength={500}
                  className="w-full rounded-xl bg-gray-800/70 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-100 p-3 outline-none resize-none"
                />
                <p className="mt-1 text-xs text-gray-400">
                  {commentForm.message.length}/500 characters
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCommentModal(false)}
                  disabled={submittingComment}
                  className="rounded-xl bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white px-4 py-2 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingComment || !commentForm.message.trim()}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 font-medium transition hover:scale-105"
                >
                  {submittingComment ? "Submitting..." : "Submit Comment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProblemDetails;
