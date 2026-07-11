import { exportElementToPDF, exportAllTablesToCSV } from './exportUtils';

const PdfIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
  </svg>
);

const CsvIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M7 10l5 5 5-5M12 15V3" />
  </svg>
);

export default function ExportButtons({
  contentRef,
  reportName = 'cpms-report',
  // optional raw data fallback for CSV (pass from Reports.jsx)
  projects = [],
  workers  = [],
  sites    = [],
}) {
  const dateStr = new Date().toISOString().split('T')[0];

  // FIX 1: must be async because exportElementToPDF returns a Promise
  const handlePDF = async () => {
    try {
      await exportElementToPDF(contentRef, `${reportName}-${dateStr}.pdf`);
    } catch (err) {
      console.error('PDF export error:', err);
      alert('PDF export failed – check the console for details.');
    }
  };

  // FIX 2: pass raw data arrays so CSV works even on tabs with no <table>
  const handleCSV = () => {
    exportAllTablesToCSV(contentRef, `${reportName}-${dateStr}.csv`, {
      projects,
      workers,
      sites,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handlePDF}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors"
      >
        <PdfIcon className="w-4 h-4" />
        Export PDF
      </button>
      <button
        onClick={handleCSV}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
      >
        <CsvIcon className="w-4 h-4" />
        Download CSV
      </button>
    </div>
  );
}