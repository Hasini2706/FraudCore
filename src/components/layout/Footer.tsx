import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, ExternalLink, PhoneCall, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#030611] border-t border-white/10 text-slate-400 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight font-manrope">
                Sentinel<span className="text-cyan-400">AI</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Enterprise AI Cyber Intelligence & Public Safety Platform protecting citizens against Digital Arrest extortion, fake CBI warrants, and coercive financial fraud.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-[10px] text-cyan-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              SOC Protocol v2.4 Active
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 font-mono text-[11px]">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-space">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/analyzer" className="hover:text-cyan-400 transition">
                  Threat Analyzer
                </NavLink>
              </li>
              <li>
                <NavLink to="/assistant" className="hover:text-cyan-400 transition">
                  AI Fraud Copilot
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className="hover:text-cyan-400 transition">
                  Police SOC Command
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-cyan-400 transition">
                  About Digital Arrest
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Emergency Portals */}
          <div className="space-y-3 font-mono text-[11px]">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-space">
              Emergency & Official Portals
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-cyan-400 transition"
                >
                  Cyber Crime Portal <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="tel:1930"
                  className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  National Helpline: 1930
                </a>
              </li>
              <li>
                <span className="text-slate-500">RBI Sachet Financial Crime Hub</span>
              </li>
              <li>
                <span className="text-slate-500">TRAI Chakshu Tele-Scam Portal</span>
              </li>
            </ul>
          </div>

          {/* Hackathon Status */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-wider flex items-center justify-between font-space">
              Enterprise Cyber Platform
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              SentinelAI features Explainable AI (XAI) threat modeling, sentiment analysis, and GIS hotspot telemetry ready for FastAPI and OpenAI backend integration.
            </p>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} SentinelAI Enterprise Public Safety Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            Engineered for International Cyber Safety with <Heart className="w-3 h-3 text-red-500 inline fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
