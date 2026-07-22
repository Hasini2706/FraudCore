import React, { useState, useEffect, useRef } from 'react';
import {
  Radio,
  MapPin,
  Clock,
  ShieldCheck,
  Activity,
  AlertTriangle,
  Cpu,
  UserCheck,
  Lock,
  ChevronRight
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const PoliceDashboardPage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('Delhi');

  const hotspotsData = [
    { name: 'Delhi', coords: [28.6139, 77.2090] as [number, number], cases: 542, alerts: 12, accuracy: 98.2, prevention: '₹45 Cr', unit: 'Cyber Cell North (Dwarka)' },
    { name: 'Mumbai', coords: [19.0760, 72.8777] as [number, number], cases: 412, alerts: 8, accuracy: 97.4, prevention: '₹38 Cr', unit: 'State Crime Branch (Bandra)' },
    { name: 'Hyderabad', coords: [17.3850, 78.4867] as [number, number], cases: 215, alerts: 4, accuracy: 96.8, prevention: '₹22 Cr', unit: 'Telecom Fraud Cell (Cyberabad)' },
    { name: 'Bengaluru', coords: [12.9716, 77.5946] as [number, number], cases: 382, alerts: 6, accuracy: 98.0, prevention: '₹29 Cr', unit: 'Financial Crime Unit (Infantry Rd)' },
    { name: 'Chennai', coords: [13.0827, 80.2707] as [number, number], cases: 154, alerts: 3, accuracy: 95.5, prevention: '₹18 Cr', unit: 'State Cyber Cell (Egmore)' },
    { name: 'Kolkata', coords: [22.5726, 88.3639] as [number, number], cases: 188, alerts: 2, accuracy: 96.1, prevention: '₹14 Cr', unit: 'Special Task Force (Salt Lake)' },
  ];

  const currentCityStats = hotspotsData.find(c => c.name === selectedCity) || hotspotsData[0];

  // AI Detection Summary Metrics
  const aiSummary = {
    totalAnalysed: '54,082 Cases',
    patternsMatched: '8,421 Matches',
    avgInferenceTime: '1.1s Latency',
    falsePositiveRate: '0.18% FPR'
  };

  // Latest Citizen Complaints
  const citizenComplaints = [
    { id: 'CMP-9042', time: 'Just Now', location: 'Pune Rural', text: 'Coerced Skype video call from fake CBI inspector reported.' },
    { id: 'CMP-9041', time: '4 mins ago', location: 'Gurugram', text: 'WhatsApp notice showing counterfeit Supreme Court warrant parsed.' },
    { id: 'CMP-9040', time: '11 mins ago', location: 'Chennai City', text: 'UPI payment of Rs 85,000 for fake customs fee reported.' },
    { id: 'CMP-9039', time: '18 mins ago', location: 'Ahmedabad', text: 'Digital arrest attempt claiming SIM suspension blocked.' }
  ];

  // Command Center Timeline
  const cmdTimeline = [
    { time: '11:42 AM', event: 'New Delhi Dwarka dispatch sent for regional IP trace.' },
    { time: '11:15 AM', event: '4 suspect UPI handles frozen at SBI Gateway.' },
    { time: '10:30 AM', event: 'TRAI telecom block warning served to Haryana cluster.' }
  ];

  // Leaflet map initialization
  useEffect(() => {
    if (mapRef.current && !leafletMap.current) {
      // Map center for India (centered on central-north area)
      const map = L.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: false
      }).setView([21.7679, 78.8718], 5);

      // Dark Theme Maps: CartoDB Dark Matter
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 18
      }).addTo(map);

      leafletMap.current = map;

      // Define CSS pulsing dot marker icon
      const pulsingIcon = L.divIcon({
        className: 'pulsing-marker-wrapper',
        html: '<div class="pulsing-marker"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      // Add hotspots markers
      hotspotsData.forEach((city) => {
        const marker = L.marker(city.coords, { icon: pulsingIcon }).addTo(map);
        
        // Tooltip hover
        marker.bindTooltip(`<strong>${city.name}</strong><br/>Cases: ${city.cases}`, {
          direction: 'top',
          className: 'map-tooltip-styling'
        });

        // Click event
        marker.on('click', () => {
          setSelectedCity(city.name);
        });
      });
    }

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);

  return (
    <div className="space-y-6 relative text-left">
      {/* CSS Injected locally for Leaflet pulsing icons & tooltips */}
      <style dangerouslySetInnerHTML={{ __html: `
        .pulsing-marker-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pulsing-marker {
          width: 10px;
          height: 10px;
          background-color: #3b82f6;
          border-radius: 50%;
          border: 1.5px solid #f8fafc;
          box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          animation: map-pulse 1.8s infinite cubic-bezier(0.66, 0, 0, 1);
        }
        @keyframes map-pulse {
          to {
            box-shadow: 0 0 0 14px rgba(59, 130, 246, 0);
          }
        }
        .map-tooltip-styling {
          background-color: #1e293b !important;
          border: 1px solid #334155 !important;
          color: #f8fafc !important;
          font-family: monospace !important;
          font-size: 10px !important;
          border-radius: 4px !important;
          box-shadow: 0 4px 6px rgb(0 0 0 / 0.3) !important;
        }
        .leaflet-container {
          background-color: #111827 !important;
        }
      `}} />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#334155] pb-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#f8fafc]">Command Center Dashboard</h2>
          <p className="text-xs text-[#94a3b8] mt-0.5">
            Geographic incident heatmaps, system process checks, and timeline streams
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 bg-[#111827] border border-[#334155] text-xs font-mono font-bold text-[#22c55e] rounded-xl flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse"></span>
            GIS Telemetry Stream: ACTIVE
          </span>
        </div>
      </div>

      {/* Grid Layout: Map & Stats (Left), Process Timelines (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Leaflet Map & Selected Hotspot statistics */}
        <div className="lg:col-span-8 space-y-6">
          <div className="gov-card p-6 flex flex-col justify-between">
            <div className="pb-3 border-b border-[#334155]/60 flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#3b82f6]" />
                <span className="text-xs font-bold text-white">Geographic Cyber Fraud Hotspots</span>
              </div>
              <span className="text-[10px] text-[#94a3b8] font-mono">Zoom Support & Click Active</span>
            </div>

            {/* Leaflet Mount Element */}
            <div
              ref={mapRef}
              className="w-full h-[400px] bg-[#111827] border border-[#334155] rounded-xl relative z-10"
            />
          </div>

          {/* Hotspot Forensic Intel Card (Displays stats of clicked marker) */}
          <div className="gov-card p-6 space-y-4">
            <div className="pb-3 border-b border-[#334155]/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4.5 h-4.5 text-[#3b82f6]" />
                <span className="text-xs font-bold text-white">Forensic Hotspot Intel: {currentCityStats.name}</span>
              </div>
              <span className="text-[10px] font-mono text-[#38bdf8] uppercase">Selected Node</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3 bg-[#111827] border border-[#334155]/60 rounded-xl">
                <span className="text-[#94a3b8] block text-[9px] uppercase font-bold">Threat Incidents</span>
                <span className="text-white text-base font-bold block mt-1">{currentCityStats.cases}</span>
              </div>
              <div className="p-3 bg-[#111827] border border-[#334155]/60 rounded-xl">
                <span className="text-[#94a3b8] block text-[9px] uppercase font-bold">Critical Alerts</span>
                <span className="text-[#ef4444] text-base font-bold block mt-1">{currentCityStats.alerts} Active</span>
              </div>
              <div className="p-3 bg-[#111827] border border-[#334155]/60 rounded-xl">
                <span className="text-[#94a3b8] block text-[9px] uppercase font-bold">AI Detection Rate</span>
                <span className="text-[#38bdf8] text-base font-bold block mt-1">{currentCityStats.accuracy}%</span>
              </div>
              <div className="p-3 bg-[#111827] border border-[#334155]/60 rounded-xl">
                <span className="text-[#94a3b8] block text-[9px] uppercase font-bold">Loss Blocked</span>
                <span className="text-[#22c55e] text-base font-bold block mt-1">{currentCityStats.prevention}</span>
              </div>
            </div>

            <div className="p-3 bg-[#111827] border border-[#334155]/60 rounded-xl text-xs flex items-center justify-between">
              <span className="text-[#94a3b8]">Assigned Dispatch Squad:</span>
              <span className="font-bold text-slate-200 font-mono">{currentCityStats.unit}</span>
            </div>
          </div>
        </div>

        {/* Right Column: AI Summary, Complaints Log, and Actions timeline */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          {/* AI Detection Summary */}
          <div className="gov-card p-6 space-y-4">
            <div className="pb-3 border-b border-[#334155]/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#38bdf8]" />
                <span className="text-xs font-bold text-white">AI Detection Summary</span>
              </div>
              <span className="text-[9px] text-[#94a3b8] font-mono">Telemetry Check</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 bg-[#111827] border border-[#334155]/60 rounded-xl text-center">
                <span className="text-[#94a3b8] text-[9px] block">Analyzed Cases</span>
                <span className="text-white font-bold block mt-1">{aiSummary.totalAnalysed}</span>
              </div>
              <div className="p-2.5 bg-[#111827] border border-[#334155]/60 rounded-xl text-center">
                <span className="text-[#94a3b8] text-[9px] block">Vector Matches</span>
                <span className="text-white font-bold block mt-1">{aiSummary.patternsMatched}</span>
              </div>
              <div className="p-2.5 bg-[#111827] border border-[#334155]/60 rounded-xl text-center">
                <span className="text-[#94a3b8] text-[9px] block">Avg Inference</span>
                <span className="text-[#38bdf8] font-bold block mt-1">{aiSummary.avgInferenceTime}</span>
              </div>
              <div className="p-2.5 bg-[#111827] border border-[#334155]/60 rounded-xl text-center">
                <span className="text-[#94a3b8] text-[9px] block">FPR Rate</span>
                <span className="text-[#22c55e] font-bold block mt-1">{aiSummary.falsePositiveRate}</span>
              </div>
            </div>
          </div>

          {/* Latest Citizen Complaints */}
          <div className="gov-card p-6 flex-1 flex flex-col justify-between min-h-[220px] mt-6 lg:mt-0">
            <div className="pb-3 border-b border-[#334155]/60 flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#f59e0b]" />
                <span className="text-xs font-bold text-white">Latest Citizen Complaints</span>
              </div>
              <span className="text-[9px] text-[#94a3b8] font-mono">Portal Feeds</span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar">
              {citizenComplaints.map((item) => (
                <div key={item.id} className="p-3 bg-[#111827] border border-[#334155]/60 rounded-xl space-y-1 text-xs">
                  <div className="flex justify-between items-center font-mono">
                    <span className="font-bold text-[#ef4444]">{item.id}</span>
                    <span className="text-[#94a3b8] text-[9px]">{item.time} ({item.location})</span>
                  </div>
                  <p className="text-[#94a3b8] leading-snug">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Command Center Timeline */}
          <div className="gov-card p-6 min-h-[160px] flex flex-col justify-between mt-6 lg:mt-0 bg-[#0c121e]">
            <div className="pb-3 border-b border-[#334155]/60 flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#38bdf8]" />
                <span className="text-xs font-bold text-white">Intercept Timeline</span>
              </div>
              <span className="text-[9px] text-[#94a3b8] font-mono">Telemetry Actions</span>
            </div>

            <div className="space-y-2 text-xs font-mono pl-2 border-l border-[#334155]/60">
              {cmdTimeline.map((tl, idx) => (
                <div key={idx} className="relative pb-1">
                  <span className="absolute -left-[13px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></span>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400">{tl.time}</span>
                  </div>
                  <p className="text-[#94a3b8] text-[10px] mt-0.5 leading-snug">{tl.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
