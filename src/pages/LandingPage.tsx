import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldAlert,
  Search,
  Activity,
  ArrowRight,
  CheckCircle2,
  Lock,
  Zap,
  PhoneCall,
  Brain,
  ShieldCheck,
  AlertOctagon,
  Eye,
  FileText,
  Building2,
  Globe,
  Database,
  Cpu,
  Share2,
  Users,
  Award
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-cyber-radial bg-cyber-grid pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide">
                <ShieldAlert className="w-4 h-4 animate-pulse text-cyan-400" />
                <span className="font-space">ENTERPRISE CYBER DEFENSE ENGINE v2.4</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-manrope">
                AI-Powered Digital <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                  Public Safety Intelligence
                </span>{' '}
                Platform
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
                Prevent Digital Arrest Scams using Explainable AI, NLP Intelligence, Risk Scoring and Real-Time Threat Analysis.
              </p>

              <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                Built to protect citizens and empower police cyber cells against coercive video surveillance, fake CBI/ED warrants, and illegal money transfers.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <NavLink
                  to="/analyzer"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-2xl shadow-cyan-500/25 flex items-center justify-center gap-3 transition transform active:scale-95"
                >
                  <Search className="w-5 h-5" />
                  <span>Start Threat Analysis</span>
                  <ArrowRight className="w-4 h-4" />
                </NavLink>

                <NavLink
                  to="/dashboard"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/10 text-white font-bold text-sm flex items-center justify-center gap-3 transition"
                >
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <span>View Intelligence Dashboard</span>
                </NavLink>
              </div>

              {/* Hero Footer Badges */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>XAI Explainable NLP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>SOC Radar Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span>Helpline 1930 Direct Call</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual: 3D/Glass Dashboard Mockup & Live Cyber Radar */}
            <div className="lg:col-span-5 flex justify-center relative">
              {/* Decorative floating background glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl opacity-20 blur-3xl"></div>

              <div className="relative w-full max-w-md glass-panel rounded-2xl border border-cyan-500/30 p-6 shadow-2xl bg-slate-900/95 space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                      CYBER THREAT RADAR
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 font-bold">
                    P1 - CRITICAL INTERCEPT
                  </span>
                </div>

                {/* Radar Sweep Display */}
                <div className="relative flex flex-col items-center justify-center py-6 rounded-xl bg-[#030611] border border-slate-800 overflow-hidden">
                  <div className="w-36 h-36 rounded-full border border-cyan-500/20 flex items-center justify-center relative">
                    <div className="w-24 h-24 rounded-full border border-cyan-500/30 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border border-cyan-500/40 flex items-center justify-center">
                        <AlertOctagon className="w-6 h-6 text-red-500 animate-pulse" />
                      </div>
                    </div>
                    {/* Rotating radar line */}
                    <div className="absolute inset-0 origin-center animate-radar">
                      <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent to-cyan-400"></div>
                    </div>
                  </div>

                  <div className="mt-4 text-center space-y-1">
                    <div className="text-xs font-mono font-bold text-red-400 tracking-wider">
                      THREAT SCORE: 97% (DIGITAL ARREST)
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Impersonating: CBI Legal Department
                    </div>
                  </div>
                </div>

                {/* Floating Analytics Card Preview */}
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#030611] border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Explainability Score</span>
                    <span className="text-cyan-400 font-mono font-bold">96 / 100</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#030611] border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Coercion Signal</span>
                    <span className="text-red-400 font-mono font-bold">"Do Not Disconnect"</span>
                  </div>
                </div>

                {/* Quick Action */}
                <NavLink
                  to="/analyzer"
                  className="w-full py-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center justify-center gap-2 transition"
                >
                  <Search className="w-4 h-4" />
                  <span>Analyze Suspicious Transcript</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-10 bg-[#030611]/80 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-mono uppercase tracking-widest text-slate-400 mb-6 font-semibold">
            Integrable Architecture for Cyber Defense & Public Safety Institutions
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-slate-300 text-xs font-semibold">
            <div className="p-4 rounded-xl glass-panel border border-white/5 flex items-center justify-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>Government Agencies (Demo)</span>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-white/5 flex items-center justify-center gap-2">
              <Database className="w-4 h-4 text-blue-400" />
              <span>Financial Banking Units</span>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-white/5 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>State Cyber Police Cells</span>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-white/5 flex items-center justify-center gap-2">
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Emergency Response 1930</span>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section (Animated Counters Style) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl glass-panel text-center border border-white/10 space-y-2">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              ₹1,776 <span className="text-cyan-400 text-xl">Cr</span>
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Fraud Prevented (Demo)
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel text-center border border-white/10 space-y-2">
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono tracking-tight">
              98.2%
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              AI Detection Accuracy
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel text-center border border-white/10 space-y-2">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              50,000+
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Threats Analysed
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel text-center border border-white/10 space-y-2">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">
              24/7
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              AI Cyber Monitoring
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#030611]/50 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              PLATFORM CAPABILITIES
            </h2>
            <h3 className="text-3xl font-extrabold text-white font-manrope">
              Enterprise Cyber Intelligence Features
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl glass-panel-interactive space-y-3">
              <div className="p-3 w-fit rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Digital Arrest Detection</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Matches calls against known templates of fake CBI, ED, Police, and TRAI telecom disconnection extortion.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl glass-panel-interactive space-y-3">
              <div className="p-3 w-fit rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                <Brain className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Explainable AI (XAI)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Auditable breakdown showing exact evidence sentences, coercion sentiment meters, and confidence rationale.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl glass-panel-interactive space-y-3">
              <div className="p-3 w-fit rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                <Activity className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Threat Intelligence Engine</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Real-time threat feeds analyzing fake legal notices, counterfeit Supreme Court warrants, and proxy phone numbers.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl glass-panel-interactive space-y-3">
              <div className="p-3 w-fit rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                <Share2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Fraud Network Analysis</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Traces relationships between suspect bank accounts, fake UPI handles, and international proxy call centers.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl glass-panel-interactive space-y-3">
              <div className="p-3 w-fit rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Geo Intelligence & GIS Mapping</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Maps regional incident density across major metros (Delhi, Mumbai, Bengaluru) for targeted law enforcement action.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl glass-panel-interactive space-y-3">
              <div className="p-3 w-fit rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Citizen Protection Protocols</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct integration with National Helpline 1930 and step-by-step emergency guidance during high-stress calls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Timeline UI */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            INTELLIGENCE PIPELINE
          </h2>
          <h3 className="text-3xl font-extrabold text-white font-manrope">
            How SentinelAI Protects Citizens in 5 Steps
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Step 1 */}
          <div className="p-5 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between space-y-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-sm border border-cyan-500/30">
              01
            </div>
            <h4 className="text-sm font-bold text-white">Upload Transcript</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Citizen inputs call text, audio recording, or WhatsApp screenshot.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between space-y-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-mono font-bold text-sm border border-blue-500/30">
              02
            </div>
            <h4 className="text-sm font-bold text-white">AI Understands Language</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              NLP parses coercive phrasing, fear sentiment, and fake authority names.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between space-y-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-mono font-bold text-sm border border-purple-500/30">
              03
            </div>
            <h4 className="text-sm font-bold text-white">Threat Engine</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Cross-checks against 120+ known Digital Arrest templates.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-5 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between space-y-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm border border-amber-500/30">
              04
            </div>
            <h4 className="text-sm font-bold text-white">Risk Score Generated</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Computes Threat Score (0-100%) & XAI evidence breakdown.
            </p>
          </div>

          {/* Step 5 */}
          <div className="p-5 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm border border-emerald-500/30">
              05
            </div>
            <h4 className="text-sm font-bold text-white">Citizen Warning</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Issues safety actions, disconnect order, and triggers 1930 report.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
