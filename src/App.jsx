import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login     from "./Login";
import Dashboard from "./Dashboard";
import UserView  from "./UserView";
import Users from "./Users";
import Settings  from "./Settings";

// ── ROUTE GUARD ───────────────────────────────────────────────────────────────
function PrivateRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const user  = JSON.parse(localStorage.getItem("user") || "{}");
  if (!token) return <Navigate to="/login" replace />;
  if (requiredRole && user.role !== requiredRole)
    return <Navigate to={user.role === "admin" ? "/dashboard" : "/view"} replace />;
  return children;
}

// ── ANIMATED COUNTER ──────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── USE INTERSECTION OBSERVER (scroll reveal) ─────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── REVEAL WRAPPER ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ── DATA ──────────────────────────────────────────────────────────────────────
const stats = [
  { value: 120, suffix: "+", label: "Active Sites"     },
  { value: 500, suffix: "+", label: "Contractors"      },
  { value: 99,  suffix: "%", label: "Uptime"           },
  { value: 40,  suffix: "%", label: "Fewer Incidents"  },
];

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: "Live Site Tracking",
    desc:  "Real-time GPS and task updates across every active project. Know exactly where work stands — foundation to final punch list.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Labour Management",
    desc:  "Clock-in tracking, crew assignments, and automated timesheets. Cut payroll disputes and stay compliant with one click.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: "Budget Control",
    desc:  "Track spend against estimates in real-time. Set alerts before budgets blow out — not after. Every dollar accounted for.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: "Automated Reports",
    desc:  "Daily digests and milestone summaries sent directly to stakeholders. Less time in meetings, more time on-site.",
  },
];

const values = [
  { title: "Site-first thinking",    desc: "Every feature is tested in the field before it ships. If it doesn't work with muddy gloves on, we start over."                                          },
  { title: "Radical transparency",   desc: "Clients, contractors, and site managers see the same data. No surprises, no blame games."                                                               },
  { title: "Safety above all",       desc: "Our incident tracking and alert system has contributed to a 40% reduction in reportable events across our platform."                                    },
];

const team = [
  { initials: "AK", name: "Asel Karunaratne", role: "CEO & Co-founder", accent: true  },
  { initials: "RM", name: "Rohan Mendis",      role: "CTO",              accent: false },
  { initials: "NP", name: "Nadia Perera",      role: "Head of Product",  accent: false },
  { initials: "JS", name: "James Silva",       role: "Head of Sales",    accent: true  },
];

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Company: ["About Us", "Careers", "Blog", "Press"],
  Support: ["Help Centre", "Contact Us", "Privacy", "Terms"],
};

// ── LANDING PAGE ──────────────────────────────────────────────────────────────
function LandingPage() {
  const [scrolled,   setScrolled]   = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [hoverStar,  setHoverStar]  = useState(0);
  const [form,       setForm]       = useState({ name: "", company: "", role: "", review: "" });
  const [submitted,  setSubmitted]  = useState(false);
  const [errors,     setErrors]     = useState({});

  // Parallax hero orb
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMouse = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  const handleSubmitReview = () => {
    const errs = {};
    if (!form.name.trim())   errs.name   = true;
    if (!form.review.trim()) errs.review = true;
    if (!starRating)         errs.rating = true;
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
    setForm({ name: "", company: "", role: "", review: "" });
    setStarRating(0);
    setErrors({});
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}
      className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">

      {/* ── Global CSS animations ── */}
      <style>{`
        @keyframes fadeUp   { from { opacity:0; transform:translateY(32px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeIn   { from { opacity:0 } to { opacity:1 } }
        @keyframes pulse-ring { 0%,100%{transform:scale(1);opacity:.4} 50%{transform:scale(1.15);opacity:0} }
        @keyframes ticker   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes shimmer  { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .anim-fade-up   { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) both }
        .anim-fade-in   { animation: fadeIn 0.8s ease both }
        .pulse-ring     { animation: pulse-ring 2.5s ease-in-out infinite }
        .ticker-track   { animation: ticker 28s linear infinite }
        .shimmer-text   {
          background: linear-gradient(90deg,#f97316,#fb923c,#fdba74,#f97316);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .card-hover { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(249,115,22,.12); border-color: rgba(249,115,22,.3) !important; }
        @media (prefers-reduced-motion: reduce) {
          .anim-fade-up,.anim-fade-in,.ticker-track,.shimmer-text { animation: none !important; }
        }
      `}</style>

      {/* ────────────────────────────────── NAVBAR ────────────────────────────── */}
      <nav style={{
        background: scrolled ? "rgba(2,6,23,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(249,115,22,0.12)" : "1px solid transparent",
        transition: "all .35s ease",
      }} className="fixed top-0 left-0 right-0 z-50 px-6 md:px-14 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-9 h-9 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/30">
            <span className="text-white font-black text-lg">B</span>
          </div>
          <span className="text-white font-black text-lg tracking-tight">Build<span className="text-orange-500">Track</span></span>
        </div>
        <ul className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          {["Home","Projects","Workers","About","Reviews"].map(item => (
            <li key={item} className="relative cursor-pointer hover:text-orange-400 transition-colors group py-1">
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-orange-500 group-hover:w-full transition-all duration-300" />
            </li>
          ))}
        </ul>
        <button onClick={() => window.location.href = "/login"}
          className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2 rounded-xl font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-orange-600/20 hover:-translate-y-0.5 hover:shadow-orange-500/30">
          Sign In
        </button>
      </nav>

      {/* ────────────────────────────────── HERO ──────────────────────────────── */}
      <section className="relative min-h-screen flex items-center px-6 md:px-14 overflow-hidden">
        {/* Animated background orbs */}
        <div style={{
          position: "absolute", top: "20%", right: "10%",
          width: 520, height: 520,
          background: "radial-gradient(circle,rgba(249,115,22,0.15) 0%,transparent 70%)",
          borderRadius: "50%",
          transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
          transition: "transform .8s ease",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "5%",
          width: 300, height: 300,
          background: "radial-gradient(circle,rgba(249,115,22,0.07) 0%,transparent 70%)",
          borderRadius: "50%",
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
          transition: "transform 1s ease",
          pointerEvents: "none",
        }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(249,115,22,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,.04) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }} />

        {/* Diagonal accent line */}
        <div className="absolute top-0 right-0 w-px h-full opacity-10"
          style={{ background: "linear-gradient(to bottom,transparent,#f97316,transparent)" }} />

        <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-14 items-center pt-20">
          {/* Left: copy */}
          <div className="space-y-8">
            <div className="anim-fade-up" style={{ animationDelay: ".05s" }}>
              <span className="inline-flex items-center gap-2 border border-orange-500/25 bg-orange-500/8 text-orange-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                <span className="relative w-2 h-2">
                  <span className="absolute inset-0 bg-orange-500 rounded-full pulse-ring" />
                  <span className="absolute inset-0 bg-orange-500 rounded-full" />
                </span>
                Construction OS · v2.0
              </span>
            </div>

            <h1 className="anim-fade-up text-5xl md:text-6xl font-black tracking-tight leading-[1.05]"
              style={{ animationDelay: ".15s" }}>
              Every site.<br />
              <span className="shimmer-text">Every decision.</span><br />
              One dashboard.
            </h1>

            <p className="anim-fade-up text-slate-400 text-lg leading-relaxed max-w-lg"
              style={{ animationDelay: ".25s" }}>
              BuildTrack gives your field teams, project managers, and executives a single source of truth — built for construction, not adapted from something else.
            </p>

            <div className="anim-fade-up flex flex-col sm:flex-row gap-4" style={{ animationDelay: ".35s" }}>
              <button onClick={() => window.location.href = "/login"}
                className="group relative px-8 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm transition-all shadow-lg shadow-orange-600/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 overflow-hidden">
                <span className="relative z-10">Launch Dashboard →</span>
                <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button onClick={() => window.location.href = "/login"}
                className="px-8 py-3.5 rounded-xl border border-slate-700 hover:border-orange-500/50 text-slate-300 hover:text-white font-bold text-sm transition-all hover:-translate-y-0.5">
                View Features
              </button>
            </div>

            {/* Mini stat row */}
            <div className="anim-fade-up flex gap-6 pt-2" style={{ animationDelay: ".45s" }}>
              {[["120+","Active Sites"],["500+","Contractors"],["99%","Uptime"]].map(([v,l]) => (
                <div key={l}>
                  <p className="text-2xl font-black text-orange-500">{v}</p>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: floating dashboard mockup */}
          <div className="anim-fade-in hidden md:block" style={{ animationDelay: ".3s" }}>
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-4 bg-orange-500/10 rounded-3xl blur-2xl" />

              <div className="relative bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl">
                {/* Fake topbar */}
                <div className="bg-slate-800/80 border-b border-slate-700/50 px-4 py-3 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="text-slate-500 text-xs ml-3">buildtrack.app/dashboard</span>
                </div>
                <div className="p-5 space-y-4">
                  {/* KPI row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[["12","Projects","#f97316"],["89","Workers","#8b5cf6"],["5","Sites","#10b981"]].map(([v,l,c]) => (
                      <div key={l} className="bg-slate-800 rounded-xl p-3 border border-slate-700/50">
                        <p className="text-xl font-black" style={{ color: c }}>{v}</p>
                        <p className="text-xs text-slate-500">{l}</p>
                      </div>
                    ))}
                  </div>
                  {/* Fake progress bars */}
                  <div className="bg-slate-800 rounded-xl p-4 border border-slate-700/50 space-y-3">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Projects</p>
                    {[["Tower Block A","88%","#10b981"],["Harbor Bridge","62%","#f97316"],["LK-12 Highway","41%","#8b5cf6"]].map(([name,pct,c]) => (
                      <div key={name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-300 font-medium">{name}</span>
                          <span style={{ color: c }} className="font-bold">{pct}</span>
                        </div>
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: pct, background: c, transition: "width 1.5s ease" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Status badges */}
                  <div className="flex gap-2 flex-wrap">
                    {[["On Track","#10b981"],["Delayed","#ef4444"],["At Risk","#f59e0b"]].map(([s,c]) => (
                      <span key={s} className="text-xs font-bold px-3 py-1 rounded-full border"
                        style={{ color: c, borderColor: c+"44", background: c+"11" }}>
                        ● {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-orange-500 to-transparent" />
        </div>
      </section>

      {/* ────────────────────────────── TICKER ────────────────────────────────── */}
      <div className="border-y border-orange-500/10 bg-orange-500/5 py-3 overflow-hidden">
        <div className="ticker-track flex gap-12 whitespace-nowrap w-max">
          {[...Array(2)].map((_, di) =>
            ["Live Site Tracking","Labour Management","Budget Control","Automated Reports","Safety Monitoring","Real-time Alerts","Worker Analytics","Project Insights"].map((item, i) => (
              <span key={`${di}-${i}`} className="text-xs font-bold uppercase tracking-widest text-orange-500/60 flex items-center gap-4">
                {item}
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600/40 inline-block" />
              </span>
            ))
          )}
        </div>
      </div>

      {/* ─────────────────────────── STATS SECTION ────────────────────────────── */}
      <section className="py-20 px-6 md:px-14 border-b border-slate-900">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-center p-6 bg-slate-900 rounded-2xl border border-slate-800 card-hover">
                <p className="text-4xl font-black text-orange-500 mb-1">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─────────────────────────── FEATURES SECTION ─────────────────────────── */}
      <section className="py-24 px-6 md:px-14 border-b border-slate-900">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="max-w-xl mb-16">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">Platform Capabilities</p>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Engineered for the<br/>job site. Not the office.
              </h2>
              <p className="text-slate-400 text-base mt-4 leading-relaxed">
                A tight set of tools that do exactly what construction teams need — no bloat, no workarounds.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 card-hover h-full flex flex-col gap-4">
                  <div className="w-11 h-11 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base mb-2 group-hover:text-orange-400 transition-colors">{f.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── ABOUT / VALUES ───────────────────────────── */}
      <section className="py-24 px-6 md:px-14 bg-slate-900/50 border-b border-slate-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-7 space-y-8">
            <Reveal>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">Our Story</p>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                  Built by builders,<br/>for builders.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-slate-400 text-base leading-relaxed">
                BuildTrack was founded in 2019 by ex-site engineers who refused to rely on fragile paperwork. We consolidated project, labour, and budget management into one clean dashboard — tested on real sites, not demo decks.
              </p>
            </Reveal>
            <div className="space-y-4">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.1}>
                  <div className="group flex gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl card-hover">
                    <div className="w-8 h-8 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    </div>
                    <div>
                      <p className="font-bold text-orange-400 text-sm mb-1">{v.title}</p>
                      <p className="text-sm text-slate-400 leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 space-y-5 md:sticky md:top-28">
            <Reveal delay={0.2}>
              <div className="bg-slate-950 border-l-4 border-orange-600 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Headquarters</p>
                <h3 className="font-bold text-white mb-2">Colombo, Sri Lanka</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Running operations management across Auckland and Dubai. Trusted by 500+ contractors worldwide.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Executive Team</p>
                <div className="grid grid-cols-2 gap-3">
                  {team.map(t => (
                    <div key={t.name} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center gap-3 card-hover group">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs text-white shrink-0 ${t.accent ? "bg-orange-600" : "bg-slate-700"}`}>
                        {t.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-300 text-xs truncate group-hover:text-white transition-colors">{t.name}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider truncate">{t.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── REVIEWS SECTION ──────────────────────────── */}
      <section className="py-24 px-6 md:px-14 border-b border-slate-900">
        <div className="max-w-xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">Reviews</p>
              <h2 className="text-3xl font-black text-white tracking-tight">What contractors say.</h2>
              <p className="text-slate-400 text-sm mt-3">Share your experience with BuildTrack on the field.</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">Your Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Tom Wickramasinghe"
                    className={`w-full px-4 py-2.5 rounded-xl border bg-slate-950 text-white text-sm placeholder-slate-700 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all ${errors.name ? "border-red-500" : "border-slate-700"}`} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">Company</label>
                  <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
                    placeholder="ABC Constructions"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm placeholder-slate-700 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">Role</label>
                  <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-300 text-sm outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all">
                    <option value="">Select role</option>
                    {["Project Manager","Site Foreman","General Contractor","Site Engineer","Other"].map(r => (
                      <option key={r} className="bg-slate-950">{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-widest mb-1.5 ${errors.rating ? "text-red-400" : "text-slate-500"}`}>
                    Rating {errors.rating && "— Required"}
                  </label>
                  <div className="flex gap-1.5 items-center px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl h-[42px]">
                    {[1,2,3,4,5].map(v => (
                      <button key={v} type="button"
                        onMouseEnter={() => setHoverStar(v)} onMouseLeave={() => setHoverStar(0)}
                        onClick={() => setStarRating(v)}
                        className="text-xl leading-none transition-transform hover:scale-110"
                        style={{ color: v <= (hoverStar || starRating) ? "#f97316" : "#334155" }}>★</button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">Your Review</label>
                <textarea rows={3} value={form.review} onChange={e => setForm({ ...form, review: e.target.value })}
                  placeholder="Share your experience with BuildTrack on the field..."
                  className={`w-full px-4 py-2.5 rounded-xl border bg-slate-950 text-white text-sm placeholder-slate-700 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all resize-none ${errors.review ? "border-red-500" : "border-slate-700"}`} />
              </div>

              <button onClick={handleSubmitReview}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-lg shadow-orange-600/20 hover:-translate-y-0.5 hover:shadow-orange-500/30">
                Submit Review →
              </button>

              {submitted && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl px-4 py-3 text-center">
                  ✓ Review submitted — thank you for your feedback!
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────── CTA BANNER ───────────────────────────────── */}
      <section className="py-20 px-6 md:px-14">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="absolute inset-0 bg-orange-600/8 rounded-3xl blur-3xl pointer-events-none" />
            <div className="relative bg-slate-900 border border-orange-500/20 rounded-3xl px-10 py-14 shadow-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-4">Get Started</p>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
                Ready to run a tighter site?
              </h2>
              <p className="text-slate-400 text-base max-w-md mx-auto mb-8 leading-relaxed">
                Join 500+ contractors already using BuildTrack to track, manage, and deliver projects on time.
              </p>
              <button onClick={() => window.location.href = "/login"}
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg shadow-orange-600/25 hover:shadow-orange-500/40 hover:-translate-y-1 text-sm">
                Launch BuildTrack →
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─────────────────────────── FOOTER ───────────────────────────────────── */}
      <footer className="bg-slate-950 border-t border-slate-900 pt-16 px-6 md:px-14">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
            <div className="col-span-2 md:col-span-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-sm">B</span>
                </div>
                <span className="font-black text-white">Build<span className="text-orange-500">Track</span></span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed max-w-xs">
                Precision project management for modern construction teams. Built in Sri Lanka, used worldwide.
              </p>
            </div>
            {Object.entries(footerLinks).map(([col, links]) => (
              <div key={col} className="col-span-1 md:col-span-2 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{col}</p>
                <ul className="space-y-2">
                  {links.map(l => (
                    <li key={l} className="text-xs text-slate-500 hover:text-orange-400 cursor-pointer transition-colors">{l}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center py-6 gap-4 text-slate-600 text-xs">
            <p>© 2026 BuildTrack Pvt Ltd. All rights reserved.</p>
            <div className="flex gap-2">
              {["Li","Tw","Ig","Gh"].map(s => (
                <div key={s} className="w-7 h-7 border border-slate-800 hover:border-orange-500/50 hover:text-orange-400 rounded-lg flex items-center justify-center text-xs font-bold cursor-pointer transition-all">
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <Routes>
      <Route path="/"          element={<LandingPage />} />
      <Route path="/login"     element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute requiredRole="admin"><Dashboard user={user} onLogout={handleLogout} /></PrivateRoute>} />
      <Route path="/users"     element={<PrivateRoute requiredRole="admin"><Users user={user} onLogout={handleLogout} /></PrivateRoute>} />
      <Route path="/view"      element={<PrivateRoute requiredRole="user"><UserView user={user} onLogout={handleLogout} /></PrivateRoute>} />
      <Route path="/settings"  element={<PrivateRoute><Settings user={user} onLogout={handleLogout} /></PrivateRoute>} />
      <Route path="*"          element={<Navigate to="/" replace />} />
    </Routes>
  );
}