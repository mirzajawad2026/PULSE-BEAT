import { FaPlay } from "react-icons/fa";
import { usePlayer } from "../../context/PlayerContext";

function AlbumCard({ album }) {
  const { playTrack } = usePlayer();
  const tracks = album.musics || [];

  const playAlbum = () => {
    if (tracks.length > 0) {
      playTrack(tracks[0], tracks);
    }
  };

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900/80 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-green-400/40">
      <img
        src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80"
        alt="album cover"
        className="h-44 w-full object-cover"
      />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-white">{album.title}</h2>
            <p className="mt-1 text-sm text-zinc-400">{album.artist?.username || "Unknown artist"}</p>
          </div>
          <button
            onClick={playAlbum}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-black transition hover:scale-105"
          >
            <FaPlay />
          </button>
        </div>

        <p className="mt-4 inline-flex rounded-full bg-green-500/15 px-3 py-1 text-xs font-medium text-green-300">{tracks.length || 0} songs</p>

        {tracks.length > 0 && (
          <div className="mt-4 space-y-2">
            {tracks.slice(0, 3).map((track) => (
              <button
                key={track._id}
                onClick={() => playTrack(track, tracks)}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-left text-sm text-zinc-300 transition hover:border-green-400/40 hover:text-white"
              >
                <span className="truncate">{track.songName}</span>
                <FaPlay className="text-green-400" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AlbumCard;