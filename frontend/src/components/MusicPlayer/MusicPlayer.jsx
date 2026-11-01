import { useEffect, useMemo } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { usePlayer } from "../../context/PlayerContext";

function MusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    setProgress,
    setDuration,
    audioRef,
    togglePlay,
    seekTo,
    playNext,
    playPrevious,
  } = usePlayer();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateDuration = () => setDuration(audio.duration || 0);
    const updateProgress = () => setProgress(audio.currentTime || 0);
    const handleEnded = () => {
      setProgress(0);
      playNext();
    };

    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef, playNext, setDuration, setProgress]);

  useEffect(() => {
    if (!audioRef.current || !currentTrack?.uri) return;
    audioRef.current.src = currentTrack.uri;
    audioRef.current.play().catch(() => {});
  }, [audioRef, currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [audioRef, isPlaying]);

  const progressPercent = useMemo(() => (duration ? (progress / duration) * 100 : 0), [duration, progress]);

  return (
    <div className="fixed bottom-0 left-0 w-full border-t border-white/10 bg-black/90 backdrop-blur-xl px-4 py-3 sm:px-6">
      <audio ref={audioRef} />
      <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-white">{currentTrack?.songName || "No song playing"}</h2>
          <p className="truncate text-sm text-zinc-400">{currentTrack?.artist?.username || "Select a song to start listening"}</p>
        </div>

        <div className="flex items-center gap-4 text-xl text-zinc-300">
          <button onClick={playPrevious} className="rounded-full p-2 transition hover:bg-white/10">
            <FaBackward />
          </button>
          <button onClick={togglePlay} className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-black transition hover:scale-105">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={playNext} className="rounded-full p-2 transition hover:bg-white/10">
            <FaForward />
          </button>
        </div>

        <div className="flex flex-1 items-center gap-3 lg:max-w-xs">
          <span className="text-xs text-zinc-500">{Math.floor(progress / 60)}:{String(Math.floor(progress % 60)).padStart(2, "0")}</span>
          <input type="range" min="0" max={duration || 100} value={progress} onChange={(e) => seekTo(Number(e.target.value))} className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-800 accent-green-500" />
          <span className="text-xs text-zinc-500">{Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, "0")}</span>
        </div>
      </div>
      <div className="mx-auto mt-2 h-1 max-w-7xl rounded-full bg-zinc-800">
        <div className="h-1 rounded-full bg-green-500" style={{ width: `${progressPercent}%` }} />
      </div>
    </div>
  );
}

export default MusicPlayer;