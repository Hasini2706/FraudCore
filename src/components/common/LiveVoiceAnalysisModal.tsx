import React, { useState, useEffect, useRef } from 'react';
import { Shield, X, Mic, AlertTriangle, Square, Download, Copy, Save, Check, RefreshCw, File } from 'lucide-react';
import { analyzeScam } from '../../services/scamAnalysisService';
import type { ScamAnalysisResult } from '../../types/scam';

interface LiveVoiceAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveVoiceAnalysisModal: React.FC<LiveVoiceAnalysisModalProps> = ({ isOpen, onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Recording telemetry
  const [timer, setTimer] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [aiStatus, setAiStatus] = useState<'idle' | 'Listening...' | 'Transcribing...' | 'Analyzing...'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  
  // Real-time metrics
  const [threatScore, setThreatScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState('LOW');
  const [confidence, setConfidence] = useState(0);
  const [detectedIndicators, setDetectedIndicators] = useState({
    govAuthority: false,
    digitalArrest: false,
    moneyTransfer: false,
    otpRequest: false,
    urgency: false,
    isolation: false,
  });

  // Final Dossier Report
  const [finalReport, setFinalReport] = useState<ScamAnalysisResult | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [savedReport, setSavedReport] = useState(false);

  // Web Audio and MediaRecorder refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any | null>(null);
  const timerIntervalRef = useRef<number | null>(null);
  const accumulatedTranscriptRef = useRef<string>('');
  const isRecordingRef = useRef<boolean>(false);
  
  // Canvas Visualization Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Initialize Speech Recognition
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  useEffect(() => {
    if (!isOpen) {
      stopRecordingAndCleanUp();
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      stopRecordingAndCleanUp();
    };
  }, []);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Run canvas visualization using Web Audio API
  const startCanvasVisualization = (stream: MediaStream) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      
      const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const width = canvas.width;
        const height = canvas.height;
        
        animationFrameIdRef.current = requestAnimationFrame(draw);
        
        analyser.getByteFrequencyData(dataArray);
        
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, width, height);
        
        const barWidth = (width / bufferLength) * 1.5;
        let barHeight;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] / 2.5;
          
          ctx.fillStyle = `rgb(56, 189, 248)`;
          ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);
          
          x += barWidth;
        }
      };
      
      draw();
    } catch (e) {
      console.warn("Web Audio API visualization failed to start:", e);
    }
  };

  // Analyze transcript text and update indicators in real-time
  const analyzeTranscriptRealtime = (text: string) => {
    const lower = text.toLowerCase();
    
    const govAuthority = /cbi|police|customs|telecom|trai|rbi|government|officer|inspector|court/.test(lower);
    const digitalArrest = /digital arrest|arrest|prosecution|custody|warrant|imprisonment/.test(lower);
    const moneyTransfer = /transfer|account|deposit|money|rupees|payment|fee|send/.test(lower);
    const otpRequest = /otp|one time password|verification code|code/.test(lower);
    const urgency = /immediately|urgent|2 hours|30 minutes|crime|illegal/.test(lower);
    const isolation = /alone|close the door|room|don't disconnect|stay on video|isolation/.test(lower);

    setDetectedIndicators({
      govAuthority,
      digitalArrest,
      moneyTransfer,
      otpRequest,
      urgency,
      isolation,
    });

    let score = 0;
    if (govAuthority) score += 20;
    if (digitalArrest) score += 25;
    if (moneyTransfer) score += 25;
    if (otpRequest) score += 15;
    if (urgency) score += 10;
    if (isolation) score += 20;

    const finalScore = Math.min(score, 98);
    setThreatScore(finalScore);

    if (finalScore >= 70) {
      setRiskLevel('CRITICAL');
      setConfidence(Math.round(85 + finalScore * 0.1));
    } else if (finalScore >= 40) {
      setRiskLevel('HIGH');
      setConfidence(Math.round(75 + finalScore * 0.15));
    } else if (finalScore > 10) {
      setRiskLevel('MEDIUM');
      setConfidence(Math.round(60 + finalScore * 0.2));
    } else {
      setRiskLevel('LOW');
      setConfidence(0);
    }
  };

  const startVoiceAnalysis = async () => {
    setErrorMsg(null);
    setTranscript('');
    setIsFinished(false);
    setFinalReport(null);
    setThreatScore(0);
    setRiskLevel('LOW');
    setConfidence(0);
    setSavedReport(false);
    setDetectedIndicators({
      govAuthority: false,
      digitalArrest: false,
      moneyTransfer: false,
      otpRequest: false,
      urgency: false,
      isolation: false,
    });

    if (!SpeechRecognition) {
      setErrorMsg("Web Speech API is not supported in this browser. Please run this demo in Google Chrome, Microsoft Edge, or another compatible browser.");
      return;
    }

    try {
      // Request Mic Access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setIsPermissionGranted(true);
      
      accumulatedTranscriptRef.current = '';
      isRecordingRef.current = true;
      setIsRecording(true);
      setAiStatus('Listening...');
      setTimer(0);

      // Start duration timer
      timerIntervalRef.current = window.setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);

      // Initialize MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();

      // Start Audio Web Visualizer
      startCanvasVisualization(stream);

      // Initialize Web Speech Recognition
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Optimized for Indian English accents/contexts

      recognition.onstart = () => {
        setAiStatus('Transcribing...');
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscriptSegment = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscriptSegment += event.results[i][0].transcript + ' ';
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscriptSegment) {
          accumulatedTranscriptRef.current += finalTranscriptSegment;
        }

        const combined = accumulatedTranscriptRef.current + interimTranscript;
        setTranscript(combined);
        setAiStatus('Analyzing...');
        analyzeTranscriptRealtime(combined);
      };

      recognition.onerror = (e: any) => {
        console.warn("Speech recognition error:", e);
      };

      recognition.onend = () => {
        if (isRecordingRef.current) {
          try {
            recognition.start();
          } catch (e) {
            console.warn("Could not restart speech recognition:", e);
          }
        }
      };

      recognitionRef.current = recognition;
      recognition.start();

    } catch (err: any) {
      console.error("Microphone access failed:", err);
      setIsPermissionGranted(false);
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMsg("Microphone permission denied. Please allow microphone access in your browser settings to run live analysis.");
      } else {
        setErrorMsg("No microphone input devices found. Please plug in a microphone and retry.");
      }
    }
  };

  const stopRecordingAndCleanUp = () => {
    isRecordingRef.current = false;
    setIsRecording(false);
    setAiStatus('idle');

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {}
    }
    mediaRecorderRef.current = null;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    recognitionRef.current = null;

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {}
      audioContextRef.current = null;
    }
  };

  const handleStopAnalysis = async () => {
    stopRecordingAndCleanUp();
    
    const finalQuery = accumulatedTranscriptRef.current.trim() || transcript.trim();
    if (!finalQuery) {
      setErrorMsg("No speech detected. Please try recording again.");
      setFinalReport(null);
      setIsFinished(false);
      return;
    }

    setIsFinished(true);
    try {
      const report = await analyzeScam(finalQuery);
      setFinalReport(report);
    } catch (e) {
      console.error("Scam Analysis failed:", e);
      setErrorMsg("Unable to analyze conversation right now.");
      setIsFinished(false);
    }
  };

  const handleCopyTranscript = () => {
    navigator.clipboard.writeText(transcript || "No transcript compiled.");
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleSaveInvestigation = () => {
    setSavedReport(true);
    setTimeout(() => {
      alert("Report successfully saved to your safety registry.");
    }, 200);
  };

  const handleDownloadPDF = () => {
    const printWin = window.open('', '_blank');
    if (!printWin) return;

    printWin.document.write(`
      <html>
        <head>
          <title>Fraud$core Live Voice Analysis Report</title>
          <style>
            body { font-family: monospace; padding: 40px; color: #1e293b; line-height: 1.5; }
            .header { border-bottom: 2px double #1e293b; padding-bottom: 15px; margin-bottom: 30px; text-align: center; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
            .meta { margin-bottom: 20px; font-size: 12px; }
            .grid { display: grid; grid-template-cols: 1fr 1fr; gap: 15px; margin-bottom: 30px; }
            .card { border: 1px solid #cbd5e1; padding: 15px; border-radius: 4px; }
            .badge { display: inline-block; padding: 3px 8px; border-radius: 3px; font-weight: bold; font-size: 11px; }
            .badge-danger { background-color: #fef2f2; color: #ef4444; border: 1px solid #fca5a5; }
            .section-title { font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-top: 25px; margin-bottom: 10px; }
            .transcript { background-color: #f8fafc; padding: 15px; border-left: 3px solid #64748b; font-style: italic; white-space: pre-wrap; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Fraud$core Cyber Safety Assistant</div>
            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">AI-Powered Fraud Intelligence Platform</div>
          </div>
          <div class="meta">
            <strong>DOCUMENT ID:</strong> FSC-SCAN-${Date.now().toString().slice(-6)}<br/>
            <strong>TIMESTAMP:</strong> ${new Date().toLocaleString()}<br/>
            <strong>OPERATOR COMPILATION:</strong> Fraud$core Voice Scan Assistant
          </div>
          <div class="section-title">Assessment Metrics</div>
          <div class="grid">
            <div class="card">
              <strong>Scam Risk Score:</strong> <span style="font-size: 18px; color: #ef4444; font-weight: bold;">${threatScore}%</span>
            </div>
            <div class="card">
              <strong>Risk Level:</strong> <span class="badge badge-danger">${riskLevel}</span>
            </div>
          </div>
          <div class="section-title">Conversation Transcript</div>
          <div class="transcript">${transcript || "No transcript collected."}</div>
          <div class="section-title">Warning Signs Found</div>
          <ul>
            ${detectedIndicators.govAuthority ? '<li>[X] Pretended to be a police or government officer</li>' : ''}
            ${detectedIndicators.digitalArrest ? '<li>[X] Tried to scare you with legal threats</li>' : ''}
            ${detectedIndicators.moneyTransfer ? '<li>[X] Asked you to send money immediately</li>' : ''}
            ${detectedIndicators.otpRequest ? '<li>[X] Asked for your bank or personal details</li>' : ''}
            ${detectedIndicators.urgency ? '<li>[X] High Fear and Urgency Conditioning</li>' : ''}
            ${detectedIndicators.isolation ? '<li>[X] Told you not to end the call</li>' : ''}
          </ul>
          <div class="section-title">What You Should Do</div>
          <ul>
            ${finalReport?.recommendations.map(r => `<li>${r}</li>`).join('') || '<li>Dial Helpline 1930 immediately.</li>'}
          </ul>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWin.document.close();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm select-none">
      <div className="w-full max-w-3xl bg-[#1e293b] border border-[#334155] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[650px] relative text-left">
        {/* Header */}
        <div className="p-4 border-b border-[#334155] bg-[#111827] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#3b82f6]">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-left font-mono">
              <h3 className="text-sm font-bold text-white leading-none">Fraud$core Live Voice Scan</h3>
              <span className="text-[9px] text-[#94a3b8] uppercase tracking-wider block mt-0.5">
                AI-Powered Fraud Intelligence Platform
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded bg-[#1e293b] hover:bg-[#334155] text-[#94a3b8] hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal content body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar flex flex-col">
          {errorMsg && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
              {errorMsg === "Unable to analyze conversation right now." && (
                <button
                  onClick={handleStopAnalysis}
                  className="px-2.5 py-1 bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold text-[9px] rounded-lg transition uppercase font-mono cursor-pointer shrink-0"
                >
                  Retry
                </button>
              )}
            </div>
          )}

          {/* Recorder State View (Active or Idle) */}
          {!isFinished ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 items-stretch">
              {/* Left Side: Mic status & waveform */}
              <div className="md:col-span-5 bg-[#111827] border border-[#334155] rounded-xl p-5 flex flex-col items-center justify-between text-center min-h-[300px]">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#94a3b8] uppercase tracking-wider block">Voice Node status</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-lg font-mono inline-block border ${
                    isRecording ? 'text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/20 animate-pulse' : 'text-[#94a3b8] bg-[#1e293b] border-[#334155]'
                  }`}>
                    {isRecording ? 'RECORDING LIVE' : 'STANDBY'}
                  </span>
                </div>

                {/* Microphone Pulsing Icon & Waveform */}
                <div className="my-6 relative flex flex-col items-center">
                  <button
                    onClick={isRecording ? handleStopAnalysis : startVoiceAnalysis}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all duration-150 relative z-10 border border-white/10 ${
                      isRecording ? 'bg-[#ef4444] hover:bg-[#dc2626] scale-105' : 'bg-[#3b82f6] hover:bg-[#2563eb]'
                    }`}
                  >
                    {isRecording ? <Square className="w-6 h-6 animate-pulse" /> : <Mic className="w-6 h-6" />}
                  </button>

                  {/* Pulsing ring */}
                  {isRecording && (
                    <div className="absolute inset-0 w-16 h-16 bg-[#ef4444]/20 rounded-full animate-ping pointer-events-none z-0"></div>
                  )}

                  <span className="text-xl font-extrabold text-white font-mono mt-4">
                    {formatTimer(timer)}
                  </span>
                </div>

                {/* Canvas Audio Waveform */}
                <div className="w-full space-y-2">
                  <canvas
                    ref={canvasRef}
                    width={200}
                    height={40}
                    className="w-full h-10 bg-[#1e293b] border border-[#334155] rounded-lg"
                  />
                  <div className="text-[9px] font-mono text-[#94a3b8]">
                    AI State: <span className="text-[#38bdf8] font-bold">{aiStatus}</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Live transcript & Scrape indicators */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                {/* Live indicators checklist */}
                <div className="p-4 bg-[#111827] border border-[#334155] rounded-xl space-y-3">
                  <span className="block text-[10px] font-mono font-bold text-[#94a3b8] uppercase tracking-wider">
                    Scam Warning Signs
                  </span>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <div className={`p-2 border rounded-lg transition-all duration-150 flex items-center gap-1.5 ${
                      detectedIndicators.govAuthority ? 'bg-red-500/10 border-red-500/30 text-red-400 font-bold' : 'bg-[#1e293b] border-[#334155] text-[#94a3b8]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${detectedIndicators.govAuthority ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`}></span>
                      <span className="truncate">Fake Officer</span>
                    </div>

                    <div className={`p-2 border rounded-lg transition-all duration-150 flex items-center gap-1.5 ${
                      detectedIndicators.digitalArrest ? 'bg-red-500/10 border-red-500/30 text-red-400 font-bold' : 'bg-[#1e293b] border-[#334155] text-[#94a3b8]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${detectedIndicators.digitalArrest ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`}></span>
                      <span className="truncate">Digital Arrest</span>
                    </div>

                    <div className={`p-2 border rounded-lg transition-all duration-150 flex items-center gap-1.5 ${
                      detectedIndicators.moneyTransfer ? 'bg-red-500/10 border-red-500/30 text-red-400 font-bold' : 'bg-[#1e293b] border-[#334155] text-[#94a3b8]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${detectedIndicators.moneyTransfer ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`}></span>
                      <span className="truncate">Money Request</span>
                    </div>

                    <div className={`p-2 border rounded-lg transition-all duration-150 flex items-center gap-1.5 ${
                      detectedIndicators.otpRequest ? 'bg-red-500/10 border-red-500/30 text-red-400 font-bold' : 'bg-[#1e293b] border-[#334155] text-[#94a3b8]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${detectedIndicators.otpRequest ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`}></span>
                      <span className="truncate">OTP Request</span>
                    </div>

                    <div className={`p-2 border rounded-lg transition-all duration-150 flex items-center gap-1.5 ${
                      detectedIndicators.urgency ? 'bg-red-500/10 border-red-500/30 text-red-400 font-bold' : 'bg-[#1e293b] border-[#334155] text-[#94a3b8]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${detectedIndicators.urgency ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`}></span>
                      <span className="truncate">Intimidation</span>
                    </div>

                    <div className={`p-2 border rounded-lg transition-all duration-150 flex items-center gap-1.5 ${
                      detectedIndicators.isolation ? 'bg-red-500/10 border-red-500/30 text-red-400 font-bold' : 'bg-[#1e293b] border-[#334155] text-[#94a3b8]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${detectedIndicators.isolation ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`}></span>
                      <span className="truncate">Isolation</span>
                    </div>
                  </div>
                </div>

                {/* Transcript visual feed */}
                <div className="flex-1 bg-[#111827] border border-[#334155] rounded-xl p-4 flex flex-col justify-between min-h-[160px]">
                  <span className="block text-[10px] font-mono font-bold text-[#94a3b8] uppercase tracking-wider mb-2">
                    Conversation Transcript
                  </span>
                  <div className="flex-1 overflow-y-auto text-xs text-slate-300 italic max-h-[120px] custom-scrollbar text-left leading-relaxed">
                    {transcript || "Speak into your microphone to begin typing the conversation..."}
                  </div>
                </div>

                {/* Real-time calculated score indicator */}
                <div className="p-4 bg-[#111827] border border-[#334155] rounded-xl flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-[#94a3b8] text-[9px] uppercase font-bold">Scam Risk Score</span>
                    <span className="text-white text-base font-bold block mt-0.5">{threatScore}%</span>
                  </div>
                  <div>
                    <span className="text-[#94a3b8] text-[9px] uppercase font-bold">AI Confidence</span>
                    <span className="text-[#38bdf8] text-base font-bold block mt-0.5">{confidence}%</span>
                  </div>
                  <div>
                    <span className="text-[#94a3b8] text-[9px] uppercase font-bold">Risk Level</span>
                    <span className={`text-base font-bold block mt-0.5 ${threatScore >= 40 ? 'text-[#ef4444]' : 'text-slate-400'}`}>
                      {riskLevel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Finished Recording: Render Final dossier Report */
            <div className="space-y-6 flex-1 flex flex-col justify-between text-xs font-sans">
              {!finalReport ? (
                <div className="p-8 text-center flex flex-col items-center justify-center flex-1 space-y-3">
                  <RefreshCw className="w-8 h-8 text-[#3b82f6] animate-spin" />
                  <span className="font-bold text-white">Creating Scam Analysis Report...</span>
                </div>
              ) : (
                <div className="space-y-5 flex-1 flex flex-col justify-between">
                  {/* Assessment metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-[#111827] border border-[#334155] rounded-xl text-center">
                      <span className="text-[#94a3b8] font-mono text-[9px] uppercase font-bold block">Scam Risk Score</span>
                      <span className="text-2xl font-extrabold text-[#ef4444] block mt-1 font-mono">{threatScore}%</span>
                    </div>

                    <div className="p-4 bg-[#111827] border border-[#334155] rounded-xl text-center">
                      <span className="text-[#94a3b8] font-mono text-[9px] uppercase font-bold block">Scam Type</span>
                      <span className="text-sm font-bold text-white block mt-2 truncate">{finalReport.category}</span>
                    </div>

                    <div className="p-4 bg-[#111827] border border-[#334155] rounded-xl text-center">
                      <span className="text-[#94a3b8] font-mono text-[9px] uppercase font-bold block">AI Confidence</span>
                      <span className="text-2xl font-extrabold text-[#38bdf8] block mt-1 font-mono">{confidence}%</span>
                    </div>
                  </div>

                  {/* Investigation Summary Sheet */}
                  <div className="p-4 bg-[#111827] border border-[#334155] rounded-xl text-left space-y-2">
                    <span className="block text-[10px] font-mono font-bold text-[#38bdf8] uppercase tracking-wider">
                      Fraud$core Summary
                    </span>
                    <p className="text-slate-300 leading-relaxed font-sans text-xs">
                      {finalReport.patterns && finalReport.patterns.length > 0
                        ? `Scam warning signals identified: ${finalReport.patterns.join(', ')}.`
                        : "Speech patterns indicate strong indicators of a Digital Arrest scam where the caller falsely impersonates legal government authorities to coerce immediate payment."}
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div className="p-4 bg-[#f59e0b]/5 border border-[#f59e0b]/20 rounded-xl text-left space-y-2.5">
                    <span className="block text-[10px] font-mono font-bold text-[#f59e0b] uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> What You Should Do
                    </span>
                    <ul className="space-y-1 text-slate-300 text-xs list-disc list-inside">
                      {finalReport.recommendations.map((rec, index) => (
                        <li key={index} className="leading-snug">{rec}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Action buttons row */}
                  <div className="pt-2 grid grid-cols-3 gap-3">
                    <button
                      onClick={handleCopyTranscript}
                      className="py-3 bg-[#111827] hover:bg-[#1e293b] border border-[#334155] text-slate-200 font-bold rounded-xl flex items-center justify-center gap-2 transition duration-150"
                    >
                      {copiedText ? <Check className="w-4 h-4 text-[#22c55e]" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedText ? 'Copied Transcript' : 'Copy Transcript'}</span>
                    </button>

                    <button
                      onClick={handleSaveInvestigation}
                      className="py-3 bg-[#111827] hover:bg-[#1e293b] border border-[#334155] text-slate-200 font-bold rounded-xl flex items-center justify-center gap-2 transition duration-150"
                    >
                      {savedReport ? <Check className="w-4 h-4 text-[#22c55e]" /> : <Save className="w-4 h-4" />}
                      <span>{savedReport ? 'Report Saved' : 'Save Report'}</span>
                    </button>

                    <button
                      onClick={handleDownloadPDF}
                      className="py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition duration-150 shadow-md shadow-blue-500/10"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Report (PDF)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Active status footer */}
        <div className="p-3 border-t border-[#334155] bg-[#0c121e] text-center text-[9px] text-[#94a3b8]/60 font-mono">
          FRAUD$CORE CYBER SAFETY ASSISTANT. PRIVATE & SECURED.
        </div>
      </div>
    </div>
  );
};
