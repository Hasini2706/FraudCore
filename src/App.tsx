import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { ScamAnalyzerPage } from './pages/ScamAnalyzerPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { PoliceDashboardPage } from './pages/PoliceDashboardPage';
import { AboutDigitalArrestPage } from './pages/AboutDigitalArrestPage';

export function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#070d19] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
        <Navbar />
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
    </Router>
  );
}

export default App;
