import React from 'react';
import { UserRole, Patient } from '../types';
import { AVATARS } from '../data/mockData';

interface ProfileViewProps {
  currentRole: UserRole;
  patient: Patient;
  onRoleChange: (role: UserRole) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ currentRole, patient, onRoleChange }) => {
  return (
    <main className="max-w-[1000px] mx-auto px-4 md:px-8 py-6 pb-28 md:pb-8 w-full">
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-white/10 pb-6">
          <div className="w-24 h-24 rounded-full p-0.5 bg-gradient-to-tr from-[#fbbf24] to-[#f59e0b] shadow-xl shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a0a]">
              <img
                src={
                  currentRole === 'doctor'
                    ? AVATARS.doctor
                    : currentRole === 'admin'
                    ? AVATARS.admin
                    : AVATARS.patient
                }
                alt="Profile avatar"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-1.5">
              <h1 className="text-2xl font-bold text-white">
                {currentRole === 'doctor'
                  ? 'Dr. Sarah Wilson, DDS'
                  : currentRole === 'admin'
                  ? 'DentalCare Administrator'
                  : patient.name}
              </h1>
              <span className="text-[10px] font-semibold px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-[#fbbf24] uppercase tracking-wider">
                {currentRole.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-[#a1a1aa] flex items-center justify-center sm:justify-start gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#fbbf24]">badge</span>
              {currentRole === 'doctor'
                ? 'NPI: 1892019342 • Board Certified Oral & Maxillofacial'
                : currentRole === 'admin'
                ? 'Staff ID: ADM-001 • Clinic Operations'
                : `Patient Record ID: ${patient.id}`}
            </p>
            <p className="text-xs text-[#a1a1aa] flex items-center justify-center sm:justify-start gap-1 mt-1">
              <span className="material-symbols-outlined text-[16px] text-[#fbbf24]">mail</span>
              {currentRole === 'doctor'
                ? 'dr.wilson@dentalcare.com'
                : currentRole === 'admin'
                ? 'admin@dentalcare.com'
                : patient.email}
            </p>
          </div>
        </div>

        {/* Role-specific details */}
        {currentRole === 'patient' ? (
          <div className="pt-6 space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#fbbf24] font-semibold">Health Record</span>
              <h2 className="text-sm font-bold text-white mt-0.5 mb-3">
                Medical &amp; Allergy Profile
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-[#0d0d0d] rounded-xl border border-white/10">
                  <span className="text-xs text-[#a1a1aa] block mb-2 font-medium">Documented Allergies</span>
                  <div className="flex flex-wrap gap-1.5">
                    {patient.allergies.map((a) => (
                      <span
                        key={a}
                        className="bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                      >
                        ⚠️ {a}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-[#0d0d0d] rounded-xl border border-white/10">
                  <span className="text-xs text-[#a1a1aa] block mb-2 font-medium">Chronic Health Conditions</span>
                  <div className="flex flex-wrap gap-1.5">
                    {patient.medicalConditions.map((c) => (
                      <span
                        key={c}
                        className="bg-amber-500/10 border border-amber-500/25 text-[#fbbf24] text-xs font-semibold px-2.5 py-0.5 rounded-full"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#fbbf24] font-semibold">Insurance Plan</span>
              <h2 className="text-sm font-bold text-white mt-0.5 mb-3">
                Dental Insurance &amp; Coverage
              </h2>
              <div className="p-5 bg-[#0d0d0d] rounded-xl border border-white/10 text-xs space-y-2.5">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[#a1a1aa]">Insurance Carrier:</span>
                  <span className="font-semibold text-white">Delta Dental Premier PPO</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[#a1a1aa]">Member ID:</span>
                  <span className="font-semibold text-white font-mono">DLT-89240182</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[#a1a1aa]">Group Number:</span>
                  <span className="font-semibold text-white font-mono">GRP-44109</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-[#a1a1aa]">Annual Benefit Remaining:</span>
                  <span className="font-bold text-emerald-400">$1,450.00 / $2,000.00</span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#fbbf24] font-semibold">Safety Contact</span>
              <h2 className="text-sm font-bold text-white mt-0.5 mb-3">
                Emergency Contact
              </h2>
              <div className="p-4 bg-[#0d0d0d] rounded-xl border border-white/10 text-xs space-y-1">
                <p className="font-bold text-white">Sarah Smith (Spouse)</p>
                <p className="text-[#a1a1aa]">Mobile: (555) 234-8899 • Home: (555) 382-9012</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-6 space-y-4 text-xs">
            <div className="p-5 bg-[#0d0d0d] rounded-xl border border-white/10 space-y-2.5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#fbbf24] font-semibold">Medical License</span>
              <h3 className="font-bold text-sm text-white">Clinical Practice Credentials</h3>
              <p className="text-zinc-300">Dental License: CA-DEN-948102 (Active &amp; In Good Standing)</p>
              <p className="text-zinc-300">DEA Registration: BW8192019</p>
              <p className="text-zinc-300">Hospital Privileges: UCSF Dental Center</p>
            </div>
          </div>
        )}
      </div>

      {/* Switch role quick links */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 shadow-xl text-xs">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#fbbf24] font-semibold">Role Switcher</span>
        <h3 className="font-bold text-sm text-white mt-0.5 mb-2">Switch Active Portal View</h3>
        <p className="text-[#a1a1aa] mb-4">
          Test the application from any perspective to verify all screens:
        </p>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => onRoleChange('patient')}
            className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold border transition-all cursor-pointer ${
              currentRole === 'patient'
                ? 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] border-transparent shadow-md'
                : 'bg-[#0d0d0d] border-white/10 text-zinc-300 hover:border-white/20 hover:text-white'
            }`}
          >
            Patient (John Smith)
          </button>
          <button
            onClick={() => onRoleChange('doctor')}
            className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold border transition-all cursor-pointer ${
              currentRole === 'doctor'
                ? 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] border-transparent shadow-md'
                : 'bg-[#0d0d0d] border-white/10 text-zinc-300 hover:border-white/20 hover:text-white'
            }`}
          >
            Doctor (Dr. Sarah Wilson)
          </button>
          <button
            onClick={() => onRoleChange('admin')}
            className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold border transition-all cursor-pointer ${
              currentRole === 'admin'
                ? 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] border-transparent shadow-md'
                : 'bg-[#0d0d0d] border-white/10 text-zinc-300 hover:border-white/20 hover:text-white'
            }`}
          >
            Clinic Admin (DentalCare Admin)
          </button>
        </div>
      </div>
    </main>
  );
};
