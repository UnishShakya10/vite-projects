
import { useState } from "react";
import {
  ArrowRight,
  Camera,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
  User,
  X,
} from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { APIURL } from "../services/http";

const Signup = ({ onClose, onLogin, onSignupSuccess }) => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeFlow = () => {
    if (onClose) {
      onClose();
      return;
    }

    if (onLogin) {
      onLogin();
      return;
    }

    navigate("/login");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(false);

    if (!fullName.trim()) {
      setMessage("Full Name is required.");
      setError(true);
      return;
    }
    if (!email.trim()) {
      setMessage("Email is required.");
      setError(true);
      return;
    }
    if (!password.trim()) {
      setMessage("Password is required.");
      setError(true);
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", "USER");

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const res = await axios.post(`${APIURL}/users/create`, formData);

      if (res.data === "Email already exists") {
        setMessage("This email already exists.");
        setError(true);
        return;
      }

      localStorage.setItem("token", "signup-success");
      localStorage.setItem("user", JSON.stringify(res.data.user || res.data));
      onSignupSuccess?.();

      setMessage("Account created successfully!");
      setFullName("");
      setEmail("");
      setPassword("");
      setAvatar(null);

      if (onClose || onLogin) {
        closeFlow();
        return;
      }

      navigate("/login", {
        state: { message: "Account created successfully. Please log in." },
      });
    } catch (errorResponse) {
      console.error("Signup Error:", errorResponse);
      if (errorResponse.response) {
        if (errorResponse.response.data?.message) {
          setMessage(errorResponse.response.data.message);
        } else {
          setMessage(errorResponse.response.data || "Signup failed.");
        }
      } else if (errorResponse.request) {
        setMessage("Backend server is not responding. Check your backend server.");
      } else {
        setMessage(errorResponse.message || "Something went wrong.");
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff7ed_0%,#fff_35%,#f5f5f4_100%)] px-4 py-8 sm:px-6 lg:px-12">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[30px] border border-orange-100 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)] xl:grid-cols-[1.05fr_1fr]">
        <section className="hidden bg-[linear-gradient(135deg,#111827_0%,#1f2937_30%,#f59e0b_140%)] p-8 text-white xl:flex xl:flex-col xl:justify-between xl:p-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-orange-100">
              <Sparkles size={14} />
              Welcome
            </span>
            <h1 className="mt-8 max-w-md text-4xl font-black leading-tight">Build your workspace with confidence.</h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-200">
              Create an account to manage your ideas, projects, and content from one place.
            </p>
          </div>

          <div className="space-y-4">
            {[
              "Track tasks and progress",
              "Secure access with your own profile",
              "Publish content and manage your workflow",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-400/20 text-orange-200">
                  <Check size={16} />
                </span>
                <span className="text-sm font-medium text-slate-100">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="relative px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
          {(onClose || onLogin) && (
            <button
              type="button"
              onClick={closeFlow}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:text-slate-900"
              aria-label="Close signup"
            >
              <X size={18} />
            </button>
          )}

          <div className="mb-8 text-center xl:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-orange-600">Create account</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Join us today</h2>
            <p className="mt-2 text-sm text-slate-500">Create your account to continue to your workspace.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Full Name</label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-orange-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-100">
                <User size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border-0 bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-orange-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-100">
                <Mail size={18} className="text-slate-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-0 bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-orange-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-100">
                <Lock size={18} className="text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-0 bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="text-slate-500 transition hover:text-slate-800"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Profile Photo</label>
              <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-orange-200 bg-white shadow-sm">
                  {avatar ? (
                    <img src={URL.createObjectURL(avatar)} alt="Profile preview" className="h-full w-full object-cover" />
                  ) : (
                    <User size={28} className="text-slate-400" />
                  )}
                </div>

                <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
                  <Camera size={16} />
                  Choose Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setAvatar(file);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {message && (
              <div
                className={`rounded-xl border px-4 py-3 text-sm ${
                  error
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3.5 text-base font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating account..." : "Create Account"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-600">
            <span>Already have an account?</span>
            {onLogin ? (
              <button type="button" onClick={onLogin} className="font-bold text-orange-600 hover:text-orange-700">
                Login
              </button>
            ) : (
              <Link to="/login" className="font-bold text-orange-600 hover:text-orange-700">
                Login
              </Link>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Signup;