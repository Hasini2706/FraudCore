# Fraud$core - AI-Powered Fraud Intelligence Platform

> Protecting citizens from Digital Arrest scams and cyber fraud using Artificial Intelligence.

## 📌 Overview

Fraud$core is an AI-powered web application designed to help citizens identify Digital Arrest scams and other cyber frauds before they become victims. The platform analyzes conversations, voice recordings, screenshots, PDFs, and text using Google Gemini AI to detect scam patterns and generate an evidence report.

Instead of directly submitting complaints, Fraud$core helps users prepare evidence that can be used while reporting through the official Cyber Crime Portal or Helpline 1930.

---

## ✨ Features

- 🎙️ Live Voice Analysis
- 🤖 AI-powered Scam Detection using Google Gemini
- 📄 Conversation Scanner
- 📊 Threat Score & AI Confidence
- 🚨 Warning Signs Detection
- 📁 Evidence Report Generator
- 📷 Upload Images, PDFs & Audio
- 💬 AI Fraud Assistant
- 📈 Intelligence Dashboard
- 🌐 Responsive Modern UI

---

## 🛠️ Tech Stack

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

Go into the project directory

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

Build the project

```bash
npm run build
```

---

## 🚀 How It Works

```
Conversation / Voice / PDF / Image
                │
                ▼
        Speech-to-Text
                │
                ▼
      Google Gemini AI
                │
                ▼
     Scam Pattern Analysis
                │
                ▼
 Threat Score & AI Insights
                │
                ▼
   Evidence Report Generator
                │
                ▼
 Report through 1930 or
 cybercrime.gov.in
```

---

## 📂 Project Structure

```
FraudCore/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── dashboard/
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
2. AI analyzes the content.
3. Detects possible scam patterns.
4. Displays:
   - Scam Type
   - Threat Score
   - AI Confidence
   - Warning Signs
5. Generates an evidence report.
6. User can download the report and report the incident through official channels.

---

## 🔮 Future Enhancements

- Android & iOS App
- Regional Language Support
- OCR for Fake Legal Notices
- WhatsApp Integration
- Live Call Protection
- AI Voice Emotion Detection
- Cybercrime Trend Analysis
- Official API Integration

---

## ⚠️ Disclaimer

Fraud$core is an AI-assisted fraud detection and awareness platform.

It does **not** automatically submit complaints to government agencies. Users should report verified incidents through the National Cyber Crime Helpline (**1930**) or the official Cyber Crime Portal.

---

## 👨‍💻 Team

Developed for the **Digital Public Safety Hackathon 2026**.

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
