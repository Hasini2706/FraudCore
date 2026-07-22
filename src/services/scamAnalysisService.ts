import type { ScamAnalysisResult } from '../types/scam';
import { analyzeTranscriptWithGemini } from './geminiService';

export async function analyzeScam(text: string): Promise<ScamAnalysisResult> {
  // Overwrite the analysis service to run exclusively through Google Gemini semantic analysis
  try {
    return await analyzeTranscriptWithGemini(text);
  } catch (error) {
    console.error("Gemini analysis error:", error);
    // Throw the error to be handled by the UI (display retry and failure warnings gracefully)
    throw error;
  }
}

export const PRESET_SAMPLE_TRANSCRIPTS = {
  cbiDigitalArrest: `This is Inspector Sharma calling from the Central Bureau of Investigation (CBI), New Delhi. A warrant has been issued in your name under Section 420 for laundering money through an illegal bank account in Mumbai. You are placed under digital arrest right now. Connect to our official video call immediately. Do not disconnect this line or inform anyone, or police will arrive at your home in 30 minutes. Transfer Rs 2.5 Lakhs clearance deposit to the official RBI verification account immediately for clearance.`,

  customsCourier: `FEDEX / Customs Department Alert: Your package containing 5 illegal passports, 200g MDMA, and suspicious bank cards has been intercepted at Mumbai International Airport. To avoid immediate physical arrest, click this link and join the online police verification room. Keep your camera on and stay alone in a room. You must pay security deposit of Rs 85,000 via UPI right now.`,

  whatsappThreat: `OFFICIAL NOTICE: Supreme Court of India & Cyber Cell. Case No. SC/2026/894. You have been named in a cyber crime dossier. Your mobile SIM will be blocked in 2 hours by TRAI. Stay on WhatsApp video call for interrogation. Do not call your family. Verification charge Rs 50,000 required to pause arrest order.`,

  legitimateBankReminder: `Dear Customer, your credit card statement ending in 4092 has been generated. Total amount due is Rs 4,250 by 25th July. Pay securely via our official mobile banking app. Never share your OTP or PIN with anyone. Thank you.`
};
