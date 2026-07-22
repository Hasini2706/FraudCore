import React, { useState, useRef, useEffect } from 'react';
import { Shield, X, Minus, RefreshCw, Send, Bot, User, MessageSquare } from 'lucide-react';
import type { ChatMessage } from '../../types/scam';

export const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Greetings. I am the Fraud$core AI Safety Assistant. I can help evaluate suspicious communications, outline digital arrest fraud indicators, or provide direct reporting protocols (1930). How can I assist you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    'Are Skype video calls from Police real?',
    'What if they showed a Supreme Court arrest warrant?',
    'They asked me to stay alone in a closed room.',
    'Can CBI or ED freeze my bank account over a call?'
  ];

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

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
        aiResponseText = `🔴 CRITICAL WARNING: Police, CBI, and ED officers NEVER use Skype or WhatsApp video calls to interrogate suspects or place anyone under "Digital Arrest". Scammers use fake uniform badges, virtual backgrounds, and forged ID cards to terrorize victims. Disconnect immediately!`;
      } else if (lower.includes('warrant') || lower.includes('supreme court') || lower.includes('notice')) {
        aiResponseText = `⚠️ FAKE LEGAL NOTICE ALERT: Cyber fraudsters generate counterfeit Supreme Court legal notices and CBI warrants with forged stamps. Law enforcement serves physical notices through official postal channels or local police stations. Never send money to clear an online warrant!`;
      } else if (lower.includes('bank account') || lower.includes('freeze') || lower.includes('rbi')) {
        aiResponseText = `🚨 FINANCIAL FRAUD RED FLAG: RBI or Government authorities will NEVER demand that you transfer funds to a "verification account" to prevent account freezing. If your money was transferred, immediately notify your bank and call Cyber Fraud Helpline 1930.`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        badge: 'CYBER SECURITY ADVISORY',
        threatDetected: true
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: '1',
        sender: 'ai',
        text: 'Greetings. I am the Government Cyber Safety Assistant. I can help evaluate suspicious communications, outline digital arrest fraud indicators, or provide direct reporting protocols (1930). How can I assist you today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none flex flex-col items-end">
      {/* Floating Chatbot Modal */}
      {isOpen && (
        <div
          className={`w-[420px] bg-[#1e293b] border border-[#334155] rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-4 transition-all duration-300 transform origin-bottom-right ${
            isMinimized ? 'h-[50px] translate-y-[600px] opacity-80' : 'h-[600px] translate-y-0 opacity-100'
          }`}
          style={{ transition: 'height 0.3s ease, transform 0.3s ease, opacity 0.3s ease' }}
        >
          {/* Header */}
          <div className="p-4 border-b border-[#334155] bg-[#111827] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#3b82f6]">
                <Shield className="w-4.5 h-4.5" />
              </div>
              <div className="text-left font-mono">
                <h3 className="text-xs font-bold text-white leading-none">Fraud$core Assistant</h3>
                <span className="text-[8px] text-[#22c55e] font-bold uppercase tracking-wider block mt-0.5">Online Support</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleResetChat}
                title="Reset Chat"
                className="p-1 text-[#94a3b8] hover:text-white rounded hover:bg-[#1e293b] transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Restore' : 'Minimize'}
                className="p-1 text-[#94a3b8] hover:text-white rounded hover:bg-[#1e293b] transition"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-1 text-[#94a3b8] hover:text-white rounded hover:bg-[#1e293b] transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Messages Board */}
          {!isMinimized && (
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#111827]/40 custom-scrollbar flex flex-col">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="p-1.5 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#3b82f6] shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-xl p-3 text-xs leading-relaxed space-y-2 text-left relative shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#3b82f6] text-white rounded-tr-none'
                        : 'bg-[#1e293b] border border-[#334155] text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.badge && (
                      <span className="inline-block text-[8px] font-bold text-[#ef4444] bg-[#ef4444]/10 border border-[#ef4444]/20 px-1.5 py-0.2 rounded font-mono uppercase tracking-wider">
                        {msg.badge}
                      </span>
                    )}
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    <span className="text-[8px] text-[#94a3b8] font-mono block text-right border-t border-[#334155]/20 pt-1 mt-1">
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="p-1.5 rounded-lg bg-[#1e293b] border border-[#334155] text-[#94a3b8] shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#3b82f6]">
                    <Bot className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <div className="px-3.5 py-2 bg-[#1e293b] border border-[#334155] rounded-xl text-xs text-[#94a3b8] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse"></span>
                    <span>Safety Copilot is reasoning...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Suggested Prompts */}
          {!isMinimized && messages.length <= 2 && (
            <div className="p-3 border-t border-[#334155] bg-[#111827]/60 text-left space-y-1.5 shrink-0">
              <span className="block text-[9px] font-bold uppercase tracking-wider text-[#94a3b8] font-mono px-1">
                Suggested Questions
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="p-2 bg-[#111827] hover:bg-[#1e293b] border border-[#334155]/60 hover:border-[#475569] text-[10px] text-[#94a3b8] hover:text-white rounded-lg transition text-left leading-tight"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Text Input Panel */}
          {!isMinimized && (
            <div className="p-3 border-t border-[#334155] bg-[#111827]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask about digital warrants, call protocols..."
                  className="flex-1 px-3 py-2 bg-[#1e293b] border border-[#334155] rounded-xl text-white placeholder-[#94a3b8]/50 text-xs focus:outline-none focus:border-[#3b82f6] transition font-sans"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isTyping}
                  className="p-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-xl transition duration-150 disabled:opacity-50 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Floating Button (Circular, Blue, Shield Icon, Subtle Shadow) */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className="w-12 h-12 bg-[#3b82f6] hover:bg-[#2563eb] rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition-all duration-150 border border-[#334155]/20 focus:outline-none"
        title="Open Safety Chatbot"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
      </button>
    </div>
  );
};
