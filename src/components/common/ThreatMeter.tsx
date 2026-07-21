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
  // Determine color based on score
  const getColor = (s: number) => {
    if (s >= 85) return { stroke: '#ef4444', bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/30' };
    if (s >= 65) return { stroke: '#f59e0b', bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/30' };
    if (s >= 40) return { stroke: '#eab308', bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/30' };
    return { stroke: '#10b981', bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/30' };
  };

  const theme = getColor(score);

  // SVG Gauge calculations
  const strokeWidth = size === 'lg' ? 14 : 10;
  const radius = size === 'lg' ? 70 : 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const dim = (radius + strokeWidth) * 2;

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-2xl glass-card relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 opacity-20 blur-2xl transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: theme.stroke }}
      />

      <div className="relative flex items-center justify-center">
        <svg width={dim} height={dim} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.08)"
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
          <span className={`font-mono font-extrabold tracking-tight ${size === 'lg' ? 'text-4xl' : 'text-3xl'} text-white`}>
            {score}%
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-0.5">
            Threat Score
          </span>
        </div>
      </div>

      {/* Risk Badge */}
      <div className={`mt-3 px-4 py-1.5 rounded-full border flex items-center gap-2 ${theme.bg} ${theme.border} ${theme.text}`}>
        {score >= 75 ? (
          <ShieldAlert className="w-4 h-4 animate-bounce" />
        ) : score >= 50 ? (
          <AlertTriangle className="w-4 h-4" />
        ) : (
          <ShieldCheck className="w-4 h-4" />
        )}
        <span className="font-bold text-xs uppercase tracking-wider">
          Risk Level: {risk}
        </span>
      </div>

      {/* Confidence Indicator */}
      <div className="mt-2 text-slate-400 text-xs flex items-center gap-1">
        <Zap className="w-3 h-3 text-cyan-400" />
        <span>Confidence: <strong className="text-slate-200">{confidence}%</strong></span>
      </div>
    </div>
  );
};
