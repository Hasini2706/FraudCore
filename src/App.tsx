import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { ScamAnalyzerPage } from './pages/ScamAnalyzerPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { PoliceDashboardPage } from './pages/PoliceDashboardPage';
import { AboutDigitalArrestPage } from './pages/AboutDigitalArrestPage';

export function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col lg:flex-row bg-[#0B1220] text-[#F8FAFC] font-sans selection:bg-[#00BFA6]/30 selection:text-[#F8FAFC]">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
          {/* Top Ticker Warning Banner */}
          <div className="bg-[#0F172A] text-[#F8FAFC] text-[11px] py-2 px-4 select-none shrink-0 border-b border-[rgba(255,255,255,0.08)]">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="font-bold tracking-wider text-[10px] font-space text-[#00BFA6]">
                  NATIONAL CYBER BANKING DEFENSE
                </span>
                <span className="text-[#CBD5E1]/20 hidden md:inline">|</span>
                <span className="truncate text-[#CBD5E1]">
                  🚨 NPCI Alert: Banks and Law Units never initiate digital warrant video calls or demand security verification transfers.
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-[#00BFA6] hidden sm:inline">24/7 Hotline:</span>
                <a
                  href="tel:1930"
                  className="flex items-center gap-1 font-bold text-[#F59E0B] hover:text-[#F59E0B]/85 transition"
                >
                  <span>1930</span>
                </a>
              </div>
            </div>
          </div>
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/analyzer" element={<ScamAnalyzerPage />} />
              <Route path="/assistant" element={<AiAssistantPage />} />
              <Route path="/dashboard" element={<PoliceDashboardPage />} />
              <Route path="/about" element={<AboutDigitalArrestPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
