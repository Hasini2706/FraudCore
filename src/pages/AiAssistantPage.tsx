import React, { useState } from 'react';
import { Bot, Send, User, PhoneCall, Sparkles, AlertTriangle, RefreshCw, Mic, MicOff, Check, Copy } from 'lucide-react';
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
      text: `This resembles a Digital Arrest Scam.\n\nGovernment agencies never ask for money or account validation transfers over calls.\nDisconnect immediately and request an escrow block.`,
      timestamp: '11:40 AM',
      badge: 'HIGH RISK ALERT',
      threatDetected: true,
      suggestedActions: [
        'Disconnect Video Call Now',
        'Do Not Transfer Any Funds',
        'Call Helpline 1930',
        'Initiate Mule Account Lock'
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
    <div className="relative min-h-screen bg-[#0B1220] pb-20 pt-8 select-none text-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00BFA6]/5 border border-[#00BFA6]/20 text-[#00BFA6] text-xs font-semibold shadow-sm font-space">
            <Bot className="w-3.5 h-3.5 text-[#00BFA6]" />
            <span>SECURITY COPILOT PROTOCOL</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight font-manrope font-medium">
            AI Safety Copilot
          </h1>
          <p className="text-[#CBD5E1] text-xs sm:text-sm font-medium">
            Operational safety assistant trained on law enforcement guidelines, mock fake warrant parameters, and immediate deposit protection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Sidebar: Suggested Prompts & Helplines */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#1A2332] border border-white/5 rounded-xl p-5 space-y-4 shadow-md">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC] flex items-center gap-2 font-space">
                <Sparkles className="w-4 h-4 text-[#00BFA6]" />
                Suggested Prompts
              </h3>

              <div className="space-y-2">
                {sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="w-full text-left p-3 rounded-lg bg-[#111827] hover:bg-[#111827]/80 border border-white/5 hover:border-[#00BFA6]/30 text-xs text-[#CBD5E1] hover:text-[#F8FAFC] transition-all flex items-center justify-between group font-semibold"
                  >
                    <span className="pr-2">{q}</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#CBD5E1]/40 group-hover:text-[#00BFA6] shrink-0 transition" />
                  </button>
                ))}
              </div>
            </div>

            {/* Helpline Card */}
            <div className="bg-[#1A2332] border border-white/5 rounded-xl p-5 space-y-3 shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B]">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#F8FAFC]">Emergency Helpline</h4>
                  <p className="text-xs text-[#F59E0B] font-bold font-mono">Dial 1930 (24/7)</p>
                </div>
              </div>
              <p className="text-[11px] text-[#CBD5E1]/60 leading-relaxed">
                Report financial debit within the first 2 hours ("Golden Hours") to freeze recipient bank accounts before funds are withdrawn.
              </p>
              <a
                href="tel:1930"
                className="w-full py-2.5 rounded bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#0B1220] font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                Call 1930 Now
              </a>
            </div>
          </div>

          {/* Right Column: Chatbot Window */}
          <div className="lg:col-span-8">
            <div className="bg-[#1A2332] border border-white/5 rounded-xl shadow-md flex flex-col h-[520px] overflow-hidden">
              {/* Top Bar */}
              <div className="p-4 border-b border-white/5 bg-[#111827] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative p-2 rounded bg-[#00BFA6]/10 border border-[#00BFA6]/20 text-[#00BFA6]">
                    <Bot className="w-5 h-5" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#F8FAFC] flex items-center gap-1.5 font-space">
                      FraudCore Copilot
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 font-mono font-bold">
                        ONLINE
                      </span>
                    </h3>
                    <p className="text-[10px] text-[#CBD5E1]/60 font-mono">
                      Security Analysis Model v2.4
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
                    className="p-1.5 rounded-lg text-[#CBD5E1]/70 hover:text-[#F8FAFC] hover:bg-[#111827] text-xs flex items-center gap-1 transition"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline font-bold">Reset Chat</span>
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#111827]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="p-2 rounded bg-[#00BFA6]/10 border border-[#00BFA6]/20 text-[#00BFA6] shrink-0 mt-1">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded p-4 text-xs leading-relaxed space-y-2.5 relative group ${
                        msg.sender === 'user'
                          ? 'bg-[#1D4ED8] text-white font-medium rounded-tr-none shadow-md'
                          : 'bg-[#1A2332] border border-white/5 text-[#F8FAFC] rounded-tl-none shadow-md'
                      }`}
                    >
                      {msg.badge && (
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-red-950/40 text-[#EF4444] border border-red-900/40 text-[9px] font-bold tracking-wider font-mono uppercase">
                          <AlertTriangle className="w-3 h-3 text-[#EF4444]" />
                          {msg.badge}
                        </div>
                      )}

                      <div className="whitespace-pre-wrap">{msg.text}</div>

                      {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                        <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1">
                          {msg.suggestedActions.map((action, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-[#111827] border border-white/5 text-[9px] text-[#00BFA6] font-mono font-semibold"
                            >
                              ✓ {action}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[9px] pt-1 text-[#CBD5E1]/50 border-t border-white/5 font-medium">
                        <span>{msg.timestamp}</span>
                        <button
                          onClick={() => copyMessageText(msg.id, msg.text)}
                          className="hover:text-[#F8FAFC] transition-colors flex items-center gap-1"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5 text-[#CBD5E1]/60" />}
                        </button>
                      </div>
                    </div>

                    {msg.sender === 'user' && (
                      <div className="p-2 rounded bg-white/10 text-[#CBD5E1] shrink-0 mt-1">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-[#00BFA6]/10 border border-[#00BFA6]/20 text-[#00BFA6]">
                      <Bot className="w-4 h-4 animate-spin" />
                    </div>
                    <div className="px-4 py-2 rounded bg-[#1A2332] border border-white/5 text-xs text-[#CBD5E1] flex items-center gap-2 shadow-md font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00BFA6] animate-ping"></span>
                      <span>Copilot is reasoning...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="p-4 border-t border-white/5 bg-[#1A2332]">
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
                    className={`p-3 rounded border transition-all ${
                      isListening
                        ? 'bg-red-950/40 text-[#EF4444] border-red-900/40 animate-pulse'
                        : 'bg-[#111827] text-[#CBD5E1] hover:text-[#F8FAFC] border-white/5 hover:bg-[#111827]/80'
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
                    className="flex-1 px-4 py-3 rounded bg-white/5 border border-white/5 text-[#F8FAFC] placeholder-[#CBD5E1]/30 text-xs sm:text-sm focus:outline-none focus:border-[#00BFA6] transition-colors font-sans font-medium"
                  />

                  <button
                    type="submit"
                    disabled={!inputQuery.trim() || isTyping}
                    className="px-5 py-3 rounded bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-[#0B1220] font-bold text-xs flex items-center gap-2 transition disabled:opacity-50"
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
