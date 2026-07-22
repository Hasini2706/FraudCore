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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-3xl bg-[#1e293b] border border-[#334155] rounded-xl p-6 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#334155]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#111827] border border-[#334155] text-[#38bdf8] rounded-xl">
              <Server className="w-5 h-5" />
            </div>
            <div className="text-left font-mono">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                FastAPI / OpenAI System Integration Specs
              </h3>
              <p className="text-[10px] text-[#94a3b8] mt-0.5">
                Decoupled secure REST architectural blueprints
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#111827] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 mt-4 font-mono text-xs">
          <button
            onClick={() => setActiveTab('fastapi')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              activeTab === 'fastapi'
                ? 'bg-[#3b82f6] text-white'
                : 'text-[#94a3b8] hover:text-white hover:bg-[#111827]'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Python FastAPI Code</span>
          </button>
          <button
            onClick={() => setActiveTab('openai')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              activeTab === 'openai'
                ? 'bg-[#3b82f6] text-white'
                : 'text-[#94a3b8] hover:text-white hover:bg-[#111827]'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>GPT Schema</span>
          </button>
          <button
            onClick={() => setActiveTab('curl')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              activeTab === 'curl'
                ? 'bg-[#3b82f6] text-white'
                : 'text-[#94a3b8] hover:text-white hover:bg-[#111827]'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>cURL Command</span>
          </button>
        </div>

        {/* Code Block Container */}
        <div className="relative mt-3 rounded-xl bg-[#111827] border border-[#334155] p-4 font-mono text-xs text-slate-300 max-h-[340px] overflow-y-auto custom-scrollbar text-left">
          <button
            onClick={() => copyCode(codeSnippets[activeTab], activeTab)}
            className="absolute top-3 right-3 p-1.5 rounded bg-[#1e293b] border border-[#334155] text-slate-300 hover:text-white hover:bg-[#1e293b] transition flex items-center gap-1 text-[10px]"
          >
            {copiedTab === activeTab ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                <span className="text-[#22c55e]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
          <pre className="whitespace-pre-wrap leading-relaxed pr-16 font-mono text-[11px] text-[#f8fafc]">
            {codeSnippets[activeTab]}
          </pre>
        </div>

        {/* Info footer */}
        <div className="mt-4 pt-3 border-t border-[#334155] flex items-center justify-between text-[11px] text-[#94a3b8] font-mono">
          <span className="flex items-center gap-1.5">
            <FileJson className="w-4 h-4 text-[#38bdf8]" />
            Parsed in <code className="text-white">scamAnalysisService.ts</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold rounded-lg transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
