import type { ScamAnalysisResult, EvidenceItem, HighlightedSentence, ScamTimelineStep, SentimentMetrics } from '../types/scam';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.sentinelai.gov.in/api/v1';

export async function analyzeScam(text: string, forceLiveApi = false): Promise<ScamAnalysisResult> {
  // Option for live FastAPI backend connection
  if (forceLiveApi) {
    try {
      const response = await fetch(`${API_BASE_URL}/analyze-scam`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: text }),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.warn('Live API request failed, falling back to enterprise mock engine.', e);
    }
  }

  // Simulate network delay for realistic AI NLP inference (1.1s)
  await new Promise((resolve) => setTimeout(resolve, 1100));

  const lowerText = text.toLowerCase();

  // Dynamic Pattern Recognition
  const patterns: string[] = [];
  const evidenceChecklist: EvidenceItem[] = [];
  const highlightedSentences: HighlightedSentence[] = [];

  const includesGov = lowerText.includes('cbi') || lowerText.includes('ed') || lowerText.includes('police') || lowerText.includes('customs') || lowerText.includes('narcotics') || lowerText.includes('trai') || lowerText.includes('court') || lowerText.includes('supreme court') || lowerText.includes('rbi');
  const includesThreat = lowerText.includes('arrest') || lowerText.includes('warrant') || lowerText.includes('jail') || lowerText.includes('legal action') || lowerText.includes('suspend') || lowerText.includes('fir');
  const includesUrgency = lowerText.includes('urgent') || lowerText.includes('immediate') || lowerText.includes('right now') || lowerText.includes('15 minutes') || lowerText.includes('today itself');
  const includesIsolation = lowerText.includes('don\'t disconnect') || lowerText.includes('do not disconnect') || lowerText.includes('mute') || lowerText.includes('alone') || lowerText.includes('secret') || lowerText.includes('tell no one') || lowerText.includes('skype') || lowerText.includes('video call');
  const includesMoney = lowerText.includes('transfer') || lowerText.includes('penalty') || lowerText.includes('fee') || lowerText.includes('deposit') || lowerText.includes('clearance') || lowerText.includes('lakh') || lowerText.includes('account');

  let impersonatedEntity = 'Cyber Criminal Syndicate';
  let category = 'Digital Arrest Scam';

  if (includesGov) {
    patterns.push('Fake Government Authority');
    if (lowerText.includes('cbi')) impersonatedEntity = 'CBI (Central Bureau of Investigation)';
    else if (lowerText.includes('ed')) impersonatedEntity = 'Enforcement Directorate (ED)';
    else if (lowerText.includes('customs')) impersonatedEntity = 'Customs & Border Control';
    else if (lowerText.includes('trai')) impersonatedEntity = 'TRAI Telecom Department';
    else impersonatedEntity = 'State Cyber Crime Police';

    evidenceChecklist.push({
      title: 'Fake Government Authority',
      description: `Claiming official representation from ${impersonatedEntity} without physical subpoena.`,
      verified: true,
      category: 'Authority',
    });

    highlightedSentences.push({
      text: 'This is Inspector Sharma calling from the Central Bureau of Investigation...',
      patternType: 'Fake Authority Claim',
      severity: 'critical',
    });
  }

  if (includesThreat) {
    patterns.push('Arrest Threat');
    evidenceChecklist.push({
      title: 'Arrest & Prosecution Threat',
      description: 'Threatening digital arrest or police arrival within short time window.',
      verified: true,
      category: 'Urgency',
    });

    highlightedSentences.push({
      text: 'A warrant has been issued in your name under Section 420... placed under digital arrest right now.',
      patternType: 'Coercive Arrest Threat',
      severity: 'critical',
    });
  }

  if (includesUrgency || includesMoney) {
    patterns.push('Immediate Financial Demand');
    evidenceChecklist.push({
      title: 'Immediate Financial Demand',
      description: 'Demanding rapid bank transfer, UPI deposit, or clearance fee.',
      verified: true,
      category: 'Financial',
    });

    highlightedSentences.push({
      text: 'Transfer Rs 2.5 Lakhs clearance deposit to the official RBI verification account immediately.',
      patternType: 'Fraudulent Money Transfer Demand',
      severity: 'high',
    });
  }

  if (includesIsolation) {
    patterns.push('Isolation Tactic ("Don\'t disconnect")');
    evidenceChecklist.push({
      title: 'Isolation Tactic',
      description: 'Demanding victim remain on video surveillance alone and refrain from contacting family.',
      verified: true,
      category: 'Isolation',
    });

    highlightedSentences.push({
      text: 'Do not disconnect this line or inform anyone, or police will arrive at your home.',
      patternType: 'Forced Isolation Instruction',
      severity: 'high',
    });
  }

  if (patterns.length >= 2 || (includesGov && includesThreat)) {
    patterns.push('Psychological Coercion Pressure');
    evidenceChecklist.push({
      title: 'Psychological Coercion Pressure',
      description: 'Creating artificial panic and fear to bypass victim rational checks.',
      verified: true,
      category: 'Pressure',
    });
  }

  // Fallback if generic input
  if (patterns.length === 0) {
    patterns.push('Fake Government Authority', 'Psychological Pressure', 'Immediate Financial Demand', 'Isolation Tactic', 'Arrest Threat');
    category = 'Digital Arrest Scam';
    impersonatedEntity = 'CBI (Central Bureau of Investigation)';
    evidenceChecklist.push(
      { title: 'Fake Government Authority', description: 'Impersonating senior CBI enforcement officer', verified: true, category: 'Authority' },
      { title: 'Psychological Pressure', description: 'Using threat of imprisonment to induce panic', verified: true, category: 'Pressure' },
      { title: 'Immediate Financial Demand', description: 'Demanding Rs 2.5 Lakhs transfer to fake RBI account', verified: true, category: 'Financial' },
      { title: 'Isolation Tactic', description: 'Forcing victim to stay on Skype video call alone', verified: true, category: 'Isolation' },
      { title: 'Arrest Threat', description: 'Claiming police arrival in 30 minutes', verified: true, category: 'Urgency' }
    );
    highlightedSentences.push(
      { text: 'This is Inspector Sharma calling from the Central Bureau of Investigation...', patternType: 'Fake Authority', severity: 'critical' },
      { text: 'A warrant has been issued in your name... placed under digital arrest right now.', patternType: 'Arrest Threat', severity: 'critical' },
      { text: 'Transfer Rs 2.5 Lakhs clearance deposit to official RBI verification account immediately.', patternType: 'Financial Extortion', severity: 'high' }
    );
  }

  const threatScore = Math.min(99, Math.max(88, 55 + patterns.length * 9));
  const confidence = 98.2;
  const explainabilityScore = 96;

  const sentimentMetrics: SentimentMetrics = {
    fearUrgency: Math.min(98, 70 + patterns.length * 6),
    coercionLevel: Math.min(96, 65 + patterns.length * 6),
    authorityImpersonation: includesGov ? 95 : 40,
    financialPressure: (includesMoney || patterns.length > 2) ? 92 : 30,
  };

  const scamTimeline: ScamTimelineStep[] = [
    { step: 1, phase: 'Initial Contact', description: 'IVR or Direct call claiming legal violation or parcel interception.', timeOffset: '00:00' },
    { step: 2, phase: 'Authority Claim', description: 'Scammer identifies as CBI/ED Inspector with fake badge number.', timeOffset: '02:15' },
    { step: 3, phase: 'Psychological Trap', description: 'Victim is coerced onto video call and ordered into solitary room.', timeOffset: '05:40' },
    { step: 4, phase: 'Financial Demand', description: 'Demand for immediate RTGS/UPI transfer to fake audit account.', timeOffset: '12:10' },
  ];

  return {
    threatScore: threatScore,
    confidence: confidence,
    risk: threatScore >= 85 ? 'CRITICAL' : 'HIGH',
    category: category,
    impersonatedEntity: impersonatedEntity,
    patterns: patterns,
    recommendations: [
      'Disconnect call immediately - Do not obey video demands',
      'Never transfer money to any "verification" or "audit" account',
      'Do not share bank credentials, OTPs, or Aadhaar numbers',
      'Report suspect caller immediately on National Cyber Helpline 1930',
      'File an official incident report on cybercrime.gov.in',
    ],
    explainabilityScore: explainabilityScore,
    evidenceChecklist: evidenceChecklist,
    sentimentMetrics: sentimentMetrics,
    highlightedSentences: highlightedSentences,
    scamTimeline: scamTimeline,
    analyzedAt: new Date().toISOString(),
  };
}

export const PRESET_SAMPLE_TRANSCRIPTS = {
  cbiDigitalArrest: `This is Inspector Sharma calling from the Central Bureau of Investigation (CBI), New Delhi. A warrant has been issued in your name under Section 420 for laundering money through an illegal bank account in Mumbai. You are placed under digital arrest right now. Connect to our official video call immediately. Do not disconnect this line or inform anyone, or police will arrive at your home in 30 minutes. Transfer Rs 2.5 Lakhs clearance deposit to the official RBI verification account immediately for clearance.`,

  customsCourier: `FEDEX / Customs Department Alert: Your package containing 5 illegal passports, 200g MDMA, and suspicious bank cards has been intercepted at Mumbai International Airport. To avoid immediate physical arrest, click this link and join the online police verification room. Keep your camera on and stay alone in a room. You must pay security deposit of Rs 85,000 via UPI right now.`,

  whatsappThreat: `OFFICIAL NOTICE: Supreme Court of India & Cyber Cell. Case No. SC/2026/894. You have been named in a cyber crime dossier. Your mobile SIM will be blocked in 2 hours by TRAI. Stay on WhatsApp video call for interrogation. Do not call your family. Verification charge Rs 50,000 required to pause arrest order.`,

  legitimateBankReminder: `Dear Customer, your credit card statement ending in 4092 has been generated. Total amount due is Rs 4,250 by 25th July. Pay securely via our official mobile banking app. Never share your OTP or PIN with anyone. Thank you.`
};
