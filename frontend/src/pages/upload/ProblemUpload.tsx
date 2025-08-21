import { useEffect, useRef, useState } from "react";
import LandingNavbar from "../../components/navbars/LandingNavbar";
import { toast } from "react-hot-toast";

type CaptureMode = "none" | "camera" | "upload";

const ProblemUpload = () => {
  const [mode, setMode] = useState<CaptureMode>("none");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");

  // Camera refs/state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start camera when mode === "camera"
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }, // prefer rear camera on mobile
          audio: false,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        toast.error("Unable to access camera");
        setMode("none");
      }
    };

    if (mode === "camera") {
      startCamera();
    }

    return () => {
      // Stop tracks when leaving camera mode
      if (mode !== "camera" && streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [mode]);

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const handleMode = (newMode: CaptureMode) => {
    // Reset previous media when switching
    setImageFile(null);
    setImagePreview(null);
    setMode(newMode);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Set canvas size equal to video stream frame
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob and create a File
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], `capture-${Date.now()}.png`, {
          type: "image/png",
        });
        setImageFile(file);
        const url = URL.createObjectURL(blob);
        setImagePreview(url);
        toast.success("Photo captured");
      },
      "image/png",
      0.95
    );
  };

  const removeImage = () => {
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error("Please capture or upload an image");
      return;
    }

    // Build form data
    const form = new FormData();
    form.append("image", imageFile);
    if (description.trim()) form.append("description", description.trim());

    // TODO: Replace with your actual API endpoint
    // Example:
    // const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/problem/upload`, {
    //   method: "POST",
    //   headers: { Authorization: `Bearer ${token}` },
    //   body: form,
    // });
    // const data = await res.json();
    // if (!res.ok) return toast.error(data.message || "Upload failed");
    // toast.success("Problem uploaded successfully");

    toast.success("Ready to upload (stub). Wire this to your API.");
  };

  return (
    <>
      <LandingNavbar />

      <div className="mx-auto max-w-5xl px-6 md:px-10 py-8 md:py-12">
        <header className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-100">
            Upload Your Problem
          </h1>
          <p className="text-subhead mt-1">
            Capture a photo using your camera or upload an existing image. Add an optional description to help reviewers.
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
                  className={`w-full rounded-xl py-3 font-medium text-white transition hover:scale-105 ${
                    mode === "camera"
                      ? "bg-emerald-600"
                      : "bg-emerald-500 hover:bg-emerald-600"
                  }`}
                >
                  Capture Image
                </button>
                <label
                  className={`w-full rounded-xl py-3 text-center font-medium text-white cursor-pointer transition hover:scale-105 ${
                    mode === "upload"
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
                    <video
                      ref={videoRef}
                      className="h-full w-full object-cover"
                      playsInline
                      muted
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
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              )}

              {/* Image preview (from capture or upload) */}
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

              {/* Placeholder when no mode selected and no image */}
              {mode === "none" && !imagePreview && (
                <div className="mt-6 rounded-xl border border-dashed border-gray-600 p-8 text-center text-subhead">
                  Choose “Capture Image” to use your camera, or “Upload Image” to select a file.
                </div>
              )}

              {/* Optional description */}
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
                  placeholder="Describe what you see, location cues, time, or any context that helps verification…"
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