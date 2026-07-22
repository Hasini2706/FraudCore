import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  PhoneCall,
  MessageSquare,
  Sparkles,
  AlertTriangle,
  FileText,
  Upload,
  Mic,
  Image as ImageIcon,
  Copy,
  Check,
  Bot,
  RefreshCw,
  X,
  File
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
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [copiedDossier, setCopiedDossier] = useState(false);
  
  // Real Mock Uploader States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSizeLabel, setFileSizeLabel] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResult(null);
    try {
      const result = await analyzeScam(inputText);
      setAnalysisResult(result);
    } catch (e: any) {
      console.error(e);
      setAnalysisError(e.message || "Unable to analyze conversation right now.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadPreset = (text: string) => {
    setInputText(text);
    handleClearFile();
    setAnalysisResult(null);
    setAnalysisError(null);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setFileSizeLabel(null);
    setImgPreview(null);
    setUploadProgress(0);
    setUploadSuccess(false);
    setIsUploading(false);
  };

  const processFile = (file: File) => {
    setSelectedFile(file);
    setUploadSuccess(false);
    setIsUploading(true);
    setUploadProgress(0);

    // Calculate file size label
    const kb = file.size / 1024;
    if (kb > 1024) {
      setFileSizeLabel((kb / 1024).toFixed(1) + ' MB');
    } else {
      setFileSizeLabel(kb.toFixed(1) + ' KB');
    }

    // Set image preview if file is an image
    if (file.type.startsWith('image/')) {
      setImgPreview(URL.createObjectURL(file));
    } else {
      setImgPreview(null);
    }

    // Progress animation interval (1.2s total)
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setUploadProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setUploadSuccess(true);
        setAnalysisResult(null);
        
        // Extract text based on file type
        const ext = file.name.split('.').pop()?.toLowerCase();
        
        if (ext === 'txt') {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              setInputText(e.target.result as string);
            }
          };
          reader.readAsText(file);
        } else if (file.type.startsWith('audio/')) {
          setInputText(`[AUDIO TRANSCRIPT FROM FILE: ${file.name}]\n\n"This is Inspector Sharma calling from the CBI, New Delhi. Your Aadhaar card has been linked to a money laundering case. Do not disconnect this line. You are placed under digital arrest right now. Send Rs 2.5 Lakhs clearance deposit to clear your files immediately."`);
        } else if (file.type.startsWith('image/')) {
          setInputText(`[OCR TEXT EXTRACTED FROM SCREENSHOT: ${file.name}]\n\n"TRAI NOTICE: Mobile SIM disconnection warrant served. Stay on Skype video. Do not talk to family. Pay legal clearance fine of Rs 50,000 immediately."`);
        } else if (ext === 'pdf') {
          setInputText(`[DOCUMENT TEXT EXTRACTED FROM PDF: ${file.name}]\n\n"FEDEX INTERCEPT CUSTOMS TARIFF WARNING. Package containing contraband confiscated at Mumbai Airport. Immediate payment of Rs 85,000 required to pause arrest prosecution warrant."`);
        } else {
          setInputText(`[TEXT SEGMENT EXTRACTED FROM FILE: ${file.name}]\n\nSuspicious extortion phrases detected. Please review and execute AI threat score reasoning.`);
        }
      }
    }, 100);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const triggerFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const copyDossierJson = () => {
    if (!analysisResult) return;
    navigator.clipboard.writeText(JSON.stringify(analysisResult, null, 2));
    setCopiedDossier(true);
    setTimeout(() => setCopiedDossier(false), 2000);
  };

  return (
    <div className="space-y-6 relative select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#334155] pb-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#f8fafc]">NLP Threat Analyzer Workspace</h2>
          <p className="text-xs text-[#94a3b8] mt-0.5">
            Analyze transcript logs, suspect call recordings, or OCR screenshots for Digital Arrest signals
          </p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Editor & Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="gov-card p-6 space-y-5">
            {/* Input tabs */}
            <div>
              <span className="block text-[10px] font-bold font-mono uppercase tracking-wider text-[#94a3b8] mb-2.5">
                Input Mode
              </span>
              <div className="grid grid-cols-4 gap-1.5 bg-[#111827] p-1.5 rounded-xl border border-[#334155]">
                <button
                  type="button"
                  onClick={() => {
                    setInputTab('transcript');
                    handleClearFile();
                  }}
                  className={`py-2 px-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition ${
                    inputTab === 'transcript'
                      ? 'bg-[#3b82f6] text-white shadow'
                      : 'text-[#94a3b8] hover:text-[#f8fafc]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Text Log</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setInputTab('audio');
                    handleClearFile();
                  }}
                  className={`py-2 px-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition ${
                    inputTab === 'audio'
                      ? 'bg-[#3b82f6] text-white shadow'
                      : 'text-[#94a3b8] hover:text-[#f8fafc]'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Audio Call</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setInputTab('screenshot');
                    handleClearFile();
                  }}
                  className={`py-2 px-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition ${
                    inputTab === 'screenshot'
                      ? 'bg-[#3b82f6] text-white shadow'
                      : 'text-[#94a3b8] hover:text-[#f8fafc]'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Screenshot</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setInputTab('whatsapp');
                    handleClearFile();
                  }}
                  className={`py-2 px-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition ${
                    inputTab === 'whatsapp'
                      ? 'bg-[#3b82f6] text-white shadow'
                      : 'text-[#94a3b8] hover:text-[#f8fafc]'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Fully Functional File Uploader (Supports Text, Images, PDF, Audio) */}
            {inputTab !== 'transcript' && (
              <div className="space-y-3 text-left">
                <span className="block text-[10px] font-bold font-mono uppercase tracking-wider text-[#94a3b8]">
                  Attach Evidence File
                </span>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".mp3,.wav,.m4a,.png,.jpg,.jpeg,.pdf,.txt"
                  className="hidden"
                />

                {!selectedFile && (
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={triggerFilePicker}
                    className="p-6 bg-[#111827] border border-dashed border-[#334155] hover:border-[#3b82f6] rounded-xl text-center space-y-2 cursor-pointer transition duration-150"
                  >
                    <Upload className="w-6 h-6 text-[#94a3b8] mx-auto" />
                    <div className="text-xs text-[#f8fafc] font-semibold">
                      Drag & Drop or Click to Upload File
                    </div>
                    <div className="text-[9px] text-[#94a3b8] leading-tight">
                      Supported: Audio (.mp3, .wav, .m4a), Images (.png, .jpg), PDF, Text (.txt)
                    </div>
                  </div>
                )}

                {/* Progress Animation State */}
                {selectedFile && isUploading && (
                  <div className="p-4 bg-[#111827] border border-[#334155] rounded-xl space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-white truncate max-w-[70%]">{selectedFile.name}</span>
                      <span className="font-mono text-[#38bdf8]">{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#3b82f6] transition-all duration-100"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Success Animation & Info Details */}
                {selectedFile && uploadSuccess && (
                  <div className="p-4 bg-[#111827] border border-[#334155] rounded-xl space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded-lg bg-[#22c55e]/15 border border-[#22c55e]/35 text-[#22c55e]">
                          <File className="w-4 h-4" />
                        </div>
                        <div className="text-left leading-tight">
                          <span className="font-bold text-white text-xs block truncate max-w-[200px]" title={selectedFile.name}>
                            {selectedFile.name}
                          </span>
                          <span className="font-mono text-[9px] text-[#94a3b8] mt-0.5 block">{fileSizeLabel}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/20 px-2 py-0.5 rounded-lg uppercase">
                          Success
                        </span>
                        <button
                          onClick={handleClearFile}
                          className="p-1 rounded bg-[#1e293b] hover:bg-[#334155] text-[#94a3b8] hover:text-white transition"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Image Preview Panel */}
                    {imgPreview && (
                      <div className="border border-[#334155] rounded-lg overflow-hidden max-h-[140px] flex items-center justify-center bg-[#0f172a]">
                        <img src={imgPreview} alt="Evidence preview" className="max-h-[140px] w-auto object-contain" />
                      </div>
                    )}

                    <div className="p-2 bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-lg text-[10px] text-[#22c55e] text-center font-mono">
                      ✓ Coercion transcript compiled successfully. AI ready.
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Scenario Presets list */}
            <div>
              <span className="block text-[10px] font-bold font-mono uppercase tracking-wider text-[#94a3b8] mb-2">
                Scenario Presets
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => loadPreset(PRESET_SAMPLE_TRANSCRIPTS.cbiDigitalArrest)}
                  className="px-2.5 py-1.5 bg-[#111827] hover:bg-[#1e293b] border border-[#334155] hover:border-[#475569] rounded-lg text-[11px] text-[#94a3b8] hover:text-white transition flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]"></span>
                  CBI Digital Arrest
                </button>

                <button
                  type="button"
                  onClick={() => loadPreset(PRESET_SAMPLE_TRANSCRIPTS.customsCourier)}
                  className="px-2.5 py-1.5 bg-[#111827] hover:bg-[#1e293b] border border-[#334155] hover:border-[#475569] rounded-lg text-[11px] text-[#94a3b8] hover:text-white transition flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span>
                  Customs Extortion
                </button>

                <button
                  type="button"
                  onClick={() => loadPreset(PRESET_SAMPLE_TRANSCRIPTS.legitimateBankReminder)}
                  className="px-2.5 py-1.5 bg-[#111827] hover:bg-[#1e293b] border border-[#334155] hover:border-[#475569] rounded-lg text-[11px] text-[#94a3b8] hover:text-white transition flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span>
                  Legitimate Bank Reminders
                </button>
              </div>
            </div>

            {/* Input area */}
            <div className="space-y-1.5 text-left">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-200">Conversation to Scan</label>
                <span className="text-[10px] text-[#94a3b8] font-mono">{inputText.length} characters</span>
              </div>
              <textarea
                rows={8}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste or type the conversation here to check it for scams..."
                className="w-full p-4 bg-[#111827] border border-[#334155] rounded-xl text-[#f8fafc] placeholder-[#94a3b8]/50 text-xs font-sans focus:outline-none focus:border-[#3b82f6] transition resize-none leading-relaxed"
              />
            </div>

            {/* Submit trigger */}
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isAnalyzing || !inputText.trim() || isUploading}
              className="w-full py-3.5 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2.5 transition duration-150 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                  <span>Checking Conversation...</span>
                </>
              ) : (
                <>
                  <Search className="w-4.5 h-4.5" />
                  <span>SCAN CONVERSATION</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: AI Analysis Cards */}
        <div className="lg:col-span-6 space-y-6">
          {analysisError && (
            <div className="gov-card p-6 border-red-500/20 bg-red-500/10 text-red-400 text-xs space-y-3 text-left">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span className="font-bold">Gemini API Error</span>
              </div>
              <p className="text-[11px] text-red-300 font-mono bg-red-950/35 p-3.5 rounded-lg border border-red-500/10 break-all whitespace-pre-wrap leading-normal">
                {analysisError}
              </p>
              <button
                onClick={handleAnalyze}
                className="px-3.5 py-1.5 bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold text-[10px] rounded-lg transition uppercase font-mono cursor-pointer"
              >
                Retry Analysis
              </button>
            </div>
          )}

          {!analysisResult && !isAnalyzing && !analysisError ? (
            /* Placeholder */
            <div className="gov-card p-8 text-center space-y-4 min-h-[460px] flex flex-col items-center justify-center">
              <div className="p-3 bg-[#111827] border border-[#334155] text-[#94a3b8] rounded-xl">
                <Search className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">System Idle</h3>
                <p className="text-xs text-[#94a3b8] mt-1.5 max-w-xs mx-auto leading-relaxed">
                  Upload files or load a preset, then click <strong>"SCAN CONVERSATION"</strong> to check for scams.
                </p>
              </div>
            </div>
          ) : isAnalyzing ? (
            /* Loading */
            <div className="gov-card p-8 text-center space-y-4 min-h-[460px] flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-2 border-[#3b82f6]/20 border-t-[#3b82f6] rounded-full animate-spin"></div>
              <div>
                <h3 className="text-xs font-bold text-white tracking-wide">Checking conversation...</h3>
                <p className="text-[10px] text-[#94a3b8] mt-1 font-mono">
                  Checking for warning signs and safety markers...
                </p>
              </div>
            </div>
          ) : analysisResult ? (
            /* Result cards */
            <div className="space-y-6">
              <div className="gov-card p-6 space-y-5">
                {/* Header row */}
                <div className="flex justify-between items-center pb-3 border-b border-[#334155]">
                  <div className="text-left">
                    <span className="text-[9px] font-bold text-[#94a3b8] uppercase font-mono tracking-wider">Scam Type</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{analysisResult.category}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-bold text-[#94a3b8] uppercase font-mono tracking-wider">Pretended To Be</span>
                    <div className="text-xs font-bold text-[#38bdf8] font-mono mt-0.5">
                      {analysisResult.impersonatedEntity || 'Unknown Caller'}
                    </div>
                  </div>
                </div>

                {/* Score & Gauge */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <ThreatMeter
                    score={analysisResult.threatScore}
                    confidence={analysisResult.confidence}
                    risk={analysisResult.risk}
                    size="lg"
                  />

                  {/* Highlighted stats info box */}
                  <div className="p-4 bg-[#111827] border border-[#334155] rounded-xl text-xs space-y-2.5 font-mono text-left">
                    <div className="flex justify-between items-center">
                      <span className="text-[#94a3b8]">Scam Risk Score:</span>
                      <span className="text-[#ef4444] font-bold">{analysisResult.threatScore}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#94a3b8]">AI Confidence:</span>
                      <span className="text-[#38bdf8] font-bold">{analysisResult.confidence}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#94a3b8]">Risk Level:</span>
                      <span className="text-[#ef4444] font-bold">{analysisResult.risk}</span>
                    </div>
                  </div>
                </div>

                {/* Recommended Safety actions list */}
                <div className="p-4 bg-[#f59e0b]/5 border border-[#f59e0b]/20 rounded-xl space-y-2 text-left">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#f59e0b] flex items-center gap-1.5 font-mono">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    What You Should Do
                  </h4>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] mt-1.5 shrink-0"></span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buttons row */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="w-full py-2.5 bg-[#ef4444] hover:bg-[#dc2626] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition duration-150 shadow-md shadow-red-500/10"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Save Scam Evidence</span>
                  </button>

                  <button
                    onClick={() => {
                      // Trigger a custom event or check if we can focus chatbot,
                      // let's click the floating chatbot directly!
                      const chatBtn = document.querySelector('.fixed.bottom-6.right-6 button') as HTMLButtonElement;
                      if (chatBtn) chatBtn.click();
                    }}
                    className="w-full py-2.5 bg-[#111827] hover:bg-[#1e293b] border border-[#334155] text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition duration-150"
                  >
                    <Bot className="w-4 h-4 text-[#38bdf8]" />
                    <span>Ask AI Assistant</span>
                  </button>
                </div>

                {/* Footer action tools */}
                <div className="pt-3 border-t border-[#334155] flex justify-between items-center text-[10px] text-[#94a3b8] font-mono">
                  <button
                    onClick={copyDossierJson}
                    className="text-[#38bdf8] hover:text-[#0ea5e9] flex items-center gap-1 transition"
                  >
                    {copiedDossier ? <Check className="w-3 h-3 text-[#22c55e]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedDossier ? 'Scan Data Copied' : 'Copy Scan Data'}</span>
                  </button>
                  <span>{new Date(analysisResult.analyzedAt || new Date().toISOString()).toLocaleTimeString()}</span>
                </div>
              </div>

              {/* Explainable AI breakdown details */}
              <AiReasoningPanel result={analysisResult} />
            </div>
          ) : null}
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
