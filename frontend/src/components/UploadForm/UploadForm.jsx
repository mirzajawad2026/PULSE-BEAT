import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import api from "../../services/api";

function UploadForm() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !file) {
      alert("Please provide a title and a music file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("music", file);

    try {
      setLoading(true);
      const res = await api.post("/upload/create-music", formData);
      alert(res.data.message || "Track uploaded successfully");
      setTitle("");
      setFile(null);
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-zinc-900/80 p-8 shadow-2xl shadow-black/30">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/20 text-green-400">
          <FaCloudUploadAlt />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white">Upload a new track</h2>
          <p className="text-sm text-zinc-400">Share your latest release with your audience</p>
        </div>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Song Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-green-500"
          required
        />

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-white/20 bg-black/20 px-6 py-10 text-center text-zinc-400 transition hover:border-green-500 hover:text-green-300">
          <FaCloudUploadAlt className="mb-3 text-3xl" />
          <span>{file ? file.name : "Choose a music file"}</span>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" accept="audio/*" />
        </label>
      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-5 py-3 font-semibold text-black transition hover:bg-green-400 disabled:opacity-60" disabled={loading}>
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
            Uploading...
          </>
        ) : (
          "Upload track"
        )}
      </button>
    </form>
  );
}

export default UploadForm;