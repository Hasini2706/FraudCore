import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HelpCircle,
  ShieldAlert,
  AlertOctagon,
  PhoneCall,
  VideoOff,
  Lock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  BookOpen,
  CheckSquare,
  Search
} from 'lucide-react';

export const AboutDigitalArrestPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Can CBI, ED, or State Police place someone under "Digital Arrest" over a video call?',
      a: 'NO. No law in India permits online digital arrest over video calls. Police and CBI serve physical written notices or warrants via legal channels. They never conduct video interrogations or demand money transfers.'
    },
    {
      q: 'What should I do if a caller shows an official-looking Supreme Court legal notice?',
      a: 'Counterfeit legal notices carrying Supreme Court, CBI, or TRAI seals are easily fabricated by scammers using graphic tools. Official judicial notices are never sent via WhatsApp or Skype. Disconnect immediately.'
    },
    {
      q: 'Why do scammers force victims to stay alone in a closed room with camera turned on?',
      a: 'This is an isolation pressure tactic designed to prevent victims from consulting family members, bank managers, or real police officers who would immediately expose the scam.'
    },
    {
      q: 'What is the "Golden Hours" rule if money has already been debited?',
      a: 'The first 2 hours after a fraudulent transaction are critical. Calling National Helpline 1930 immediately enables financial intelligence units to freeze recipient bank accounts before funds are withdrawn.'
    }
  ];

  return (
    <div className="space-y-6 relative text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#334155] pb-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#f8fafc]">Cyber Safety Advisory Portal</h2>
          <p className="text-xs text-[#94a3b8] mt-0.5">
            Anatomy of Digital Arrest extortion tactics, legal ground realities, and citizen guidelines
          </p>
        </div>
      </div>

      {/* What is Digital Arrest Info Sheet */}
      <div className="gov-card p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#111827] border border-[#334155] text-[#ef4444] rounded-xl">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Modus Operandi Breakdown</h2>
            <p className="text-[11px] text-[#94a3b8] mt-0.5">Understanding Psychological Coercion & Fake Insignia Syndicates</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
          <p>
            A <strong>"Digital Arrest"</strong> is a highly structured extortion scheme operated by cross-border cybercrime syndicates. Fraudsters contact citizens claiming that a parcel containing contraband (illegal drugs, counterfeit passports) or a bank account tied to terror financing has been flagged in their name.
          </p>
          <p>
            The scammers then direct the victim to download chat apps like Skype or WhatsApp and join a video call. On camera, fraudsters sit in rooms designed to mimic actual police stations, wearing uniforms and displaying forged badges. They force victims to remain on camera for hours or days under "digital surveillance," terrorizing them until they transfer large sums of money as "security deposits" or "verification audits."
          </p>
        </div>

        {/* Myth vs Reality Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div className="p-5 rounded-xl bg-[#ef4444]/5 border border-[#ef4444]/20 space-y-2">
            <div className="flex items-center gap-2 text-[#ef4444] font-bold text-xs font-mono uppercase tracking-wider">
              <XCircle className="w-4 h-4 shrink-0" />
              Scammer Coercive Threat
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
              "This is the CBI. You are under digital arrest. Keep your video on, stay alone in your room, and transfer your bank balance to the official government clearance vault."
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#22c55e]/5 border border-[#22c55e]/20 space-y-2">
            <div className="flex items-center gap-2 text-[#22c55e] font-bold text-xs font-mono uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Legal Ground Truth
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              <strong>Indian law does not recognize "Digital Arrest".</strong> No agency conducts inquiries over Skype video, serves arrest warrants via WhatsApp, or demands money to clear criminal charges.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Graphics of Scam Progression */}
      <div className="space-y-4">
        <div className="text-left">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Scam Progression Timeline</h3>
          <p className="text-[11px] text-[#94a3b8] mt-0.5">Four distinct phases of extortion coercion</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="gov-card p-5 space-y-3">
            <span className="w-6 h-6 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/20 text-[#ef4444] flex items-center justify-center font-mono font-bold text-xs">
              01
            </span>
            <h4 className="text-xs font-bold text-white">Trapped Call</h4>
            <p className="text-[11px] text-[#94a3b8] leading-relaxed">
              Robocall alleging mobile connection suspension or contraband parcels.
            </p>
          </div>

          <div className="gov-card p-5 space-y-3">
            <span className="w-6 h-6 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b] flex items-center justify-center font-mono font-bold text-xs">
              02
            </span>
            <h4 className="text-xs font-bold text-white">Uniform Display</h4>
            <p className="text-[11px] text-[#94a3b8] leading-relaxed">
              Victim is forwarded to Skype call showing fraudsters in fake uniforms.
            </p>
          </div>

          <div className="gov-card p-5 space-y-3">
            <span className="w-6 h-6 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#3b82f6] flex items-center justify-center font-mono font-bold text-xs">
              03
            </span>
            <h4 className="text-xs font-bold text-white">Isolation Rule</h4>
            <p className="text-[11px] text-[#94a3b8] leading-relaxed">
              Coerced to stay alone in a closed room and forbidden from calling relatives.
            </p>
          </div>

          <div className="gov-card p-5 space-y-3">
            <span className="w-6 h-6 rounded-lg bg-white/5 border border-[#334155] text-white flex items-center justify-center font-mono font-bold text-xs">
              04
            </span>
            <h4 className="text-xs font-bold text-white">Funds Transfer</h4>
            <p className="text-[11px] text-[#94a3b8] leading-relaxed">
              Forced RTGS or UPI deposits into mules accounts for "verification".
            </p>
          </div>
        </div>
      </div>

      {/* Safety Checklist */}
      <div className="gov-card p-6 md:p-8 space-y-5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-[#22c55e]" />
          Cyber Safety Protocol Check
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          <div className="p-4 bg-[#111827] border border-[#334155]/60 rounded-xl space-y-1.5">
            <div className="font-bold text-[#38bdf8] flex items-center gap-1.5 font-mono text-[11px]">
              <VideoOff className="w-4 h-4 shrink-0" />
              1. DISCONNECT CAMERA
            </div>
            <p className="text-[#94a3b8] leading-relaxed">
              Terminate Skype calls from unverified persons immediately. Genuine officers serving summons will not request video interrogation.
            </p>
          </div>

          <div className="p-4 bg-[#111827] border border-[#334155]/60 rounded-xl space-y-1.5">
            <div className="font-bold text-[#38bdf8] flex items-center gap-1.5 font-mono text-[11px]">
              <Lock className="w-4 h-4 shrink-0" />
              2. SECURE BANK DEPOSITS
            </div>
            <p className="text-[#94a3b8] leading-relaxed">
              Government agencies never require cash security transfers. Never share bank login details or transfer funds.
            </p>
          </div>

          <div className="p-4 bg-[#111827] border border-[#334155]/60 rounded-xl space-y-1.5">
            <div className="font-bold text-[#38bdf8] flex items-center gap-1.5 font-mono text-[11px]">
              <PhoneCall className="w-4 h-4 shrink-0" />
              3. ENGAGE HELPLINE 1930
            </div>
            <p className="text-[#94a3b8] leading-relaxed">
              If financial losses occur, dial Helpline 1930 immediately to execute emergency banking freeze processes.
            </p>
          </div>
        </div>
      </div>

      {/* Accordion FAQs */}
      <div className="gov-card p-6 md:p-8 space-y-5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Frequently Asked Safety Queries</h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl bg-[#111827] border border-[#334155]/60 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-xs text-white flex items-center justify-between transition hover:bg-[#1e293b]/40"
              >
                <span className="pr-4 leading-snug">{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-4 h-4 text-[#38bdf8] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#94a3b8] shrink-0" />}
              </button>

              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs text-[#94a3b8] leading-relaxed border-t border-[#334155]/30">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-[#f59e0b]/5 border border-[#f59e0b]/20 rounded-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20">
              <PhoneCall className="w-4.5 h-4.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">National Cyber Crime Helpline</h4>
              <p className="text-[10px] text-[#f59e0b] font-bold font-mono mt-0.5">Instant Telephony Support</p>
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between p-3 bg-[#111827] border border-[#334155]/60 rounded-xl">
              <span className="text-[#94a3b8]">National Cyber Helpline</span>
              <a href="tel:1930" className="font-bold text-[#f59e0b] text-sm hover:underline">
                1930
              </a>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#111827] border border-[#334155]/60 rounded-xl">
              <span className="text-[#94a3b8]">Official Web Portal</span>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noreferrer"
                className="text-[#38bdf8] font-semibold flex items-center gap-1 hover:underline"
              >
                cybercrime.gov.in <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="gov-card p-6 flex flex-col justify-between min-h-[160px]">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4 text-[#38bdf8]" />
              Run Suspect Call Check
            </h4>
            <p className="text-[11px] text-[#94a3b8] mt-1.5 leading-relaxed">
              If you received a coercive message, suspicious WhatsApp warrant screenshot, or call details, parse it instantly on the Scam Analyzer.
            </p>
          </div>

          <NavLink
            to="/analyzer"
            className="w-full py-2.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition duration-150 shadow-md shadow-blue-500/10 mt-4"
          >
            <Search className="w-4 h-4" />
            <span>Launch Threat Analyzer</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
