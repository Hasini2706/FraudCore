import React, { useState, useEffect } from 'react';
import { Search, Bell, Shield, User, Clock } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      };
      const formatter = new Intl.DateTimeFormat('en-IN', options);
      setCurrentTime(formatter.format(new Date()) + ' IST');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 border-b border-[#334155] bg-[#0f172a] px-8 flex items-center justify-between sticky top-0 z-20 select-none">
      {/* Search Input Area */}
      <div className="w-96 relative">
        <Search className="w-4 h-4 text-[#94a3b8] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search intel dossier, case ID, or caller logs..."
          className="w-full pl-9 pr-4 py-2 bg-[#111827] border border-[#334155] rounded-xl text-xs text-[#f8fafc] placeholder-[#94a3b8]/60 focus:outline-none focus:border-[#3b82f6] transition duration-150"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-6">
        {/* Real-time Clock */}
        <div className="flex items-center gap-2 text-[#94a3b8] font-mono text-[11px] bg-[#111827] px-3.5 py-1.5 rounded-xl border border-[#334155]">
          <Clock className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span>{currentTime}</span>
        </div>

        {/* System Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#111827] border border-[#334155] rounded-xl text-[10px] font-bold text-[#22c55e] font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
          </span>
          <span className="tracking-wide">SYSTEM: SECURE</span>
        </div>

        {/* Notifications */}
        <button className="p-2 bg-[#111827] border border-[#334155] rounded-xl text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b] relative transition duration-150">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#ef4444] border-2 border-[#111827]"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 bg-[#111827] border border-[#334155] pl-2.5 pr-3.5 py-1.5 rounded-xl">
          <div className="p-1 rounded-lg bg-[#1e293b] text-[#38bdf8] border border-[#334155]">
            <User className="w-4 h-4" />
          </div>
          <div className="text-left font-mono">
            <div className="text-[10px] font-bold text-[#f8fafc] leading-none">Officer ST-4091</div>
            <div className="text-[8px] text-[#94a3b8] mt-0.5 uppercase tracking-widest font-semibold leading-none">Command Agent</div>
          </div>
        </div>
      </div>
    </header>
  );
};
