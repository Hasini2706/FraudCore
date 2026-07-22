export interface CurrencyAnalysisResult {
  riskScore: number;
  confidence: number;
  status: 'Likely Genuine' | 'Needs Manual Inspection' | 'Potential Counterfeit';
  detectedIssues: string[];
  securityFeatures: string[];
  summary: string;
}

/**
 * Simulates analysis of an Indian currency note using AI computer vision.
 * Can be configured to mock genuine or counterfeit profiles.
 */
export const analyzeCurrencyNote = async (
  file: File | string,
  simulateSuspicious: boolean = false
): Promise<CurrencyAnalysisResult> => {
  // Simulate network/AI inference delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (simulateSuspicious) {
    return {
      riskScore: 87,
      confidence: 93,
      status: 'Potential Counterfeit',
      detectedIssues: [
        'Missing security thread',
        'Blurred watermark',
        'Poor print quality',
        'Serial number inconsistency'
      ],
      securityFeatures: [
        'Watermark missing',
        'Security thread not detected'
      ],
      summary: 'Multiple expected security features could not be verified. The note should be inspected carefully by the appropriate authorities.'
    };
  }

  return {
    riskScore: 18,
    confidence: 96,
    status: 'Likely Genuine',
    detectedIssues: [],
    securityFeatures: [
      'Watermark detected',
      'Security thread visible',
      'See-through register aligned',
      'Micro-lettering appears present',
      'Latent image detected'
    ],
    summary: 'The uploaded currency note appears to contain the expected visible security features. This assessment is AI-assisted and should not be treated as an official verification.'
  };
};
