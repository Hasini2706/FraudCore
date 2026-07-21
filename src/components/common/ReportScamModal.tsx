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
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#22d3ee', '#10b981'],
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-card rounded-2xl border border-red-500/30 p-6 shadow-2xl bg-slate-900/95 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={resetForm}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Report Digital Arrest Incident
                </h3>
                <p className="text-xs text-slate-400">
                  Direct Integration with National Cyber Crime Reporting Portal (1930)
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Scam Category Detected
                </label>
                <div className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm font-semibold text-cyan-400 flex items-center justify-between">
                  <span>{scamCategory}</span>
                  <span className="text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30">
                    Threat: {threatScore}%
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Suspect Phone / WhatsApp Number / Skype ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210 or Inspector.CBI@skype"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Additional Fraud Details / Bank Account Demanded
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Demanded Rs 2.5 Lakhs transfer to fake RBI account via UPI..."
                  value={incidentDetails}
                  onChange={(e) => setIncidentDetails(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              {/* Instant Emergency Call Box */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span>Immediate Financial Loss? Call <strong>1930</strong> instantly.</span>
                </div>
                <a
                  href="tel:1930"
                  className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] transition"
                >
                  Dial 1930
                </a>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-red-600/20"
                >
                  <Send className="w-4 h-4" />
                  Submit Official Cyber Report
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">
                Incident Report Generated Successfully
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Your report has been logged with SentinelAI Cyber Defense & Law Enforcement Hub.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2">
              <div className="text-xs text-slate-400 uppercase tracking-wider">
                Official Incident Reference Number
              </div>
              <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="font-mono text-cyan-400 font-bold text-base">
                  {incidentId}
                </span>
                <button
                  onClick={copyIncidentId}
                  className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white text-xs flex items-center gap-1 transition"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Keep this ID handy for police follow-up or tracking on the National Cyber Crime Reporting Portal.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition"
              >
                Go to cybercrime.gov.in <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={resetForm}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
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
