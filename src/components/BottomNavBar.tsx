import React from 'react';

interface BottomNavBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'reports', label: 'Reports', icon: 'description' },
    { id: 'advice', label: 'Advice', icon: 'recommend' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar_today' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md shadow-2xl pb-safe">
      <div className="flex justify-around items-center h-[64px] px-2 w-full">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              aria-label={item.label}
              className={`flex flex-col items-center justify-center transition-all duration-150 min-w-[58px] h-[48px] rounded-xl px-2 py-1 ${
                isActive
                  ? 'text-[#fbbf24] font-semibold bg-amber-500/10 border border-amber-500/25 scale-95 shadow-xs'
                  : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[22px] ${isActive ? 'icon-fill' : ''}`}
                style={{ fontVariationSettings: isActive ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400" }}
              >
                {item.icon}
              </span>
              <span className="text-[9px] tracking-widest uppercase font-semibold mt-0.5 leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
