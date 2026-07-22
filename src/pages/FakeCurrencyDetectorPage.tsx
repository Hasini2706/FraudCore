import React, { useState, useRef } from 'react';
import {
  Upload,
  Check,
  AlertTriangle,
  FileText,
  Download,
  RefreshCw,
  X,
  Banknote,
  Eye,
  BookOpen,
  ShieldAlert,
  ShieldCheck,
  HelpCircle,
  Info
} from 'lucide-react';
import { analyzeCurrencyNote } from '../services/currencyAnalysisService';
import type { CurrencyAnalysisResult } from '../services/currencyAnalysisService';

export const FakeCurrencyDetectorPage: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CurrencyAnalysisResult | null>(null);
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);
  const [simulationProfile, setSimulationProfile] = useState<'genuine' | 'counterfeit'>('genuine');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Styled SVG/CSS Note Presets to make visual preview rich out-of-the-box
  const loadPreset = (type: 'genuine' | 'counterfeit') => {
    setSimulationProfile(type);
    setAnalysisResult(null);
    if (type === 'genuine') {
      setImagePreview('PRESET_GENUINE_500');
      setImageFile(new File([''], 'genuine_500_rupees.png'));
    } else {
      setImagePreview('PRESET_COUNTERFEIT_2000');
      setImageFile(new File([''], 'counterfeit_2000_rupees.png'));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setAnalysisResult(null);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setAnalysisResult(null);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;
    setIsAnalyzing(true);
    try {
      const isSuspicious = simulationProfile === 'counterfeit';
      const result = await analyzeCurrencyNote(imageFile, isSuspicious);
      setAnalysisResult(result);
    } catch (err) {
      console.error('AI Analysis failed:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!analysisResult) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const riskColor = analysisResult.status === 'Likely Genuine' ? '#22c55e' : '#ef4444';

    printWindow.document.write(`
      <html>
        <head>
          <title>Fraud$core - Currency Authenticity Report</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #0f172a; line-height: 1.6; }
            .header { border-bottom: 2px solid ${riskColor}; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
            .logo { font-size: 24px; font-weight: bold; color: #0f172a; }
            .meta { background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; margin-bottom: 30px; font-size: 13px; }
            .section-title { font-size: 16px; font-weight: bold; color: #0f172a; margin-top: 30px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
            .content-box { background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; font-size: 14px; }
            .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; background-color: ${riskColor}20; color: ${riskColor}; border: 1px solid ${riskColor}40; }
            .footer { margin-top: 50px; font-size: 11px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Fraud$core Currency Audit Report</div>
            <div style="font-size: 11px; text-align: right; text-transform: uppercase; color: #64748b;">Generated on: ${new Date().toLocaleString()}</div>
          </div>
          
          <div class="meta">
            <strong>Dossier Reference ID:</strong> CUR-${Date.now().toString().slice(-6)}<br/>
            <strong>Note Status:</strong> <span class="badge">${analysisResult.status}</span><br/>
            <strong>AI Risk Score:</strong> ${analysisResult.riskScore}%<br/>
            <strong>AI Confidence Level:</strong> ${analysisResult.confidence}%<br/>
            <strong>File Name:</strong> ${imageFile?.name || 'Uploaded Note Image'}
          </div>
          
          <div class="section-title">Assessment Summary</div>
          <div class="content-box">${analysisResult.summary}</div>
          
          <div class="section-title">Security Features Audited</div>
          <ul>
            ${analysisResult.securityFeatures.map(f => `<li>[X] ${f}</li>`).join('')}
            ${analysisResult.detectedIssues.map(i => `<li style="color: #ef4444;">[!] Flagged Issue: ${i}</li>`).join('')}
          </ul>
          
          <div class="section-title">Disclaimer</div>
          <p style="font-size: 11px; color: #64748b; line-height: 1.4;">
            This analysis is AI-assisted and intended for educational and awareness purposes only. It does not replace official verification by the Reserve Bank of India or law enforcement agencies.
          </p>
          
          <div class="footer">
            Fraud$core AI-Powered Fraud Intelligence Platform
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Helper to render the styled preset mockup representation of currency notes
  const renderNotePreset = (type: 'genuine' | 'counterfeit') => {
    const isGenuine = type === 'genuine';
    return (
      <div className={`w-full max-w-lg h-56 rounded-xl border relative overflow-hidden flex flex-col justify-between p-4 shadow-inner ${
        isGenuine 
          ? 'bg-gradient-to-r from-emerald-950/40 to-teal-950/20 border-emerald-500/30' 
          : 'bg-gradient-to-r from-pink-950/40 to-purple-950/20 border-pink-500/30'
      }`}>
        {/* Micro overlay indicators */}
        <div className="absolute top-2 left-2 text-[8px] font-mono text-slate-400">RESERVE BANK OF INDIA</div>
        
        {/* Visual elements mapping */}
        <div className="flex-1 grid grid-cols-12 gap-2 mt-4 relative">
          {/* See through Register symbol */}
          <div className="col-span-2 flex items-center justify-center">
            <div className={`w-6 h-6 border rounded-full flex items-center justify-center text-[9px] font-mono ${
              isGenuine ? 'border-emerald-500/30 text-emerald-400' : 'border-pink-500/30 text-pink-400'
            }`}>
              ₹
            </div>
          </div>

          {/* Portrait shadow space */}
          <div className="col-span-6 flex flex-col justify-center pl-2">
            <div className="text-xs font-bold text-slate-200">MAHATMA GANDHI</div>
            <div className="text-[9px] text-slate-400 mt-1">₹{isGenuine ? '500' : '2000'} Note Audit</div>
          </div>

          {/* Security thread */}
          <div className="col-span-1 flex justify-center">
            <div className={`w-1.5 h-full ${
              isGenuine 
                ? 'bg-emerald-500 animate-pulse' 
                : 'bg-pink-700/50 border-r border-dashed border-pink-500/30'
            }`} />
          </div>

          {/* Watermark area */}
          <div className={`col-span-3 rounded-lg border flex flex-col items-center justify-center p-1 ${
            isGenuine 
              ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400' 
              : 'bg-pink-950/60 border-pink-500/30 text-pink-400'
          }`}>
            <span className="text-[9px] font-bold">Watermark</span>
            <span className="text-[7px] text-slate-400">{isGenuine ? 'Intact' : 'Blurred'}</span>
          </div>
        </div>

        {/* Serial Number & Footer */}
        <div className="flex justify-between items-end border-t border-slate-700/30 pt-2 text-[8px] font-mono text-slate-400">
          <div>
            Serial: {isGenuine ? '7AA 981242' : '9BB 2315XX'}
          </div>
          <div>
            © {isGenuine ? 'RBI 2026' : 'MOCK 2026'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 relative text-left">
      {/* Background Indian Map Watermark & Grids */}
      <div className="bg-gov-grid absolute inset-0 -m-8 pointer-events-none z-0 opacity-40"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#334155] pb-5 z-10 relative">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#f8fafc]">AI Fake Currency Detector</h2>
          <p className="text-xs text-[#94a3b8] mt-0.5">
            Upload an image of an Indian currency note to analyze its authenticity using AI.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 bg-[#111827] border border-[#334155] text-[10px] text-[#94a3b8] rounded-xl font-mono uppercase">
            Model: CurrencyNet-v2
          </span>
        </div>
      </div>

      {/* Main Grid: Upload & Inspection (Left), Analysis Results (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 z-10 relative">
        {/* Left Column: Image Upload & Visual Annotation Viewer */}
        <div className="lg:col-span-7 space-y-6">
          <div className="gov-card p-6 space-y-5">
            <div className="pb-3 border-b border-[#334155]/60 flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Currency Scan Intake
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => loadPreset('genuine')}
                  className={`px-2.5 py-1 text-[9px] font-bold rounded-lg border font-mono transition duration-150 ${
                    imagePreview === 'PRESET_GENUINE_500'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-[#111827] border-[#334155] text-slate-300 hover:text-white'
                  }`}
                >
                  Load ₹500 Genuine
                </button>
                <button
                  onClick={() => loadPreset('counterfeit')}
                  className={`px-2.5 py-1 text-[9px] font-bold rounded-lg border font-mono transition duration-150 ${
                    imagePreview === 'PRESET_COUNTERFEIT_2000'
                      ? 'bg-pink-500/10 border-pink-500/30 text-pink-400'
                      : 'bg-[#111827] border-[#334155] text-slate-300 hover:text-white'
                  }`}
                >
                  Load ₹2000 Fake
                </button>
              </div>
            </div>

            {/* Drag & Drop Upload Zone */}
            {!imagePreview ? (
              <div
                onDragOver={onDragOver}
                onDrop={onDrop}
                onClick={triggerFileSelect}
                className="border-2 border-dashed border-[#334155] hover:border-[#3b82f6] rounded-xl p-8 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-3 bg-[#111827]/40 min-h-[220px]"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                />
                <div className="p-3 bg-[#111827] border border-[#334155] text-[#38bdf8] rounded-2xl">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Drag & drop note image here</p>
                  <p className="text-[10px] text-[#94a3b8] mt-1 font-mono">
                    Supports JPG, PNG, JPEG, WEBP
                  </p>
                </div>
                <button
                  type="button"
                  className="px-3.5 py-1.5 bg-[#1e293b] hover:bg-[#334155] text-[#38bdf8] text-[10px] font-mono font-bold rounded-lg border border-[#334155] transition"
                >
                  Browse Files
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Visual Preview / Annotated Overlays Container */}
                <div className="relative border border-[#334155] rounded-xl overflow-hidden bg-[#111827] flex items-center justify-center p-6 min-h-[240px]">
                  {imagePreview === 'PRESET_GENUINE_500' ? (
                    renderNotePreset('genuine')
                  ) : imagePreview === 'PRESET_COUNTERFEIT_2000' ? (
                    renderNotePreset('counterfeit')
                  ) : (
                    <img
                      src={imagePreview}
                      alt="Currency Scan Preview"
                      className="max-w-full max-h-56 rounded-lg object-contain shadow-md"
                    />
                  )}

                  {/* Overlays boxes */}
                  {analysisResult && (
                    <>
                      {/* Watermark area box */}
                      <div
                        onMouseEnter={() => setActiveOverlay('watermark')}
                        onMouseLeave={() => setActiveOverlay(null)}
                        className={`absolute cursor-help border-2 transition-all duration-150 rounded ${
                          simulationProfile === 'genuine'
                            ? 'border-emerald-500/60 bg-emerald-500/5'
                            : 'border-pink-500/60 bg-pink-500/5'
                        }`}
                        style={{ top: '25%', left: '72%', width: '20%', height: '50%' }}
                      />

                      {/* Security thread box */}
                      <div
                        onMouseEnter={() => setActiveOverlay('thread')}
                        onMouseLeave={() => setActiveOverlay(null)}
                        className={`absolute cursor-help border-2 transition-all duration-150 rounded ${
                          simulationProfile === 'genuine'
                            ? 'border-emerald-500/60 bg-emerald-500/5'
                            : 'border-pink-500/60 bg-pink-500/5'
                        }`}
                        style={{ top: '10%', left: '48%', width: '3%', height: '80%' }}
                      />

                      {/* Micro lettering box */}
                      <div
                        onMouseEnter={() => setActiveOverlay('lettering')}
                        onMouseLeave={() => setActiveOverlay(null)}
                        className={`absolute cursor-help border-2 transition-all duration-150 rounded ${
                          simulationProfile === 'genuine'
                            ? 'border-emerald-500/60 bg-emerald-500/5'
                            : 'border-pink-500/60 bg-pink-500/5'
                        }`}
                        style={{ top: '80%', left: '10%', width: '15%', height: '10%' }}
                      />

                      {/* See through register box */}
                      <div
                        onMouseEnter={() => setActiveOverlay('register')}
                        onMouseLeave={() => setActiveOverlay(null)}
                        className={`absolute cursor-help border-2 transition-all duration-150 rounded ${
                          simulationProfile === 'genuine'
                            ? 'border-emerald-500/60 bg-emerald-500/5'
                            : 'border-pink-500/60 bg-pink-500/5'
                        }`}
                        style={{ top: '15%', left: '15%', width: '8%', height: '12%' }}
                      />

                      {/* Serial Number box */}
                      <div
                        onMouseEnter={() => setActiveOverlay('serial')}
                        onMouseLeave={() => setActiveOverlay(null)}
                        className={`absolute cursor-help border-2 transition-all duration-150 rounded ${
                          simulationProfile === 'genuine'
                            ? 'border-emerald-500/60 bg-emerald-500/5'
                            : 'border-pink-500/60 bg-pink-500/5'
                        }`}
                        style={{ top: '12%', left: '75%', width: '18%', height: '8%' }}
                      />
                    </>
                  )}
                </div>

                {/* Tooltip detail description banner */}
                {activeOverlay && (
                  <div className="p-3 bg-[#111827] border border-[#334155] rounded-xl flex items-start gap-2.5 text-xs text-slate-300">
                    <Info className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                    <div>
                      {activeOverlay === 'watermark' && (
                        <span><strong>Mahatma Gandhi Watermark:</strong> Contains the portrait watermark and multi-directional windowed bars. {simulationProfile === 'genuine' ? 'Detected and verified.' : 'Watermark appears blurred or failed signature check.'}</span>
                      )}
                      {activeOverlay === 'thread' && (
                        <span><strong>Security Thread:</strong> Color shifting windowed security thread. {simulationProfile === 'genuine' ? 'Color shifts green-to-blue. Verified.' : 'Security thread not detected or is a flat print.'}</span>
                      )}
                      {activeOverlay === 'lettering' && (
                        <span><strong>Micro Lettering:</strong> Sharp minuscule words under magnification. {simulationProfile === 'genuine' ? 'Crisp alignment detected.' : 'Text printing resolution falls below expected DPI.'}</span>
                      )}
                      {activeOverlay === 'register' && (
                        <span><strong>See-through Register:</strong> Aligned numeral that lights up completely against light. {simulationProfile === 'genuine' ? 'Perfect vertical registry alignment.' : 'Front and back print alignment displays displacement.'}</span>
                      )}
                      {activeOverlay === 'serial' && (
                        <span><strong>Serial Number:</strong> Incremental font scaling numbers. {simulationProfile === 'genuine' ? 'Verified pattern matches correct state bank log.' : 'Serial font sizes do not match verified currency prints.'}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Action buttons under note preview */}
                <div className="flex items-center justify-between pt-2 border-t border-[#334155]/60 text-xs">
                  <div className="flex items-center gap-3">
                    <label className="text-[10px] text-[#94a3b8] uppercase font-bold font-mono">
                      Simulation Quality:
                    </label>
                    <select
                      value={simulationProfile}
                      onChange={(e) => setSimulationProfile(e.target.value as 'genuine' | 'counterfeit')}
                      className="px-2.5 py-1 bg-[#111827] border border-[#334155] text-slate-200 text-xs rounded-lg font-mono focus:outline-none"
                    >
                      <option value="genuine">Genuine Profile</option>
                      <option value="counterfeit">Counterfeit Profile</option>
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={removeImage}
                      className="px-3.5 py-2 bg-[#111827] hover:bg-[#1e293b] border border-[#334155] text-[#94a3b8] hover:text-white font-bold rounded-xl transition duration-150"
                    >
                      Remove Note
                    </button>
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="px-5 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold rounded-xl flex items-center gap-1.5 transition duration-150 shadow-lg shadow-blue-500/10 cursor-pointer"
                    >
                      {isAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
                      <span>{isAnalyzing ? 'Analyzing Note...' : 'Analyze Currency'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Analysis Reports Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="gov-card p-6 flex flex-col justify-between min-h-[380px]">
            <div className="pb-3 border-b border-[#334155]/60 flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-[#3b82f6]" />
                <span className="text-xs font-bold text-white">AI Analysis Report</span>
              </div>
              <span className="text-[10px] text-[#94a3b8] font-mono">Dossier</span>
            </div>

            {!analysisResult ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
                <div className="p-3 bg-[#111827] border border-[#334155] text-slate-500 rounded-2xl">
                  <Banknote className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">No Analysis Conducted</h4>
                  <p className="text-[10px] text-[#94a3b8] max-w-xs mx-auto mt-1 leading-relaxed">
                    Upload a currency photo or select a sample preset note above, then click Analyze Currency to execute AI validation.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-5 flex-1 flex flex-col justify-between">
                {/* Visual authenticity status card */}
                <div className={`p-4 rounded-xl border flex items-center gap-3 ${
                  analysisResult.status === 'Likely Genuine'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                  {analysisResult.status === 'Likely Genuine' ? (
                    <ShieldCheck className="w-6 h-6 shrink-0" />
                  ) : (
                    <ShieldAlert className="w-6 h-6 shrink-0" />
                  )}
                  <div className="text-left">
                    <span className="text-[8px] uppercase tracking-wider block font-bold font-mono">Authenticity Status</span>
                    <span className="text-sm font-black uppercase tracking-wide block mt-0.5">{analysisResult.status}</span>
                  </div>
                </div>

                {/* Score & confidence blocks */}
                <div className="grid grid-cols-2 gap-4 font-mono text-xs text-left">
                  <div className="p-3 bg-[#111827] border border-[#334155] rounded-xl">
                    <span className="text-[#94a3b8] text-[9px] uppercase font-bold font-sans">Risk Score</span>
                    <span className={`text-xl font-extrabold block mt-1 ${
                      analysisResult.riskScore >= 40 ? 'text-[#ef4444]' : 'text-[#22c55e]'
                    }`}>{analysisResult.riskScore}%</span>
                  </div>
                  <div className="p-3 bg-[#111827] border border-[#334155] rounded-xl">
                    <span className="text-[#94a3b8] text-[9px] uppercase font-bold font-sans">AI Confidence</span>
                    <span className="text-[#38bdf8] text-xl font-extrabold block mt-1">{analysisResult.confidence}%</span>
                  </div>
                </div>

                {/* Detected / Audited Features List */}
                <div className="space-y-3.5 text-xs text-left">
                  {/* Security Features Detected */}
                  <div className="space-y-1.5">
                    <span className="block text-[9px] font-bold font-mono text-[#94a3b8] uppercase tracking-wider">
                      Security Features Detected
                    </span>
                    <ul className="space-y-1 text-slate-300">
                      {analysisResult.securityFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Flagged issues / missing items */}
                  {analysisResult.detectedIssues.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="block text-[9px] font-bold font-mono text-[#ef4444] uppercase tracking-wider">
                        Missing or Suspicious Features
                      </span>
                      <ul className="space-y-1 text-slate-300">
                        {analysisResult.detectedIssues.map((issue, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-[#ef4444] shrink-0" />
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* AI Summary paragraph */}
                <div className="p-3.5 bg-[#111827] border border-[#334155] rounded-xl text-left space-y-1.5">
                  <span className="block text-[9px] font-bold font-mono text-[#38bdf8] uppercase tracking-wider">
                    AI Summary Assessment
                  </span>
                  <p className="text-slate-300 leading-relaxed text-[11px] font-sans">
                    {analysisResult.summary}
                  </p>
                </div>

                {/* Download audit report button */}
                <button
                  onClick={handleDownloadPDF}
                  className="w-full py-2.5 bg-[#111827] hover:bg-[#1e293b] border border-[#334155] text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition duration-150"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Audit Report (PDF)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section: Educational guide & RBI checks */}
      <div className="gov-card p-6 z-10 relative">
        <div className="pb-3 border-b border-[#334155]/60 mb-5 flex items-center gap-2">
          <BookOpen className="w-4.5 h-4.5 text-[#3b82f6]" />
          <span className="text-xs font-bold text-white">How to Identify Genuine Indian Currency</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-[#111827] border border-[#334155] rounded-xl space-y-2">
            <h4 className="font-bold text-[#38bdf8] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span> Watermark
            </h4>
            <p className="text-[#94a3b8] leading-relaxed text-[11px]">
              Mahatma Gandhi portrait watermark visible against backlight, complete with multi-directional windowed bars.
            </p>
          </div>

          <div className="p-4 bg-[#111827] border border-[#334155] rounded-xl space-y-2">
            <h4 className="font-bold text-[#38bdf8] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span> Security Thread
            </h4>
            <p className="text-[#94a3b8] leading-relaxed text-[11px]">
              Color-shifting thread with text 'भारत' and 'RBI'. Color shifts from green to blue when tilted.
            </p>
          </div>

          <div className="p-4 bg-[#111827] border border-[#334155] rounded-xl space-y-2">
            <h4 className="font-bold text-[#38bdf8] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span> Latent Image
            </h4>
            <p className="text-[#94a3b8] leading-relaxed text-[11px]">
              A latent image containing the denominational numeral is visible on the bands when tilted at a 45-degree angle.
            </p>
          </div>

          <div className="p-4 bg-[#111827] border border-[#334155] rounded-xl space-y-2">
            <h4 className="font-bold text-[#38bdf8] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span> Intaglio Printing
            </h4>
            <p className="text-[#94a3b8] leading-relaxed text-[11px]">
              Raised printing (intaglio) felt on Mahatma Gandhi portrait, Ashoka pillar emblem, bleed lines, and identity mark.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-4">
          <div className="p-4 bg-[#111827] border border-[#334155] rounded-xl space-y-2">
            <h4 className="font-bold text-[#38bdf8] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span> See-through Register
            </h4>
            <p className="text-[#94a3b8] leading-relaxed text-[11px]">
              The numeral value printed in fraction style on front and back aligns perfectly to match when viewed against light.
            </p>
          </div>

          <div className="p-4 bg-[#111827] border border-[#334155] rounded-xl space-y-2 font-sans">
            <h4 className="font-bold text-[#38bdf8] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span> Color-shifting Ink
            </h4>
            <p className="text-[#94a3b8] leading-relaxed text-[11px] font-sans">
              The denomination numeral ₹ on the note shifts color green-to-blue depending on the physical light angle.
            </p>
          </div>

          <div className="p-4 bg-[#111827] border border-[#334155] rounded-xl space-y-2">
            <h4 className="font-bold text-[#38bdf8] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span> Micro Lettering
            </h4>
            <p className="text-[#94a3b8] leading-relaxed text-[11px]">
              Miniature words 'RBI' and 'INDIA' appear printed in tiny scale between portrait border margins under zoom lens.
            </p>
          </div>
        </div>
      </div>

      {/* Official Disclaimer Alert Banner */}
      <div className="p-4 bg-slate-900/60 border border-[#334155] rounded-xl text-[11px] text-[#94a3b8] text-left leading-relaxed font-mono flex items-start gap-2.5 z-10 relative">
        <ShieldAlert className="w-4.5 h-4.5 text-[#ef4444] shrink-0 mt-0.5" />
        <span>
          <strong>Disclaimer:</strong> This analysis is AI-assisted and intended for educational and awareness purposes only. It does not replace official verification by the Reserve Bank of India or law enforcement agencies.
        </span>
      </div>
    </div>
  );
};
