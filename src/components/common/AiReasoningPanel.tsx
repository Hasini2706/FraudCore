import React, { useState } from 'react';
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  Zap,
  TrendingUp,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import type { ScamAnalysisResult } from '../../types/scam';

interface AiReasoningPanelProps {
  result: ScamAnalysisResult;
}

export const AiReasoningPanel: React.FC<AiReasoningPanelProps> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'evidence' | 'timeline' | 'language'>('summary');
  const [showDetails, setShowDetails] = useState(true);

  const {
    explainabilityScore = 96,
    evidenceChecklist = [],
    sentimentMetrics = { fearUrgency: 92, coercionLevel: 88, authorityImpersonation: 95, financialPressure: 90 },
    highlightedSentences = [],
    scamTimeline = [],
    confidence = 98.2,
  } = result;

  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 space-y-5 text-left select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#334155]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#111827] border border-[#334155] rounded-xl text-[#38bdf8]">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Why We Think This Is a Scam
            </h3>
            <p className="text-[10px] text-[#94a3b8]">
              Our AI checked the conversation and found these warning signs.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="px-2.5 py-1.5 bg-[#111827] border border-[#334155] text-xs font-semibold rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#1e293b] transition flex items-center gap-1.5"
        >
          {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          <span>{showDetails ? 'Hide Details' : 'Show Details'}</span>
        </button>
      </div>

      {showDetails && (
        <div className="space-y-4">
          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-[#334155] pb-2 overflow-x-auto custom-scrollbar">
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'summary'
                  ? 'bg-[#3b82f6] text-white shadow'
                  : 'text-[#94a3b8] hover:text-white hover:bg-[#111827]'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Summary
            </button>

            <button
              onClick={() => setActiveTab('evidence')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'evidence'
                  ? 'bg-[#3b82f6] text-white shadow'
                  : 'text-[#94a3b8] hover:text-white hover:bg-[#111827]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Warning Signs ({evidenceChecklist.length})
            </button>

            <button
              onClick={() => setActiveTab('language')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'language'
                  ? 'bg-[#3b82f6] text-white shadow'
                  : 'text-[#94a3b8] hover:text-white hover:bg-[#111827]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Risk Level
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
                activeTab === 'timeline'
                  ? 'bg-[#3b82f6] text-white shadow'
                  : 'text-[#94a3b8] hover:text-white hover:bg-[#111827]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Scam Timeline
            </button>
          </div>

          {/* Tab Content 1: Summary Sheet */}
          {activeTab === 'summary' && (
            <div className="space-y-4 bg-[#111827] p-5 rounded-xl border border-[#334155]">
              <div className="flex items-center justify-between pb-3 border-b border-[#334155]/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] font-mono">
                  SCAN RESULTS
                </span>
                <span className="text-[10px] font-mono text-[#38bdf8] bg-[#3b82f6]/10 px-2 py-0.5 rounded border border-[#3b82f6]/20">
                  Analysis Complete
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Threat Classification & confidence */}
                <div className="space-y-3">
                  <div>
                    <span className="text-[#94a3b8] block text-[10px] font-semibold uppercase font-mono">Scam Type</span>
                    <span className="text-white font-bold text-sm mt-0.5 block">{result.category}</span>
                  </div>
                  <div>
                    <span className="text-[#94a3b8] block text-[10px] font-semibold uppercase font-mono">AI Confidence</span>
                    <span className="text-[#38bdf8] font-bold text-sm mt-0.5 block">{confidence}%</span>
                  </div>
                  <div>
                    <span className="text-[#94a3b8] block text-[10px] font-semibold uppercase font-mono">Pretended To Be</span>
                    <span className="text-[#ef4444] font-bold text-sm mt-0.5 block">{result.impersonatedEntity || 'Unknown Caller'}</span>
                  </div>
                </div>

                {/* Checklist Reasons */}
                <div className="space-y-2.5">
                  <span className="text-[#94a3b8] block text-[10px] font-semibold uppercase font-mono">
                    Why We Flagged It
                  </span>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2 text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] shrink-0"></span>
                      <span>Pretended to be a police or government officer</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] shrink-0"></span>
                      <span>Tried to scare you with legal threats</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] shrink-0"></span>
                      <span>Asked you to send money immediately</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] shrink-0"></span>
                      <span>Told you not to end the call</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] shrink-0"></span>
                      <span>Asked for your bank or personal details</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Recommended Actions */}
              <div className="pt-3.5 border-t border-[#334155]/60">
                <span className="text-[#94a3b8] block text-[10px] font-semibold uppercase font-mono mb-2">
                  What You Should Do
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="p-2.5 bg-[#1e293b] border border-[#334155] rounded-lg text-center">
                    <span className="text-[#ef4444] font-bold block text-[10px] uppercase font-mono">End the Call</span>
                    <span className="text-[10px] text-[#94a3b8] mt-0.5 block">Disconnect call now</span>
                  </div>
                  <div className="p-2.5 bg-[#1e293b] border border-[#334155] rounded-lg text-center">
                    <span className="text-[#ef4444] font-bold block text-[10px] uppercase font-mono">Report to 1930</span>
                    <span className="text-[10px] text-[#94a3b8] mt-0.5 block">Report the caller</span>
                  </div>
                  <div className="p-2.5 bg-[#1e293b] border border-[#334155] rounded-lg text-center">
                    <span className="text-[#ef4444] font-bold block text-[10px] uppercase font-mono">Do Not Send Money</span>
                    <span className="text-[10px] text-[#94a3b8] mt-0.5 block">Stop any transfers</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 2: Evidence Checklist */}
          {activeTab === 'evidence' && (
            <div className="space-y-3">
              <div className="text-xs text-[#94a3b8] font-semibold mb-1">
                Scam Warnings Found:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {evidenceChecklist.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#111827] border border-[#334155]/60 hover:border-[#475569] rounded-xl flex items-start gap-3 transition"
                  >
                    <div className="p-1 rounded-lg bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 mt-0.5 shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-xs">
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{item.title}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#1e293b] text-[#38bdf8] border border-[#334155]">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#94a3b8] mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content 3: Language & Coercion Sentiment */}
          {activeTab === 'language' && (
            <div className="space-y-4">
              <div className="text-xs text-[#94a3b8] font-semibold">
                Threat Indicators:
              </div>

              <div className="space-y-3 bg-[#111827] p-4 rounded-xl border border-[#334155]/60 text-xs">
                {/* Meter 1 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Intimidation & Scaring Tactics</span>
                    <span className="font-mono font-bold text-[#ef4444]">{sentimentMetrics.fearUrgency}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#1e293b] overflow-hidden">
                    <div
                      className="h-full bg-[#ef4444] transition-all duration-1000"
                      style={{ width: `${sentimentMetrics.fearUrgency}%` }}
                    ></div>
                  </div>
                </div>

                {/* Meter 2 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Pretended Authority Signal</span>
                    <span className="font-mono font-bold text-[#38bdf8]">{sentimentMetrics.authorityImpersonation}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#1e293b] overflow-hidden">
                    <div
                      className="h-full bg-[#38bdf8] transition-all duration-1000"
                      style={{ width: `${sentimentMetrics.authorityImpersonation}%` }}
                    ></div>
                  </div>
                </div>

                {/* Meter 3 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Isolation Level</span>
                    <span className="font-mono font-bold text-[#f59e0b]">{sentimentMetrics.coercionLevel}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#1e293b] overflow-hidden">
                    <div
                      className="h-full bg-[#f59e0b] transition-all duration-1000"
                      style={{ width: `${sentimentMetrics.coercionLevel}%` }}
                    ></div>
                  </div>
                </div>

                {/* Meter 4 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Pressure to Send Money</span>
                    <span className="font-mono font-bold text-white">{sentimentMetrics.financialPressure}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#1e293b] overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-1000"
                      style={{ width: `${sentimentMetrics.financialPressure}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 4: Scam Timeline Progression */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <div className="text-xs text-[#94a3b8] font-semibold mb-1">
                Timeline of the Scam:
              </div>

              <div className="relative pl-6 border-l border-[#334155] space-y-4">
                {scamTimeline.map((step) => (
                  <div key={step.step} className="relative text-xs">
                    <div className="absolute -left-[30px] top-0.5 w-4.5 h-4.5 rounded-full bg-[#111827] border border-[#334155] flex items-center justify-center text-[9px] font-mono font-bold text-[#38bdf8]">
                      {step.step}
                    </div>

                    <div className="p-3 bg-[#111827] border border-[#334155]/60 rounded-xl space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{step.phase}</span>
                        <span className="font-mono text-[9px] text-[#94a3b8]">{step.timeOffset}</span>
                      </div>
                      <p className="text-[#94a3b8] text-[11px] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
