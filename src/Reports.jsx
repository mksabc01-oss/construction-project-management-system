import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import ExportButtons from "./ExportButtons";

// ── API HELPERS ──────────────────────────────────────────────
const token    = () => localStorage.getItem("token");
const authHdr  = () => ({ "Authorization": `Bearer ${token()}` });
const API_PROJ = "http://localhost:5000/api/projects";
const API_WORK = "http://localhost:5000/api/workers";
const API_SITE = "http://localhost:5000/api/sites";

// ── COLORS ───────────────────────────────────────────────────
const STATUS_CLR  = { "On Track":"#10b981","Delayed":"#ef4444","At Risk":"#f59e0b","Completed":"#3b82f6" };
const SITE_CLR    = { "Active":"#10b981","Inactive":"#94a3b8","On Hold":"#f59e0b","Closed":"#ef4444" };
const INSP_CLR    = { Pass:"#10b981",Fail:"#ef4444",Conditional:"#f59e0b",Pending:"#3b82f6" };
const ROLE_PALETTE= ["#f97316","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#3b82f6","#ec4899","#84cc16"];

// ── ICONS ────────────────────────────────────────────────────
const Ic = ({ d, size=18, color="currentColor", fill="none", sw=2, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p,i) => <path key={i} d={p}/>) : <path d={d}/>}{children}
  </svg>
);
const IcBar      = p => <Ic {...p} d={["M18 20V10","M12 20V4","M6 20v-6","M2 20h20"]} />;
const IcProject  = p => <Ic {...p} d={["M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z","M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5","M4 15v-3a8 8 0 0 1 16 0v3"]} />;
const IcWorker   = p => <Ic {...p} d={["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M23 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75"]}><circle cx="9" cy="7" r="4" fill="none" stroke={p.color||"currentColor"} strokeWidth={2}/></Ic>;
const IcSite     = p => <Ic {...p} d={["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"]}><circle cx="12" cy="10" r="3" fill="none" stroke={p.color||"currentColor"} strokeWidth={2}/></Ic>;
const IcInsp     = p => <Ic {...p} d={["M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2","M9 12l2 2 4-4"]}><rect x="9" y="3" width="6" height="4" rx="1" fill="none" stroke={p.color||"currentColor"} strokeWidth={2}/></Ic>;
const IcTrend    = p => <Ic {...p} d={["M23 6L13.5 15.5 8.5 10.5 1 18","M17 6h6v6"]} />;
const IcDownload = p => <Ic {...p} d={["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4","M7 10l5 5 5-5","M12 15V3"]} />;
const IcRefresh  = p => <Ic {...p} d={["M23 4v6h-6","M1 20v-6h6","M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"]} />;

// ── CUSTOM TOOLTIP ────────────────────────────────────────────
const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{background:"#0f172a",border:"1px solid #334155",borderRadius:12,padding:"10px 14px"}}>
      {label && <p style={{color:"#cbd5e1",fontWeight:700,fontSize:12,marginBottom:6}}>{label}</p>}
      {payload.map((p,i) => (
        <p key={i} style={{display:"flex",alignItems:"center",gap:8,fontSize:11,margin:"2px 0"}}>
          <span style={{width:8,height:8,borderRadius:"50%",background:p.color||p.fill,display:"inline-block"}}/>
          <span style={{color:"#94a3b8"}}>{p.name}:</span>
          <span style={{color:"#fff",fontWeight:700}}>{p.value}</span>
        </p>
      ))}
    </div>
  );
};

// ── STAT CARD ─────────────────────────────────────────────────
function StatCard({ label, value, sub, icon, bg, color, subColor }) {
  return (
    <div className={`bg-white rounded-2xl border shadow-sm p-5 flex items-center gap-4 ${bg}`}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${bg}`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-slate-400 text-xs font-medium mb-0.5">{label}</p>
        <p className={`text-2xl font-black leading-none ${color}`}>{value}</p>
        {sub && <p className={`text-xs font-semibold mt-1 ${subColor||"text-slate-400"}`}>{sub}</p>}
      </div>
    </div>
  );
}

// ── PROGRESS BAR ─────────────────────────────────────────────
function ProgressBar({ value, color="#f97316", height=8 }) {
  return (
    <div className="w-full bg-slate-100 rounded-full overflow-hidden" style={{height}}>
      <div className="h-full rounded-full transition-all duration-700"
        style={{width:`${Math.min(100,value)}%`,background:color}}/>
    </div>
  );
}

// ── EMPTY STATE ───────────────────────────────────────────────
function Empty({ label="No data yet" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-slate-300">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
      <p className="text-xs font-semibold text-slate-400">{label}</p>
    </div>
  );
}

// ── DONUT CHART (pure SVG — no Recharts, guaranteed to render) ─
function DonutChart({ data, colorMap, size=220 }) {
  if (!data || data.length === 0) return <Empty label="No data yet" />;
  const total = data.reduce((s,d) => s + d.value, 0);
  if (total === 0) return <Empty label="No data yet" />;
  const cx = size/2, cy = size/2 - 10, r = size*0.34, ir = size*0.22;
  let angle = -Math.PI/2;
  const slices = data.map(d => {
    const pct = d.value / total;
    const start = angle;
    angle += pct * 2 * Math.PI;
    const end = angle;
    return { ...d, start, end, pct };
  });
  const arc = (cx,cy,r,a1,a2) => {
    const x1=cx+r*Math.cos(a1), y1=cy+r*Math.sin(a1);
    const x2=cx+r*Math.cos(a2), y2=cy+r*Math.sin(a2);
    const large = (a2-a1) > Math.PI ? 1 : 0;
    return `M${x1},${y1} A${r},${r},0,${large},1,${x2},${y2}`;
  };
  const legendY = size - 30;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {slices.map((s,i) => {
        const gap = 0.04;
        const a1 = s.start + gap, a2 = s.end - gap;
        if (a2 <= a1) return null;
        const outerArc = arc(cx,cy,r,a1,a2);
        const innerArc = arc(cx,cy,ir,a2,a1);
        const ix1=cx+ir*Math.cos(a2), iy1=cy+ir*Math.sin(a2);
        const ix2=cx+ir*Math.cos(a1), iy2=cy+ir*Math.sin(a1);
        const ox1=cx+r*Math.cos(a1), oy1=cy+r*Math.sin(a1);
        const fill = colorMap?.[s.name] || ROLE_PALETTE[i % ROLE_PALETTE.length];
        const d = `${outerArc} L${ix1},${iy1} A${ir},${ir},0,${(a2-a1)>Math.PI?1:0},0,${ix2},${iy2} L${ox1},${oy1} Z`;
        return <path key={s.name} d={d} fill={fill} opacity={0.92}/>;
      })}
      <text x={cx} y={cy-4} textAnchor="middle" fontSize={size*0.12} fontWeight="900" fill="#1e293b">{total}</text>
      <text x={cx} y={cy+14} textAnchor="middle" fontSize={size*0.055} fill="#94a3b8">total</text>
      {slices.map((s,i) => {
        const cols = Math.min(slices.length, 3);
        const colW = size / cols;
        const col  = i % cols;
        const row  = Math.floor(i / cols);
        const lx   = col * colW + 8;
        const ly   = legendY + row * 16;
        const fill = colorMap?.[s.name] || ROLE_PALETTE[i % ROLE_PALETTE.length];
        return (
          <g key={s.name}>
            <circle cx={lx+5} cy={ly} r={4} fill={fill}/>
            <text x={lx+13} y={ly+4} fontSize={size*0.052} fill="#64748b">{s.name} ({s.value})</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── VERTICAL BAR CHART (pure SVG — for Project Progress) ───────
function VerticalBarChart({ data, colorMap, dataKey="progress", height=260, domainMax=100 }) {
  if (!data || data.length === 0) return <Empty label="No data yet" />;
  const width = 520;
  const padding = { top: 14, right: 10, bottom: 54, left: 34 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const gridVals = [0, 25, 50, 75, 100].filter(v => v <= domainMax);
  const gap = 12;
  const barW = data.length ? Math.max(14, chartW / data.length - gap) : 0;
  const yScale = v => padding.top + chartH - (v / domainMax) * chartH;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="xMidYMid meet">
      {gridVals.map(v => (
        <g key={v}>
          <line x1={padding.left} x2={width - padding.right} y1={yScale(v)} y2={yScale(v)} stroke="#e2e8f0" strokeWidth="1"/>
          <text x={padding.left - 8} y={yScale(v) + 4} textAnchor="end" fontSize="10" fill="#94a3b8">{v}</text>
        </g>
      ))}
      {data.map((d, i) => {
        const x = padding.left + i * (barW + gap) + gap / 2;
        const val = Number(d[dataKey]) || 0;
        const barH = Math.max(0, (val / domainMax) * chartH);
        const y = padding.top + chartH - barH;
        const fill = colorMap?.[d.status] || colorMap?.[d.name] || "#f97316";
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} rx="6" fill={fill} opacity="0.92">
              <title>{`${d.name}: ${val}%`}</title>
            </rect>
            <text x={x + barW / 2} y={height - padding.bottom + 12} textAnchor="end" fontSize="10" fill="#94a3b8"
              transform={`rotate(-35 ${x + barW / 2} ${height - padding.bottom + 12})`}>
              {d.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── HORIZONTAL BAR CHART (pure SVG — for Status Distribution) ──
function HorizontalBarChart({ data, colorMap, height=260 }) {
  if (!data || data.length === 0) return <Empty label="No data yet" />;
  const width = 520;
  const padding = { top: 10, right: 40, bottom: 10, left: 92 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const max = Math.max(...data.map(d => d.value), 1);
  const gap = 14;
  const barH = data.length ? Math.max(16, chartH / data.length - gap) : 0;
  const xScale = v => (v / max) * chartW;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="xMidYMid meet">
      {data.map((d, i) => {
        const y = padding.top + i * (barH + gap) + gap / 2;
        const w = xScale(d.value);
        const fill = colorMap?.[d.name] || "#94a3b8";
        return (
          <g key={d.name}>
            <text x={padding.left - 8} y={y + barH / 2 + 4} textAnchor="end" fontSize="11" fill="#64748b" fontWeight="600">{d.name}</text>
            <rect x={padding.left} y={y} width={Math.max(2, w)} height={barH} rx="6" fill={fill} opacity="0.92">
              <title>{`${d.name}: ${d.value}`}</title>
            </rect>
            <text x={padding.left + w + 8} y={y + barH / 2 + 4} fontSize="11" fill="#334155" fontWeight="700">{d.value}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ════════════════════════════════════════════════════════════
export default function Reports({ projects:propProjects=[], workers:propWorkers=[], sites:propSites=[] }) {
  const [projects, setProjects] = useState(propProjects);
  const [workers,  setWorkers]  = useState(propWorkers);
  const [sites,    setSites]    = useState(propSites);
  const [loading,  setLoading]  = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // ── ref for PDF/CSV export ───────────────────────────────────
  const reportContentRef = useRef(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [pRes,wRes,sRes] = await Promise.all([
        fetch(API_PROJ,{headers:authHdr()}),
        fetch(API_WORK,{headers:authHdr()}),
        fetch(API_SITE,{headers:authHdr()}),
      ]);
      const [p,w,s] = await Promise.all([pRes.json(),wRes.json(),sRes.json()]);
      if (Array.isArray(p) && p.length>0) setProjects(p);
      if (Array.isArray(w) && w.length>0) setWorkers(w);
      if (Array.isArray(s) && s.length>0) setSites(s);
      setLastSync(new Date());
    } catch(e){ console.error("Reports fetch failed:",e); }
    setLoading(false);
  };
  useEffect(()=>{ fetchAll(); },[]);

  // ── Stats ────────────────────────────────────────────────────
  const projStats = useMemo(()=>{
    const total=projects.length;
    const onTrack=projects.filter(p=>p.status==="On Track").length;
    const delayed=projects.filter(p=>p.status==="Delayed").length;
    const atRisk=projects.filter(p=>p.status==="At Risk").length;
    const completed=projects.filter(p=>p.status==="Completed").length;
    const avgProg=total?Math.round(projects.reduce((s,p)=>s+(Number(p.progress)||0),0)/total):0;
    return {total,onTrack,delayed,atRisk,completed,avgProg};
  },[projects]);

  const wrkStats = useMemo(()=>{
    const total=workers.length;
    const active=workers.filter(w=>(w.status||"").toLowerCase()==="active").length;
    const onLeave=workers.filter(w=>(w.status||"").toLowerCase()==="on leave").length;
    const inactive=workers.filter(w=>(w.status||"").toLowerCase()==="inactive").length;
    const totalSal=workers.reduce((s,w)=>s+Number(w.salary||0),0);
    const avgSal=total?Math.round(totalSal/total):0;
    return {total,active,onLeave,inactive,totalSal,avgSal};
  },[workers]);

  const siteStats = useMemo(()=>{
    const total=sites.length;
    const active=sites.filter(s=>s.status==="Active").length;
    const totalInsp=sites.reduce((s,si)=>s+(si.inspections?.length||0),0);
    const passInsp=sites.reduce((s,si)=>s+(si.inspections||[]).filter(i=>i.result==="Pass").length,0);
    const failInsp=sites.reduce((s,si)=>s+(si.inspections||[]).filter(i=>i.result==="Fail").length,0);
    const passRate=totalInsp?Math.round((passInsp/totalInsp)*100):0;
    return {total,active,totalInsp,passInsp,failInsp,passRate};
  },[sites]);

  // ── Chart data ────────────────────────────────────────────────
  const projStatusData = useMemo(()=>{
    const c={};
    projects.forEach(p=>{if(p.status) c[p.status]=(c[p.status]||0)+1;});
    return Object.entries(c).map(([name,value])=>({name,value}));
  },[projects]);

  const projProgressData = useMemo(()=>
    [...projects].sort((a,b)=>(Number(b.progress)||0)-(Number(a.progress)||0)).slice(0,8)
      .map(p=>({name:p.name.length>16?p.name.slice(0,16)+"…":p.name,progress:Number(p.progress)||0,status:p.status}))
  ,[projects]);

  const workerRoleData = useMemo(()=>{
    const c={};
    workers.forEach(w=>{if(w.role) c[w.role]=(c[w.role]||0)+1;});
    return Object.entries(c).sort((a,b)=>b[1]-a[1]).map(([name,count])=>({name,count}));
  },[workers]);

  const workerStatusData = useMemo(()=>[
    {name:"Active",  value:wrkStats.active,  fill:"#10b981"},
    {name:"On Leave",value:wrkStats.onLeave, fill:"#f59e0b"},
    {name:"Inactive",value:wrkStats.inactive,fill:"#ef4444"},
  ].filter(d=>d.value>0),[wrkStats]);

  const siteStatusData = useMemo(()=>{
    const c={};
    sites.forEach(s=>{if(s.status) c[s.status]=(c[s.status]||0)+1;});
    return Object.entries(c).map(([name,value])=>({name,value}));
  },[sites]);

  const inspResultData = useMemo(()=>{
    const c={Pass:0,Fail:0,Conditional:0,Pending:0};
    sites.forEach(s=>(s.inspections||[]).forEach(i=>{if(c[i.result]!==undefined)c[i.result]++;}));
    return Object.entries(c).filter(([,v])=>v>0).map(([name,value])=>({name,value}));
  },[sites]);

  const topSitesData = useMemo(()=>
    [...sites].sort((a,b)=>(b.inspections?.length||0)-(a.inspections?.length||0)).slice(0,6)
      .map(s=>({
        name:s.name.length>16?s.name.slice(0,16)+"…":s.name,
        inspections:s.inspections?.length||0,
        workers:s.workers?.filter(w=>w.status==="Active").length||0,
      }))
  ,[sites]);

  const salaryRangeData = useMemo(()=>{
    const r={"<30k":0,"30-50k":0,"50-75k":0,"75k+":0};
    workers.forEach(w=>{const s=Number(w.salary||0);if(s<30000)r["<30k"]++;else if(s<50000)r["30-50k"]++;else if(s<75000)r["50-75k"]++;else r["75k+"]++;});
    return Object.entries(r).map(([name,count])=>({name,count}));
  },[workers]);

  const avgScoreData = useMemo(()=>
    sites.filter(s=>s.inspections?.some(i=>i.score))
      .map(s=>{const sc=s.inspections.filter(i=>i.score);const avg=sc.reduce((s,i)=>s+Number(i.score),0)/sc.length;return{name:s.name.length>14?s.name.slice(0,14)+"…":s.name,avg:Math.round(avg)};})
      .sort((a,b)=>b.avg-a.avg)
  ,[sites]);

  // ── CSV Export ────────────────────────────────────────────────
  const exportCSV = type => {
    let rows=[],header=[];
    if(type==="projects"){header=["Name","Site","Progress","Status","Workers","Budget"];rows=projects.map(p=>[p.name,p.site,p.progress,p.status,p.workers,p.budget]);}
    else if(type==="workers"){header=["Name","Role","Phone","Salary","Status"];rows=workers.map(w=>[w.name,w.role,w.phone,w.salary,w.status]);}
    else if(type==="sites"){header=["Name","Address","District","Status","Inspections","Active Workers","Assigned Project"];rows=sites.map(s=>[s.name,s.address,s.district,s.status,s.inspections?.length||0,s.workers?.filter(w=>w.status==="Active").length||0,s.assignedProject?.name||"—"]);}
    const csv=[header,...rows].map(r=>r.map(v=>`"${String(v||"").replace(/"/g,'""')}"`).join(",")).join("\n");
    const a=document.createElement("a");a.href="data:text/csv;charset=utf-8,"+encodeURIComponent(csv);a.download=`${type}_report_${new Date().toISOString().slice(0,10)}.csv`;a.click();
  };

  const tabs=[{id:"overview",label:"Overview"},{id:"projects",label:"Projects"},{id:"workers",label:"Workers"},{id:"sites",label:"Sites"},{id:"inspections",label:"Inspections"}];

  return (
    <div className="min-h-screen bg-slate-100 p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <IcBar size={24} color="#f97316"/> Reports & Analytics
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Live data across all projects, workers &amp; sites
            {lastSync && <span className="ml-2 text-slate-300">· Last updated {lastSync.toLocaleTimeString()}</span>}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={fetchAll} disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 shadow-sm transition-all disabled:opacity-50">
            <IcRefresh size={15} color="#64748b"/>
            {loading?"Refreshing…":"Refresh"}
          </button>

          {/* ── PDF + CSV export buttons ── */}
          <ExportButtons
  contentRef={reportContentRef}
  reportName="cpms-monthly-report"
  projects={projects}
  workers={workers}
  sites={sites}
/>

          <div className="flex items-center gap-1.5">
            {["projects","workers","sites"].map(t=>(
              <button key={t} onClick={()=>exportCSV(t)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-all">
                <IcDownload size={13} color="#fff"/>
                {t.charAt(0).toUpperCase()+t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Projects"  value={projStats.total}         sub={`${projStats.onTrack} on track`}    icon={<IcProject size={22} color="#ea580c"/>} bg="bg-orange-50  border-orange-100"  color="text-orange-700"  subColor="text-orange-500"/>
        <StatCard label="Avg Progress"    value={`${projStats.avgProg}%`} sub="across all projects"                icon={<IcTrend   size={22} color="#2563eb"/>} bg="bg-blue-50    border-blue-100"    color="text-blue-700"    subColor="text-blue-500"/>
        <StatCard label="Active Workers"  value={wrkStats.active}         sub={`${wrkStats.total} total`}          icon={<IcWorker  size={22} color="#7c3aed"/>} bg="bg-violet-50  border-violet-100"  color="text-violet-700"  subColor="text-violet-500"/>
        <StatCard label="Active Sites"    value={siteStats.active}        sub={`${siteStats.total} registered`}    icon={<IcSite    size={22} color="#059669"/>} bg="bg-emerald-50 border-emerald-100" color="text-emerald-700" subColor="text-emerald-500"/>
        <StatCard label="Inspection Pass" value={`${siteStats.passRate}%`}sub={`${siteStats.totalInsp} total`}    icon={<IcInsp    size={22} color="#0d9488"/>} bg="bg-teal-50    border-teal-100"    color="text-teal-700"    subColor="text-teal-500"/>
      </div>

      {/* Tabs + exportable content */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-1 px-6 pt-4 border-b border-slate-100 overflow-x-auto">
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setActiveTab(t.id)}
              className={`px-5 py-2.5 text-sm font-bold rounded-t-xl transition-all border-b-2 whitespace-nowrap ${activeTab===t.id?"border-orange-500 text-orange-600 bg-orange-50":"border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── ref wraps the tab body so PDF/CSV captures exactly this ── */}
        <div className="p-6" ref={reportContentRef}>

          {/* ══ OVERVIEW ══ */}
          {activeTab==="overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                  <p className="text-sm font-black text-slate-700 mb-3">Project Status</p>
                  <div className="flex justify-center">
                    <DonutChart data={projStatusData} colorMap={STATUS_CLR} size={220}/>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                  <p className="text-sm font-black text-slate-700 mb-3">Worker Status</p>
                  <div className="flex justify-center">
                    <DonutChart data={workerStatusData} colorMap={null} size={220}/>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                  <p className="text-sm font-black text-slate-700 mb-3">Site Status</p>
                  <div className="flex justify-center">
                    <DonutChart data={siteStatusData} colorMap={SITE_CLR} size={220}/>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-3">
                  <p className="text-sm font-black text-slate-700">Project Summary</p>
                  {[
                    {label:"On Track", count:projStats.onTrack,  clr:"#10b981"},
                    {label:"Delayed",  count:projStats.delayed,  clr:"#ef4444"},
                    {label:"At Risk",  count:projStats.atRisk,   clr:"#f59e0b"},
                    {label:"Completed",count:projStats.completed,clr:"#3b82f6"},
                  ].map(r=>(
                    <div key={r.label} className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{background:r.clr}}/>
                      <span className="text-sm text-slate-600 flex-1">{r.label}</span>
                      <span className="text-sm font-black text-slate-800">{r.count}</span>
                      <div className="w-20"><ProgressBar value={projStats.total?(r.count/projStats.total)*100:0} color={r.clr} height={6}/></div>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Avg Progress</span>
                    <span className="text-lg font-black text-orange-600">{projStats.avgProg}%</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-3">
                  <p className="text-sm font-black text-slate-700">Workforce Summary</p>
                  {[
                    {label:"Active",  count:wrkStats.active,  clr:"#10b981"},
                    {label:"On Leave",count:wrkStats.onLeave, clr:"#f59e0b"},
                    {label:"Inactive",count:wrkStats.inactive,clr:"#ef4444"},
                  ].map(r=>(
                    <div key={r.label} className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{background:r.clr}}/>
                      <span className="text-sm text-slate-600 flex-1">{r.label}</span>
                      <span className="text-sm font-black text-slate-800">{r.count}</span>
                      <div className="w-20"><ProgressBar value={wrkStats.total?(r.count/wrkStats.total)*100:0} color={r.clr} height={6}/></div>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2">
                    <div><p className="text-xs text-slate-400">Avg Salary</p><p className="text-sm font-black text-violet-600">Rs {wrkStats.avgSal.toLocaleString()}</p></div>
                    <div><p className="text-xs text-slate-400">Total Payroll</p><p className="text-sm font-black text-slate-700">Rs {wrkStats.totalSal.toLocaleString()}</p></div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-3">
                  <p className="text-sm font-black text-slate-700">Site Summary</p>
                  {[
                    {label:"Active",  count:sites.filter(s=>s.status==="Active").length,   clr:"#10b981"},
                    {label:"On Hold", count:sites.filter(s=>s.status==="On Hold").length,  clr:"#f59e0b"},
                    {label:"Inactive",count:sites.filter(s=>s.status==="Inactive").length, clr:"#94a3b8"},
                    {label:"Closed",  count:sites.filter(s=>s.status==="Closed").length,   clr:"#ef4444"},
                  ].map(r=>(
                    <div key={r.label} className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{background:r.clr}}/>
                      <span className="text-sm text-slate-600 flex-1">{r.label}</span>
                      <span className="text-sm font-black text-slate-800">{r.count}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2">
                    <div><p className="text-xs text-slate-400">Inspections</p><p className="text-sm font-black text-teal-600">{siteStats.totalInsp}</p></div>
                    <div><p className="text-xs text-slate-400">Pass Rate</p><p className="text-sm font-black text-emerald-600">{siteStats.passRate}%</p></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══ PROJECTS ══ */}
          {activeTab==="projects" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                  <p className="text-sm font-black text-slate-700 mb-4">Project Progress (Top 8)</p>
                  {projProgressData.length===0 ? <Empty label="No projects yet"/> :
                    <VerticalBarChart data={projProgressData} colorMap={STATUS_CLR} dataKey="progress" height={260} domainMax={100}/>
                  }
                </div>
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                  <p className="text-sm font-black text-slate-700 mb-4">Status Distribution</p>
                  {projStatusData.length===0 ? <Empty label="No projects yet"/> :
                    <HorizontalBarChart data={projStatusData} colorMap={STATUS_CLR} height={260}/>
                  }
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
                  <p className="text-sm font-black text-slate-700">All Projects Detail</p>
                  <button onClick={()=>exportCSV("projects")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-bold">
                    <IcDownload size={12} color="#fff"/> Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-white border-b border-slate-100 text-xs text-slate-400 uppercase tracking-wider">
                      <th className="text-left px-5 py-3">Project</th><th className="text-left px-4 py-3">Site</th>
                      <th className="text-left px-4 py-3">Progress</th><th className="text-left px-4 py-3">Status</th>
                      <th className="text-left px-4 py-3">Workers</th><th className="text-left px-4 py-3">Budget</th>
                    </tr></thead>
                    <tbody>
                      {projects.length===0
                        ? <tr><td colSpan={6} className="text-center py-8 text-slate-400 text-sm">No projects found</td></tr>
                        : projects.map((p,i)=>(
                          <tr key={p._id||i} className="border-b border-slate-100 last:border-0 hover:bg-white/70 transition-colors">
                            <td className="px-5 py-3 font-semibold text-slate-800">{p.name}</td>
                            <td className="px-4 py-3 text-slate-500 text-xs">{p.site}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-20"><ProgressBar value={Number(p.progress)||0} color={STATUS_CLR[p.status]||"#f97316"} height={6}/></div>
                                <span className="text-xs font-black text-slate-700">{p.progress}%</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg"
                                style={{background:(STATUS_CLR[p.status]||"#94a3b8")+"20",color:STATUS_CLR[p.status]||"#94a3b8"}}>
                                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{background:STATUS_CLR[p.status]||"#94a3b8"}}/>
                                {p.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-600 text-sm font-semibold">{p.workers}</td>
                            <td className="px-4 py-3 text-slate-600 text-sm">{p.budget}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══ WORKERS ══ */}
          {activeTab==="workers" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                  <p className="text-sm font-black text-slate-700 mb-4">Workers by Role</p>
                  {workerRoleData.length===0 ? <Empty label="No workers yet"/> :
                    <div style={{width:"100%",height:260}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={workerRoleData} layout="vertical" barCategoryGap="20%">
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false}/>
                          <XAxis type="number" tick={{fontSize:10,fill:"#94a3b8"}}/>
                          <YAxis dataKey="name" type="category" tick={{fontSize:10,fill:"#64748b"}} width={100}/>
                          <Tooltip content={<Tip/>}/>
                          <Bar dataKey="count" name="Workers" radius={[0,6,6,0]}>
                            {workerRoleData.map((_,i)=><Cell key={i} fill={ROLE_PALETTE[i%ROLE_PALETTE.length]}/>)}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  }
                </div>
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                  <p className="text-sm font-black text-slate-700 mb-4">Salary Distribution (Rs)</p>
                  {salaryRangeData.every(d=>d.count===0) ? <Empty label="No salary data"/> :
                    <div style={{width:"100%",height:260}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salaryRangeData} barCategoryGap="30%">
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false}/>
                          <XAxis dataKey="name" tick={{fontSize:11,fill:"#94a3b8"}}/>
                          <YAxis tick={{fontSize:10,fill:"#94a3b8"}}/>
                          <Tooltip content={<Tip/>}/>
                          <Bar dataKey="count" name="Workers" fill="#8b5cf6" radius={[6,6,0,0]}/>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  }
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                  <p className="text-sm font-black text-slate-700 mb-4">Role Share</p>
                  {workerRoleData.length===0 ? <Empty label="No workers yet"/> :
                    <div style={{width:"100%",height:220}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={workerRoleData.map(w=>({name:w.name,value:w.count}))} cx="50%" cy="50%" outerRadius={90} dataKey="value">
                            {workerRoleData.map((_,i)=><Cell key={i} fill={ROLE_PALETTE[i%ROLE_PALETTE.length]}/>)}
                          </Pie>
                          <Tooltip content={<Tip/>}/>
                          <Legend wrapperStyle={{fontSize:10}}/>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  }
                </div>
                <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                  <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
                    <p className="text-sm font-black text-slate-700">Workforce ({workers.length})</p>
                    <button onClick={()=>exportCSV("workers")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-bold">
                      <IcDownload size={12} color="#fff"/> Export
                    </button>
                  </div>
                  <div className="overflow-y-auto max-h-52">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-white">
                        <tr className="border-b border-slate-100 text-xs text-slate-400 uppercase">
                          <th className="text-left px-4 py-2.5">Name</th><th className="text-left px-4 py-2.5">Role</th>
                          <th className="text-left px-4 py-2.5">Salary</th><th className="text-left px-4 py-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {workers.map((w,i)=>(
                          <tr key={w._id||i} className="border-b border-slate-100 last:border-0 hover:bg-white/70">
                            <td className="px-4 py-2.5 font-semibold text-slate-700 text-xs">{w.name}</td>
                            <td className="px-4 py-2.5 text-slate-500 text-xs">{w.role}</td>
                            <td className="px-4 py-2.5 text-slate-600 text-xs font-semibold">Rs {Number(w.salary||0).toLocaleString()}</td>
                            <td className="px-4 py-2.5">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${(w.status||"").toLowerCase()==="active"?"bg-emerald-50 text-emerald-700":(w.status||"").toLowerCase()==="on leave"?"bg-amber-50 text-amber-700":"bg-red-50 text-red-700"}`}>{w.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══ SITES ══ */}
          {activeTab==="sites" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                  <p className="text-sm font-black text-slate-700 mb-4">Inspections & Workers per Site</p>
                  {topSitesData.length===0 ? <Empty label="No sites yet"/> :
                    <div style={{width:"100%",height:260}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={topSitesData} barCategoryGap="25%" barGap={3}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false}/>
                          <XAxis dataKey="name" tick={{fontSize:10,fill:"#94a3b8"}}/>
                          <YAxis tick={{fontSize:10,fill:"#94a3b8"}}/>
                          <Tooltip content={<Tip/>}/>
                          <Legend wrapperStyle={{fontSize:11}}/>
                          <Bar dataKey="inspections" name="Inspections" fill="#0d9488" radius={[4,4,0,0]}/>
                          <Bar dataKey="workers"     name="Workers"     fill="#7c3aed" radius={[4,4,0,0]}/>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  }
                </div>
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                  <p className="text-sm font-black text-slate-700 mb-3">Site Status Breakdown</p>
                  <div className="flex justify-center">
                    <DonutChart data={siteStatusData} colorMap={SITE_CLR} size={220}/>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
                  <p className="text-sm font-black text-slate-700">All Sites ({sites.length})</p>
                  <button onClick={()=>exportCSV("sites")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-bold">
                    <IcDownload size={12} color="#fff"/> Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-white border-b border-slate-100 text-xs text-slate-400 uppercase tracking-wider">
                      <th className="text-left px-5 py-3">Site Name</th><th className="text-left px-4 py-3">District</th>
                      <th className="text-left px-4 py-3">Status</th><th className="text-left px-4 py-3">Inspections</th>
                      <th className="text-left px-4 py-3">Workers</th><th className="text-left px-4 py-3">Assigned Project</th>
                    </tr></thead>
                    <tbody>
                      {sites.length===0
                        ? <tr><td colSpan={6} className="text-center py-8 text-slate-400 text-sm">No sites found</td></tr>
                        : sites.map((s,i)=>(
                          <tr key={s._id||i} className="border-b border-slate-100 last:border-0 hover:bg-white/70 transition-colors">
                            <td className="px-5 py-3"><p className="font-semibold text-slate-800 text-sm">{s.name}</p><p className="text-xs text-slate-400 mt-0.5">{s.address}</p></td>
                            <td className="px-4 py-3 text-slate-500 text-xs">{s.district||"—"}</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg"
                                style={{background:(SITE_CLR[s.status]||"#94a3b8")+"20",color:SITE_CLR[s.status]||"#94a3b8"}}>
                                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{background:SITE_CLR[s.status]||"#94a3b8"}}/>{s.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-teal-700 font-bold text-sm">{s.inspections?.length||0}</td>
                            <td className="px-4 py-3 text-violet-700 font-bold text-sm">{s.workers?.filter(w=>w.status==="Active").length||0}</td>
                            <td className="px-4 py-3">
                              {s.assignedProject
                                ? <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 truncate max-w-[140px]">{s.assignedProject.name}</span>
                                : <span className="text-slate-300 text-xs">—</span>}
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══ INSPECTIONS ══ */}
          {activeTab==="inspections" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {label:"Total",    value:siteStats.totalInsp,      color:"text-teal-700",    bg:"bg-teal-50    border-teal-100"},
                  {label:"Passed",   value:siteStats.passInsp,       color:"text-emerald-700", bg:"bg-emerald-50 border-emerald-100"},
                  {label:"Failed",   value:siteStats.failInsp,       color:"text-red-700",     bg:"bg-red-50     border-red-100"},
                  {label:"Pass Rate",value:`${siteStats.passRate}%`, color:"text-blue-700",    bg:"bg-blue-50    border-blue-100"},
                ].map(k=>(
                  <div key={k.label} className={`rounded-2xl border p-4 ${k.bg}`}>
                    <p className="text-xs font-semibold text-slate-500 mb-1">{k.label} Inspections</p>
                    <p className={`text-3xl font-black ${k.color}`}>{k.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                  <p className="text-sm font-black text-slate-700 mb-3">Results Distribution</p>
                  <div className="flex justify-center">
                    <DonutChart data={inspResultData} colorMap={INSP_CLR} size={220}/>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                  <p className="text-sm font-black text-slate-700 mb-4">Avg Inspection Score by Site</p>
                  {avgScoreData.length===0 ? <Empty label="No scored inspections yet"/> :
                    <div style={{width:"100%",height:240}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={avgScoreData} barCategoryGap="30%">
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false}/>
                          <XAxis dataKey="name" tick={{fontSize:10,fill:"#94a3b8"}}/>
                          <YAxis domain={[0,100]} tick={{fontSize:10,fill:"#94a3b8"}}/>
                          <Tooltip content={<Tip/>}/>
                          <Bar dataKey="avg" name="Avg Score" radius={[6,6,0,0]}>
                            {avgScoreData.map(e=><Cell key={e.name} fill={e.avg>=75?"#10b981":e.avg>=50?"#f59e0b":"#ef4444"}/>)}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  }
                </div>
              </div>

              {avgScoreData.length>0 && (
                <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                  <div className="px-5 py-3.5 border-b border-slate-200"><p className="text-sm font-black text-slate-700">Site Score Ratings</p></div>
                  <table className="w-full text-sm">
                    <thead><tr className="bg-white border-b border-slate-100 text-xs text-slate-400 uppercase">
                      <th className="text-left px-5 py-3">Site</th><th className="text-left px-4 py-3">Avg Score</th>
                      <th className="text-left px-4 py-3">Performance</th><th className="text-left px-4 py-3">Rating</th>
                    </tr></thead>
                    <tbody>
                      {avgScoreData.map((row,i)=>(
                        <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-white/70">
                          <td className="px-5 py-3 font-semibold text-slate-700">{row.name}</td>
                          <td className="px-4 py-3 font-black text-slate-800 text-lg">{row.avg}<span className="text-slate-400 text-xs font-normal">/100</span></td>
                          <td className="px-4 py-3 w-40"><ProgressBar value={row.avg} color={row.avg>=75?"#10b981":row.avg>=50?"#f59e0b":"#ef4444"} height={8}/></td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${row.avg>=75?"bg-emerald-50 text-emerald-700":row.avg>=50?"bg-amber-50 text-amber-700":"bg-red-50 text-red-700"}`}>
                              {row.avg>=75?"Good":row.avg>=50?"Average":"Poor"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>{/* end reportContentRef */}
      </div>
    </div>
  );
}