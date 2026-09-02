import React, { useState } from 'react';
import { Patient, ClinicalHistoryItem, Recommendation } from '../types';

interface DoctorRecommendationBuilderProps {
  patient: Patient;
  clinicalHistory: ClinicalHistoryItem[];
  currentRecommendation: Recommendation;
  onSaveDraft: (rec: Partial<Recommendation>) => void;
  onSendRecommendation: (rec: Recommendation) => void;
  onViewHistoryItem: (item: ClinicalHistoryItem) => void;
}

export const DoctorRecommendationBuilder: React.FC<DoctorRecommendationBuilderProps> = ({
  patient,
  clinicalHistory,
  currentRecommendation,
  onSaveDraft,
  onSendRecommendation,
  onViewHistoryItem
}) => {
  const [observations, setObservations] = useState(currentRecommendation.observations || '');
  const [treatmentPlan, setTreatmentPlan] = useState(currentRecommendation.treatmentPlan || '');
  const [medications, setMedications] = useState(currentRecommendation.medications || '');
  const [appointment, setAppointment] = useState(currentRecommendation.nextAppointment || '2024-11-15');
  const [followup, setFollowup] = useState(currentRecommendation.followUpNotes || '');
  const [saveStatus, setSaveStatus] = useState('Draft saved 2m ago');
  const [isSending, setIsSending] = useState(false);

  const handleSaveDraft = () => {
    onSaveDraft({
      observations,
      treatmentPlan,
      medications,
      nextAppointment: appointment,
      followUpNotes: followup,
      lastSaved: 'Just now'
    });
    setSaveStatus('Draft saved just now');
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      const updatedRec: Recommendation = {
        ...currentRecommendation,
        observations,
        treatmentPlan,
        medications,
        nextAppointment: appointment,
        followUpNotes: followup,
        status: 'sent',
        lastSaved: 'Just now',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase()
      };
      onSendRecommendation(updatedRec);
      setIsSending(false);
    }, 600);
  };

  return (
    <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row gap-6 pb-28 md:pb-8">
      {/* Left Column: Patient Context & History */}
      <div className="w-full md:w-1/3 flex flex-col gap-6">
        {/* Patient Info Card */}
        <section className="bg-[#141414] border border-white/10 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#fbbf24] to-[#f59e0b] p-0.5 shadow-md shrink-0 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center text-[#fbbf24] text-lg font-bold">
                {patient.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#fbbf24] font-semibold">Patient Record</span>
              <h2 className="text-lg font-bold text-white mb-0.5">{patient.name}</h2>
              <p className="text-xs text-[#a1a1aa] flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#fbbf24]">badge</span>
                ID: {patient.id}
              </p>
              <p className="text-xs text-[#a1a1aa] flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[15px] text-[#fbbf24]">calendar_month</span>
                DOB: {patient.dob} ({patient.age} yrs)
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/10">
            {patient.allergies.map((allergy) => (
              <span
                key={allergy}
                className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/25 text-red-400 text-[10px] uppercase tracking-wider font-semibold"
              >
                Allergy: {allergy}
              </span>
            ))}
            {patient.medicalConditions.map((condition) => (
              <span
                key={condition}
                className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-[#fbbf24] text-[10px] uppercase tracking-wider font-semibold"
              >
                {condition}
              </span>
            ))}
          </div>
        </section>

        {/* Clinical History Tabs/Sections */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#fbbf24] font-semibold">Timeline</span>
            <h3 className="text-sm font-bold text-white">Clinical History</h3>
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {clinicalHistory.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewHistoryItem(item)}
                className={`bg-[#141414] border border-white/10 rounded-2xl p-4 flex items-center justify-between hover:border-white/20 transition-all text-left group cursor-pointer ${
                  item.highlightBorder ? 'border-l-2 border-l-[#fbbf24]' : ''
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#1e1e24] border border-white/5 flex items-center justify-center text-[#a1a1aa] group-hover:text-[#fbbf24] transition-colors">
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-[#fbbf24] transition-colors">{item.title}</p>
                    <p className="text-xs text-[#a1a1aa]">{item.date}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#71717a] group-hover:text-white group-hover:translate-x-0.5 transition-transform text-[20px]">
                  chevron_right
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Quick Patient Summary Info */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 text-xs text-[#a1a1aa] space-y-1.5">
          <p className="font-semibold text-[#fbbf24] uppercase tracking-wider text-[10px]">Dental Chart Notes:</p>
          <p>• Prior restorations on #14 (MOD composite), #19 (Amalgam).</p>
          <p>• Periodontal probing depths: 2-3mm generalized, localized 5mm at distal #31.</p>
        </div>
      </div>

      {/* Right Column: Recommendation Builder Form */}
      <div className="w-full md:w-2/3 flex flex-col h-full">
        <section className="bg-[#141414] border border-white/10 rounded-2xl flex flex-col shadow-xl h-full overflow-hidden">
          {/* Form Header */}
          <div className="px-6 py-4 border-b border-white/10 bg-[#171717] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#fbbf24] font-semibold">Care Formulation</span>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#fbbf24] text-[20px]">edit_document</span>
                Write Clinical Recommendation
              </h2>
            </div>
            <span className="text-xs text-[#a1a1aa] font-mono">{saveStatus}</span>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSend} className="p-6 flex flex-col gap-5 overflow-y-auto">
            {/* Clinical Observations */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-zinc-300" htmlFor="observations">
                Clinical Observations & Findings
              </label>
              <textarea
                id="observations"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                rows={4}
                className="w-full bg-[#0d0d0d] border border-white/10 focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] rounded-xl p-3.5 text-sm text-white placeholder:text-[#71717a] resize-none transition-all outline-hidden"
                placeholder="Note patient symptoms, visual findings, and diagnostic conclusions..."
              />
            </div>

            {/* Recommended Treatment */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-zinc-300" htmlFor="treatment">
                Recommended Treatment Plan
              </label>
              <textarea
                id="treatment"
                value={treatmentPlan}
                onChange={(e) => setTreatmentPlan(e.target.value)}
                rows={4}
                className="w-full bg-[#0d0d0d] border border-white/10 focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] rounded-xl p-3.5 text-sm text-white placeholder:text-[#71717a] resize-none transition-all outline-hidden"
                placeholder="Detail the proposed procedures and sequencing..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Medications */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-zinc-300" htmlFor="medications">
                  Prescribed Medications
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-[#fbbf24] pointer-events-none text-[18px]">
                    pill
                  </span>
                  <input
                    id="medications"
                    type="text"
                    value={medications}
                    onChange={(e) => setMedications(e.target.value)}
                    placeholder="e.g., Amoxicillin 500mg"
                    className="w-full h-11 pl-11 pr-3 bg-[#0d0d0d] border border-white/10 focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] rounded-xl text-sm text-white placeholder:text-[#71717a] transition-all outline-hidden"
                  />
                </div>
              </div>

              {/* Next Appointment */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-zinc-300" htmlFor="appointment">
                  Next Appointment Date
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-[#fbbf24] pointer-events-none text-[18px]">
                    event
                  </span>
                  <input
                    id="appointment"
                    type="date"
                    value={appointment}
                    onChange={(e) => setAppointment(e.target.value)}
                    className="w-full h-11 pl-11 pr-3 bg-[#0d0d0d] border border-white/10 focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] rounded-xl text-sm text-white transition-all outline-hidden color-scheme-dark"
                  />
                </div>
              </div>
            </div>

            {/* Follow-up Notes */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-zinc-300" htmlFor="followup">
                Follow-up Instructions (For Patient)
              </label>
              <input
                id="followup"
                type="text"
                value={followup}
                onChange={(e) => setFollowup(e.target.value)}
                placeholder="Brief instructions for post-visit care..."
                className="w-full h-11 px-3 bg-[#0d0d0d] border border-white/10 focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] rounded-xl text-sm text-white placeholder:text-[#71717a] transition-all outline-hidden"
              />
            </div>

            {/* Form Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="h-11 px-5 rounded-full border border-white/20 text-zinc-200 text-xs uppercase tracking-wider font-semibold hover:bg-white/5 hover:border-white/30 transition-colors cursor-pointer"
              >
                Save Draft
              </button>
              <button
                type="submit"
                disabled={isSending}
                className="h-11 px-6 rounded-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] text-xs uppercase tracking-wider font-bold hover:brightness-105 transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-75"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                {isSending ? 'Sending...' : 'Send Recommendation'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};
