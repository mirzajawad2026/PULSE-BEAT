import { FaPlay, FaTrash } from "react-icons/fa";
import { usePlayer } from "../../context/PlayerContext";
import api from "../../services/api";

function MusicCard({ music, onDelete, allowDelete }) {
  const { playTrack } = usePlayer();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleDelete = async () => {
    if (!window.confirm("Delete this track?")) return;

    try {
      await api.delete(`/upload/delete-music/${music._id}`);
      onDelete?.(music._id);
    } catch (err) {
      alert(err.response?.data?.message || "Unable to delete track");
    }
  };

  return (
    <div className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900/80 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-green-400/40">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80"
          alt="cover"
          className="h-48 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <button
          onClick={() => playTrack(music, [music])}
          className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-lg text-black transition hover:scale-105"
        >
          <FaPlay />
        </button>
      </div>

      <div className="p-4">
        <h2 className="truncate text-lg font-semibold text-white">{music?.songName}</h2>
        <p className="mt-1 text-sm text-zinc-400">{music?.artist?.username || "Unknown Artist"}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-medium text-green-300">New release</span>
          {allowDelete && user?.role === "artist" && (
            <button onClick={handleDelete} className="rounded-full p-2 text-zinc-400 transition hover:bg-red-500/15 hover:text-red-400">
              <FaTrash />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MusicCard;