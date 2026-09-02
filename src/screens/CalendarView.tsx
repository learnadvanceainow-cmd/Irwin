import React, { useState } from 'react';
import { Appointment } from '../types';

interface CalendarViewProps {
  appointments: Appointment[];
  onBookAppointment: (apt: Appointment) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ appointments, onBookAppointment }) => {
  const [showBookModal, setShowBookModal] = useState(false);
  const [date, setDate] = useState('2024-11-20');
  const [time, setTime] = useState('10:00 AM');
  const [type, setType] = useState('Routine Checkup & Cleaning');
  const [doctor, setDoctor] = useState('Dr. Sarah Wilson');

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    onBookAppointment({
      id: `apt-${Date.now()}`,
      patientName: 'John Smith',
      doctorName: doctor,
      date,
      time,
      type,
      status: 'Confirmed'
    });
    setShowBookModal(false);
  };

  return (
    <main className="max-w-[1280px] mx-auto px-4 md:px-8 py-6 pb-28 md:pb-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#fbbf24] font-semibold">Clinical Scheduling</span>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-0.5">
            Appointments &amp; Timeline
          </h1>
          <p className="text-xs text-[#a1a1aa] mt-1">
            Manage your clinical consultations, surgery dates, and hygiene follow-ups.
          </p>
        </div>
        <button
          onClick={() => setShowBookModal(true)}
          className="h-11 px-6 rounded-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 hover:brightness-105 transition-all shadow-md cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          Book Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Scheduled Appointments */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#fbbf24] font-semibold">Scheduled Visits</span>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#fbbf24] text-[18px]">event_available</span>
              Upcoming Appointments
            </h2>
          </div>

          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-[#141414] border border-white/10 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/20 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-13 h-13 rounded-2xl bg-[#1e1b12] border border-amber-500/25 text-[#fbbf24] flex flex-col items-center justify-center font-bold shrink-0">
                  <span className="text-[10px] uppercase leading-none text-[#fbbf24]/80 tracking-wider">
                    {apt.date.split(' ')[0]}
                  </span>
                  <span className="text-xl leading-none mt-1 font-extrabold">{apt.date.split(' ')[1]?.replace(',', '') || '15'}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-bold text-base text-white">{apt.type}</h3>
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 uppercase tracking-wider">
                      {apt.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#a1a1aa] mt-1.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-[#fbbf24]">stethoscope</span>
                    {apt.doctorName}
                  </p>
                  <p className="text-xs text-[#a1a1aa] flex items-center gap-1.5 mt-0.5">
                    <span className="material-symbols-outlined text-[15px] text-[#fbbf24]">schedule</span>
                    {apt.time} • Room 3A (Operatory Suite)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-end sm:self-center">
                <button className="px-4 py-2 border border-white/20 rounded-full text-xs uppercase tracking-wider font-semibold text-zinc-300 hover:bg-white/5 transition-colors cursor-pointer">
                  Reschedule
                </button>
                <button className="px-5 py-2 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] rounded-full text-xs uppercase tracking-wider font-bold hover:brightness-105 transition-all shadow-md cursor-pointer">
                  Check-in
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Clinic Hours & Information */}
        <div className="space-y-4">
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#fbbf24] font-semibold">Location &amp; Hours</span>
              <span className="material-symbols-outlined text-[#fbbf24] text-[18px]">domain</span>
            </div>
            <h3 className="font-bold text-base text-white mb-3">
              DentalCare Central Pavilion
            </h3>
            <div className="space-y-2 text-xs text-[#a1a1aa]">
              <p className="text-zinc-200 font-medium">450 Medical Heights Plaza, Suite 400</p>
              <p>San Francisco, CA 94102</p>
              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="flex justify-between">
                  <span>Mon - Fri:</span>
                  <span className="font-semibold text-white">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-semibold text-white">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-red-400 font-semibold">Emergency on-call only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Appointment Modal */}
      {showBookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#fbbf24] font-semibold">New Reservation</span>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#fbbf24] text-[20px]">event_available</span>
                  Book Dental Visit
                </h3>
              </div>
              <button
                onClick={() => setShowBookModal(false)}
                className="p-1 text-[#a1a1aa] hover:text-white rounded-full hover:bg-white/5 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleBook} className="space-y-4 text-xs">
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-zinc-300 block mb-1.5">Appointment Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full h-11 px-3.5 bg-[#0d0d0d] rounded-xl text-sm text-white border border-white/10 focus:border-[#fbbf24] outline-hidden"
                >
                  <option value="Routine Checkup & Cleaning" className="bg-[#141414]">Routine Checkup &amp; Cleaning</option>
                  <option value="Wisdom Tooth Extraction Consultation" className="bg-[#141414]">Wisdom Tooth Consultation</option>
                  <option value="Emergency Tooth Pain" className="bg-[#141414]">Emergency Tooth Pain</option>
                  <option value="Orthodontic Aligners Check" className="bg-[#141414]">Orthodontic Aligners Check</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-zinc-300 block mb-1.5">Preferred Doctor</label>
                <select
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="w-full h-11 px-3.5 bg-[#0d0d0d] rounded-xl text-sm text-white border border-white/10 focus:border-[#fbbf24] outline-hidden"
                >
                  <option value="Dr. Sarah Wilson" className="bg-[#141414]">Dr. Sarah Wilson (Oral Surgery)</option>
                  <option value="Dr. Sarah Smith" className="bg-[#141414]">Dr. Sarah Smith (Orthodontics)</option>
                  <option value="Dr. James Doe" className="bg-[#141414]">Dr. James Doe (General Dentistry)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-zinc-300 block mb-1.5">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full h-11 px-3 bg-[#0d0d0d] rounded-xl text-sm text-white border border-white/10 focus:border-[#fbbf24] outline-hidden color-scheme-dark"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-zinc-300 block mb-1.5">Time Slot</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full h-11 px-3 bg-[#0d0d0d] rounded-xl text-sm text-white border border-white/10 focus:border-[#fbbf24] outline-hidden"
                  >
                    <option value="09:00 AM" className="bg-[#141414]">09:00 AM</option>
                    <option value="10:00 AM" className="bg-[#141414]">10:00 AM</option>
                    <option value="01:30 PM" className="bg-[#141414]">01:30 PM</option>
                    <option value="03:00 PM" className="bg-[#141414]">03:00 PM</option>
                  </select>
                </div>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowBookModal(false)}
                  className="px-5 py-2 border border-white/20 rounded-full text-xs uppercase tracking-wider font-semibold text-zinc-300 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] text-xs uppercase tracking-wider font-bold rounded-full hover:brightness-105 transition-all shadow-md cursor-pointer"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};
