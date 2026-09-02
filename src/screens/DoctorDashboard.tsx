import React, { useState } from 'react';
import { ReviewItem } from '../types';

interface DoctorDashboardProps {
  reviews: ReviewItem[];
  onReviewItem: (item: ReviewItem) => void;
  onDismissItem: (id: string) => void;
  onNavigateToBuilder: () => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  reviews,
  onReviewItem,
  onDismissItem,
  onNavigateToBuilder
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredReviews = reviews.filter((item) => {
    if (item.status === 'dismissed') return false;
    const q = searchQuery.toLowerCase();
    return (
      item.patientName.toLowerCase().includes(q) ||
      item.patientId.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q)
    );
  });

  return (
    <main className="px-4 md:px-8 py-6 max-w-7xl mx-auto w-full pb-28 md:pb-8">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative flex items-center w-full min-h-[48px] bg-[#141414] rounded-2xl focus-within:ring-1 focus-within:ring-[#fbbf24] transition-all border border-white/10 hover:border-white/20">
          <span className="material-symbols-outlined ml-4 text-[#a1a1aa] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patients by name, ID, or clinical condition..."
            className="w-full bg-transparent border-none text-sm text-white placeholder:text-[#71717a] px-3 py-2.5 focus:ring-0 outline-hidden"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="mr-4 text-[#a1a1aa] hover:text-white text-xs font-semibold uppercase tracking-wider"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#fbbf24] font-semibold">Clinical Metrics</span>
            <h2 className="text-lg font-bold text-white tracking-tight">Doctor Practice Overview</h2>
          </div>
          <button
            onClick={onNavigateToBuilder}
            className="text-xs text-[#fbbf24] font-semibold hover:text-amber-300 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">edit_document</span>
            Open Recommendation Builder
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {/* Total Patients */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex flex-col items-start min-h-[105px] hover:border-white/20 transition-all">
            <span className="material-symbols-outlined text-[#fbbf24] mb-1.5 text-[20px]">groups</span>
            <p className="text-[10px] font-semibold text-[#a1a1aa] mb-1 uppercase tracking-[0.15em]">
              Total Patients
            </p>
            <p className="text-2xl font-bold text-white">124</p>
          </div>

          {/* New Reports */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex flex-col items-start min-h-[105px] hover:border-white/20 transition-all">
            <span className="material-symbols-outlined text-[#fbbf24] mb-1.5 text-[20px]">description</span>
            <p className="text-[10px] font-semibold text-[#a1a1aa] mb-1 uppercase tracking-[0.15em]">
              New Reports
            </p>
            <p className="text-2xl font-bold text-white">5</p>
          </div>

          {/* Awaiting Review - Highlighted */}
          <div className="bg-[#1a140a] border border-amber-500/40 rounded-2xl p-4 flex flex-col items-start min-h-[105px] relative overflow-hidden shadow-lg hover:border-amber-500/60 transition-all">
            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-[#fbbf24]/10 rounded-full blur-xl pointer-events-none"></div>
            <span className="material-symbols-outlined text-[#fbbf24] mb-1.5 text-[20px]">pending_actions</span>
            <p className="text-[10px] font-semibold text-[#fbbf24] mb-1 uppercase tracking-[0.15em]">
              Awaiting Review
            </p>
            <p className="text-2xl font-bold text-[#fbbf24]">{filteredReviews.length}</p>
          </div>

          {/* Recommendations */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex flex-col items-start min-h-[105px] hover:border-white/20 transition-all">
            <span className="material-symbols-outlined text-[#fbbf24] mb-1.5 text-[20px]">send</span>
            <p className="text-[10px] font-semibold text-[#a1a1aa] mb-1 uppercase tracking-[0.15em]">
              Recommendations
            </p>
            <p className="text-2xl font-bold text-white">92</p>
          </div>

          {/* Upcoming Appts */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex flex-col items-start min-h-[105px] col-span-2 md:col-span-1 hover:border-white/20 transition-all">
            <span className="material-symbols-outlined text-[#fbbf24] mb-1.5 text-[20px]">event</span>
            <p className="text-[10px] font-semibold text-[#a1a1aa] mb-1 uppercase tracking-[0.15em]">
              Upcoming Appts
            </p>
            <p className="text-2xl font-bold text-white">4</p>
          </div>
        </div>
      </section>

      {/* Awaiting Review List */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#fbbf24] font-semibold">Action Queue</span>
            <h2 className="text-base font-bold text-white tracking-tight">Patient Inquiries & Scans Awaiting Review</h2>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-semibold uppercase tracking-wider text-[#fbbf24] hover:underline"
          >
            {showAll ? 'Show Pending Only' : 'View All'}
          </button>
        </div>

        {filteredReviews.length === 0 ? (
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-10 text-center text-[#a1a1aa]">
            <span className="material-symbols-outlined text-4xl text-[#fbbf24] mb-3">task_alt</span>
            <p className="font-semibold text-base text-white">All clinical reviews are up to date!</p>
            <p className="text-xs text-[#71717a] mt-1">No pending reports match your current search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReviews.map((item) => (
              <div
                key={item.id}
                className="bg-[#141414] border border-white/10 rounded-2xl p-5 flex flex-col gap-3.5 hover:border-white/20 transition-all shadow-md relative group"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#1f1f23] border border-white/10 text-[#fbbf24] flex items-center justify-center text-xs font-bold">
                      {item.patientInitials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">
                        {item.patientName}
                      </p>
                      <p className="text-[11px] font-mono text-[#a1a1aa]">
                        ID: {item.patientId}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#a1a1aa] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                    {item.timeAgo}
                  </span>
                </div>

                <div className="bg-[#0c0c0e] border border-white/5 p-3 rounded-xl flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#fbbf24] text-[20px]">
                    {item.icon}
                  </span>
                  <p className="text-xs font-medium text-zinc-200">{item.title}</p>
                </div>

                <div className="flex justify-end gap-2.5 mt-1 pt-3 border-t border-white/10">
                  <button
                    onClick={() => onDismissItem(item.id)}
                    className="min-h-[38px] px-4 py-1.5 border border-white/20 text-[#a1a1aa] rounded-full text-[11px] uppercase tracking-wider font-semibold hover:text-white hover:border-white/30 transition-colors cursor-pointer"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => onReviewItem(item)}
                    className="min-h-[38px] px-5 py-1.5 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] rounded-full text-[11px] uppercase tracking-wider font-bold hover:brightness-105 transition-all cursor-pointer shadow-xs"
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
