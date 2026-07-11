import React, { useState, useRef, useEffect } from "react";

const API = "http://localhost:5000/api";
const authHeader = () => ({ "Authorization": `Bearer ${localStorage.getItem("token")}` });

// ── SVG ICON COMPONENTS ──────────────────────────────────────
const IconConstruction = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/>
    <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/>
    <path d="M4 15v-3a8 8 0 0 1 16 0v3"/>
  </svg>
);
const IconClipboard = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
    <rect x="9" y="3" width="6" height="4" rx="1"/>
  </svg>
);
const IconCamera = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);
const IconMapPin = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconMap = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
    <line x1="9" y1="3" x2="9" y2="18"/>
    <line x1="15" y1="6" x2="15" y2="21"/>
  </svg>
);
const IconExternalLink = ({ size = 12, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const IconUsers = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconCheckCircle = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IconAlertTriangle = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const IconAward = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"/>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
  </svg>
);
const IconBuilding = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="12"/>
    <path d="M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/>
  </svg>
);
const IconPlus = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);
const IconTrash = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);
const IconEdit = ({ size = 13, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IconSearch = ({ size = 15, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);
const IconClose = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);
const IconCheck = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconSave = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/>
    <polyline points="7 3 7 8 15 8"/>
  </svg>
);
const IconInfo = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);
const IconChevronDown = ({ size = 12, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconChevronUp = ({ size = 12, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
);
const IconUser = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconBriefcase = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
);
const IconCalendar = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconFlag = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
    <line x1="4" y1="22" x2="4" y2="15"/>
  </svg>
);
const IconFileText = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);
const IconStickyNote = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="13" y1="17" x2="8" y2="17"/>
  </svg>
);
const IconImage = ({ size = 28, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);
const IconZoomIn = ({ size = 22, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="11" y1="8" x2="11" y2="14"/>
    <line x1="8" y1="11" x2="14" y2="11"/>
  </svg>
);
const IconMailOpen = ({ size = 48, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/>
    <path d="M22 7l-10 7L2 7"/>
    <path d="M19 16l2 2 4-4"/>
  </svg>
);
const IconList = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/>
    <line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const IconGrid = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const IconUserCheck = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="8.5" cy="7" r="4"/>
    <polyline points="17 11 19 13 23 9"/>
  </svg>
);

// ── CONSTANTS ────────────────────────────────────────────────
const statusStyle = {
  "On Track":  { bg: "bg-emerald-50",  text: "text-emerald-600",  dot: "bg-emerald-500",  border: "border-emerald-200" },
  "Delayed":   { bg: "bg-red-50",      text: "text-red-600",      dot: "bg-red-500",      border: "border-red-200"     },
  "At Risk":   { bg: "bg-amber-50",    text: "text-amber-600",    dot: "bg-amber-500",    border: "border-amber-200"   },
  "Completed": { bg: "bg-blue-50",     text: "text-blue-600",     dot: "bg-blue-500",     border: "border-blue-200"    },
};

const progressColor = {
  "On Track":  "bg-emerald-500",
  "Delayed":   "bg-red-400",
  "At Risk":   "bg-amber-400",
  "Completed": "bg-blue-500",
};

// ── NEW PROJECT MODAL ────────────────────────────────────────
function NewProjectModal({ onClose, onAdd }) {
  const empty = { name: "", site: "", progress: "", status: "On Track", workers: "", budget: "" };
  const [form, setForm]         = useState(empty);
  const [errors, setErrors]     = useState({});
  const [submitting, setSubmitting] = useState(false);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())   e.name    = "Project name is required";
    if (!form.site.trim())   e.site    = "Site location is required";
    if (!form.budget.trim()) e.budget  = "Budget is required";
    if (!form.workers)       e.workers = "Number of workers is required";
    const p = Number(form.progress);
    if (form.progress === "" || isNaN(p) || p < 0 || p > 100)
      e.progress = "Enter a value between 0 and 100";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify({
          name:     form.name.trim(),
          site:     form.site.trim(),
          progress: Number(form.progress),
          status:   form.status,
          workers:  Number(form.workers),
          budget:   form.budget.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create project");
      onAdd(data);
      onClose();
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (name) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 outline-none transition-all ${
      errors[name]
        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
        : "border-slate-200 bg-white focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(5px)" }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-md shadow-orange-200">
              <IconConstruction size={20} color="#ffffff" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800">New Project</h2>
              <p className="text-xs text-slate-400">Fill in the details to create a project</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <IconClose size={14} color="#64748b" />
          </button>
        </div>

        <div className="px-7 py-6 space-y-4">
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 flex items-center gap-2">
              <IconAlertTriangle size={14} color="#ef4444" /> {errors.submit}
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Project Name</label>
            <input type="text" name="name" value={form.name} onChange={change}
              placeholder="e.g. City Hall Renovation" className={inputClass("name")} />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <IconAlertTriangle size={12} color="#ef4444" /> {errors.name}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Site Location</label>
            <input type="text" name="site" value={form.site} onChange={change}
              placeholder="e.g. Colombo 03" className={inputClass("site")} />
            {errors.site && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <IconAlertTriangle size={12} color="#ef4444" /> {errors.site}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Progress (%)</label>
              <input type="number" name="progress" value={form.progress} onChange={change}
                placeholder="0 – 100" className={inputClass("progress")} />
              {errors.progress && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <IconAlertTriangle size={12} color="#ef4444" /> {errors.progress}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">No. of Workers</label>
              <input type="number" name="workers" value={form.workers} onChange={change}
                placeholder="e.g. 25" className={inputClass("workers")} />
              {errors.workers && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <IconAlertTriangle size={12} color="#ef4444" /> {errors.workers}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Status</label>
              <select name="status" value={form.status} onChange={change}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 outline-none focus:ring-2 focus:ring-orange-300">
                <option value="On Track">On Track</option>
                <option value="Delayed">Delayed</option>
                <option value="At Risk">At Risk</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Budget</label>
              <input type="text" name="budget" value={form.budget} onChange={change}
                placeholder="e.g. Rs 1.5M" className={inputClass("budget")} />
              {errors.budget && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <IconAlertTriangle size={12} color="#ef4444" /> {errors.budget}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-7 py-5 bg-slate-50 border-t border-slate-100">
          <button onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-all">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={submitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-sm font-bold shadow-md shadow-orange-200 transition-all disabled:opacity-60">
            <IconCheck size={14} color="#ffffff" /> {submitting ? "Creating…" : "Create Project"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ADD DETAILS MODAL ────────────────────────────────────────
function AddDetailsModal({ project, onClose, onSave }) {
  const existing = project.details || {};
  const [form, setForm] = useState({
    manager:     existing.manager     || "",
    startDate:   existing.startDate   || "",
    endDate:     existing.endDate     || "",
    contractor:  existing.contractor  || "",
    description: existing.description || "",
    phase:       existing.phase       || "",
    notes:       existing.notes       || "",
  });
  const [saving, setSaving] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setSaving(true);
    await onSave(form);
    setSaving(false);
    onClose();
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(5px)" }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
              <IconClipboard size={20} color="#ffffff" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800">
                {project.details ? "Edit Details" : "Add Details"}
              </h2>
              <p className="text-xs text-slate-400 truncate max-w-[220px]">{project.name}</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <IconClose size={14} color="#64748b" />
          </button>
        </div>

        <div className="px-7 py-6 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Project Manager</label>
              <input type="text" name="manager" value={form.manager} onChange={change}
                placeholder="e.g. Kamal Perera" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Contractor</label>
              <input type="text" name="contractor" value={form.contractor} onChange={change}
                placeholder="e.g. ABC Construction" className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Start Date</label>
              <input type="date" name="startDate" value={form.startDate} onChange={change} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">End Date</label>
              <input type="date" name="endDate" value={form.endDate} onChange={change} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Current Phase</label>
            <input type="text" name="phase" value={form.phase} onChange={change}
              placeholder="e.g. Foundation, Structural, Finishing…" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Description</label>
            <textarea name="description" value={form.description} onChange={change} rows={2}
              placeholder="Brief project description…" className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Notes</label>
            <textarea name="notes" value={form.notes} onChange={change} rows={2}
              placeholder="Any additional notes or remarks…" className={`${inputClass} resize-none`} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-7 py-5 bg-slate-50 border-t border-slate-100 shrink-0">
          <button onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-all">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-bold shadow-md shadow-indigo-200 transition-all disabled:opacity-60">
            <IconSave size={14} color="#ffffff" /> {saving ? "Saving…" : "Save Details"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ADD INFORMATION MODAL ────────────────────────────────────
function AddInformationModal({ project, onClose, onSave }) {
  const existing = project.info || {};
  const [form, setForm] = useState({
    description: existing.description || "",
    location:    existing.location    || "",
    mapLink:     existing.mapLink     || "",
    images:      existing.images      || [],
  });
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const processFiles = (files) => {
    const allowed = Array.from(files).filter(f => f.type.startsWith("image/"));
    allowed.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm(prev => ({
          ...prev,
          images: [...prev.images, { name: file.name, dataUrl: ev.target.result }],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e) => processFiles(e.target.files);
  const handleDrop = (e) => { e.preventDefault(); setDragging(false); processFiles(e.dataTransfer.files); };
  const removeImage = (idx) => setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  const handleSave = () => { onSave(form); onClose(); };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(5px)" }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shadow-md shadow-violet-200">
              <IconCamera size={20} color="#ffffff" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800">
                {project.info ? "Edit Information" : "Add Information"}
              </h2>
              <p className="text-xs text-slate-400 truncate max-w-[230px]">{project.name}</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <IconClose size={14} color="#64748b" />
          </button>
        </div>

        <div className="px-7 py-6 space-y-5 overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Project Description</label>
            <textarea name="description" value={form.description} onChange={change} rows={3}
              placeholder="Describe the project scope, objectives, and key highlights…"
              className={`${inputClass} resize-none`} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <IconMapPin size={12} color="#64748b" /> Site Address / Location
            </label>
            <input type="text" name="location" value={form.location} onChange={change}
              placeholder="e.g. No. 45, Galle Road, Colombo 03" className={inputClass} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <IconMap size={12} color="#64748b" /> Google Maps Link
            </label>
            <input type="url" name="mapLink" value={form.mapLink} onChange={change}
              placeholder="https://maps.google.com/..." className={inputClass} />
            {form.mapLink && (
              <a href={form.mapLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-1.5 text-xs text-violet-600 hover:underline font-semibold">
                <IconExternalLink size={11} color="#7c3aed" /> Preview on Maps
              </a>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <IconCamera size={12} color="#64748b" /> Project Images
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full border-2 border-dashed rounded-2xl px-6 py-8 text-center cursor-pointer transition-all ${
                dragging ? "border-violet-400 bg-violet-50" : "border-slate-200 bg-slate-50 hover:border-violet-300 hover:bg-violet-50/40"
              }`}>
              <div className="flex justify-center mb-2 text-slate-300">
                <IconImage size={32} color="#cbd5e1" />
              </div>
              <p className="text-sm font-semibold text-slate-600">Drag & drop images here</p>
              <p className="text-xs text-slate-400 mt-1">or click to browse — JPG, PNG, WEBP supported</p>
              <input ref={fileInputRef} type="file" multiple accept="image/*"
                onChange={handleFileChange} className="hidden" />
            </div>

            {form.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {form.images.map((img, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-square bg-slate-100">
                    <img src={img.dataUrl} alt={img.name} className="w-full h-full object-cover" />
                    <button onClick={() => removeImage(idx)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                      <IconClose size={10} color="#ffffff" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-[10px] truncate">{img.name}</p>
                    </div>
                  </div>
                ))}
                <div onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 hover:border-violet-300 aspect-square cursor-pointer transition-all bg-slate-50 hover:bg-violet-50/40">
                  <IconPlus size={20} color="#94a3b8" />
                  <span className="text-xs text-slate-400 mt-1">Add more</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-7 py-5 bg-slate-50 border-t border-slate-100 shrink-0">
          <button onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-all">
            Cancel
          </button>
          <button onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 active:scale-95 text-white text-sm font-bold shadow-md shadow-violet-200 transition-all">
            <IconSave size={14} color="#ffffff" /> Save Information
          </button>
        </div>
      </div>
    </div>
  );
}

// ── MORE INFORMATION MODAL ───────────────────────────────────
function MoreInformationModal({ project, onClose, onEdit }) {
  const info = project.info;
  const [activeImg, setActiveImg] = useState(null);

  if (!info) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(5px)" }}>
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center">
          <div className="flex justify-center mb-4 text-slate-200">
            <IconMailOpen size={52} color="#cbd5e1" />
          </div>
          <h2 className="text-lg font-black text-slate-800 mb-2">No Information Yet</h2>
          <p className="text-slate-400 text-sm mb-6">Add images, location, and a description to see the summary here.</p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all border border-slate-200">
              Close
            </button>
            <button onClick={onEdit}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold shadow-md shadow-violet-200 transition-all">
              <IconPlus size={13} color="#ffffff" /> Add Information
            </button>
          </div>
        </div>
      </div>
    );
  }

  const s  = statusStyle[project.status]  || statusStyle["On Track"];
  const pc = progressColor[project.status] || "bg-slate-400";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(5px)" }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center shadow-md">
              <IconConstruction size={20} color="#ffffff" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800">{project.name}</h2>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <IconMapPin size={10} color="#94a3b8" /> {project.site?.name || project.site || "—"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onEdit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-600 text-xs font-bold border border-violet-200 transition-all">
              <IconEdit size={12} color="#7c3aed" /> Edit
            </button>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
              <IconClose size={14} color="#64748b" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto px-7 py-6 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Status</p>
              <span className={`inline-flex items-center text-xs px-2.5 py-1 rounded-lg font-semibold ${s.bg} ${s.text}`}>
                {project.status}
              </span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Progress</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${pc}`} style={{ width: `${project.progress}%` }} />
                </div>
                <span className="text-xs font-black text-slate-700">{project.progress}%</span>
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Budget</p>
              <p className="text-sm font-black text-slate-800">{project.budget}</p>
            </div>
          </div>

          {info.description && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <IconFileText size={12} color="#94a3b8" /> Description
              </p>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-2xl px-5 py-4 border border-slate-100">
                {info.description}
              </p>
            </div>
          )}

          {(info.location || info.mapLink) && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4">
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <IconMapPin size={12} color="#059669" /> Location
              </p>
              {info.location && <p className="text-sm font-semibold text-slate-800 mb-2">{info.location}</p>}
              {info.mapLink && (
                <a href={info.mapLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-200 transition-all">
                  <IconMap size={12} color="#ffffff" /> Open in Google Maps
                </a>
              )}
            </div>
          )}

          {info.images && info.images.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <IconCamera size={12} color="#94a3b8" /> Site Images ({info.images.length})
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {info.images.map((img, idx) => (
                  <div key={idx} onClick={() => setActiveImg(img)}
                    className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-video cursor-pointer group shadow-sm hover:shadow-md transition-all">
                    <img src={img.dataUrl} alt={img.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <IconZoomIn size={22} color="#ffffff" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 px-7 py-5 bg-slate-50 border-t border-slate-100 shrink-0">
          <button onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-all">
            Close
          </button>
        </div>
      </div>

      {activeImg && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setActiveImg(null)}>
          <div className="relative max-w-4xl max-h-full">
            <img src={activeImg.dataUrl} alt={activeImg.name}
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain" />
            <button onClick={() => setActiveImg(null)}
              className="absolute -top-3 -right-3 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-100 transition-all">
              <IconClose size={14} color="#334155" />
            </button>
            <p className="text-center text-white/60 text-xs mt-3">{activeImg.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── DELETE CONFIRM MODAL ─────────────────────────────────────
function DeleteConfirmModal({ project, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(5px)" }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="px-7 py-7 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-100">
            <IconTrash size={28} color="#ef4444" />
          </div>
          <h2 className="text-lg font-black text-slate-800 mb-2">Delete Project?</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Are you sure you want to delete <span className="font-bold text-slate-700">"{project.name}"</span>? This action cannot be undone.
          </p>
        </div>
        <div className="flex items-center gap-3 px-7 pb-7">
          <button onClick={onClose}
            className="flex-1 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all border border-slate-200">
            Cancel
          </button>
          <button onClick={onConfirm}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 active:scale-95 text-white text-sm font-bold shadow-md shadow-red-200 transition-all">
            <IconTrash size={13} color="#ffffff" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ASSIGN USERS MODAL ───────────────────────────────────────
function AssignUsersModal({ project, onClose, onSave }) {
  const [allUsers, setAllUsers] = useState([]);
  const [selected, setSelected] = useState(
    (project.assignedUsers || []).map(u => (typeof u === "string" ? u : u._id))
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API}/auth/users`, { headers: authHeader() })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setAllUsers(data); })
      .catch(err => console.error("Failed to load users:", err))
      .finally(() => setLoading(false));
  }, []);

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/projects/${project._id}/assign-users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify({ userIds: selected }),
      });
      const updated = await res.json();
      if (res.ok) { onSave(updated); onClose(); }
      else alert(`Error: ${updated.message || "Failed to assign users"}`);
    } catch (err) {
      console.error("Failed to assign users:", err);
      alert("Cannot connect to backend.");
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(5px)" }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
              <IconUserCheck size={20} color="#ffffff" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800">Assign Users</h2>
              <p className="text-xs text-slate-400 truncate max-w-[220px]">{project.name}</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <IconClose size={14} color="#64748b" />
          </button>
        </div>

        <div className="px-7 py-5 overflow-y-auto space-y-1">
          {loading ? (
            <p className="text-sm text-slate-400 text-center py-8">Loading users…</p>
          ) : allUsers.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">No users found.</p>
          ) : allUsers.map(u => (
            <label key={u._id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
              <input type="checkbox" checked={selected.includes(u._id)} onChange={() => toggle(u._id)}
                className="w-4 h-4 accent-blue-600" />
              <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-xs font-black text-blue-600 shrink-0">
                {(u.name || "?").charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-700 truncate">{u.name}</p>
                <p className="text-xs text-slate-400 truncate">{u.email}</p>
              </div>
              {u.role === "admin" && (
                <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-lg bg-amber-50 text-amber-600">Admin</span>
              )}
            </label>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 px-7 py-5 bg-slate-50 border-t border-slate-100 shrink-0">
          <button onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-all">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-bold shadow-md shadow-blue-200 transition-all disabled:opacity-60">
            <IconSave size={14} color="#ffffff" /> {saving ? "Saving…" : "Save Assignment"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── DETAILS PANEL (inline expand) ───────────────────────────
function DetailsPanel({ project, onAddDetails }) {
  const d = project.details;
  const s = statusStyle[project.status] || statusStyle["On Track"];

  if (!d) {
    return (
      <div className="px-6 py-5 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
        <span className="text-slate-400 text-sm">No additional details yet.</span>
        <button onClick={onAddDetails}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm shadow-indigo-200 transition-all active:scale-95">
          <IconPlus size={13} color="#ffffff" /> Add Details
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-5 bg-slate-50 border-t border-slate-100">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4 mb-4">
        {d.manager && (
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Manager</p>
            <p className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <IconUser size={13} color="#94a3b8" /> {d.manager}
            </p>
          </div>
        )}
        {d.contractor && (
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Contractor</p>
            <p className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <IconBriefcase size={13} color="#94a3b8" /> {d.contractor}
            </p>
          </div>
        )}
        {d.startDate && (
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Start Date</p>
            <p className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <IconCalendar size={13} color="#94a3b8" /> {d.startDate}
            </p>
          </div>
        )}
        {d.endDate && (
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">End Date</p>
            <p className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <IconFlag size={13} color="#94a3b8" /> {d.endDate}
            </p>
          </div>
        )}
        {d.phase && (
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Current Phase</p>
            <p className={`text-xs font-bold px-2.5 py-1 rounded-lg inline-block ${s.bg} ${s.text}`}>{d.phase}</p>
          </div>
        )}
      </div>

      {d.description && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <IconFileText size={11} color="#94a3b8" /> Description
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">{d.description}</p>
        </div>
      )}

      {d.notes && (
        <div className="mb-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <IconStickyNote size={11} color="#d97706" /> Notes
          </p>
          <p className="text-sm text-amber-800 leading-relaxed">{d.notes}</p>
        </div>
      )}

      <button onClick={onAddDetails}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-bold border border-indigo-200 transition-all active:scale-95">
        <IconEdit size={12} color="#4f46e5" /> Edit Details
      </button>
    </div>
  );
}

// ── PROJECT CARD (Grid View) ─────────────────────────────────
function ProjectCard({ project, onToggleDetails, isExpanded, onAddDetails, onDelete, onAddInfo, onMoreInfo, onAssignUsers }) {
  const s  = statusStyle[project.status]  || statusStyle["On Track"];
  const pc = progressColor[project.status] || "bg-slate-400";
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center shrink-0">
            <IconConstruction size={18} color="#ea580c" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-semibold ${s.bg} ${s.text}`}>
              {project.status}
            </span>
            <button onClick={onDelete}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 transition-all"
              title="Delete project">
              <IconTrash size={13} color="#f87171" />
            </button>
          </div>
        </div>
        <h3 className="font-bold text-slate-800 text-sm leading-tight mb-1">{project.name}</h3>
        <p className="text-xs text-slate-400 mb-4 flex items-center gap-1">
          <IconMapPin size={10} color="#94a3b8" /> {project.site?.name || project.site || "—"}
        </p>
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs text-slate-400">Progress</span>
          <span className="text-xs font-bold text-slate-700">{project.progress}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4">
          <div className={`h-1.5 rounded-full ${pc}`} style={{ width: `${project.progress}%` }} />
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3 mb-3">
          <span className="flex items-center gap-1">
            <IconUsers size={12} color="#94a3b8" /> {project.workers} workers
          </span>
          <span className="font-semibold text-slate-700">{project.budget}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <button onClick={onToggleDetails}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                isExpanded ? "bg-slate-800 text-white border-slate-800" : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
              }`}>
              {isExpanded
                ? <><IconChevronUp size={11} color="#ffffff" /> Hide Details</>
                : <><IconChevronDown size={11} color="#475569" /> More Details</>}
            </button>
            {!project.details && (
              <button onClick={onAddDetails}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 transition-all active:scale-95">
                <IconPlus size={12} color="#4f46e5" /> Add Details
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onMoreInfo}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-all active:scale-95">
              <IconInfo size={12} color="#64748b" /> More Info
            </button>
            <button onClick={onAddInfo}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-violet-50 hover:bg-violet-100 text-violet-600 border border-violet-200 transition-all active:scale-95">
              {project.info
                ? <><IconEdit size={12} color="#7c3aed" /> Edit Info</>
                : <><IconCamera size={12} color="#7c3aed" /> Add Info</>}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onAssignUsers}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 transition-all active:scale-95">
              <IconUserCheck size={12} color="#2563eb" /> Assign Users
            </button>
          </div>
        </div>
      </div>

      {isExpanded && <DetailsPanel project={project} onAddDetails={onAddDetails} />}
    </div>
  );
}

// ── PROJECT ROW (List View) ──────────────────────────────────
function ProjectRow({ project, onToggleDetails, isExpanded, onAddDetails, onDelete, onAddInfo, onMoreInfo, onAssignUsers }) {
  const s  = statusStyle[project.status]  || statusStyle["On Track"];
  const pc = progressColor[project.status] || "bg-slate-400";
  return (
    <>
      <tr className={`hover:bg-slate-50/60 transition-colors border-b ${isExpanded ? "border-slate-200" : "border-slate-100 last:border-0"}`}>
        <td className="px-6 py-4">
          <p className="font-semibold text-slate-800 text-sm">{project.name}</p>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
            <IconMapPin size={10} color="#94a3b8" /> {project.site?.name || project.site || "—"}
          </p>
        </td>
        <td className="px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="w-28 bg-slate-100 rounded-full h-1.5">
              <div className={`h-1.5 rounded-full ${pc}`} style={{ width: `${project.progress}%` }} />
            </div>
            <span className="text-xs font-bold text-slate-600">{project.progress}%</span>
          </div>
        </td>
        <td className="px-4 py-4">
          <span className={`inline-flex items-center text-xs px-3 py-1 rounded-lg font-semibold ${s.bg} ${s.text}`}>
            {project.status}
          </span>
        </td>
        <td className="px-4 py-4 text-slate-600 text-sm">{project.workers}</td>
        <td className="px-4 py-4 text-slate-600 text-sm">{project.budget}</td>
        <td className="px-4 py-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button onClick={onToggleDetails}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all active:scale-95 whitespace-nowrap ${
                isExpanded ? "bg-slate-800 text-white border-slate-800" : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
              }`}>
              {isExpanded
                ? <><IconChevronUp size={11} color="#ffffff" /> Hide</>
                : <><IconChevronDown size={11} color="#475569" /> Details</>}
            </button>
            <button onClick={onAddDetails}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 transition-all active:scale-95 whitespace-nowrap">
              {project.details
                ? <><IconEdit size={12} color="#4f46e5" /> Edit</>
                : <><IconPlus size={12} color="#4f46e5" /> Add</>}
            </button>
            <button onClick={onMoreInfo}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-all active:scale-95 whitespace-nowrap">
              <IconInfo size={12} color="#64748b" /> More Info
            </button>
            <button onClick={onAddInfo}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-violet-50 hover:bg-violet-100 text-violet-600 border border-violet-200 transition-all active:scale-95 whitespace-nowrap">
              {project.info
                ? <><IconEdit size={12} color="#7c3aed" /> Edit Info</>
                : <><IconCamera size={12} color="#7c3aed" /> Add Info</>}
            </button>
            <button onClick={onAssignUsers}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 transition-all active:scale-95 whitespace-nowrap">
              <IconUserCheck size={12} color="#2563eb" /> Assign
            </button>
            <button onClick={onDelete}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 hover:bg-red-100 text-red-500 border border-red-200 transition-all active:scale-95 whitespace-nowrap">
              <IconTrash size={12} color="#ef4444" /> Delete
            </button>
          </div>
        </td>
      </tr>

      {isExpanded && (
        <tr className="border-b border-slate-100">
          <td colSpan={6} className="p-0">
            <DetailsPanel project={project} onAddDetails={onAddDetails} />
          </td>
        </tr>
      )}
    </>
  );
}

// ── MAIN PROJECTS PAGE ───────────────────────────────────────
export default function Projects({ projects, setProjects }) {
  const [showModal,      setShowModal]      = useState(false);
  const [search,         setSearch]         = useState("");
  const [filter,         setFilter]         = useState("All");
  const [viewMode,       setViewMode]       = useState("list");
  const [expandedIndex,  setExpandedIndex]  = useState(null);
  const [detailsTarget,  setDetailsTarget]  = useState(null);
  const [infoTarget,     setInfoTarget]     = useState(null);
  const [moreInfoTarget, setMoreInfoTarget] = useState(null);
  const [deleteTarget,   setDeleteTarget]   = useState(null);
  const [assignTarget,   setAssignTarget]   = useState(null);

  const handleAdd = (project) => setProjects((prev) => [project, ...prev]);
  const handleToggleDetails = (realIndex) => setExpandedIndex((prev) => (prev === realIndex ? null : realIndex));
  const handleOpenAddDetails = (realIndex) => setDetailsTarget(realIndex);

  // Persists details to the backend (PUT /api/projects/:id/details), then updates local state
  const handleSaveDetails = async (detailsForm) => {
    const target = detailsTarget;
    const project = projects[target];
    try {
      const res = await fetch(`${API}/projects/${project._id}/details`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify(detailsForm),
      });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.message || "Failed to save details");
      setProjects((prev) => prev.map((p, i) => (i === target ? updated : p)));
      setExpandedIndex(target);
    } catch (err) {
      console.error("Failed to save details:", err);
      alert("Could not save details to the server.");
    }
  };

  const handleSaveInfo = (infoForm) => {
    setProjects((prev) => prev.map((p, i) => (i === infoTarget ? { ...p, info: infoForm } : p)));
  };
  const handleDelete = async () => {
    const target = deleteTarget;
    const project = projects[target];
    try {
      const res = await fetch(`${API}/projects/${project._id}`, {
        method: "DELETE",
        headers: authHeader(),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to delete project");
      }
      setProjects((prev) => prev.filter((_, i) => i !== target));
      if (expandedIndex === target) setExpandedIndex(null);
    } catch (err) {
      console.error("Failed to delete project:", err);
      alert("Could not delete project on the server.");
    } finally {
      setDeleteTarget(null);
    }
  };

  const filters = ["All", "On Track", "Delayed", "At Risk", "Completed"];

  const filteredWithIndex = projects
    .map((p, i) => ({ project: p, realIndex: i }))
    .filter(({ project: p }) => {
      const siteName = typeof p.site === "object" ? (p.site?.name || "") : (p.site || "");
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        siteName.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "All" || p.status === filter;
      return matchSearch && matchFilter;
    });

  const total     = projects.length;
  const onTrack   = projects.filter(p => p.status === "On Track").length;
  const atRisk    = projects.filter(p => p.status === "Delayed" || p.status === "At Risk").length;
  const completed = projects.filter(p => p.status === "Completed").length;

  const stats = [
    { label: "Total Projects",    value: total,     sub: `${total} total`,    subColor: "text-orange-500",  icon: <IconBuilding size={22} color="#ea580c" />,       bg: "bg-orange-50"  },
    { label: "On Track",          value: onTrack,   sub: `${total > 0 ? Math.round((onTrack/total)*100) : 0}% of projects`,   subColor: "text-emerald-500", icon: <IconCheckCircle size={22} color="#059669" />,    bg: "bg-emerald-50" },
    { label: "Delayed / At Risk", value: atRisk,    sub: atRisk > 0 ? "Needs attention" : "All good",        subColor: "text-red-500",     icon: <IconAlertTriangle size={22} color="#ef4444" />, bg: "bg-red-50"     },
    { label: "Completed",         value: completed, sub: `${total > 0 ? Math.round((completed/total)*100) : 0}% completion rate`, subColor: "text-blue-500", icon: <IconAward size={22} color="#3b82f6" />,         bg: "bg-blue-50"    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6 space-y-6">
      {/* Modals */}
      {showModal        && <NewProjectModal project={null} onClose={() => setShowModal(false)} onAdd={handleAdd} />}
      {detailsTarget !== null && <AddDetailsModal project={projects[detailsTarget]} onClose={() => setDetailsTarget(null)} onSave={handleSaveDetails} />}
      {infoTarget    !== null && <AddInformationModal project={projects[infoTarget]} onClose={() => setInfoTarget(null)} onSave={handleSaveInfo} />}
      {moreInfoTarget !== null && <MoreInformationModal project={projects[moreInfoTarget]} onClose={() => setMoreInfoTarget(null)} onEdit={() => { setMoreInfoTarget(null); setInfoTarget(moreInfoTarget); }} />}
      {deleteTarget  !== null && <DeleteConfirmModal project={projects[deleteTarget]} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} />}
      {assignTarget  !== null && (
        <AssignUsersModal
          project={projects[assignTarget]}
          onClose={() => setAssignTarget(null)}
          onSave={(updated) => setProjects(prev => prev.map((p, i) => i === assignTarget ? updated : p))}
        />
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Projects</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage and track all construction projects</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-orange-200 transition-all">
          <IconPlus size={15} color="#ffffff" /> New Project
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
            <div className={`w-12 h-12 ${s.bg} rounded-2xl flex items-center justify-center shrink-0 border border-slate-100`}>
              {s.icon}
            </div>
            <div className="min-w-0">
              <p className="text-slate-400 text-xs font-medium mb-0.5">{s.label}</p>
              <p className="text-3xl font-black text-slate-800 leading-none">{s.value}</p>
              <p className={`text-xs font-semibold mt-1 ${s.subColor}`}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filter + View Toggle */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[180px] border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50">
          <IconSearch size={15} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search projects by name or site..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm text-slate-700 outline-none placeholder-slate-400 bg-transparent"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                filter === f ? "bg-orange-600 text-white shadow-md shadow-orange-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 ml-auto">
          <button onClick={() => setViewMode("list")} title="List view"
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              viewMode === "list" ? "bg-orange-600 text-white shadow-sm" : "text-slate-500 hover:bg-slate-200"
            }`}>
            <IconList size={15} color={viewMode === "list" ? "#ffffff" : "#64748b"} />
          </button>
          <button onClick={() => setViewMode("grid")} title="Grid view"
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              viewMode === "grid" ? "bg-orange-600 text-white shadow-sm" : "text-slate-500 hover:bg-slate-200"
            }`}>
            <IconGrid size={15} color={viewMode === "grid" ? "#ffffff" : "#64748b"} />
          </button>
        </div>
      </div>

      {/* Projects Table / Grid */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-800">All Projects</h2>
          <span className="text-slate-400 text-sm">{filteredWithIndex.length} projects</span>
        </div>

        {filteredWithIndex.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <IconConstruction size={28} color="#94a3b8" />
            </div>
            <p className="text-slate-700 font-bold text-lg">No projects found</p>
            <p className="text-slate-400 text-sm mt-1">Try a different filter or add a new project.</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWithIndex.map(({ project, realIndex }) => (
              <ProjectCard key={realIndex} project={project} isExpanded={expandedIndex === realIndex}
                onToggleDetails={() => handleToggleDetails(realIndex)}
                onAddDetails={() => handleOpenAddDetails(realIndex)}
                onDelete={() => setDeleteTarget(realIndex)}
                onAddInfo={() => setInfoTarget(realIndex)}
                onMoreInfo={() => setMoreInfoTarget(realIndex)}
                onAssignUsers={() => setAssignTarget(realIndex)} />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Project</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Progress</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Workers</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Budget</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWithIndex.map(({ project, realIndex }) => (
                  <ProjectRow key={realIndex} project={project} isExpanded={expandedIndex === realIndex}
                    onToggleDetails={() => handleToggleDetails(realIndex)}
                    onAddDetails={() => handleOpenAddDetails(realIndex)}
                    onDelete={() => setDeleteTarget(realIndex)}
                    onAddInfo={() => setInfoTarget(realIndex)}
                    onMoreInfo={() => setMoreInfoTarget(realIndex)}
                    onAssignUsers={() => setAssignTarget(realIndex)} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}