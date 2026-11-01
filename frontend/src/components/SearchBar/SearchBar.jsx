import { FaSearch } from "react-icons/fa";

function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">
      <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Search artists, songs, moods..."
        className="w-full rounded-full border border-white/10 bg-zinc-900/80 py-3 pl-12 pr-4 text-sm text-white outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
      />
    </div>
  );
}

export default SearchBar;