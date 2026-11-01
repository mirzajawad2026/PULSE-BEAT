import { useEffect, useState } from "react";
import api from "../../services/api";
import MusicCard from "../../components/MusicCard/MusicCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";

function Home() {
  const [musics, setMusics] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    getMusic();
  }, []);

  async function getMusic() {
    try {
      const res = await api.get("/upload/list");
      setMusics(res.data.musics || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function handleDelete(id) {
    setMusics((prev) => prev.filter((item) => item._id !== id));
  }

  const filteredMusic = musics.filter((music) => {
    const haystack = `${music.songName} ${music.artist?.username || ""}`.toLowerCase();
    return haystack.includes(search.toLowerCase());
  });

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-green-500/20 via-zinc-900/70 to-black/60 p-6 shadow-2xl shadow-black/20 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-green-400">Curated for you</p>
            <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Stream the sound of today</h1>
            <p className="mt-3 max-w-2xl text-sm text-zinc-400 sm:text-base">
              Enjoy a polished listening experience with smooth playback, instant discovery, and artist uploads built right into the platform.
            </p>
          </div>
          <div className="w-full max-w-md">
            <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Trending songs</h2>
            <p className="text-sm text-zinc-400">Fresh tracks from emerging and established artists</p>
          </div>
          <div className="rounded-full border border-white/10 px-3 py-1 text-sm text-zinc-400">{filteredMusic.length} tracks</div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900/80">
                <div className="h-48 w-full bg-zinc-800" />
                <div className="space-y-3 p-4">
                  <div className="h-4 w-3/4 rounded bg-zinc-800" />
                  <div className="h-3 w-1/2 rounded bg-zinc-800" />
                  <div className="h-10 rounded-full bg-zinc-800" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredMusic.length === 0 ? (
          <div className="rounded-[1.5rem] border border-white/10 bg-zinc-900/60 p-10 text-center text-zinc-400">No music found for your search.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMusic.map((music) => (
              <MusicCard key={music._id} music={music} onDelete={handleDelete} allowDelete={user?.role === "artist"} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;