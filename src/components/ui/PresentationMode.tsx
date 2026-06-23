import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  X, ChevronLeft, ChevronRight, Activity, ClipboardCheck,
  Clock, Users, Heart, CheckCircle, TrendingUp, ArrowRight,
  Shield,
} from 'lucide-react';
import { governanceTrendData } from '../../data/syntheticData';

// ─── Props ─────────────────────────────────────────────────────────────────────

interface PresentationModeProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Slide Transition Variants ─────────────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.38, ease: [0.32, 0.72, 0, 1] },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    transition: { duration: 0.28, ease: [0.32, 0.72, 0, 1] },
  }),
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

// ─── Shared slide-level fade in ────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: d * 0.1, duration: 0.45 },
  }),
};

// ─── Slide 1 — Cover ──────────────────────────────────────────────────────────

function Slide1Cover() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-12">
      {/* DHA Logo mark */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="w-24 h-24 rounded-full border-2 border-blue-400 border-opacity-60 flex items-center justify-center mb-8 shadow-xl"
        style={{ backgroundColor: 'rgba(15,108,189,0.15)' }}
      >
        <Activity size={40} className="text-blue-300" />
        <span
          className="absolute text-xs font-black tracking-widest text-blue-200"
          style={{ fontSize: '10px', letterSpacing: '0.18em', marginTop: '52px' }}
        >
          DHA
        </span>
      </motion.div>

      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
        <div className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-3">
          Dubai Health Authority
        </div>
      </motion.div>

      <motion.h1
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-6xl font-black text-white mb-2 tracking-tight"
      >
        Dubai Health
      </motion.h1>

      <motion.h2
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-2xl font-light text-slate-300 mb-6"
      >
        Trusted AI Evaluation Framework
      </motion.h2>

      <motion.p
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-lg font-semibold mb-8"
        style={{ color: '#60A5FA' }}
      >
        Accelerating Safe, Governed and Scalable AI Adoption
      </motion.p>

      <motion.div
        custom={5}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="w-32 h-px mb-8"
        style={{ backgroundColor: 'rgba(148,163,184,0.4)' }}
      />

      <motion.p
        custom={6}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-sm text-slate-500 font-medium tracking-wide"
      >
        Q2 2024 · Director's Briefing
      </motion.p>
    </div>
  );
}

// ─── Slide 2 — Governance Maturity ────────────────────────────────────────────

function Slide2Governance() {
  return (
    <div className="flex h-full gap-10 px-10 items-center">
      {/* Left: text */}
      <div className="w-2/5 flex flex-col justify-center">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <div className="text-xs font-black tracking-widest text-blue-400 uppercase mb-4">
            Governance
          </div>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
          <div className="flex items-end gap-2 mb-2">
            <span className="text-8xl font-black text-white leading-none">82.4</span>
            <span className="text-2xl font-medium text-slate-400 mb-3">/100</span>
          </div>
          <p className="text-lg text-slate-300 font-medium mb-4">Ecosystem Governance Score</p>
        </motion.div>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm mb-4"
            style={{ backgroundColor: 'rgba(16,124,16,0.2)', color: '#4ADE80' }}
          >
            <TrendingUp size={14} />
            +14.2 pts in 12 months
          </div>
        </motion.div>

        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
          <p className="text-sm text-slate-400 leading-relaxed">
            Exceeding annual target of 10 points. 31 AI solutions approved for clinical deployment across the DHA ecosystem.
          </p>
        </motion.div>
      </div>

      {/* Right: chart */}
      <motion.div
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="w-3/5 h-72"
      >
        <div className="text-xs font-medium text-slate-500 mb-3 uppercase tracking-wide">
          Governance Score — 12-Month Trend
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={governanceTrendData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id="pGovGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0F6CBD" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#0F6CBD" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" vertical={false} />
            <XAxis
              dataKey="monthShort"
              tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'IBM Plex Sans' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[60, 90]}
              tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'IBM Plex Sans' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '8px',
                fontSize: '11px',
                color: '#E2E8F0',
                fontFamily: 'IBM Plex Sans',
              }}
            />
            <Area
              type="monotone"
              dataKey="governanceScore"
              name="Governance Score"
              stroke="#0F6CBD"
              strokeWidth={3}
              fill="url(#pGovGrad)"
              dot={false}
              activeDot={{ r: 5, fill: '#0F6CBD' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

// ─── Slide 3 — Business Value ──────────────────────────────────────────────────

function Slide3BusinessValue() {
  const metrics = [
    { label: 'Risk Cost Avoided', value: 'AED 12.4M', color: '#34D399' },
    { label: 'ROI Multiple', value: '4.8x', color: '#60A5FA' },
    { label: 'Review Time Reduction', value: '74%', color: '#A78BFA' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-12 text-center">
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
        <div className="text-xs font-black tracking-widest text-green-400 uppercase mb-4">
          Return on Investment
        </div>
      </motion.div>

      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
        <div
          className="font-black leading-none mb-3"
          style={{ fontSize: '7rem', color: '#34D399', lineHeight: 0.9 }}
        >
          AED 47.2M
        </div>
      </motion.div>

      <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
        <p className="text-xl text-slate-300 font-medium mb-10">
          Total Framework Value Generated
        </p>
      </motion.div>

      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-3 gap-5 w-full max-w-2xl"
      >
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl p-5 border"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(255,255,255,0.1)',
            }}
          >
            <div className="text-3xl font-black mb-2" style={{ color: m.color }}>{m.value}</div>
            <div className="text-xs text-slate-400 font-medium">{m.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Slide 4 — Compliance ─────────────────────────────────────────────────────

function Slide4Compliance() {
  const frameworks = [
    { name: 'NABIDH', fullName: 'National Unified Medical Record – DHA', coverage: 98 },
    { name: 'UAE PDPL', fullName: 'Federal Personal Data Protection Law', coverage: 94 },
    { name: 'DHA Digital Health', fullName: 'DHA Digital Health & AI Policy 2024', coverage: 97 },
    { name: 'UAE AI Strategy', fullName: 'UAE National AI Strategy 2031', coverage: 91 },
  ];

  return (
    <div className="flex h-full gap-12 px-10 items-center">
      {/* Left: text + list */}
      <div className="w-1/2 flex flex-col justify-center">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <div className="text-xs font-black tracking-widest text-blue-400 uppercase mb-4">
            Regulatory Compliance
          </div>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
          <div className="flex items-end gap-2 mb-2">
            <span className="text-8xl font-black text-white leading-none">93.2%</span>
          </div>
          <p className="text-lg text-slate-300 font-medium mb-6">
            UAE & International Framework Coverage
          </p>
        </motion.div>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
          <div className="space-y-3">
            {frameworks.map((fw) => (
              <div key={fw.name} className="flex items-start gap-3">
                <CheckCircle size={16} style={{ color: '#4ADE80', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div className="text-sm font-semibold text-white">{fw.name}</div>
                  <div className="text-xs text-slate-500">{fw.fullName}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right: horizontal bars */}
      <motion.div
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="w-1/2 flex flex-col justify-center gap-4"
      >
        <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
          Coverage by Framework
        </div>
        {frameworks.map((fw, i) => (
          <div key={fw.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-semibold text-slate-300">{fw.name}</span>
              <span className="text-sm font-bold text-green-400">{fw.coverage}%</span>
            </div>
            <div
              className="w-full rounded-full overflow-hidden"
              style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: '#0F6CBD' }}
                initial={{ width: 0 }}
                animate={{ width: `${fw.coverage}%` }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Slide 5 — Patient Safety ──────────────────────────────────────────────────

function Slide5PatientSafety() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-12">
      {/* Central card */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl rounded-2xl p-8 mb-8 border text-center"
        style={{
          backgroundColor: 'rgba(209,52,56,0.08)',
          borderColor: 'rgba(209,52,56,0.3)',
        }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: 'rgba(209,52,56,0.15)' }}
        >
          <Heart size={30} style={{ color: '#F87171' }} />
        </div>

        <div className="text-6xl font-black text-white mb-3">14,200</div>
        <div className="text-xl font-semibold text-slate-300 mb-3">
          Patient Encounters Protected
        </div>
        <p className="text-sm text-slate-400 italic leading-relaxed">
          From 3 flagged high-risk AI tools prevented from clinical deployment —
          ensuring patient safety remains the first principle of AI governance.
        </p>
      </motion.div>

      {/* Supporting stats */}
      <motion.div
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-5 w-full max-w-lg mb-6"
      >
        <div
          className="rounded-xl p-4 border text-center"
          style={{
            backgroundColor: 'rgba(255,255,255,0.04)',
            borderColor: 'rgba(255,255,255,0.1)',
          }}
        >
          <div className="text-2xl font-black text-blue-400 mb-1">2,847</div>
          <div className="text-xs text-slate-400">Privacy Records Secured</div>
        </div>
        <div
          className="rounded-xl p-4 border text-center"
          style={{
            backgroundColor: 'rgba(255,255,255,0.04)',
            borderColor: 'rgba(255,255,255,0.1)',
          }}
        >
          <div className="text-2xl font-black text-green-400 mb-1">12</div>
          <div className="text-xs text-slate-400">Adverse Events Avoided</div>
        </div>
      </motion.div>

      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-center text-sm text-slate-500 italic max-w-lg leading-relaxed"
      >
        "Governance is not a barrier to AI innovation — it is the foundation upon which
        safe, trusted and scalable AI is built within the DHA ecosystem."
      </motion.p>
    </div>
  );
}

// ─── Slide 6 — Forward Look / CTA ────────────────────────────────────────────

function Slide6ForwardLook() {
  const focusAreas = [
    {
      icon: ClipboardCheck,
      title: '8 Solutions in Pipeline',
      desc: 'Q3 2024 evaluation queue open for clinical AI submissions',
      color: '#60A5FA',
    },
    {
      icon: Clock,
      title: 'SurgPlan AI Assessment Q3',
      desc: 'High-complexity surgical planning AI completing governance review',
      color: '#A78BFA',
    },
    {
      icon: Users,
      title: 'Community Health Readiness Sprint',
      desc: '90-day intensive programme targeting 80% AI literacy threshold',
      color: '#34D399',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-12">
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
        <div className="text-xs font-black tracking-widest text-blue-400 uppercase mb-6 text-center">
          Q3 2024 Outlook
        </div>
      </motion.div>

      <motion.div
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-3 gap-5 w-full max-w-3xl mb-10"
      >
        {focusAreas.map((area) => (
          <div
            key={area.title}
            className="rounded-xl p-5 border flex flex-col gap-3"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(255,255,255,0.1)',
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${area.color}20` }}
            >
              <area.icon size={20} style={{ color: area.color }} />
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-1">{area.title}</div>
              <div className="text-xs text-slate-400 leading-relaxed">{area.desc}</div>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="text-center">
        <div
          className="rounded-2xl px-10 py-6 border mb-6"
          style={{
            backgroundColor: 'rgba(15,108,189,0.12)',
            borderColor: 'rgba(15,108,189,0.4)',
          }}
        >
          <p className="text-xl font-black text-white leading-tight">
            Building the most trusted AI healthcare ecosystem
            <br />
            <span style={{ color: '#60A5FA' }}>in the Middle East</span>
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div
            className="w-8 h-8 rounded-full border border-blue-500 border-opacity-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(15,108,189,0.2)' }}
          >
            <Shield size={14} className="text-blue-400" />
          </div>
          <span className="text-sm font-semibold text-slate-400">Dubai Health Authority · Trusted AI Framework</span>
          <ArrowRight size={14} className="text-blue-400" />
        </div>
      </motion.div>
    </div>
  );
}

// ─── Slides Config ─────────────────────────────────────────────────────────────

const SLIDES = [
  { id: 'cover',       label: 'Cover',             component: Slide1Cover },
  { id: 'governance',  label: 'Governance',         component: Slide2Governance },
  { id: 'roi',         label: 'Business Value',     component: Slide3BusinessValue },
  { id: 'compliance',  label: 'Compliance',         component: Slide4Compliance },
  { id: 'safety',      label: 'Patient Safety',     component: Slide5PatientSafety },
  { id: 'outlook',     label: 'Forward Look',       component: Slide6ForwardLook },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PresentationMode({ isOpen, onClose }: PresentationModeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const goNext = useCallback(() => {
    if (currentSlide < SLIDES.length - 1) {
      setDirection(1);
      setCurrentSlide((s) => s + 1);
    }
  }, [currentSlide]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((s) => s - 1);
    }
  }, [currentSlide]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goPrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, goNext, goPrev, onClose]);

  // Reset slide when closed
  useEffect(() => {
    if (!isOpen) {
      setCurrentSlide(0);
      setDirection(1);
    }
  }, [isOpen]);

  const SlideComponent = SLIDES[currentSlide].component;
  const totalSlides = SLIDES.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex flex-col"
          style={{
            zIndex: 50,
            backgroundColor: '#0A1628',
            backgroundImage:
              'radial-gradient(ellipse at 20% 20%, rgba(15,108,189,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(92,45,145,0.08) 0%, transparent 60%)',
          }}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-8 py-4 flex-shrink-0">
            {/* DHA branding */}
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full border border-blue-500 border-opacity-40 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(15,108,189,0.2)' }}
              >
                <Activity size={14} className="text-blue-400" />
              </div>
              <div>
                <div className="text-xs font-black text-white tracking-wide">Dubai Health</div>
                <div className="text-xs text-slate-500" style={{ fontSize: '9px' }}>Trusted AI Framework · Director's Briefing</div>
              </div>
            </div>

            {/* Slide counter + close */}
            <div className="flex items-center gap-5">
              <div className="text-sm font-semibold text-slate-400">
                <span className="text-white">{currentSlide + 1}</span>
                <span className="mx-1.5 text-slate-600">/</span>
                <span>{totalSlides}</span>
              </div>
              <div className="text-xs text-slate-500 hidden lg:block">{SLIDES[currentSlide].label}</div>
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                <X size={14} />
                Exit
              </button>
            </div>
          </div>

          {/* Slide area */}
          <div className="flex-1 relative overflow-hidden px-4">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <SlideComponent />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom navigation bar */}
          <div
            className="flex-shrink-0 flex items-center justify-between px-8 py-5 border-t"
            style={{ borderColor: 'rgba(148,163,184,0.12)' }}
          >
            {/* Back button */}
            <button
              onClick={goPrev}
              disabled={currentSlide === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                backgroundColor: currentSlide === 0 ? 'transparent' : 'rgba(255,255,255,0.07)',
                color: currentSlide === 0 ? '#475569' : '#CBD5E1',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            {/* Slide dots */}
            <div className="flex items-center gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: i === currentSlide ? 24 : 8,
                    height: 8,
                    backgroundColor: i === currentSlide ? '#0F6CBD' : 'rgba(148,163,184,0.35)',
                    transition: 'all 0.25s ease',
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Next / Exit buttons */}
            <div className="flex items-center gap-3">
              {currentSlide < SLIDES.length - 1 ? (
                <button
                  onClick={goNext}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{ backgroundColor: '#0F6CBD' }}
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ backgroundColor: '#107C10', color: '#fff' }}
                >
                  <CheckCircle size={15} />
                  End Presentation
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
