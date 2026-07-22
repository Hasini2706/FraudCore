import React from 'react';
import {
  ShieldAlert,
  TrendingUp,
  Activity,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  UserCheck,
  Lock,
  Globe,
  BellRing,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface LandingPageProps {
  onStartVoiceAnalysis: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartVoiceAnalysis }) => {
  // 24-Hour Threat Trend Data
  const threatTrendData = [
    { time: '00:00', cases: 140 },
    { time: '04:00', cases: 95 },
    { time: '08:00', cases: 380 },
    { time: '12:00', cases: 640 },
    { time: '16:00', cases: 480 },
    { time: '20:00', cases: 320 },
    { time: '23:59', cases: 220 },
  ];

  // Scam Categories distribution
  const scamDistributionData = [
    { name: 'Agency Impersonation', value: 35, color: '#3B82F6' },
    { name: 'UPI Fraud', value: 25, color: '#1D4ED8' },
    { name: 'Digital Arrest', value: 20, color: '#38BDF8' },
    { name: 'Investment Scam', value: 12, color: '#475569' },
    { name: 'Courier Scam', value: 8, color: '#64748B' },
  ];

  // Live Alerts & Bulletins
  const recentAlerts = [
    { id: 'A1', source: 'I4C Feed', desc: 'Sachet warning: Fake CBI Skype domains detected in Mewat cluster.', level: 'critical' },
    { id: 'A2', source: 'CERT-In', desc: 'SMS phishing campaign impersonating TRAI mobile disconnection.', level: 'high' },
    { id: 'A3', source: 'NCRB Registry', desc: 'New mule account network identified linking 4 regional bank branches.', level: 'medium' },
  ];

  // Top Risk States
  const topRiskStates = [
    { name: 'Delhi NCR', cases: '542 Cases', risk: 'CRITICAL', color: 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20' },
    { name: 'Maharashtra', cases: '482 Cases', risk: 'CRITICAL', color: 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20' },
    { name: 'Rajasthan', cases: '412 Cases', risk: 'HIGH', color: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20' },
    { name: 'Karnataka', cases: '382 Cases', risk: 'HIGH', color: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20' },
    { name: 'Uttar Pradesh', cases: '298 Cases', risk: 'MEDIUM', color: 'text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/20' },
  ];

  // Threat Timeline Logs
  const threatTimeline = [
    { time: '11:54 AM', case: 'INC-2912', event: 'Mule bank account frozen' },
    { time: '11:42 AM', case: 'INC-2911', event: 'Fake CBI Skype account flagged' },
    { time: '11:15 AM', case: 'INC-2910', event: 'WhatsApp extortion thread parsed' },
    { time: '10:54 AM', case: 'INC-2909', event: 'Illegal SIM connection blocked' },
    { time: '10:30 AM', case: 'INC-2908', event: 'ED fraud notice warning served' },
  ];

  // Recent Investigations Reports
  const recentInvestigations = [
    { id: 'INC-2901', time: '11:34 AM', type: 'Digital Arrest', suspect: 'Inspector Sharma (Fake CBI)', confidence: 98, location: 'New Delhi', assigned: 'Cyber Cell North', status: 'Flagged', statusColor: 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20' },
    { id: 'INC-2902', time: '11:22 AM', type: 'Courier Extortion', suspect: 'Customs Department Imposter', confidence: 94, location: 'Mumbai Metro', assigned: 'State Crime Branch', status: 'Investigation', statusColor: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20' },
    { id: 'INC-2903', time: '10:54 AM', type: 'Digital Arrest', suspect: 'ED Officer Gupta (Fake)', confidence: 96, location: 'Bengaluru', assigned: 'Financial Crime Unit', status: 'Blocked', statusColor: 'text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/20' },
    { id: 'INC-2904', time: '10:15 AM', type: 'TRAI Tele-Scam', suspect: 'TRAI Helpdesk (Fake)', confidence: 91, location: 'Hyderabad', assigned: 'Telecom Fraud Cell', status: 'Resolved', statusColor: 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/20' },
  ];

  return (
    <div className="space-y-6 relative text-left">
      {/* Background Indian Map Watermark & Grids */}
      <div className="bg-gov-grid absolute inset-0 -m-8 pointer-events-none z-0 opacity-40"></div>
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#334155] pb-5 z-10 relative">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#f8fafc]">Fraud$core Dashboard</h2>
          <p className="text-xs text-[#94a3b8] mt-0.5">
            AI-Powered Fraud Intelligence Platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onStartVoiceAnalysis}
            className="px-4 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition duration-150 shadow-lg shadow-blue-500/10 cursor-pointer"
          >
            🎤 Start Live Voice Analysis
          </button>
          <span className="px-3 py-1.5 bg-[#111827] border border-[#334155] text-[10px] text-[#94a3b8] rounded-xl font-mono uppercase">
            Data Stream: Live Telemetry
          </span>
        </div>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 z-10 relative">
        {/* Today's Cases */}
        <div className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between text-[#94a3b8]">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Today's Cases</span>
            <div className="p-2 rounded-lg bg-[#111827] border border-[#334155] text-[#38bdf8]">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#f8fafc]">2,840</span>
            <span className="text-[10px] font-bold text-[#22c55e] flex items-center gap-0.5 bg-[#22c55e]/10 border border-[#22c55e]/20 px-1.5 py-0.5 rounded-lg font-mono">
              <TrendingUp className="w-3 h-3" /> +14.2%
            </span>
          </div>
        </div>

        {/* Critical Risk Alerts */}
        <div className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between text-[#94a3b8]">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Critical Cases</span>
            <div className="p-2 rounded-lg bg-[#111827] border border-[#334155] text-[#ef4444]">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#f8fafc]">34 Active</span>
            <span className="text-[10px] font-bold text-[#ef4444] flex items-center gap-0.5 bg-[#ef4444]/10 border border-[#ef4444]/20 px-1.5 py-0.5 rounded-lg font-mono">
              Immediate Action
            </span>
          </div>
        </div>

        {/* AI Accuracy */}
        <div className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between text-[#94a3b8]">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono">AI Accuracy</span>
            <div className="p-2 rounded-lg bg-[#111827] border border-[#334155] text-[#22c55e]">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#f8fafc]">98.2%</span>
            <span className="text-[10px] font-bold text-[#38bdf8] flex items-center gap-0.5 bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-1.5 py-0.5 rounded-lg font-mono">
              F1 Score Verified
            </span>
          </div>
        </div>

        {/* Fraud Prevented */}
        <div className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between text-[#94a3b8]">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Fraud Prevented</span>
            <div className="p-2 rounded-lg bg-[#111827] border border-[#334155] text-[#eab308]">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#f8fafc]">₹1,776 Cr</span>
            <span className="text-[10px] font-bold text-[#22c55e] flex items-center gap-0.5 bg-[#22c55e]/10 border border-[#22c55e]/20 px-1.5 py-0.5 rounded-lg font-mono">
              Live Golden Hour
            </span>
          </div>
        </div>
      </div>

      {/* Upper Middle Section: Fraud Trend Chart & Scam Categories Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 z-10 relative">
        {/* Fraud Trend Chart */}
        <div className="lg:col-span-2 gov-card p-6 flex flex-col justify-between h-[340px]">
          <div className="flex justify-between items-center pb-2 border-b border-[#334155]/60 mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#3b82f6]" />
              <span className="text-xs font-bold text-[#f8fafc]">Fraud Trend Volume (24h)</span>
            </div>
            <span className="text-[10px] font-mono text-[#94a3b8] uppercase">Hourly Metrics</span>
          </div>

          <div className="flex-1 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={threatTrendData} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '11px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="cases"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#3b82f6', stroke: '#1e293b', strokeWidth: 1.5 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scam Categories Doughnut Chart */}
        <div className="gov-card p-6 flex flex-col justify-between h-[340px]">
          <div className="pb-2 border-b border-[#334155]/60 mb-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#38bdf8]" />
              <span className="text-xs font-bold text-[#f8fafc]">Scam Categories Distribution</span>
            </div>
            <span className="text-[10px] text-[#94a3b8] font-mono">Classification</span>
          </div>

          <div className="h-40 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scamDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {scamDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '11px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-bold text-white font-mono">5</span>
              <span className="text-[8px] text-[#94a3b8] uppercase font-semibold">Categories</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[9px] pt-4 border-t border-[#334155]/60 mt-2 font-mono">
            {scamDistributionData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[#94a3b8]">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                <span className="truncate">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Middle Section: Recent Alerts (Left), Top Risk States (Center), Threat Timeline (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 z-10 relative">
        {/* Recent Alerts & Bulletins */}
        <div className="gov-card p-6 flex flex-col h-[320px] justify-between">
          <div className="pb-3 border-b border-[#334155]/60 mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BellRing className="w-4 h-4 text-[#ef4444]" />
              <span className="text-xs font-bold text-[#f8fafc]">Recent Risk Alerts</span>
            </div>
            <span className="text-[8px] text-[#ef4444] font-mono font-bold">WARNINGS</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
            {recentAlerts.map((alt, idx) => (
              <div key={idx} className="p-3 bg-[#111827] border border-[#334155]/60 rounded-xl space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono font-bold text-[#ef4444]">{alt.source}</span>
                  <span className="text-[8px] px-1.5 py-0.2 rounded bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20 font-bold uppercase">
                    {alt.level}
                  </span>
                </div>
                <p className="text-[11px] text-[#94a3b8] leading-relaxed">{alt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Risk States */}
        <div className="gov-card p-6 flex flex-col h-[320px] justify-between">
          <div className="pb-3 border-b border-[#334155]/60 mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#38bdf8]" />
              <span className="text-xs font-bold text-[#f8fafc]">Top Risk States</span>
            </div>
            <span className="text-[8px] text-[#94a3b8] font-mono">Density Index</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
            {topRiskStates.map((st, idx) => (
              <div key={idx} className="p-2.5 bg-[#111827] border border-[#334155]/60 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">{st.name}</span>
                  <span className="text-[9px] text-[#94a3b8] font-mono block mt-0.5">{st.cases} logged</span>
                </div>
                <span className={`px-2 py-0.5 rounded-lg text-[9px] font-mono font-bold border ${st.color}`}>
                  {st.risk}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Threat Timeline */}
        <div className="gov-card p-6 flex flex-col h-[320px] justify-between">
          <div className="pb-3 border-b border-[#334155]/60 mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#38bdf8]" />
              <span className="text-xs font-bold text-[#f8fafc]">Threat Intercept Timeline</span>
            </div>
            <span className="text-[8px] text-[#94a3b8] font-mono font-bold uppercase">Chronological</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar pl-2 border-l border-[#334155]/60">
            {threatTimeline.map((item, idx) => (
              <div key={idx} className="relative text-xs space-y-1 pb-1">
                <span className="absolute -left-[13px] top-1.5 w-2 h-2 rounded-full bg-[#3b82f6]"></span>
                <div className="flex justify-between items-center font-mono">
                  <span className="text-[9px] text-[#38bdf8] font-bold">{item.case}</span>
                  <span className="text-[9px] text-[#94a3b8]">{item.time}</span>
                </div>
                <p className="text-[#94a3b8] leading-tight">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Reports & Investigations Table */}
      <div className="gov-card p-6 z-10 relative">
        <div className="pb-3 border-b border-[#334155]/60 mb-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4.5 h-4.5 text-[#3b82f6]" />
            <span className="text-xs font-bold text-[#f8fafc]">Recent Citizen Reports & Latest Investigations</span>
          </div>
          <span className="text-[9px] text-[#94a3b8] font-mono font-bold uppercase">Intel Logs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left gov-table">
            <thead>
              <tr>
                <th>Case ID / Time</th>
                <th>Threat Category</th>
                <th>Suspect Identifiers</th>
                <th>Confidence</th>
                <th>Location</th>
                <th>Assigned Police Unit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentInvestigations.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-[#111827]/40 transition">
                  <td>
                    <div className="font-mono font-bold text-white">{caseItem.id}</div>
                    <div className="text-[9px] text-[#94a3b8] font-mono">{caseItem.time}</div>
                  </td>
                  <td className="font-semibold text-white">{caseItem.type}</td>
                  <td className="text-slate-300 font-mono">{caseItem.suspect}</td>
                  <td className="font-mono text-[#38bdf8]">{caseItem.confidence}%</td>
                  <td className="text-[#94a3b8]">{caseItem.location}</td>
                  <td className="text-slate-300 font-mono text-[11px]">{caseItem.assigned}</td>
                  <td>
                    <span className={`px-2 py-0.5 border rounded-lg text-[10px] font-bold tracking-wide font-mono ${caseItem.statusColor}`}>
                      {caseItem.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
