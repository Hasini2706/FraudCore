export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface EvidenceItem {
  title: string;
  description: string;
  verified: boolean;
  category: 'Authority' | 'Pressure' | 'Financial' | 'Isolation' | 'Urgency';
}

export interface HighlightedSentence {
  text: string;
  patternType: string;
  severity: 'critical' | 'high' | 'medium';
}

export interface ScamTimelineStep {
  step: number;
  phase: string;
  description: string;
  timeOffset: string;
}

export interface SentimentMetrics {
  fearUrgency: number; // 0-100
  coercionLevel: number; // 0-100
  authorityImpersonation: number; // 0-100
  financialPressure: number; // 0-100
}

export interface ScamAnalysisResult {
  threatScore: number; // 0 - 100
  confidence: number; // 0 - 100
  risk: RiskLevel;
  category: string;
  subCategory?: string;
  impersonatedEntity?: string;
  patterns: string[];
  recommendations: string[];
  analyzedAt?: string;
  
  // Explainable AI & Intelligence additions
  explainabilityScore: number;
  evidenceChecklist: EvidenceItem[];
  sentimentMetrics: SentimentMetrics;
  highlightedSentences: HighlightedSentence[];
  scamTimeline: ScamTimelineStep[];
  psychologicalTriggers?: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  badge?: string;
  threatDetected?: boolean;
  suggestedActions?: string[];
}

export interface AlertIncident {
  id: string;
  time: string;
  category: string;
  impersonatedOrg: string;
  threatScore: number;
  confidence: number;
  status: 'Flagged' | 'Under Investigation' | 'Blocked' | 'Resolved';
  location: string;
  risk: RiskLevel;
  casePriority: 'P1 - CRITICAL' | 'P2 - HIGH' | 'P3 - MEDIUM';
  assignedUnit: string;
}

export interface DashboardMetrics {
  todaysReports: number;
  highRiskAlerts: number;
  avgThreatScore: number;
  scamsPreventedAmount: string;
  systemHealth: string;
  networkStatus: string;
  aiEngineStatus: string;
}
