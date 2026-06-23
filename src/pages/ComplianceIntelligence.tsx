import { motion } from 'framer-motion';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  ShieldCheck, Globe2, CalendarClock, TrendingUp,
  CheckCircle2, AlertCircle, Clock3, Flag,
} from 'lucide-react';
import {
  uaeComplianceFrameworks,
  intlComplianceFrameworks,
  globalBenchmarkRadar,
} from '../data/syntheticData';

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface UAEFramework {
  id: string;
  framework: string;
  fullName: string;
  coverage: number;
  status: 'compliant' | 'partial';
  lastAudit: string;
  nextReview: string;
}

interface IntlFramework {
  id: string;
  framework: string;
  fullName: string;
  coverage: number;
  status: 'compliant' | 'partial';
  category: string;
}

interface RoadmileMilestone {
  month: string;
  label: string;
  description: string;
  state: 'complete' | 'upcoming' | 'planned';
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const roadmilestones: RoadmileMilestone[] = [
  {
    month: 'Jul 2024',
    label: 'DOH Abu Dhabi Review Prep',
    description: 'Prepare documentation and evidence pack for Department of Health Abu Dhabi compliance review.',
    state: 'upcoming',
  },
  {
    month: 'Aug 2024',
    label: 'ISO 42001 Gap Closure',
    description: '3 remaining controls to close: AI incident register, board accountability clause, supplier AI policy.',
    state: 'upcoming',
  },
  {
    month: 'Sep 2024',
    label: 'NABIDH Annual Attestation',
    description: 'Submit annual NABIDH compliance attestation to DHA. Prior audit score: 98%.',
    state: 'upcoming',
  },
  {
    month: 'Oct 2024',
    label: 'EU AI Act Alignment Workshop',
    description: 'Cross-functional workshop to assess DHA obligations under EU AI Act reference framework.',
    state: 'planned',
  },
  {
    month: 'Nov 2024',
    label: 'UAE PDPL Second-Year Audit',
    description: 'Annual audit of UAE Federal Personal Data Protection Law controls and data processor agreements.',
    state: 'planned',
  },
  {
    month: 'Dec 2024',
    label: 'DHA AI Governance Board Review',
    description: 'Annual board-level review of DHA AI Governance programme maturity and 2025 strategic priorities.',
    state: 'planned',
  },
];

const MILESTONE_STATE_CONFIG = {
  complete: {
    dot: '#107C10',
    badge: 'bg-green-50 text-green-700 border-green-200',
    label: 'Complete',
    icon: CheckCircle2,
  },
  upcoming: {
    dot: '#0F6CBD',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    label: 'Upcoming',
    icon: CalendarClock,
  },
  planned: {
    dot: '#94A3B8',
    badge: 'bg-slate-50 text-slate-500 border-slate-200',
    label: 'Planned',
    icon: Clock3,
  },
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  ISO: { bg: '#EAF4FF', text: '#0F6CBD' },
  WHO: { bg: '#F0FAF0', text: '#107C10' },
  EU: { bg: '#F3EFF8', text: '#5C2D91' },
  NIST: { bg: '#FFF4E0', text: '#9E5A00' },
  HL7: { bg: '#E6F7FA', text: '#006B7D' },
};

// ─── Helper Functions ─────────────────────────────────────────────────────────

function coverageBarColor(coverage: number): string {
  if (coverage >= 90) return '#107C10';
  if (coverage >= 70) return '#9E5A00';
  return '#D13438';
}

function coverageBarBg(coverage: number): string {
  if (coverage >= 90) return '#F0FAF0';
  if (coverage >= 70) return '#FFF4E0';
  return '#FEF2F0';
}

// ─── Sub-Components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: 'compliant' | 'partial' }) {
  if (status === 'compliant') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border"
        style={{ backgroundColor: '#F0FAF0', color: '#107C10', borderColor: '#BBF7D0' }}>
        <CheckCircle2 size={10} />
        Compliant
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border"
      style={{ backgroundColor: '#FFF4E0', color: '#9E5A00', borderColor: '#FDE68A' }}>
      <AlertCircle size={10} />
      Partial
    </span>
  );
}

function CoverageBar({ coverage }: { coverage: number }) {
  const barColor = coverageBarColor(coverage);
  const trackBg = coverageBarBg(coverage);

  return (
    <div className="flex items-center gap-2 mt-1.5">
      <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: trackBg }}>
        <motion.div
          className="h-1.5 rounded-full"
          style={{ backgroundColor: barColor }}
          initial={{ width: 0 }}
          animate={{ width: `${coverage}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      <span className="text-xs font-bold tabular-nums" style={{ color: barColor, minWidth: '2.5rem', textAlign: 'right' }}>
        {coverage}%
      </span>
    </div>
  );
}

function UAEFrameworkRow({ fw, isLast }: { fw: UAEFramework; isLast: boolean }) {
  return (
    <div className={`py-3 ${!isLast ? 'border-b border-slate-100' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-slate-900">{fw.framework}</span>
            <StatusBadge status={fw.status} />
          </div>
          <p className="text-xs text-slate-400 mt-0.5 leading-snug truncate">{fw.fullName}</p>
          <CoverageBar coverage={fw.coverage} />
          <div className="flex items-center gap-4 mt-1.5">
            <span className="text-xs text-slate-400">
              <span className="font-medium text-slate-500">Last audit:</span> {fw.lastAudit}
            </span>
            <span className="text-xs text-slate-400">
              <span className="font-medium text-slate-500">Next review:</span> {fw.nextReview}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntlFrameworkRow({ fw, isLast }: { fw: IntlFramework; isLast: boolean }) {
  const catColors = CATEGORY_COLORS[fw.category] ?? { bg: '#F8FAFC', text: '#64748B' };

  return (
    <div className={`py-3 ${!isLast ? 'border-b border-slate-100' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-slate-900">{fw.framework}</span>
            <StatusBadge status={fw.status} />
            <span
              className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold"
              style={{ backgroundColor: catColors.bg, color: catColors.text }}
            >
              {fw.category}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 leading-snug truncate">{fw.fullName}</p>
          <CoverageBar coverage={fw.coverage} />
        </div>
      </div>
    </div>
  );
}

function RadarTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs shadow-card-md">
      <p className="font-semibold text-slate-700 mb-2">{payload[0]?.payload?.dimension}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 mb-0.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-slate-500">{entry.name}:</span>
          <span className="font-bold text-slate-800">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ComplianceIntelligence() {
  const typedUAE = uaeComplianceFrameworks as UAEFramework[];
  const typedIntl = intlComplianceFrameworks as IntlFramework[];

  const uaeCompliantCount = typedUAE.filter(f => f.status === 'compliant').length;
  const uaePartialCount = typedUAE.length - uaeCompliantCount;
  const intlCompliantCount = typedIntl.filter(f => f.status === 'compliant').length;
  const intlPartialCount = typedIntl.length - intlCompliantCount;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6"
    >
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <motion.div variants={itemVariants} className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">
              Live Dashboard
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Compliance Intelligence
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Regulatory framework coverage &amp; global peer benchmarking · Dubai Health Authority · 2024
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-medium text-slate-400">Last Updated</div>
            <div className="text-xs font-semibold text-slate-700">Today, 06:00 GST</div>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-right">
            <div className="text-xs font-medium text-slate-400">Reporting Period</div>
            <div className="text-xs font-semibold text-slate-700">H1 2024</div>
          </div>
        </div>
      </motion.div>

      {/* ── Row 1: KPI Banner ────────────────────────────────────────────── */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {/* KPI 1 — Compliance Index */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ background: 'linear-gradient(135deg, #107C10 0%, transparent 60%)' }}
          />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Compliance Index
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight" style={{ color: '#107C10' }}>
                  93.2%
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2.5">
                <div
                  className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold"
                  style={{ backgroundColor: '#F0FAF0', color: '#107C10' }}
                >
                  <TrendingUp size={10} />
                  +7.8pts YTD
                </div>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#F0FAF0' }}>
              <ShieldCheck size={18} style={{ color: '#107C10' }} />
            </div>
          </div>
        </div>

        {/* KPI 2 — UAE Frameworks */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ background: 'linear-gradient(135deg, #0F6CBD 0%, transparent 60%)' }}
          />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                UAE Frameworks
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-slate-900">
                  {uaeCompliantCount}/{typedUAE.length}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">Fully Compliant</p>
              <p className="text-xs text-slate-400 mt-0.5">{uaePartialCount} partial coverage</p>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#EAF4FF' }}>
              <Flag size={18} style={{ color: '#0F6CBD' }} />
            </div>
          </div>
        </div>

        {/* KPI 3 — International Standards */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ background: 'linear-gradient(135deg, #5C2D91 0%, transparent 60%)' }}
          />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Int'l Standards
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-slate-900">
                  {intlCompliantCount}/{typedIntl.length}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">Fully Compliant</p>
              <p className="text-xs text-slate-400 mt-0.5">{intlPartialCount} in progress</p>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#F3EFF8' }}>
              <Globe2 size={18} style={{ color: '#5C2D91' }} />
            </div>
          </div>
        </div>

        {/* KPI 4 — Next Audit */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ background: 'linear-gradient(135deg, #9E5A00 0%, transparent 60%)' }}
          />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Next Audit
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-slate-900">28</span>
                <span className="text-sm font-medium text-slate-400">days</span>
              </div>
              <p className="text-xs text-slate-400 mt-1.5">DOH Abu Dhabi Review</p>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#FFF4E0' }}>
              <CalendarClock size={18} style={{ color: '#9E5A00' }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Row 2: UAE + International Frameworks ────────────────────────── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-[55%_45%] gap-4">

        {/* Left — UAE Regulatory Framework Coverage */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold tracking-wider uppercase border"
              style={{ backgroundColor: '#EAF4FF', color: '#0F6CBD', borderColor: '#BFDBFE' }}
            >
              <span>🇦🇪</span>
              UAE Regulations
            </div>
            <div className="flex-1 h-px bg-slate-100" />
            <div className="text-xs text-slate-400">
              <span className="font-semibold text-slate-600">{uaeCompliantCount}</span>/{typedUAE.length} compliant
            </div>
          </div>

          <h2 className="text-base font-bold text-slate-900 mb-1">
            UAE Regulatory Framework Coverage
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            Active monitoring of mandatory DHA, DOH and federal regulatory compliance obligations.
          </p>

          <div>
            {typedUAE.map((fw, i) => (
              <UAEFrameworkRow key={fw.id} fw={fw} isLast={i === typedUAE.length - 1} />
            ))}
          </div>
        </div>

        {/* Right — International Standards */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold tracking-wider uppercase border"
              style={{ backgroundColor: '#F3EFF8', color: '#5C2D91', borderColor: '#DDD6FE' }}
            >
              <Globe2 size={11} />
              International
            </div>
            <div className="flex-1 h-px bg-slate-100" />
            <div className="text-xs text-slate-400">
              <span className="font-semibold text-slate-600">{intlCompliantCount}</span>/{typedIntl.length} compliant
            </div>
          </div>

          <h2 className="text-base font-bold text-slate-900 mb-1">
            International Standards
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            Voluntary and reference alignment with leading global AI and health informatics standards.
          </p>

          <div>
            {typedIntl.map((fw, i) => (
              <IntlFrameworkRow key={fw.id} fw={fw} isLast={i === typedIntl.length - 1} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Row 3: Global Peer Benchmarking ──────────────────────────────── */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Global Healthcare AI Governance Benchmarking
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              DHA performance vs. leading international health systems across six governance dimensions
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold"
            style={{ backgroundColor: '#EAF4FF', color: '#0F6CBD' }}>
            <Globe2 size={11} />
            6 Systems · 6 Dimensions
          </div>
        </div>

        <div className="h-80 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={globalBenchmarkRadar} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[60, 100]}
                tick={{ fontSize: 9, fill: '#94A3B8' }}
                tickCount={5}
                stroke="#E2E8F0"
              />
              <Radar
                name="DHA"
                dataKey="DHA"
                stroke="#0F6CBD"
                fill="#0F6CBD"
                fillOpacity={0.12}
                strokeWidth={2.5}
                dot={{ fill: '#0F6CBD', r: 3, strokeWidth: 0 }}
              />
              <Radar
                name="Singapore MOH"
                dataKey="Singapore"
                stroke="#107C10"
                fill="none"
                strokeWidth={1.5}
                strokeDasharray="5 3"
                dot={false}
              />
              <Radar
                name="NHS AI Lab"
                dataKey="NHS"
                stroke="#5C2D91"
                fill="none"
                strokeWidth={1.5}
                strokeDasharray="5 3"
                dot={false}
              />
              <Radar
                name="Mayo Clinic"
                dataKey="MayoClinic"
                stroke="#00B7C3"
                fill="none"
                strokeWidth={1.5}
                strokeDasharray="5 3"
                dot={false}
              />
              <Radar
                name="Cleveland Clinic"
                dataKey="Cleveland"
                stroke="#FFB900"
                fill="none"
                strokeWidth={1.5}
                strokeDasharray="5 3"
                dot={false}
              />
              <Tooltip content={<RadarTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                iconType="circle"
                iconSize={8}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Insight callout cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          {/* Ahead of Peers */}
          <div className="rounded-lg border p-4"
            style={{ backgroundColor: '#F0FAF0', borderColor: '#BBF7D0' }}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#107C10' }}>
                <TrendingUp size={12} color="#fff" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#107C10' }}>
                Ahead of Peers
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-800 leading-snug mt-1">
              DHA leads in Privacy Controls (88)
            </p>
            <p className="text-xs text-slate-500 mt-1 leading-snug">
              3–6 points above the international average across all benchmarked health systems.
            </p>
          </div>

          {/* On Par */}
          <div className="rounded-lg border p-4"
            style={{ backgroundColor: '#EAF4FF', borderColor: '#BFDBFE' }}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#0F6CBD' }}>
                <CheckCircle2 size={12} color="#fff" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#0F6CBD' }}>
                On Par
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-800 leading-snug mt-1">
              Clinical Safety &amp; Governance on target
            </p>
            <p className="text-xs text-slate-500 mt-1 leading-snug">
              Both dimensions are within 3 points of global leaders Mayo Clinic and NHS AI Lab.
            </p>
          </div>

          {/* Focus Area */}
          <div className="rounded-lg border p-4"
            style={{ backgroundColor: '#FFF4E0', borderColor: '#FDE68A' }}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#9E5A00' }}>
                <AlertCircle size={12} color="#fff" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#9E5A00' }}>
                Focus Area
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-800 leading-snug mt-1">
              Workforce Readiness (74) — opportunity gap
            </p>
            <p className="text-xs text-slate-500 mt-1 leading-snug">
              Singapore MOH benchmark is 78. Targeted training investment projected to close gap by H1 2025.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Row 4: Compliance Roadmap ─────────────────────────────────────── */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Compliance Roadmap — H2 2024
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Upcoming compliance milestones and audit commitments across all active regulatory frameworks
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#107C10' }} />
              <span className="text-slate-500 font-medium">Complete</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#0F6CBD' }} />
              <span className="text-slate-500 font-medium">Upcoming</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#94A3B8' }} />
              <span className="text-slate-500 font-medium">Planned</span>
            </div>
          </div>
        </div>

        {/* Timeline — horizontal scroll on small screens, grid on large */}
        <div className="overflow-x-auto pb-2">
          <div className="flex items-start gap-0 min-w-[700px]">
            {roadmilestones.map((m, i) => {
              const config = MILESTONE_STATE_CONFIG[m.state];
              const StateIcon = config.icon;
              const isLast = i === roadmilestones.length - 1;

              return (
                <div key={i} className="flex-1 flex flex-col items-center relative">
                  {/* Connector line */}
                  <div className="flex items-center w-full mb-3">
                    <div className={`flex-1 h-px ${i === 0 ? 'opacity-0' : 'bg-slate-200'}`} />
                    <motion.div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm flex-shrink-0 z-10 flex items-center justify-center"
                      style={{ backgroundColor: config.dot }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.07 }}
                    >
                      <StateIcon size={8} color="#fff" />
                    </motion.div>
                    <div className={`flex-1 h-px ${isLast ? 'opacity-0' : 'bg-slate-200'}`} />
                  </div>

                  {/* Card below the dot */}
                  <motion.div
                    className="w-full px-2"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.07 + 0.15 }}
                  >
                    <div
                      className="rounded-lg border p-3 hover:shadow-card-hover transition-all duration-200 cursor-default"
                      style={{
                        borderColor: m.state === 'upcoming'
                          ? '#BFDBFE'
                          : m.state === 'complete'
                          ? '#BBF7D0'
                          : '#E2E8F0',
                        backgroundColor: m.state === 'upcoming'
                          ? '#F0F7FF'
                          : m.state === 'complete'
                          ? '#F6FEF6'
                          : '#FAFAFA',
                      }}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-xs font-bold text-slate-500 tabular-nums">{m.month}</span>
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold border ${config.badge}`}
                        >
                          {config.label}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-800 leading-snug mb-1.5">
                        {m.label}
                      </p>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
