# Fraud$core - AI-Powered Fraud Intelligence Platform

> Protecting citizens from Digital Arrest scams, counterfeit currency, and cyber fraud using Artificial Intelligence.

## 📌 Overview

Fraud$core is an AI-powered cyber safety platform designed to help citizens identify, analyze, and respond to digital fraud.

The platform combines AI-powered scam detection, fake currency analysis, live voice monitoring, and evidence generation into a single intelligent system. Fraud$core helps users recognize fraud attempts, understand why they are suspicious, and prepare evidence for reporting through official government channels.

---

## ✨ Core Features

### 🚨 Digital Arrest Scam Detection
- AI-powered conversation analysis using Google Gemini
- Live Voice Analysis
- Threat Score & AI Confidence
- Scam Type Identification
- Warning Signs Detection
- Personalized Safety Recommendations

### 💸 Fake Currency Detector
- Upload Indian currency note images
- AI-assisted counterfeit detection
- Security feature inspection
- Authenticity assessment
- Currency analysis report

### 📁 Evidence Generator
- Upload screenshots, PDFs, images, and audio
- Generate downloadable PDF evidence reports
- Organize evidence before reporting
- Citizen declaration workflow

### 💬 AI Fraud Assistant
- Interactive AI chatbot
- Fraud awareness
- Cyber safety guidance
- Scam prevention tips

### 📊 Intelligence Dashboard
- Scam statistics
- Fraud trends
- Threat analytics
- Recent investigations
- AI insights

---

## 🛠️ Technology Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### AI
- Google Gemini API (`@google/genai`)

### Browser APIs
- Web Speech API
- MediaRecorder API

### UI Libraries
- Framer Motion
- Lucide React

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/Hasini2706/FraudCore.git
```

Navigate into the project

```bash
cd FraudCore
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Run the development server

```bash
npm run dev
```

Build the application

```bash
npm run build
```

---

## 🚀 How It Works

### Digital Arrest Detection

```text
Conversation / Voice / Screenshot
              │
              ▼
      Speech-to-Text
              │
              ▼
     Google Gemini AI
              │
              ▼
 Scam Pattern Detection
              │
              ▼
 Threat Score & AI Report
```

### Fake Currency Detection

```text
Currency Note Image
         │
         ▼
 Image Analysis
         │
         ▼
 Security Feature Inspection
         │
         ▼
 Authenticity Assessment
```

---

## 📂 Project Structure

```text
FraudCore/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── types/
│   ├── utils/
│   └── App.tsx
│
├── .env.example
├── package.json
├── vite.config.ts
└── README.md
```

---

## 📋 Workflow

1. Upload or record a conversation.
2. Upload supporting evidence (optional).
3. AI analyzes the content.
4. Detects scam patterns or counterfeit indicators.
5. Displays:
   - Threat Score
   - AI Confidence
   - Scam Type / Currency Assessment
   - Warning Signs
6. Generate an Evidence Report.
7. Download the report and report through official channels if necessary.

---

## 🔮 Future Enhancements

- Android & iOS App
- Regional Language Support
- OCR for Fake Legal Notices
- WhatsApp Integration
- Live Call Protection
- Advanced Fake Currency Detection using Computer Vision
- QR & Serial Number Verification
- AI Voice Emotion Detection
- Government API Integration

---

## ⚠️ Disclaimer

Fraud$core is an AI-assisted fraud detection and awareness platform.

The platform **does not automatically submit complaints** to any government agency. It helps citizens analyze suspicious activity and organize evidence before reporting through the National Cyber Crime Helpline (**1930**) or the official Cyber Crime Portal.

---

## 👨‍💻 Team

Developed for the **Digital Public Safety Hackathon 2026**.

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
