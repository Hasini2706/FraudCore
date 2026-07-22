Fraud$core – AI-Powered Fraud Intelligence Platform

Protecting Citizens from Digital Arrest & Cyber Fraud using AI

Fraud$core is an AI-powered web platform that helps citizens identify Digital Arrest scams and other cyber frauds before they become victims. Using Google's Gemini AI, the platform analyzes conversations, voice recordings, screenshots, PDFs, and text to detect suspicious patterns, explain why a conversation may be fraudulent, and generate an evidence report that users can use while reporting incidents to the official cybercrime authorities.

🚀 Features
🔍 AI Scam Detection
Analyze conversation text
Live Voice Analysis
AI-powered scam detection using Google Gemini
Detect Digital Arrest scams and other cyber frauds
📊 AI Analysis Report
Threat Score
AI Confidence Score
Scam Category
Warning Signs
AI Explanation
Personalized Safety Recommendations
📁 Evidence Generator
Generate structured evidence reports
Upload supporting files
Audio
Images
PDFs
Screenshots
Download evidence report
Prepare evidence before reporting
🤖 AI Fraud Assistant
Interactive AI chatbot
Cyber safety awareness
Scam prevention guidance
Digital fraud education
📈 Intelligence Dashboard
Scam statistics
Threat visualization
Fraud trends
AI insights
Problem Statement

Digital Arrest scams have become one of the fastest-growing cybercrimes in India.

Fraudsters impersonate:

Police Officers
CBI Officials
ED Officers
RBI Officials
Cyber Crime Officers

Victims are manipulated through fear, urgency, and fake legal threats into transferring money or revealing sensitive information.

Fraud$core helps identify these scams before financial loss occurs.

How It Works
Conversation / Voice / Screenshot / PDF
                │
                ▼
      Speech-to-Text (if audio)
                │
                ▼
       Google Gemini AI Analysis
                │
                ▼
     Scam Pattern Identification
                │
                ▼
      Threat Score & AI Reasoning
                │
                ▼
      Evidence Report Generation
                │
                ▼
 User Reports via Official Channels
Technology Stack
Frontend
React
TypeScript
Vite
Tailwind CSS
AI
Google Gemini API (@google/genai)
Browser APIs
Web Speech API
MediaRecorder API
UI
Lucide Icons
Framer Motion
Responsive Design
Key Capabilities
Live Voice Analysis
Conversation Scanner
Explainable AI Results
Scam Pattern Detection
Threat Scoring
AI Confidence Score
Evidence Upload
Evidence Report Generator
Cyber Safety Assistant
Government-inspired User Interface
Evidence-Based Reporting

Fraud$core does not submit complaints directly to any government agency.

Instead, it helps users:

Organize scam evidence
Generate a structured evidence report
Download the report
Report the incident through:
National Cyber Crime Helpline 1930
https://cybercrime.gov.in

This evidence-first workflow reduces false reporting while helping genuine victims prepare accurate reports.

Project Structure
src/
│
├── components/
│   ├── common/
│   ├── layout/
│   └── dashboard/
│
├── pages/
│   ├── LandingPage
│   ├── ScamAnalyzerPage
│   ├── PoliceDashboardPage
│   ├── AboutDigitalArrestPage
│   └── AiAssistantPage
│
├── services/
│   ├── geminiService.ts
│   └── scamAnalysisService.ts
│
├── types/
└── assets/
Installation

Clone the repository:

git clone https://github.com/Hasini2706/FraudCore.git

Navigate to the project:

cd FraudCore

Install dependencies:

npm install

Create a .env file:

VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY

Run the development server:

npm run dev

Build for production:

npm run build
Future Scope
Android & iOS application
Regional language support
OCR for fake legal notices
WhatsApp integration
Real-time phone call protection
AI voice emotion analysis
Cybercrime trend prediction
Integration with official reporting platforms
Disclaimer

Fraud$core is an educational and AI-assisted fraud detection platform.

The platform does not replace law enforcement or government cybercrime agencies and does not automatically file complaints. Users should report verified incidents through the official National Cyber Crime Portal or by calling 1930.

Team

Fraud$core
AI-Powered Fraud Intelligence Platform

Built for Digital Public Safety Hackathon 2026.

⭐ Support

If you found this project useful, consider giving it a ⭐ Star on GitHub to support our work and encourage further development.
