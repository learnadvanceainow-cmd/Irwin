import React from 'react';
import { Recommendation } from '../types';

interface PatientHomeProps {
  latestRecommendation: Recommendation;
  onViewRecommendationDetails: () => void;
  onQuickAction: (actionId: string) => void;
}

export const PatientHome: React.FC<PatientHomeProps> = ({
  latestRecommendation,
  onViewRecommendationDetails,
  onQuickAction
}) => {
  const quickActions = [
    { id: 'profile', title: 'My Dental Profile', icon: 'medical_information' },
    { id: 'reports', title: 'My Reports', icon: 'description' },
    { id: 'xrays', title: 'X-Rays & Images', icon: 'radiology' },
    { id: 'recommendations', title: 'Recommendations', icon: 'prescriptions' },
    { id: 'appointments', title: 'Appointments', icon: 'calendar_month' },
    { id: 'notifications', title: 'Notifications', icon: 'notifications_active', badge: true },
    { id: 'contact', title: 'Contact Doctor', icon: 'chat_bubble' },
    { id: 'settings', title: 'Settings', icon: 'settings' },
  ];

  return (
    <main className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-6 md:py-8 flex flex-col gap-8 pb-28 md:pb-8">
      {/* Desktop Welcome */}
      <section className="hidden md:flex justify-between items-end border-b border-white/10 pb-5">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#fbbf24] font-semibold">Patient Sanctuary</span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">Welcome back, John Smith</h1>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
          Last Clinical Consultation: Oct 12, 2023
        </p>
      </section>

      {/* Featured Dashboards (Bento Style) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Recommendation Card */}
        <div className="col-span-1 lg:col-span-2 bg-[#141414] rounded-2xl border border-white/10 p-7 shadow-xl hover:border-white/20 transition-all relative overflow-hidden flex flex-col justify-between min-h-[240px] group">
          {/* Subtle warm luxury background sheen */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#fbbf24]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex justify-between items-start mb-4 z-10 relative">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#1e1b12] border border-amber-500/25 text-[#fbbf24] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">recommend</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#fbbf24] font-semibold">Care Advisory</span>
                <h2 className="text-base font-bold text-white">Latest Recommendation</h2>
                <p className="text-xs text-[#a1a1aa]">From {latestRecommendation.doctorName}</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#fbbf24] bg-amber-500/10 border border-amber-500/25 py-1 px-3 rounded-full uppercase tracking-widest">
              {latestRecommendation.date || 'NOV 02'}
            </span>
          </div>

          <div className="z-10 relative mt-auto">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#fbbf24] transition-colors">
              {latestRecommendation.title || 'Wisdom Tooth Extraction Plan'}
            </h3>
            <p className="text-xs text-[#a1a1aa] mb-6 line-clamp-2 leading-relaxed">
              {latestRecommendation.treatmentPlan ||
                'Based on your recent panoramic x-ray, we recommend scheduling an extraction for the lower right third molar to prevent crowding.'}
            </p>
            <button
              onClick={onViewRecommendationDetails}
              className="w-full md:w-auto min-h-[42px] bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] text-xs uppercase tracking-wider font-bold rounded-full px-6 py-2.5 flex items-center justify-center gap-2 hover:brightness-105 transition-all cursor-pointer shadow-md"
            >
              <span>View Full Details</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Recent Report Status */}
        <div className="col-span-1 bg-[#141414] rounded-2xl border border-white/10 p-7 shadow-xl flex flex-col relative hover:border-white/20 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#fbbf24] font-semibold">Diagnostic Intake</span>
            <span className="w-2 h-2 rounded-full bg-[#fbbf24] animate-pulse"></span>
          </div>
          <h2 className="text-base font-bold text-white mb-4">Recent Report Status</h2>
          
          <div className="flex-1 flex flex-col justify-center items-center text-center p-5 bg-[#0d0d0d] border border-white/5 rounded-xl mb-4">
            <span className="material-symbols-outlined text-[38px] text-[#fbbf24] mb-2">pending_actions</span>
            <h3 className="text-sm font-bold text-white mb-1.5">X-Ray Review</h3>
            <p className="text-[10px] font-semibold tracking-wider px-3 py-1 bg-amber-500/10 border border-amber-500/25 text-[#fbbf24] rounded-full uppercase">
              WAITING FOR DOCTOR
            </p>
          </div>
          <p className="text-[11px] text-[#71717a] text-center mt-auto">Usually reviewed within 24-48 hours by clinical staff.</p>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#fbbf24] font-semibold">Portal Navigation</span>
            <h2 className="text-lg font-bold text-white tracking-tight">Quick Actions & Records</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onQuickAction(action.id)}
              className="bg-[#141414] border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-2.5 hover:border-[#fbbf24]/50 hover:bg-[#191919] transition-all min-h-[125px] relative group cursor-pointer shadow-md"
            >
              {action.badge && (
                <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-[#fbbf24] rounded-full ring-2 ring-[#0a0a0a]"></span>
              )}
              <span className="material-symbols-outlined text-[28px] text-[#fbbf24] group-hover:scale-110 transition-transform">
                {action.icon}
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-zinc-200 group-hover:text-white transition-colors">
                {action.title}
              </span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};
