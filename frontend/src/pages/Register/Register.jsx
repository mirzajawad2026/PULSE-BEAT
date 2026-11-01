import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaEnvelope, FaLock, FaMusic } from "react-icons/fa";
import api from "../../services/api";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(29,185,84,0.2),_transparent_25%)] px-4 py-12">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/80 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center bg-gradient-to-br from-green-500/20 via-zinc-950 to-zinc-950 p-10 lg:p-14">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/20 text-2xl text-green-400">
              <FaMusic />
            </div>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">Create your PulseBeat account</h1>
            <p className="mt-4 max-w-md text-lg text-zinc-400">Join as a listener or sign up as an artist to share your music with thousands of fans.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col justify-center p-8 sm:p-10">
            <h2 className="text-3xl font-semibold text-white">Create account</h2>
            <div className="mt-8 space-y-4">
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <FaUserAlt className="text-zinc-400" />
                <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full bg-transparent outline-none" required />
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <FaEnvelope className="text-zinc-400" />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full bg-transparent outline-none" required />
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <FaLock className="text-zinc-400" />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full bg-transparent outline-none" required />
              </label>

              <select name="role" value={formData.role} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none">
                <option value="user">Listener</option>
                <option value="artist">Artist</option>
              </select>
            </div>

            <button className="mt-8 rounded-full bg-green-500 px-5 py-3 font-semibold text-black transition hover:bg-green-400 disabled:opacity-60" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </button>

            <p className="mt-6 text-center text-sm text-zinc-400">
              Already have an account?
              <Link to="/login" className="ml-2 font-medium text-green-400">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;