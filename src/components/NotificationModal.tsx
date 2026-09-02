import React from 'react';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
  icon: string;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden mt-12 md:mr-8 flex flex-col max-h-[80vh]">
        <div className="px-5 py-4 border-b border-white/10 bg-[#171717] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1e1b12] border border-amber-500/25 text-[#fbbf24] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">notifications</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#fbbf24] font-semibold block">Feed</span>
              <h3 className="font-bold text-white text-sm leading-none">Notifications</h3>
            </div>
            <span className="text-[10px] font-semibold bg-amber-500/10 border border-amber-500/25 text-[#fbbf24] px-2 py-0.5 rounded-full ml-1">
              {notifications.filter((n) => !n.read).length} new
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-xs text-[#fbbf24] hover:text-[#f59e0b] font-semibold cursor-pointer"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 text-[#a1a1aa] hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        <div className="divide-y divide-white/10 overflow-y-auto flex-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 flex items-start gap-3 hover:bg-white/5 transition-colors ${
                !n.read ? 'bg-[#181818]' : 'bg-[#141414]'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-[#1e1b12] border border-amber-500/25 flex items-center justify-center text-[#fbbf24] shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">{n.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-white leading-snug">{n.title}</p>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-[#fbbf24] shrink-0 shadow-xs"></span>}
                </div>
                <p className="text-xs text-[#a1a1aa] mt-0.5 leading-relaxed">{n.desc}</p>
                <p className="text-[10px] text-zinc-500 font-mono mt-1">{n.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-[#171717] border-t border-white/10 text-center">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
          >
            Close Feed
          </button>
        </div>
      </div>
    </div>
  );
};
