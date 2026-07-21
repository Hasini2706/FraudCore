import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldAlert,
  AlertOctagon,
  PhoneCall,
  VideoOff,
  Lock,
  CheckCircle2,
  XCircle,
  ExternalLink,
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
    <div className="relative min-h-screen bg-[#0B1220] pb-20 pt-8 select-none text-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00BFA6]/5 border border-[#00BFA6]/20 text-[#00BFA6] text-xs font-semibold shadow-sm font-space">
            <BookOpen className="w-3.5 h-3.5 text-[#00BFA6]" />
            <span>PUBLIC CYBER SAFETY ADVISORY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight font-manrope font-medium">
            About Digital Arrest Extortion
          </h1>
          <p className="text-[#CBD5E1] text-xs sm:text-sm font-medium">
            Citizen security handbook: Modus operandi of digital arrest syndicates, threat vectors, legal boundaries, and emergency reports.
          </p>
        </div>

        {/* Section 1: What is Digital Arrest Infographic Card */}
        <div className="bg-[#1A2332] border border-white/5 rounded-xl p-8 space-y-6 shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#00BFA6]/10 border border-[#00BFA6]/20 text-[#00BFA6]">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#F8FAFC] font-manrope">What is a Digital Arrest Scam?</h2>
              <p className="text-xs text-[#CBD5E1]/60 font-medium">Extortion via Psychological Panic & Fake Agency Credentials</p>
            </div>
          </div>

          <p className="text-[#CBD5E1] text-xs sm:text-sm leading-relaxed">
            A <strong>"Digital Arrest"</strong> is a coercive cyber extortion strategy where international syndicates impersonate authority units like the <strong>CBI</strong>, <strong>Enforcement Directorate (ED)</strong>, <strong>State Cyber Police</strong>, or <strong>Customs Department</strong>.
          </p>

          <p className="text-[#CBD5E1] text-xs sm:text-sm leading-relaxed">
            Fraudsters allege that a high-value shipping package containing narcotics or a laundering banking ledger has been registered under the victim's name. They pressure victims to remain on 24-48 hour Skype video calls under threat of immediate physical arrest, eventually demanding transfer of funds to "RBI safety accounts."
          </p>

          {/* Myth vs Reality Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-medium">
            <div className="p-5 rounded-lg bg-red-950/20 border border-red-900/40 space-y-2">
              <div className="flex items-center gap-1.5 text-[#EF4444] font-bold text-xs font-space">
                <XCircle className="w-4 h-4 text-[#EF4444]" />
                Scammer False Assertions (Myth)
              </div>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                "You are under online digital arrest by CBI. Keep your video feed active, remain in solitary confinement, and transfer bank balances to verify source authenticity."
              </p>
            </div>

            <div className="p-5 rounded-lg bg-green-950/20 border border-green-900/40 space-y-2">
              <div className="flex items-center gap-1.5 text-[#22C55E] font-bold text-xs font-space">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                Legal Ground Truth (Reality)
              </div>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                <strong>No legal system in India recognizes "Digital Arrest".</strong> Law enforcement serves subpoenas physically via local stations, never demands online payments, and never interrogates via Skype.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Scam Progression Timeline */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-[#F8FAFC] font-manrope">Scam Progression Timeline</h2>
            <p className="text-xs text-[#CBD5E1]/60 mt-1 font-medium">Evolution of Digital Arrest Extortion Plots</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 bg-[#1A2332] border border-white/5 rounded-xl space-y-3 shadow-md hover:border-[#00BFA6]/40 transition-all">
              <span className="w-7 h-7 rounded bg-red-950/30 text-[#EF4444] flex items-center justify-center font-mono font-bold text-xs border border-red-900/40">
                01
              </span>
              <h3 className="text-xs font-bold text-[#F8FAFC]">Initial Trap Call</h3>
              <p className="text-[11px] text-[#CBD5E1]/70 leading-relaxed">
                Automated IVR call alleging legal violations, SIM blockade, or package intercept.
              </p>
            </div>

            <div className="p-5 bg-[#1A2332] border border-white/5 rounded-xl space-y-3 shadow-md hover:border-[#00BFA6]/40 transition-all">
              <span className="w-7 h-7 rounded bg-amber-950/30 text-[#F59E0B] flex items-center justify-center font-mono font-bold text-xs border border-amber-900/40">
                02
              </span>
              <h3 className="text-xs font-bold text-[#F8FAFC]">Officer Transfer</h3>
              <p className="text-[11px] text-[#CBD5E1]/70 leading-relaxed">
                Transferred to fraudsters in fake military uniforms inside mockup offices via Skype.
              </p>
            </div>

            <div className="p-5 bg-[#1A2332] border border-white/5 rounded-xl space-y-3 shadow-md hover:border-[#00BFA6]/40 transition-all">
              <span className="w-7 h-7 rounded bg-[#111827] text-[#00BFA6] flex items-center justify-center font-mono font-bold text-xs border border-white/5">
                03
              </span>
              <h3 className="text-xs font-bold text-[#F8FAFC]">Solitary Video Isolation</h3>
              <p className="text-[11px] text-[#CBD5E1]/70 leading-relaxed">
                Terrorized into staying alone in a closed room, prohibiting family discussions.
              </p>
            </div>

            <div className="p-5 bg-[#1A2332] border border-white/5 rounded-xl space-y-3 shadow-md hover:border-[#00BFA6]/40 transition-all">
              <span className="w-7 h-7 rounded bg-[#111827] text-[#1D4ED8] flex items-center justify-center font-mono font-bold text-xs border border-white/5">
                04
              </span>
              <h3 className="text-xs font-bold text-[#F8FAFC]">Extortion Transfer</h3>
              <p className="text-[11px] text-[#CBD5E1]/70 leading-relaxed">
                Coerced bank transfers to fraudulent accounts under mock clearing agreements.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Cyber Safety Checklist */}
        <div className="bg-[#1A2332] border border-white/5 rounded-xl p-8 space-y-6 shadow-md">
          <h2 className="text-lg font-bold text-[#F8FAFC] flex items-center gap-2 font-manrope">
            <CheckSquare className="w-5.5 h-5.5 text-[#22C55E]" />
            Citizen Cyber Safety Checklist
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-[#111827] border border-white/5 space-y-1.5 shadow-inner font-medium">
              <div className="font-bold text-[#00BFA6] flex items-center gap-1.5">
                <VideoOff className="w-4 h-4 text-[#00BFA6]" /> 1. End Video Demands
              </div>
              <p className="text-[#CBD5E1]/70 leading-relaxed">
                Disconnect Skype/WhatsApp calls immediately if someone demands online surveillance.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#111827] border border-white/5 space-y-1.5 shadow-inner font-medium">
              <div className="font-bold text-[#00BFA6] flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#00BFA6]" /> 2. Refuse Transfers
              </div>
              <p className="text-[#CBD5E1]/70 leading-relaxed">
                Never transfer funds to any security or validation account specified over calls.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#111827] border border-white/5 space-y-1.5 shadow-inner font-medium">
              <div className="font-bold text-[#00BFA6] flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-[#00BFA6]" /> 3. Dial 1930 Hotline
              </div>
              <p className="text-[#CBD5E1]/70 leading-relaxed">
                Notify the National Cyber Crime Cell immediately at 1930 and file a report.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: FAQ Accordion */}
        <div className="bg-[#1A2332] border border-white/5 rounded-xl p-8 space-y-6 shadow-md">
          <h2 className="text-lg font-bold text-[#F8FAFC] font-manrope">Frequently Asked Questions</h2>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-lg bg-[#111827] border border-white/5 overflow-hidden shadow-inner">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-semibold text-xs text-[#F8FAFC] flex items-center justify-between transition-colors hover:bg-[#1A2332]"
                >
                  <span className="pr-4">{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-[#00BFA6] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#CBD5E1]/40 shrink-0" />}
                </button>

                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-[#CBD5E1]/80 leading-relaxed border-t border-white/5 bg-[#1A2332]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Response Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 space-y-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B]">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F8FAFC] font-manrope">Emergency Cyber Helpline</h3>
                <p className="text-xs text-[#F59E0B] font-mono font-semibold">National Response Unit</p>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#111827] border border-white/5 shadow-inner font-semibold">
                <span className="text-[#CBD5E1]">National Cyber Crime Helpline</span>
                <a href="tel:1930" className="font-bold text-[#F59E0B] text-sm hover:underline">
                  1930
                </a>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#111827] border border-white/5 shadow-inner font-semibold">
                <span className="text-[#CBD5E1]">Official Portal Link</span>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#00BFA6] font-bold flex items-center gap-1 hover:underline"
                >
                  cybercrime.gov.in <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-white/5 bg-[#1A2332] space-y-4 shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-[#F8FAFC] flex items-center gap-2 font-manrope">
                <AlertOctagon className="w-5 h-5 text-[#00BFA6]" />
                Test Suspicious Transcript
              </h3>
              <p className="text-xs text-[#CBD5E1] mt-1 font-medium">
                Verify call scenarios immediately via FraudCore's integrated NLP analyzer tool.
              </p>
            </div>

            <NavLink
              to="/analyzer"
              className="w-full py-2.5 rounded bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-[#0B1220] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-sm"
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
