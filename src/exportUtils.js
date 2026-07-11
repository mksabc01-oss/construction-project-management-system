// exportUtils.js — no external dependencies, works with SVG charts

// ── PDF via window.print() ────────────────────────────────────
// html2canvas breaks on inline SVG. window.print() renders everything
// exactly as the browser sees it, including your donut charts.
export async function exportElementToPDF(elementRef, filename = 'report.pdf') {
  const element = elementRef?.current;
  if (!element) {
    console.warn('exportElementToPDF: ref not attached');
    return;
  }

  // Clone the content so we can strip interactive elements
  const clone = element.cloneNode(true);
  clone.querySelectorAll('button, input, select, textarea').forEach(el => el.remove());

  const styles = `
    <style>
      @page { size: A4 landscape; margin: 12mm; }
      *, *::before, *::after { box-sizing: border-box; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: 11px; color: #1e293b; background: #fff;
        margin: 0; padding: 0;
      }

      /* ── print header ── */
      .print-header {
        display: flex; justify-content: space-between; align-items: center;
        padding-bottom: 8px; border-bottom: 2px solid #f97316; margin-bottom: 16px;
      }
      .print-header h1 { margin:0; font-size:16px; font-weight:900; color:#0f172a; }
      .print-header span { font-size:10px; color:#94a3b8; }

      /* ── grid overrides ── */
      .grid { display: grid !important; }
      .grid-cols-2, .lg\\:grid-cols-2 { grid-template-columns: repeat(2,1fr) !important; }
      .grid-cols-3, .lg\\:grid-cols-3 { grid-template-columns: repeat(3,1fr) !important; }
      .grid-cols-4, .lg\\:grid-cols-4 { grid-template-columns: repeat(4,1fr) !important; }
      .grid-cols-5, .lg\\:grid-cols-5 { grid-template-columns: repeat(5,1fr) !important; }
      .gap-4 { gap:10px !important; } .gap-6 { gap:14px !important; }
      .space-y-6 > * + * { margin-top: 14px; }

      /* ── cards ── */
      .bg-white, .bg-slate-50 {
        background:#fff !important; border:1px solid #e2e8f0 !important;
        border-radius:8px !important; padding:10px !important; break-inside:avoid;
      }

      /* ── tables ── */
      table { width:100%; border-collapse:collapse; margin-top:6px; font-size:10px; }
      thead tr { background:#f8fafc; }
      th { padding:5px 8px; text-align:left; font-weight:700; color:#64748b;
           text-transform:uppercase; letter-spacing:.04em; border-bottom:1px solid #e2e8f0; }
      td { padding:4px 8px; border-bottom:1px solid #f1f5f9; }
      tr:last-child td { border-bottom:none; }

      /* ── SVG charts — let them render naturally ── */
      svg { max-width:100%; height:auto; }

      /* ── hide recharts tooltip, scrollbars ── */
      .recharts-tooltip-wrapper { display:none !important; }
      .overflow-y-auto { overflow:visible !important; max-height:none !important; }
      .overflow-x-auto { overflow:visible !important; }

      /* ── typography ── */
      .font-black { font-weight:900; }
      .font-bold   { font-weight:700; }
      .text-2xl    { font-size:18px; }
      .text-3xl    { font-size:22px; }
      .text-slate-400 { color:#94a3b8; }
      .text-slate-500 { color:#64748b; }
      .text-slate-700 { color:#334155; }
      .text-slate-800 { color:#1e293b; }
      .text-orange-600 { color:#ea580c; }
      .text-orange-700 { color:#c2410c; }
      .text-emerald-700 { color:#047857; }
      .text-violet-600  { color:#7c3aed; }
      .text-teal-600    { color:#0d9488; }
      .text-teal-700    { color:#0f766e; }
      .text-blue-700    { color:#1d4ed8; }
      .text-red-700     { color:#b91c1c; }
      .text-amber-700   { color:#b45309; }
      .text-violet-700  { color:#6d28d9; }

      /* ── color bg utilities ── */
      .bg-orange-50  { background:#fff7ed !important; }
      .bg-blue-50    { background:#eff6ff !important; }
      .bg-violet-50  { background:#f5f3ff !important; }
      .bg-emerald-50 { background:#ecfdf5 !important; }
      .bg-teal-50    { background:#f0fdfa !important; }
      .bg-slate-100  { background:#f1f5f9 !important; }
    </style>
  `;

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
    <title>${filename.replace('.pdf','')}</title>${styles}
  </head><body>
    <div class="print-header">
      <h1>&#x1F3D7; BuildTrack — Reports &amp; Analytics</h1>
      <span>Generated: ${new Date().toLocaleString()}</span>
    </div>
    ${clone.innerHTML}
  </body></html>`;

  const win = window.open('', '_blank', 'width=1100,height=750');
  if (!win) {
    alert('Popup blocked — please allow popups for localhost:5173 and try again.');
    return;
  }
  win.document.write(html);
  win.document.close();
  // Give fonts/SVG time to paint before print dialog opens
  win.onload = () => setTimeout(() => { win.focus(); win.print(); win.close(); }, 600);
}

// ── CSV EXPORT ────────────────────────────────────────────────
// Tries DOM tables first; falls back to raw data arrays (needed for
// Overview tab which has no <table> elements, only SVG donuts).
export function exportAllTablesToCSV(elementRef, filename = 'report.csv', rawData = {}) {
  const { projects = [], workers = [], sites = [] } = rawData;
  const container = elementRef?.current;
  const tables    = container ? Array.from(container.querySelectorAll('table')) : [];

  if (tables.length > 0) {
    // ── DOM path: read visible tables ──────────────────────────
    const sections = tables.map((table, idx) => {
      const card    = table.closest('[class*="rounded"]');
      const heading = card?.querySelector('p[class*="font-black"]');
      const title   = heading?.textContent.trim() ?? `Table ${idx + 1}`;

      const rows = Array.from(table.querySelectorAll('tr')).map(tr =>
        Array.from(tr.querySelectorAll('th,td'))
          .map(cell => `"${cell.textContent.trim().replace(/"/g,'""')}"`)
          .join(',')
      ).filter(r => r.replace(/","/g,'').replace(/"/g,'').trim());

      return [`"${title}"`, ...rows].join('\n');
    });

    triggerDownload(sections.join('\n\n'), filename);
    return;
  }

  // ── Raw data fallback (Overview tab or ref not ready) ────────
  const hasData = projects.length || workers.length || sites.length;
  if (!hasData) {
    // Data might still be loading — wait 1s and retry once
    setTimeout(() => {
      const stillEmpty = !projects.length && !workers.length && !sites.length;
      if (stillEmpty) {
        alert('No data to export yet — click Refresh first.');
      } else {
        exportAllTablesToCSV(elementRef, filename, rawData);
      }
    }, 1000);
    return;
  }

  const lines = [];

  const addSection = (title, headers, rows) => {
    lines.push(`"${title}"`);
    lines.push(headers.map(h => `"${h}"`).join(','));
    rows.forEach(r => lines.push(r.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')));
    lines.push('');
  };

  if (projects.length) addSection(
    'PROJECTS',
    ['Name','Site','Progress (%)','Status','Workers','Budget'],
    projects.map(p => [p.name, p.site, p.progress, p.status, p.workers, p.budget])
  );

  if (workers.length) addSection(
    'WORKERS',
    ['Name','Role','Phone','Salary (Rs)','Status'],
    workers.map(w => [w.name, w.role, w.phone, w.salary, w.status])
  );

  if (sites.length) addSection(
    'SITES',
    ['Name','Address','District','Status','Inspections','Active Workers','Assigned Project'],
    sites.map(s => [
      s.name, s.address, s.district, s.status,
      s.inspections?.length ?? 0,
      s.workers?.filter(w => w.status === 'Active').length ?? 0,
      s.assignedProject?.name ?? '—',
    ])
  );

  triggerDownload(lines.join('\n'), filename);
}

function triggerDownload(csv, filename) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}