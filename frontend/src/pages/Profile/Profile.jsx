import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user") || "null");
    if (data) {
      setUser(data);
    }
  }, []);

  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-zinc-900/80 p-8 shadow-2xl shadow-black/30">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 text-4xl text-green-400">
          <FaUserCircle />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-green-400">Your profile</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">{user.username || "Guest"}</h1>
          <p className="mt-2 text-sm text-zinc-400">Enjoy a personalized experience tuned for your role.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm text-zinc-400">Email</p>
          <p className="mt-2 font-medium text-white">{user.email || "—"}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm text-zinc-400">Role</p>
          <p className="mt-2 font-medium capitalize text-white">{user.role || "user"}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;