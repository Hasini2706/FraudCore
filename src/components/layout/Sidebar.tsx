import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  FileText,
  Radio,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  onOpenReportModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onOpenReportModal
}) => {
  const menuItems = [
    {
      label: 'Dashboard',
      path: '/',
      icon: LayoutDashboard,
      type: 'route'
    },
    {
      label: 'Scam Analyzer',
      path: '/analyzer',
      icon: Search,
      type: 'route'
    },
    {
      label: 'Evidence Generator',
      onClick: onOpenReportModal,
      icon: FileText,
      type: 'action'
    },
    {
      label: 'Command Center',
      path: '/dashboard',
      icon: Radio,
      type: 'route',
      badge: 'LIVE'
    },
    {
      label: 'About & FAQ',
      path: '/about',
      icon: HelpCircle,
      type: 'route'
    }
  ];

  return (
    <aside className="w-64 bg-[#111827] border-r border-[#334155] h-screen flex flex-col fixed left-0 top-0 z-30 select-none">
      {/* Top Brand Header */}
      <div className="p-6 border-b border-[#334155] flex flex-col gap-3">
        <div className="flex items-center gap-3">
          {/* Custom Government Insignia SVG */}
          <div className="w-10 h-10 shrink-0 bg-[#1e293b] border border-[#334155] rounded-xl flex items-center justify-center p-1.5 shadow-inner">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Outer circular crest */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="4" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#22c55e" strokeWidth="2" />
              {/* Inner Ashoka Chakra style wheel spokes */}
              <circle cx="50" cy="50" r="16" fill="none" stroke="#f8fafc" strokeWidth="2" />
              <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
              {/* Central star shield */}
              <polygon points="50,22 58,38 76,38 62,48 67,66 50,56 33,66 38,48 24,38 42,38" fill="#3b82f6" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold text-[#f8fafc] leading-tight flex items-center gap-1.5 tracking-tight font-sans">
              Fraud$core
            </h1>
            <span className="text-[9px] font-bold text-[#38bdf8] uppercase tracking-wider font-mono">
              GOVT IA PANEL
            </span>
          </div>
        </div>
        <div className="text-[10px] uppercase tracking-widest text-[#94a3b8] font-bold leading-relaxed border-t border-[#334155]/60 pt-2 font-mono">
          Public Safety Intelligence
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        <div className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider px-3 mb-2 font-mono">
          Security Menu
        </div>
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          if (item.type === 'route') {
            return (
              <NavLink
                key={idx}
                to={item.path!}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all duration-150 ${
                    isActive
                      ? 'bg-[#3b82f6] text-[#f8fafc] shadow-md shadow-blue-500/20'
                      : 'text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b]'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4.5 h-4.5 shrink-0" />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-red-500/20 text-red-400 border border-red-500/30 font-mono">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                </div>
              </NavLink>
            );
          } else {
            return (
              <button
                key={idx}
                onClick={item.onClick}
                className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b] transition-all duration-150 text-left"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4.5 h-4.5 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#3b82f6]/20 text-[#38bdf8] border border-[#3b82f6]/30 font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          }
        })}
      </nav>

      {/* Sidebar Footer Controls */}
      <div className="p-4 border-t border-[#334155] bg-[#0c121e]">
        <div className="text-center text-[9px] text-[#94a3b8]/60 font-mono">
          HELPLINE PROTOCOL 1930
        </div>
      </div>
    </aside>
  );
};
