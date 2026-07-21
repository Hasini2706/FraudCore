import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Activity, 
  Search, 
  BookOpen, 
  Bot, 
  Bell, 
  Settings, 
  User, 
  PhoneCall, 
  Menu,
  X,
  ShieldAlert,
  CreditCard,
  FileSpreadsheet
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const primaryNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: Activity },
    { label: 'Fraud Monitoring', path: '/analyzer', icon: Search },
    { label: 'Transactions', path: '/dashboard?tab=transactions', icon: CreditCard },
    { label: 'Complaints', path: '/dashboard?tab=complaints', icon: FileSpreadsheet },
    { label: 'Investigations', path: '/assistant', icon: Bot },
    { label: 'AI Analysis', path: '/analyzer?tab=ai', icon: ShieldAlert },
    { label: 'Reports', path: '/about', icon: BookOpen },
    { label: 'Alerts', path: '/dashboard?tab=alerts', icon: Bell },
  ];

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path.split('?')[0]);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0F172A] border-r border-[rgba(255,255,255,0.08)] select-none text-sm text-[#CBD5E1]">
      {/* Brand & Logo */}
      <div className="p-6 border-b border-[rgba(255,255,255,0.08)] space-y-2 bg-[#0B1220]/40">
        <NavLink to="/" className="flex items-center gap-3 group" onClick={() => setIsMobileOpen(false)}>
          <div className="p-2 rounded-lg bg-[#00BFA6]/10 border border-[#00BFA6]/20 text-[#00BFA6] group-hover:bg-[#00BFA6]/20 transition-colors">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-[#F8FAFC] font-manrope">
              Fraud<span className="text-[#00BFA6]">Core</span>
            </span>
            <div className="text-[10px] text-[#CBD5E1]/60 font-medium leading-none mt-0.5 uppercase tracking-wider">
              Banking Intelligence
            </div>
          </div>
        </NavLink>
        <div className="text-[9px] font-bold text-[#CBD5E1]/45 uppercase tracking-widest pt-1 leading-none font-space">
          Enterprise Security Platform
        </div>
      </div>

      {/* Main Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-bold text-[#CBD5E1]/40 uppercase tracking-widest mb-2 font-space">
            Core Operations
          </div>
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const active = isLinkActive(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-xs transition-all ${
                  active 
                    ? 'bg-[#1D4ED8]/10 text-[#00BFA6] border border-[#00BFA6]/20 font-semibold' 
                    : 'text-[#CBD5E1] hover:bg-[#1A2332] hover:text-[#F8FAFC]'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#00BFA6]' : 'text-[#CBD5E1]'}`} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* System Settings & Actions */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-bold text-[#CBD5E1]/40 uppercase tracking-widest mb-2 font-space">
            Administration
          </div>
          
          <button
            onClick={() => alert('Settings Scope: Restriced access to Security Administrator (NPCI/VISA level).')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-xs text-[#CBD5E1] hover:bg-[#1A2332] hover:text-[#F8FAFC] transition-all text-left"
          >
            <Settings className="w-4 h-4 text-[#CBD5E1]" />
            <span>Settings</span>
          </button>

          <a
            href="tel:1930"
            className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#F59E0B]/5 border border-[#F59E0B]/20 text-[#F59E0B] hover:bg-[#F59E0B]/10 font-bold text-[11px] transition-colors mt-2"
          >
            <span className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>National Helpline</span>
            </span>
            <span className="font-mono bg-[#F59E0B] text-[#0B1220] px-1.5 py-0.2 rounded text-[10px]">1930</span>
          </a>
        </div>
      </div>

      {/* User Profile Block at Bottom */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.08)] bg-[#0B1220]/50 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#1D4ED8] text-white">
          <User className="w-4 h-4" />
        </div>
        <div className="overflow-hidden">
          <div className="font-bold text-xs text-[#F8FAFC] truncate">Analyst. FraudCore</div>
          <div className="text-[10px] text-[#CBD5E1]/60 font-medium leading-none mt-0.5 truncate">National Fraud Cell</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Permanent) */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden w-full h-14 bg-[#0F172A] border-b border-[rgba(255,255,255,0.08)] px-4 flex items-center justify-between sticky top-0 z-40">
        <NavLink to="/" className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#00BFA6]" />
          <span className="font-extrabold tracking-tight text-[#F8FAFC] text-base font-manrope">
            Fraud<span className="text-[#00BFA6]">Core</span>
          </span>
        </NavLink>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg border border-[rgba(255,255,255,0.08)] hover:bg-[#1A2332] text-[#CBD5E1]"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-[#0B1220]/60 backdrop-blur-sm" 
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative flex flex-col w-64 max-w-xs h-full z-10 animate-slide-in">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
};
