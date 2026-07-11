import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── SVG ICONS ────────────────────────────────────────────────
const IconShield = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconUser = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconMail = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconLock = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconName = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconEye = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconEyeOff = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const IconCheck = ({ size = 15, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function Login() {
  const [isSignup,   setIsSignup]   = useState(false);
  const [role,       setRole]       = useState("user");   // "admin" | "user"
  const [name,       setName]       = useState("");
  const [email,      setEmail]      = useState("");
  const [password,   setPassword]   = useState("");
  const [showPw,     setShowPw]     = useState(false);
  const [error,      setError]      = useState("");
  const [loading,    setLoading]    = useState(false);
  const navigate = useNavigate();

  // Reset form when switching mode
  const switchMode = () => {
    setIsSignup(v => !v);
    setError(""); setName(""); setEmail(""); setPassword("");
  };

  const handleSubmit = async () => {
    setError("");

    // Basic client-side validation
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required."); return;
    }
    if (isSignup && !name.trim()) {
      setError("Full name is required."); return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters."); return;
    }

    setLoading(true);
    try {
      const url = isSignup
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";

      const body = isSignup
        ? { name: name.trim(), email: email.trim(), password, role }
        : { email: email.trim(), password };

      const res  = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      if (isSignup) {
        setError("✓ Account created! Please login.");
        setIsSignup(false);
        setName(""); setEmail(""); setPassword("");
      } else {
        // Store auth data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user",  JSON.stringify(data.user));
        // Role-based redirect
        if (data.user.role === "admin") navigate("/dashboard");
        else                            navigate("/view");     // user view
      }
    } catch {
      setError("Cannot connect to server. Make sure backend is running.");
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSubmit(); };

  // ── Role selector tab ──
  const RoleTab = ({ value, label, icon }) => (
    <button
      type="button"
      onClick={() => setRole(value)}
      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
        role === value
          ? "bg-white shadow-md text-orange-600 border border-orange-100"
          : "text-slate-400 hover:text-slate-600"
      }`}>
      {icon}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd"
          alt="construction site"
          className="w-full h-full object-cover opacity-50"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

        <div className="absolute bottom-16 left-14 right-14 text-white z-10">
          {/* Role badges */}
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
              <IconShield size={13} color="#ffa94d"/> Admin Access
            </span>
            <span className="inline-flex items-center gap-1.5 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
              <IconUser size={13} color="#74c0fc"/> User Access
            </span>
          </div>
          <h1 className="text-5xl font-extrabold leading-tight mb-5">
            Build smarter.<br/>Manage faster.
          </h1>
          <p className="text-base text-slate-300 max-w-md leading-relaxed">
            Modern construction management platform for tracking projects, workers, and site progress in real-time.
          </p>

          {/* Feature list */}
          <div className="mt-8 space-y-2">
            {["Full project & site management (Admin)", "View reports & progress (User)", "Real-time worker tracking"].map(f => (
              <div key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                <div className="w-5 h-5 bg-orange-500/30 rounded-full flex items-center justify-center shrink-0">
                  <IconCheck size={11} color="#ffa94d"/>
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="w-full lg:w-1/2 bg-slate-50 flex items-center justify-center px-6 py-10 overflow-y-auto">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-md shadow-orange-200">
              <span className="text-white font-black text-xl">B</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
              Build<span className="text-orange-600">Track</span>
            </h1>
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-1">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-slate-500 text-sm mb-7">
            {isSignup ? "Fill in your details to get started" : "Sign in to manage your projects"}
          </p>

          {/* ── ROLE SELECTOR (signup only) ── */}
          {isSignup && (
            <div className="mb-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Account Type</p>
              <div className="flex items-center gap-1 bg-slate-100 rounded-2xl p-1">
                <RoleTab value="user"  label="User"  icon={<IconUser  size={16} color={role==="user"  ? "#ea580c" : "#94a3b8"}/>} />
                <RoleTab value="admin" label="Admin" icon={<IconShield size={16} color={role==="admin" ? "#ea580c" : "#94a3b8"}/>} />
              </div>
              {/* Role description */}
              <p className="text-xs text-slate-400 mt-2 px-1">
                {role === "admin"
                  ? "Admin can add, edit, and delete projects, workers, and sites."
                  : "User can view all data but cannot make changes."}
              </p>
            </div>
          )}

          {/* Error / success message */}
          {error && (
            <div className={`flex items-start gap-2 px-4 py-3 rounded-xl mb-5 text-sm font-medium ${
              error.startsWith("✓")
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}>
              {error}
            </div>
          )}

          {/* Form */}
          <div className="space-y-4" onKeyDown={handleKeyDown}>

            {/* Name (signup only) */}
            {isSignup && (
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <IconName size={16} color="#94a3b8"/>
                </span>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-slate-800 text-sm transition-all placeholder-slate-400"
                />
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <IconMail size={16} color="#94a3b8"/>
              </span>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-slate-800 text-sm transition-all placeholder-slate-400"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <IconLock size={16} color="#94a3b8"/>
              </span>
              <input
                type={showPw ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3.5 rounded-2xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-slate-800 text-sm transition-all placeholder-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                {showPw ? <IconEyeOff size={16}/> : <IconEye size={16}/>}
              </button>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white py-3.5 rounded-2xl font-bold text-base transition-all shadow-lg shadow-orange-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  Please wait…
                </span>
              ) : isSignup ? "Create Account" : "Sign In"}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-400 text-xs font-semibold">OR</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Role info cards (login only — helps users know which account to use) */}
          {!isSignup && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center">
                    <IconShield size={14} color="#ea580c"/>
                  </div>
                  <span className="text-xs font-black text-slate-700">Admin</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">Full access — add, edit, delete everything</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                    <IconUser size={14} color="#2563eb"/>
                  </div>
                  <span className="text-xs font-black text-slate-700">User</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">View only — browse projects & reports</p>
              </div>
            </div>
          )}

          {/* Switch signup/login */}
          <p className="text-center text-slate-500 text-sm">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={switchMode}
              className="text-orange-600 font-bold ml-2 hover:underline">
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}