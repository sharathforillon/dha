import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {
  Gauge, Microscope, MapPinned, BedDouble, Target, Users2, AlertTriangle,
  Activity, HeartPulse, CalendarClock, CheckCircle2, Building2, TrendingUp,
  Lightbulb, AlertCircle, Stethoscope, LineChart as LineChartIcon, ShieldCheck,
  Banknote, Flag,
} from 'lucide-react';
import { SeverityBadge } from '../components/ui/Badge';
import {
  chronicDiseaseTrendData,
  populationRiskDistribution,
  diseaseClusters,
  alKaramaClusterAgeBands,
  careGaps,
  careGapClosureByDistrict,
  capacityForecastData,
  facilityCapacityRisk,
  d33CapacityOutcomes,
  populationHealthImpactTrend,
  populationHealthScorecard,
} from '../data/syntheticData';

// ─── Animation Variants ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

// ─── Custom Tooltip ────────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-card-md">
        <p className="text-xs font-semibold text-slate-700 mb-2">{label}</p>
        {payload.map((entry: any, i: number) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-500">{entry.name}:</span>
            <span className="font-semibold text-slate-700">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Local Metric Card (colour-coded value, mirrors Risk Command Center) ──────

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  delta?: string;
  deltaPositive?: boolean;
  sublabel?: string;
  color: string;
  icon: React.ElementType;
  iconBg: string;
}

function MetricCard({ label, value, unit, delta, deltaPositive, sublabel, color, icon: Icon, iconBg }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: iconBg }}>
          <Icon size={16} style={{ color }} />
        </div>
      </div>
      <div>
        <div className="flex items-end gap-1">
          <span className="text-3xl font-bold tracking-tight" style={{ color }}>{value}</span>
          {unit && <span className="text-sm font-medium text-slate-400 mb-1">{unit}</span>}
        </div>
        {delta && (
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs font-semibold" style={{ color: deltaPositive ? '#107C10' : '#D13438' }}>
              {delta}
            </span>
          </div>
        )}
        {sublabel && <p className="text-xs text-slate-400 mt-1">{sublabel}</p>}
      </div>
    </div>
  );
}

// ─── Local Impact Card (year-over-year comparison, mirrors ROI Impact) ────────

interface ImpactCardProps {
  label: string;
  value: string | number;
  comparison: React.ReactNode;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

function ImpactCard({ label, value, comparison, icon: Icon, iconColor, iconBg }: ImpactCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5 flex flex-col gap-3">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={18} style={{ color: iconColor }} />
      </div>
      <div>
        <div className="text-3xl font-bold tracking-tight leading-none" style={{ color: iconColor }}>{value}</div>
        <div className="text-xs font-medium text-slate-400 mt-1">{label}</div>
      </div>
      <div className="text-xs text-slate-500 border-t border-slate-100 pt-2.5">{comparison}</div>
    </div>
  );
}

// ─── Sub-Navigation Tabs ───────────────────────────────────────────────────────

type SubTabId = 'overview' | 'clusters' | 'gaps' | 'capacity' | 'impact';

const subTabs: { id: SubTabId; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'City Overview', icon: Gauge },
  { id: 'clusters', label: 'Disease Clusters', icon: Microscope },
  { id: 'gaps', label: 'Care Gaps', icon: MapPinned },
  { id: 'capacity', label: 'Capacity Signals', icon: BedDouble },
  { id: 'impact', label: 'Strategic Impact', icon: Target },
];

// ─── Capability Comparison Tags ────────────────────────────────────────────────

const capabilityTagConfig: Record<string, { bg: string; text: string; label: string }> = {
  live: { bg: '#F0FAF0', text: '#107C10', label: 'Live' },
  reads: { bg: '#EAF4FF', text: '#0F6CBD', label: 'Reads from it' },
  'not-built': { bg: '#FBEAEA', text: '#D13438', label: 'Not yet built' },
  new: { bg: '#F0FAF0', text: '#107C10', label: 'Demonstrated here' },
};

const capabilityRows = [
  { capability: 'Individual patient record', nabidh: 'live', layer: 'reads' },
  { capability: 'Facility-level reporting', nabidh: 'live', layer: 'reads' },
  { capability: 'City-wide disease clustering', nabidh: 'not-built', layer: 'new' },
  { capability: 'Predictive care-gap mapping', nabidh: 'not-built', layer: 'new' },
];

function CapabilityTag({ kind }: { kind: string }) {
  const cfg = capabilityTagConfig[kind];
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: cfg.bg, color: cfg.text }}>
      {cfg.label}
    </span>
  );
}

// ─── Response Pathway (Disease Clusters tab) ───────────────────────────────────

const responsePathway = [
  { icon: Stethoscope, label: 'Targeted screening', timeframe: '2–4 wks' },
  { icon: Building2, label: 'Facility resourcing review', timeframe: '4–6 wks' },
  { icon: Users2, label: 'Community outreach', timeframe: '6–8 wks' },
  { icon: LineChartIcon, label: 'Re-measure in 90 days', timeframe: '90 days' },
];

// ─── Vision Contribution (Strategic Impact tab) ────────────────────────────────

const visionGoals = [
  {
    icon: Stethoscope,
    title: 'Phase 3 — Decision Support',
    description: "Cluster and gap data enriches the Co-Pilot's context, sharpening differential diagnosis suggestions in affected districts",
    progress: 74,
    color: '#0F6CBD',
  },
  {
    icon: ShieldCheck,
    title: 'Phase 4 — Safe AI at Scale',
    description: "Population-level signals become inputs to the governance dashboard's risk scoring, beyond facility-level checks alone",
    progress: 58,
    color: '#107C10',
  },
  {
    icon: Banknote,
    title: 'Dubai D33 — Economic Agenda',
    description: "Reduced overload events and faster gap closure directly support D33's health-sector productivity and quality-of-life targets",
    progress: 46,
    color: '#9E5A00',
  },
  {
    icon: Flag,
    title: 'Phase 5 — Health Intelligence Platform',
    description: 'This entire view is the first instrumented slice of that platform — population signal, gap detection, and capacity foresight in one place',
    progress: 31,
    color: '#5C2D91',
  },
];

const scorecardSentimentColors: Record<string, { bg: string; text: string }> = {
  good: { bg: '#F0FAF0', text: '#107C10' },
  bad: { bg: '#FFF4E0', text: '#9E5A00' },
  new: { bg: '#EAF4FF', text: '#0F6CBD' },
};

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function PopulationHealth() {
  const [activeTab, setActiveTab] = useState<SubTabId>('overview');
  const [trendMode, setTrendMode] = useState<'current' | 'yoy'>('current');

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">Live Dashboard</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Population Health Intelligence</h1>
          <p className="text-sm text-slate-500 mt-1">
            City-wide disease clustering, care-gap mapping &amp; capacity foresight · Dubai Health Ecosystem
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-medium text-slate-400">Last Updated</div>
            <div className="text-xs font-semibold text-slate-700">Today, 06:00 GST</div>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-right">
            <div className="text-xs font-medium text-slate-400">Coverage</div>
            <div className="text-xs font-semibold text-slate-700">3.8M lives · 11M+ records</div>
          </div>
        </div>
      </motion.div>

      {/* Sub-Navigation Tabs */}
      <motion.div variants={itemVariants} className="border-b border-slate-200 flex gap-0 -mb-2">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold border-b-2 transition-all duration-150 ${
                isActive
                  ? 'text-blue-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
              style={isActive ? { borderBottomColor: '#0F6CBD', color: '#0F6CBD' } : { borderBottomColor: 'transparent' }}
            >
              <Icon size={13} />
              {tab.label}
            </button>
          );
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* KPI Row */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              <MetricCard
                label="Population Covered"
                value="3.8M"
                sublabel="Across 11M+ unified records"
                delta="+9.2% YoY"
                deltaPositive
                color="#0F6CBD"
                icon={Users2}
                iconBg="#EAF4FF"
              />
              <MetricCard
                label="Active Risk Signals"
                value={14}
                sublabel="3 require urgent review"
                delta="−18% YoY"
                deltaPositive
                color="#9E5A00"
                icon={AlertTriangle}
                iconBg="#FFF4E0"
              />
              <MetricCard
                label="Chronic Disease Index"
                value="68.2"
                unit="/100"
                sublabel="+3.1 pts vs. last quarter"
                delta="+5.4 pts YoY"
                deltaPositive={false}
                color="#9E5A00"
                icon={Activity}
                iconBg="#FFF4E0"
              />
              <MetricCard
                label="Care Continuity Score"
                value="81.4"
                unit="/100"
                sublabel="+5.6 pts vs. baseline"
                delta="+11.0 pts YoY"
                deltaPositive
                color="#107C10"
                icon={HeartPulse}
                iconBg="#F0FAF0"
              />
            </div>

            {/* Trend + Risk Distribution */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <div className="xl:col-span-2 bg-white rounded-lg border border-slate-200 shadow-card p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Chronic Disease Prevalence — 12-Month Trend</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Modelled from unified NABIDH records, by condition group</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <button
                    onClick={() => setTrendMode('current')}
                    className="text-xs font-semibold px-3 py-1 rounded-full border transition-colors"
                    style={trendMode === 'current'
                      ? { backgroundColor: '#0F6CBD', color: '#fff', borderColor: '#0F6CBD' }
                      : { backgroundColor: '#F8FAFC', color: '#64748B', borderColor: '#E2E8F0' }}
                  >
                    This year
                  </button>
                  <button
                    onClick={() => setTrendMode('yoy')}
                    className="text-xs font-semibold px-3 py-1 rounded-full border transition-colors"
                    style={trendMode === 'yoy'
                      ? { backgroundColor: '#0F6CBD', color: '#fff', borderColor: '#0F6CBD' }
                      : { backgroundColor: '#F8FAFC', color: '#64748B', borderColor: '#E2E8F0' }}
                  >
                    vs. last year
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={chronicDiseaseTrendData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v}%`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', paddingTop: '10px', fontFamily: 'IBM Plex Sans' }} />
                    <Line type="monotone" dataKey="diabetes" name="Diabetes" stroke="#0F6CBD" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: '#0F6CBD' }} />
                    <Line type="monotone" dataKey="hypertension" name="Hypertension" stroke="#9E5A00" strokeWidth={2} strokeDasharray="5 3" dot={false} activeDot={{ r: 4, fill: '#9E5A00' }} />
                    <Line type="monotone" dataKey="cardiovascular" name="Cardiovascular" stroke="#D13438" strokeWidth={2} strokeDasharray="2 2" dot={false} activeDot={{ r: 4, fill: '#D13438' }} />
                    {trendMode === 'yoy' && (
                      <Line type="monotone" dataKey="diabetesPrior" name="Diabetes (last year)" stroke="#0F6CBD" strokeWidth={1.5} strokeDasharray="4 3" dot={false} />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-slate-900">District Risk Distribution</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Composite population health risk by district</p>
                </div>
                <div className="flex items-center justify-center mb-2">
                  <ResponsiveContainer width="100%" height={140}>
                    <PieChart>
                      <Pie
                        data={populationRiskDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={44}
                        outerRadius={64}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {populationRiskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [value, name]}
                        contentStyle={{ fontSize: '11px', fontFamily: 'IBM Plex Sans', border: '1px solid #E2E8F0', borderRadius: '6px', boxShadow: '0 4px 8px rgba(0,0,0,0.08)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-1.5">
                  {populationRiskDistribution.map((item) => (
                    <div key={item.category} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="text-xs text-slate-600">{item.category}</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Capability Comparison */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
              <h3 className="text-sm font-semibold text-slate-900">What This Layer Adds Beyond NABIDH Today</h3>
              <p className="text-xs text-slate-400 mt-0.5 mb-3">
                NABIDH connects and unifies records at the individual level. This layer aggregates across the population to surface patterns no single facility can see.
              </p>
              <div className="divide-y divide-slate-100">
                <div className="grid grid-cols-3 gap-3 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  <span>Capability</span>
                  <span>NABIDH Today</span>
                  <span>This Layer</span>
                </div>
                {capabilityRows.map((row) => (
                  <div key={row.capability} className="grid grid-cols-3 gap-3 py-3 items-center">
                    <span className="text-sm font-medium text-slate-700">{row.capability}</span>
                    <CapabilityTag kind={row.nabidh} />
                    <CapabilityTag kind={row.layer} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'clusters' && (
          <motion.div
            key="clusters"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Frontier Banner */}
            <div className="rounded-lg border p-4 flex items-start gap-3" style={{ backgroundColor: '#FFF4E0', borderColor: '#FDE68A' }}>
              <Lightbulb size={16} style={{ color: '#9E5A00' }} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold mb-1" style={{ color: '#9E5A00' }}>A Phase 5 capability — citywide disease cluster detection</p>
                <p className="text-xs leading-relaxed" style={{ color: '#7A4500' }}>
                  NABIDH unifies records at the individual level. No tool today clusters those records into population-level disease patterns at city scale — this view demonstrates what that looks like.
                </p>
              </div>
            </div>

            {/* Detected Clusters */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
              <h3 className="text-sm font-semibold text-slate-900">Detected Clusters — Ranked by Significance</h3>
              <p className="text-xs text-slate-400 mt-0.5">Statistically elevated concentrations vs. city baseline, last 90 days</p>
              <div className="divide-y divide-slate-100 mt-2">
                {diseaseClusters.map((c) => (
                  <div key={c.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-900">{c.cluster}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{c.district}</div>
                    </div>
                    <div className="text-right w-20 flex-shrink-0">
                      <div className="text-sm font-bold text-slate-900">+{c.vsBaseline}%</div>
                      <div className="text-xs text-slate-400">vs. baseline</div>
                    </div>
                    <div className="text-right w-20 flex-shrink-0">
                      <div className="text-sm font-bold text-slate-900">{c.confidence}%</div>
                      <div className="text-xs text-slate-400">confidence</div>
                    </div>
                    <div className="flex-shrink-0">
                      <SeverityBadge severity={c.priority} size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Drill-down + Response Pathway */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
                <h3 className="text-sm font-semibold text-slate-900">Al Karama Diabetes Cluster — Drill-Down</h3>
                <p className="text-xs text-slate-400 mt-0.5 mb-3">Age-band breakdown of the elevated signal</p>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={alKaramaClusterAgeBands} margin={{ top: 8, right: 8, left: -16, bottom: 0 }} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis dataKey="ageBand" tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v}%`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="alKarama" name="Al Karama" fill="#D13438" radius={[4, 4, 0, 0]} maxBarSize={36} />
                    <Bar dataKey="cityAverage" name="City Average" fill="#CBD5E1" radius={[4, 4, 0, 0]} maxBarSize={36} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-2 flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#D13438' }} />
                    <span className="text-xs text-slate-500">Al Karama</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#CBD5E1' }} />
                    <span className="text-xs text-slate-500">City Average</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
                <h3 className="text-sm font-semibold text-slate-900">Suggested Response Pathway</h3>
                <p className="text-xs text-slate-400 mt-0.5 mb-2">Generated from cluster characteristics</p>
                <div className="divide-y divide-slate-100">
                  {responsePathway.map((step) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.label} className="py-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EAF4FF' }}>
                          <Icon size={15} style={{ color: '#0F6CBD' }} />
                        </div>
                        <span className="text-sm font-medium text-slate-700 flex-1">{step.label}</span>
                        <span className="text-xs text-slate-400 flex-shrink-0">{step.timeframe}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'gaps' && (
          <motion.div
            key="gaps"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* KPI Row */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              <MetricCard label="Gaps Identified" value={9} sublabel="Across 6 districts" color="#D13438" icon={MapPinned} iconBg="#FBEAEA" />
              <MetricCard label="Patients Affected (est.)" value="42K" sublabel="Lapsed or missing follow-up" color="#9E5A00" icon={Users2} iconBg="#FFF4E0" />
              <MetricCard label="Avg. Care Lapse" value="5.4" unit="mo" sublabel="Since last relevant visit" color="#0F6CBD" icon={CalendarClock} iconBg="#EAF4FF" />
              <MetricCard label="Closed This Quarter" value={3} sublabel="Of 12 identified" color="#107C10" icon={CheckCircle2} iconBg="#F0FAF0" />
            </div>

            {/* Active Care Gaps */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
              <h3 className="text-sm font-semibold text-slate-900">Active Care Gaps</h3>
              <p className="text-xs text-slate-400 mt-0.5 mb-2">Identified by cross-referencing diagnosis codes against expected follow-up intervals</p>
              <div className="divide-y divide-slate-100">
                {careGaps.map((g) => (
                  <div key={g.id} className="py-3 flex items-start gap-3">
                    <AlertCircle size={15} style={{ color: '#D13438' }} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{g.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{g.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gap Closure by District */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
              <h3 className="text-sm font-semibold text-slate-900">Gap Closure by District</h3>
              <p className="text-xs text-slate-400 mt-0.5 mb-4">Share of identified gaps resolved this quarter</p>
              <div className="space-y-3.5">
                {careGapClosureByDistrict.map((d) => {
                  const pct = d.identified ? Math.round((d.closed / d.identified) * 100) : 0;
                  return (
                    <div key={d.district}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-slate-600">{d.district}</span>
                        <span className="text-xs text-slate-400">{d.closed} of {d.identified} closed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: '#0F6CBD' }}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.6 }}
                          />
                        </div>
                        <span className="text-xs font-bold w-9 text-right" style={{ color: '#0F6CBD' }}>{pct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'capacity' && (
          <motion.div
            key="capacity"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* KPI Row */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              <MetricCard label="Facilities Monitored" value="2,000+" sublabel="All NABIDH-connected sites" color="#0F6CBD" icon={Building2} iconBg="#EAF4FF" />
              <MetricCard label="30-Day Demand Forecast" value="+8.4%" sublabel="Vs. current utilisation" color="#9E5A00" icon={TrendingUp} iconBg="#FFF4E0" />
              <MetricCard label="Facilities at Risk of Overload" value={4} sublabel="Within 30 days, current trend" color="#D13438" icon={AlertTriangle} iconBg="#FBEAEA" />
              <MetricCard label="Forecast Confidence" value="82%" sublabel="Based on 12mo seasonal model" color="#107C10" icon={Gauge} iconBg="#F0FAF0" />
            </div>

            {/* Demand Forecast + Facilities Flagged */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
                <h3 className="text-sm font-semibold text-slate-900">Projected Demand — Next 30 Days</h3>
                <p className="text-xs text-slate-400 mt-0.5 mb-3">Modelled from historical NABIDH visit volume + seasonal pattern</p>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={capacityForecastData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                    <defs>
                      <linearGradient id="demandGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0F6CBD" stopOpacity={0.18} />
                        <stop offset="95%" stopColor="#0F6CBD" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[95, 112]} tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="demandIndex"
                      name="Demand Index"
                      stroke="#0F6CBD"
                      strokeWidth={2.5}
                      fill="url(#demandGrad)"
                      dot={{ fill: '#0F6CBD', r: 3 }}
                      activeDot={{ r: 5, fill: '#0F6CBD' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
                <h3 className="text-sm font-semibold text-slate-900">Facilities Flagged for Review</h3>
                <p className="text-xs text-slate-400 mt-0.5">Projected to exceed 90% capacity within 30 days</p>
                <div className="divide-y divide-slate-100 mt-2">
                  {facilityCapacityRisk.map((f) => (
                    <div key={f.facility} className="py-3 flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-slate-700">{f.facility}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-900">{f.projectedPeak}%</span>
                        <SeverityBadge severity={f.risk} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* D33 Outcomes */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
              <h3 className="text-sm font-semibold text-slate-900">Why This Matters for D33 and Value-Based Care</h3>
              <p className="text-xs text-slate-400 mt-0.5 mb-2">
                Capacity signals turn reactive resourcing into proactive planning — the difference between responding to a surge and preventing one.
              </p>
              <div className="divide-y divide-slate-100">
                {d33CapacityOutcomes.map((row) => (
                  <div key={row.outcome} className="py-3 flex items-start gap-4">
                    <span className="text-sm font-semibold text-slate-800 w-44 flex-shrink-0">{row.outcome}</span>
                    <span className="text-sm text-slate-500">{row.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'impact' && (
          <motion.div
            key="impact"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Impact Cards */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <ImpactCard
                label="Population Health Risk Index"
                value="62.4"
                comparison={<><b className="text-slate-700">2025: 68.9</b> → 2026: 62.4 <span className="font-bold" style={{ color: '#107C10' }}>↘ −9.4%</span></>}
                icon={Target}
                iconColor="#0F6CBD"
                iconBg="#EAF4FF"
              />
              <ImpactCard
                label="Care Gaps Closed (Annualised)"
                value={38}
                comparison={<><b className="text-slate-700">2025: 21</b> → 2026: 38 <span className="font-bold" style={{ color: '#107C10' }}>↗ +81%</span></>}
                icon={CheckCircle2}
                iconColor="#107C10"
                iconBg="#F0FAF0"
              />
              <ImpactCard
                label="Facility Overload Events"
                value={6}
                comparison={<><b className="text-slate-700">2025: 13</b> → 2026: 6 <span className="font-bold" style={{ color: '#107C10' }}>↘ −54%</span></>}
                icon={Building2}
                iconColor="#5C2D91"
                iconBg="#F3EFF8"
              />
            </div>

            {/* 3-Year Trend */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
              <h3 className="text-sm font-semibold text-slate-900">Three-Year Trend — Population Health Risk Index</h3>
              <p className="text-xs text-slate-400 mt-0.5 mb-3">City-wide composite risk score, lower is better, since Phase 5 instrumentation began</p>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={populationHealthImpactTrend} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="impactGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0F6CBD" stopOpacity={0.16} />
                      <stop offset="95%" stopColor="#0F6CBD" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#64748B', fontFamily: 'IBM Plex Sans', fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[50, 80]} tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="riskIndex"
                    name="Population Health Risk Index"
                    stroke="#0F6CBD"
                    strokeWidth={3}
                    fill="url(#impactGrad)"
                    dot={{ r: 5, fill: '#0F6CBD' }}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Vision Contribution */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
              <h3 className="text-sm font-semibold text-slate-900">Contribution to NABIDH's Five-Phase Vision</h3>
              <p className="text-xs text-slate-400 mt-0.5">How this layer's outputs feed the phase you're in now and the ones ahead</p>
              <div className="divide-y divide-slate-100 mt-2">
                {visionGoals.map((g) => {
                  const Icon = g.icon;
                  return (
                    <div key={g.title} className="py-4 flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${g.color}18` }}>
                        <Icon size={16} style={{ color: g.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-slate-900">{g.title}</div>
                        <p className="text-xs text-slate-500 mt-0.5 mb-2 leading-relaxed">{g.description}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: g.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${g.progress}%` }}
                              transition={{ duration: 0.6 }}
                            />
                          </div>
                          <span className="text-xs font-bold w-9 text-right" style={{ color: g.color }}>{g.progress}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* YoY Scorecard */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
              <h3 className="text-sm font-semibold text-slate-900">Year-on-Year Scorecard</h3>
              <p className="text-xs text-slate-400 mt-0.5">Full comparison across all tracked indicators</p>
              <div className="divide-y divide-slate-100 mt-2">
                <div className="grid grid-cols-6 gap-2 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  <span className="col-span-2">Indicator</span>
                  <span className="text-right">2024</span>
                  <span className="text-right">2025</span>
                  <span className="text-right">2026</span>
                  <span className="text-right">YoY</span>
                </div>
                {populationHealthScorecard.map((row) => {
                  const sc = scorecardSentimentColors[row.sentiment];
                  return (
                    <div key={row.indicator} className="grid grid-cols-6 gap-2 py-3 items-center">
                      <span className="col-span-2 text-sm font-medium text-slate-700">{row.indicator}</span>
                      <span className="text-sm text-slate-500 text-right">{row.y2024}</span>
                      <span className="text-sm text-slate-500 text-right">{row.y2025}</span>
                      <span className="text-sm font-bold text-slate-900 text-right">{row.y2026}</span>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full text-right justify-self-end"
                        style={{ backgroundColor: sc.bg, color: sc.text }}
                      >
                        {row.yoy}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
