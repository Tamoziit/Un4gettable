import { useEffect, useState } from "react";
import AppNavbar from "../../../components/navbars/AppNavbar";
import { useParams, Link } from "react-router-dom";
import useGetProjectById from "../../../hooks/useGetProjectById";
import toast from "react-hot-toast";
import type { Project } from "../../../types";
import useInitiatePayment from "../../../hooks/useInitiatePayment";
import useAddComment from "../../../hooks/useAddComment";
import Spinner from "../../../components/Spinner";



const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const { loading, getProject } = useGetProjectById();
  const { loading: paying, initiatePayment } = useInitiatePayment();

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentForm, setCommentForm] = useState({ message: "" });
  const { loading: commenting, addComment } = useAddComment();

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
        <div className="px-8 md:px-16 pt-20 text-center text-red-400 text-xl h-screen flex items-center justify-center">
          <Spinner size="large" />
        </div>
      </>
    );
  }

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = commentForm.message.trim();
    if (!message) return;

    if (!id) {
      toast.error("Cannot find id");
      return;
    }

    await addComment({
      id,
      type: "Project",
      message
    });
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
        <div className="bg-[#242038] rounded-2xl shadow-lg p-6 mb-8 space-y-3">
          <p className="text-gray-300">
            <span className="font-semibold text-[#6290C3]">SDG:</span>{" "}
            {project.SDG.join(", ")}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-[#B76D68]">Owner:</span> {project.owner}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-red-600">Aim:</span> {project.aim}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-orange-200">Location:</span>{" "}
            {`${project.location.city}, ${project.location.state}`}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-purple-300">Timeline:</span>{" "}
            {project.timeline.startDate} → {project.timeline.endDate}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-green-200">Target:</span> ₹ {project.target}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-yellow-300">Funding Raised:</span> ₹{" "}
            {project.fundRaised}
          </p>
        </div>

        {/* Tariff Plans */}
        <h2 className="text-[#B4DC7F] text-2xl font-semibold uppercase mb-4  ">
          Donation Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-gray-200">
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
          className="w-full py-3 text-lg font-semibold rounded-xl shadow-md bg-[#9BA7C0]  hover:bg-[#758BFD] text-[#00241B] transition disabled:opacity-50"
        >
          {paying ? "Processing..." : "Donate Now"}
        </button>

        {/* Reports */}
        <section className="mt-8 rounded-2xl bg-gray-800/60 p-6 shadow-lg">
          <h2 className="text-blue-400 text-2xl font-semibold mt-10 pb-4">Reports</h2>

          {Array.isArray(project.reports) && project.reports.length > 0 ? (
            <ul className="divide-y divide-gray-700 rounded-xl overflow-hidden border border-gray-700">
              {project.reports.map((reportId: string) => (
                <li key={reportId} className="bg-[#242038] hover:bg-gray-900/60 transition">
                  <Link
                    to={`/report/${reportId}`}
                    className="flex items-center justify-between w-full px-4 py-3"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-400">Report</span>
                      <span className="text-gray-200 text-sm truncate">
                        ID: {reportId}
                      </span>
                    </div>
                    <span className="text-[#2298b9] font-medium">View →</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No reports yet.</p>
          )}
        </section>

        {/* NEW: Comments section with modal trigger */}
        <section className="mt-10 rounded-2xl bg-[#242038] p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-100">💬 Comments</h2>
            <span className="text-sm text-gray-400">
              {Array.isArray(project.comments) ? project.comments.length : 0} comments
            </span>
          </div>

          {Array.isArray(project.comments) && project.comments.length > 0 ? (
            <ul className="space-y-4">
              {project.comments.map((c) => (
                <li key={c._id} className="bg-gray-900/70 p-3 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-300 font-semibold">{c.name}</p>
                  <p className="text-gray-200 mt-1">{c.message}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No comments yet.</p>
          )}

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => {
                setShowCommentModal(true);
                setCommentForm({ message: "" });
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-[#9BA7C0]  hover:bg-[#758BFD] text-[#00241B] px-6 py-3 font-medium transition hover:scale-105 shadow-lg"
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
            to={`/report/submit/Project/${id}`}
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
                  className="w-full rounded-xl bg-[#ffffff] border border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-gray-100 p-3 outline-none resize-none"
                />
                <p className="mt-1 text-xs text-gray-400">
                  {commentForm.message.length}/500 characters
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCommentModal(false)}
                  disabled={commenting}
                  className="rounded-xl bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white px-4 py-2 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={commenting || !commentForm.message.trim()}
                  className="rounded-xl bg-[#744253] hover:bg-red-600 disabled:opacity-50 text-white px-6 py-2 font-medium transition hover:scale-105"
                >
                  {commenting ? "Submitting..." : "Submit Comment"}
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
