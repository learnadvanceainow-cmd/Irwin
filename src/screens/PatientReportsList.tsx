import React, { useState } from 'react';
import { ClinicalHistoryItem } from '../types';

interface PatientReportsListProps {
  reports: ClinicalHistoryItem[];
  onUploadClick: () => void;
  onViewReport: (report: ClinicalHistoryItem) => void;
}

export const PatientReportsList: React.FC<PatientReportsListProps> = ({
  reports,
  onUploadClick,
  onViewReport
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredReports = reports.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  return (
    <main className="max-w-[1280px] mx-auto px-4 md:px-8 py-6 pb-28 md:pb-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#fbbf24] font-semibold">Diagnostic Archives</span>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-0.5">
            Dental Reports &amp; Radiographs
          </h1>
          <p className="text-xs text-[#a1a1aa] mt-1">
            Access your panoramic radiographs, laboratory blood panels, and clinical evaluations.
          </p>
        </div>
        <button
          onClick={onUploadClick}
          className="h-11 px-6 rounded-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 hover:brightness-105 transition-all shadow-md cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
          Upload New Report
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 border-b border-white/10">
        {[
          { id: 'all', label: 'All Records' },
          { id: 'xray', label: 'X-Rays & Scans' },
          { id: 'treatment', label: 'Treatment History' },
          { id: 'blood', label: 'Lab & Blood Panels' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === tab.id
                ? 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] shadow-md'
                : 'bg-[#141414] border border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            onClick={() => onViewReport(report)}
            className={`bg-[#141414] border border-white/10 rounded-2xl p-5 shadow-lg hover:border-white/25 transition-all cursor-pointer flex flex-col justify-between group ${
              report.highlightBorder ? 'border-l-2 border-l-[#fbbf24]' : ''
            }`}
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-[#1e1b12] border border-amber-500/25 flex items-center justify-center text-[#fbbf24] group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">{report.icon}</span>
                </div>
                {report.status ? (
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-[#fbbf24] uppercase tracking-wider">
                    {report.status}
                  </span>
                ) : (
                  <span className="text-xs text-[#a1a1aa] font-mono">{report.date}</span>
                )}
              </div>
              <h3 className="font-bold text-base text-white group-hover:text-[#fbbf24] transition-colors">
                {report.title}
              </h3>
              <p className="text-xs text-[#a1a1aa] mt-1.5 line-clamp-2 leading-relaxed">
                {report.details || 'Diagnostic study reviewed by clinical team.'}
              </p>
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#fbbf24]">
              <span className="uppercase tracking-wider text-[11px]">Inspect Document</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
