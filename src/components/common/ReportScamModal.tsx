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
        colors: ['#00BFA6', '#1D4ED8', '#22C55E'],
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1220]/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#1A2332] border border-white/5 rounded-xl p-6 shadow-lg overflow-hidden select-none text-[#F8FAFC]">
        {/* Close Button */}
        <button
          onClick={resetForm}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#CBD5E1]/60 hover:text-[#F8FAFC] hover:bg-[#111827] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 pb-4 border-b border-white/5">
              <div className="p-2.5 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444]">
                <ShieldAlert className="w-5 h-5 animate-pulse-slow" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F8FAFC]">
                  Log Incident File
                </h3>
                <p className="text-xs text-[#CBD5E1]/60 font-medium">
                  Submit transaction threat data directly to FraudCore Response Hub
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#CBD5E1]/60 mb-1">
                  Threat Category Detected
                </label>
                <div className="px-3 py-2 rounded bg-[#111827] border border-white/5 text-xs font-semibold text-[#00BFA6] flex items-center justify-between">
                  <span>{scamCategory}</span>
                  <span className="text-[10px] text-[#EF4444] bg-[#EF4444]/10 px-2 py-0.5 rounded border border-[#EF4444]/20 font-mono font-bold">
                    Score: {threatScore}%
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#CBD5E1]/60 mb-1">
                  Suspect Identifiers (Phone / Card / UPI ID)
                </label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210 or merchant@upi"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2.5 rounded bg-[#111827] border border-white/5 text-[#F8FAFC] placeholder-[#CBD5E1]/25 text-xs focus:outline-none focus:border-[#00BFA6] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#CBD5E1]/60 mb-1">
                  Incident Ledger Details
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Coerced transfer to fake validation account..."
                  value={incidentDetails}
                  onChange={(e) => setIncidentDetails(e.target.value)}
                  className="w-full px-3 py-2.5 rounded bg-[#111827] border border-white/5 text-[#F8FAFC] placeholder-[#CBD5E1]/25 text-xs focus:outline-none focus:border-[#00BFA6] transition-colors"
                />
              </div>

              {/* Emergency Warning */}
              <div className="p-3 rounded bg-[#F59E0B]/5 border border-[#F59E0B]/20 text-[#F59E0B] text-xs flex items-center justify-between font-medium">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-[#F59E0B]" />
                  <span>Financial transaction active? Dial <strong>1930</strong>.</span>
                </div>
                <a
                  href="tel:1930"
                  className="px-2.5 py-1 rounded bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#0B1220] font-bold text-[10px] transition-colors"
                >
                  Dial 1930
                </a>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded text-xs font-bold text-[#CBD5E1] hover:text-[#F8FAFC] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded bg-[#EF4444] hover:bg-[#EF4444]/90 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md border border-[#EF4444]"
                >
                  <Send className="w-3.5 h-3.5" />
                  Log Incident
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 font-bold" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#F8FAFC]">
                Incident Files Updated
              </h3>
              <p className="text-xs text-[#CBD5E1]/60 mt-1 font-medium">
                Your report has been logged with FraudCore Cyber Defense Hub.
              </p>
            </div>

            <div className="p-4 rounded bg-[#111827] border border-white/5 text-left space-y-2">
              <div className="text-[10px] text-[#CBD5E1]/50 uppercase font-bold tracking-wider">
                Official Incident Reference ID
              </div>
              <div className="flex items-center justify-between bg-[#1A2332] p-2.5 rounded border border-white/5">
                <span className="font-mono text-[#00BFA6] font-bold text-sm">
                  {incidentId}
                </span>
                <button
                  onClick={copyIncidentId}
                  className="px-2.5 py-1 rounded bg-[#111827] hover:bg-[#1A2332] border border-white/5 text-[#F8FAFC] text-[10px] font-bold flex items-center gap-1 transition-all"
                >
                  {copied ? <CheckCircle2 className="w-3 h-3 text-[#22C55E]" /> : <Copy className="w-3 h-3 text-[#CBD5E1]/60" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-[10px] text-[#CBD5E1]/50 leading-normal">
                NPCI Reference ID for tracking status.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded bg-[#111827] border border-white/5 hover:bg-[#1A2332] text-xs font-bold text-[#CBD5E1] flex items-center gap-1.5 transition-colors"
              >
                Go to cybercrime.gov.in <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={resetForm}
                className="px-4 py-2 rounded bg-[#00BFA6] text-[#0B1220] font-bold text-xs transition-colors"
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
