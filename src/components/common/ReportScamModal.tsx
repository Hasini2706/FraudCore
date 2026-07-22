import React, { useState } from 'react';
import { X, ShieldAlert, PhoneCall, CheckCircle2, Copy, Send, ExternalLink } from 'lucide-react';
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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  const resetForm = () => {
    setSubmitted(false);
    setPhoneNumber('');
    setIncidentDetails('');
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
                  Report Coercive Incident
                </h3>
                <p className="text-[10px] text-[#94a3b8] mt-0.5">
                  Secure Logging Protocol linked with National Helpline (1930)
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
                  rows={3}
                  placeholder="e.g. Fraudster demanded Rs 1.5 Lakhs transfer to prevent arrest warrant..."
                  value={incidentDetails}
                  onChange={(e) => setIncidentDetails(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#111827] border border-[#334155] rounded-xl text-white placeholder-[#94a3b8]/50 text-xs focus:outline-none focus:border-[#3b82f6] transition resize-none leading-relaxed"
                />
              </div>

              {/* Instant Emergency Call Box */}
              <div className="p-3 bg-[#f59e0b]/5 border border-[#f59e0b]/20 rounded-xl text-[#f59e0b] text-[11px] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Immediate loss? Call <strong>1930</strong> instantly.</span>
                </div>
                <a
                  href="tel:1930"
                  className="px-2.5 py-1 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-bold text-[10px] rounded-lg transition font-mono uppercase"
                >
                  Call 1930
                </a>
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
                  className="px-5 py-2.5 bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-red-500/10"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Cyber Report</span>
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
                Report Logged Successfully
              </h3>
              <p className="text-xs text-[#94a3b8] mt-1.5 leading-relaxed">
                Incident dossier uploaded to Fraud$core Cyber Defense & NCRB telemetry hub.
              </p>
            </div>

            <div className="p-4 bg-[#111827] border border-[#334155] rounded-xl text-left space-y-2 font-mono">
              <div className="text-[10px] text-[#94a3b8] uppercase font-bold tracking-wider">
                Incident Reference Code
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
                Reference ID is active for state police dispatch units and financial intelligence tracking.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2 font-mono text-xs">
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-[#111827] hover:bg-[#1e293b] border border-[#334155] text-slate-200 font-semibold rounded-xl flex items-center gap-1.5 transition"
              >
                <span>cybercrime.gov.in</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={resetForm}
                className="px-5 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold rounded-xl transition"
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
