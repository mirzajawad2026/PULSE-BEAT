import { Link, useLocation } from "react-router-dom";
import { FaHome, FaCompactDisc, FaUpload, FaUser, FaLayerGroup } from "react-icons/fa";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const location = useLocation();
  const links = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/albums", label: "Albums", icon: <FaCompactDisc /> },
    { to: "/upload", label: "Upload", icon: <FaUpload />, artistOnly: true },
    { to: "/profile", label: "Profile", icon: <FaUser /> },
    { to: "/create-album", label: "Create Album", icon: <FaLayerGroup />, artistOnly: true },
  ];

  return (
    <aside className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-64 flex-col border-r border-white/10 bg-zinc-950/80 px-3 py-6 backdrop-blur xl:flex">
      <div className="mb-6 px-3 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">Discover</div>
      {links.filter((link) => !link.artistOnly || user?.role === "artist").map((link) => {
        const active = location.pathname === link.to;
        return (
          <Link
            key={link.to}
            to={link.to}
            className={`mb-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
              active ? "bg-green-500/20 text-green-300" : "text-zinc-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        );
      })}
    </aside>
  );
}

export default Sidebar;