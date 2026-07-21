import React, { useState } from 'react';
import { X, Code2, Server, Copy, Check, Terminal, Cpu, FileJson } from 'lucide-react';

interface ApiIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiIntegrationModal: React.FC<ApiIntegrationModalProps> = ({ isOpen, onClose }) => {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'fastapi' | 'openai' | 'curl'>('fastapi');

  if (!isOpen) return null;

  const copyCode = (code: string, tabName: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTab(tabName);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const codeSnippets = {
    fastapi: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
import os

app = FastAPI(title="SentinelAI - Digital Arrest Detection Engine", version="1.0.0")

class TranscriptRequest(BaseModel):
    transcript: str

class AnalysisResponse(BaseModel):
    threatScore: int
    confidence: int
    risk: str
    category: str
    patterns: list[str]
    recommendations: list[str]

@app.post("/api/v1/analyze-scam", response_model=AnalysisResponse)
async def analyze_digital_arrest_scam(request: TranscriptRequest):
    if not request.transcript.strip():
        raise HTTPException(status_code=400, detail="Transcript text cannot be empty")
        
    # OpenAI GPT-4o Prompting for Scam Pattern Recognition
    system_prompt = """You are SentinelAI, an expert cyber fraud intelligence system.
    Analyze the provided input for Digital Arrest scam patterns (impersonation of CBI/ED/Police, 
    video call demands, threats of jail, isolation instructions, money transfers).
    Return JSON matching the schema strictly."""
    
    # Simulate / call OpenAI API
    # completion = openai.chat.completions.create(...)
    
    return {
        "threatScore": 97,
        "confidence": 97,
        "risk": "HIGH",
        "category": "Digital Arrest Scam",
        "patterns": [
            "Fake Government Authority",
            "Urgent Payment",
            "Psychological Pressure",
            "Isolation",
            "Arrest Threat"
        ],
        "recommendations": [
            "Disconnect immediately",
            "Never transfer money",
            "Call 1930",
            "Report to Cyber Crime Portal"
        ]
    }`,

    openai: `{
  "model": "gpt-4o",
  "temperature": 0.1,
  "response_format": { "type": "json_object" },
  "messages": [
    {
      "role": "system",
      "content": "You are a cyber safety AI analyzer. Evaluate transcript for Digital Arrest scam indicators and output JSON with threatScore (0-100), risk (LOW/MEDIUM/HIGH/CRITICAL), category, patterns array, and recommendations array."
    },
    {
      "role": "user",
      "content": "This is Inspector Sharma calling from CBI New Delhi. A warrant has been issued in your name under Section 420. Stay on video call..."
    }
  ]
}`,

    curl: `curl -X POST "https://api.sentinelai.gov.in/api/v1/analyze-scam" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "transcript": "Inspector Sharma from CBI calling... warrant issued... transfer 2.5 Lakhs clearance deposit immediately."
  }'`
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl glass-card rounded-2xl border border-cyan-500/30 p-6 shadow-2xl bg-slate-900/95 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                FastAPI / OpenAI Integration Architecture
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Hackathon Ready
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Frontend is decoupled and structured to connect to any backend API endpoint seamlessly.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => setActiveTab('fastapi')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition ${
              activeTab === 'fastapi'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Code2 className="w-4 h-4" />
            FastAPI Backend (Python)
          </button>
          <button
            onClick={() => setActiveTab('openai')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition ${
              activeTab === 'openai'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Cpu className="w-4 h-4" />
            OpenAI GPT-4o Schema
          </button>
          <button
            onClick={() => setActiveTab('curl')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition ${
              activeTab === 'curl'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            cURL Example
          </button>
        </div>

        {/* Code Block Container */}
        <div className="relative mt-3 rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 max-h-[380px] overflow-y-auto">
          <button
            onClick={() => copyCode(codeSnippets[activeTab], activeTab)}
            className="absolute top-3 right-3 p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition flex items-center gap-1.5 text-[11px]"
          >
            {copiedTab === activeTab ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-sans">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="font-sans">Copy Snippet</span>
              </>
            )}
          </button>
          <pre className="whitespace-pre-wrap leading-relaxed pr-24">
            {codeSnippets[activeTab]}
          </pre>
        </div>

        {/* Info footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <FileJson className="w-4 h-4 text-cyan-400" />
            Configured in <code className="text-cyan-300">src/services/scamAnalysisService.ts</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
