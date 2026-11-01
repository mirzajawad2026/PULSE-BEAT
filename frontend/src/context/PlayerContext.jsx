import { createContext, useContext, useMemo, useRef, useState } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const playTrack = (track, tracks = []) => {
    const tracksToPlay = tracks.length ? tracks : [track];
    const index = tracksToPlay.findIndex((item) => item?._id === track?._id);

    setQueue(tracksToPlay);
    setCurrentTrack(track);
    setCurrentIndex(index >= 0 ? index : 0);
    setProgress(0);
    setIsPlaying(true);
  };

  const changeTrack = (nextIndex) => {
    if (!queue.length) return;
    const safeIndex = (nextIndex + queue.length) % queue.length;
    setCurrentIndex(safeIndex);
    setCurrentTrack(queue[safeIndex]);
    setProgress(0);
    setIsPlaying(true);
  };

  const playNext = () => changeTrack(currentIndex + 1);
  const playPrevious = () => changeTrack(currentIndex - 1);

  const togglePlay = () => {
    if (!currentTrack) return;
    setIsPlaying((prev) => !prev);
  };

  const seekTo = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setProgress(value);
    }
  };

  const value = useMemo(() => ({
    currentTrack,
    setCurrentTrack,
    queue,
    setQueue,
    currentIndex,
    setCurrentIndex,
    isPlaying,
    setIsPlaying,
    progress,
    setProgress,
    duration,
    setDuration,
    audioRef,
    playTrack,
    playNext,
    playPrevious,
    togglePlay,
    seekTo,
  }), [currentTrack, queue, currentIndex, isPlaying, progress, duration]);

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  return useContext(PlayerContext);
}
