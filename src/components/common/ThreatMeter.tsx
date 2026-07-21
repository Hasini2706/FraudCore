import React from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
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
  const getColor = (s: number) => {
    if (s >= 85) {
      return { 
        stroke: '#EF4444', 
        bg: 'bg-red-950/40 text-[#EF4444] border-red-900/40', 
        text: 'text-[#EF4444]', 
        border: 'border-red-900/40' 
      };
    }
    if (s >= 65) {
      return { 
        stroke: '#F59E0B', 
        bg: 'bg-amber-950/40 text-[#F59E0B] border-amber-900/40', 
        text: 'text-[#F59E0B]', 
        border: 'border-amber-900/40' 
      };
    }
    if (s >= 40) {
      return { 
        stroke: '#00BFA6', 
        bg: 'bg-teal-950/40 text-[#00BFA6] border-teal-900/40', 
        text: 'text-[#00BFA6]', 
        border: 'border-teal-900/40' 
      };
    }
    return { 
      stroke: '#22C55E', 
      bg: 'bg-green-950/40 text-[#22C55E] border-green-900/40', 
      text: 'text-[#22C55E]', 
      border: 'border-green-900/40' 
    };
  };

  const theme = getColor(score);

  // SVG Gauge calculations
  const strokeWidth = size === 'lg' ? 12 : 8;
  const radius = size === 'lg' ? 64 : 44;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const dim = (radius + strokeWidth) * 2;

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-[#1A2332] border border-white/5 rounded-xl shadow-md relative overflow-hidden select-none">
      <div className="relative flex items-center justify-center">
        <svg width={dim} height={dim} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Score arc */}
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
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`font-mono font-extrabold tracking-tight ${size === 'lg' ? 'text-3xl' : 'text-2xl'} text-[#F8FAFC]`}>
            {score}%
          </span>
          <span className="text-[9px] uppercase tracking-widest text-[#CBD5E1]/60 font-bold mt-0.5">
            Threat Index
          </span>
        </div>
      </div>

      {/* Risk Badge */}
      <div className={`mt-4 px-3 py-1 rounded-full border flex items-center gap-1.5 font-bold text-xs uppercase tracking-wide ${theme.bg}`}>
        {score >= 75 ? (
          <ShieldAlert className="w-3.5 h-3.5" />
        ) : score >= 50 ? (
          <AlertTriangle className="w-3.5 h-3.5" />
        ) : (
          <ShieldCheck className="w-3.5 h-3.5" />
        )}
        <span>
          Risk: {risk}
        </span>
      </div>

      {/* Confidence Indicator */}
      <div className="mt-2.5 text-[#CBD5E1]/60 text-xs flex items-center gap-1">
        <Zap className="w-3.5 h-3.5 text-[#00BFA6]" />
        <span>Confidence: <strong className="text-[#F8FAFC] font-bold">{confidence}%</strong></span>
      </div>
    </div>
  );
};
