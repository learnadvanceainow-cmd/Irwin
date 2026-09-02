import React, { useState } from 'react';
import { Doctor, SystemLog } from '../types';

interface AdminDashboardProps {
  doctors: Doctor[];
  logs: SystemLog[];
  onAddDoctor: (doc: Omit<Doctor, 'id'>) => void;
  onAuditLogsClick: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  doctors,
  logs,
  onAddDoctor,
  onAuditLogsClick
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocSpecialty, setNewDocSpecialty] = useState('General Dentistry');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    const initials = newDocName
      .replace('Dr. ', '')
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase();

    onAddDoctor({
      name: newDocName.startsWith('Dr.') ? newDocName : `Dr. ${newDocName}`,
      initials: initials || 'MD',
      specialty: newDocSpecialty,
      status: 'Active',
      patientsToday: 0
    });

    setNewDocName('');
    setShowAddModal(false);
  };

  return (
    <main className="max-w-[1280px] mx-auto px-4 md:px-8 py-6 pb-28 md:pb-8 w-full">
      {/* Summary Stats Bento Grid */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#fbbf24] font-semibold">Executive Control</span>
            <h2 className="text-2xl font-bold text-white tracking-tight">Clinic Operational Overview</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Total Doctors */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#a1a1aa] text-[10px] font-semibold uppercase tracking-wider">
                Total Doctors
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#1e1b12] border border-amber-500/25 text-[#fbbf24] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">stethoscope</span>
              </div>
            </div>
            <p className="text-3xl font-extrabold text-white">{doctors.length}</p>
          </div>

          {/* Active Patients */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#a1a1aa] text-[10px] font-semibold uppercase tracking-wider">
                Active Patients
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#1e1b12] border border-amber-500/25 text-[#fbbf24] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">group</span>
              </div>
            </div>
            <p className="text-3xl font-extrabold text-white">1,432</p>
          </div>

          {/* System Health */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#a1a1aa] text-[10px] font-semibold uppercase tracking-wider">
                System Health
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
              </div>
            </div>
            <p className="text-3xl font-extrabold text-emerald-400">99.9%</p>
          </div>

          {/* Appointments (Mo) */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#a1a1aa] text-[10px] font-semibold uppercase tracking-wider">
                Appointments (Mo)
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#1e1b12] border border-amber-500/25 text-[#fbbf24] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">event</span>
              </div>
            </div>
            <p className="text-3xl font-extrabold text-white">485</p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] text-xs uppercase tracking-wider font-bold px-6 py-2.5 rounded-full min-h-[44px] flex items-center justify-center hover:brightness-105 transition-all shadow-md flex-1 md:flex-none cursor-pointer"
          >
            <span className="material-symbols-outlined mr-2 text-[18px]">person_add</span>
            Add Doctor
          </button>
          <button
            onClick={() => setShowPermissionsModal(true)}
            className="bg-[#141414] text-zinc-200 border border-white/15 text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-full min-h-[44px] flex items-center justify-center hover:bg-white/5 transition-all flex-1 md:flex-none cursor-pointer"
          >
            <span className="material-symbols-outlined mr-2 text-[18px] text-[#fbbf24]">manage_accounts</span>
            Manage Permissions
          </button>
          <button
            onClick={onAuditLogsClick}
            className="bg-[#141414] text-zinc-200 border border-white/15 text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-full min-h-[44px] flex items-center justify-center hover:bg-white/5 transition-all flex-1 md:flex-none cursor-pointer"
          >
            <span className="material-symbols-outlined mr-2 text-[18px] text-[#fbbf24]">history</span>
            Audit Logs
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Doctor Management */}
        <section className="md:col-span-2">
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 shadow-xl h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#fbbf24] font-semibold">Clinicians Roster</span>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#fbbf24] text-[18px]">groups</span>
                  Doctor Management
                </h2>
              </div>
              <div className="space-y-3">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="flex items-center justify-between p-3.5 bg-[#0d0d0d] border border-white/10 rounded-xl hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#1e1b12] border border-amber-500/25 flex items-center justify-center text-[#fbbf24] font-bold text-xs tracking-wider">
                        {doctor.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{doctor.name}</p>
                        <p className="text-xs text-[#a1a1aa]">{doctor.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider inline-block mb-1">
                        {doctor.status}
                      </span>
                      <p className="text-xs text-[#a1a1aa]">
                        {doctor.patientsToday} Patients today
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full mt-5 text-[#fbbf24] hover:text-[#f59e0b] font-bold text-xs uppercase tracking-wider py-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
              Register New Clinician
            </button>
          </div>
        </section>

        {/* System Activity */}
        <section className="md:col-span-1">
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 shadow-xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#fbbf24] font-semibold">Live Events</span>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#fbbf24] text-[18px]">list_alt</span>
                System Activity
              </h2>
            </div>
            <div className="space-y-4 flex-grow">
              {logs.map((log, idx) => (
                <div key={log.id} className="flex gap-3 items-start relative pb-3">
                  {idx < logs.length - 1 && (
                    <div className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-white/10"></div>
                  )}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 mt-0.5 ${
                      log.variant === 'primary'
                        ? 'bg-amber-500/15 border border-amber-500/30 text-[#fbbf24]'
                        : log.variant === 'secondary'
                        ? 'bg-blue-500/15 border border-blue-500/30 text-blue-400'
                        : 'bg-red-500/15 border border-red-500/30 text-red-400'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">{log.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-200 font-medium leading-snug">{log.title}</p>
                    <p className="text-[10px] text-[#a1a1aa] font-mono mt-0.5">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#fbbf24] font-semibold">Staff Registry</span>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#fbbf24]">person_add</span>
                  Add New Doctor
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-[#a1a1aa] hover:text-white rounded-full hover:bg-white/5 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-zinc-300 block mb-1.5">
                  Full Name &amp; Title
                </label>
                <input
                  type="text"
                  required
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  placeholder="e.g. Dr. Emily Chen"
                  className="w-full h-11 px-3.5 bg-[#0d0d0d] rounded-xl text-sm text-white border border-white/10 focus:border-[#fbbf24] outline-hidden placeholder:text-zinc-600"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-zinc-300 block mb-1.5">
                  Specialty Department
                </label>
                <select
                  value={newDocSpecialty}
                  onChange={(e) => setNewDocSpecialty(e.target.value)}
                  className="w-full h-11 px-3.5 bg-[#0d0d0d] rounded-xl text-sm text-white border border-white/10 focus:border-[#fbbf24] outline-hidden"
                >
                  <option value="Orthodontics" className="bg-[#141414]">Orthodontics</option>
                  <option value="General Dentistry" className="bg-[#141414]">General Dentistry</option>
                  <option value="Periodontics" className="bg-[#141414]">Periodontics</option>
                  <option value="Oral & Maxillofacial" className="bg-[#141414]">Oral &amp; Maxillofacial</option>
                  <option value="Endodontics" className="bg-[#141414]">Endodontics</option>
                  <option value="Pediatric Dentistry" className="bg-[#141414]">Pediatric Dentistry</option>
                </select>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2 border border-white/20 rounded-full text-xs uppercase tracking-wider font-semibold text-zinc-300 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] text-xs uppercase tracking-wider font-bold rounded-full hover:brightness-105 transition-all shadow-md cursor-pointer"
                >
                  Save Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {showPermissionsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#fbbf24] font-semibold">Security Access</span>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#fbbf24]">security</span>
                  Clinic Role Permissions
                </h3>
              </div>
              <button
                onClick={() => setShowPermissionsModal(false)}
                className="p-1 text-[#a1a1aa] hover:text-white rounded-full hover:bg-white/5 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#0d0d0d] border border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Dr. Sarah Smith</p>
                  <p className="text-[#a1a1aa]">Prescription Authority • X-Ray Approval</p>
                </div>
                <span className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
                  Authorized
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0d0d0d] border border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Dr. James Doe</p>
                  <p className="text-[#a1a1aa]">Standard Clinical Access</p>
                </div>
                <span className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
                  Authorized
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0d0d0d] border border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Dr. Sarah Wilson</p>
                  <p className="text-[#a1a1aa]">Lead Dental Surgeon • Chief Reviewer</p>
                </div>
                <span className="bg-amber-500/10 border border-amber-500/25 text-[#fbbf24] font-semibold px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
                  Lead Admin
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setShowPermissionsModal(false)}
                className="px-6 py-2 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] text-xs uppercase tracking-wider font-bold rounded-full hover:brightness-105 transition-all shadow-md cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
