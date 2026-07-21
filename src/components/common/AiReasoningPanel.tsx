import React, { useState } from 'react';
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  Zap,
  TrendingUp,
  Clock,
  MessageSquareCode,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import type { ScamAnalysisResult } from '../../types/scam';

interface AiReasoningPanelProps {
  result: ScamAnalysisResult;
}

export const AiReasoningPanel: React.FC<AiReasoningPanelProps> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<'evidence' | 'language' | 'timeline' | 'sentences'>('evidence');
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
    <div className="bg-[#1A2332] border border-white/5 rounded-xl p-6 space-y-6 shadow-md select-none text-[#F8FAFC]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#00BFA6]/10 border border-[#00BFA6]/20 text-[#00BFA6]">
            <Brain className="w-5 h-5 animate-pulse-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#F8FAFC] font-manrope">
                Explainable AI (XAI) Security Audits
              </h3>
              <span className="px-2 py-0.5 rounded bg-[#00BFA6]/10 text-[#00BFA6] border border-[#00BFA6]/20 text-[9px] font-mono font-bold">
                XAI v2.4
              </span>
            </div>
            <p className="text-xs text-[#CBD5E1]/60">
              Auditable evaluation of semantic patterns, coercion indicators, and threat reasoning
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="p-1.5 rounded-lg border border-white/5 bg-[#111827] text-[#CBD5E1] hover:text-[#F8FAFC] transition-colors flex items-center gap-1 text-xs self-start sm:self-auto font-bold"
        >
          {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          <span>{showDetails ? 'Collapse Details' : 'Expand Details'}</span>
        </button>
      </div>

      {showDetails && (
        <>
          {/* Top Key Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Metric 1 */}
            <div className="p-4 rounded-lg bg-[#111827] border border-white/5 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#CBD5E1]/65">
                Explainability Score
              </div>
              <div className="text-xl font-extrabold text-[#00BFA6] font-mono">
                {explainabilityScore}<span className="text-xs text-[#CBD5E1]/60 font-normal">/100</span>
              </div>
              <div className="text-[10px] text-[#22C55E] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Fully Auditable
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-4 rounded-lg bg-[#111827] border border-white/5 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#CBD5E1]/65">
                Model Confidence
              </div>
              <div className="text-xl font-extrabold text-[#F8FAFC] font-mono">
                {confidence}%
              </div>
              <div className="text-[10px] text-[#00BFA6] font-bold flex items-center gap-1">
                <Zap className="w-3 h-3" /> High Precision
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-4 rounded-lg bg-[#111827] border border-white/5 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#CBD5E1]/65">
                Coercion Level
              </div>
              <div className="text-xl font-extrabold text-[#EF4444] font-mono">
                {sentimentMetrics.coercionLevel}%
              </div>
              <div className="text-[10px] text-[#EF4444] font-bold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Severe Pressure
              </div>
            </div>

            {/* Metric 4 */}
            <div className="p-4 rounded-lg bg-[#111827] border border-white/5 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#CBD5E1]/65">
                Vectors Matched
              </div>
              <div className="text-xl font-extrabold text-[#F59E0B] font-mono">
                {result.patterns.length} <span className="text-xs text-[#CBD5E1]/60 font-normal font-sans">Types</span>
              </div>
              <div className="text-[10px] text-[#F59E0B] font-bold flex items-center gap-1">
                <Layers className="w-3 h-3" /> Pattern Match
              </div>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1.5 border-b border-white/5 pb-2.5 overflow-x-auto">
            <button
              onClick={() => setActiveTab('evidence')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === 'evidence'
                  ? 'bg-[#1D4ED8]/10 text-[#00BFA6] border border-[#00BFA6]/20'
                  : 'text-[#CBD5E1] hover:bg-[#111827] hover:text-[#F8FAFC]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Evidence Checklist ({evidenceChecklist.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('language')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === 'language'
                  ? 'bg-[#1D4ED8]/10 text-[#00BFA6] border border-[#00BFA6]/20'
                  : 'text-[#CBD5E1] hover:bg-[#111827] hover:text-[#F8FAFC]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Coercion Sentiment</span>
            </button>

            <button
              onClick={() => setActiveTab('sentences')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === 'sentences'
                  ? 'bg-[#1D4ED8]/10 text-[#00BFA6] border border-[#00BFA6]/20'
                  : 'text-[#CBD5E1] hover:bg-[#111827] hover:text-[#F8FAFC]'
              }`}
            >
              <MessageSquareCode className="w-3.5 h-3.5" />
              <span>Sentence Highlights</span>
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === 'timeline'
                  ? 'bg-[#1D4ED8]/10 text-[#00BFA6] border border-[#00BFA6]/20'
                  : 'text-[#CBD5E1] hover:bg-[#111827] hover:text-[#F8FAFC]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Timeline Mapping</span>
            </button>
          </div>

          {/* Tab Content 1: Evidence Checklist */}
          {activeTab === 'evidence' && (
            <div className="space-y-3 animate-fade-in">
              <div className="text-xs text-[#CBD5E1]/60 font-bold mb-1">
                AI Detected Indicators of Coercive Extortion:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {evidenceChecklist.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-[#111827] border border-white/5 hover:border-white/10 transition-all flex items-start gap-3 shadow-md"
                  >
                    <div className="p-1 rounded-md bg-[#22C55E]/10 text-[#22C55E] mt-0.5 shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#F8FAFC] flex items-center gap-2">
                        <span>{item.title}</span>
                        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-[#1A2332] text-[#00BFA6] border border-white/5 uppercase font-bold">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#CBD5E1]/60 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content 2: Language & Coercion Sentiment */}
          {activeTab === 'language' && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-xs text-[#CBD5E1]/60 font-bold">
                Coercive Sentiment Levels Matrix:
              </div>

              <div className="space-y-3.5">
                {/* Meter 1 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#F8FAFC] font-semibold">Fear & Panic Inducement</span>
                    <span className="font-mono font-bold text-[#EF4444]">{sentimentMetrics.fearUrgency}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#111827] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#F59E0B] to-[#EF4444] transition-all duration-700"
                      style={{ width: `${sentimentMetrics.fearUrgency}%` }}
                    ></div>
                  </div>
                </div>

                {/* Meter 2 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#F8FAFC] font-semibold">Authority Impersonation Signal</span>
                    <span className="font-mono font-bold text-[#1D4ED8]">{sentimentMetrics.authorityImpersonation}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#111827] overflow-hidden">
                    <div
                      className="h-full bg-[#1D4ED8] transition-all duration-700"
                      style={{ width: `${sentimentMetrics.authorityImpersonation}%` }}
                    ></div>
                  </div>
                </div>

                {/* Meter 3 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#F8FAFC] font-semibold">Forced Video Isolation Level</span>
                    <span className="font-mono font-bold text-[#00BFA6]">{sentimentMetrics.coercionLevel}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#111827] overflow-hidden">
                    <div
                      className="h-full bg-[#00BFA6] transition-all duration-700"
                      style={{ width: `${sentimentMetrics.coercionLevel}%` }}
                    ></div>
                  </div>
                </div>

                {/* Meter 4 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#F8FAFC] font-semibold">Financial Extortion Demand Pressure</span>
                    <span className="font-mono font-bold text-[#00BFA6]">{sentimentMetrics.financialPressure}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#111827] overflow-hidden">
                    <div
                      className="h-full bg-[#00BFA6] transition-all duration-700"
                      style={{ width: `${sentimentMetrics.financialPressure}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 3: Suspicious Sentence Highlights */}
          {activeTab === 'sentences' && (
            <div className="space-y-3 animate-fade-in">
              <div className="text-xs text-[#CBD5E1]/60 font-bold">
                Extracted Coercive Phrasings from Input:
              </div>

              <div className="space-y-2.5">
                {highlightedSentences.map((sent, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-lg border text-xs leading-relaxed space-y-1.5 ${
                      sent.severity === 'critical'
                        ? 'bg-red-950/20 border-red-900/40 text-red-100'
                        : 'bg-amber-950/20 border-amber-900/40 text-amber-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#00BFA6] uppercase tracking-wider text-[9px] font-space">
                        Pattern: {sent.patternType}
                      </span>
                      <span
                        className={`text-[8px] font-bold px-2 py-0.5 rounded border uppercase ${
                          sent.severity === 'critical'
                            ? 'bg-red-900/50 text-[#EF4444] border-red-800'
                            : 'bg-amber-900/50 text-[#F59E0B] border-amber-800'
                        }`}
                      >
                        {sent.severity} Severity
                      </span>
                    </div>
                    <p className="font-mono font-medium text-[#F8FAFC]">
                      "{sent.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content 4: Scam Timeline Progression */}
          {activeTab === 'timeline' && (
            <div className="space-y-3 animate-fade-in">
              <div className="text-xs text-[#CBD5E1]/60 font-bold mb-2">
                Phased Evolution of Modus Operandi:
              </div>

              <div className="relative pl-6 border-l border-white/10 space-y-4">
                {scamTimeline.map((step) => (
                  <div key={step.step} className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#1A2332] border border-[#00BFA6] flex items-center justify-center text-[9px] font-mono font-bold text-[#00BFA6]">
                      {step.step}
                    </div>

                    <div className="p-3 bg-[#111827] border border-white/5 rounded-lg text-xs space-y-1 shadow-md font-medium">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#F8FAFC]">
                          {step.phase}
                        </span>
                        <span className="font-mono text-[9px] text-[#CBD5E1]/45 font-semibold bg-[#1A2332] px-1.5 py-0.2 rounded border border-white/5">
                          {step.timeOffset}
                        </span>
                      </div>
                      <p className="text-[#CBD5E1]/70 text-[11px] leading-relaxed font-sans">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
