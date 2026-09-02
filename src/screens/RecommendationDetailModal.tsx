import React from 'react';
import { Recommendation } from '../types';

interface RecommendationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation: Recommendation;
  onScheduleAppointment: () => void;
}

export const RecommendationDetailModal: React.FC<RecommendationDetailModalProps> = ({
  isOpen,
  onClose,
  recommendation,
  onScheduleAppointment
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#171717] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1e1b12] border border-amber-500/25 text-[#fbbf24] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">recommend</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#fbbf24] font-semibold">Clinical Directive</span>
              <h3 className="font-bold text-base text-white leading-tight">
                {recommendation.title}
              </h3>
              <p className="text-xs text-[#a1a1aa]">
                Issued by {recommendation.doctorName} • {recommendation.date}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#a1a1aa] hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-white">
          {/* Treatment Plan Highlight */}
          <div className="p-4 bg-amber-500/10 border-l-2 border-[#fbbf24] border-y border-r border-amber-500/20 rounded-r-xl">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#fbbf24] mb-1.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">dentistry</span>
              Treatment Recommendation
            </h4>
            <p className="text-sm leading-relaxed text-zinc-200">
              {recommendation.treatmentPlan}
            </p>
          </div>

          {/* Clinical Observations */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#fbbf24]">visibility</span>
              Clinical Observations
            </h4>
            <p className="text-xs bg-[#0d0d0d] border border-white/10 p-3.5 rounded-xl text-zinc-300 leading-relaxed">
              {recommendation.observations || 'No specific symptoms noted at presentation.'}
            </p>
          </div>

          {/* Prescriptions */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#fbbf24]">pill</span>
              Prescribed Medications
            </h4>
            <div className="bg-[#0d0d0d] border border-white/10 p-3.5 rounded-xl flex items-center gap-3">
              <span className="material-symbols-outlined text-[#fbbf24] text-[20px]">medication</span>
              <p className="text-xs font-semibold text-white">
                {recommendation.medications || 'None prescribed.'}
              </p>
            </div>
          </div>

          {/* Follow-up & Next Appointment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0d0d0d] border border-white/10 p-3.5 rounded-xl">
              <h4 className="font-semibold text-[10px] uppercase tracking-wider text-[#fbbf24] mb-1">
                Next Appointment
              </h4>
              <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#fbbf24]">event</span>
                {recommendation.nextAppointment || 'November 15, 2024'}
              </p>
            </div>

            <div className="bg-[#0d0d0d] border border-white/10 p-3.5 rounded-xl">
              <h4 className="font-semibold text-[10px] uppercase tracking-wider text-[#fbbf24] mb-1">
                Follow-up Instructions
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {recommendation.followUpNotes || 'Maintain normal oral hygiene with soft-bristle brush.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#171717] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-white/20 rounded-full text-xs uppercase tracking-wider font-semibold text-zinc-300 hover:bg-white/5 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onScheduleAppointment();
            }}
            className="px-6 py-2 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] text-xs uppercase tracking-wider font-bold rounded-full hover:brightness-105 transition-all flex items-center gap-2 shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
            Confirm / Reschedule Appointment
          </button>
        </div>
      </div>
    </div>
  );
};
