import React, { useState } from 'react';
import { X, ShieldAlert, PhoneCall, CheckCircle2, Copy, Send, ExternalLink, Upload, Download, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReportScamModalProps {
  isOpen: boolean;
  onClose: () => void;
  scamCategory?: string;
  threatScore?: number;
}

export const ReportScamModal: React.FC<ReportScamModalProps> = ({
  isOpen,
  onClose,
  scamCategory = 'Digital Arrest Scam',
  threatScore = 97,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [incidentDetails, setIncidentDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [incidentId, setIncidentId] = useState('');
  const [copied, setCopied] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attachedFile || !declarationAccepted) return;
    const randomId = 'NCR-2026-' + Math.floor(100000 + Math.random() * 900000);
    setIncidentId(randomId);
    setSubmitted(true);

    // Trigger success confetti effect
    try {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#38bdf8', '#22c55e'],
      });
    } catch {
      // fallback
    }
  };

  const copyIncidentId = () => {
    navigator.clipboard.writeText(incidentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Fraud$core - Scam Evidence Dossier</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #0f172a; line-height: 1.6; }
            .header { border-bottom: 2px solid #ef4444; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
            .logo { font-size: 24px; font-weight: bold; color: #ef4444; }
            .meta { background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; margin-bottom: 30px; font-size: 13px; }
            .section-title { font-size: 16px; font-weight: bold; color: #0f172a; margin-top: 30px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
            .content-box { background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; font-size: 14px; white-space: pre-wrap; }
            .footer { margin-top: 50px; font-size: 11px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Fraud$core Evidence Dossier</div>
            <div style="font-size: 11px; text-align: right; text-transform: uppercase; color: #64748b;">Generated on: ${new Date().toLocaleString()}</div>
          </div>
          <div class="meta">
            <strong>Dossier Reference ID:</strong> ${incidentId}<br/>
            <strong>Scam Type:</strong> ${scamCategory}<br/>
            <strong>AI Threat Risk Score:</strong> ${threatScore}%<br/>
            <strong>Suspect ID:</strong> ${phoneNumber}<br/>
            <strong>Attached File:</strong> ${attachedFile ? attachedFile.name : 'None'}
          </div>
          
          <div class="section-title">Coercion / Scam Incident Details</div>
          <div class="content-box">${incidentDetails || 'No details provided.'}</div>
          
          <div class="section-title">Declaration Status</div>
          <div class="content-box">Confirmed by User: The information provided in this document is accurate. The user understands that false reports can delay genuine investigations.</div>
          
          <div class="footer">
            Fraud$core AI-Powered Fraud Intelligence Platform. Prepared as evidence only. This document is not a direct police report. Under Section 182 of IPC, lodging false complaints is a punishable offense.
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const resetForm = () => {
    setSubmitted(false);
    setPhoneNumber('');
    setIncidentDetails('');
    setAttachedFile(null);
    setDeclarationAccepted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-lg bg-[#1e293b] border border-[#334155] rounded-xl p-6 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={resetForm}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#111827] transition"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 pb-3 border-b border-[#334155]">
              <div className="p-2 bg-[#111827] border border-[#334155] text-[#ef4444] rounded-xl">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="text-left font-mono">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Save Scam Evidence
                </h3>
                <p className="text-[10px] text-[#94a3b8] mt-0.5">
                  Evidence Report Generator
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-bold font-mono uppercase tracking-wider text-[#94a3b8] mb-1.5">
                  AI Scam Category Classifier
                </label>
                <div className="px-3.5 py-2.5 rounded-xl bg-[#111827] border border-[#334155] text-xs font-semibold text-[#38bdf8] flex items-center justify-between font-mono">
                  <span>{scamCategory}</span>
                  <span className="text-[9px] text-[#ef4444] bg-[#ef4444]/10 px-2 py-0.5 rounded border border-[#ef4444]/20 font-bold">
                    Threat: {threatScore}%
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold font-mono uppercase tracking-wider text-[#94a3b8] mb-1.5">
                  Suspect Identifiers (Phone, Skype ID, WhatsApp, Account)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +91 98765-XXXXX or inspector.cbi@skype"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#111827] border border-[#334155] rounded-xl text-white placeholder-[#94a3b8]/50 text-xs focus:outline-none focus:border-[#3b82f6] transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold font-mono uppercase tracking-wider text-[#94a3b8] mb-1.5">
                  Coercion details / Demanded monetary amounts
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Fraudster demanded Rs 1.5 Lakhs transfer to prevent arrest warrant..."
                  value={incidentDetails}
                  onChange={(e) => setIncidentDetails(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#111827] border border-[#334155] rounded-xl text-white placeholder-[#94a3b8]/50 text-xs focus:outline-none focus:border-[#3b82f6] transition resize-none leading-relaxed"
                />
              </div>

              {/* Supporting Evidence File Upload */}
              <div>
                <label className="block text-[10px] font-bold font-mono uppercase tracking-wider text-[#94a3b8] mb-1.5">
                  Supporting Evidence (Audio, Screenshot, Chat Export, PDF, Call Recording) *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="evidence-file-upload"
                    required
                    accept="audio/*,image/*,application/pdf,text/plain"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setAttachedFile(e.target.files[0]);
                      }
                    }}
                  />
                  <label
                    htmlFor="evidence-file-upload"
                    className="flex items-center justify-between px-3.5 py-2.5 bg-[#111827] border border-[#334155] hover:border-[#3b82f6] rounded-xl text-xs text-[#94a3b8] cursor-pointer transition"
                  >
                    <span className="truncate pr-4">
                      {attachedFile ? attachedFile.name : "Attach at least one supporting file..."}
                    </span>
                    <Upload className="w-4 h-4 text-[#38bdf8] shrink-0" />
                  </label>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[9px] text-[#94a3b8]/60 font-mono">Supported formats: MP3, WAV, PNG, JPG, PDF, TXT</span>
                  <button
                    type="button"
                    onClick={() => {
                      const dummy = new File(["mock binary content"], "scam_screenshot_evidence.png", { type: "image/png" });
                      setAttachedFile(dummy);
                    }}
                    className="text-[9px] text-[#38bdf8] hover:underline font-mono"
                  >
                    [Attach Demo Evidence]
                  </button>
                </div>
              </div>

              {/* Declaration Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="declaration-checkbox"
                  required
                  checked={declarationAccepted}
                  onChange={(e) => setDeclarationAccepted(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-[#334155] bg-[#111827] text-[#3b82f6] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="declaration-checkbox" className="text-[10px] text-slate-300 leading-snug cursor-pointer select-none">
                  I confirm that the details and attached evidence provided above are accurate and true. I understand that submitting false or misleading information can delay genuine investigations.
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-xl text-[#94a3b8] hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!attachedFile || !declarationAccepted}
                  className={`px-5 py-2.5 text-white font-bold rounded-xl flex items-center gap-1.5 transition shadow-lg ${
                    attachedFile && declarationAccepted
                      ? 'bg-[#ef4444] hover:bg-[#dc2626] shadow-red-500/10 cursor-pointer'
                      : 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50 shadow-none'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Generate Evidence Report</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Evidence Dossier Generated
              </h3>
              <p className="text-xs text-[#94a3b8] mt-1.5 leading-relaxed">
                Your evidence report has been generated successfully. You can download this document to submit it manually to official cyber safety authorities.
              </p>
            </div>

            <div className="p-4 bg-[#111827] border border-[#334155] rounded-xl text-left space-y-2 font-mono">
              <div className="text-[10px] text-[#94a3b8] uppercase font-bold tracking-wider">
                Dossier Reference ID
              </div>
              <div className="flex items-center justify-between bg-[#1e293b] p-2.5 rounded-lg border border-[#334155]">
                <span className="text-[#38bdf8] font-bold text-sm">
                  {incidentId}
                </span>
                <button
                  onClick={copyIncidentId}
                  className="px-2.5 py-1 bg-[#111827] text-slate-300 hover:text-white text-[10px] flex items-center gap-1 border border-[#334155] rounded-lg transition"
                >
                  {copied ? <CheckCircle2 className="w-3 h-3 text-[#22c55e]" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-[9px] text-[#94a3b8]/60 pt-1 leading-snug">
                This reference ID is unique to this generated evidence report on your device.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2 font-mono text-xs w-full">
              <button
                onClick={handleDownloadPDF}
                className="w-full py-2.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
              
              <div className="grid grid-cols-2 gap-2 w-full">
                <a
                  href="tel:1930"
                  className="py-2.5 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-bold rounded-xl flex items-center justify-center gap-1.5 transition text-center"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call 1930</span>
                </a>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 bg-[#111827] hover:bg-[#1e293b] border border-[#334155] text-slate-200 font-semibold rounded-xl flex items-center justify-center gap-1.5 transition text-center"
                >
                  <span>cybercrime.gov.in</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={resetForm}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-xl transition"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
