import React, { useState, useEffect, useMemo } from "react";
import Projects from "./Projects";
import Sites from "./Sites";
import Workers from "./Workers";
import Reports from "./Reports";
import WeatherWidget from "./WeatherWidget";
import Settings from "./Settings"; 



// ── SVG ICONS ────────────────────────────────────────────────
const IcGrid      = ({ size=18, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
const IcHardHat   = ({ size=18, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a8 8 0 0 1 16 0v3"/></svg>;
const IcWorker    = ({ size=18, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IcMapPin    = ({ size=18, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IcBarChart  = ({ size=18, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>;
const IcSettings  = ({ size=18, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const IcUsers     = ({ size=18, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2.2"/><path d="M5.5 17c.6-2 2-3 3.5-3s2.9 1 3.5 3"/><line x1="14.5" y1="8.5" x2="18.5" y2="8.5"/><line x1="14.5" y1="12" x2="18.5" y2="12"/></svg>;
const IcLogout    = ({ size=18, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const IcMenu      = ({ size=20, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const IcPlus      = ({ size=18, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>;
const IcClose     = ({ size=16, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>;
const IcAlert     = ({ size=11, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const IcCheck     = ({ size=15, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcTrash     = ({ size=15, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>;
const IcActivity  = ({ size=20, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const IcTrendUp   = ({ size=18, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
const IcWarning   = ({ size=18, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const IcBudget    = ({ size=18, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const IcSave      = ({ size=15, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const IcClock     = ({ size=14, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IcClipboard = ({ size=18, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12l2 2 4-4"/></svg>;
const IcFlag      = ({ size=13, color="currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>;

// ── CONSTANTS ────────────────────────────────────────────────
const initialActivity = [
  { action: "New worker assigned",  detail: "Tower Block A – Rohan Silva",       time: "2m ago",  iconType: "worker"  },
  { action: "Progress updated",     detail: "Shopping Mall Foundation → 88%",    time: "15m ago", iconType: "trend"   },
  { action: "Delay reported",       detail: "Harbor Bridge – material shortage", time: "1h ago",  iconType: "warning" },
  { action: "Budget approved",      detail: "Highway Overpass LK-12 – Rs 0.5M", time: "3h ago",  iconType: "budget"  },
];

const activityIcon = (type) => {
  const map = {
    worker:  { icon: <IcWorker  size={16} color="#7c3aed" />, bg: "bg-violet-100"  },
    trend:   { icon: <IcTrendUp size={16} color="#059669" />, bg: "bg-emerald-100" },
    warning: { icon: <IcWarning size={16} color="#d97706" />, bg: "bg-amber-100"   },
    budget:  { icon: <IcBudget  size={16} color="#2563eb" />, bg: "bg-blue-100"    },
    project: { icon: <IcHardHat size={16} color="#ea580c" />, bg: "bg-orange-100"  },
    deleted: { icon: <IcTrash   size={16} color="#ef4444" />, bg: "bg-red-100"     },
  };
  return map[type] || map.project;
};

const STATUS_COLORS = {
  "On Track": "#10b981", "Delayed": "#ef4444", "At Risk": "#f59e0b",
  "Active": "#10b981", "Inactive": "#94a3b8", "On Hold": "#f59e0b", "Closed": "#ef4444", "On Leave": "#8b5cf6"
};
const PROGRESS_COLOR = { "On Track": "bg-emerald-500", "Delayed": "bg-red-400", "At Risk": "bg-amber-400" };
const STATUS_STYLE = {
  "On Track": { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  "Delayed":  { bg: "bg-red-50",     text: "text-red-700",     dot: "bg-red-500"     },
  "At Risk":  { bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-500"   },
};

// ── PURE SVG DONUT CHART (No Recharts — guaranteed to render) ─
function DonutChart({ data, total, centerLabel, size = 180, thickness = 22 }) {
  const cx = size / 2;
  const cy = size / 2;
  const r  = (size / 2) - thickness - 4;
  const circumference = 2 * Math.PI * r;

  const totalVal = data.reduce((s, d) => s + (d.value || 0), 0);

  const segments = totalVal === 0
    ? [{ name: "Empty", value: 1, color: "#e2e8f0" }]
    : data.filter(d => d.value > 0);

  let offset = 0;
  const GAP = totalVal > 0 && segments.length > 1 ? 3 : 0;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {segments.map((seg, i) => {
          const fraction = seg.value / (totalVal || 1);
          const dash     = Math.max(0, fraction * circumference - GAP);
          const space    = circumference - dash;
          const strokeDashoffset = -offset;
          offset += fraction * circumference;
          return (
            <circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={seg.color || STATUS_COLORS[seg.name] || "#94a3b8"}
              strokeWidth={thickness}
              strokeDasharray={`${dash} ${space}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        pointerEvents: "none"
      }}>
        <span style={{ fontSize: 26, fontWeight: 900, color: "#1e293b", lineHeight: 1 }}>
          {total ?? totalVal}
        </span>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>
          {centerLabel ?? "total"}
        </span>
      </div>
    </div>
  );
}

// ── DELETE CONFIRM MODAL ─────────────────────────────────────
function DeleteConfirmModal({ projectName, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(5px)" }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden" style={{ animation: "modalIn .18s cubic-bezier(.4,0,.2,1)" }}>
        <div className="px-7 py-7 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-100"><IcTrash size={28} color="#ef4444" /></div>
          <h2 className="text-lg font-black text-slate-800 mb-2">Delete Project?</h2>
          <p className="text-slate-500 text-sm leading-relaxed">Are you sure you want to delete <span className="font-bold text-slate-700">"{projectName}"</span>?<br />This cannot be undone.</p>
        </div>
        <div className="flex items-center gap-3 px-7 pb-7">
          <button onClick={onClose} className="flex-1 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all border border-slate-200">Cancel</button>
          <button onClick={onConfirm} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 active:scale-95 text-white text-sm font-bold shadow-md shadow-red-200 transition-all">
            <IcTrash size={14} color="#fff" /> Delete
          </button>
        </div>
      </div>
      <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.93) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
    </div>
  );
}

// ── NEW PROJECT MODAL ────────────────────────────────────────
function NewProjectModal({ onClose, onAdd }) {
  const empty = { name: "", site: "", progress: "", status: "On Track", workers: "", budget: "" };
  const [form, setForm]     = useState(empty);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const change = e => { setForm({ ...form, [e.target.name]: e.target.value }); setErrors({ ...errors, [e.target.name]: "" }); };

  const validate = () => {
    const e = {};
    if (!form.name.trim())   e.name    = "Project name is required";
    if (!form.site.trim())   e.site    = "Site location is required";
    if (!form.budget.trim()) e.budget  = "Budget is required";
    if (!form.workers)       e.workers = "Number of workers is required";
    const p = Number(form.progress);
    if (form.progress === "" || isNaN(p) || p < 0 || p > 100) e.progress = "Enter a value between 0 and 100";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ name: form.name.trim(), site: form.site.trim(), progress: Number(form.progress), status: form.status, workers: Number(form.workers), budget: form.budget.trim() }),
      });
      const data = await res.json();
      if (res.ok) { onAdd(data); onClose(); }
      else alert(`Error: ${data.message || "Failed to save project"}`);
    } catch { alert("Cannot connect to backend."); }
    finally { setSaving(false); }
  };

  const fc = name => `w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 outline-none transition-all ${errors[name] ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200" : "border-slate-200 bg-white focus:ring-2 focus:ring-orange-300 focus:border-orange-400"}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(5px)" }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden" style={{ animation: "modalIn .2s cubic-bezier(.4,0,.2,1)" }}>
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-md shadow-orange-200"><IcPlus size={20} color="#fff" /></div>
            <div><h2 className="text-lg font-black text-slate-800">New Project</h2><p className="text-xs text-slate-400">Fill in the details to add a project</p></div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all"><IcClose size={16} color="#64748b" /></button>
        </div>
        <div className="px-7 py-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Project Name</label>
            <input type="text" name="name" value={form.name} onChange={change} placeholder="e.g. City Hall Renovation" className={fc("name")} />
            {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><IcAlert size={11} color="#ef4444" /> {errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Site Location</label>
            <input type="text" name="site" value={form.site} onChange={change} placeholder="e.g. Colombo 03" className={fc("site")} />
            {errors.site && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><IcAlert size={11} color="#ef4444" /> {errors.site}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Progress (%)</label>
              <input type="number" name="progress" value={form.progress} onChange={change} placeholder="0 – 100" className={fc("progress")} />
              {errors.progress && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><IcAlert size={11} color="#ef4444" /> {errors.progress}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">No. of Workers</label>
              <input type="number" name="workers" value={form.workers} onChange={change} placeholder="e.g. 25" className={fc("workers")} />
              {errors.workers && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><IcAlert size={11} color="#ef4444" /> {errors.workers}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Status</label>
              <select name="status" value={form.status} onChange={change} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 outline-none focus:ring-2 focus:ring-orange-300 transition-all">
                <option>On Track</option><option>Delayed</option><option>At Risk</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Budget</label>
              <input type="text" name="budget" value={form.budget} onChange={change} placeholder="e.g. Rs 1.5M" className={fc("budget")} />
              {errors.budget && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><IcAlert size={11} color="#ef4444" /> {errors.budget}</p>}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-7 py-5 bg-slate-50 border-t border-slate-100">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-all">Cancel</button>
          <button onClick={handleSubmit} disabled={saving} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-sm font-bold transition-all shadow-md shadow-orange-200 disabled:opacity-60">
            {saving ? <><IcSave size={15} color="#fff" /> Saving…</> : <><IcCheck size={15} color="#fff" /> Add Project</>}
          </button>
        </div>
      </div>
      <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.93) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ── DASHBOARD PAGE ───────────────────────────────────────────
// ════════════════════════════════════════════════════════════
function DashboardPage({ projects, sites, workers, activity, loading, onDeleteProject }) {
  const [deleteTarget, setDeleteTarget] = useState(null);

  const confirmDelete = () => { if (deleteTarget) { onDeleteProject(deleteTarget.id); setDeleteTarget(null); } };

  // ── Computed analytics ──
  const totalWorkers     = workers.length;
  const activeWorkers    = workers.filter(w => (w.status || "").toLowerCase() === "active").length;
  const totalSites       = sites.length;
  const activeSites      = sites.filter(s => s.status === "Active").length;
  const totalInspections = sites.reduce((sum, s) => sum + (s.inspections?.length || 0), 0);
  const passInspections  = sites.reduce((sum, s) => sum + (s.inspections || []).filter(i => i.result === "Pass").length, 0);
  const passRate         = totalInspections > 0 ? Math.round((passInspections / totalInspections) * 100) : 0;
  const onTrack          = projects.filter(p => p.status === "On Track").length;
  const avgProgress      = projects.length > 0 ? Math.round(projects.reduce((s, p) => s + (Number(p.progress) || 0), 0) / projects.length) : 0;

  // ── Chart data ──
  const projectStatusData = useMemo(() => {
    const counts = {};
    projects.forEach(p => { counts[p.status] = (counts[p.status] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value, color: STATUS_COLORS[name] }));
  }, [projects]);

  const siteStatusData = useMemo(() => {
    const counts = {};
    sites.forEach(s => { counts[s.status] = (counts[s.status] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value, color: STATUS_COLORS[name] }));
  }, [sites]);

  const workerChartData = useMemo(() => {
    const onLeave = Math.max(0, totalWorkers - activeWorkers);
    return [
      { name: "Active",   value: activeWorkers, color: "#f97316" },
      { name: "On Leave", value: onLeave,        color: "#8b5cf6" },
    ];
  }, [totalWorkers, activeWorkers]);

  const kpis = [
    { label: "Total Projects",   value: projects.length,   sub: `${onTrack} on track`,     color: "text-orange-600",  bg: "bg-orange-50  border-orange-100",  icon: <IcHardHat   size={22} color="#ea580c" /> },
    { label: "Active Workers",   value: activeWorkers,     sub: `${totalWorkers} total`,    color: "text-violet-600",  bg: "bg-violet-50  border-violet-100",  icon: <IcWorker    size={22} color="#7c3aed" /> },
    { label: "Active Sites",     value: activeSites,       sub: `${totalSites} registered`, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100", icon: <IcMapPin    size={22} color="#059669" /> },
    { label: "Inspections",      value: totalInspections,  sub: `${passRate}% pass rate`,   color: "text-teal-600",    bg: "bg-teal-50    border-teal-100",    icon: <IcClipboard size={22} color="#0d9488" /> },
    { label: "Avg Progress",     value: `${avgProgress}%`, sub: "across all projects",      color: "text-blue-600",    bg: "bg-blue-50    border-blue-100",    icon: <IcActivity  size={22} color="#2563eb" /> },
  ];

  return (
    <div className="p-6 space-y-6">
      {deleteTarget && <DeleteConfirmModal projectName={deleteTarget.name} onClose={() => setDeleteTarget(null)} onConfirm={confirmDelete} />}

      {/* ── Weather Widget ── */}
      <WeatherWidget sites={sites} />

      {/* ── KPI Strip ── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map(k => (
          <div key={k.label} className={`bg-white rounded-2xl border shadow-sm p-4 flex items-center gap-3 ${k.bg}`}>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${k.bg}`}>{k.icon}</div>
            <div>
              <p className="text-slate-400 text-xs mb-0.5">{k.label}</p>
              <p className="text-2xl font-black text-slate-800 leading-none">{k.value}</p>
              <p className={`text-xs mt-1 font-semibold ${k.color}`}>{k.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Three Donut Charts (Pure SVG) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Project Status */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col items-center">
          <h3 className="w-full text-left font-black text-slate-800 mb-6">Project Status</h3>
          <DonutChart data={projectStatusData} total={projects.length} size={180} thickness={22} />
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {projectStatusData.length > 0
              ? projectStatusData.map(entry => (
                  <div key={entry.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color || STATUS_COLORS[entry.name] }}></span>
                    <span className="text-xs font-bold text-slate-500">{entry.name} ({entry.value})</span>
                  </div>
                ))
              : <span className="text-xs text-slate-400">No projects yet</span>
            }
          </div>
        </div>

        {/* Worker Status */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col items-center">
          <h3 className="w-full text-left font-black text-slate-800 mb-6">Worker Status</h3>
          <DonutChart data={workerChartData} total={totalWorkers} size={180} thickness={22} />
          <div className="flex justify-center gap-4 mt-6">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#f97316" }}></span>
              <span className="text-xs font-bold text-slate-500">Active ({activeWorkers})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#8b5cf6" }}></span>
              <span className="text-xs font-bold text-slate-500">On Leave ({Math.max(0, totalWorkers - activeWorkers)})</span>
            </div>
          </div>
        </div>

        {/* Site Status */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col items-center">
          <h3 className="w-full text-left font-black text-slate-800 mb-6">Site Status</h3>
          <DonutChart data={siteStatusData} total={totalSites} size={180} thickness={22} />
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {siteStatusData.length > 0
              ? siteStatusData.map(entry => (
                  <div key={entry.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color || STATUS_COLORS[entry.name] }}></span>
                    <span className="text-[11px] font-bold text-slate-500">{entry.name} ({entry.value})</span>
                  </div>
                ))
              : <span className="text-xs text-slate-400">No sites yet</span>
            }
          </div>
        </div>
      </div>

      {/* ── Task Manager Widget ── */}
      <TaskWidget />

      {/* ── Bottom Row: Projects Table + Activity ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Projects table */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-800">Active Projects</h2>
            {projects.length > 0 && <span className="text-xs text-slate-400">{projects.length} project{projects.length !== 1 ? "s" : ""}</span>}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-xs uppercase">
                  <th className="text-left px-6 py-3 font-semibold tracking-wider">Project</th>
                  <th className="text-left px-4 py-3 font-semibold tracking-wider">Progress</th>
                  <th className="text-left px-4 py-3 font-semibold tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 font-semibold tracking-wider">Workers</th>
                  <th className="text-left px-4 py-3 font-semibold tracking-wider">Budget</th>
                  <th className="text-left px-4 py-3 font-semibold tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
                      <p>Loading projects…</p>
                    </div>
                  </td></tr>
                ) : projects.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center"><IcHardHat size={28} color="#94a3b8" /></div>
                      <p className="font-medium text-slate-500">No projects yet</p>
                      <p className="text-xs">Click <span className="font-semibold text-orange-600">+ New Project</span> to get started.</p>
                    </div>
                  </td></tr>
                ) : projects.map((p, i) => (
                  <tr key={p._id || i} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-800">{p.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1"><IcMapPin size={10} color="#94a3b8" /> {p.site?.name || p.site}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-slate-100 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full transition-all ${PROGRESS_COLOR[p.status]}`} style={{ width: `${p.progress}%` }} />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{p.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-semibold ${STATUS_STYLE[p.status]?.bg} ${STATUS_STYLE[p.status]?.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_STYLE[p.status]?.dot}`}></span>{p.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600 font-medium text-sm">{p.workers}</td>
                    <td className="px-4 py-4 text-slate-600 font-medium text-sm">{p.budget}</td>
                    <td className="px-4 py-4">
                      <button onClick={() => setDeleteTarget({ id: p._id || i, name: p.name })}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 hover:bg-red-100 text-red-500 border border-red-200 transition-all active:scale-95">
                        <IcTrash size={13} color="#ef4444" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
            <IcActivity size={16} color="#94a3b8" />
            <h2 className="text-base font-bold text-slate-800">Recent Activity</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {activity.slice(0, 8).map((item, i) => {
              const { icon, bg } = activityIcon(item.iconType);
              return (
                <div key={i} className="flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50/50 transition-colors">
                  <div className={`w-8 h-8 ${bg} rounded-xl flex items-center justify-center shrink-0`}>{icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700">{item.action}</p>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{item.detail}</p>
                    <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1"><IcClock size={10} color="#cbd5e1" /> {item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TASK WIDGET (now backed by MongoDB via /api/tasks) ──────
const PRIORITY_CFG = {
  High:   { bg: "bg-red-50",    text: "text-red-600",    border: "border-red-200",    dot: "bg-red-500"    },
  Medium: { bg: "bg-amber-50",  text: "text-amber-600",  border: "border-amber-200",  dot: "bg-amber-500"  },
  Low:    { bg: "bg-emerald-50",text: "text-emerald-600",border: "border-emerald-200",dot: "bg-emerald-500" },
};

function TaskWidget() {
  const [tasks,    setTasks]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [newText,  setNewText]  = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filter,   setFilter]   = useState("All");
  const [saving,   setSaving]   = useState(false);

  const authHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
  });

  // ── Fetch tasks from backend on mount ──
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/tasks", { headers: authHeaders() });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) setTasks(data);
        }
      } catch (err) {
        console.error("Failed to load tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // ── Add task ──
  const addTask = async () => {
    const t = newText.trim();
    if (!t) return;
    setSaving(true);
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ text: t, priority }),
      });
      const data = await res.json();
      if (res.ok) {
        setTasks(prev => [data, ...prev]);
        setNewText("");
      } else {
        alert(data.message || "Failed to add task");
      }
    } catch {
      alert("Cannot connect to backend.");
    } finally {
      setSaving(false);
    }
  };

  // ── Toggle done ──
  const toggleDone = async (task) => {
    const updated = { ...task, done: !task.done };
    setTasks(prev => prev.map(t => t._id === task._id ? updated : t)); // optimistic update
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ done: updated.done }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setTasks(prev => prev.map(t => t._id === task._id ? task : t)); // revert on failure
    }
  };

  // ── Delete task ──
  const deleteTask = async (id) => {
    const prevTasks = tasks;
    setTasks(prev => prev.filter(t => t._id !== id)); // optimistic
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error();
    } catch {
      setTasks(prevTasks); // revert on failure
    }
  };

  // ── Clear completed ──
  const clearCompleted = async () => {
    const prevTasks = tasks;
    setTasks(prev => prev.filter(t => !t.done)); // optimistic
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error();
    } catch {
      setTasks(prevTasks); // revert on failure
    }
  };

  const filtered = tasks.filter(t => {
    if (filter === "Active")    return !t.done;
    if (filter === "Completed") return t.done;
    return true;
  });

  const doneCount  = tasks.filter(t => t.done).length;
  const totalCount = tasks.length;
  const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center">
            <IcClipboard size={15} color="#ea580c" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-800">Task Manager</h2>
            <p className="text-xs text-slate-400">{doneCount}/{totalCount} completed</p>
          </div>
        </div>
        {/* Progress pill */}
        <div className="flex items-center gap-2">
          <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-xs font-bold text-orange-600">{pct}%</span>
        </div>
      </div>

      {/* Add task input */}
      <div className="px-5 pt-4 pb-3 border-b border-slate-50">
        <div className="flex gap-2">
          <input
            value={newText} onChange={e => setNewText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTask()}
            placeholder="Add a new task..."
            disabled={saving}
            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all disabled:opacity-60"
          />
          <select value={priority} onChange={e => setPriority(e.target.value)}
            className="px-2 py-2 rounded-xl border border-slate-200 text-xs text-slate-600 outline-none focus:ring-2 focus:ring-orange-300 bg-white">
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <button onClick={addTask} disabled={saving}
            className="px-3 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-colors flex items-center justify-center disabled:opacity-60">
            <IcPlus size={15} color="#fff" />
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 px-5 pt-3 pb-1">
        {["All","Active","Completed"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              filter === f ? "bg-orange-600 text-white" : "text-slate-400 hover:text-slate-700"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="px-5 py-2 space-y-1.5 max-h-64 overflow-y-auto">
        {loading ? (
          <div className="flex flex-col items-center gap-2 py-8 text-slate-400 text-xs">
            <div className="w-6 h-6 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
            Loading tasks…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-6 text-slate-400 text-xs">No tasks here yet.</div>
        ) : filtered.map(task => {
          const p = PRIORITY_CFG[task.priority];
          return (
            <div key={task._id}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all ${
                task.done ? "bg-slate-50 border-slate-100 opacity-60" : "bg-white border-slate-100 hover:border-slate-200"}`}>
              {/* Checkbox */}
              <button onClick={() => toggleDone(task)}
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                  task.done ? "bg-emerald-500 border-emerald-500" : "border-slate-300 hover:border-orange-400"}`}>
                {task.done && <IcCheck size={11} color="#fff" />}
              </button>

              {/* Text */}
              <span className={`flex-1 text-xs font-medium ${task.done ? "line-through text-slate-400" : "text-slate-700"}`}>
                {task.text}
              </span>

              {/* Priority badge */}
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border shrink-0 ${p.bg} ${p.text} ${p.border}`}>
                <IcFlag size={9} color="currentColor" />
                {task.priority}
              </span>

              {/* Delete (close icon) */}
              <button onClick={() => deleteTask(task._id)}
                className="shrink-0 text-slate-300 hover:text-red-400 transition-colors">
                <IcClose size={13} color="currentColor" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer summary */}
      <div className="px-5 py-3 border-t border-slate-50 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          <span className="text-red-500 font-bold">{tasks.filter(t => t.priority === "High" && !t.done).length}</span> high priority remaining
        </span>
        {doneCount > 0 && (
          <button onClick={clearCompleted}
            className="text-xs text-slate-400 hover:text-red-500 font-semibold transition-colors">
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ── USERS PAGE (system accounts / login users, from MongoDB) ─
// ════════════════════════════════════════════════════════════
function UsersPage() {
  const [users, setUsers]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState("");
  const [roleFilter, setRoleFilter]   = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const authHeaders = () => ({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/users", { headers: authHeaders() });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) setUsers(data);
        }
      } catch (err) {
        console.error("Failed to load users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const prevUsers = users;
    setUsers(prev => prev.filter(u => u._id !== id)); // optimistic
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error();
    } catch {
      setUsers(prevUsers); // revert on failure
      alert("Failed to remove user.");
    } finally {
      setDeleteTarget(null);
    }
  };

  const roles = useMemo(
    () => ["All", ...Array.from(new Set(users.map(u => u.role).filter(Boolean)))],
    [users]
  );

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchesSearch = (u.name || "").toLowerCase().includes(q) || (u.email || "").toLowerCase().includes(q);
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 space-y-6">
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(5px)" }}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden" style={{ animation: "modalIn .18s cubic-bezier(.4,0,.2,1)" }}>
            <div className="px-7 py-7 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-100"><IcTrash size={28} color="#ef4444" /></div>
              <h2 className="text-lg font-black text-slate-800 mb-2">Remove User?</h2>
              <p className="text-slate-500 text-sm leading-relaxed">Are you sure you want to remove <span className="font-bold text-slate-700">"{deleteTarget.name}"</span>?<br />This cannot be undone.</p>
            </div>
            <div className="flex items-center gap-3 px-7 pb-7">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all border border-slate-200">Cancel</button>
              <button onClick={() => handleDelete(deleteTarget.id)} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 active:scale-95 text-white text-sm font-bold shadow-md shadow-red-200 transition-all">
                <IcTrash size={14} color="#fff" /> Remove
              </button>
            </div>
          </div>
          <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.93) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">Users</h1>
          <p className="text-slate-400 text-sm mt-0.5">Manage system accounts and access roles</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-100">
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full sm:max-w-sm px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
          />
          <div className="flex items-center gap-3">
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-600 outline-none focus:ring-2 focus:ring-orange-300 bg-white">
              {roles.map(r => <option key={r}>{r}</option>)}
            </select>
            <span className="text-xs text-slate-400 whitespace-nowrap">{filtered.length} user{filtered.length !== 1 ? "s" : ""}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-xs uppercase">
                <th className="text-left px-6 py-3 font-semibold tracking-wider">Name</th>
                <th className="text-left px-4 py-3 font-semibold tracking-wider">Email</th>
                <th className="text-left px-4 py-3 font-semibold tracking-wider">Role</th>
                <th className="text-left px-4 py-3 font-semibold tracking-wider">Status</th>
                <th className="text-left px-4 py-3 font-semibold tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-sm">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
                    <p>Loading users…</p>
                  </div>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-sm">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center"><IcUsers size={28} color="#94a3b8" /></div>
                    <p className="font-medium text-slate-500">No users found</p>
                  </div>
                </td></tr>
              ) : filtered.map((u, i) => (
                <tr key={u._id || i} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">{u.name || "—"}</td>
                  <td className="px-4 py-4 text-slate-600">{u.email}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-semibold bg-orange-50 text-orange-600 border border-orange-100">{u.role || "User"}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-semibold ${u.status === "Inactive" ? "bg-slate-100 text-slate-500" : "bg-emerald-50 text-emerald-700"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.status === "Inactive" ? "bg-slate-400" : "bg-emerald-500"}`}></span>
                      {u.status || "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => setDeleteTarget({ id: u._id || i, name: u.name || u.email })}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 hover:bg-red-100 text-red-500 border border-red-200 transition-all active:scale-95">
                      <IcTrash size={13} color="#ef4444" /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── COMING SOON ──────────────────────────────────────────────
function ComingSoon({ label, iconEl }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-7 text-center">
      <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center mb-4 border border-orange-100">{iconEl}</div>
      <h2 className="text-2xl font-black text-slate-800 mb-2">{label}</h2>
      <p className="text-slate-400 text-sm">This section is coming soon. Stay tuned!</p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ── MAIN DASHBOARD ───────────────────────────────────────────
// ════════════════════════════════════════════════════════════
export default function Dashboard({ user, onLogout }) {
  const [active,          setActive]          = useState("Dashboard");
  const [sidebarOpen,     setSidebarOpen]     = useState(true);
  const [showModal,       setShowModal]       = useState(false);
  const [projects,        setProjects]        = useState([]);
  const [sites,           setSites]           = useState([]);
  const [workers,         setWorkers]         = useState([]);
  const [activity,        setActivity]        = useState(initialActivity);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingProjects(true);
      try {
        const token = localStorage.getItem("token");
        const headers = { "Authorization": `Bearer ${token}` };

        const resProjects = await fetch("http://localhost:5000/api/projects", { headers });
        const dataProjects = await resProjects.json();
        if (Array.isArray(dataProjects)) setProjects(dataProjects);

        const resSites = await fetch("http://localhost:5000/api/sites", { headers });
        if (resSites.ok) {
          const dataSites = await resSites.json();
          if (Array.isArray(dataSites)) setSites(dataSites);
        }

        const resWorkers = await fetch("http://localhost:5000/api/workers", { headers });
        if (resWorkers.ok) {
          const dataWorkers = await resWorkers.json();
          if (Array.isArray(dataWorkers)) setWorkers(dataWorkers);
        }

      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchData();
  }, []);

  const adminUser = user || { name: "Admin User", email: "admin@buildtrack.lk" };

  const handleLogout = () => { localStorage.removeItem("token"); if (typeof onLogout === "function") onLogout(); else window.location.href = "/"; };

  const handleAddProject = (p) => {
    setProjects(prev => [p, ...prev]);
    setActivity(prev => [{ action: "New project added", detail: `${p.name} – ${p.site?.name || p.site}`, time: "just now", iconType: "project" }, ...prev]);
  };

  const handleDeleteProject = async (idOrIndex) => {
    const deleted = projects.find((p, i) => (p._id || i) === idOrIndex);
    setProjects(prev => prev.filter((p, i) => (p._id || i) !== idOrIndex));
    if (deleted) setActivity(prev => [{ action: "Project deleted", detail: deleted.name, time: "just now", iconType: "deleted" }, ...prev]);
    if (deleted?._id) {
      try {
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:5000/api/projects/${deleted._id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
      } catch (err) { console.error("Failed to delete:", err); }
    }
  };

  const navItems = [
    { label: "Dashboard", icon: <IcGrid     size={18} /> },
    { label: "Projects",  icon: <IcHardHat  size={18} /> },
    { label: "Workers",   icon: <IcWorker   size={18} /> },
    { label: "Sites",     icon: <IcMapPin   size={18} /> },
    { label: "Reports",   icon: <IcBarChart size={18} /> },
    { label: "Users",     icon: <IcUsers    size={18} /> },
    { label: "Settings",  icon: <IcSettings size={18} /> },
  ];

  const renderPage = () => {
    switch (active) {
      case "Dashboard": return <DashboardPage projects={projects} sites={sites} workers={workers} activity={activity} loading={loadingProjects} onDeleteProject={handleDeleteProject} />;
      case "Projects":  return <Projects projects={projects} setProjects={setProjects} onDeleteProject={handleDeleteProject} />;
      case "Workers":   return <Workers workers={workers} setWorkers={setWorkers} />;
      case "Sites":     return <Sites sites={sites} setSites={setSites} allWorkers={workers} allProjects={projects} />;
      case "Reports":   return <Reports projects={projects} workers={workers} sites={sites} />;
      case "Users":     return <UsersPage />;
      case "Settings":  return <Settings user={user} onLogout={handleLogout} />; // 👈 මෙතන තමයි පරණ ComingSoon එක වෙනුවට අලුත් Settings පේජ් එක දැම්මේ
      default: return null;
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }} className="flex min-h-screen bg-slate-100">
      {showModal && <NewProjectModal onClose={() => setShowModal(false)} onAdd={handleAddProject} />}

      {/* SIDEBAR */}
      <aside className={`${sidebarOpen ? "w-60" : "w-16"} transition-all duration-300 bg-slate-900 flex flex-col shrink-0`} style={{ minHeight: "100vh" }}>
        <div className="flex items-center gap-2.5 px-4 py-5 border-b border-slate-700/60">
          <div className="w-9 h-9 bg-orange-600 rounded-xl flex items-center justify-center shrink-0"><span className="text-white font-black text-lg">B</span></div>
          {sidebarOpen && <span className="text-white font-bold text-lg">Build<span className="text-orange-500">Track</span></span>}
        </div>
        <nav className="flex-1 py-3 space-y-0.5 px-2">
          {navItems.map(item => (
            <button key={item.label} onClick={() => setActive(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active === item.label ? "bg-orange-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
              <span className="shrink-0">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-slate-700/60">
          <button onClick={handleLogout} className="w-full text-slate-400 hover:text-white hover:bg-slate-800 text-sm flex items-center gap-2 px-3 py-2 rounded-xl transition-all">
            <IcLogout size={18} />{sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-auto flex flex-col">
        <header className="bg-white border-b border-slate-200 px-7 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-500 hover:text-slate-800 transition-colors"><IcMenu size={22} /></button>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Good morning, {adminUser?.name?.split(" ")[0]} 👋</h1>
              <p className="text-slate-400 text-xs mt-0.5">Admin View</p>
            </div>
          </div>
          {active === "Dashboard" && (
            <button onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-orange-200 transition-all">
              <IcPlus size={16} color="#fff" /> New Project
            </button>
          )}
        </header>
        {renderPage()}
      </main>
    </div>
  );
}