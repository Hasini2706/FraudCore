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
    <div className="relative min-h-screen bg-cyber-radial bg-cyber-grid pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span className="font-space">SECURITY COPILOT CHATBOT PROTOCOL</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-manrope">
            AI Cyber Safety Copilot
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            Conversational AI assistant trained on law enforcement guidelines, fake warrant analysis, and emergency response procedures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar: Suggested Prompts & Helplines */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel rounded-2xl border border-white/10 p-5 space-y-4 bg-slate-900/90">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 font-space">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Suggested Prompts
              </h3>

              <div className="space-y-2">
                {sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="w-full text-left p-3 rounded-xl bg-[#030611] hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 hover:text-white transition flex items-center justify-between group"
                  >
                    <span className="pr-2">{q}</span>
                    <Sparkles className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 shrink-0 transition" />
                  </button>
                ))}
              </div>
            </div>

            {/* Helpline Card */}
            <div className="glass-panel rounded-2xl border border-amber-500/30 p-5 space-y-3 bg-amber-500/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Emergency Helpline</h4>
                  <p className="text-xs text-amber-300 font-bold font-mono">Dial 1930 (24/7)</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Report financial debit within the first 2 hours ("Golden Hours") to freeze recipient banking accounts immediately.
              </p>
              <a
                href="tel:1930"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                Call 1930 Now
              </a>
            </div>
          </div>

          {/* Right Column: Chatbot Window */}
          <div className="lg:col-span-8">
            <div className="glass-panel rounded-2xl border border-cyan-500/30 bg-slate-900/95 shadow-2xl flex flex-col h-[600px] overflow-hidden">
              {/* Top Bar */}
              <div className="p-4 border-b border-slate-800 bg-[#030611] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <Bot className="w-5 h-5" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2 font-manrope">
                      SentinelAI Copilot
                      <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                        ONLINE
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono">
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
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs flex items-center gap-1 transition"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset Chat</span>
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#030611]/50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0 mt-1">
                        <Bot className="w-5 h-5" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed space-y-3 relative group ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white font-semibold rounded-tr-none shadow-lg shadow-blue-600/10'
                          : 'bg-slate-900 border border-white/10 text-slate-200 rounded-tl-none shadow-md'
                      }`}
                    >
                      {msg.badge && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold tracking-wider font-mono">
                          <AlertTriangle className="w-3 h-3" />
                          {msg.badge}
                        </div>
                      )}

                      <div className="whitespace-pre-wrap">{msg.text}</div>

                      {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                        <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-1.5">
                          {msg.suggestedActions.map((action, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[10px] text-cyan-400 font-mono font-semibold"
                            >
                              ✓ {action}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[10px] pt-1 text-slate-400 border-t border-slate-800/40">
                        <span>{msg.timestamp}</span>
                        <button
                          onClick={() => copyMessageText(msg.id, msg.text)}
                          className="hover:text-white transition flex items-center gap-1"
                        >
                          {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>

                    {msg.sender === 'user' && (
                      <div className="p-2 rounded-xl bg-slate-800 text-slate-300 shrink-0 mt-1">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                      <Bot className="w-5 h-5 animate-spin" />
                    </div>
                    <div className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-white/10 text-xs text-slate-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                      <span>Copilot is reasoning...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="p-4 border-t border-slate-800 bg-[#030611]">
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
                    className={`p-3 rounded-xl border transition ${
                      isListening
                        ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse'
                        : 'bg-slate-900 text-slate-400 hover:text-white border-white/10'
                    }`}
                    title="Simulate Voice Input"
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Describe the suspicious call or message..."
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition font-sans"
                  />

                  <button
                    type="submit"
                    disabled={!inputQuery.trim() || isTyping}
                    className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 transition disabled:opacity-50"
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
    </div>
  );
};
