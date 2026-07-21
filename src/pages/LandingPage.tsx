import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldAlert,
  Search,
  Activity,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Brain,
  ShieldCheck,
  AlertOctagon,
  Building2,
  Globe,
  Database,
  Share2,
  Users
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-cyber-radial bg-cyber-grid pb-20 select-none text-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-16 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00BFA6]/5 border border-[#00BFA6]/20 text-[#00BFA6] text-xs font-semibold tracking-wide shadow-sm font-space">
                <ShieldAlert className="w-4 h-4 text-[#00BFA6]" />
                <span>NPCI GATEWAY COGNITIVE FILTER v2.4</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] font-manrope font-medium">
                Enterprise Cyber Banking <br className="hidden sm:inline" />
                <span className="text-[#00BFA6]">
                  Intelligence Platform
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#CBD5E1] max-w-2xl font-normal leading-relaxed">
                Mitigate high-risk digital arrest extortion and payment routing scams in real-time. FraudCore provides auditable transactional analysis, NLP coercion scoring, and instant banking blocks.
              </p>

              <p className="text-xs sm:text-sm text-[#CBD5E1]/60 max-w-xl">
                Designed for RBI cyber teams, merchant banking nodes, SWIFT clearing blocks, and state crime operations. Protect deposits and block illicit accounts instantly.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <NavLink
                  to="/analyzer"
                  className="w-full sm:w-auto px-7 py-3 rounded bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-[#0B1220] font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition"
                >
                  <Search className="w-4 h-4" />
                  <span>Start Fraud Monitoring</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </NavLink>

                <NavLink
                  to="/dashboard"
                  className="w-full sm:w-auto px-7 py-3 rounded bg-[#1A2332] hover:bg-[#1A2332]/85 border border-white/5 text-[#F8FAFC] font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Activity className="w-4 h-4 text-[#00BFA6]" />
                  <span>Security Command Center</span>
                </NavLink>
              </div>

              {/* Hero Footer Badges */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-[#CBD5E1] border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  <span>Auditable Escrow Analysis</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-[#00BFA6]" />
                  <span>NPCI Network Feeds</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-[#F59E0B]" />
                  <span>Helpline 1930 Integration</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual: Dark Banking Dashboard Mockup */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-full max-w-md bg-[#1A2332] border border-white/5 rounded-xl p-6 shadow-md space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse"></span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#F8FAFC]">
                      TRANSACTION RADAR INTERCEPT
                    </span>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 font-bold">
                    P1 - ESCROW LOCKED
                  </span>
                </div>

                {/* Radar Sweep Display */}
                <div className="relative flex flex-col items-center justify-center py-6 rounded-xl bg-[#111827] border border-white/5 overflow-hidden">
                  <div className="w-32 h-32 rounded-full border border-[#00BFA6]/10 flex items-center justify-center relative">
                    <div className="w-20 h-20 rounded-full border border-[#00BFA6]/25 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border border-[#00BFA6]/30 flex items-center justify-center">
                        <AlertOctagon className="w-5 h-5 text-[#EF4444]" />
                      </div>
                    </div>
                    {/* Rotating radar line */}
                    <div className="absolute inset-0 origin-center animate-radar">
                      <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent to-[#00BFA6]/35"></div>
                    </div>
                  </div>

                  <div className="mt-4 text-center space-y-1">
                    <div className="text-xs font-mono font-bold text-[#EF4444] tracking-wider">
                      COERCION PROBABILITY: 97%
                    </div>
                    <div className="text-[10px] text-[#CBD5E1]/60 font-mono">
                      Target Vector: CBI Impersonation
                    </div>
                  </div>
                </div>

                {/* Floating Analytics Card Preview */}
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#111827] border border-white/5 flex items-center justify-between">
                    <span className="text-[#CBD5E1]/70 font-medium">Explainability Index</span>
                    <span className="text-[#00BFA6] font-mono font-bold">96 / 100</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#111827] border border-white/5 flex items-center justify-between">
                    <span className="text-[#CBD5E1]/70 font-medium">Flagged Account Node</span>
                    <span className="text-[#EF4444] font-mono font-bold">"ICICI 9012"</span>
                  </div>
                </div>

                {/* Quick Action */}
                <NavLink
                  to="/analyzer"
                  className="w-full py-2.5 rounded bg-[#00BFA6]/10 hover:bg-[#00BFA6]/15 border border-[#00BFA6]/20 text-[#00BFA6] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span>Analyze Suspicious Transcript</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Sections */}
      <section className="py-8 bg-[#111827] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[10px] font-mono uppercase tracking-widest text-[#CBD5E1]/60 mb-5 font-semibold">
            Gateway Integration Networks
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-[#CBD5E1] text-xs font-semibold">
            <div className="p-3 bg-[#1A2332] border border-white/5 rounded-xl flex items-center justify-center gap-2">
              <Building2 className="w-4 h-4 text-[#00BFA6]" />
              <span>Reserve Gateways</span>
            </div>
            <div className="p-3 bg-[#1A2332] border border-white/5 rounded-xl flex items-center justify-center gap-2">
              <Database className="w-4 h-4 text-[#1D4ED8]" />
              <span>Banking Grids</span>
            </div>
            <div className="p-3 bg-[#1A2332] border border-white/5 rounded-xl flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              <span>Clearing Hubs</span>
            </div>
            <div className="p-3 bg-[#1A2332] border border-white/5 rounded-xl flex items-center justify-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#F59E0B]" />
              <span>Helpline 1930 Bridge</span>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="bg-[#1A2332] p-5 rounded-xl border border-white/5 text-center space-y-1 shadow-md">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] font-mono tracking-tight">
              ₹1,776 <span className="text-[#00BFA6] text-base">Cr</span>
            </div>
            <div className="text-[10px] text-[#CBD5E1]/60 uppercase font-bold tracking-wider font-space">
              Fraud Saved (Demo)
            </div>
          </div>

          <div className="bg-[#1A2332] p-5 rounded-xl border border-white/5 text-center space-y-1 shadow-md">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#00BFA6] font-mono tracking-tight">
              98.2%
            </div>
            <div className="text-[10px] text-[#CBD5E1]/60 uppercase font-bold tracking-wider font-space">
              AI Detection Precision
            </div>
          </div>

          <div className="bg-[#1A2332] p-5 rounded-xl border border-white/5 text-center space-y-1 shadow-md">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] font-mono tracking-tight">
              50,000+
            </div>
            <div className="text-[10px] text-[#CBD5E1]/60 uppercase font-bold tracking-wider font-space">
              Threat Vectors Analysed
            </div>
          </div>

          <div className="bg-[#1A2332] p-5 rounded-xl border border-white/5 text-center space-y-1 shadow-md">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#22C55E] font-mono tracking-tight">
              24/7
            </div>
            <div className="text-[10px] text-[#CBD5E1]/60 uppercase font-bold tracking-wider font-space">
              Active Security Guard
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-[#111827] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#00BFA6] font-space">
              PLATFORM CAPABILITIES
            </h2>
            <h3 className="text-2xl font-extrabold text-[#F8FAFC] font-manrope font-medium">
              Enterprise Cyber Banking Safety Features
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-5 bg-[#1A2332] border border-white/5 rounded-xl space-y-2.5 shadow-md">
              <div className="p-2 w-fit rounded bg-[#00BFA6]/10 border border-[#00BFA6]/20 text-[#00BFA6]">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#F8FAFC]">Escrow Threat Diagnostics</h4>
              <p className="text-xs text-[#CBD5E1]/70 leading-relaxed">
                Flags incoming transcripts mimicking legal subpoenas, fake Supreme Court notices, or regulatory orders.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-5 bg-[#1A2332] border border-white/5 rounded-xl space-y-2.5 shadow-md">
              <div className="p-2 w-fit rounded bg-[#1D4ED8]/10 border border-[#1D4ED8]/20 text-[#00BFA6]">
                <Brain className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#F8FAFC]">Explainable AI Engine</h4>
              <p className="text-xs text-[#CBD5E1]/70 leading-relaxed">
                Delivers visual breakdown reports featuring sentence threat highlights and coercion score justifications.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-5 bg-[#1A2332] border border-white/5 rounded-xl space-y-2.5 shadow-md">
              <div className="p-2 w-fit rounded bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B]">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#F8FAFC]">Threat Intelligence Logs</h4>
              <p className="text-xs text-[#CBD5E1]/70 leading-relaxed">
                Connects to real-time incident queues analyzing suspect bank coordinates, fake domains, and VoIP tags.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-5 bg-[#1A2332] border border-white/5 rounded-xl space-y-2.5 shadow-md">
              <div className="p-2 w-fit rounded bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444]">
                <Share2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#F8FAFC]">Fraud Network Mapping</h4>
              <p className="text-xs text-[#CBD5E1]/70 leading-relaxed">
                Links suspect digital identifiers and traces coercive proxy call centers for law enforcement cells.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-5 bg-[#1A2332] border border-white/5 rounded-xl space-y-2.5 shadow-md">
              <div className="p-2 w-fit rounded bg-[#00BFA6]/10 border border-[#00BFA6]/20 text-[#00BFA6]">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#F8FAFC]">GIS Telemetry & Mapping</h4>
              <p className="text-xs text-[#CBD5E1]/70 leading-relaxed">
                Identifies geographical threat hotspots across metropolitan circles for targeted intercept strategies.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-5 bg-[#1A2332] border border-white/5 rounded-xl space-y-2.5 shadow-md">
              <div className="p-2 w-fit rounded bg-[#CBD5E1]/10 border border-white/5 text-[#CBD5E1]">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#F8FAFC]">Safety Guidelines Portal</h4>
              <p className="text-xs text-[#CBD5E1]/70 leading-relaxed">
                Equips citizens with immediate safety actions, interactive myth vs reality, and quick 1930 dialing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Timeline UI */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#00BFA6] font-space">
            INTELLIGENCE PIPELINE
          </h2>
          <h3 className="text-2xl font-extrabold text-[#F8FAFC] font-manrope font-medium">
            How FraudCore Protects Deposits in 5 Steps
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Step 1 */}
          <div className="p-5 bg-[#1A2332] border border-white/5 rounded-xl flex flex-col justify-between space-y-3 shadow-md">
            <div className="w-7 h-7 rounded bg-[#00BFA6]/10 text-[#00BFA6] flex items-center justify-center font-mono font-bold text-xs border border-[#00BFA6]/20">
              01
            </div>
            <h4 className="text-xs font-bold text-[#F8FAFC]">Log Incident</h4>
            <p className="text-[11px] text-[#CBD5E1]/70 leading-relaxed">
              Upload call transcript details, suspect numbers, or screenshots.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-5 bg-[#1A2332] border border-white/5 rounded-xl flex flex-col justify-between space-y-3 shadow-md">
            <div className="w-7 h-7 rounded bg-[#00BFA6]/10 text-[#00BFA6] flex items-center justify-center font-mono font-bold text-xs border border-[#00BFA6]/20">
              02
            </div>
            <h4 className="text-xs font-bold text-[#F8FAFC]">NLP Evaluation</h4>
            <p className="text-[11px] text-[#CBD5E1]/70 leading-relaxed">
              NLP parses language patterns, urgent demands, and authority labels.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-5 bg-[#1A2332] border border-white/5 rounded-xl flex flex-col justify-between space-y-3 shadow-md">
            <div className="w-7 h-7 rounded bg-[#00BFA6]/10 text-[#00BFA6] flex items-center justify-center font-mono font-bold text-xs border border-[#00BFA6]/20">
              03
            </div>
            <h4 className="text-xs font-bold text-[#F8FAFC]">Template Check</h4>
            <p className="text-[11px] text-[#CBD5E1]/70 leading-relaxed">
              Cross-references inputs against known syndicate extortion archives.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-5 bg-[#1A2332] border border-white/5 rounded-xl flex flex-col justify-between space-y-3 shadow-md">
            <div className="w-7 h-7 rounded bg-[#00BFA6]/10 text-[#00BFA6] flex items-center justify-center font-mono font-bold text-xs border border-[#00BFA6]/20">
              04
            </div>
            <h4 className="text-xs font-bold text-[#F8FAFC]">Coercion Score</h4>
            <p className="text-[11px] text-[#CBD5E1]/70 leading-relaxed">
              Calculates threat probability index and explainable report metrics.
            </p>
          </div>

          {/* Step 5 */}
          <div className="p-5 bg-[#1A2332] border border-white/5 rounded-xl flex flex-col justify-between space-y-3 shadow-md">
            <div className="w-7 h-7 rounded bg-[#00BFA6]/10 text-[#00BFA6] flex items-center justify-center font-mono font-bold text-xs border border-[#00BFA6]/20">
              05
            </div>
            <h4 className="text-xs font-bold text-[#F8FAFC]">Incident Block</h4>
            <p className="text-[11px] text-[#CBD5E1]/70 leading-relaxed">
              Suggests defense actions, alerts state SOC cells, and files reports.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
