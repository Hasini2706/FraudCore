import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { ScamAnalyzerPage } from './pages/ScamAnalyzerPage';
import { PoliceDashboardPage } from './pages/PoliceDashboardPage';
import { AboutDigitalArrestPage } from './pages/AboutDigitalArrestPage';
import { ReportScamModal } from './components/common/ReportScamModal';
import { FloatingChatbot } from './components/common/FloatingChatbot';
import { LiveVoiceAnalysisModal } from './components/common/LiveVoiceAnalysisModal';

export function App() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex bg-[#0f172a] text-[#f8fafc] font-sans selection:bg-[#3b82f6] selection:text-white">
        {/* Left Fixed Sidebar */}
        <Sidebar
          onOpenReportModal={() => setIsReportModalOpen(true)}
        />

        {/* Right Content Area */}
        <div className="flex-1 pl-64 flex flex-col min-h-screen">
          {/* Top Navbar */}
          <Navbar />

          {/* Page Routing Container */}
          <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 md:p-8 space-y-6">
            <Routes>
              {/* Home is the Main Dashboard */}
              <Route
                path="/"
                element={
                  <LandingPage
                    onStartVoiceAnalysis={() => setIsVoiceModalOpen(true)}
                  />
                }
              />
              {/* Scam Analyzer */}
              <Route path="/analyzer" element={<ScamAnalyzerPage />} />
              {/* Command Center */}
              <Route path="/dashboard" element={<PoliceDashboardPage />} />
              {/* About Digital Arrest */}
              <Route path="/about" element={<AboutDigitalArrestPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer inside Content Area */}
          <Footer />
        </div>
      </div>

      {/* Global Floating Chatbot Panel (Slides Up, Slide upward transition) */}
      <FloatingChatbot />

      {/* Global Modals */}
      <ReportScamModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      <LiveVoiceAnalysisModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />
    </Router>
  );
}

export default App;
