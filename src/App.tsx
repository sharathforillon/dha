import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import ExecutiveCopilot from './components/copilot/ExecutiveCopilot';
import ExecutiveOverview from './pages/ExecutiveOverview';
import AIAssessment from './pages/AIAssessment';
import PrivacyIntelligence from './pages/PrivacyIntelligence';
import WorkforceReadiness from './pages/WorkforceReadiness';
import ROIImpact from './pages/ROIImpact';
import ComplianceIntelligence from './pages/ComplianceIntelligence';
import RiskCommandCenter from './pages/RiskCommandCenter';
import PopulationHealth from './pages/PopulationHealth';
import type { PageId } from './types';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
};

const pageTransition = {
  duration: 0.25,
  ease: 'easeInOut',
};

function PageContent({ currentPage }: { currentPage: PageId }) {
  const isFullHeight = currentPage === 'ai-assessment';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        className={isFullHeight ? 'flex-1 overflow-hidden flex flex-col' : 'min-h-full'}
      >
        {currentPage === 'executive-overview' && <ExecutiveOverview />}
        {currentPage === 'ai-assessment' && <AIAssessment />}
        {currentPage === 'privacy-intelligence' && <PrivacyIntelligence />}
        {currentPage === 'workforce-readiness' && <WorkforceReadiness />}
        {currentPage === 'roi-impact' && <ROIImpact />}
        {currentPage === 'compliance-intelligence' && <ComplianceIntelligence />}
        {currentPage === 'risk-command-center' && <RiskCommandCenter />}
        {currentPage === 'population-health' && <PopulationHealth />}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('executive-overview');
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [presentOpen, setPresentOpen] = useState(false);

  const isAIAssessment = currentPage === 'ai-assessment';

  return (
    <div className="flex w-full h-screen overflow-hidden bg-surface font-sans">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar
          currentPage={currentPage}
          onOpenCopilot={() => setCopilotOpen(!copilotOpen)}
          onPresent={() => setPresentOpen(true)}
          notificationCount={5}
        />

        {/* Page Content */}
        <main
          className={`flex-1 ${isAIAssessment ? 'overflow-hidden flex flex-col' : 'overflow-y-auto'}`}
          style={{ backgroundColor: '#F8FAFC' }}
        >
          <PageContent currentPage={currentPage} />
        </main>
      </div>

      {/* Executive Copilot */}
      <ExecutiveCopilot
        isOpen={copilotOpen}
        onClose={() => setCopilotOpen(false)}
      />

      {/* Presentation Mode (loaded lazily after agent completes) */}
      {presentOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ backgroundColor: '#0A1628' }}
          onClick={() => setPresentOpen(false)}
        >
          <div
            className="text-center px-8 max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8" style={{ background: 'linear-gradient(135deg, #0F6CBD 0%, #0078D4 100%)' }}>
              <span className="text-white text-2xl font-bold">DHA</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">Dubai Health</h1>
            <h2 className="text-2xl font-light mb-2" style={{ color: '#60A5FA' }}>Trusted AI Evaluation Framework</h2>
            <p className="text-slate-400 text-lg mb-12">Accelerating Safe, Governed and Scalable AI Adoption</p>
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="rounded-xl p-5 border" style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="text-4xl font-bold text-white mb-1">82.4</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Governance Score</div>
                <div className="text-xs mt-1" style={{ color: '#34D399' }}>+14.2 pts YTD</div>
              </div>
              <div className="rounded-xl p-5 border" style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="text-4xl font-bold text-white mb-1">AED 47M</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Value Generated</div>
                <div className="text-xs mt-1" style={{ color: '#34D399' }}>4.8× ROI</div>
              </div>
              <div className="rounded-xl p-5 border" style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="text-4xl font-bold text-white mb-1">93.2%</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Compliance Index</div>
                <div className="text-xs mt-1" style={{ color: '#34D399' }}>UAE & International</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="text-xs text-slate-500">Director's Briefing · Q2 2024 · Dubai Health Authority</div>
            </div>
            <button
              onClick={() => setPresentOpen(false)}
              className="mt-10 px-6 py-2.5 rounded-lg border border-slate-600 text-slate-400 text-sm hover:border-slate-400 hover:text-slate-200 transition-colors"
            >
              Exit Presentation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
