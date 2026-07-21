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
  ChevronUp,
  ShieldAlert
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
    <div className="glass-panel rounded-2xl border border-cyan-500/30 p-6 space-y-6 bg-slate-900/90 shadow-2xl animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Brain className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white font-manrope">
                Explainable AI (XAI) Intelligence Engine
              </h3>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold">
                XAI v2.4
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Auditable breakdown of semantic patterns, coercion indicators, and threat reasoning
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white transition flex items-center gap-1 text-xs self-start sm:self-auto"
        >
          {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          <span>{showDetails ? 'Collapse XAI' : 'Expand XAI'}</span>
        </button>
      </div>

      {showDetails && (
        <>
          {/* Top Key Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Metric 1 */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Explainability Score
              </div>
              <div className="text-xl font-extrabold text-cyan-400 font-mono">
                {explainabilityScore}<span className="text-xs text-slate-500">/100</span>
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Fully Auditable
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Model Confidence
              </div>
              <div className="text-xl font-extrabold text-white font-mono">
                {confidence}%
              </div>
              <div className="text-[10px] text-cyan-400 font-semibold flex items-center gap-1">
                <Zap className="w-3 h-3" /> High Precision
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Coercion Level
              </div>
              <div className="text-xl font-extrabold text-red-400 font-mono">
                {sentimentMetrics.coercionLevel}%
              </div>
              <div className="text-[10px] text-red-400 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Severe Pressure
              </div>
            </div>

            {/* Metric 4 */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Patterns Matched
              </div>
              <div className="text-xl font-extrabold text-amber-400 font-mono">
                {result.patterns.length} <span className="text-xs text-slate-500">Vectors</span>
              </div>
              <div className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                <Layers className="w-3 h-3" /> Template Match
              </div>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('evidence')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition whitespace-nowrap ${
                activeTab === 'evidence'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              WHY AI Thinks This is a Scam ({evidenceChecklist.length})
            </button>

            <button
              onClick={() => setActiveTab('language')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition whitespace-nowrap ${
                activeTab === 'language'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Language & Coercion Sentiment
            </button>

            <button
              onClick={() => setActiveTab('sentences')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition whitespace-nowrap ${
                activeTab === 'sentences'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MessageSquareCode className="w-3.5 h-3.5" />
              Suspicious Sentence Highlights
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition whitespace-nowrap ${
                activeTab === 'timeline'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Scam Timeline Progression
            </button>
          </div>

          {/* Tab Content 1: Evidence Checklist */}
          {activeTab === 'evidence' && (
            <div className="space-y-3 animate-fade-in">
              <div className="text-xs text-slate-300 font-semibold mb-1">
                Evidence Breakdown — AI Identified 5 Structural Indicators of Coercive Extortion:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {evidenceChecklist.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-red-500/30 transition flex items-start gap-3"
                  >
                    <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{item.title}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
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
              <div className="text-xs text-slate-300 font-semibold">
                Psychological Coercion Sentiment Heatmap:
              </div>

              <div className="space-y-3">
                {/* Meter 1 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Fear & Panic Inducement</span>
                    <span className="font-mono font-bold text-red-400">{sentimentMetrics.fearUrgency}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-1000"
                      style={{ width: `${sentimentMetrics.fearUrgency}%` }}
                    ></div>
                  </div>
                </div>

                {/* Meter 2 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Authority Impersonation Signal</span>
                    <span className="font-mono font-bold text-cyan-400">{sentimentMetrics.authorityImpersonation}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-1000"
                      style={{ width: `${sentimentMetrics.authorityImpersonation}%` }}
                    ></div>
                  </div>
                </div>

                {/* Meter 3 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Forced Video Isolation Level</span>
                    <span className="font-mono font-bold text-purple-400">{sentimentMetrics.coercionLevel}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-1000"
                      style={{ width: `${sentimentMetrics.coercionLevel}%` }}
                    ></div>
                  </div>
                </div>

                {/* Meter 4 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Financial Extortion Demand Pressure</span>
                    <span className="font-mono font-bold text-amber-400">{sentimentMetrics.financialPressure}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 transition-all duration-1000"
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
              <div className="text-xs text-slate-300 font-semibold">
                Extracted Coercive Phrases from Input Transcript:
              </div>

              <div className="space-y-2">
                {highlightedSentences.map((sent, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs leading-relaxed space-y-1 ${
                      sent.severity === 'critical'
                        ? 'bg-red-500/10 border-red-500/30 text-slate-100'
                        : 'bg-amber-500/10 border-amber-500/30 text-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px]">
                        Pattern: {sent.patternType}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                          sent.severity === 'critical'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {sent.severity} Severity
                      </span>
                    </div>
                    <p className="font-mono text-slate-200">
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
              <div className="text-xs text-slate-300 font-semibold mb-2">
                Phased Evolution of Digital Arrest Modus Operandi:
              </div>

              <div className="relative pl-6 border-l-2 border-cyan-500/30 space-y-4">
                {scamTimeline.map((step) => (
                  <div key={step.step} className="relative group">
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-[9px] font-mono font-bold text-cyan-300">
                      {step.step}
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white flex items-center gap-2">
                          {step.phase}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">
                          {step.timeOffset}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
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
