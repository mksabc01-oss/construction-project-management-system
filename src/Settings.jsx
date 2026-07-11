import React, { useState } from "react";

// ── ICONS ─────────────────────────────────────────────────────────────────────
const IconUser = ({ size = 20, color = "#ea580c" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconBell = ({ size = 20, color = "#2563eb" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const IconCheck = ({ size = 14, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconEdit = ({ size = 14, color = "#ea580c" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IconCamera = ({ size = 16, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);
const IconShield = ({ size = 14, color = "#059669" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

// ── TOGGLE SWITCH ─────────────────────────────────────────────────────────────
function Toggle({ enabled, onChange }) {
  return (
    <button onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        enabled ? "bg-orange-500" : "bg-slate-200"}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
        enabled ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

// ── SECTION CARD ──────────────────────────────────────────────────────────────
function SectionCard({ icon, title, subtitle, iconBg, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100">
        <div className={`w-9 h-9 ${iconBg} rounded-xl flex items-center justify-center shrink-0`}>
          {icon}
        </div>
        <div>
          <h2 className="text-sm font-black text-slate-800">{title}</h2>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

// ── FIELD ─────────────────────────────────────────────────────────────────────
function Field({ label, name, type = "text", value, onChange, disabled }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
      <input
        type={type} name={name} value={value} onChange={onChange} disabled={disabled}
        className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all
          ${disabled
            ? "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed"
            : "bg-white border-slate-200 text-slate-800 focus:ring-2 focus:ring-orange-300 focus:border-orange-400"}`}
      />
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Settings() {
  // ── Profile state ──
  const [editMode, setEditMode] = useState(false);
  const [saved,    setSaved]    = useState(false);
  const [profile, setProfile] = useState({
    name:     "Admin User",
    email:    "admin@buildtrack.com",
    phone:    "+94 71 234 5678",
    role:     "Administrator",
    company:  "BuildTrack Pvt Ltd",
    location: "Colombo, Sri Lanka",
  });
  const [draft, setDraft] = useState({ ...profile });

  const handleProfileChange = (e) =>
    setDraft({ ...draft, [e.target.name]: e.target.value });

  const handleSaveProfile = () => {
    setProfile({ ...draft });
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancelEdit = () => {
    setDraft({ ...profile });
    setEditMode(false);
  };

  // ── Notification state ──
  const [notifications, setNotifications] = useState({
    projectUpdates:   true,
    workerAlerts:     true,
    siteInspections:  true,
    budgetAlerts:     true,
    systemReports:    false,
    emailDigest:      false,
  });

  const notifItems = [
    { key: "projectUpdates",  label: "Project Updates",       desc: "Get notified when a project status changes"         },
    { key: "workerAlerts",    label: "Worker Alerts",         desc: "Alerts for worker attendance and status changes"     },
    { key: "siteInspections", label: "Site Inspections",      desc: "Reminders for upcoming site inspection deadlines"    },
    { key: "budgetAlerts",    label: "Budget Alerts",         desc: "Notify when a project exceeds its budget threshold"  },
    { key: "systemReports",   label: "System Reports",        desc: "Weekly summary reports delivered to your dashboard"  },
    { key: "emailDigest",     label: "Email Digest",          desc: "Daily email digest of all activity across sites"     },
  ];

  const toggleNotif = (key) =>
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="p-7 space-y-6 max-w-3xl">

      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl font-black text-slate-800">Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your account and notification preferences</p>
      </div>

      {/* ── Save toast ── */}
      {saved && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold px-4 py-3 rounded-xl shadow-sm">
          <span className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
            <IconCheck size={11} />
          </span>
          Profile saved successfully!
        </div>
      )}

      {/* ── Profile Section ── */}
      <SectionCard
        icon={<IconUser />}
        title="Profile Information"
        subtitle="Update your personal details"
        iconBg="bg-orange-50"
      >
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center shadow-md shadow-orange-200">
              <span className="text-white text-2xl font-black">
                {profile.name.charAt(0).toUpperCase()}
              </span>
            </div>
            {editMode && (
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center border-2 border-white">
                <IconCamera size={11} />
              </button>
            )}
          </div>
          <div>
            <p className="font-black text-slate-800">{profile.name}</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold mt-1">
              <IconShield /> {profile.role}
            </span>
          </div>
          {!editMode && (
            <button onClick={() => setEditMode(true)}
              className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 transition-all">
              <IconEdit /> Edit
            </button>
          )}
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name"    name="name"     value={editMode ? draft.name     : profile.name}     onChange={handleProfileChange} disabled={!editMode} />
          <Field label="Email"        name="email"    value={editMode ? draft.email    : profile.email}    onChange={handleProfileChange} disabled={!editMode} type="email" />
          <Field label="Phone"        name="phone"    value={editMode ? draft.phone    : profile.phone}    onChange={handleProfileChange} disabled={!editMode} />
          <Field label="Company"      name="company"  value={editMode ? draft.company  : profile.company}  onChange={handleProfileChange} disabled={!editMode} />
          <Field label="Location"     name="location" value={editMode ? draft.location : profile.location} onChange={handleProfileChange} disabled={!editMode} />
          <Field label="Role"         name="role"     value={profile.role}                                  onChange={() => {}}            disabled={true} />
        </div>

        {/* Edit actions */}
        {editMode && (
          <div className="flex items-center justify-end gap-3 mt-5 pt-5 border-t border-slate-100">
            <button onClick={handleCancelEdit}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">
              Cancel
            </button>
            <button onClick={handleSaveProfile}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold shadow-md shadow-orange-200 transition-colors">
              <IconCheck /> Save Changes
            </button>
          </div>
        )}
      </SectionCard>

      {/* ── Notifications Section ── */}
      <SectionCard
        icon={<IconBell />}
        title="Notification Preferences"
        subtitle="Choose what alerts you want to receive"
        iconBg="bg-blue-50"
      >
        <div className="divide-y divide-slate-50">
          {notifItems.map((item, i) => (
            <div key={item.key} className={`flex items-center justify-between gap-4 py-4 ${i === 0 ? "pt-0" : ""} ${i === notifItems.length - 1 ? "pb-0" : ""}`}>
              <div>
                <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
              </div>
              <Toggle enabled={notifications[item.key]} onChange={() => toggleNotif(item.key)} />
            </div>
          ))}
        </div>

        {/* Notif summary */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            <span className="font-bold text-slate-600">{Object.values(notifications).filter(Boolean).length}</span> of {notifItems.length} notifications enabled
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setNotifications(Object.fromEntries(notifItems.map(n => [n.key, true])))}
              className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors">
              Enable all
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setNotifications(Object.fromEntries(notifItems.map(n => [n.key, false])))}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">
              Disable all
            </button>
          </div>
        </div>
      </SectionCard>

    </div>
  );
}