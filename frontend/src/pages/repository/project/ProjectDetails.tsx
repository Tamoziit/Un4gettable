import { useEffect, useState } from "react";
import AppNavbar from "../../../components/navbars/AppNavbar";
import { useParams, Link } from "react-router-dom";
import useGetProjectById from "../../../hooks/useGetProjectById";
import toast from "react-hot-toast";
import type { Project } from "../../../types";
import useInitiatePayment from "../../../hooks/useInitiatePayment";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const { loading, getProject } = useGetProjectById();
  const { loading: paying, initiatePayment } = useInitiatePayment();

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  // NEW: comment modal state
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentForm, setCommentForm] = useState({ name: "", message: "" });

  const fetchProject = async () => {
    if (id) {
      const data = await getProject(id);
      setProject(data);
    } else {
      toast.error("Error in fetching Project data");
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  // NEW: close modal on Escape
  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setShowCommentModal(false);
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  const handleDonate = async () => {
    if (!selectedAmount) {
      toast.error("Please select a donation plan");
      return;
    }
    if (!id) {
      toast.error("Project ID not found");
      return;
    }

    try {
      const response = await initiatePayment({
        amount: selectedAmount,
        projectId: id,
      });

      if (response) {
        window.location.href = response;
      } else {
        toast.error("Failed to initiate payment");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong while initiating payment");
    }
  };

  if (!project || loading) {
    return (
      <>
        <AppNavbar />
        <div className="px-8 md:px-16 pt-20 text-center text-red-400 text-xl">
          Project Not Found
        </div>
      </>
    );
  }

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
      // const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/project/${project._id}/comment`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name: name || "Anonymous", message }),
      // });
      // const data = await res.json();
      // if (!res.ok) throw new Error(data.message || "Failed to submit comment");

      // Simulate success
      await new Promise((r) => setTimeout(r, 800));

      // Optimistic UI update (assumes project has comments: {name,message}[])
      setProject((prev) =>
        prev
          ? {
              ...prev,
              comments: [
                ...(prev.comments || []),
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

      <div className="px-8 md:px-16 pt-20 pb-6">
        <h1 className="text-gray-200 text-3xl md:text-4xl font-bold mb-6 text-center">
          {project.name}
        </h1>

        {/* Image */}
        <img
          src="/bg1.jpg"
          alt={project.name}
          className="w-full max-h-[400px] object-cover rounded-2xl shadow-lg mb-6"
        />

        {/* Details */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 space-y-3">
          <p className="text-gray-300">
            <span className="font-semibold">SDG:</span>{" "}
            {project.SDG.join(", ")}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Owner:</span> {project.owner}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Aim:</span> {project.aim}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Location:</span>{" "}
            {`${project.location.city}, ${project.location.state}`}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Timeline:</span>{" "}
            {project.timeline.startDate} → {project.timeline.endDate}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Target:</span> ₹ {project.target}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Funding Raised:</span> ₹{" "}
            {project.fundRaised}
          </p>
        </div>

        {/* Tariff Plans */}
        <h2 className="text-blue-400 text-2xl font-semibold mb-4">
          Donation Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {project.tariff.map((plan, idx) => {
            const planLabel = String.fromCharCode(65 + idx); // 65 = 'A'
            const isSelected = selectedAmount === plan;
            return (
              <div
                key={idx}
                onClick={() => setSelectedAmount(plan)}
                className={`cursor-pointer bg-gray-700 p-6 rounded-xl shadow-md text-center transition 
                ${isSelected ? "ring-4 ring-blue-500 scale-105" : "hover:scale-105"}`}
              >
                <p className="text-xl font-bold">Plan {planLabel}</p>
                <p className="text-green-400 text-lg">₹ {plan}</p>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleDonate}
          disabled={paying}
          className="w-full py-3 text-lg font-semibold rounded-xl shadow-md bg-blue-500 text-white hover:bg-blue-600 transition disabled:opacity-50"
        >
          {paying ? "Processing..." : "Donate Now"}
        </button>

        {/* Reports */}
        <h2 className="text-blue-400 text-2xl font-semibold mt-10 pb-4">
          Reports
        </h2>
        {project.reports.length > 0 ? (
          <div className="bg-gray-800 rounded-2xl shadow-lg p-6 overflow-y-auto space-y-3">
            {project.reports.map((report, i) => (
              <div
                key={i}
                className="bg-gray-700 rounded-xl p-3 shadow-md flex justify-between"
              >
                <span className="text-gray-400">{report}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex w-full pb-6">
            <span className="text-gray-300">No Reports submitted yet</span>
          </div>
        )}

        {/* NEW: Comments section with modal trigger */}
        <section className="mt-10 rounded-2xl bg-gray-800/60 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-100">💬 Comments</h2>
            <span className="text-sm text-gray-400">
              {Array.isArray(project.comments) ? project.comments.length : 0} comments
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
              Share your thoughts or support message for this project
            </p>
          </div>
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

      {/* NEW: COMMENT MODAL */}
      {showCommentModal && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-comment-modal-title"
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
              <h3 id="project-comment-modal-title" className="text-lg font-semibold">
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
                <label htmlFor="project-comment-message" className="block text-sm font-medium text-gray-300 mb-1">
                  Comment *
                </label>
                <textarea
                  id="project-comment-message"
                  value={commentForm.message}
                  onChange={(e) => setCommentForm((p) => ({ ...p, message: e.target.value }))}
                  placeholder="Share your thoughts, encouragement, or feedback about this project…"
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

export default ProjectDetails;
