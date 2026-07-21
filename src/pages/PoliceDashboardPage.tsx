import React, { useState } from 'react';
import {
  Activity,
  ShieldAlert,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Search,
  FileSpreadsheet,
  Zap,
  Radio,
  AlertTriangle
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';
import type { AlertIncident } from '../types/scam';

export const PoliceDashboardPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 24-Hour Threat Trend Data
  const threatTrendData = [
    { time: '00:00', incidents: 14 },
    { time: '04:00', incidents: 9 },
    { time: '08:00', incidents: 38 },
    { time: '12:00', incidents: 64 },
    { time: '16:00', incidents: 48 },
    { time: '20:00', incidents: 32 },
    { time: '23:59', incidents: 22 },
  ];

  // Scam Vector Distribution
  const scamTypesData = [
    { name: 'Digital Arrest', value: 45, color: '#ef4444' },
    { name: 'Fake FEDEX/Courier', value: 25, color: '#f59e0b' },
    { name: 'Fake Investment', value: 18, color: '#06b6d4' },
    { name: 'Loan App Coercion', value: 12, color: '#8b5cf6' },
  ];

  // Recent Incident Alerts
  const incidentsList: AlertIncident[] = [
    {
      id: 'INC-9012',
      time: '11:34 AM',
      category: 'Digital Arrest Scam',
      impersonatedOrg: 'CBI Officer Sharma',
      threatScore: 97,
      confidence: 98.2,
      status: 'Flagged',
      location: 'New Delhi',
      risk: 'CRITICAL',
      casePriority: 'P1 - CRITICAL',
      assignedUnit: 'Cyber Cell North',
    },
    {
      id: 'INC-9011',
      time: '11:22 AM',
      category: 'Fake FEDEX Package',
      impersonatedOrg: 'Customs Department',
      threatScore: 88,
      confidence: 94.5,
      status: 'Under Investigation',
      location: 'Mumbai Metro',
      risk: 'HIGH',
      casePriority: 'P2 - HIGH',
      assignedUnit: 'State Crime Branch',
    },
    {
      id: 'INC-9010',
      time: '10:54 AM',
      category: 'Digital Arrest Scam',
      impersonatedOrg: 'Enforcement Directorate (ED)',
      threatScore: 94,
      confidence: 98.0,
      status: 'Blocked',
      location: 'Bengaluru',
      risk: 'CRITICAL',
      casePriority: 'P1 - CRITICAL',
      assignedUnit: 'Financial Crime Unit',
    },
    {
      id: 'INC-9009',
      time: '10:15 AM',
      category: 'TRAI SIM Disconnection',
      impersonatedOrg: 'TRAI Helpline',
      threatScore: 78,
      confidence: 91.2,
      status: 'Resolved',
      location: 'Hyderabad',
      risk: 'HIGH',
      casePriority: 'P3 - MEDIUM',
      assignedUnit: 'Telecom Fraud Cell',
    },
    {
      id: 'INC-9008',
      time: '09:40 AM',
      category: 'Digital Arrest Scam',
      impersonatedOrg: 'Cyber Cell Delhi',
      threatScore: 96,
      confidence: 96.8,
      status: 'Flagged',
      location: 'Jaipur',
      risk: 'CRITICAL',
      casePriority: 'P1 - CRITICAL',
      assignedUnit: 'Special Task Force',
    },
  ];

  const filteredIncidents = incidentsList.filter((item) => {
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    const matchesSearch =
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.impersonatedOrg.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-cyber-radial bg-cyber-grid pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Simple & Clean Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Radio className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <h1 className="text-2xl font-extrabold text-white tracking-tight font-manrope">
                  Police Command Center
                </h1>
                <p className="text-slate-400 text-xs mt-0.5">
                  Real-Time Law Enforcement Cyber Threat Dashboard
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-xl bg-[#030611] border border-white/10 text-slate-300 text-xs font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Helpline 1930 Live
            </span>
            <button className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Log</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold uppercase tracking-wider font-space">Today's Reports</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-white font-mono">148</span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +14.2%
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Logged via 1930 & Portal</p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-5 rounded-2xl border border-red-500/30 space-y-2 bg-red-500/5">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold uppercase tracking-wider text-red-400 font-space">High Risk Alerts</span>
              <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-red-400 font-mono">34</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 font-mono">
                P1 CRITICAL
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Immediate account freeze</p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold uppercase tracking-wider font-space">Avg Threat Score</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-amber-400 font-mono">88%</span>
              <span className="text-xs text-slate-400 font-mono">Confidence: 98%</span>
            </div>
            <p className="text-[11px] text-slate-500">High psychological coercion</p>
          </div>

          {/* Card 4 */}
          <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 space-y-2 bg-emerald-500/5">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold uppercase tracking-wider text-emerald-400 font-space">
                Scams Prevented
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">₹4.2 Cr</span>
              <span className="text-xs text-emerald-400 font-semibold font-mono">Golden Hours</span>
            </div>
            <p className="text-[11px] text-slate-500">Saved during 2-hour window</p>
          </div>
        </div>

        {/* 2 Core Visual Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Threat Trend Area Chart */}
          <div className="lg:col-span-8 glass-panel rounded-2xl border border-white/10 p-6 space-y-4 bg-slate-900/90">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 font-manrope">
                <Activity className="w-4 h-4 text-cyan-400" />
                24-Hour Threat Trend
              </h3>
              <span className="text-[11px] font-mono text-cyan-400">Live Volume</span>
            </div>

            <div className="h-60 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={threatTrendData}>
                  <defs>
                    <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#050816',
                      borderColor: '#06b6d4',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="incidents"
                    stroke="#06b6d4"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorIncidents)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scam Vector Donut Chart */}
          <div className="lg:col-span-4 glass-panel rounded-2xl border border-white/10 p-6 space-y-4 bg-slate-900/90 flex flex-col justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-manrope">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              Scam Vectors
            </h3>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scamTypesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {scamTypesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#050816',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
              {scamTypesData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="truncate">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Clean Incidents Table */}
        <div className="glass-panel rounded-2xl border border-white/10 p-6 space-y-4 bg-slate-900/95 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-manrope">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                Recent Intercepted Alerts
              </h3>
              <p className="text-xs text-slate-400">
                Live threat queue requiring law enforcement review
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search incident..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 rounded-xl bg-[#030611] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition font-mono"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#030611] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500 transition font-mono"
              >
                <option value="ALL">All Statuses</option>
                <option value="Flagged">Flagged</option>
                <option value="Under Investigation">Under Investigation</option>
                <option value="Blocked">Blocked</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#030611] text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Incident ID / Time</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Scam Category</th>
                  <th className="py-3 px-4">Impersonated Entity</th>
                  <th className="py-3 px-4">Threat</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredIncidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-white/5 transition">
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-white">{incident.id}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{incident.time}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          incident.casePriority.includes('P1')
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : incident.casePriority.includes('P2')
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        }`}
                      >
                        {incident.casePriority}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-semibold text-slate-200">
                      {incident.category}
                    </td>

                    <td className="py-3 px-4 text-cyan-400 font-mono">
                      {incident.impersonatedOrg}
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-red-400">
                      {incident.threatScore}%
                    </td>

                    <td className="py-3 px-4 text-slate-400 flex items-center gap-1 mt-3">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      {incident.location}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border font-mono ${
                          incident.status === 'Flagged'
                            ? 'bg-red-500/10 text-red-400 border-red-500/30'
                            : incident.status === 'Under Investigation'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : incident.status === 'Blocked'
                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        }`}
                      >
                        {incident.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
