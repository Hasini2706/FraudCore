import React, { useState, useEffect } from 'react';
import {
  Activity,
  ShieldAlert,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Search,
  Radio,
  Bell,
  Clock,
  Shield,
  AlertOctagon,
  CreditCard,
  Layers,
  PhoneCall,
  UserCheck,
  Ban,
  UserMinus
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import type { AlertIncident } from '../types/scam';

export const PoliceDashboardPage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  
  // Interactive State Selector for Heat Map
  const [selectedState, setSelectedState] = useState<string>('Maharashtra');
  
  // Interactive Blocked Transaction state
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  // Quick Action Simulation States
  const [actionInput, setActionInput] = useState<string>('');
  const [actionType, setActionType] = useState<string | null>(null);
  const [actionResult, setActionResult] = useState<string | null>(null);

  // Live Timer Update
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' ' + date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // India Heat Map State Mock Data
  const stateHeatMapData: Record<string, { risk: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW', color: string, activeCases: number, vector: string, helplineCells: number }> = {
    'Delhi NCR': { risk: 'CRITICAL', color: '#EF4444', activeCases: 452, vector: 'UPI Gateway Injection', helplineCells: 8 },
    'Maharashtra': { risk: 'CRITICAL', color: '#EF4444', activeCases: 389, vector: 'Card Cloning Phish', helplineCells: 6 },
    'Karnataka': { risk: 'HIGH', color: '#F59E0B', activeCases: 294, vector: 'Proxy Banking Rings', helplineCells: 5 },
    'Telangana': { risk: 'HIGH', color: '#F59E0B', activeCases: 215, vector: 'Coercive Wallet Fraud', helplineCells: 4 },
    'Bihar': { risk: 'MEDIUM', color: '#1D4ED8', activeCases: 182, vector: 'KYC Blockade Spoof', helplineCells: 3 },
    'Tamil Nadu': { risk: 'LOW', color: '#22C55E', activeCases: 94, vector: 'Sim Card Swap Vectors', helplineCells: 2 },
    'Gujarat': { risk: 'LOW', color: '#22C55E', activeCases: 76, vector: 'QR Routing Hijack', helplineCells: 3 }
  };

  // Blocked Transactions Feed (Visa/NPCI Level)
  const blockedTransactions = [
    { id: 'TXN-90912', risk: 'CRITICAL', victim: 'R. K. Singhal', type: 'UPI Scam', amount: '₹4,50,000', time: '11:42 AM', state: 'Delhi NCR', detail: 'Flagged by NPCI gateway: high-frequency transfers to new wallet node. Coercion probability 97%.' },
    { id: 'TXN-90911', risk: 'CRITICAL', victim: 'Anita Deshmukh', type: 'Courier Phish', amount: '₹2,30,000', time: '11:38 AM', state: 'Maharashtra', detail: 'IMPS payment blocked at routing level: suspect proxy bank accounts associated with mule clusters.' },
    { id: 'TXN-90910', risk: 'HIGH', victim: 'Dr. Srinivas Rao', type: 'Investment Scam', amount: '₹12,00,000', time: '11:29 AM', state: 'Karnataka', detail: 'Simulated escrow ledger warning: high-yield returns investment channel identified as shell corporation.' },
    { id: 'TXN-90909', risk: 'MEDIUM', victim: 'Vikram Sinha', type: 'QR Fraud', amount: '₹45,000', time: '11:15 AM', state: 'Telangana', detail: 'Static QR code redirection to merchant account flagged for fraud reports in the past 24 hours.' },
    { id: 'TXN-90908', risk: 'CRITICAL', victim: 'Gaurav Kumar', type: 'Digital Arrest', amount: '₹6,00,000', time: '10:59 AM', state: 'Bihar', detail: 'RTGS transfer intercepted during active video call: victim reported locked room isolation patterns.' }
  ];

  // Recharts Category Distribution Data (Horizontal Bar)
  const categoryData = [
    { name: 'Digital Arrest', value: 45 },
    { name: 'UPI Scam', value: 38 },
    { name: 'Investment', value: 29 },
    { name: 'Loan Scam', value: 22 },
    { name: 'QR Fraud', value: 18 },
    { name: 'KYC Scam', value: 14 },
    { name: 'Identity Theft', value: 11 }
  ];

  // Recharts Transaction Fraud Trend (Area chart)
  const trendData = [
    { time: '08:00', volume: 12, blocked: 8 },
    { time: '09:00', volume: 22, blocked: 15 },
    { time: '10:00', volume: 45, blocked: 34 },
    { time: '11:00', volume: 54, blocked: 42 },
    { time: '12:00', volume: 38, blocked: 29 }
  ];

  // Recharts Donut Data
  const donutData = [
    { name: 'Critical Risk', value: 34, color: '#EF4444' },
    { name: 'High Risk', value: 58, color: '#F59E0B' },
    { name: 'Medium/Low', value: 56, color: '#22C55E' }
  ];

  // Incidents List (State SOC Files)
  const incidentsList: AlertIncident[] = [
    {
      id: 'INC-9012',
      time: '11:34 AM',
      category: 'UPI Fraud & Extortion',
      impersonatedOrg: 'CBI Impersonator',
      threatScore: 97,
      confidence: 98.2,
      status: 'Flagged',
      location: 'New Delhi',
      risk: 'CRITICAL',
      casePriority: 'P1 - CRITICAL',
      assignedUnit: 'NPCI Fraud Unit',
    },
    {
      id: 'INC-9011',
      time: '11:22 AM',
      category: 'Courier Impersonation',
      impersonatedOrg: 'Customs Department',
      threatScore: 88,
      confidence: 94.5,
      status: 'Under Investigation',
      location: 'Mumbai Metro',
      risk: 'HIGH',
      casePriority: 'P2 - HIGH',
      assignedUnit: 'State Bank Security',
    },
    {
      id: 'INC-9010',
      time: '10:54 AM',
      category: 'Digital Arrest Scam',
      impersonatedOrg: 'Enforcement Directorate',
      threatScore: 94,
      confidence: 98.0,
      status: 'Blocked',
      location: 'Bengaluru',
      risk: 'CRITICAL',
      casePriority: 'P1 - CRITICAL',
      assignedUnit: 'Reserve Bank Cell',
    },
    {
      id: 'INC-9009',
      time: '10:15 AM',
      category: 'TRAI SIM Disconnection',
      impersonatedOrg: 'TRAI Helpdesk',
      threatScore: 78,
      confidence: 91.2,
      status: 'Resolved',
      location: 'Hyderabad',
      risk: 'HIGH',
      casePriority: 'P3 - MEDIUM',
      assignedUnit: 'Telecom Safety Cell',
    },
    {
      id: 'INC-9008',
      time: '09:40 AM',
      category: 'Digital Arrest Scam',
      impersonatedOrg: 'CBI Cyber Inspector',
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

  const handleQuickAction = (type: string) => {
    setActionType(type);
    setActionInput('');
    setActionResult(null);
  };

  const executeQuickAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionInput.trim()) return;

    let result = '';
    if (actionType === 'account') {
      result = `🔒 NPCI Freeze Request sent. Suspect Account / UPI ID blocked across net gateway grids.`;
    } else if (actionType === 'phone') {
      const isSuspect = actionInput.includes('919876') || actionInput.includes('1930');
      result = isSuspect 
        ? `⚠️ Flagged Suspect: Number linked to mule accounts in Delhi region. Risk score 96%.`
        : `✓ Clear: Number verified against standard national telecom registers.`;
    } else if (actionType === 'transaction') {
      result = `✓ Audited Transaction: ID verified. Source routing clear. Destination node flagged for review.`;
    } else {
      result = `Database queried: record details parsed for customer: "${actionInput}".`;
    }

    setActionResult(result);
  };

  const triggerEmergencyProtocol = () => {
    const freezeConfirm = window.confirm("🚨 EMERGENCY NPCI GATEWAY SHUTDOWN PROTOCOL 🚨\n\nThis will broadcast a temporary routing lock on all suspected mule UPI nodes matching current active P1 case profiles.\n\nDo you want to proceed?");
    if (freezeConfirm) {
      alert("✓ Gateway emergency broadcast sent. Mule transactions suspended.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F8FAFC] select-none p-5 lg:p-6 space-y-6 font-sans">
      
      {/* Top Header Panel (Banking SOC Brand) */}
      <header className="bg-[#1A2332] border border-white/5 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
        {/* Brand Block */}
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-lg bg-[#00BFA6]/10 text-[#00BFA6] border border-[#00BFA6]/20">
            <Shield className="w-6 h-6 animate-pulse-slow" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-[#F8FAFC] uppercase font-space flex items-center gap-2">
              FraudCore <span className="text-xs tracking-normal bg-[#00BFA6]/10 border border-[#00BFA6]/20 text-[#00BFA6] py-0.5 px-2 rounded-md uppercase font-bold">Banking SOC Command</span>
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-[#CBD5E1]/60 font-mono mt-0.5">
              <Clock className="w-3.5 h-3.5 text-[#00BFA6]" />
              <span>SOC Master Clock:</span>
              <strong className="text-[#F8FAFC] font-bold">{currentTime || 'Loading clock...'}</strong>
            </div>
          </div>
        </div>

        {/* Action Header Items */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Quick Search */}
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-[#CBD5E1]/60 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded bg-[#111827] border border-white/5 text-[#F8FAFC] text-xs placeholder-[#CBD5E1]/30 focus:outline-none focus:border-[#00BFA6] font-mono"
            />
          </div>

          {/* Incident Alert Icon */}
          <div className="relative p-2 rounded bg-[#111827] border border-white/5 hover:bg-[#1A2332] transition-colors cursor-pointer" title="Operational Notifications">
            <Bell className="w-4 h-4 text-[#00BFA6]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EF4444] text-white flex items-center justify-center text-[9px] font-bold font-mono">
              3
            </span>
          </div>

          {/* Emergency Alert Button */}
          <button
            onClick={triggerEmergencyProtocol}
            className="px-4 py-1.5 rounded bg-[#EF4444] hover:bg-[#EF4444]/90 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition shadow-sm border border-[#EF4444]"
          >
            <AlertOctagon className="w-4 h-4 text-white" />
            <span>Emergency Gateway Lock</span>
          </button>
        </div>
      </header>

      {/* First Row: 6 Banking KPIs */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* KPI 1 */}
        <div className="bg-[#1A2332] border border-white/5 rounded-xl p-4 flex flex-col justify-between shadow-md min-h-[96px]">
          <div className="flex items-center justify-between text-[#CBD5E1]/60 text-[10px] font-bold uppercase tracking-wider font-space">
            <span>Active Cases</span>
            <Activity className="w-4 h-4 text-[#00BFA6]" />
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-extrabold text-[#F8FAFC] font-mono">1,248</span>
            <span className="text-[10px] font-bold text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/20 px-1 rounded font-mono">
              +12.4%
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-[#1A2332] border border-white/5 rounded-xl p-4 flex flex-col justify-between shadow-md min-h-[96px]">
          <div className="flex items-center justify-between text-[#CBD5E1]/60 text-[10px] font-bold uppercase tracking-wider font-space">
            <span>Blocked Txns</span>
            <Ban className="w-4 h-4 text-[#EF4444]" />
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-extrabold text-[#EF4444] font-mono">412</span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-950/40 text-[#EF4444] border border-red-900/40 font-mono">
              Mitigated
            </span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-[#1A2332] border border-white/5 rounded-xl p-4 flex flex-col justify-between shadow-md min-h-[96px]">
          <div className="flex items-center justify-between text-[#CBD5E1]/60 text-[10px] font-bold uppercase tracking-wider font-space">
            <span>Critical Alerts</span>
            <ShieldAlert className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-extrabold text-[#F8FAFC] font-mono">34</span>
            <span className="text-[9px] font-bold text-[#CBD5E1]/50 font-mono">P1 Severity</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-[#1A2332] border border-white/5 rounded-xl p-4 flex flex-col justify-between shadow-md min-h-[96px]">
          <div className="flex items-center justify-between text-[#CBD5E1]/60 text-[10px] font-bold uppercase tracking-wider font-space">
            <span>Money Saved</span>
            <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-extrabold text-[#22C55E] font-mono">₹4.2 Cr</span>
            <span className="text-[9px] font-bold text-[#22C55E] font-mono bg-[#22C55E]/10 px-1 rounded">+₹45L today</span>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-[#1A2332] border border-white/5 rounded-xl p-4 flex flex-col justify-between shadow-md min-h-[96px]">
          <div className="flex items-center justify-between text-[#CBD5E1]/60 text-[10px] font-bold uppercase tracking-wider font-space">
            <span>Today's Complaints</span>
            <TrendingUp className="w-4 h-4 text-[#1D4ED8]" />
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-extrabold text-[#F8FAFC] font-mono">27</span>
            <span className="text-[9px] font-bold text-[#EF4444] font-mono bg-[#EF4444]/10 border border-[#EF4444]/20 px-1 rounded">8 Unassigned</span>
          </div>
        </div>

        {/* KPI 6 */}
        <div className="bg-[#1A2332] border border-white/5 rounded-xl p-4 flex flex-col justify-between shadow-md min-h-[96px]">
          <div className="flex items-center justify-between text-[#CBD5E1]/60 text-[10px] font-bold uppercase tracking-wider font-space">
            <span>Investigative Queue</span>
            <Layers className="w-4 h-4 text-[#00BFA6]" />
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xl font-extrabold text-[#F8FAFC] font-mono">18</span>
            <span className="text-[9px] font-bold text-[#00BFA6] font-mono">P2 Pending</span>
          </div>
        </div>
      </section>

      {/* Second Row: Fraud Heat Map & Live Blocked Feed */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* State-wise Fraud Map */}
        <div className="lg:col-span-8 bg-[#1A2332] border border-white/5 rounded-xl p-5 space-y-4 shadow-md flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider font-space flex items-center gap-2">
              <MapPin className="w-4.5 h-4.5 text-[#00BFA6]" />
              State-wise Fraud GIS Density Map
            </h3>
            <span className="text-[10px] text-[#CBD5E1]/60 font-mono font-medium">NPCI Network Routing Telemetry</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 items-stretch">
            {/* Grid Map Simulation */}
            <div className="md:col-span-8 bg-[#111827] border border-white/5 rounded-xl p-4 flex flex-col justify-between min-h-[260px] relative overflow-hidden">
              <div className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider text-[#CBD5E1]/60 font-space bg-[#1A2332] px-2 py-0.5 rounded border border-white/5">
                GIS Threat Matrix
              </div>

              {/* Graphic representation of states */}
              <div className="flex-1 flex flex-col justify-center items-center py-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 w-full max-w-md">
                  {Object.entries(stateHeatMapData).map(([state, data]) => {
                    const isSelected = selectedState === state;
                    return (
                      <button
                        key={state}
                        onClick={() => setSelectedState(state)}
                        className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                          isSelected 
                            ? 'bg-[#1A2332] border-[#00BFA6] ring-2 ring-[#00BFA6]/20 shadow-md'
                            : 'bg-[#1A2332]/40 border-white/5 hover:bg-[#1A2332] hover:border-white/10'
                        }`}
                      >
                        <span className="text-[10px] font-bold text-[#F8FAFC] truncate">{state}</span>
                        <div className="flex items-center justify-between gap-1.5 mt-2">
                          <span 
                            className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse" 
                            style={{ backgroundColor: data.color }}
                          />
                          <span className="text-[9px] font-mono text-[#CBD5E1]/50 font-bold">
                            {data.activeCases}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 border-t border-white/5 pt-3 text-[10px] font-mono text-[#CBD5E1]/60">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span>
                  <span>Critical Risk</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                  <span>High Risk</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]"></span>
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></span>
                  <span>Low Risk</span>
                </div>
              </div>
            </div>

            {/* State Inspector Details */}
            <div className="md:col-span-4 bg-[#111827] border border-white/5 rounded-xl p-4 flex flex-col justify-between text-xs space-y-4">
              <div className="space-y-3.5">
                <div className="pb-2 border-b border-white/5 flex items-center justify-between">
                  <span className="font-bold text-sm text-[#F8FAFC]">{selectedState}</span>
                  <span 
                    className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase font-mono ${
                      stateHeatMapData[selectedState].risk === 'CRITICAL'
                        ? 'bg-red-950/40 text-[#EF4444] border-red-900/40'
                        : stateHeatMapData[selectedState].risk === 'HIGH'
                        ? 'bg-amber-950/40 text-[#F59E0B] border-amber-900/40'
                        : 'bg-green-950/40 text-[#22C55E] border-green-900/40'
                    }`}
                  >
                    {stateHeatMapData[selectedState].risk}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[#CBD5E1]/70">
                    <span>Incident Count:</span>
                    <strong className="text-[#F8FAFC] font-mono font-bold">{stateHeatMapData[selectedState].activeCases}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[#CBD5E1]/70">
                    <span>Primary Vector:</span>
                    <strong className="text-[#F8FAFC] truncate max-w-[120px]">{stateHeatMapData[selectedState].vector}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[#CBD5E1]/70">
                    <span>Active Gateway Units:</span>
                    <strong className="text-[#F8FAFC] font-mono">{stateHeatMapData[selectedState].helplineCells} nodes</strong>
                  </div>
                </div>
              </div>

              <div className="pt-3.5 border-t border-white/5 space-y-2">
                <button 
                  onClick={() => alert(`Broadcasting route review protocol to NPCI Gateway hubs for ${selectedState}`)}
                  className="w-full py-2 rounded bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-[#0B1220] font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Audit Routing</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Blocked Transactions Feed Panel */}
        <div className="lg:col-span-4 bg-[#1A2332] border border-white/5 rounded-xl p-5 flex flex-col justify-between shadow-md h-full max-h-[385px]">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider font-space flex items-center gap-2">
              <Ban className="w-4 h-4 text-[#EF4444]" />
              Blocked Transactions Feed
            </h3>
            <span className="text-[10px] font-mono text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/20 px-1.5 py-0.5 rounded font-bold font-space leading-none">VISA/NPCI LIVE</span>
          </div>

          {/* Cards Container */}
          <div className="flex-1 overflow-y-auto pr-1 my-3 space-y-2.5">
            {blockedTransactions.map((alert) => (
              <div
                key={alert.id}
                onClick={() => setSelectedTransaction(alert)}
                className="p-3 bg-[#111827] hover:bg-[#111827]/80 border border-white/5 hover:border-[#00BFA6]/30 rounded-lg transition-colors cursor-pointer flex flex-col justify-between gap-1 shadow-sm group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span 
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        alert.risk === 'CRITICAL' ? 'bg-[#EF4444]' : 'bg-[#F59E0B]'
                      }`}
                    />
                    <span className="font-mono font-bold text-xs text-[#F8FAFC] group-hover:text-[#00BFA6] transition-colors">{alert.id}</span>
                  </div>
                  <span className="text-[10px] text-[#CBD5E1]/60 font-mono">{alert.time}</span>
                </div>
                <div className="text-[11px] text-[#CBD5E1] mt-1 font-semibold flex justify-between items-center">
                  <span>Amt: <strong className="text-[#00BFA6] font-mono">{alert.amount}</strong></span>
                  <span className="text-[#CBD5E1]/60 font-medium">Type: {alert.type}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/5 text-center">
            <span className="text-[10px] text-[#CBD5E1]/60 font-mono font-semibold">Feed updates automatically</span>
          </div>
        </div>
      </section>

      {/* Third Row: Recent Cases/Transactions Table */}
      <section className="bg-[#1A2332] border border-white/5 rounded-xl p-5 space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider font-space flex items-center gap-2">
              <CreditCard className="w-4.5 h-4.5 text-[#00BFA6]" />
              Recent Fraud Cases & Blocked Transactions Registry
            </h3>
            <p className="text-xs text-[#CBD5E1]/60 font-medium mt-0.5">
              Live transactional records under escrow quarantine and forensic inspection
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded bg-[#111827] border border-white/5 text-[#F8FAFC] text-xs font-mono font-bold focus:outline-none focus:border-[#00BFA6]"
            >
              <option value="ALL">All Statuses</option>
              <option value="Flagged">Flagged</option>
              <option value="Under Investigation">Under Investigation</option>
              <option value="Blocked">Blocked</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-white/5 rounded-xl">
          <table className="w-full text-left text-xs text-[#CBD5E1] border-collapse">
            <thead className="bg-[#111827] text-[#F8FAFC] font-space text-[10px] uppercase tracking-wider border-b border-white/5">
              <tr>
                <th className="py-3 px-4 font-bold">Case ID</th>
                <th className="py-3 px-4 font-bold">Account Holder</th>
                <th className="py-3 px-4 font-bold">Fraud Category</th>
                <th className="py-3 px-4 font-bold">Branch Location</th>
                <th className="py-3 px-4 font-bold">Threat Index</th>
                <th className="py-3 px-4 font-bold">Assigned SOC</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[#1A2332]">
              {filteredIncidents.map((incident, idx) => (
                <tr 
                  key={incident.id} 
                  className={`hover:bg-[#111827]/40 transition-colors ${idx % 2 === 0 ? 'bg-[#1A2332]' : 'bg-[#111827]/20'}`}
                >
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-[#F8FAFC]">{incident.id}</span>
                    <span className="block text-[10px] text-[#CBD5E1]/45 font-mono mt-0.5">{incident.time}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#F8FAFC]">
                    {incident.id === 'INC-9012' ? 'R. K. Singhal' : incident.id === 'INC-9011' ? 'Anita Deshmukh' : incident.id === 'INC-9010' ? 'Dr. Srinivas Rao' : incident.id === 'INC-9009' ? 'Vikram Sinha' : 'Gaurav Kumar'}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#00BFA6]">
                    {incident.category}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#CBD5E1]">
                    {incident.location}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#EF4444]">
                    {incident.threatScore}%
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#F8FAFC]">
                    {incident.assignedUnit}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border uppercase ${
                        incident.status === 'Flagged'
                          ? 'bg-red-950/40 text-[#EF4444] border-red-900/40'
                          : incident.status === 'Under Investigation'
                          ? 'bg-amber-950/40 text-[#F59E0B] border-amber-900/40'
                          : incident.status === 'Blocked'
                          ? 'bg-[#1D4ED8]/10 text-[#00BFA6] border border-[#00BFA6]/20'
                          : 'bg-green-950/40 text-[#22C55E] border border-green-900/40'
                      }`}
                    >
                      {incident.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => alert(`Loading ledger details for escrow file: ${incident.id}`)}
                      className="px-2.5 py-1 rounded bg-[#1D4ED8] hover:bg-[#1D4ED8]/95 text-white font-bold text-[10px] uppercase tracking-wide transition shadow-sm border border-[#1D4ED8]"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Fourth Row: Charts, State Map & Blocked Transactions */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        
        {/* Transaction Fraud Trend */}
        <div className="lg:col-span-4 bg-[#1A2332] border border-white/5 rounded-xl p-5 flex flex-col justify-between shadow-md min-h-[280px]">
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            <Activity className="w-4.5 h-4.5 text-[#00BFA6]" />
            <h3 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider font-space">
              Transaction Fraud Trend (NPCI)
            </h3>
          </div>

          <div className="h-32 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ left: -10, right: 10, top: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTeal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00BFA6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00BFA6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="time" stroke="#CBD5E1" fontSize={9} opacity={0.5} />
                <YAxis stroke="#CBD5E1" fontSize={9} opacity={0.5} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A2332',
                    borderColor: 'rgba(255,255,255,0.08)',
                    borderRadius: '6px',
                    color: '#F8FAFC',
                    fontSize: '11px',
                  }}
                />
                <Area type="monotone" dataKey="volume" stroke="#00BFA6" fillOpacity={1} fill="url(#colorTeal)" strokeWidth={2} />
                <Area type="monotone" dataKey="blocked" stroke="#1D4ED8" fill="transparent" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-t border-white/5 text-center text-[10px] font-mono text-[#CBD5E1]/60">
            Solid line shows blocked events vs load volumes
          </div>
        </div>

        {/* Fraud Categories */}
        <div className="lg:col-span-4 bg-[#1A2332] border border-white/5 rounded-xl p-5 flex flex-col justify-between shadow-md min-h-[280px]">
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            <ShieldAlert className="w-4.5 h-4.5 text-[#EF4444]" />
            <h3 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider font-space">
              Fraud Categories Distribution
            </h3>
          </div>

          <div className="h-32 w-full pt-1.5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={categoryData} margin={{ left: -10, right: 10, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
                <XAxis type="number" stroke="#CBD5E1" fontSize={9} opacity={0.5} />
                <YAxis dataKey="name" type="category" stroke="#CBD5E1" fontSize={8} width={65} opacity={0.5} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A2332',
                    borderColor: 'rgba(255,255,255,0.08)',
                    borderRadius: '6px',
                    color: '#F8FAFC',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="value" fill="#00BFA6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-t border-white/5 text-center text-[10px] font-mono text-[#CBD5E1]/60">
            Recorded distribution parameters
          </div>
        </div>

        {/* Risk Distribution Donut + Quick Actions */}
        <div className="lg:col-span-4 bg-[#1A2332] border border-white/5 rounded-xl p-5 flex flex-col justify-between shadow-md min-h-[280px]">
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            <Layers className="w-4.5 h-4.5 text-[#00BFA6]" />
            <h3 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider font-space">
              Operational Actions & Risk
            </h3>
          </div>

          {/* Quick Action form or grid */}
          {!actionType ? (
            <div className="grid grid-cols-2 gap-1.5 py-2">
              <button 
                onClick={() => handleQuickAction('account')}
                className="p-2 rounded bg-[#111827] hover:bg-[#111827]/85 border border-white/5 hover:border-[#00BFA6]/20 text-[10px] font-bold text-left flex flex-col justify-between transition-colors h-14"
              >
                <span>Freeze Account</span>
                <UserMinus className="w-3.5 h-3.5 text-[#00BFA6]" />
              </button>
              <button 
                onClick={() => handleQuickAction('phone')}
                className="p-2 rounded bg-[#111827] hover:bg-[#111827]/85 border border-white/5 hover:border-[#00BFA6]/20 text-[10px] font-bold text-left flex flex-col justify-between transition-colors h-14"
              >
                <span>Verify Phone</span>
                <PhoneCall className="w-3.5 h-3.5 text-[#00BFA6]" />
              </button>
              <button 
                onClick={() => handleQuickAction('transaction')}
                className="p-2 rounded bg-[#111827] hover:bg-[#111827]/85 border border-white/5 hover:border-[#00BFA6]/20 text-[10px] font-bold text-left flex flex-col justify-between transition-colors h-14"
              >
                <span>Analyze Txn</span>
                <CreditCard className="w-3.5 h-3.5 text-[#00BFA6]" />
              </button>
              <button 
                onClick={() => alert('Launching Customer Search Index on VISA core networks...')}
                className="p-2 rounded bg-[#111827] hover:bg-[#111827]/85 border border-white/5 hover:border-[#00BFA6]/20 text-[10px] font-bold text-left flex flex-col justify-between transition-colors h-14"
              >
                <span>Search Customer</span>
                <UserCheck className="w-3.5 h-3.5 text-[#00BFA6]" />
              </button>
            </div>
          ) : (
            <div className="py-1 flex-1 flex flex-col justify-between">
              <form onSubmit={executeQuickAction} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-[#00BFA6] uppercase tracking-wide">
                    {actionType === 'account' ? 'Freeze Account Request' : actionType === 'phone' ? 'Verify Customer Phone' : 'Analyze Transaction'}
                  </span>
                  <button 
                    type="button" 
                    onClick={() => setActionType(null)}
                    className="text-[9px] text-[#EF4444] hover:underline font-bold"
                  >
                    Back
                  </button>
                </div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    required
                    value={actionInput}
                    onChange={(e) => setActionInput(e.target.value)}
                    placeholder={actionType === 'account' ? 'e.g. Account No / UPI ID' : actionType === 'phone' ? 'e.g. +91 98765 43210' : 'e.g. Transaction Hash'}
                    className="flex-1 px-2 py-1 rounded bg-[#111827] border border-white/5 text-[#F8FAFC] focus:outline-none focus:border-[#00BFA6] font-mono text-[10px]"
                  />
                  <button 
                    type="submit"
                    className="px-2.5 py-1 bg-[#00BFA6] text-[#0B1220] font-bold text-[10px] rounded transition-colors"
                  >
                    Run
                  </button>
                </div>
              </form>

              {/* Action output result */}
              <div className="mt-2 p-2 rounded bg-[#111827] border border-white/5 text-[9px] font-mono text-[#CBD5E1] flex-1 flex items-center leading-normal">
                {actionResult ? (
                  <span>{actionResult}</span>
                ) : (
                  <span className="text-[#CBD5E1]/40 italic">Input parameters and click Run...</span>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-1 text-[9px] font-mono border-t border-white/5 pt-2">
            {donutData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-[#CBD5E1]/60 mt-1 text-center font-bold">{item.name.split(' ')[0]}</span>
                <span className="text-[#F8FAFC] font-extrabold mt-0.5">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blocked Transaction Details Popup */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1220]/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#1A2332] border border-white/5 rounded-xl p-5 max-w-md w-full shadow-lg relative">
            <button 
              onClick={() => setSelectedTransaction(null)}
              className="absolute top-4 right-4 text-[#CBD5E1]/60 hover:text-[#F8FAFC] font-bold text-sm"
            >
              ✕
            </button>
            <div className="pb-3 border-b border-white/5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] animate-pulse"></span>
              <span className="text-xs font-mono font-bold text-[#EF4444]">{selectedTransaction.id} - Escrow Review</span>
            </div>
            <div className="py-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/5 font-mono">
                <div>
                  <span className="text-[#CBD5E1]/50 block">Risk Evaluation</span>
                  <strong className="text-[#EF4444] font-bold uppercase">{selectedTransaction.risk}</strong>
                </div>
                <div>
                  <span className="text-[#CBD5E1]/50 block">Quarantined Amount</span>
                  <strong className="text-[#00BFA6] font-bold font-mono">{selectedTransaction.amount}</strong>
                </div>
              </div>
              <div>
                <span className="text-[#CBD5E1]/60 block font-semibold mb-1">Holder Coordinates</span>
                <p className="p-2 bg-[#111827] border border-white/5 rounded text-[#F8FAFC] font-semibold">
                  {selectedTransaction.victim} ({selectedTransaction.state})
                </p>
              </div>
              <div>
                <span className="text-[#CBD5E1]/60 block font-semibold mb-1">Forensic Analysis Detail</span>
                <p className="p-3 bg-[#111827] border border-white/5 rounded text-[#CBD5E1]/80 leading-relaxed font-mono">
                  "{selectedTransaction.detail}"
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
              <button
                onClick={() => {
                  alert(`🔒 Dispatching final account block instructions across VISA networks for case ${selectedTransaction.id}`);
                  setSelectedTransaction(null);
                }}
                className="flex-1 py-1.5 rounded bg-[#EF4444] hover:bg-[#EF4444]/90 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm border border-[#EF4444]"
              >
                Confirm Account Block
              </button>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="flex-1 py-1.5 rounded bg-transparent hover:bg-white/5 text-[#F8FAFC] border border-white/5 font-bold text-xs uppercase tracking-wider transition"
              >
                Dismiss Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
