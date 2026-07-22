import React, { useState } from 'react';
import { Bot, Send, User, ShieldAlert, PhoneCall, Sparkles, AlertTriangle, RefreshCw, Mic, MicOff, Check, Copy } from 'lucide-react';
import type { ChatMessage } from '../types/scam';

export const AiAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'user',
      text: 'Someone claiming to be CBI called me.',
      timestamp: '11:40 AM',
    },
    {
      id: '2',
      sender: 'ai',
      text: `This resembles a Digital Arrest Scam.\n\nGovernment agencies never ask for money over calls.\nDisconnect immediately and report the number.`,
      timestamp: '11:40 AM',
      badge: 'HIGH RISK ALERT',
      threatDetected: true,
      suggestedActions: [
        'Disconnect Video Call Now',
        'Do Not Transfer Any Funds',
        'Call Helpline 1930',
        'Report on cybercrime.gov.in'
      ]
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sampleQuestions = [
    'Are Skype video calls from Police real?',
    'What if they showed a Supreme Court arrest warrant with official seal?',
    'They asked me to stay alone in a closed room and keep camera on.',
    'Can CBI or ED freeze my bank account over a phone call?',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Simulate AI Copilot inference
    setTimeout(() => {
      let aiResponseText = `This is a classic signature of a Digital Arrest Scam.\n\nKey Safety Facts:\n1. CBI, Enforcement Directorate (ED), and State Police NEVER perform video interrogations or arrests via Skype/WhatsApp.\n2. No legal warrant requires transferring money into a "clearance account".\n\nAction: Disconnect call immediately and dial Helpline 1930.`;

      const lower = text.toLowerCase();
      if (lower.includes('skype') || lower.includes('video call') || lower.includes('camera')) {
        aiResponseText = `🔴 CRITICAL WARNING: Police, CBI, and ED officers NEVER use Skype or WhatsApp video calls to interrogate suspects or place anyone under "Digital Arrest".\n\nScammers use fake uniform badges, virtual backgrounds, and forged ID cards to terrorize victims into staying on camera alone in a room. Disconnect immediately!`;
      } else if (lower.includes('warrant') || lower.includes('supreme court') || lower.includes('notice')) {
        aiResponseText = `⚠️ FAKE LEGAL NOTICE ALERT: Cyber fraudsters generate counterfeit Supreme Court legal notices and CBI warrants with forged stamps using graphic software.\n\nLaw enforcement serves physical notices through official postal channels or local police stations. Never send money to clear an online warrant!`;
      } else if (lower.includes('bank account') || lower.includes('freeze') || lower.includes('rbi')) {
        aiResponseText = `🚨 FINANCIAL FRAUD RED FLAG: RBI or Government authorities will NEVER demand that you transfer funds to a "verification account" to prevent account freezing.\n\nIf your money was transferred, immediately notify your bank and call Cyber Fraud Helpline 1930.`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        badge: 'CYBER SECURITY ADVISORY',
        threatDetected: true,
        suggestedActions: [
          'Disconnect Call',
          'Call Helpline 1930',
          'Block Caller'
        ]
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setInputQuery('Someone claiming to be from Supreme Court told me to stay in room...');
    }
  };

  const copyMessageText = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#334155] pb-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#f8fafc]">AI Cyber Safety Assistant</h2>
          <p className="text-xs text-[#94a3b8] mt-0.5">
            Interact with the secure AI Copilot trained on legal codes, public alerts, and emergency response procedures
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar: Suggested Prompts & Helplines */}
        <div className="lg:col-span-4 space-y-6">
          <div className="gov-card p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#f8fafc] flex items-center gap-2 font-mono">
              <Sparkles className="w-4 h-4 text-[#38bdf8]" />
              Suggested Questions
            </h3>

            <div className="space-y-2.5">
              {sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="w-full text-left p-3.5 bg-[#111827] hover:bg-[#1e293b] border border-[#334155]/60 hover:border-[#475569] rounded-xl text-xs text-[#94a3b8] hover:text-white transition flex items-center justify-between group"
                >
                  <span className="pr-3 leading-snug">{q}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#475569] group-hover:text-[#38bdf8] shrink-0 transition" />
                </button>
              ))}
            </div>
          </div>

          {/* Helpline Card */}
          <div className="p-5 bg-[#f59e0b]/5 border border-[#f59e0b]/20 rounded-xl space-y-3.5 text-left">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">National Cyber Helpline</h4>
                <p className="text-xs text-[#f59e0b] font-bold font-mono mt-0.5">Call 1930 (24/7)</p>
              </div>
            </div>
            <p className="text-[11px] text-[#94a3b8] leading-relaxed">
              If fraudulent money transfer occurred, call 1930 immediately. Rapid intervention within the "Golden Hours" enables banks to freeze suspect accounts.
            </p>
            <a
              href="tel:1930"
              className="w-full py-2.5 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-bold text-xs flex items-center justify-center gap-2 rounded-xl transition font-mono uppercase tracking-wider"
            >
              Dial 1930 Helpline
            </a>
          </div>
        </div>

        {/* Right Column: Chatbot Window */}
        <div className="lg:col-span-8">
          <div className="gov-card flex flex-col h-[560px] overflow-hidden">
            {/* Top Bar */}
            <div className="p-4 border-b border-[#334155] bg-[#111827] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative p-2 rounded-xl bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#3b82f6]">
                  <Bot className="w-5 h-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#22c55e]"></span>
                </div>
                <div className="text-left font-mono">
                  <h3 className="text-xs font-bold text-white flex items-center gap-2">
                    SentinelAI Assistant
                    <span className="text-[8px] px-1.5 py-0.2 rounded-lg bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/20">
                      SECURE MODEL
                    </span>
                  </h3>
                  <p className="text-[9px] text-[#94a3b8] mt-0.5">
                    Law Enforcement NLP Model v2.4
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setMessages([
                      {
                        id: '1',
                        sender: 'user',
                        text: 'Someone claiming to be CBI called me.',
                        timestamp: '11:40 AM',
                      },
                      {
                        id: '2',
                        sender: 'ai',
                        text: `This resembles a Digital Arrest Scam.\n\nGovernment agencies never ask for money over calls.\nDisconnect immediately and report the number.`,
                        timestamp: '11:40 AM',
                        badge: 'HIGH RISK ALERT',
                        threatDetected: true,
                      },
                    ])
                  }
                  className="px-2.5 py-1.5 rounded-lg bg-[#1e293b] border border-[#334155] text-slate-300 hover:text-white text-[10px] flex items-center gap-1 transition font-mono"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Conversation</span>
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-[#111827]/40 custom-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'ai' && (
                    <div className="p-2 rounded-xl bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#3b82f6] shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed space-y-3 relative text-left shadow ${
                      msg.sender === 'user'
                        ? 'bg-[#3b82f6] text-white rounded-tr-none'
                        : 'bg-[#1e293b] border border-[#334155] text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.badge && (
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20 text-[9px] font-bold tracking-wide font-mono">
                        <AlertTriangle className="w-3 h-3" />
                        {msg.badge}
                      </div>
                    )}

                    <div className="whitespace-pre-wrap">{msg.text}</div>

                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="pt-2 border-t border-[#334155] flex flex-wrap gap-1.5">
                        {msg.suggestedActions.map((action, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.8 rounded-lg bg-[#111827] border border-[#334155] text-[9px] text-[#38bdf8] font-mono font-semibold"
                          >
                            ✓ {action}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[9px] pt-1 text-[#94a3b8] border-t border-[#334155]/40 font-mono">
                      <span>{msg.timestamp}</span>
                      <button
                        onClick={() => copyMessageText(msg.id, msg.text)}
                        className="hover:text-white transition flex items-center gap-1"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-[#22c55e]" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="p-2 rounded-xl bg-[#1e293b] border border-[#334155] text-[#94a3b8] shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#3b82f6]">
                    <Bot className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="px-4 py-2.5 rounded-xl bg-[#1e293b] border border-[#334155] text-xs text-[#94a3b8] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse"></span>
                    <span>AI Copilot is indexing advisory codes...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <div className="p-4 border-t border-[#334155] bg-[#111827]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  className={`p-3 rounded-xl border transition shrink-0 ${
                    isListening
                      ? 'bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/40 animate-pulse'
                      : 'bg-[#1e293b] text-[#94a3b8] hover:text-white border-[#334155]'
                  }`}
                  title="Simulate Voice Input"
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask a question or describe a suspicious video call..."
                  className="flex-1 px-4 py-3 bg-[#1e293b] border border-[#334155] rounded-xl text-white placeholder-[#94a3b8]/55 text-xs focus:outline-none focus:border-[#3b82f6] transition font-sans"
                />

                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isTyping}
                  className="px-5 py-3 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold text-xs flex items-center gap-2 transition duration-150 disabled:opacity-50 shrink-0"
                >
                  <span>Send</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
