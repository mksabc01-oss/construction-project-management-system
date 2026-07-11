import React, { useState } from "react";

// ── SVG ICONS ────────────────────────────────────────────────────────────────
const IconAlertTriangle = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const IconHardHat = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/>
    <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/>
    <path d="M4 15v-3a8 8 0 0 1 16 0v3"/>
  </svg>
);
const IconClose = ({ size = 14, color = "#64748b" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);
const IconCheck = ({ size = 14, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconPlus = ({ size = 15, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);
const IconSearch = ({ size = 15, color = "#94a3b8" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);
const IconTrash = ({ size = 13, color = "#f87171" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);
const IconUsers = ({ size = 20, color = "#ea580c" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconUserCheck = ({ size = 20, color = "#059669" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <polyline points="16 11 18 13 22 9"/>
  </svg>
);
const IconUserMinus = ({ size = 20, color = "#d97706" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <line x1="22" y1="11" x2="16" y2="11"/>
  </svg>
);
const IconDollarSign = ({ size = 20, color = "#9333ea" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const IconBarChart = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);
const IconList = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/>
    <line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);

// ── DONUT CHART (pure SVG, light center) ─────────────────────────────────────
function DonutChart({ data, size = 130 }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (!total) return null;
  let cumulative = 0;
  const r = 45, cx = size / 2, cy = size / 2;
  const circumference = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((seg, i) => {
        const pct = seg.value / total;
        const offset = circumference * (1 - cumulative);
        const dash = circumference * pct;
        cumulative += pct;
        return (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={seg.color} strokeWidth="18"
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${cx} ${cy})`}
            strokeLinecap="butt"
          />
        );
      })}
      <circle cx={cx} cy={cy} r="34" fill="#fff" />
      <text x={cx} y={cy - 6} textAnchor="middle" fill="#1e293b" fontSize="16" fontWeight="700">{total}</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#94a3b8" fontSize="9">WORKERS</text>
    </svg>
  );
}

// ── ATTENDANCE BAR CHART (pure SVG) ───────────────────────────────────────────
function AttendanceBarChart({ data, height = 220 }) {
  const width = 640;
  const padding = { top: 10, right: 14, bottom: 34, left: 38 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const yMin = 60, yMax = 100;
  const gridVals = [60, 70, 80, 90, 100];
  const gap = 14;
  const barW = data.length ? Math.max(10, chartW / data.length - gap) : 0;
  const yScale = (v) => padding.top + chartH - ((v - yMin) / (yMax - yMin)) * chartH;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="xMidYMid meet">
      {gridVals.map((v) => (
        <g key={v}>
          <line x1={padding.left} x2={width - padding.right} y1={yScale(v)} y2={yScale(v)} stroke="#f1f5f9" strokeWidth="1" />
          <text x={padding.left - 8} y={yScale(v) + 4} textAnchor="end" fontSize="11" fill="#94a3b8">{v}%</text>
        </g>
      ))}
      {data.map((d, i) => {
        const x = padding.left + i * (barW + gap) + gap / 2;
        const barH = Math.max(0, ((d.rate - yMin) / (yMax - yMin)) * chartH);
        const y = padding.top + chartH - barH;
        const color = d.rate >= 90 ? "#059669" : d.rate >= 80 ? "#ea580c" : "#dc2626";
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} rx="4" fill={color}>
              <title>{`${d.name}: ${d.rate}%`}</title>
            </rect>
            <text x={x + barW / 2} y={height - padding.bottom + 16} textAnchor="middle" fontSize="11" fill="#94a3b8">
              {d.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── MONTHLY TREND LINE CHART (pure SVG, dual series) ──────────────────────────
function TrendLineChart({ data, height = 220 }) {
  const width = 640;
  const padding = { top: 24, right: 14, bottom: 34, left: 38 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const rateMin = 70, rateMax = 100;
  const taskMax = Math.max(...data.map((d) => d.tasks), 10) * 1.15;
  const xStep = data.length > 1 ? chartW / (data.length - 1) : 0;
  const xScale = (i) => padding.left + i * xStep;
  const yRateScale = (v) => padding.top + chartH - ((v - rateMin) / (rateMax - rateMin)) * chartH;
  const yTaskScale = (v) => padding.top + chartH - (v / taskMax) * chartH;
  const ratePoints = data.map((d, i) => `${xScale(i)},${yRateScale(d.rate)}`).join(" ");
  const taskPoints = data.map((d, i) => `${xScale(i)},${yTaskScale(d.tasks)}`).join(" ");
  const gridVals = [70, 80, 90, 100];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="xMidYMid meet">
      {/* Legend */}
      <rect x={padding.left} y={2} width="10" height="10" rx="2" fill="#ea580c" />
      <text x={padding.left + 14} y={11} fontSize="11" fill="#64748b">Attendance Rate</text>
      <rect x={padding.left + 130} y={2} width="10" height="10" rx="2" fill="#2563eb" />
      <text x={padding.left + 144} y={11} fontSize="11" fill="#64748b">Tasks Done</text>

      {gridVals.map((v) => (
        <line key={v} x1={padding.left} x2={width - padding.right} y1={yRateScale(v)} y2={yRateScale(v)} stroke="#f1f5f9" strokeWidth="1" />
      ))}

      <polyline points={ratePoints} fill="none" stroke="#ea580c" strokeWidth="2" />
      <polyline points={taskPoints} fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 3" />

      {data.map((d, i) => (
        <g key={i}>
          <circle cx={xScale(i)} cy={yRateScale(d.rate)} r="3.5" fill="#ea580c">
            <title>{`${d.month} — Attendance Rate: ${d.rate}%`}</title>
          </circle>
          <circle cx={xScale(i)} cy={yTaskScale(d.tasks)} r="3.5" fill="#2563eb">
            <title>{`${d.month} — Tasks Done: ${d.tasks}`}</title>
          </circle>
          <text x={xScale(i)} y={height - padding.bottom + 16} textAnchor="middle" fontSize="11" fill="#94a3b8">
            {d.month}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ── FORM FIELD (light themed) ─────────────────────────────────────────────────
const Field = ({ label, name, type = "text", placeholder, value, onChange, errors }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
    <input
      type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 outline-none transition-all
        ${errors[name]
          ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
          : "border-slate-200 bg-white focus:ring-2 focus:ring-orange-300 focus:border-orange-400"}`}
    />
    {errors[name] && (
      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
        <IconAlertTriangle /> {errors[name]}
      </p>
    )}
  </div>
);

// ── ADD WORKER MODAL ──────────────────────────────────────────────────────────
function AddWorkerModal({ onClose, onAdd }) {
  const empty = { name: "", phone: "", role: "", salary: "", status: "active" };
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name   = "Name is required";
    if (!form.phone.trim()) e.phone  = "Phone is required";
    if (!form.role.trim())  e.role   = "Role is required";
    if (!form.salary)       e.salary = "Salary is required";
    return e;
  };
  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/workers", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({
          name: form.name.trim(), phone: form.phone.trim(),
          role: form.role.trim(), salary: Number(form.salary),
          status: form.status.toLowerCase(),
        }),
      });
      const data = await response.json();
      if (response.ok) { onAdd(data); onClose(); }
      else alert(`Server Error: ${data.message || "Failed to save"}`);
    } catch { alert("Failed to add worker. Make sure backend is running."); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(5px)" }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-md shadow-orange-200">
              <IconHardHat size={20} color="#ffffff" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800">Add Worker</h2>
              <p className="text-xs text-slate-400">Fill in the details to add a worker</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <IconClose />
          </button>
        </div>
        <div className="px-7 py-6 space-y-4">
          <Field label="Full Name"    name="name"   placeholder="e.g. Rohan Silva"  value={form.name}   onChange={change} errors={errors} />
          <Field label="Phone Number" name="phone"  placeholder="e.g. 071-234-5678" value={form.phone}  onChange={change} errors={errors} />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Role / Position</label>
              <select name="role" value={form.role} onChange={change}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 outline-none transition-all
                  ${errors.role
                    ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                    : "border-slate-200 bg-white focus:ring-2 focus:ring-orange-300 focus:border-orange-400"}`}>
                <option value="">Select a role...</option>
                <option value="Site Manager">Site Manager</option>
                <option value="Civil Engineer">Civil Engineer</option>
                <option value="Structural Engineer">Structural Engineer</option>
                <option value="Architect">Architect</option>
                <option value="Foreman">Foreman</option>
                <option value="Mason">Mason</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Welder">Welder</option>
                <option value="Steel Fixer">Steel Fixer</option>
                <option value="Painter">Painter</option>
                <option value="Scaffolder">Scaffolder</option>
                <option value="Heavy Equipment Operator">Heavy Equipment Operator</option>
                <option value="General Labourer">General Labourer</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <IconAlertTriangle /> {errors.role}
                </p>
              )}
            </div>
            <Field label="Salary (Rs)" name="salary" type="number" placeholder="e.g. 45000" value={form.salary} onChange={change} errors={errors} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Status</label>
            <select name="status" value={form.status} onChange={change}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 outline-none focus:ring-2 focus:ring-orange-300">
              <option value="active">Active</option>
              <option value="on leave">On Leave</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-7 py-5 bg-slate-50 border-t border-slate-100">
          <button onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold shadow-md shadow-orange-200 transition-colors">
            <IconCheck /> Add Worker
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ANALYTICS TAB (light theme) ───────────────────────────────────────────────
function WorkerAnalytics({ workers }) {
  const [period, setPeriod] = useState("month");

  const roleMap = {};
  workers.forEach(w => { const r = w.role || "Other"; roleMap[r] = (roleMap[r] || 0) + 1; });
  const ROLE_COLORS = ["#ea580c","#2563eb","#059669","#9333ea","#d97706","#dc2626","#0891b2","#65a30d"];
  const roleData = Object.entries(roleMap).map(([name, value], i) => ({ name, value, color: ROLE_COLORS[i % ROLE_COLORS.length] }));

  const seed = (n) => ((n * 1103515245 + 12345) & 0x7fffffff);
  const attendanceData = workers.slice(0, 8).map((w, i) => {
    const s = seed(i + 1);
    const rate = 75 + (s % 23);
    return { name: (w.name || "Worker").split(" ")[0], present: 18 + (s % 8), absent: 1 + (s % 4), rate };
  });

  const trendData = [
    { month: "Jan", rate: 82, tasks: 34 },
    { month: "Feb", rate: 85, tasks: 41 },
    { month: "Mar", rate: 79, tasks: 38 },
    { month: "Apr", rate: 88, tasks: 52 },
    { month: "May", rate: 91, tasks: 60 },
    { month: "Jun", rate: 87, tasks: 55 },
  ];

  const topPerformers = [...attendanceData].sort((a, b) => b.rate - a.rate).slice(0, 5);
  const avgRate = attendanceData.length
    ? Math.round(attendanceData.reduce((s, w) => s + w.rate, 0) / attendanceData.length) : 0;
  const atRisk = attendanceData.filter(w => w.rate < 80).length;

  return (
    <div className="space-y-5">
      {/* Period filter */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-black text-slate-800">Worker Analytics</h2>
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 border border-slate-200">
          {["week","month","quarter"].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                period === p
                  ? "bg-orange-600 text-white shadow-sm shadow-orange-200"
                  : "text-slate-500 hover:text-slate-800"}`}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Workers",  value: workers.length,  sub: "across all sites", icon: <IconUsers size={18} color="#ea580c" />, bg: "bg-orange-50",  border: "border-orange-100", val: "text-orange-600" },
          { label: "Avg Attendance", value: `${avgRate}%`,   sub: "this month",       icon: <IconUserCheck size={18} color="#059669" />, bg: "bg-emerald-50", border: "border-emerald-100", val: "text-emerald-600" },
          { label: "Roles Covered",  value: roleData.length, sub: "unique positions",  icon: <IconBarChart size={18} color="#2563eb" />, bg: "bg-blue-50",   border: "border-blue-100",   val: "text-blue-600" },
          { label: "At Risk",        value: atRisk,          sub: "< 80% attendance", icon: <IconAlertTriangle />, bg: "bg-red-50",    border: "border-red-100",    val: "text-red-500" },
        ].map(s => (
          <div key={s.label} className={`bg-white rounded-2xl border ${s.border} p-4 flex items-start gap-3 shadow-sm`}>
            <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              {s.icon}
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-0.5">{s.label}</p>
              <p className={`text-2xl font-black ${s.val}`}>{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Attendance bar */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-bold text-slate-700 mb-4">Attendance Rate by Worker</h3>
          {attendanceData.length > 0 ? (
            <>
              <AttendanceBarChart data={attendanceData} height={200} />
              <div className="flex gap-4 mt-3 justify-center flex-wrap">
                {[["#059669","≥ 90% Excellent"],["#ea580c","80–89% Good"],["#dc2626","< 80% At Risk"]].map(([c,l]) => (
                  <span key={l} className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="w-2 h-2 rounded-sm" style={{ background: c }} />{l}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div className="h-48 flex items-center justify-center text-slate-400 text-sm">No worker data yet</div>
          )}
        </div>

        {/* Monthly trend */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-bold text-slate-700 mb-4">Monthly Trend — Attendance & Tasks</h3>
          <TrendLineChart data={trendData} height={200} />
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Role donut */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-bold text-slate-700 mb-4">Role Distribution</h3>
          {roleData.length > 0 ? (
            <div className="flex items-center gap-6">
              <DonutChart data={roleData} size={140} />
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                {roleData.map((r, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-600 truncate">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: r.color }} />
                      {r.name}
                    </span>
                    <span className="text-slate-400 ml-2 flex-shrink-0">
                      {r.value} <span className="text-slate-300">({Math.round(r.value / workers.length * 100)}%)</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center text-slate-400 text-sm">No role data</div>
          )}
        </div>

        {/* Top performers */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-bold text-slate-700 mb-4">Top Performers</h3>
          {topPerformers.length > 0 ? (
            <div className="space-y-3">
              {topPerformers.map((w, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                    i === 0 ? "bg-yellow-100 text-yellow-600" :
                    i === 1 ? "bg-slate-100 text-slate-500" :
                    i === 2 ? "bg-orange-100 text-orange-500" :
                              "bg-slate-50 text-slate-400"}`}>{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-slate-700 font-semibold truncate">{w.name}</span>
                      <span className="text-xs font-bold text-orange-600 ml-2">{w.rate}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${w.rate}%`, background: w.rate >= 90 ? "linear-gradient(90deg,#059669,#34d399)" : "linear-gradient(90deg,#ea580c,#fb923c)" }} />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs text-emerald-600 font-semibold">{w.present}d</div>
                    <div className="text-xs text-slate-400">{w.absent}d off</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center text-slate-400 text-sm">No data yet</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── STATUS BADGE (light) ──────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const s = (status || "").toLowerCase();
  const cfg = {
    active:     "bg-emerald-50 text-emerald-700 border-emerald-200",
    "on leave": "bg-amber-50 text-amber-700 border-amber-200",
  };
  const cls = cfg[s] || "bg-red-50 text-red-700 border-red-200";
  const dot = s === "active" ? "bg-emerald-500" : s === "on leave" ? "bg-amber-500" : "bg-red-500";
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-semibold border ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {status || "inactive"}
    </span>
  );
}

// ── WORKERS PAGE ──────────────────────────────────────────────────────────────
export default function Workers({ workers, setWorkers }) {
  const [showModal, setShowModal] = useState(false);
  const [search,    setSearch]    = useState("");
  const [loading,   setLoading]   = useState(!workers.length);
  const [activeTab, setActiveTab] = useState("list");

  React.useEffect(() => {
    if (workers.length > 0) { setLoading(false); return; }
    const fetchWorkers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res  = await fetch("http://localhost:5000/api/workers", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (Array.isArray(data)) setWorkers(data);
      } catch (err) { console.log("Error loading workers", err); }
      setLoading(false);
    };
    fetchWorkers();
  }, []);

  const handleAddWorker = (newWorker) => setWorkers((prev) => [newWorker, ...prev]);

  const handleDelete = async (id, index) => {
    if (!window.confirm("Are you sure you want to delete this worker?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/workers/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) setWorkers((prev) => prev.filter((_, i) => i !== index));
      else alert("Delete failed on server.");
    } catch (err) { console.log("Delete failed", err); }
  };

  const filtered = workers.filter(w =>
    (w.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (w.role || "").toLowerCase().includes(search.toLowerCase())
  );

  const avgSalary = workers.length
    ? Math.round(workers.reduce((s, w) => s + Number(w.salary || 0), 0) / workers.length) : 0;

  const stats = [
    { label: "Total Workers", value: workers.length,                                        icon: <IconUsers />,      bg: "bg-orange-50",  border: "border-orange-100" },
    { label: "Active",        value: workers.filter(w => w.status === "active").length,     icon: <IconUserCheck />,  bg: "bg-emerald-50", border: "border-emerald-100" },
    { label: "On Leave",      value: workers.filter(w => w.status === "on leave").length,   icon: <IconUserMinus />,  bg: "bg-amber-50",   border: "border-amber-100" },
    { label: "Avg Salary",    value: `Rs ${avgSalary.toLocaleString()}`,                    icon: <IconDollarSign />, bg: "bg-purple-50",  border: "border-purple-100" },
  ];

  const tabs = [
    { id: "list",      label: "All Workers", icon: <IconList size={14} /> },
    { id: "analytics", label: "Analytics",   icon: <IconBarChart size={14} /> },
  ];

  return (
    <div className="p-7 space-y-6">
      {showModal && <AddWorkerModal onClose={() => setShowModal(false)} onAdd={handleAddWorker} />}

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Workers</h1>
          <p className="text-slate-400 text-sm mt-1">Manage all construction workers</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-orange-200 transition-colors">
          <IconPlus /> Add Worker
        </button>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className={`bg-white rounded-2xl border ${s.border} p-5 flex items-start gap-4 shadow-sm`}>
            <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center shrink-0`}>
              {s.icon}
            </div>
            <div>
              <p className="text-slate-400 text-xs mb-1">{s.label}</p>
              <p className="text-2xl font-black text-slate-800">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 bg-slate-100 border border-slate-200 rounded-xl p-1 w-fit">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === t.id
                ? "bg-orange-600 text-white shadow-md shadow-orange-200"
                : "text-slate-500 hover:text-slate-800"}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab: All Workers ── */}
      {activeTab === "list" && (
        <>
          {/* Search */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <IconSearch />
              </span>
              <input type="text" placeholder="Search workers by name or role..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 text-sm text-slate-700 transition-all" />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                All Workers
                <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {filtered.length}
                </span>
              </h2>
            </div>

            {loading ? (
              <div className="text-center py-10 text-slate-400 text-sm">Loading workers...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-sm">No workers found. Add a new worker!</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider">
                      <th className="text-left px-6 py-3 font-semibold">Name</th>
                      <th className="text-left px-4 py-3 font-semibold">Role</th>
                      <th className="text-left px-4 py-3 font-semibold">Phone</th>
                      <th className="text-left px-4 py-3 font-semibold">Salary</th>
                      <th className="text-left px-4 py-3 font-semibold">Status</th>
                      <th className="text-center px-4 py-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filtered.map((w, i) => (
                      <tr key={w._id || i} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center shrink-0">
                              <IconHardHat size={17} color="#ea580c" />
                            </div>
                            <p className="font-semibold text-slate-800">{w.name}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-slate-600">{w.role}</td>
                        <td className="px-4 py-4 text-slate-600">{w.phone}</td>
                        <td className="px-4 py-4 text-slate-600 font-medium">Rs {Number(w.salary || 0).toLocaleString()}</td>
                        <td className="px-4 py-4"><StatusBadge status={w.status} /></td>
                        <td className="px-4 py-4 text-center">
                          <button onClick={() => handleDelete(w._id, i)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 hover:bg-red-100 text-red-500 border border-red-200 transition-all">
                            <IconTrash /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Tab: Analytics ── */}
      {activeTab === "analytics" && <WorkerAnalytics workers={workers} />}
    </div>
  );
}