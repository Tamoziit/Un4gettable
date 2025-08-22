import { useRef, useState } from "react";
import LandingNavbar from "../../components/navbars/LandingNavbar";
import { toast } from "react-hot-toast";
import Webcam from "react-webcam";
import { uploadBlobToCloudinary } from "../../utils/uploadToCloudinary";
import { getUserCoordinates } from "../../utils/getCoordinates";
import usePostProblem from "../../hooks/usePostProblem";

type CaptureMode = "none" | "camera" | "upload";

const ProblemUpload = () => {
  const [mode, setMode] = useState<CaptureMode>("none");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const { loading, postProblem } = usePostProblem();

  const webcamRef = useRef<Webcam | null>(null);

  const handleMode = (newMode: CaptureMode) => {
    setImageFile(null);
    setImagePreview(null);
    setMode(newMode);
  };

  const capturePhoto = async () => {
    if (!webcamRef.current) return;

    const screenshot = webcamRef.current.getScreenshot();
    if (!screenshot) return;

    try {
      const response = await fetch(screenshot);
      const blob = await response.blob();
      const file = new File([blob], `capture-${Date.now()}.png`, {
        type: "image/png",
      });

      setImageFile(file);

      const uploadedUrl = await uploadBlobToCloudinary(screenshot, "image");
      if (!uploadedUrl) throw new Error("Failed to upload media");

      setImagePreview(uploadedUrl);
    } catch (error) {
      toast.error("Error in capturing/uploading picture");
    }
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    setImageFile(file);
    const url = URL.createObjectURL(file);

    try {
      const uploadedUrl = await uploadBlobToCloudinary(url, "image");
      if (!uploadedUrl) throw new Error("Failed to upload media");
      setImagePreview(uploadedUrl);
    } catch {
      toast.error("Error in uploading picture");
    }
  };

  const removeImage = () => {
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !imagePreview) {
      toast.error("Please capture or upload an image");
      return;
    }

    const { lat, lon } = await getUserCoordinates();
    await postProblem({
      url: imagePreview,
      description,
      lat,
      lon
    });
  };

  console.log(imagePreview);

  return (
    <>
      <LandingNavbar />
      <div className="mx-auto max-w-5xl px-6 md:px-10 pt-22 pb-6">
        <header className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-100">
            Upload Your Problem
          </h1>
          <p className="text-subhead mt-1">
            Capture a photo using your camera or upload an existing image.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Mode selection */}
          <section className="lg:col-span-1">
            <div className="rounded-2xl bg-gray-800/70 p-5 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-100">Choose an option</h2>
              <div className="mt-4 flex flex-col gap-3">
                <button
                  onClick={() => handleMode("camera")}
                  className={`w-full rounded-xl py-3 font-medium text-white transition hover:scale-105 ${mode === "camera"
                    ? "bg-emerald-600"
                    : "bg-emerald-500 hover:bg-emerald-600"
                    }`}
                >
                  Capture Image
                </button>
                <label
                  className={`w-full rounded-xl py-3 text-center font-medium text-white cursor-pointer transition hover:scale-105 ${mode === "upload"
                    ? "bg-cyan-600"
                    : "bg-cyan-500 hover:bg-cyan-600"
                    }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleMode("upload");
                      onFileChange(e);
                    }}
                    className="hidden"
                  />
                  Upload Image
                </label>
              </div>
            </div>
          </section>

          {/* Center: Camera / Upload area */}
          <section className="lg:col-span-2">
            <div className="rounded-2xl bg-gray-800/70 p-5 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-100">Preview</h2>

              {/* Camera view */}
              {mode === "camera" && !imagePreview && (
                <div className="mt-4">
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                    <Webcam
                      ref={webcamRef}
                      screenshotFormat="image/png"
                      mirrored={true}
                      videoConstraints={{ facingMode: "environment" }}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={capturePhoto}
                      className="rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 font-medium transition hover:scale-105"
                    >
                      Capture Photo
                    </button>
                    <button
                      onClick={() => handleMode("none")}
                      className="rounded-xl bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 font-medium transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Image preview */}
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Selected problem"
                    className="w-full rounded-xl object-cover"
                  />
                  <div className="mt-3">
                    <button
                      onClick={removeImage}
                      className="rounded-xl bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 font-medium transition"
                    >
                      Remove Image
                    </button>
                  </div>
                </div>
              )}

              {/* Placeholder */}
              {mode === "none" && !imagePreview && (
                <div className="mt-6 rounded-xl border border-dashed border-gray-600 p-8 text-center text-subhead">
                  Choose “Capture Image” or “Upload Image”.
                </div>
              )}

              {/* Description */}
              <div className="mt-6">
                <label
                  htmlFor="desc"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Description (optional)
                </label>
                <textarea
                  id="desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Describe what you see…"
                  className="w-full rounded-xl bg-gray-900/70 border border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 text-gray-100 p-3 outline-none"
                />
              </div>

              {/* Submit */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={handleSubmit}
                  className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 font-semibold transition hover:scale-105"
                >
                  Submit Problem
                </button>
                <p className="text-xs text-gray-400">
                  Ensure the photo is original and taken at the incident location/time.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProblemUpload;