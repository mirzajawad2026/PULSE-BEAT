import { useEffect, useState } from "react";
import api from "../../services/api";
import AlbumCard from "../../components/AlbumCard/AlbumCard";
import Loader from "../../components/Loader/Loader";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAlbums();
  }, []);

  async function getAlbums() {
    try {
      const res = await api.get("/upload/get-albums");
      setAlbums(res.data.albums || []);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to fetch albums");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-green-500/20 via-zinc-950/70 to-black/50 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-green-400">Collections</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Explore featured albums</h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-400 sm:text-base">Curate the perfect soundtrack from artist-built albums and handpicked releases.</p>
      </section>

      {albums.length === 0 ? (
        <div className="rounded-[1.5rem] border border-white/10 bg-zinc-900/60 p-10 text-center text-zinc-400">No albums found yet.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {albums.map((album) => (
            <AlbumCard key={album._id} album={album} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Albums;