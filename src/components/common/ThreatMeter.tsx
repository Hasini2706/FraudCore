import React from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { RiskLevel } from '../../types/scam';

interface ThreatMeterProps {
  score: number; // 0 to 100
  confidence?: number;
  risk?: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
}

export const ThreatMeter: React.FC<ThreatMeterProps> = ({
  score,
  confidence = 97,
  risk = 'HIGH',
  size = 'md',
}) => {
  // Determine color based on score (solid official colors, no neon glow)
  const getColor = (s: number) => {
    if (s >= 85) return { stroke: '#EF4444', bg: 'bg-[#EF4444]/10', text: 'text-[#EF4444]', border: 'border-[#EF4444]/20' };
    if (s >= 65) return { stroke: '#F59E0B', bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]', border: 'border-[#F59E0B]/20' };
    if (s >= 40) return { stroke: '#3B82F6', bg: 'bg-[#3B82F6]/10', text: 'text-[#3B82F6]', border: 'border-[#3b82f6]/20' };
    return { stroke: '#22C55E', bg: 'bg-[#22C55E]/10', text: 'text-[#22C55E]', border: 'border-[#22C55E]/20' };
  };

  const theme = getColor(score);

  // SVG Gauge calculations
  const strokeWidth = size === 'lg' ? 10 : 8;
  const radius = size === 'lg' ? 55 : 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const dim = (radius + strokeWidth) * 2;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#111827] border border-[#334155] rounded-xl relative select-none">
      <div className="relative flex items-center justify-center">
        <svg width={dim} height={dim} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated score arc */}
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            stroke={theme.stroke}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`font-sans font-extrabold tracking-tight ${size === 'lg' ? 'text-2xl' : 'text-xl'} text-white`}>
            {score}%
          </span>
          <span className="text-[8px] uppercase tracking-wider text-[#94a3b8] font-bold mt-0.5">
            Threat Score
          </span>
        </div>
      </div>

      {/* Risk Badge */}
      <div className={`mt-3 px-3 py-1 rounded-lg border flex items-center gap-1.5 ${theme.bg} ${theme.border} ${theme.text}`}>
        {score >= 85 ? (
          <ShieldAlert className="w-3.5 h-3.5" />
        ) : score >= 65 ? (
          <AlertTriangle className="w-3.5 h-3.5" />
        ) : (
          <ShieldCheck className="w-3.5 h-3.5" />
        )}
        <span className="font-bold text-[9px] uppercase tracking-wider">
          Risk: {risk}
        </span>
      </div>

      {/* Confidence Indicator */}
      <div className="mt-2 text-[#94a3b8] text-[10px] font-mono">
        Confidence: <span className="text-white font-semibold">{confidence}%</span>
      </div>
    </div>
  );
};
