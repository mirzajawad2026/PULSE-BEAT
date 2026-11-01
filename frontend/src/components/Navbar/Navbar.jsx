import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";
import { FaSpotify, FaSignOutAlt, FaHome, FaCompactDisc, FaUpload, FaUser, FaLayerGroup } from "react-icons/fa";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/albums", label: "Albums", icon: <FaCompactDisc /> },
    { to: "/upload", label: "Upload", icon: <FaUpload />, artistOnly: true },
    { to: "/profile", label: "Profile", icon: <FaUser /> },
    { to: "/create-album", label: "Create Album", icon: <FaLayerGroup />, artistOnly: true },
  ];

  async function logout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log("Logout request failed:", error);
    } finally {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-2xl font-semibold text-green-400">
          <FaSpotify />
          <span>PulseBeat</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.filter((link) => !link.artistOnly || user?.role === "artist").map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                  active ? "bg-green-500/20 text-green-300" : "text-zinc-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/10"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;