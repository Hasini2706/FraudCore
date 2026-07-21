import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Search,
  PhoneCall,
  MessageSquare,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ShieldAlert,
  Upload,
  Mic,
  Image as ImageIcon,
  Copy,
  Check,
  Bot,
  RefreshCw,
  Sliders,
  Layers,
  FileCode
} from 'lucide-react';
import { ThreatMeter } from '../components/common/ThreatMeter';
import { ReportScamModal } from '../components/common/ReportScamModal';
import { AiReasoningPanel } from '../components/common/AiReasoningPanel';
import { analyzeScam, PRESET_SAMPLE_TRANSCRIPTS } from '../services/scamAnalysisService';
import type { ScamAnalysisResult } from '../types/scam';

export const ScamAnalyzerPage: React.FC = () => {
  const [inputTab, setInputTab] = useState<'transcript' | 'audio' | 'screenshot' | 'whatsapp'>('transcript');
  const [inputText, setInputText] = useState(PRESET_SAMPLE_TRANSCRIPTS.cbiDigitalArrest);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ScamAnalysisResult | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [copiedDossier, setCopiedDossier] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeScam(inputText);
      setAnalysisResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadPreset = (text: string) => {
    setInputText(text);
    setUploadedFileName(null);
    setAnalysisResult(null);
  };

  const handleFileUploadSim = (type: string) => {
    if (type === 'audio') {
      setUploadedFileName('suspicious_cbi_call_recording.mp3');
      setInputText(PRESET_SAMPLE_TRANSCRIPTS.cbiDigitalArrest);
    } else if (type === 'screenshot') {
      setUploadedFileName('whatsapp_supreme_court_warrant.png');
      setInputText(PRESET_SAMPLE_TRANSCRIPTS.whatsappThreat);
    }
    setAnalysisResult(null);
  };

  const copyDossierJson = () => {
    if (!analysisResult) return;
    navigator.clipboard.writeText(JSON.stringify(analysisResult, null, 2));
    setCopiedDossier(true);
    setTimeout(() => setCopiedDossier(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-cyber-radial bg-cyber-grid pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-space">ENTERPRISE NLP INFERENCE ENGINE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-manrope">
            AI Cyber Scam Analyzer & XAI Intelligence
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            Split-screen intelligence analysis: Input suspicious calls, audio, or WhatsApp screenshots to compute an auditable Threat Score & Explainable AI breakdown.
          </p>
        </div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Transcript Editor & Input Methods */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-panel rounded-2xl border border-white/10 p-6 space-y-5 bg-slate-900/90 shadow-2xl">
              {/* Input Method Selector Tabs */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Input Channel & Media Modality
                </label>
                <div className="grid grid-cols-4 gap-1.5 bg-[#030611] p-1.5 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setInputTab('transcript')}
                    className={`py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      inputTab === 'transcript'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Transcript</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setInputTab('audio');
                      handleFileUploadSim('audio');
                    }}
                    className={`py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      inputTab === 'audio'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Audio Call</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setInputTab('screenshot');
                      handleFileUploadSim('screenshot');
                    }}
                    className={`py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      inputTab === 'screenshot'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Screenshot</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInputTab('whatsapp')}
                    className={`py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      inputTab === 'whatsapp'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Upload Dropzone Visual for Audio / Screenshot */}
              {(inputTab === 'audio' || inputTab === 'screenshot') && (
                <div className="p-4 rounded-xl bg-[#030611] border border-dashed border-cyan-500/30 text-center space-y-2 animate-fade-in">
                  <Upload className="w-6 h-6 text-cyan-400 mx-auto animate-bounce" />
                  <div className="text-xs text-slate-200 font-semibold">
                    {inputTab === 'audio' ? 'Uploaded Audio Waveform Processed' : 'OCR Screenshot Text Extracted'}
                  </div>
                  <div className="text-[11px] text-cyan-400 font-mono">
                    File: {uploadedFileName || 'sample_input.mp3'}
                  </div>
                </div>
              )}

              {/* Quick Preset Example Buttons */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                    Preset Scenarios for Testing
                  </label>
                  <span className="text-[10px] text-cyan-400 font-mono">Click to load</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => loadPreset(PRESET_SAMPLE_TRANSCRIPTS.cbiDigitalArrest)}
                    className="px-2.5 py-1.5 rounded-lg bg-[#030611] hover:bg-slate-800 border border-slate-800 hover:border-red-500/40 text-[11px] text-slate-300 flex items-center gap-1.5 transition"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    CBI Digital Arrest
                  </button>

                  <button
                    type="button"
                    onClick={() => loadPreset(PRESET_SAMPLE_TRANSCRIPTS.customsCourier)}
                    className="px-2.5 py-1.5 rounded-lg bg-[#030611] hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-[11px] text-slate-300 flex items-center gap-1.5 transition"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Customs Courier Scam
                  </button>

                  <button
                    type="button"
                    onClick={() => loadPreset(PRESET_SAMPLE_TRANSCRIPTS.legitimateBankReminder)}
                    className="px-2.5 py-1.5 rounded-lg bg-[#030611] hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-[11px] text-slate-300 flex items-center gap-1.5 transition"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Legitimate Bank Reminder
                  </button>
                </div>
              </div>

              {/* Large Transcript Editor */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Transcript Content & Text Stream
                  </label>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {inputText.length} chars
                  </span>
                </div>
                <textarea
                  rows={9}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste suspicious call transcript, WhatsApp message, or legal notice text here..."
                  className="w-full p-4 rounded-xl bg-[#030611] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm font-sans focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/50 transition resize-none leading-relaxed"
                />
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing || !inputText.trim()}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-3 transition transform active:scale-98 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-slate-950" />
                    <span>AI analysing... (Extracted Coercion Vectors)</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Analyze with AI</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: AI Intelligence Report & Hero Reasoning Panel */}
          <div className="lg:col-span-6 space-y-6">
            {!analysisResult && !isAnalyzing ? (
              /* Placeholder State */
              <div className="glass-panel rounded-2xl border border-white/10 p-8 text-center space-y-4 bg-slate-900/40 min-h-[500px] flex flex-col items-center justify-center">
                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Search className="w-10 h-10 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-manrope">Ready for Intelligence Analysis</h3>
                  <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto leading-relaxed">
                    Select a preset or paste suspicious text on the left, then click <strong>"Analyze with AI"</strong> to compute an auditable Threat Score & XAI Report.
                  </p>
                </div>
              </div>
            ) : isAnalyzing ? (
              /* Loading State */
              <div className="glass-panel rounded-2xl border border-cyan-500/30 p-10 text-center space-y-6 bg-slate-900/80 min-h-[500px] flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin"></div>
                  <ShieldAlert className="w-8 h-8 text-cyan-400 absolute inset-0 m-auto" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-manrope">AI analysing...</h3>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    Evaluating psychological coercion vectors, fake CBI/ED authority claims, and forced video isolation templates...
                  </p>
                </div>
              </div>
            ) : analysisResult ? (
              /* Analysis Output Display */
              <div className="space-y-6 animate-fade-in">
                {/* Top Summary Card */}
                <div className="glass-panel rounded-2xl border border-cyan-500/30 p-6 space-y-6 bg-slate-900/95 shadow-2xl">
                  {/* Header Row */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                        Detected Scam Vector
                      </span>
                      <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5 font-manrope">
                        {analysisResult.category}
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                        Impersonated Agency
                      </span>
                      <div className="text-xs font-bold text-cyan-400 font-mono">
                        {analysisResult.impersonatedEntity || 'Unknown Authority'}
                      </div>
                    </div>
                  </div>

                  {/* Threat Meter & Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <ThreatMeter
                      score={analysisResult.threatScore}
                      confidence={analysisResult.confidence}
                      risk={analysisResult.risk}
                      size="lg"
                    />

                    {/* Breakdown box */}
                    <div className="space-y-3 p-4 rounded-xl bg-[#030611] border border-slate-800 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Threat Score</span>
                        <span className="font-mono font-bold text-red-400 text-sm">
                          {analysisResult.threatScore}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">AI Confidence</span>
                        <span className="font-mono font-bold text-cyan-400">
                          {analysisResult.confidence}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Risk Level</span>
                        <span className="font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                          {analysisResult.risk}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Action Checklist */}
                  <div className="space-y-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2 font-space">
                      <ShieldAlert className="w-4 h-4 text-amber-400" />
                      Recommended Safety Protocol
                    </h4>

                    <ul className="space-y-2 text-xs text-slate-200">
                      {analysisResult.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => setIsReportModalOpen(true)}
                      className="w-full sm:w-1/2 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-red-600/25"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Report to Cyber Cell (1930)</span>
                    </button>

                    <NavLink
                      to="/assistant"
                      className="w-full sm:w-1/2 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition border border-slate-700"
                    >
                      <Bot className="w-4 h-4 text-cyan-400" />
                      <span>Ask AI Fraud Assistant</span>
                    </NavLink>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <button
                      onClick={copyDossierJson}
                      className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-[11px]"
                    >
                      {copiedDossier ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedDossier ? 'JSON Copied' : 'Export JSON Dossier'}
                    </button>
                    <span className="text-[11px]">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                {/* Hero Explainable AI Reasoning Panel */}
                <AiReasoningPanel result={analysisResult} />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Report Modal */}
      <ReportScamModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        scamCategory={analysisResult?.category}
        threatScore={analysisResult?.threatScore}
      />
    </div>
  );
};
