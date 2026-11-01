import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaMusic, FaEnvelope, FaLock } from "react-icons/fa";
import api from "../../services/api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(29,185,84,0.2),_transparent_25%)] px-4 py-12">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/80 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center bg-gradient-to-br from-green-500/20 via-zinc-950 to-zinc-950 p-10 lg:p-14">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/20 text-2xl text-green-400">
              <FaMusic />
            </div>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">Welcome back to PulseBeat</h1>
            <p className="mt-4 max-w-md text-lg text-zinc-400">
              Discover new music, follow your favorite artists, and upload your own tracks if you are an artist.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col justify-center p-8 sm:p-10">
            <h2 className="text-3xl font-semibold text-white">Log in</h2>
            <p className="mt-2 text-sm text-zinc-400">Continue your listening experience</p>

            <div className="mt-8 space-y-4">
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <FaEnvelope className="text-zinc-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                  required
                />
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <FaLock className="text-zinc-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                  required
                />
              </label>
            </div>

            <button className="mt-8 rounded-full bg-green-500 px-5 py-3 font-semibold text-black transition hover:bg-green-400 disabled:opacity-60" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>

            <p className="mt-6 text-center text-sm text-zinc-400">
              New here?
              <Link to="/register" className="ml-2 font-medium text-green-400">Create account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;