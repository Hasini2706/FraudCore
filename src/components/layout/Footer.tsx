import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, ExternalLink, PhoneCall, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F172A] border-t border-[rgba(255,255,255,0.08)] text-[#CBD5E1] text-xs mt-auto select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#00BFA6]/10 border border-[#00BFA6]/20 text-[#00BFA6]">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="text-base font-bold text-[#F8FAFC] tracking-tight font-manrope">
                Fraud<span className="text-[#00BFA6]">Core</span>
              </span>
            </div>
            <p className="text-[#CBD5E1]/70 text-xs leading-relaxed">
              Enterprise Fraud Intelligence Platform protecting banking gateways, customer deposits, and security operations command centers.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#111827] border border-[rgba(255,255,255,0.08)] text-[10px] text-[#00BFA6] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
              Gateway Defense Active
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5 font-mono text-[11px]">
            <h4 className="text-[#F8FAFC] font-bold text-xs uppercase tracking-wider font-space">
              Operations Navigation
            </h4>
            <ul className="space-y-1.5">
              <li>
                <NavLink to="/dashboard" className="hover:text-[#00BFA6] transition-colors">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/analyzer" className="hover:text-[#00BFA6] transition-colors">
                  Fraud Monitoring
                </NavLink>
              </li>
              <li>
                <NavLink to="/assistant" className="hover:text-[#00BFA6] transition-colors">
                  Investigations
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-[#00BFA6] transition-colors">
                  Reports & FAQs
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Emergency Portals */}
          <div className="space-y-2.5 font-mono text-[11px]">
            <h4 className="text-[#F8FAFC] font-bold text-xs uppercase tracking-wider font-space">
              Operational Links
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-[#00BFA6] transition-colors"
                >
                  National Cyber Portal <ExternalLink className="w-3.5 h-3.5 text-[#CBD5E1]/40" />
                </a>
              </li>
              <li>
                <a
                  href="tel:1930"
                  className="flex items-center gap-1.5 text-[#F59E0B] hover:text-[#F59E0B]/85 font-semibold transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Reserve Helpline: 1930
                </a>
              </li>
              <li>
                <span className="text-[#CBD5E1]/60">NPCI Risk Management Unit</span>
              </li>
              <li>
                <span className="text-[#CBD5E1]/60">RBI Sachet Financial Crime Portal</span>
              </li>
            </ul>
          </div>

          {/* Platform Info */}
          <div className="space-y-2 p-4 rounded-lg bg-[#111827] border border-[rgba(255,255,255,0.08)]">
            <h4 className="text-[#00BFA6] font-bold text-xs uppercase tracking-wider flex items-center justify-between font-space">
              Financial Intelligence Engine
              <span className="w-1.5 h-1.5 rounded-full bg-[#00BFA6]"></span>
            </h4>
            <p className="text-[11px] text-[#CBD5E1]/70 leading-relaxed font-sans">
              FraudCore incorporates Explainable AI (XAI) threat modeling, NLP coercion scoring, and transactional GIS telemetry designed for security operations.
            </p>
          </div>
        </div>

        <div className="pt-6 mt-8 border-t border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#CBD5E1]/50 font-mono">
          <div>
            &copy; {new Date().getFullYear()} FraudCore Cyber Banking Intelligence Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            Financial Intelligence Command with <Heart className="w-3 h-3 text-[#EF4444] inline fill-[#EF4444]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
