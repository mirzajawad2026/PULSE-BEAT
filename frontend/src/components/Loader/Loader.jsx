function Loader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 shadow-lg shadow-black/20 backdrop-blur">
        <div className="h-3 w-3 animate-bounce rounded-full bg-green-500 [animation-delay:-0.2s]" />
        <div className="h-3 w-3 animate-bounce rounded-full bg-green-500 [animation-delay:-0.1s]" />
        <div className="h-3 w-3 animate-bounce rounded-full bg-green-500" />
      </div>
    </div>
  );
}

export default Loader;