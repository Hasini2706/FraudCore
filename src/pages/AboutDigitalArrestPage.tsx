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
  ShieldCheck,
  Search,
  ChevronDown,
  ChevronUp,
  BookOpen,
  CheckSquare
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
    <div className="relative min-h-screen bg-cyber-radial bg-cyber-grid pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="font-space font-semibold">PUBLIC CYBER SAFETY ADVISORY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-manrope">
            About Digital Arrest & Extortion Tactics
          </h1>
          <p className="text-slate-300 text-sm">
            Comprehensive citizen guide: Anatomy of digital arrest extortion, common scam vectors, myth vs reality, and 1930 emergency response.
          </p>
        </div>

        {/* Section 1: What is Digital Arrest Infographic Card */}
        <div className="glass-panel rounded-2xl border border-cyan-500/30 p-8 space-y-6 bg-slate-900/95 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-manrope">What is a Digital Arrest Scam?</h2>
              <p className="text-xs text-slate-400">Extortion via Psychological Coercion & Fake Enforcement Identity</p>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">
            A <strong>"Digital Arrest"</strong> is a coercive cyber fraud syndicate strategy where criminals impersonate high-ranking officers from government agencies like the <strong>CBI</strong>, <strong>Enforcement Directorate (ED)</strong>, <strong>State Cyber Police</strong>, or <strong>Customs Department</strong>.
          </p>

          <p className="text-slate-300 text-sm leading-relaxed">
            The fraudsters contact citizens claiming a suspicious package containing illegal substances or a bank account tied to money laundering has been registered in their name. They force victims to remain on 24-48 hour video calls in a closed room under threat of immediate physical imprisonment.
          </p>

          {/* Myth vs Reality Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/30 space-y-2">
              <div className="flex items-center gap-2 text-red-400 font-bold text-xs font-space">
                <XCircle className="w-4 h-4" />
                Scammer False Claim (Myth)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "You are under online digital arrest by CBI. Keep your video camera on, stay alone in your room, and transfer money to an RBI verification account for clearance."
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-space">
                <CheckCircle2 className="w-4 h-4" />
                Legal Ground Truth (Reality)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>No law in India permits "Digital Arrest".</strong> Law enforcement agencies NEVER conduct online arrests over Skype, nor demand financial deposits for clearance.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Scam Progression Timeline */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white font-manrope">Scam Progression Timeline</h2>
            <p className="text-xs text-slate-400 mt-1">4-Stage Evolution of Digital Arrest Extortion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl glass-panel-interactive border border-white/10 space-y-3">
              <span className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-mono font-bold text-xs border border-red-500/30">
                01
              </span>
              <h3 className="text-sm font-bold text-white">Initial Trap Call</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated IVR call alleging package interception or illegal SIM card dossier.
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-panel-interactive border border-white/10 space-y-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-xs border border-amber-500/30">
                02
              </span>
              <h3 className="text-sm font-bold text-white">Fake CBI Officer Transfer</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Call is transferred to a fraudster in fake police uniform on Skype/WhatsApp video.
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-panel-interactive border border-white/10 space-y-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs border border-cyan-500/30">
                03
              </span>
              <h3 className="text-sm font-bold text-white">Forced Video Isolation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Victim is terrorized into staying alone in a closed room and forbidden from calling family.
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-panel-interactive border border-white/10 space-y-3">
              <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-mono font-bold text-xs border border-purple-500/30">
                04
              </span>
              <h3 className="text-sm font-bold text-white">Financial Extortion Transfer</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Coerced RTGS/UPI transfer to a fake "Secret Verification RBI Account".
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Cyber Safety Checklist */}
        <div className="glass-panel rounded-2xl border border-white/10 p-8 space-y-6 bg-slate-900/90">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-manrope">
            <CheckSquare className="w-6 h-6 text-emerald-400" />
            Citizen Cyber Safety Checklist
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#030611] border border-slate-800 space-y-2">
              <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                <VideoOff className="w-4 h-4" /> 1. Disconnect Video Demands
              </div>
              <p className="text-slate-400 leading-relaxed">
                End any video call immediately if the caller claims to be police or CBI conducting an online investigation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#030611] border border-slate-800 space-y-2">
              <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                <Lock className="w-4 h-4" /> 2. Refuse Bank Transfers
              </div>
              <p className="text-slate-400 leading-relaxed">
                Never transfer funds to any account claiming to be a "clearance" or "RBI verification" account.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#030611] border border-slate-800 space-y-2">
              <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4" /> 3. Dial 1930 Instantly
              </div>
              <p className="text-slate-400 leading-relaxed">
                Immediately contact the National Cyber Crime Helpline at 1930 and file a dossier on cybercrime.gov.in.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: FAQ Accordion */}
        <div className="glass-panel rounded-2xl border border-white/10 p-8 space-y-6 bg-slate-900/90">
          <h2 className="text-xl font-bold text-white font-manrope">Frequently Asked Cyber Safety Questions</h2>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl bg-[#030611] border border-slate-800 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-semibold text-xs text-white flex items-center justify-between transition hover:bg-slate-800/40"
                >
                  <span className="pr-4">{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                </button>

                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Response Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-manrope">Emergency Cyber Helpline</h3>
                <p className="text-xs text-amber-300 font-mono">National 24/7 Response</p>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#030611] border border-slate-800">
                <span className="text-slate-300">National Cyber Crime Helpline</span>
                <a href="tel:1930" className="font-bold text-amber-400 text-sm hover:underline">
                  1930
                </a>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#030611] border border-slate-800">
                <span className="text-slate-300">Official Portal</span>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 font-semibold flex items-center gap-1 hover:underline"
                >
                  cybercrime.gov.in <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 space-y-4 bg-slate-900/90 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 font-manrope">
                <AlertOctagon className="w-5 h-5 text-cyan-400" />
                Test Suspicious Transcript
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Received a suspicious call or WhatsApp notice? Run instant XAI threat analysis on SentinelAI.
              </p>
            </div>

            <NavLink
              to="/analyzer"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/20"
            >
              <Search className="w-4 h-4" />
              <span>Launch Threat Analyzer</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
