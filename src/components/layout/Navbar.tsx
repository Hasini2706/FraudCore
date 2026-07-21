import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, Search, Bot, Activity, HelpCircle, PhoneCall, Code2, Menu, X, ShieldCheck } from 'lucide-react';
import { ApiIntegrationModal } from '../common/ApiIntegrationModal';

export const Navbar: React.FC = () => {
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/', icon: ShieldCheck },
    { label: 'Scam Analyzer', path: '/analyzer', icon: Search, badge: 'XAI Engine' },
    { label: 'AI Fraud Assistant', path: '/assistant', icon: Bot },
    { label: 'Police SOC Command', path: '/dashboard', icon: Activity, badge: 'Live Telemetry' },
    { label: 'About Digital Arrest', path: '/about', icon: HelpCircle },
  ];

  return (
    <>
      {/* Top Banner Ticker */}
      <div className="bg-[#030611] border-b border-white/10 text-[11px] py-1.5 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-semibold text-cyan-400 uppercase tracking-wider text-[10px] font-space">
              NATIONAL CYBER COMMAND CENTER
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-300 truncate">
              🚨 Enforcement Directive: CBI, ED & Police NEVER initiate online video arrests or demand UPI transfers.
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-slate-400 hidden sm:inline">24/7 Fraud Helpline:</span>
            <a
              href="tel:1930"
              className="flex items-center gap-1.5 font-bold text-amber-400 hover:text-amber-300 transition"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>1930</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-40 bg-[#050816]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="relative p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
                <ShieldAlert className="w-6 h-6 text-cyan-400" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold tracking-tight text-white font-manrope">
                    Sentinel<span className="text-cyan-400">AI</span>
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30 font-mono">
                    ENTERPRISE SOC
                  </span>
                </div>
                <div className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold font-space">
                  Digital Public Safety Intelligence
                </div>
              </div>
            </NavLink>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all relative ${
                        isActive
                          ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-mono">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>

            {/* Right CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => setIsApiModalOpen(true)}
                className="px-3.5 py-2 rounded-xl border border-white/10 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition"
                title="View FastAPI / OpenAI Architecture"
              >
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>API Specs</span>
              </button>

              <NavLink
                to="/analyzer"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition transform active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>Threat Analyzer</span>
              </NavLink>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl border border-white/10 bg-slate-900 text-slate-300 hover:text-white"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-white/10 bg-[#050816] px-4 pt-2 pb-6 space-y-2 animate-fade-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `w-full px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between ${
                      isActive
                        ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30'
                        : 'text-slate-300 hover:bg-white/5'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-cyan-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsApiModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl border border-white/10 bg-slate-900 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Code2 className="w-4 h-4 text-cyan-400" />
                FastAPI / OpenAI Integration Specs
              </button>
            </div>
          </div>
        )}
      </nav>

      <ApiIntegrationModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
      />
    </>
  );
};
