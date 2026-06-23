import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ChevronRight, Loader2, RotateCcw } from 'lucide-react';
import { copilotQuestions } from '../../data/syntheticData';

interface ExecutiveCopilotProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatAnswer(text: string) {
  const lines = text.split('\n\n');
  return lines.map((line, i) => {
    const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return (
      <p
        key={i}
        className="text-sm text-slate-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formatted }}
      />
    );
  });
}

export default function ExecutiveCopilot({ isOpen, onClose }: ExecutiveCopilotProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedAnswer, setDisplayedAnswer] = useState<string>('');
  const answerRef = useRef<HTMLDivElement>(null);

  const selectedQ = copilotQuestions.find((q) => q.id === selectedQuestion);

  const handleSelectQuestion = (id: string) => {
    if (id === selectedQuestion) return;
    setSelectedQuestion(id);
    setDisplayedAnswer('');
    setIsLoading(true);

    const q = copilotQuestions.find((q) => q.id === id);
    if (!q) return;

    setTimeout(() => {
      setIsLoading(false);
      setDisplayedAnswer(q.answer);
    }, 900 + Math.random() * 400);
  };

  const handleReset = () => {
    setSelectedQuestion(null);
    setDisplayedAnswer('');
  };

  useEffect(() => {
    if (displayedAnswer && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [displayedAnswer]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed right-4 top-4 bottom-4 z-50 w-96 bg-white rounded-xl border border-slate-200 shadow-panel flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #0F6CBD 0%, #0078D4 100%)' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                  <Sparkles size={14} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Executive Intelligence</div>
                  <div className="text-xs text-blue-100">DHA AI Governance Insights</div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-md hover:bg-white/20 transition-colors text-white"
              >
                <X size={15} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Intro */}
              <div className="px-5 pt-4 pb-3">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Ask a question about the AI governance ecosystem. Insights are generated from live platform data.
                </p>
              </div>

              {/* Question chips */}
              <div className="px-5 pb-4">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                  Quick Questions
                </div>
                <div className="space-y-1.5">
                  {copilotQuestions.map((q) => {
                    const isSelected = selectedQuestion === q.id;
                    return (
                      <motion.button
                        key={q.id}
                        onClick={() => handleSelectQuestion(q.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-md border text-sm font-medium transition-all duration-150 flex items-center justify-between gap-2 group ${
                          isSelected
                            ? 'border-blue-200 text-blue-700'
                            : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                        style={isSelected ? { backgroundColor: '#EAF4FF', borderColor: '#BFDBFE' } : {}}
                        whileHover={{ x: 1 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <span className="leading-snug">{q.question}</span>
                        <ChevronRight
                          size={13}
                          className={`flex-shrink-0 transition-transform duration-150 ${
                            isSelected ? 'rotate-90 text-blue-500' : 'text-slate-300 group-hover:text-slate-500'
                          }`}
                        />
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Response */}
              <AnimatePresence mode="wait">
                {isLoading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-5 pb-4"
                  >
                    <div className="rounded-lg border border-slate-200 p-4 bg-slate-50">
                      <div className="flex items-center gap-2.5">
                        <Loader2 size={14} className="animate-spin text-blue-500" />
                        <span className="text-xs font-medium text-slate-500">Analysing platform data...</span>
                      </div>
                      <div className="mt-3 space-y-2">
                        {[100, 80, 90].map((w, i) => (
                          <div key={i} className="h-2.5 rounded animate-pulse bg-slate-200" style={{ width: `${w}%` }} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {displayedAnswer && !isLoading && (
                  <motion.div
                    key="answer"
                    ref={answerRef}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-5 pb-5"
                  >
                    {/* Question label */}
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center"
                          style={{ backgroundColor: '#EAF4FF' }}
                        >
                          <Sparkles size={10} style={{ color: '#0F6CBD' }} />
                        </div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">AI Response</span>
                      </div>
                      <button
                        onClick={handleReset}
                        className="p-1 rounded hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
                        title="Reset"
                      >
                        <RotateCcw size={11} />
                      </button>
                    </div>

                    {/* Answer card */}
                    <div className="rounded-lg border p-4 space-y-3" style={{ borderColor: '#BFDBFE', backgroundColor: '#F8FCFF' }}>
                      {formatAnswer(displayedAnswer)}
                    </div>

                    {/* Category tag */}
                    {selectedQ && (
                      <div className="mt-2.5 flex items-center justify-between">
                        <span
                          className="text-xs px-2 py-0.5 rounded font-medium"
                          style={{ backgroundColor: '#EAF4FF', color: '#0F6CBD' }}
                        >
                          {selectedQ.category}
                        </span>
                        <span className="text-xs text-slate-400">Based on live platform data</span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-slate-100 flex-shrink-0 bg-slate-50">
              <p className="text-xs text-slate-400 text-center leading-relaxed">
                Insights generated from DHA Nabidh platform data · Not for clinical decision-making
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
