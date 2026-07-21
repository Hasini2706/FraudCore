import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Search,
  PhoneCall,
  MessageSquare,
  Sparkles,
  ShieldAlert,
  Upload,
  Mic,
  Image as ImageIcon,
  Copy,
  Check,
  Bot,
  RefreshCw,
  FileText
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
    <div className="relative min-h-screen bg-[#0B1220] pb-20 pt-8 select-none text-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00BFA6]/5 border border-[#00BFA6]/20 text-[#00BFA6] text-xs font-semibold shadow-sm font-space">
            <Sparkles className="w-3.5 h-3.5 text-[#00BFA6]" />
            <span>OPERATIONAL COGNITIVE NLP ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight font-manrope font-medium">
            AI Transaction & Call Analyzer
          </h1>
          <p className="text-[#CBD5E1] text-xs sm:text-sm font-medium">
            Analyze suspect transcripts, call waveforms, or chat snapshots to evaluate threat indicators and verify escrow lock requirements.
          </p>
        </div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Transcript Editor & Input Methods */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#1A2332] border border-white/5 rounded-xl p-6 space-y-5 shadow-md">
              {/* Input Method Selector Tabs */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#CBD5E1]/60 mb-2 font-space">
                  Operational Input Modality
                </label>
                <div className="grid grid-cols-4 gap-1 bg-[#111827] p-1 rounded-lg border border-white/5">
                  <button
                    type="button"
                    onClick={() => setInputTab('transcript')}
                    className={`py-1.5 px-2 rounded text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      inputTab === 'transcript'
                        ? 'bg-[#1A2332] text-[#00BFA6] border border-white/5 shadow-sm'
                        : 'text-[#CBD5E1] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Text</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setInputTab('audio');
                      handleFileUploadSim('audio');
                    }}
                    className={`py-1.5 px-2 rounded text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      inputTab === 'audio'
                        ? 'bg-[#1A2332] text-[#00BFA6] border border-white/5 shadow-sm'
                        : 'text-[#CBD5E1] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Audio</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setInputTab('screenshot');
                      handleFileUploadSim('screenshot');
                    }}
                    className={`py-1.5 px-2 rounded text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      inputTab === 'screenshot'
                        ? 'bg-[#1A2332] text-[#00BFA6] border border-white/5 shadow-sm'
                        : 'text-[#CBD5E1] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Screenshot</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInputTab('whatsapp')}
                    className={`py-1.5 px-2 rounded text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      inputTab === 'whatsapp'
                        ? 'bg-[#1A2332] text-[#00BFA6] border border-white/5 shadow-sm'
                        : 'text-[#CBD5E1] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Upload Dropzone Visual for Audio / Screenshot */}
              {(inputTab === 'audio' || inputTab === 'screenshot') && (
                <div className="p-4 rounded-lg bg-[#111827] border border-dashed border-[#00BFA6]/30 text-center space-y-1 animate-fade-in shadow-inner">
                  <Upload className="w-5 h-5 text-[#00BFA6] mx-auto" />
                  <div className="text-xs text-[#F8FAFC] font-bold">
                    {inputTab === 'audio' ? 'Uploaded Audio Waveform Processed' : 'OCR Screenshot Text Extracted'}
                  </div>
                  <div className="text-[10px] text-[#00BFA6] font-mono font-semibold">
                    File: {uploadedFileName || 'sample_input.mp3'}
                  </div>
                </div>
              )}

              {/* Quick Preset Example Buttons */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-bold text-[#CBD5E1]/60 uppercase tracking-wider font-space">
                    Inspect Sample Transcripts
                  </label>
                  <span className="text-[9px] text-[#00BFA6] font-bold">Click to load</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => loadPreset(PRESET_SAMPLE_TRANSCRIPTS.cbiDigitalArrest)}
                    className="px-2.5 py-1.5 rounded bg-[#111827] hover:bg-[#1A2332] border border-white/5 hover:border-red-900/40 text-[11px] text-[#CBD5E1] flex items-center gap-1.5 transition-colors font-semibold"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span>
                    CBI Digital Arrest
                  </button>

                  <button
                    type="button"
                    onClick={() => loadPreset(PRESET_SAMPLE_TRANSCRIPTS.customsCourier)}
                    className="px-2.5 py-1.5 rounded bg-[#111827] hover:bg-[#1A2332] border border-white/5 hover:border-amber-900/40 text-[11px] text-[#CBD5E1] flex items-center gap-1.5 transition-colors font-semibold"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
                    Customs Courier
                  </button>

                  <button
                    type="button"
                    onClick={() => loadPreset(PRESET_SAMPLE_TRANSCRIPTS.legitimateBankReminder)}
                    className="px-2.5 py-1.5 rounded bg-[#111827] hover:bg-[#1A2332] border border-white/5 hover:border-green-900/40 text-[11px] text-[#CBD5E1] flex items-center gap-1.5 transition-colors font-semibold"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
                    Legitimate Alert
                  </button>
                </div>
              </div>

              {/* Large Transcript Editor */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#F8FAFC]">
                    Forensic Text Stream
                  </label>
                  <span className="text-[10px] text-[#CBD5E1]/60 font-mono">
                    {inputText.length} chars
                  </span>
                </div>
                <textarea
                  rows={8}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste suspicious call transcript, WhatsApp message, or legal notice text here..."
                  className="w-full p-3.5 rounded-lg bg-[#111827] border border-white/5 text-[#F8FAFC] placeholder-[#CBD5E1]/30 text-xs font-sans focus:outline-none focus:border-[#00BFA6] transition-colors resize-none leading-relaxed shadow-inner"
                />
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing || !inputText.trim()}
                className="w-full py-3 rounded bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-[#0B1220] font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4.5 h-4.5 animate-spin text-[#0B1220]" />
                    <span>Running operational analysis...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4.5 h-4.5" />
                    <span>Execute Forensic Analysis</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: AI Intelligence Report */}
          <div className="lg:col-span-6 space-y-6">
            {!analysisResult && !isAnalyzing ? (
              /* Placeholder State */
              <div className="bg-[#1A2332] border border-white/5 rounded-xl p-8 text-center space-y-3.5 shadow-md min-h-[460px] flex flex-col items-center justify-center">
                <div className="p-3 rounded bg-[#00BFA6]/10 border border-[#00BFA6]/20 text-[#00BFA6]">
                  <Search className="w-8 h-8 animate-pulse-slow" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F8FAFC] font-manrope">Awaiting Escrow Data</h3>
                  <p className="text-[#CBD5E1]/70 text-xs mt-1 max-w-xs mx-auto leading-relaxed">
                    Log suspect conversation records or transactional triggers on the left to run evaluation.
                  </p>
                </div>
              </div>
            ) : isAnalyzing ? (
              /* Loading State */
              <div className="bg-[#1A2332] border border-white/5 rounded-xl p-10 text-center space-y-5 shadow-md min-h-[460px] flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-[#00BFA6]/15 border-t-[#00BFA6] animate-spin"></div>
                  <ShieldAlert className="w-6 h-6 text-[#00BFA6] absolute inset-0 m-auto" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F8FAFC] font-manrope">Evaluating Threat Profile...</h3>
                  <p className="text-xs text-[#CBD5E1]/60 mt-1 font-mono">
                    Measuring psychological panic flags, bank spoofing registers, and coercion indices...
                  </p>
                </div>
              </div>
            ) : analysisResult ? (
              /* Analysis Output Display */
              <div className="space-y-6 animate-fade-in">
                {/* Top Summary Card */}
                <div className="bg-[#1A2332] border border-white/5 rounded-xl p-6 space-y-5 shadow-md">
                  {/* Header Row */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#CBD5E1]/60 font-space">
                        Coercion Classification
                      </span>
                      <h3 className="text-lg font-bold text-[#F8FAFC] flex items-center gap-2 mt-0.5 font-manrope">
                        {analysisResult.category}
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#CBD5E1]/60 font-space">
                        Impersonation Claim
                      </span>
                      <div className="text-xs font-semibold text-[#00BFA6] font-mono">
                        {analysisResult.impersonatedEntity || 'Unknown Sender'}
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

                    {/* Breakdown Box */}
                    <div className="space-y-3 p-4 rounded-lg bg-[#111827] border border-white/5 text-xs text-[#CBD5E1]">
                      <div className="flex items-center justify-between">
                        <span className="text-[#CBD5E1]/70 font-medium">Coercion Probability</span>
                        <span className="font-mono font-bold text-[#EF4444] text-sm">
                          {analysisResult.threatScore}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#CBD5E1]/70 font-medium">Confidence Score</span>
                        <span className="font-mono font-bold text-[#00BFA6]">
                          {analysisResult.confidence}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#CBD5E1]/70 font-medium">Evaluated Risk</span>
                        <span className="font-bold px-2 py-0.5 rounded bg-red-950/40 text-[#EF4444] border border-red-900/40 uppercase text-[10px]">
                          {analysisResult.risk}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Action Checklist */}
                  <div className="space-y-2.5 p-4 rounded bg-[#F59E0B]/5 border border-[#F59E0B]/20">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#F59E0B] flex items-center gap-2 font-space">
                      <ShieldAlert className="w-4 h-4 text-[#F59E0B]" />
                      Safety Protocols & Incident Guidance
                    </h4>

                    <ul className="space-y-1.5 text-xs text-[#F8FAFC] font-medium">
                      {analysisResult.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-1.5 shrink-0"></span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-1 flex flex-col sm:flex-row items-center gap-2.5">
                    <button
                      onClick={() => setIsReportModalOpen(true)}
                      className="w-full sm:w-1/2 py-2.5 rounded bg-[#EF4444] hover:bg-[#EF4444]/90 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm border border-[#EF4444]"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Log Incident dossier (1930)</span>
                    </button>

                    <NavLink
                      to="/assistant"
                      className="w-full sm:w-1/2 py-2.5 rounded bg-[#111827] hover:bg-[#111827]/80 text-[#F8FAFC] font-bold text-xs flex items-center justify-center gap-2 transition border border-white/5"
                    >
                      <Bot className="w-4 h-4 text-[#00BFA6]" />
                      <span>Consult Safety Copilot</span>
                    </NavLink>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#CBD5E1]/60 font-mono font-medium">
                    <button
                      onClick={copyDossierJson}
                      className="flex items-center gap-1 text-[#00BFA6] hover:text-[#00BFA6]/90 transition-colors"
                    >
                      {copiedDossier ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedDossier ? 'JSON Copied' : 'Export JSON Dossier'}
                    </button>
                    <span>
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                {/* Explainable AI Reasoning Panel */}
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
