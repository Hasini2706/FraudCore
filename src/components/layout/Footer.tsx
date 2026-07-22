import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, ExternalLink, PhoneCall } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111827] border-t border-[#334155] text-[#94a3b8] text-[11px] select-none mt-auto">
      <div className="max-w-[1400px] mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          {/* Brand Col */}
          <div className="space-y-3.5 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#1e293b] border border-[#334155] rounded-xl flex items-center justify-center p-1">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="4" />
                  <polygon points="50,22 58,38 76,38 62,48 67,66 50,56 33,66 38,48 24,38 42,38" fill="#3b82f6" />
                </svg>
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                Fraud$core
              </span>
            </div>
            <p className="text-[#94a3b8] leading-relaxed text-[11px]">
              AI Cyber Intelligence & Public Safety Platform protecting citizens against Digital Arrest scams and coercive online fraud.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1e293b] border border-[#334155] rounded-lg text-[9px] font-mono text-[#38bdf8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span>
              SOC Protocol v2.4 Active
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 font-mono text-[11px]">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/analyzer" className="hover:text-white transition">
                  Threat Analyzer
                </NavLink>
              </li>
              <li>
                <NavLink to="/assistant" className="hover:text-white transition">
                  AI Safety Copilot
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className="hover:text-white transition">
                  Command Center
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-white transition">
                  Public Advisory FAQ
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Emergency Portals */}
          <div className="space-y-3 font-mono text-[11px]">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Emergency Services
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-white transition"
                >
                  <span>Cyber Crime Portal</span>
                  <ExternalLink className="w-3 h-3 text-[#64748b]" />
                </a>
              </li>
              <li>
                <a
                  href="tel:1930"
                  className="flex items-center gap-1 text-[#f59e0b] hover:text-[#d97706] font-semibold"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>National Helpline: 1930</span>
                </a>
              </li>
              <li>
                <span className="text-[#64748b]">RBI Sachet Financial Hub</span>
              </li>
              <li>
                <span className="text-[#64748b]">TRAI Chakshu Tele-Scam</span>
              </li>
            </ul>
          </div>

          {/* Hackathon Status & Disclaimer */}
          <div className="space-y-3 p-4 bg-[#1e293b] border border-[#334155] rounded-xl">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center justify-between font-mono">
              System Demonstration
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span>
            </h4>
            <p className="text-[10px] text-[#94a3b8] leading-relaxed">
              This platform is a hackathon demonstration and is not affiliated with any government agency (Ministry of Home Affairs, CERT-In, NCRB, I4C, or NIC).
            </p>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-[#334155] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#64748b] font-mono">
          <div>
            &copy; {new Date().getFullYear()} Fraud$core Public Safety Platform. Demonstration sandbox environment.
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
            <span>Operational Integrity Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
