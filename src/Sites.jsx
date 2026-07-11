import React, { useState, useMemo, useEffect } from "react";

// ── API HELPER ───────────────────────────────────────────────
const API = "http://localhost:5000/api/sites";
const token = () => localStorage.getItem("token");
const headers = () => ({ "Content-Type": "application/json", "Authorization": `Bearer ${token()}` });
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

// ── SVG ICON COMPONENTS ──────────────────────────────────────
const IconMapPin = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconClipboardCheck = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" /><path d="M9 12l2 2 4-4" />
  </svg>
);
const IconPlus = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const IconTrash = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);
const IconEdit = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const IconClose = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const IconChevronDown = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const IconChevronUp = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);
const IconSave = ({ size = 15, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
  </svg>
);
const IconSearch = ({ size = 15, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);
const IconWorkers = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconAlertTriangle = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const IconCheck = ({ size = 15, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconMap = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);
const IconHardHat = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
    <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" /><path d="M4 15v-3a8 8 0 0 1 16 0v3" />
  </svg>
);
const IconCalendar = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconPhone = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconActivity = ({ size = 22, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const IconDownload = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const IconBarChart = ({ size = 22, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);
const IconUserPlus = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
  </svg>
);
const IconBriefcase = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

// ── THEME ─────────────────────────────────────────────────────
const PRIMARY = "#ea580c"; // orange-600

const siteStatusStyle = {
  "Active":   { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  "Inactive": { bg: "bg-slate-100",  text: "text-slate-500",   border: "border-slate-200",   dot: "bg-slate-400"  },
  "On Hold":  { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",   dot: "bg-amber-500"  },
  "Closed":   { bg: "bg-rose-50",    text: "text-rose-600",    border: "border-rose-200",    dot: "bg-rose-500"   },
};
const inspectionResultStyle = {
  "Pass":        { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "Fail":        { bg: "bg-rose-50",    text: "text-rose-700",    border: "border-rose-200"    },
  "Conditional": { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200"   },
  "Pending":     { bg: "bg-sky-50",     text: "text-sky-700",     border: "border-sky-200"     },
};
const ROLES = ["Site Engineer","Safety Officer","Foreman","Electrician","Plumber","Mason","Carpenter","Supervisor","Labour"];
const CHART_COLORS = ["#10b981","#ef4444","#f59e0b","#3b82f6"];
const RESULT_COLORS = { Pass:"#10b981",Fail:"#ef4444",Conditional:"#f59e0b",Pending:"#3b82f6" };

// ── CSV HELPERS ──────────────────────────────────────────────
function escapeCSV(val) {
  if (val === null || val === undefined) return "";
  const s = String(val);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) return `"${s.replace(/"/g,'""')}"`;
  return s;
}
function downloadCSV(filename, rows) {
  const csv = rows.map(r => r.map(escapeCSV).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
export function exportSitesToCSV(sites) {
  const header = ["Site Name","Address","District","Area (sq ft)","Site Manager","Phone","Status","Map Link","Total Inspections","Workers Assigned"];
  const rows = sites.map(s => [s.name,s.address,s.district,s.area,s.siteManager,s.phone,s.status,s.mapLink,(s.inspections||[]).length,(s.workers||[]).map(w=>w.name).join("; ")]);
  downloadCSV("sites_export.csv",[header,...rows]);
}
export function exportInspectionsCSV(sites) {
  const header = ["Site Name","Date","Inspector","Type","Result","Score","Notes","Follow-Up"];
  const rows = [];
  sites.forEach(s => (s.inspections||[]).forEach(insp => rows.push([s.name,insp.date,insp.inspector,insp.type,insp.result,insp.score,insp.notes,insp.followUp])));
  if (!rows.length) { alert("No inspection records to export."); return; }
  downloadCSV("inspections_export.csv",[header,...rows]);
}
export function exportWorkersCSV(sites) {
  const header = ["Site Name","Worker Name","Role","Phone","NIC","Start Date","Status"];
  const rows = [];
  sites.forEach(s => (s.workers||[]).forEach(w => rows.push([s.name,w.name,w.role,w.phone,w.nic,w.startDate,w.status])));
  if (!rows.length) { alert("No worker records to export."); return; }
  downloadCSV("workers_export.csv",[header,...rows]);
}

// ── SITE MODAL ───────────────────────────────────────────────
function SiteModal({ site, onClose, onSave }) {
  const isEdit = Boolean(site);
  const empty = { name:"",address:"",district:"",siteManager:"",phone:"",area:"",status:"Active",mapLink:"" };
  const [form, setForm] = useState(isEdit ? {...site} : empty);
  const [errors, setErrors] = useState({});
  const change = e => { setForm({...form,[e.target.name]:e.target.value}); setErrors({...errors,[e.target.name]:""}); };
  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Site name is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.district.trim()) e.district = "District is required";
    return e;
  };
  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave(form); onClose();
  };
  const ic = name => `w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 outline-none transition-all ${errors[name]?"border-rose-400 bg-rose-50 focus:ring-2 focus:ring-rose-200":"border-slate-200 bg-white focus:ring-2 focus:ring-orange-200 focus:border-orange-400"}`;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:"rgba(15,23,42,0.55)",backdropFilter:"blur(6px)"}}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 border-2 border-orange-200 rounded-xl flex items-center justify-center shadow-sm">
              <IconMapPin size={20} color={PRIMARY} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800">{isEdit?"Edit Site":"New Site"}</h2>
              <p className="text-xs text-slate-400">{isEdit?"Update site information":"Register a new construction site"}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all"><IconClose size={16} color="#64748b" /></button>
        </div>
        <div className="px-7 py-6 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Site Name</label>
            <input type="text" name="name" value={form.name} onChange={change} placeholder="e.g. Colombo Harbor Expansion" className={ic("name")} />
            {errors.name && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><IconAlertTriangle size={11} color="#f43f5e" /> {errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Full Address</label>
            <input type="text" name="address" value={form.address} onChange={change} placeholder="e.g. No. 12, Harbour Rd, Colombo 01" className={ic("address")} />
            {errors.address && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><IconAlertTriangle size={11} color="#f43f5e" /> {errors.address}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">District</label>
              <input type="text" name="district" value={form.district} onChange={change} placeholder="e.g. Colombo" className={ic("district")} />
              {errors.district && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><IconAlertTriangle size={11} color="#f43f5e" /> {errors.district}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Site Area (sq ft)</label>
              <input type="text" name="area" value={form.area} onChange={change} placeholder="e.g. 12,500" className={ic("area")} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Site Manager</label>
              <input type="text" name="siteManager" value={form.siteManager} onChange={change} placeholder="e.g. Pradeep Silva" className={ic("siteManager")} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Contact Phone</label>
              <input type="text" name="phone" value={form.phone} onChange={change} placeholder="e.g. +94 77 123 4567" className={ic("phone")} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Status</label>
              <select name="status" value={form.status} onChange={change} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400">
                <option>Active</option><option>Inactive</option><option>On Hold</option><option>Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Google Maps Link</label>
              <input type="url" name="mapLink" value={form.mapLink} onChange={change} placeholder="https://maps.google.com/..." className={ic("mapLink")} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-7 py-5 bg-orange-50/40 border-t border-orange-100 shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-all">Cancel</button>
          <button onClick={handleSubmit} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-sm font-bold shadow-md shadow-orange-200 transition-all">
            {isEdit ? <><IconSave size={15} color="#fff" /> Update Site</> : <><IconCheck size={15} color="#fff" /> Add Site</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ASSIGN PROJECT MODAL ─────────────────────────────────────
function AssignProjectModal({ siteName, allProjects=[], currentProject=null, onClose, onSave }) {
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState(currentProject ? currentProject._id||currentProject.name : null);
  const filtered = allProjects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || (p.site||"").toLowerCase().includes(search.toLowerCase()));
  const handleConfirm = () => {
    if (!selected) { onSave(null); onClose(); return; }
    const proj = allProjects.find(p => (p._id||p.name)===selected);
    onSave(proj||null); onClose();
  };
  const statusStyle = {
    "On Track": {bg:"bg-emerald-50",text:"text-emerald-700",dot:"bg-emerald-500"},
    "Delayed":  {bg:"bg-rose-50",   text:"text-rose-700",   dot:"bg-rose-500"},
    "At Risk":  {bg:"bg-amber-50",  text:"text-amber-700",  dot:"bg-amber-500"},
    "Completed":{bg:"bg-sky-50",    text:"text-sky-700",    dot:"bg-sky-500"},
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:"rgba(15,23,42,0.55)",backdropFilter:"blur(6px)"}}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 border-2 border-blue-200 rounded-xl flex items-center justify-center shadow-sm">
              <IconBriefcase size={18} color="#2563eb" />
            </div>
            <div><h2 className="text-lg font-black text-slate-800">Assign Project</h2><p className="text-xs text-slate-400 truncate max-w-[220px]">{siteName}</p></div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all"><IconClose size={16} color="#64748b" /></button>
        </div>
        <div className="px-7 pt-5 pb-3 shrink-0">
          <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50">
            <IconSearch size={14} color="#94a3b8" />
            <input type="text" placeholder="Search projects…" value={search} onChange={e=>setSearch(e.target.value)} className="flex-1 text-sm text-slate-700 outline-none placeholder-slate-400 bg-transparent" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-7 pb-3 space-y-2">
          <button onClick={()=>setSelected(null)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${selected===null?"border-orange-400 bg-orange-50 ring-2 ring-orange-100":"border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}>
            <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0"><IconClose size={13} color="#94a3b8" /></div>
            <div><p className="text-sm font-semibold text-slate-600">No Project Assigned</p><p className="text-xs text-slate-400">Remove current assignment</p></div>
            {selected===null && <IconCheck size={15} color={PRIMARY} className="ml-auto" />}
          </button>
          {filtered.length===0 ? <div className="text-center py-8 text-slate-400 text-sm">No projects found</div>
          : filtered.map((p,idx) => {
            const key = p._id||p.name; const isSelected = selected===key;
            const ss = statusStyle[p.status]||statusStyle["On Track"];
            return (
              <button key={idx} onClick={()=>setSelected(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${isSelected?"border-orange-400 bg-orange-50 ring-2 ring-orange-100":"border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}>
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0"><IconBriefcase size={14} color="#475569" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{p.name}</p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    {p.site && <p className="text-xs text-slate-400 flex items-center gap-1"><IconMapPin size={10} color="#94a3b8"/>{p.site}</p>}
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md font-semibold ${ss.bg} ${ss.text}`}><span className={`w-1.5 h-1.5 rounded-full ${ss.dot}`}></span>{p.status}</span>
                    {p.progress!==undefined && <span className="text-xs text-slate-400">{p.progress}%</span>}
                  </div>
                </div>
                {isSelected && <IconCheck size={15} color={PRIMARY} />}
              </button>
            );
          })}
        </div>
        <div className="flex items-center justify-end gap-3 px-7 py-5 bg-orange-50/40 border-t border-orange-100 shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-all">Cancel</button>
          <button onClick={handleConfirm} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-sm font-bold shadow-md shadow-orange-200 transition-all">
            <IconCheck size={15} color="#fff" /> Assign Project
          </button>
        </div>
      </div>
    </div>
  );
}

// ── INSPECTION MODAL ─────────────────────────────────────────
function InspectionModal({ siteName, inspection, onClose, onSave }) {
  const isEdit = Boolean(inspection);
  const empty = { date:"",inspector:"",type:"Safety",result:"Pending",score:"",notes:"",followUp:"" };
  const [form, setForm] = useState(isEdit ? {...inspection} : empty);
  const [errors, setErrors] = useState({});
  const change = e => { setForm({...form,[e.target.name]:e.target.value}); setErrors({...errors,[e.target.name]:""}); };
  const validate = () => {
    const e = {};
    if (!form.date) e.date = "Date is required";
    if (!form.inspector.trim()) e.inspector = "Inspector name is required";
    return e;
  };
  const handleSubmit = () => { const e=validate(); if(Object.keys(e).length){setErrors(e);return;} onSave(form);onClose(); };
  const ic = name => `w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 outline-none transition-all ${errors[name]?"border-rose-400 bg-rose-50 focus:ring-2 focus:ring-rose-200":"border-slate-200 bg-white focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"}`;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:"rgba(15,23,42,0.55)",backdropFilter:"blur(6px)"}}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 border-2 border-emerald-200 rounded-xl flex items-center justify-center shadow-sm">
              <IconClipboardCheck size={20} color="#059669" />
            </div>
            <div><h2 className="text-lg font-black text-slate-800">{isEdit?"Edit Inspection":"Log Inspection"}</h2><p className="text-xs text-slate-400 truncate max-w-[220px]">{siteName}</p></div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all"><IconClose size={16} color="#64748b" /></button>
        </div>
        <div className="px-7 py-6 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Inspection Date</label>
              <input type="date" name="date" value={form.date} onChange={change} className={ic("date")} />
              {errors.date && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><IconAlertTriangle size={11} color="#f43f5e"/> {errors.date}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Inspector Name</label>
              <input type="text" name="inspector" value={form.inspector} onChange={change} placeholder="e.g. Eng. Nimal Perera" className={ic("inspector")} />
              {errors.inspector && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><IconAlertTriangle size={11} color="#f43f5e"/> {errors.inspector}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Inspection Type</label>
              <select name="type" value={form.type} onChange={change} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-200">
                <option>Safety</option><option>Quality</option><option>Environmental</option><option>Structural</option><option>Electrical</option><option>General</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Result</label>
              <select name="result" value={form.result} onChange={change} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-200">
                <option>Pending</option><option>Pass</option><option>Conditional</option><option>Fail</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Score (0–100)</label>
            <input type="number" name="score" value={form.score} onChange={change} placeholder="e.g. 87" className={ic("score")} min="0" max="100" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Inspection Notes</label>
            <textarea name="notes" value={form.notes} onChange={change} rows={3} placeholder="Key findings, observations, issues identified…" className={`${ic("notes")} resize-none`} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Follow-up Actions Required</label>
            <textarea name="followUp" value={form.followUp} onChange={change} rows={2} placeholder="Actions to be taken before next inspection…" className={`${ic("followUp")} resize-none`} />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-7 py-5 bg-emerald-50/40 border-t border-emerald-100 shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-all">Cancel</button>
          <button onClick={handleSubmit} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-bold shadow-md shadow-emerald-200 transition-all">
            <IconSave size={15} color="#fff" /> {isEdit?"Update":"Save"} Inspection
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ASSIGN WORKER MODAL ───────────────────────────────────────
function AssignWorkerModal({ siteName, allWorkers, alreadyAssigned=[], onClose, onSave }) {
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState(new Set(alreadyAssigned));
  const toggle = id => { const n=new Set(selected); n.has(id)?n.delete(id):n.add(id); setSelected(n); };
  const filtered = allWorkers.filter(w => (w.name||"").toLowerCase().includes(search.toLowerCase()) || (w.role||"").toLowerCase().includes(search.toLowerCase()));
  const handleSave = () => { onSave(allWorkers.filter(w=>selected.has(w._id))); onClose(); };
  const statusDot = s => { if((s||"").toLowerCase()==="active") return "bg-emerald-400"; if((s||"").toLowerCase()==="on leave") return "bg-amber-400"; return "bg-slate-400"; };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:"rgba(15,23,42,0.55)",backdropFilter:"blur(6px)"}}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-50 border-2 border-violet-200 rounded-xl flex items-center justify-center shadow-sm">
              <IconWorkers size={20} color="#7c3aed" />
            </div>
            <div><h2 className="text-lg font-black text-slate-800">Assign Workers</h2><p className="text-xs text-slate-400 truncate max-w-[220px]">{siteName}</p></div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all"><IconClose size={16} color="#64748b" /></button>
        </div>
        <div className="px-5 pt-4 pb-3 border-b border-slate-100 shrink-0 space-y-3">
          <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50">
            <IconSearch size={15} color="#94a3b8" />
            <input type="text" placeholder="Search workers by name or role..." value={search} onChange={e=>setSearch(e.target.value)} className="flex-1 text-sm text-slate-700 outline-none bg-transparent placeholder-slate-400" />
          </div>
          <div className="flex items-center justify-between px-1">
            <p className="text-xs text-slate-400"><span className="font-bold text-violet-600">{selected.size}</span> worker{selected.size!==1?"s":""} selected{allWorkers.length===0&&<span className="ml-2 text-amber-500 font-semibold">— No workers in database yet</span>}</p>
            <div className="flex items-center gap-2">
              <button onClick={()=>setSelected(new Set(filtered.map(w=>w._id)))} className="text-xs text-violet-600 font-semibold hover:underline">Select all</button>
              <span className="text-slate-300">|</span>
              <button onClick={()=>setSelected(new Set())} className="text-xs text-slate-400 font-semibold hover:underline">Clear</button>
            </div>
          </div>
        </div>
        <div className="overflow-y-auto flex-1 px-5 py-3 space-y-1.5">
          {allWorkers.length===0 ? (
            <div className="text-center py-12"><div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3"><IconWorkers size={26} color="#94a3b8"/></div><p className="text-sm font-semibold text-slate-500">No workers available</p><p className="text-xs text-slate-400 mt-1">Add workers in the Workers page first.</p></div>
          ) : filtered.length===0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">No workers match your search.</div>
          ) : filtered.map(w => {
            const isSel = selected.has(w._id);
            return (
              <button key={w._id} onClick={()=>toggle(w._id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all text-left active:scale-[0.99] ${isSel?"bg-violet-50 border-violet-200 shadow-sm":"bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50"}`}>
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${isSel?"bg-violet-600 border-violet-600":"border-slate-300"}`}>{isSel&&<IconCheck size={11} color="#fff"/>}</div>
                <div className="w-9 h-9 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center shrink-0"><span className="text-xs font-black text-slate-600">{w.name?.[0]?.toUpperCase()||"?"}</span></div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${isSel?"text-violet-800":"text-slate-800"}`}>{w.name}</p>
                  <p className="text-xs text-slate-400 truncate">{w.role} · Rs {Number(w.salary||0).toLocaleString()}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-semibold border shrink-0 bg-white border-slate-200 text-slate-600">
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDot(w.status)}`}></span>{w.status}
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center justify-between px-7 py-5 bg-violet-50/40 border-t border-violet-100 shrink-0">
          <p className="text-xs text-slate-400">{filtered.length} worker{filtered.length!==1?"s":""} shown</p>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-all">Cancel</button>
            <button onClick={handleSave} disabled={allWorkers.length===0}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 active:scale-95 text-white text-sm font-bold shadow-md shadow-violet-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              <IconCheck size={14} color="#fff"/> Assign {selected.size>0?`${selected.size} `:""}Worker{selected.size!==1?"s":""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── DELETE CONFIRM MODAL ─────────────────────────────────────
function DeleteConfirmModal({ label, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:"rgba(15,23,42,0.55)",backdropFilter:"blur(6px)"}}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="px-7 py-7 text-center">
          <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-rose-100"><IconTrash size={26} color="#f43f5e" /></div>
          <h2 className="text-lg font-black text-slate-800 mb-2">Delete?</h2>
          <p className="text-slate-500 text-sm leading-relaxed">Are you sure you want to delete <span className="font-bold text-slate-700">"{label}"</span>? This cannot be undone.</p>
        </div>
        <div className="flex items-center gap-3 px-7 pb-7">
          <button onClick={onClose} className="flex-1 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all border border-slate-200">Cancel</button>
          <button onClick={onConfirm} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-sm font-bold shadow-md shadow-rose-200 transition-all">
            <IconTrash size={14} color="#fff" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── PERFORMANCE DASHBOARD ────────────────────────────────────
function PerformanceDashboard({ sites, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");
  const statusData = useMemo(()=>{const c={};sites.forEach(s=>{c[s.status]=(c[s.status]||0)+1;});return Object.entries(c).map(([name,value])=>({name,value}));}, [sites]);
  const resultData = useMemo(()=>{const c={Pass:0,Fail:0,Conditional:0,Pending:0};sites.forEach(s=>(s.inspections||[]).forEach(i=>{if(c[i.result]!==undefined)c[i.result]++;}));return Object.entries(c).map(([name,value])=>({name,value}));}, [sites]);
  const inspectionsByType = useMemo(()=>{const c={};sites.forEach(s=>(s.inspections||[]).forEach(i=>{c[i.type]=(c[i.type]||0)+1;}));return Object.entries(c).map(([name,count])=>({name,count}));}, [sites]);
  const topSitesByInspections = useMemo(()=>[...sites].sort((a,b)=>(b.inspections?.length||0)-(a.inspections?.length||0)).slice(0,6).map(s=>({name:s.name.length>18?s.name.slice(0,18)+"…":s.name,inspections:s.inspections?.length||0,workers:s.workers?.length||0})), [sites]);
  const avgScorePerSite = useMemo(()=>sites.filter(s=>s.inspections?.some(i=>i.score)).map(s=>{const sc=s.inspections.filter(i=>i.score);const avg=sc.reduce((sum,i)=>sum+Number(i.score),0)/sc.length;return{name:s.name.length>16?s.name.slice(0,16)+"…":s.name,avg:Math.round(avg)};}), [sites]);
  const workersByRole = useMemo(()=>{const c={};sites.forEach(s=>(s.workers||[]).forEach(w=>{if(w.status==="Active")c[w.role]=(c[w.role]||0)+1;}));return Object.entries(c).map(([role,count])=>({role,count})).sort((a,b)=>b.count-a.count);}, [sites]);
  const totalWorkers = sites.reduce((s,site)=>s+(site.workers?.filter(w=>w.status==="Active").length||0),0);
  const totalInspections = sites.reduce((s,site)=>s+(site.inspections?.length||0),0);
  const passRate = useMemo(()=>{let p=0,t=0;sites.forEach(s=>(s.inspections||[]).forEach(i=>{t++;if(i.result==="Pass")p++;}));return t>0?Math.round((p/t)*100):0;}, [sites]);
  const failCount = useMemo(()=>sites.reduce((sum,s)=>sum+(s.inspections||[]).filter(i=>i.result==="Fail").length,0), [sites]);
  const CT = ({active,payload,label})=>{
    if(!active||!payload?.length) return null;
    return <div className="bg-slate-800 text-white text-xs px-3 py-2 rounded-xl shadow-lg"><p className="font-bold mb-1">{label}</p>{payload.map((p,i)=><p key={i} style={{color:p.color||"#fff"}}>{p.name}: <b>{p.value}</b></p>)}</div>;
  };
  const tabs=[{id:"overview",label:"Overview"},{id:"inspections",label:"Inspections"},{id:"workers",label:"Workers"},{id:"scores",label:"Scores"}];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:"rgba(15,23,42,0.6)",backdropFilter:"blur(6px)"}}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 border-2 border-orange-200 rounded-xl flex items-center justify-center">
              <IconBarChart size={20} color={PRIMARY} />
            </div>
            <div><h2 className="text-lg font-black text-slate-800">Performance Dashboard</h2><p className="text-xs text-slate-400">{sites.length} sites · {totalInspections} inspections · {totalWorkers} active workers</p></div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all"><IconClose size={16} color="#64748b"/></button>
        </div>
        <div className="flex items-center gap-1 px-8 pt-4 border-b border-slate-100 shrink-0">
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setActiveTab(t.id)}
              className={`px-5 py-2.5 text-sm font-bold rounded-t-xl transition-all border-b-2 ${activeTab===t.id?"border-orange-500 text-orange-600 bg-orange-50":"border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}>{t.label}</button>
          ))}
        </div>
        <div className="overflow-y-auto flex-1 px-8 py-6">
          {activeTab==="overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                {[{label:"Total Sites",value:sites.length,color:"text-slate-700",bg:"bg-slate-50 border-slate-200"},{label:"Active Sites",value:sites.filter(s=>s.status==="Active").length,color:"text-emerald-600",bg:"bg-emerald-50 border-emerald-100"},{label:"Pass Rate",value:`${passRate}%`,color:"text-orange-600",bg:"bg-orange-50 border-orange-100"},{label:"Failed Insp.",value:failCount,color:"text-rose-600",bg:"bg-rose-50 border-rose-100"}].map(k=>(
                  <div key={k.label} className={`rounded-2xl border p-4 ${k.bg}`}><p className="text-xs font-semibold text-slate-500 mb-1">{k.label}</p><p className={`text-3xl font-black ${k.color}`}>{k.value}</p></div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                  <p className="text-sm font-bold text-slate-700 mb-4">Sites by Status</p>
                  <div style={{width:"100%",height:200}}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value" label={({name,value})=>`${name} (${value})`} labelLine={false}>{statusData.map((_,i)=><Cell key={i} fill={["#10b981","#94a3b8","#f59e0b","#ef4444"][i%4]}/>)}</Pie><Tooltip content={<CT/>}/></PieChart></ResponsiveContainer></div>
                </div>
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                  <p className="text-sm font-bold text-slate-700 mb-4">Inspections + Workers per Site</p>
                  <div style={{width:"100%",height:200}}><ResponsiveContainer width="100%" height="100%"><BarChart data={topSitesByInspections} barCategoryGap="30%" barGap={2}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false}/><XAxis dataKey="name" tick={{fontSize:10,fill:"#94a3b8"}}/><YAxis tick={{fontSize:10,fill:"#94a3b8"}}/><Tooltip content={<CT/>}/><Legend wrapperStyle={{fontSize:11}}/><Bar dataKey="inspections" fill="#10b981" radius={[4,4,0,0]} name="Inspections"/><Bar dataKey="workers" fill="#ea580c" radius={[4,4,0,0]} name="Workers"/></BarChart></ResponsiveContainer></div>
                </div>
              </div>
            </div>
          )}
          {activeTab==="inspections" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                  <p className="text-sm font-bold text-slate-700 mb-4">Results Distribution</p>
                  <div style={{width:"100%",height:220}}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={resultData} cx="50%" cy="50%" outerRadius={85} dataKey="value" label={({name,value})=>value>0?`${name}: ${value}`:""} >{resultData.map(e=><Cell key={e.name} fill={RESULT_COLORS[e.name]||"#94a3b8"}/>)}</Pie><Tooltip content={<CT/>}/></PieChart></ResponsiveContainer></div>
                </div>
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                  <p className="text-sm font-bold text-slate-700 mb-4">Inspections by Type</p>
                  <div style={{width:"100%",height:220}}><ResponsiveContainer width="100%" height="100%"><BarChart data={inspectionsByType} layout="vertical" barCategoryGap="25%"><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false}/><XAxis type="number" tick={{fontSize:10,fill:"#94a3b8"}}/><YAxis dataKey="name" type="category" tick={{fontSize:10,fill:"#64748b"}} width={80}/><Tooltip content={<CT/>}/><Bar dataKey="count" fill="#ea580c" radius={[0,4,4,0]} name="Count"/></BarChart></ResponsiveContainer></div>
                </div>
              </div>
              {avgScorePerSite.length>0 && (
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                  <p className="text-sm font-bold text-slate-700 mb-4">Average Inspection Score by Site</p>
                  <div style={{width:"100%",height:220}}><ResponsiveContainer width="100%" height="100%"><BarChart data={avgScorePerSite} barCategoryGap="30%"><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false}/><XAxis dataKey="name" tick={{fontSize:10,fill:"#94a3b8"}}/><YAxis domain={[0,100]} tick={{fontSize:10,fill:"#94a3b8"}}/><Tooltip content={<CT/>}/><Bar dataKey="avg" name="Avg Score" radius={[6,6,0,0]}>{avgScorePerSite.map(e=><Cell key={e.name} fill={e.avg>=75?"#10b981":e.avg>=50?"#f59e0b":"#ef4444"}/>)}</Bar></BarChart></ResponsiveContainer></div>
                </div>
              )}
            </div>
          )}
          {activeTab==="workers" && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {[{label:"Total Active Workers",value:totalWorkers,color:"text-violet-600",bg:"bg-violet-50 border-violet-100"},{label:"On Leave",value:sites.reduce((s,site)=>s+(site.workers?.filter(w=>w.status==="On Leave").length||0),0),color:"text-amber-600",bg:"bg-amber-50 border-amber-100"},{label:"Removed",value:sites.reduce((s,site)=>s+(site.workers?.filter(w=>w.status==="Removed").length||0),0),color:"text-slate-600",bg:"bg-slate-50 border-slate-200"}].map(k=>(
                  <div key={k.label} className={`rounded-2xl border p-4 ${k.bg}`}><p className="text-xs font-semibold text-slate-500 mb-1">{k.label}</p><p className={`text-3xl font-black ${k.color}`}>{k.value}</p></div>
                ))}
              </div>
              {workersByRole.length>0 ? (
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                    <p className="text-sm font-bold text-slate-700 mb-4">Active Workers by Role</p>
                    <div style={{width:"100%",height:240}}><ResponsiveContainer width="100%" height="100%"><BarChart data={workersByRole} layout="vertical" barCategoryGap="20%"><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false}/><XAxis type="number" tick={{fontSize:10,fill:"#94a3b8"}}/><YAxis dataKey="role" type="category" tick={{fontSize:10,fill:"#64748b"}} width={90}/><Tooltip content={<CT/>}/><Bar dataKey="count" fill="#7c3aed" radius={[0,4,4,0]} name="Workers"/></BarChart></ResponsiveContainer></div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                    <p className="text-sm font-bold text-slate-700 mb-4">Role Share</p>
                    <div style={{width:"100%",height:240}}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={workersByRole.map(w=>({name:w.role,value:w.count}))} cx="50%" cy="50%" outerRadius={90} dataKey="value">{workersByRole.map((_,i)=><Cell key={i} fill={["#7c3aed","#10b981","#f59e0b","#0ea5e9","#f43f5e","#ea580c","#ec4899","#64748b","#ef4444"][i%9]}/>)}</Pie><Tooltip content={<CT/>}/><Legend wrapperStyle={{fontSize:10}}/></PieChart></ResponsiveContainer></div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200"><IconWorkers size={32} color="#cbd5e1"/><p className="mt-3 font-semibold text-slate-500">No workers assigned yet</p><p className="text-xs mt-1">Assign workers to sites to see workforce analytics.</p></div>
              )}
            </div>
          )}
          {activeTab==="scores" && (
            <div className="space-y-6">
              {avgScorePerSite.length>0 ? (
                <>
                  <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                    <p className="text-sm font-bold text-slate-700 mb-1">Score Performance by Site</p>
                    <p className="text-xs text-slate-400 mb-4">Green ≥ 75 · Amber 50–74 · Red &lt; 50</p>
                    <div style={{width:"100%",height:260}}><ResponsiveContainer width="100%" height="100%"><BarChart data={avgScorePerSite} barCategoryGap="30%"><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false}/><XAxis dataKey="name" tick={{fontSize:10,fill:"#94a3b8"}}/><YAxis domain={[0,100]} tick={{fontSize:10,fill:"#94a3b8"}}/><Tooltip content={<CT/>}/><Bar dataKey="avg" name="Avg Score" radius={[6,6,0,0]}>{avgScorePerSite.map(e=><Cell key={e.name} fill={e.avg>=75?"#10b981":e.avg>=50?"#f59e0b":"#ef4444"}/>)}</Bar></BarChart></ResponsiveContainer></div>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead><tr className="bg-slate-50 border-b border-slate-100"><th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Site</th><th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Score</th><th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Rating</th></tr></thead>
                      <tbody>{avgScorePerSite.sort((a,b)=>b.avg-a.avg).map(row=>(
                        <tr key={row.name} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                          <td className="px-5 py-3 font-medium text-slate-700">{row.name}</td>
                          <td className="px-5 py-3 font-black text-slate-800">{row.avg}<span className="text-slate-400 font-normal text-xs">/100</span></td>
                          <td className="px-5 py-3"><span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${row.avg>=75?"bg-emerald-50 text-emerald-700":row.avg>=50?"bg-amber-50 text-amber-700":"bg-rose-50 text-rose-700"}`}>{row.avg>=75?"Good":row.avg>=50?"Average":"Poor"}</span></td>
                        </tr>
                      ))}</tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="text-center py-16 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200"><IconBarChart size={32} color="#cbd5e1"/><p className="mt-3 font-semibold text-slate-500">No scored inspections yet</p><p className="text-xs mt-1">Add inspection scores to track site performance.</p></div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── WORKERS PANEL ────────────────────────────────────────────
function WorkersPanel({ site, siteIndex, onAddWorker, onEditWorker, onDeleteWorker }) {
  const workers = site.workers || [];
  const ws = { "Active":{bg:"bg-emerald-50",text:"text-emerald-700",dot:"bg-emerald-500"}, "On Leave":{bg:"bg-amber-50",text:"text-amber-700",dot:"bg-amber-500"}, "Removed":{bg:"bg-slate-100",text:"text-slate-500",dot:"bg-slate-400"} };
  return (
    <div className="bg-violet-50/30 border-t border-violet-100 px-6 py-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <IconWorkers size={16} color="#7c3aed"/>
          <span className="text-sm font-bold text-slate-700">Assigned Workers</span>
          <span className="text-xs bg-violet-100 text-violet-700 font-bold px-2 py-0.5 rounded-full">{workers.length}</span>
        </div>
        <button onClick={()=>onAddWorker(siteIndex)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-sm shadow-violet-200 transition-all active:scale-95">
          <IconUserPlus size={13} color="#fff"/> Assign Worker
        </button>
      </div>
      {workers.length===0 ? (
        <div className="text-center py-8 bg-white rounded-2xl border border-violet-100 border-dashed">
          <div className="w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center mx-auto mb-3 border-2 border-violet-100"><IconWorkers size={22} color="#c4b5fd"/></div>
          <p className="text-sm font-semibold text-slate-500">No workers assigned</p>
          <p className="text-xs text-slate-400 mt-0.5">Click "Assign Worker" to add the first worker</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-violet-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-100 bg-slate-50/60">
              {["Name","Role","Phone","NIC","Start Date","Status","Actions"].map(h=><th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>)}
            </tr></thead>
            <tbody>
              {workers.map((w,idx)=>{
                const st = ws[w.status]||ws["Active"];
                return (
                  <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-7 h-7 bg-violet-100 rounded-full flex items-center justify-center text-xs font-black text-violet-600">{w.name.charAt(0).toUpperCase()}</div><span className="text-xs font-semibold text-slate-700">{w.name}</span></div></td>
                    <td className="px-4 py-3"><span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1 w-fit"><IconBriefcase size={10} color="#64748b"/> {w.role}</span></td>
                    <td className="px-4 py-3 text-xs text-slate-500">{w.phone||<span className="text-slate-300">—</span>}</td>
                    <td className="px-4 py-3 text-xs text-slate-500 font-mono">{w.nic||<span className="text-slate-300">—</span>}</td>
                    <td className="px-4 py-3"><span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"><IconCalendar size={11} color="#94a3b8"/> {w.startDate||<span className="text-slate-300">—</span>}</span></td>
                    <td className="px-4 py-3"><span className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 w-fit ${st.bg} ${st.text}`}><span className={`w-1.5 h-1.5 rounded-full ${st.dot}`}></span>{w.status}</span></td>
                    <td className="px-4 py-3"><div className="flex items-center gap-1.5">
                      <button onClick={()=>onEditWorker(siteIndex,idx)} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-sky-50 hover:bg-sky-100 text-sky-600 border border-sky-200 transition-all"><IconEdit size={11} color="#0284c7"/> Edit</button>
                      <button onClick={()=>onDeleteWorker(siteIndex,idx)} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-500 border border-rose-200 transition-all"><IconTrash size={11} color="#f43f5e"/></button>
                    </div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── INSPECTIONS PANEL ─────────────────────────────────────────
function InspectionsPanel({ site, siteIndex, onAddInspection, onEditInspection, onDeleteInspection }) {
  const inspections = site.inspections || [];
  return (
    <div className="bg-emerald-50/30 border-t border-emerald-100 px-6 py-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <IconClipboardCheck size={16} color="#059669"/>
          <span className="text-sm font-bold text-slate-700">Inspection Records</span>
          <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">{inspections.length}</span>
        </div>
        <button onClick={()=>onAddInspection(siteIndex)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-200 transition-all active:scale-95">
          <IconPlus size={13} color="#fff"/> Log Inspection
        </button>
      </div>
      {inspections.length===0 ? (
        <div className="text-center py-8 bg-white rounded-2xl border border-emerald-100 border-dashed">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-3 border-2 border-emerald-100"><IconClipboardCheck size={22} color="#6ee7b7"/></div>
          <p className="text-sm font-semibold text-slate-500">No inspections logged yet</p>
          <p className="text-xs text-slate-400 mt-0.5">Click "Log Inspection" to add the first record</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-emerald-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-100 bg-slate-50/60">
              {["Date","Inspector","Type","Result","Score","Notes","Actions"].map(h=><th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>)}
            </tr></thead>
            <tbody>
              {inspections.map((insp,idx)=>{
                const rs = inspectionResultStyle[insp.result]||inspectionResultStyle["Pending"];
                return (
                  <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3"><span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"><IconCalendar size={12} color="#94a3b8"/> {insp.date}</span></td>
                    <td className="px-4 py-3 text-xs text-slate-700 font-medium">{insp.inspector}</td>
                    <td className="px-4 py-3"><span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-lg">{insp.type}</span></td>
                    <td className="px-4 py-3"><span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${rs.bg} ${rs.text} ${rs.border}`}>{insp.result}</span></td>
                    <td className="px-4 py-3">{insp.score?<span className="text-xs font-black text-slate-700">{insp.score}<span className="text-slate-400 font-normal">/100</span></span>:<span className="text-slate-300 text-xs">—</span>}</td>
                    <td className="px-4 py-3 max-w-[200px]"><p className="text-xs text-slate-500 truncate">{insp.notes||<span className="text-slate-300">—</span>}</p>{insp.followUp&&<p className="text-xs text-amber-600 font-semibold truncate mt-0.5">↩ {insp.followUp}</p>}</td>
                    <td className="px-4 py-3"><div className="flex items-center gap-1.5">
                      <button onClick={()=>onEditInspection(siteIndex,idx)} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-sky-50 hover:bg-sky-100 text-sky-600 border border-sky-200 transition-all"><IconEdit size={11} color="#0284c7"/> Edit</button>
                      <button onClick={()=>onDeleteInspection(siteIndex,idx)} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-500 border border-rose-200 transition-all"><IconTrash size={11} color="#f43f5e"/></button>
                    </div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ── MAIN SITES PAGE ──────────────────────────────────────────
// ════════════════════════════════════════════════════════════
export default function Sites({ sites=[], setSites, allWorkers=[], allProjects=[] }) {
  const [loading,       setLoading]       = useState(true);
  const [search,        setSearch]        = useState("");
  const [filterStatus,  setFilterStatus]  = useState("All");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [expandedPanel, setExpandedPanel] = useState(null);
  const [siteModal,     setSiteModal]     = useState(null);
  const [siteEditIndex, setSiteEditIndex] = useState(null);
  const [inspModal,     setInspModal]     = useState(null);
  const [workerModal,   setWorkerModal]   = useState(null);
  const [projectModal,  setProjectModal]  = useState(null);
  const [deleteModal,   setDeleteModal]   = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [exportOpen,    setExportOpen]    = useState(false);

  // ── YADUATED EFFECT TO MAP ASSIGNED PROJECTS ON COMPONENT LOAD ──
  useEffect(()=>{
    const fetch_ = async () => {
      setLoading(true);
      try { 
        const r=await fetch(API,{headers:headers()}); 
        const d=await r.json(); 
        if(Array.isArray(d)) {
          // Restore full structure dynamically from local allProjects based on ID alignment
          const parsedSites = d.map(site => {
            const projRef = site.assignedProject || site.project;
            const projId = projRef ? (typeof projRef === "object" ? projRef._id || projRef.name : projRef) : null;
            const match = projId ? allProjects.find(p => (p._id || p.name) === projId) : null;
            return {
              ...site,
              assignedProject: match || site.assignedProject || null
            };
          });
          setSites(parsedSites); 
        } 
      } catch(e){ console.error(e); }
      setLoading(false);
    };
    fetch_();
  },[allProjects]); // Dependency added to sync flawlessly with database payload

  const handleAddSite = async form => { try { const r=await fetch(API,{method:"POST",headers:headers(),body:JSON.stringify(form)}); const d=await r.json(); if(r.ok)setSites(p=>[d,...p]); else alert(d.message||"Failed"); } catch{ alert("Cannot connect"); } };
  const handleEditSite = async form => { const s=sites[siteEditIndex]; try { const r=await fetch(`${API}/${s._id}`,{method:"PUT",headers:headers(),body:JSON.stringify(form)}); const d=await r.json(); if(r.ok)setSites(p=>p.map((x,i)=>i===siteEditIndex?d:x)); else alert(d.message||"Failed"); } catch{ alert("Cannot connect"); } };
  const handleDeleteSite = async () => { const s=sites[deleteModal.siteIndex]; try { await fetch(`${API}/${s._id}`,{method:"DELETE",headers:headers()}); setSites(p=>p.filter((_,i)=>i!==deleteModal.siteIndex)); if(expandedIndex===deleteModal.siteIndex)setExpandedIndex(null); } catch{ alert("Cannot connect"); } setDeleteModal(null); };
  const handleAddInspection = async form => { const s=sites[inspModal.siteIndex]; try { const r=await fetch(`${API}/${s._id}/inspections`,{method:"POST",headers:headers(),body:JSON.stringify(form)}); const d=await r.json(); if(r.ok)setSites(p=>p.map((x,i)=>i===inspModal.siteIndex?d:x)); else alert(d.message||"Failed"); } catch{ alert("Cannot connect"); } };
  const handleEditInspection = async form => { const s=sites[inspModal.siteIndex]; const id=s.inspections[inspModal.inspIndex]._id; try { const r=await fetch(`${API}/${s._id}/inspections/${id}`,{method:"PUT",headers:headers(),body:JSON.stringify(form)}); const d=await r.json(); if(r.ok)setSites(p=>p.map((x,i)=>i===inspModal.siteIndex?d:x)); } catch{ alert("Cannot connect"); } };
  const handleDeleteInspection = async () => { const s=sites[deleteModal.siteIndex]; const id=s.inspections[deleteModal.inspIndex]._id; try { const r=await fetch(`${API}/${s._id}/inspections/${id}`,{method:"DELETE",headers:headers()}); const d=await r.json(); if(r.ok)setSites(p=>p.map((x,i)=>i===deleteModal.siteIndex?d:x)); } catch{ alert("Cannot connect"); } setDeleteModal(null); };
  const handleAssignWorkers = async (siteIndex, chosenWorkers) => { const s=sites[siteIndex]; try { const r=await fetch(`${API}/${s._id}`,{method:"PUT",headers:headers(),body:JSON.stringify({...s,workers:chosenWorkers})}); const d=await r.json(); if(r.ok)setSites(p=>p.map((x,i)=>i===siteIndex?d:x)); else alert(d.message||"Failed"); } catch{ alert("Cannot connect"); } };
  
  // ── UPDATED ASSIGN PROJECT HANDLER WITH FLATTENED PROPERTY FALLBACK ──
  const handleAssignProject = async (siteIndex, project) => {
    const s = sites[siteIndex];
    const projectId = project ? (project._id || project.name) : null;
    try {
      const r = await fetch(`${API}/${s._id}`, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify({ 
          ...s, 
          assignedProject: project || null,
          project: projectId // explicitly include explicit string identifier key variations for standard backends
        })
      });
      const d = await r.json();
      if (r.ok) {
        const fullProjectDetails = project ? allProjects.find(p => (p._id || p.name) === (project._id || project.name)) : null;
        const updatedSite = {
          ...d,
          assignedProject: fullProjectDetails || d.assignedProject || null
        };
        setSites(p => p.map((x, i) => i === siteIndex ? updatedSite : x));
      } else {
        alert(d.message || "Failed");
      }
    } catch {
      alert("Cannot connect");
    }
  };

  const handleDeleteWorkerFromSite = async () => { const s=sites[deleteModal.siteIndex]; const wId=s.workers[deleteModal.workerIndex]._id; try { const r=await fetch(`${API}/${s._id}/workers/${wId}`,{method:"DELETE",headers:headers()}); const d=await r.json(); if(r.ok)setSites(p=>p.map((x,i)=>i===deleteModal.siteIndex?d:x)); } catch{ alert("Cannot connect"); } setDeleteModal(null); };

  const togglePanel = (idx, panel) => {
    if (expandedIndex===idx && expandedPanel===panel) { setExpandedIndex(null); setExpandedPanel(null); }
    else { setExpandedIndex(idx); setExpandedPanel(panel); }
  };

  const statusFilters = ["All","Active","Inactive","On Hold","Closed"];
  const filteredWithIndex = sites
    .map((s,i) => ({site:s, realIndex:i}))
    .filter(({site:s}) => {
      const ms = s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.address.toLowerCase().includes(search.toLowerCase()) ||
        (s.district||"").toLowerCase().includes(search.toLowerCase());
      return ms && (filterStatus==="All" || s.status===filterStatus);
    });

  const total            = sites.length;
  const active           = sites.filter(s=>s.status==="Active").length;
  const onHold           = sites.filter(s=>s.status==="On Hold").length;
  const totalInspections = sites.reduce((s,si)=>s+(si.inspections?.length||0),0);
  const totalWorkers     = sites.reduce((s,si)=>s+(si.workers?.filter(w=>w.status==="Active").length||0),0);

  const stats = [
    { label:"Total Sites",    value:total,           sub:"registered",        subColor:"text-orange-500", icon:<IconMapPin size={20} color={PRIMARY}/>,        bg:"bg-orange-50 border-orange-100"  },
    { label:"Active",         value:active,          sub:`${total>0?Math.round((active/total)*100):0}% of sites`, subColor:"text-emerald-500", icon:<IconActivity size={20} color="#10b981"/>,     bg:"bg-emerald-50 border-emerald-100"},
    { label:"On Hold",        value:onHold,          sub:onHold>0?"Needs attention":"All running", subColor:"text-amber-500", icon:<IconAlertTriangle size={20} color="#f59e0b"/>, bg:"bg-amber-50 border-amber-100"   },
    { label:"Inspections",    value:totalInspections,sub:"across all sites",  subColor:"text-teal-500",   icon:<IconClipboardCheck size={20} color="#0d9488"/>, bg:"bg-teal-50 border-teal-100"     },
    { label:"Active Workers", value:totalWorkers,    sub:"on-site personnel", subColor:"text-violet-500", icon:<IconWorkers size={20} color="#7c3aed"/>,        bg:"bg-violet-50 border-violet-100" },
  ];

  const accentBar = {
    "Active":   "bg-gradient-to-r from-emerald-400 to-teal-400",
    "On Hold":  "bg-gradient-to-r from-amber-400 to-orange-400",
    "Closed":   "bg-gradient-to-r from-rose-300 to-rose-400",
    "Inactive": "bg-gradient-to-r from-slate-300 to-slate-400",
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] p-6 space-y-6">

      {/* ── Modals ── */}
      {siteModal!==null && (
        <SiteModal site={siteModal==="new"?null:siteModal} onClose={()=>{setSiteModal(null);setSiteEditIndex(null);}} onSave={siteModal==="new"?handleAddSite:handleEditSite}/>
      )}
      {inspModal!==null && (
        <InspectionModal
          siteName={sites[inspModal.siteIndex]?.name}
          inspection={inspModal.inspIndex!==undefined?sites[inspModal.siteIndex]?.inspections[inspModal.inspIndex]:null}
          onClose={()=>setInspModal(null)}
          onSave={inspModal.inspIndex!==undefined?handleEditInspection:handleAddInspection}
        />
      )}
      {workerModal!==null && (
        <AssignWorkerModal
          siteName={sites[workerModal.siteIndex]?.name}
          allWorkers={allWorkers}
          alreadyAssigned={(sites[workerModal.siteIndex]?.workers||[]).map(w=>w._id)}
          onClose={()=>setWorkerModal(null)}
          onSave={(workers)=>handleAssignWorkers(workerModal.siteIndex,workers)}
        />
      )}
      {projectModal!==null && (
        <AssignProjectModal
          siteName={sites[projectModal.siteIndex]?.name}
          allProjects={allProjects}
          currentProject={sites[projectModal.siteIndex]?.assignedProject||null}
          onClose={()=>setProjectModal(null)}
          onSave={(proj)=>handleAssignProject(projectModal.siteIndex,proj)}
        />
      )}
      {deleteModal!==null && (
        <DeleteConfirmModal
          label={deleteModal.label}
          onClose={()=>setDeleteModal(null)}
          onConfirm={deleteModal.type==="site"?handleDeleteSite:deleteModal.type==="inspection"?handleDeleteInspection:handleDeleteWorkerFromSite}
        />
      )}
      {showDashboard && <PerformanceDashboard sites={sites} onClose={()=>setShowDashboard(false)}/>}

      {/* ── Page Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Sites</h1>
          <p className="text-slate-400 text-sm mt-0.5">Manage construction sites, inspections &amp; workers</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={()=>setShowDashboard(true)}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 active:scale-95 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all">
            <IconBarChart size={16} color="#475569"/> Dashboard
          </button>
          <div className="relative">
            <button onClick={()=>setExportOpen(o=>!o)}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 active:scale-95 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all">
              <IconDownload size={16} color="#475569"/> Export <IconChevronDown size={13} color="#475569"/>
            </button>
            {exportOpen && (
              <div className="absolute right-0 top-12 z-30 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden w-52">
                {[
                  {label:"Export Sites (CSV)",       fn:()=>{exportSitesToCSV(sites);     setExportOpen(false);}},
                  {label:"Export Inspections (CSV)", fn:()=>{exportInspectionsCSV(sites); setExportOpen(false);}},
                  {label:"Export Workers (CSV)",     fn:()=>{exportWorkersCSV(sites);     setExportOpen(false);}},
                ].map(item=>(
                  <button key={item.label} onClick={item.fn}
                    className="w-full text-left px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-orange-50 flex items-center gap-2.5 transition-colors border-b border-slate-100 last:border-0">
                    <IconDownload size={14} color="#ea580c"/> {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={()=>setSiteModal("new")}
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-orange-200 transition-all">
            <IconPlus size={16} color="#fff"/> New Site
          </button>
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map(s=>(
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border-2 ${s.bg}`}>{s.icon}</div>
            <div className="min-w-0">
              <p className="text-slate-400 text-xs font-medium mb-0.5">{s.label}</p>
              <p className="text-2xl font-black text-slate-800 leading-none">{s.value}</p>
              <p className={`text-xs font-semibold mt-0.5 ${s.subColor}`}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Search + Filter ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[180px] border border-slate-200 rounded-xl px-4 py-2.5 bg-slate-50 focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
          <IconSearch size={15} color="#94a3b8"/>
          <input type="text" placeholder="Search by name, address, or district…" value={search} onChange={e=>setSearch(e.target.value)} className="flex-1 text-sm text-slate-700 outline-none placeholder-slate-400 bg-transparent"/>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {statusFilters.map(f=>(
            <button key={f} onClick={()=>setFilterStatus(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filterStatus===f?"bg-orange-600 text-white shadow-sm shadow-orange-200":"bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{f}</button>
          ))}
        </div>
      </div>

      {/* ══════════════ ALL SITES ══════════════ */}
      <div className="space-y-3">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-black text-slate-800">All Sites</h2>
          <span className="text-xs bg-orange-600 text-white font-bold px-2.5 py-1 rounded-full shadow-sm shadow-orange-200">
            {filteredWithIndex.length}
          </span>
        </div>

        {loading && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center py-20 text-center">
            <div className="w-12 h-12 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin mb-4"/>
            <p className="text-slate-500 font-semibold text-sm">Loading sites from database…</p>
          </div>
        )}

        {!loading && filteredWithIndex.length===0 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center mb-4 border-2 border-orange-100">
              <IconMapPin size={34} color={PRIMARY}/>
            </div>
            <p className="text-slate-700 font-bold text-lg">No sites found</p>
            <p className="text-slate-400 text-sm mt-1">Try a different filter or register a new site.</p>
          </div>
        )}

        {!loading && filteredWithIndex.map(({site, realIndex}) => {
          const ss             = siteStatusStyle[site.status] || siteStatusStyle["Active"];
          const isInspExpanded = expandedIndex === realIndex && expandedPanel === "inspections";
          const isWrkExpanded  = expandedIndex === realIndex && expandedPanel === "workers";
          const inspCount      = site.inspections?.length || 0;
          const workerCount    = site.workers?.filter(w => w.status === "Active").length || 0;
          const lastResult     = site.inspections?.length ? site.inspections[site.inspections.length - 1].result : null;
          const lastRS         = lastResult ? inspectionResultStyle[lastResult] : null;

          return (
            <div key={realIndex}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:border-slate-200">
              <div className={`h-[3px] w-full ${accentBar[site.status] || accentBar["Inactive"]}`} />
              <div className="flex items-start gap-4 px-5 py-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border-2 border-orange-200 bg-white shadow-sm">
                  <IconHardHat size={22} color={PRIMARY} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">{site.name}</h3>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1 truncate">
                        <IconMapPin size={10} color="#94a3b8" />
                        {site.address}
                        {site.district && <><span className="text-slate-200 mx-1">·</span><span>{site.district}</span></>}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-bold border shrink-0 ${ss.bg} ${ss.text} ${ss.border}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${ss.dot}`} />{site.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {site.siteManager && (
                      <span className="inline-flex items-center gap-1.5 text-xs bg-orange-50 text-orange-700 font-semibold px-2.5 py-1 rounded-lg border border-orange-100">
                        <IconWorkers size={10} color="#ea580c" /> {site.siteManager}
                      </span>
                    )}
                    {site.phone && (
                      <span className="inline-flex items-center gap-1.5 text-xs bg-slate-50 text-slate-500 font-medium px-2.5 py-1 rounded-lg border border-slate-200">
                        <IconPhone size={10} color="#94a3b8" /> {site.phone}
                      </span>
                    )}
                    {site.area && (
                      <span className="text-xs bg-slate-50 text-slate-500 font-medium px-2.5 py-1 rounded-lg border border-slate-200">
                        {site.area} sq ft
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-xs bg-teal-50 text-teal-700 font-bold px-2.5 py-1 rounded-lg border border-teal-100">
                      <IconClipboardCheck size={10} color="#0d9488" /> {inspCount} insp.
                      {lastRS && (
                        <span className={`ml-1 px-1.5 rounded text-xs font-bold ${lastRS.bg} ${lastRS.text}`}>{lastResult}</span>
                      )}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs bg-violet-50 text-violet-700 font-bold px-2.5 py-1 rounded-lg border border-violet-100">
                      <IconWorkers size={10} color="#7c3aed" /> {workerCount} workers
                    </span>
                  </div>

                  {/* ── FIXED COMPACT BANNER IN image_ed7de5.png ── */}
                  {site.assignedProject && (
                    <div className="mt-2.5 flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">
                      <div className="w-6 h-6 bg-white border-2 border-blue-200 rounded-lg flex items-center justify-center shrink-0">
                        <IconBriefcase size={11} color="#2563eb" />
                      </div>
                      <div className="flex-1 min-w-0 flex items-center gap-2">
                        <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide shrink-0">Project</p>
                        <p className="text-xs font-black text-blue-700 truncate">{site.assignedProject.name}</p>
                      </div>
                      {site.assignedProject.status && (
                        <span className="text-xs font-bold text-blue-600 bg-white border border-blue-200 px-2 py-0.5 rounded-md shrink-0">
                          {site.assignedProject.status}
                        </span>
                      )}
                      {site.assignedProject.progress !== undefined && (
                        <span className="text-xs font-black text-blue-500 shrink-0">{site.assignedProject.progress}%</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 px-5 py-3 border-t border-slate-100 bg-slate-50/70 flex-wrap">
                <button onClick={() => setProjectModal({ siteIndex: realIndex })}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all active:scale-95 ${
                    site.assignedProject
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white hover:bg-blue-50 text-blue-600 border-blue-200"
                  }`}>
                  <IconBriefcase size={11} color={site.assignedProject ? "#fff" : "#2563eb"} />
                  {site.assignedProject ? "Change Project" : "Assign Project"}
                </button>

                <button onClick={() => togglePanel(realIndex, "inspections")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all active:scale-95 ${
                    isInspExpanded
                      ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                      : "bg-white hover:bg-teal-50 text-teal-700 border-teal-200"
                  }`}>
                  <IconClipboardCheck size={11} color={isInspExpanded ? "#fff" : "#0d9488"} />
                  Inspections
                  {isInspExpanded ? <IconChevronUp size={10} color="#fff" /> : <IconChevronDown size={10} color="#0d9488" />}
                </button>

                <button onClick={() => togglePanel(realIndex, "workers")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all active:scale-95 ${
                    isWrkExpanded
                      ? "bg-violet-600 text-white border-violet-600 shadow-sm"
                      : "bg-white hover:bg-violet-50 text-violet-700 border-violet-200"
                  }`}>
                  <IconWorkers size={11} color={isWrkExpanded ? "#fff" : "#7c3aed"} />
                  Workers
                  {isWrkExpanded ? <IconChevronUp size={10} color="#fff" /> : <IconChevronDown size={10} color="#7c3aed" />}
                </button>

                {site.mapLink && (
                  <a href={site.mapLink} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 transition-all">
                    <IconMap size={11} color="#059669" /> Map
                  </a>
                )}

                <div className="flex-1" />

                <button onClick={() => { setSiteEditIndex(realIndex); setSiteModal(site); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-indigo-50 text-indigo-600 border border-indigo-200 transition-all active:scale-95">
                  <IconEdit size={11} color="#4f46e5" /> Edit
                </button>

                <button onClick={() => setDeleteModal({ type: "site", siteIndex: realIndex, label: site.name })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-red-50 text-red-500 border border-red-200 transition-all active:scale-95">
                  <IconTrash size={11} color="#ef4444" /> Delete
                </button>
              </div>

              {isInspExpanded && (
                <div className="border-t-2 border-teal-100">
                  <InspectionsPanel
                    site={site} siteIndex={realIndex}
                    onAddInspection={si => setInspModal({ siteIndex: si })}
                    onEditInspection={(si, ii) => setInspModal({ siteIndex: si, inspIndex: ii })}
                    onDeleteInspection={(si, ii) => setDeleteModal({ type: "inspection", siteIndex: si, inspIndex: ii, label: `Inspection on ${sites[si].inspections[ii].date}` })}
                  />
                </div>
              )}

              {isWrkExpanded && (
                <div className="border-t-2 border-violet-100">
                  <WorkersPanel
                    site={site} siteIndex={realIndex}
                    onAddWorker={si => setWorkerModal({ siteIndex: si })}
                    onEditWorker={(si, wi) => setWorkerModal({ siteIndex: si, workerIndex: wi })}
                    onDeleteWorker={(si, wi) => setDeleteModal({ type: "worker", siteIndex: si, workerIndex: wi, label: sites[si].workers[wi].name })}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {exportOpen && <div className="fixed inset-0 z-20" onClick={() => setExportOpen(false)} />}
    </div>
  );
}