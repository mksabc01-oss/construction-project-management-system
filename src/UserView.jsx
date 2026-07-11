import React, { useState, useEffect, useRef } from "react";

// ── SVG ICONS ────────────────────────────────────────────────
const IcGrid = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);
const IcHardHat = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/>
    <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/>
    <path d="M4 15v-3a8 8 0 0 1 16 0v3"/>
  </svg>
);
const IcWorker = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IcMapPin = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IcLogout = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IcMenu = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IcEye = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const IcBarChart = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);
const IcClipboard = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
    <rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/>
  </svg>
);
const IcArrowLeft = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const IcDownload = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const API = "http://localhost:5000/api";
const authHeader = () => ({ "Authorization": `Bearer ${localStorage.getItem("token")}` });

const statusStyle = {
  "On Track": { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", bar: "#10b981" },
  "Delayed":  { bg: "bg-red-50",     text: "text-red-700",     dot: "bg-red-500",     bar: "#ef4444" },
  "At Risk":  { bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-500",   bar: "#f59e0b" },
  "Completed":{ bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-500",    bar: "#3b82f6" },
};
const siteStatusStyle = {
  "Active":   { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  "Inactive": { bg: "bg-slate-100",  text: "text-slate-500",   dot: "bg-slate-400"   },
  "On Hold":  { bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-500"   },
  "Closed":   { bg: "bg-red-50",     text: "text-red-600",     dot: "bg-red-500"     },
};
const workerStatusStyle = {
  "active":   { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  "on leave": { bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-500"   },
  "inactive": { bg: "bg-slate-100",  text: "text-slate-500",   dot: "bg-slate-400"   },
};

// ── SPINNER ───────────────────────────────────────────────────
function Spinner() {
  return (
    <div className="flex flex-col items-center gap-3 py-16">
      <div className="w-9 h-9 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"/>
      <p className="text-slate-400 text-sm">Loading…</p>
    </div>
  );
}

// ── OVERVIEW TAB ─────────────────────────────────────────────
function OverviewTab({ project, sites, workers, loading }) {
  if (loading) return <Spinner />;
  const proj = project;
  const st   = statusStyle[proj?.status] || statusStyle["On Track"];

  return (
    <div className="space-y-6">
      {/* Project KPI card */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Progress",       value: `${proj?.progress ?? 0}%`,          color: "text-orange-600",  bg: "bg-orange-50  border-orange-100"  },
          { label: "Status",         value: proj?.status ?? "—",                 color: st.text,            bg: `${st.bg} border-slate-100`        },
          { label: "Workers",        value: workers.length,                       color: "text-violet-600",  bg: "bg-violet-50  border-violet-100"  },
          { label: "Linked Sites",   value: sites.length,                         color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
        ].map(k => (
          <div key={k.label} className={`bg-white rounded-2xl border shadow-sm p-5 ${k.bg}`}>
            <p className="text-slate-400 text-xs mb-1">{k.label}</p>
            <p className={`text-2xl font-black ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-slate-700">Overall Progress</p>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${st.bg} ${st.text}`}>{proj?.status}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
          <div className="h-4 rounded-full transition-all duration-700"
            style={{ width: `${proj?.progress ?? 0}%`, background: st.bar ?? "#f97316" }} />
        </div>
        <p className="text-right text-sm font-black text-slate-700 mt-2">{proj?.progress ?? 0}%</p>

        <div className="mt-5 grid grid-cols-2 gap-4 pt-5 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Site</p>
            <p className="text-sm font-semibold text-slate-700">{proj?.site || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Budget</p>
            <p className="text-sm font-semibold text-slate-700">{proj?.budget || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SITES TAB ─────────────────────────────────────────────────
function SitesTab({ sites, loading }) {
  if (loading) return <Spinner />;
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800">Linked Sites</h2>
        <span className="text-xs text-slate-400">{sites.length} sites</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-400 text-xs uppercase">
              <th className="text-left px-6 py-3 font-semibold tracking-wider">Site</th>
              <th className="text-left px-4 py-3 font-semibold tracking-wider">District</th>
              <th className="text-left px-4 py-3 font-semibold tracking-wider">Manager</th>
              <th className="text-left px-4 py-3 font-semibold tracking-wider">Area</th>
              <th className="text-left px-4 py-3 font-semibold tracking-wider">Status</th>
              <th className="text-left px-4 py-3 font-semibold tracking-wider">Inspections</th>
              <th className="text-left px-4 py-3 font-semibold tracking-wider">Workers</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sites.length === 0
              ? <tr><td colSpan={7} className="px-6 py-10 text-center text-slate-400 text-sm">No sites linked to this project.</td></tr>
              : sites.map((s, i) => {
                const ss = siteStatusStyle[s.status] || siteStatusStyle["Active"];
                return (
                  <tr key={s._id || i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center shrink-0">
                          <IcHardHat size={18} color="#ea580c"/>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{s.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{s.address}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">{s.district || "—"}</td>
                    <td className="px-4 py-4 text-sm text-slate-600">{s.siteManager || "—"}</td>
                    <td className="px-4 py-4 text-sm text-slate-600">{s.area ? `${s.area} sq ft` : "—"}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg font-semibold ${ss.bg} ${ss.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${ss.dot}`}/>{s.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-bold text-teal-600">{s.inspections?.length || 0}</td>
                    <td className="px-4 py-4 text-sm font-bold text-violet-600">{s.workers?.filter(w => w.status === "Active").length || 0}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── WORKERS TAB ───────────────────────────────────────────────
function WorkersTab({ workers, loading }) {
  if (loading) return <Spinner />;
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800">Assigned Workers</h2>
        <span className="text-xs bg-violet-50 text-violet-700 border border-violet-100 font-bold px-3 py-1 rounded-xl">{workers.length} workers</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-400 text-xs uppercase">
              <th className="text-left px-6 py-3 font-semibold tracking-wider">Worker</th>
              <th className="text-left px-4 py-3 font-semibold tracking-wider">Role</th>
              <th className="text-left px-4 py-3 font-semibold tracking-wider">Phone</th>
              <th className="text-left px-4 py-3 font-semibold tracking-wider">NIC</th>
              <th className="text-left px-4 py-3 font-semibold tracking-wider">Salary</th>
              <th className="text-left px-4 py-3 font-semibold tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {workers.length === 0
              ? <tr><td colSpan={6} className="px-6 py-10 text-center text-slate-400 text-sm">No workers found for this project.</td></tr>
              : workers.map((w, i) => {
                const ws = workerStatusStyle[(w.status || "").toLowerCase()] || workerStatusStyle["active"];
                return (
                  <tr key={w._id || i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-violet-100 rounded-full flex items-center justify-center text-sm font-black text-violet-700 shrink-0">
                          {(w.name || "?").charAt(0).toUpperCase()}
                        </div>
                        <p className="font-semibold text-slate-800">{w.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-lg">{w.role || "—"}</span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-500">{w.phone || "—"}</td>
                    <td className="px-4 py-4 text-sm text-slate-500 font-mono">{w.nic || "—"}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-slate-700">
                      {w.salary ? `Rs ${Number(w.salary).toLocaleString()}` : "—"}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-semibold ${ws.bg} ${ws.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${ws.dot}`}/>
                        {w.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── REPORTS TAB ───────────────────────────────────────────────
function ReportsTab({ project, workers, sites, loading }) {
  const reportRef = useRef(null);

  if (loading) return <Spinner />;

  const st = statusStyle[project?.status] || statusStyle["On Track"];
  const activeWorkers   = workers.filter(w => (w.status || "").toLowerCase() === "active").length;
  const onLeaveWorkers  = workers.filter(w => (w.status || "").toLowerCase() === "on leave").length;
  const inactiveWorkers = workers.filter(w => (w.status || "").toLowerCase() === "inactive").length;
  const totalInsp       = sites.reduce((s, si) => s + (si.inspections?.length || 0), 0);
  const passInsp        = sites.reduce((s, si) => s + (si.inspections || []).filter(i => i.result === "Pass").length, 0);
  const passRate        = totalInsp ? Math.round((passInsp / totalInsp) * 100) : 0;

  // ── CSV EXPORT ──────────────────────────────────────────────
  const handleCSV = () => {
    const rows = [];

    // Project summary section
    rows.push(["PROJECT SUMMARY"]);
    rows.push(["Name", "Status", "Progress", "Site", "Budget"]);
    rows.push([
      project?.name || "",
      project?.status || "",
      `${project?.progress ?? 0}%`,
      project?.site || "",
      project?.budget || "",
    ]);

    rows.push([]);

    // Workers section
    rows.push(["WORKERS"]);
    rows.push(["Name", "Role", "Phone", "NIC", "Salary", "Status"]);
    workers.forEach(w => {
      rows.push([
        w.name || "",
        w.role || "",
        w.phone || "",
        w.nic || "",
        w.salary ? `Rs ${Number(w.salary).toLocaleString()}` : "",
        w.status || "",
      ]);
    });

    rows.push([]);

    // Sites section
    rows.push(["SITES"]);
    rows.push(["Site Name", "Address", "District", "Manager", "Area (sq ft)", "Status", "Inspections", "Active Workers"]);
    sites.forEach(s => {
      rows.push([
        s.name || "",
        s.address || "",
        s.district || "",
        s.siteManager || "",
        s.area || "",
        s.status || "",
        s.inspections?.length || 0,
        s.workers?.filter(w => w.status === "Active").length || 0,
      ]);
    });

    rows.push([]);

    // Inspection summary section
    rows.push(["INSPECTION SUMMARY"]);
    rows.push(["Total Inspections", "Passed", "Pass Rate"]);
    rows.push([totalInsp, passInsp, `${passRate}%`]);

    // Convert to CSV string (wrap cells with commas/quotes in double-quotes)
    const csvContent = rows
      .map(row =>
        row.map(cell => {
          const val = String(cell).replace(/"/g, '""');
          return val.includes(",") || val.includes("\n") || val.includes('"')
            ? `"${val}"`
            : val;
        }).join(",")
      )
      .join("\n");

    // Trigger download with BOM for Excel compatibility
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href     = url;
    link.download = `${(project?.name || "project").replace(/\s+/g, "_")}_report.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ── PDF EXPORT ──────────────────────────────────────────────
  const handlePDF = () => {
    const el = reportRef.current;
    if (!el) return;
    const clone = el.cloneNode(true);
    clone.querySelectorAll("button").forEach(b => b.remove());

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
    <title>Project Report – ${project?.name}</title>
    <style>
      @page { size: A4; margin: 14mm; }
      *, *::before, *::after { box-sizing: border-box; }
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
             font-size: 12px; color: #1e293b; background: #fff; margin: 0; padding: 0; }
      .header { display:flex; justify-content:space-between; align-items:center;
                padding-bottom:10px; border-bottom:3px solid #f97316; margin-bottom:20px; }
      .header h1 { margin:0; font-size:20px; font-weight:900; color:#0f172a; }
      .header span { font-size:10px; color:#94a3b8; }
      .section-title { font-size:13px; font-weight:800; color:#334155; margin:18px 0 8px; }
      .kpi-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-bottom:18px; }
      .kpi { background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px; }
      .kpi .label { font-size:10px; color:#94a3b8; margin-bottom:4px; }
      .kpi .value { font-size:22px; font-weight:900; color:#0f172a; }
      .progress-wrap { background:#f1f5f9; border-radius:999px; height:16px; overflow:hidden; margin:8px 0; }
      .progress-bar  { height:16px; border-radius:999px; background:${st.bar ?? "#f97316"}; }
      table { width:100%; border-collapse:collapse; font-size:11px; }
      th { background:#f8fafc; padding:6px 10px; text-align:left; font-weight:700;
           color:#64748b; text-transform:uppercase; border-bottom:1px solid #e2e8f0; }
      td { padding:6px 10px; border-bottom:1px solid #f1f5f9; }
      .badge { display:inline-block; padding:2px 8px; border-radius:6px; font-size:10px; font-weight:700; }
    </style>
    </head><body>
      <div class="header">
        <h1>&#x1F3D7; ${project?.name} — Project Report</h1>
        <span>Generated: ${new Date().toLocaleString()}</span>
      </div>
      ${clone.innerHTML}
    </body></html>`;

    const win = window.open("", "_blank", "width=900,height=720");
    if (!win) { alert("Allow popups for localhost:5173 and try again."); return; }
    win.document.write(html);
    win.document.close();
    win.onload = () => setTimeout(() => { win.focus(); win.print(); win.close(); }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-800">Project Report</h2>
          <p className="text-xs text-slate-400 mt-0.5">{project?.name} · Read-only snapshot</p>
        </div>
        {/* ── EXPORT BUTTONS ── */}
        <div className="flex items-center gap-2">
          <button onClick={handleCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-sm font-bold shadow-sm transition-all">
            <IcDownload size={15}/> Export CSV
          </button>
          <button onClick={handlePDF}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold shadow-sm transition-all">
            <IcDownload size={15} color="#fff"/> Export PDF
          </button>
        </div>
      </div>

      {/* Printable content */}
      <div ref={reportRef} className="space-y-6">

        {/* KPI strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Progress",       value: `${project?.progress ?? 0}%`, color: "text-orange-600",  bg: "bg-orange-50  border-orange-100"  },
            { label: "Status",         value: project?.status ?? "—",       color: st.text,            bg: `${st.bg} border-slate-100`        },
            { label: "Total Workers",  value: workers.length,               color: "text-violet-600",  bg: "bg-violet-50  border-violet-100"  },
            { label: "Inspection Pass",value: `${passRate}%`,               color: "text-teal-600",    bg: "bg-teal-50    border-teal-100"    },
          ].map(k => (
            <div key={k.label} className={`rounded-2xl border p-5 ${k.bg}`}>
              <p className="text-xs text-slate-400 mb-1">{k.label}</p>
              <p className={`text-2xl font-black ${k.color}`}>{k.value}</p>
            </div>
          ))}
        </div>

        {/* Progress section */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <p className="text-sm font-black text-slate-700 mb-4">Project Progress</p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-semibold">{project?.name}</span>
            <span className="text-sm font-black text-slate-800">{project?.progress ?? 0}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-5 overflow-hidden">
            <div className="h-5 rounded-full transition-all duration-700"
              style={{ width: `${project?.progress ?? 0}%`, background: st.bar ?? "#f97316" }}/>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-4 pt-5 border-t border-slate-100 text-center">
            <div>
              <p className="text-xs text-slate-400">Site</p>
              <p className="text-sm font-bold text-slate-700 mt-0.5">{project?.site || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Budget</p>
              <p className="text-sm font-bold text-slate-700 mt-0.5">{project?.budget || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Inspections</p>
              <p className="text-sm font-bold text-teal-600 mt-0.5">{totalInsp} total · {passRate}% pass</p>
            </div>
          </div>
        </div>

        {/* Workforce summary */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <p className="text-sm font-black text-slate-700 mb-4">Workforce Summary</p>
          <div className="space-y-3">
            {[
              { label: "Active",   count: activeWorkers,   color: "#10b981" },
              { label: "On Leave", count: onLeaveWorkers,  color: "#f59e0b" },
              { label: "Inactive", count: inactiveWorkers, color: "#ef4444" },
            ].map(r => (
              <div key={r.label} className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: r.color }}/>
                <span className="text-sm text-slate-600 w-20">{r.label}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="h-2 rounded-full transition-all duration-700"
                    style={{ width: workers.length ? `${(r.count / workers.length) * 100}%` : "0%", background: r.color }}/>
                </div>
                <span className="text-sm font-black text-slate-700 w-6 text-right">{r.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workers table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <p className="text-sm font-black text-slate-700">Workers ({workers.length})</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-xs uppercase">
                  <th className="text-left px-6 py-3 font-semibold">Name</th>
                  <th className="text-left px-4 py-3 font-semibold">Role</th>
                  <th className="text-left px-4 py-3 font-semibold">Phone</th>
                  <th className="text-left px-4 py-3 font-semibold">Salary</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {workers.length === 0
                  ? <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400 text-sm">No workers assigned.</td></tr>
                  : workers.map((w, i) => {
                    const ws = workerStatusStyle[(w.status || "").toLowerCase()] || workerStatusStyle["active"];
                    return (
                      <tr key={w._id || i} className="hover:bg-slate-50/60">
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-violet-100 rounded-full flex items-center justify-center text-xs font-black text-violet-700">
                              {(w.name || "?").charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-slate-800">{w.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-500 text-xs">{w.role || "—"}</td>
                        <td className="px-4 py-3 text-slate-500 text-xs">{w.phone || "—"}</td>
                        <td className="px-4 py-3 text-slate-700 font-semibold text-xs">
                          {w.salary ? `Rs ${Number(w.salary).toLocaleString()}` : "—"}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg font-semibold ${ws.bg} ${ws.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${ws.dot}`}/>{w.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

      </div>{/* end reportRef */}
    </div>
  );
}

// ── MAIN USER VIEW ────────────────────────────────────────────
export default function UserView({ user, onLogout }) {
  const [activeTab,        setActiveTab]        = useState("overview");
  const [sidebarOpen,      setSidebarOpen]      = useState(true);
  const [projects,         setProjects]         = useState([]);
  const [sites,            setSites]            = useState([]);
  const [workers,          setWorkers]          = useState([]);
  const [loading,          setLoading]          = useState(true);
  const [selectedProject,  setSelectedProject]  = useState(null);

  const viewUser = user || JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [pRes, sRes, wRes] = await Promise.all([
          fetch(`${API}/projects`, { headers: authHeader() }),
          fetch(`${API}/sites`,    { headers: authHeader() }),
          fetch(`${API}/workers`,  { headers: authHeader() }),
        ]);
        const [pData, sData, wData] = await Promise.all([pRes.json(), sRes.json(), wRes.json()]);
        if (Array.isArray(pData)) setProjects(pData);
        if (Array.isArray(sData)) setSites(sData);
        if (Array.isArray(wData)) setWorkers(wData);
      } catch (err) { console.error("Failed to load data:", err); }
      setLoading(false);
    };
    fetchAll();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (typeof onLogout === "function") onLogout();
    else window.location.href = "/";
  };

  // ── FILTER DATA FOR SELECTED PROJECT ─────────────────────────
  const filteredSites = selectedProject
    ? sites.filter(s =>
        s._id === selectedProject.site ||
        s.name === selectedProject.site ||
        s.assignedProject?._id === selectedProject._id ||
        s.assignedProject === selectedProject._id
      )
    : [];

  const filteredWorkers = (() => {
    if (!selectedProject || filteredSites.length === 0) return [];
    const seen = new Set();
    const result = [];
    filteredSites.forEach(site => {
      if (site.workers && Array.isArray(site.workers)) {
        site.workers.forEach(worker => {
          const identifier = worker._id ? worker._id.toString() : worker.name;
          if (!seen.has(identifier)) {
            seen.add(identifier);
            result.push(worker);
          }
        });
      }
    });
    return result;
  })();

  const navItems = [
    { id: "overview", label: "Overview", icon: <IcGrid size={18} />      },
    { id: "sites",    label: "Sites",    icon: <IcMapPin size={18} />     },
    { id: "workers",  label: "Workers",  icon: <IcWorker size={18} />     },
    { id: "reports",  label: "Reports",  icon: <IcClipboard size={18} />  },
  ];

  // ── PROJECT SELECTOR ──────────────────────────────────────────
  if (!selectedProject) {
    return (
      <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }} className="min-h-screen bg-slate-100 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-7 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Welcome, {viewUser.name || "User"} 👋</h1>
            <p className="text-slate-400 text-xs mt-0.5">Choose a project to view details</p>
          </div>
          <button onClick={handleLogout} className="text-slate-500 hover:text-red-600 text-sm flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 hover:border-red-200 transition-all">
            <IcLogout size={18}/> Logout
          </button>
        </header>

        <main className="flex-1 p-7 max-w-5xl w-full mx-auto space-y-6">
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-5 py-3 rounded-2xl flex items-center gap-3 text-sm font-semibold">
            <IcEye size={16} color="#2563eb"/>
            <span>You have Read-Only viewer privileges. Choose any workspace below.</span>
          </div>

          <h2 className="text-lg font-black text-slate-700">Available Projects</h2>

          {loading ? <Spinner /> : projects.length === 0
            ? <p className="text-center py-20 text-slate-400 bg-white border rounded-2xl shadow-sm">No assignments found.</p>
            : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map((p, i) => {
                  const st = statusStyle[p.status] || statusStyle["On Track"];
                  return (
                    <div key={p._id || i}
                      onClick={() => { setSelectedProject(p); setActiveTab("overview"); }}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-orange-500 p-6 shadow-sm hover:shadow-md cursor-pointer transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-10 h-10 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-500 transition-all">
                            <IcHardHat size={20} color="#ea580c"/>
                          </div>
                          <span className={`text-xs px-2.5 py-1 rounded-lg font-bold ${st.bg} ${st.text}`}>{p.status}</span>
                        </div>
                        <h3 className="font-bold text-slate-800 text-base group-hover:text-orange-600 transition-colors">{p.name}</h3>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><IcMapPin size={12}/> {p.site}</p>
                      </div>
                      <div className="mt-5 pt-4 border-t border-slate-100">
                        <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                          <span>Progress</span><span className="font-bold text-slate-700">{p.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div className="h-1.5 rounded-full" style={{ width: `${p.progress}%`, background: st.bar ?? "#f97316" }}/>
                        </div>
                        <p className="text-right text-orange-600 font-bold text-xs mt-3 group-hover:underline">Open Details →</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
        </main>
      </div>
    );
  }

  // ── DETAIL VIEW ───────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }} className="flex min-h-screen bg-slate-100">

      {/* SIDEBAR */}
      <aside className={`${sidebarOpen ? "w-60" : "w-16"} transition-all duration-300 bg-slate-900 flex flex-col shrink-0`} style={{ minHeight: "100vh" }}>
        <div className="flex items-center gap-2.5 px-4 py-5 border-b border-slate-700/60">
          <div className="w-9 h-9 bg-orange-600 rounded-xl flex items-center justify-center shrink-0">
            <span className="text-white font-black text-lg">B</span>
          </div>
          {sidebarOpen && <span className="text-white font-bold text-lg">Build<span className="text-orange-500">Track</span></span>}
        </div>

        <nav className="flex-1 py-3 space-y-0.5 px-2">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                ${activeTab === item.id ? "bg-orange-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
              <span className="shrink-0">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="px-4 py-3 border-t border-slate-700/60">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0">
                {(viewUser.name || "U").charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-white text-xs font-semibold truncate">{viewUser.name}</p>
                <span className="inline-flex items-center gap-1 text-xs font-bold px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-400 mt-0.5">
                  <IcEye size={10} color="#60a5fa"/> Viewer
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="px-3 py-4 border-t border-slate-700/60">
          <button onClick={handleLogout}
            className="w-full text-slate-400 hover:text-white hover:bg-slate-800 text-sm flex items-center gap-2 px-3 py-2 rounded-xl transition-all">
            <IcLogout size={18}/>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-auto flex flex-col">
        <header className="bg-white border-b border-slate-200 px-7 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-500 hover:text-slate-800 transition-colors">
              <IcMenu size={22}/>
            </button>
            <button onClick={() => setSelectedProject(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors">
              <IcArrowLeft size={14}/> Change Project
            </button>
            <div className="h-5 w-px bg-slate-200"/>
            <div>
              <h1 className="text-lg font-bold text-slate-800">
                Project: <span className="text-orange-600 font-black">{selectedProject.name}</span>
              </h1>
              <p className="text-slate-400 text-xs">Viewing workspace updates</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold">
            <IcEye size={14} color="#2563eb"/> Read-Only Access
          </div>
        </header>

        <div className="mx-7 mt-5 flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-2xl px-5 py-3">
          <IcEye size={16} color="#2563eb"/>
          <p className="text-sm text-blue-700 font-semibold">
            Viewing <span className="font-bold underline">{selectedProject.name}</span> in read-only mode.
          </p>
        </div>

        <div className="p-7 space-y-6">
          {/* Tab pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {navItems.map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all
                  ${activeTab === item.id ? "bg-orange-600 text-white shadow-md shadow-orange-200" : "bg-white text-slate-600 border border-slate-200 hover:border-orange-300"}`}>
                {item.icon} {item.label}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <OverviewTab project={selectedProject} sites={filteredSites} workers={filteredWorkers} loading={loading}/>
          )}
          {activeTab === "sites" && (
            <SitesTab sites={filteredSites} loading={loading}/>
          )}
          {activeTab === "workers" && (
            <WorkersTab workers={filteredWorkers} loading={loading}/>
          )}
          {activeTab === "reports" && (
            <ReportsTab project={selectedProject} workers={filteredWorkers} sites={filteredSites} loading={loading}/>
          )}
        </div>
      </main>
    </div>
  );
}