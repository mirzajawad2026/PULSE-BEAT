import { useEffect, useState } from "react";
import api from "../../services/api";

function CreateAlbum() {
  const [title, setTitle] = useState("");
  const [musics, setMusics] = useState([]);
  const [selectedMusics, setSelectedMusics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMusics();
  }, []);

  async function fetchMusics() {
    try {
      const res = await api.get("/upload/list?mine=true");
      setMusics(res.data.musics || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function handleCheckbox(id) {
    if (selectedMusics.includes(id)) {
      setSelectedMusics(selectedMusics.filter((item) => item !== id));
    } else {
      setSelectedMusics([...selectedMusics, id]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await api.post("/upload/create-album", {
        title,
        musics: selectedMusics,
      });

      alert(res.data.message);
      setTitle("");
      setSelectedMusics([]);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-zinc-900/80 p-8 shadow-2xl shadow-black/30">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-green-400">Artist tools</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Create a new album</h1>
        <p className="mt-2 text-sm text-zinc-400">Bundle your favorite tracks into a polished collection for listeners.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Album Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-green-500"
          required
        />

        <div>
          <h2 className="mb-3 text-lg font-semibold text-white">Select songs</h2>
          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-400">Loading your tracks...</div>
          ) : (
            <div className="space-y-2 rounded-2xl border border-white/10 bg-black/20 p-4">
              {musics.map((music) => (
                <label key={music._id} className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2 text-sm text-zinc-200">
                  <input type="checkbox" checked={selectedMusics.includes(music._id)} onChange={() => handleCheckbox(music._id)} className="h-4 w-4 rounded border-zinc-600 bg-transparent accent-green-500" />
                  {music.songName}
                </label>
              ))}
            </div>
          )}
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 font-semibold text-black transition hover:bg-green-400 disabled:opacity-60" disabled={loading}>
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
              Loading your songs...
            </>
          ) : (
            "Create album"
          )}
        </button>
      </form>
    </div>
  );
}

export default CreateAlbum;