import { GoogleGenAI } from '@google/genai';
import type { ScamAnalysisResult, EvidenceItem, HighlightedSentence, ScamTimelineStep, SentimentMetrics } from '../types/scam';

export async function analyzeTranscriptWithGemini(text: string): Promise<ScamAnalysisResult> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY' || apiKey.trim() === '') {
    throw new Error("Gemini API key is not configured. Please define VITE_GEMINI_API_KEY in your env config.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemPrompt = `You are Fraud$core AI, an expert cybercrime intelligence analyst specializing in Indian digital frauds, cybercrime, phishing, financial scams, fake police scams, fake government impersonation, banking fraud, digital arrest scams, UPI scams, OTP fraud, Aadhaar scams, PAN scams, investment scams, courier scams, SIM swap fraud, remote access scams, WhatsApp fraud, and social engineering attacks.

Analyze conversations using semantic understanding.
Do NOT rely only on keywords.
Understand intent, psychological manipulation, impersonation, urgency, financial pressure, isolation tactics, identity theft attempts, and scam behaviour.
Be conservative.
Do not classify normal conversations as scams.

Return ONLY valid JSON matching the following schema:
{
  "threatScore": number (0-100),
  "riskLevel": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "scamCategory": string,
  "confidence": number (0-100),
  "summary": string,
  "reasoning": string[],
  "detectedPatterns": string[],
  "psychologicalTechniques": string[],
  "recommendedActions": string[],
  "keywordsDetected": string[],
  "safeConversation": boolean
}`;

  const prompt = `Analyze the following conversation.
Return ONLY valid JSON matching the requested schema.

Conversation:
"${text}"`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json"
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response received from Gemini API.");
    }
    const parsed = JSON.parse(responseText);

    const hasMatches = !parsed.safeConversation;
    const mappedPatterns = parsed.detectedPatterns || [];
    const recommendedActions = parsed.recommendedActions || [
      'Disconnect call immediately - Do not follow instructions',
      'Report suspect details on Cyber Helpline 1930',
      'File an official incident report on cybercrime.gov.in'
    ];

    const evidenceChecklist: EvidenceItem[] = (parsed.reasoning || []).map((reason: string, idx: number) => ({
      title: parsed.detectedPatterns?.[idx] || 'Suspicious Vector',
      description: reason,
      verified: true,
      category: reason.toLowerCase().includes('authority') ? 'Authority' :
        reason.toLowerCase().includes('money') || reason.toLowerCase().includes('pay') ? 'Financial' :
          reason.toLowerCase().includes('isolate') ? 'Isolation' : 'Pressure'
    }));

    // Build highlighted sentences dynamically
    const highlightedSentences: HighlightedSentence[] = [];
    const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
    sentences.forEach((sentence) => {
      const matchedKeyword = (parsed.keywordsDetected || []).find((kw: string) =>
        sentence.toLowerCase().includes(kw.toLowerCase())
      );
      if (matchedKeyword) {
        highlightedSentences.push({
          text: sentence,
          patternType: `Flagged Phrase (${matchedKeyword})`,
          severity: parsed.threatScore >= 75 ? 'critical' : parsed.threatScore >= 45 ? 'high' : 'medium'
        });
      }
    });

    const scamTimeline: ScamTimelineStep[] = hasMatches ? [
      { step: 1, phase: 'Initial Contact', description: 'Deceptive context initiated.', timeOffset: '00:00' },
      { step: 2, phase: 'Coercive Vectors', description: `Flagged behaviors: ${mappedPatterns.slice(0, 3).join(', ')}.`, timeOffset: '01:15' },
      { step: 3, phase: 'Manipulation Tactics', description: `Identified psychological traps: ${(parsed.psychologicalTechniques || []).slice(0, 2).join(', ') || 'N/A'}.`, timeOffset: '02:40' }
    ] : [];

    const sentimentMetrics: SentimentMetrics = {
      fearUrgency: hasMatches ? Math.min(98, 30 + mappedPatterns.length * 12) : 5,
      coercionLevel: hasMatches ? Math.min(96, 25 + mappedPatterns.length * 15) : 5,
      authorityImpersonation: (text.toLowerCase().includes('police') || text.toLowerCase().includes('cbi') || text.toLowerCase().includes('ed') || text.toLowerCase().includes('court')) ? 95 : 30,
      financialPressure: (text.toLowerCase().includes('money') || text.toLowerCase().includes('pay') || text.toLowerCase().includes('transfer') || text.toLowerCase().includes('deposit')) ? 92 : 20,
    };

    return {
      threatScore: parsed.threatScore || (hasMatches ? 65 : 8),
      confidence: parsed.confidence || 0,
      risk: parsed.riskLevel || 'LOW',
      category: parsed.scamCategory || 'Safe Communication',
      impersonatedEntity: hasMatches ? (parsed.scamCategory?.includes('CBI') ? 'CBI Officer' : 'Suspicious Caller') : 'None Detected',
      patterns: mappedPatterns,
      recommendations: recommendedActions,
      explainabilityScore: hasMatches ? 96 : 0,
      evidenceChecklist,
      sentimentMetrics,
      highlightedSentences,
      scamTimeline,
      analyzedAt: new Date().toISOString(),
    };
  } catch (err: any) {
    console.error("Gemini API Error details:", err);

    let userFriendlyMessage = err.message || "Unknown API Error";
    try {
      const errorObj = JSON.parse(err.message);
      if (errorObj.error && errorObj.error.message) {
        userFriendlyMessage = errorObj.error.message;
      }
    } catch (e) {
      // Plain text error message
    }

    throw new Error(userFriendlyMessage);
  }
}
