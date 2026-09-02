import React, { useState } from 'react';
import { UserRole } from '../types';
import { AVATARS } from '../data/mockData';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenNotifications: () => void;
  notificationCount: number;
  onBack?: () => void;
  backTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  onOpenNotifications,
  notificationCount,
  onBack,
  backTitle
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const getRoleAvatar = () => {
    switch (currentRole) {
      case 'doctor':
        return AVATARS.doctor;
      case 'patient':
        return AVATARS.patient;
      case 'admin':
        return AVATARS.admin;
      default:
        return AVATARS.patient;
    }
  };

  return (
    <header className="w-full top-0 sticky z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 shadow-lg transition-colors">
      {/* Role Switcher banner for quick testing across all 5 provided screens */}
      <div className="bg-[#0e0e0e] text-zinc-300 text-xs py-2 px-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#fbbf24] animate-pulse"></span>
            <span className="font-medium tracking-wider uppercase text-[11px] text-[#a1a1aa]">Portal Context:</span>
            <span className="font-semibold text-[#fbbf24] uppercase text-[10px] tracking-widest bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded-full">
              {currentRole === 'doctor' ? 'Dr. Sarah Wilson (Doctor)' : currentRole === 'patient' ? 'John Smith (Patient)' : 'Clinic Admin'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#71717a] hidden sm:inline mr-1 text-[10px] uppercase tracking-widest">Switch:</span>
            <button
              onClick={() => onRoleChange('patient')}
              className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold transition-all ${
                currentRole === 'patient'
                  ? 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] shadow-xs'
                  : 'text-[#a1a1aa] hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              Patient
            </button>
            <button
              onClick={() => onRoleChange('doctor')}
              className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold transition-all ${
                currentRole === 'doctor'
                  ? 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] shadow-xs'
                  : 'text-[#a1a1aa] hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              Doctor
            </button>
            <button
              onClick={() => onRoleChange('admin')}
              className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold transition-all ${
                currentRole === 'admin'
                  ? 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] shadow-xs'
                  : 'text-[#a1a1aa] hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between min-h-[64px]">
        {/* Left branding or Back button */}
        <div className="flex items-center gap-3">
          {onBack ? (
            <button
              onClick={onBack}
              className="p-1.5 text-[#fbbf24] hover:bg-white/5 transition-colors rounded-full flex items-center justify-center -ml-1.5 border border-white/10"
              aria-label="Go back"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
          ) : null}

          <div
            className="flex items-center gap-3 cursor-pointer select-none group"
            onClick={() => onTabChange('home')}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#fbbf24] to-[#f59e0b] p-0.5 shadow-md shrink-0 flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a0a]">
                <img
                  src={getRoleAvatar()}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white tracking-tight leading-tight group-hover:text-[#fbbf24] transition-colors">
                  {currentRole === 'admin'
                    ? 'DentalCare Admin'
                    : currentRole === 'patient' && !backTitle
                    ? 'Welcome, John'
                    : 'DentalCare'}
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#fbbf24] bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 font-semibold hidden sm:inline">
                  VANTAGE
                </span>
              </div>
              {currentRole === 'doctor' && (
                <p className="text-[12px] text-[#a1a1aa] leading-none mt-0.5">Dr. Sarah Wilson</p>
              )}
              {backTitle && (
                <p className="text-[12px] text-[#a1a1aa] leading-none mt-0.5">{backTitle}</p>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => onTabChange('home')}
            className={`text-xs uppercase tracking-widest pb-1 transition-all ${
              activeTab === 'home'
                ? 'text-[#fbbf24] border-b border-[#fbbf24] font-semibold'
                : 'text-[#a1a1aa] hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onTabChange('reports')}
            className={`text-xs uppercase tracking-widest pb-1 transition-all ${
              activeTab === 'reports'
                ? 'text-[#fbbf24] border-b border-[#fbbf24] font-semibold'
                : 'text-[#a1a1aa] hover:text-white'
            }`}
          >
            {currentRole === 'doctor' ? 'Patients & Reports' : 'Reports'}
          </button>
          <button
            onClick={() => onTabChange('advice')}
            className={`text-xs uppercase tracking-widest pb-1 transition-all ${
              activeTab === 'advice'
                ? 'text-[#fbbf24] border-b border-[#fbbf24] font-semibold'
                : 'text-[#a1a1aa] hover:text-white'
            }`}
          >
            {currentRole === 'doctor' ? 'Write Advice' : 'Recommendations'}
          </button>
          <button
            onClick={() => onTabChange('calendar')}
            className={`text-xs uppercase tracking-widest pb-1 transition-all ${
              activeTab === 'calendar'
                ? 'text-[#fbbf24] border-b border-[#fbbf24] font-semibold'
                : 'text-[#a1a1aa] hover:text-white'
            }`}
          >
            Calendar
          </button>
          <button
            onClick={() => onTabChange('profile')}
            className={`text-xs uppercase tracking-widest pb-1 transition-all ${
              activeTab === 'profile'
                ? 'text-[#fbbf24] border-b border-[#fbbf24] font-semibold'
                : 'text-[#a1a1aa] hover:text-white'
            }`}
          >
            Profile
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="p-2 text-[#a1a1aa] hover:text-[#fbbf24] hover:bg-white/5 transition-colors rounded-full relative border border-white/10"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#fbbf24] rounded-full ring-2 ring-[#0a0a0a]"></span>
            )}
          </button>

          {/* User badge with dropdown menu */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2.5 p-1 pl-3 rounded-full bg-[#141414] hover:bg-[#1a1a1a] transition-all border border-white/15 hover:border-white/25"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 hidden sm:inline">
                {currentRole === 'doctor' ? 'Doctor' : currentRole === 'patient' ? 'Patient' : 'Admin'}
              </span>
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#fbbf24] to-[#f59e0b] p-0.5 flex items-center justify-center overflow-hidden">
                <img
                  src={getRoleAvatar()}
                  alt="avatar"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-60 bg-[#141414] border border-white/15 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-md">
                <div className="px-4 py-2.5 border-b border-white/10">
                  <p className="text-[10px] uppercase tracking-widest text-[#71717a] font-semibold">Active Session</p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {currentRole === 'doctor'
                      ? 'Dr. Sarah Wilson'
                      : currentRole === 'patient'
                      ? 'John Smith'
                      : 'DentalCare Admin'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    onRoleChange('patient');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs flex items-center gap-3 hover:bg-white/5 transition-colors ${
                    currentRole === 'patient' ? 'text-[#fbbf24] font-semibold bg-amber-500/10' : 'text-zinc-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  <div>
                    <p className="leading-tight font-medium text-white">John Smith</p>
                    <p className="text-[10px] text-[#a1a1aa] uppercase tracking-wider">Patient Portal</p>
                  </div>
                </button>
                <button
                  onClick={() => {
                    onRoleChange('doctor');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs flex items-center gap-3 hover:bg-white/5 transition-colors ${
                    currentRole === 'doctor' ? 'text-[#fbbf24] font-semibold bg-amber-500/10' : 'text-zinc-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">stethoscope</span>
                  <div>
                    <p className="leading-tight font-medium text-white">Dr. Sarah Wilson</p>
                    <p className="text-[10px] text-[#a1a1aa] uppercase tracking-wider">Lead Dental Surgeon</p>
                  </div>
                </button>
                <button
                  onClick={() => {
                    onRoleChange('admin');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs flex items-center gap-3 hover:bg-white/5 transition-colors ${
                    currentRole === 'admin' ? 'text-[#fbbf24] font-semibold bg-amber-500/10' : 'text-zinc-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                  <div>
                    <p className="leading-tight font-medium text-white">Clinic Admin</p>
                    <p className="text-[10px] text-[#a1a1aa] uppercase tracking-wider">Clinic Operations</p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
