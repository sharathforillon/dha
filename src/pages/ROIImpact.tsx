import { motion } from 'framer-motion';
import {
  BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine, Cell,
} from 'recharts';
import {
  DollarSign, ShieldCheck, TrendingUp, Zap,
  Heart, AlertTriangle, ArrowRight,
} from 'lucide-react';
import {
  roiValueCategories,
  roiProjectionData,
  efficiencyComparisons,
  patientSafetyMetrics,
  valueTimelineData,
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

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

interface TooltipPayloadEntry {
  color: string;
  name: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs shadow-lg">
        <p className="font-semibold text-slate-700 mb-2">{label}</p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-500">{entry.name}:</span>
            <span className="font-semibold text-slate-700">
              {typeof entry.value === 'number' ? `AED ${entry.value.toFixed(1)}M` : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const TimelineTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum, e) => sum + (e.value || 0), 0);
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs shadow-lg">
        <p className="font-semibold text-slate-700 mb-2">{label}</p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-500 capitalize">{entry.name}:</span>
            <span className="font-semibold text-slate-700">AED {entry.value?.toFixed(1)}M</span>
          </div>
        ))}
        <div className="border-t border-slate-100 mt-2 pt-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-400 flex-shrink-0" />
          <span className="text-slate-500">Total:</span>
          <span className="font-bold text-slate-800">AED {total.toFixed(1)}M</span>
        </div>
      </div>
    );
  }
  return null;
};

const CategoryTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs shadow-lg">
        <p className="font-semibold text-slate-700 mb-1">{label}</p>
        <p className="text-slate-500">
          Value: <span className="font-bold text-slate-800">AED {payload[0].value?.toFixed(1)}M</span>
        </p>
      </div>
    );
  }
  return null;
};

// ─── KPI Card ─────────────────────────────────────────────────────────────────

interface KPIInlineCardProps {
  label: string;
  value: string;
  deltaLabel: string;
  deltaPositive?: boolean;
  sublabel: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  valueColor: string;
}

const KPIInlineCard = ({
  label,
  value,
  deltaLabel,
  deltaPositive = true,
  sublabel,
  icon: Icon,
  iconColor,
  iconBg,
  valueColor,
}: KPIInlineCardProps) => (
  <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5 flex flex-col gap-3">
    <div className="flex items-start justify-between">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={18} style={{ color: iconColor }} />
      </div>
      <span
        className="text-xs font-semibold px-2 py-0.5 rounded-full"
        style={{
          backgroundColor: deltaPositive ? '#F0FAF0' : '#FEF2F0',
          color: deltaPositive ? '#107C10' : '#D13438',
        }}
      >
        {deltaLabel}
      </span>
    </div>
    <div>
      <div className="text-3xl font-bold tracking-tight leading-none" style={{ color: valueColor }}>
        {value}
      </div>
      <div className="text-xs font-medium text-slate-400 mt-1">{label}</div>
    </div>
    <div className="text-xs text-slate-500 border-t border-slate-100 pt-2.5">{sublabel}</div>
  </div>
);

// ─── Custom Y-Axis Tick for Category Chart ────────────────────────────────────

interface CategoryTickProps {
  x?: number;
  y?: number;
  payload?: { value: string };
}

const CategoryYAxisTick = ({ x = 0, y = 0, payload }: CategoryTickProps) => {
  if (!payload) return null;
  const words = payload.value.split(' ');
  const lineHeight = 13;
  const totalLines = words.length > 3
    ? [words.slice(0, 2).join(' '), words.slice(2).join(' ')]
    : words.length > 2
    ? [words.slice(0, 2).join(' '), words.slice(2).join(' ')]
    : [payload.value];

  return (
    <g transform={`translate(${x},${y})`}>
      {totalLines.map((line, i) => (
        <text
          key={i}
          x={0}
          y={i * lineHeight - ((totalLines.length - 1) * lineHeight) / 2}
          textAnchor="end"
          fill="#64748B"
          fontSize={10}
          fontFamily="IBM Plex Sans"
        >
          {line}
        </text>
      ))}
    </g>
  );
};

// ─── Cumulative ROI Line ──────────────────────────────────────────────────────

// Compute cumulative net values aligned to bar positions for a reference line
const cumulativeData = (() => {
  let running = 0;
  return roiProjectionData.map((d) => {
    running += d.net;
    return { year: d.year, cumulative: parseFloat(running.toFixed(1)) };
  });
})();

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ROIImpact() {
  const totalValue = roiValueCategories.reduce((s, c) => s + c.value, 0);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6 bg-slate-50 min-h-screen font-sans"
    >
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <motion.div variants={itemVariants} className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">
              Value Dashboard
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            ROI &amp; Impact Analysis
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Quantified governance value · 2023–2026 · Dubai Health AI Framework
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-medium text-slate-400">Measurement Period</div>
            <div className="text-xs font-semibold text-slate-700">Jan 2023 – Dec 2024</div>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-right">
            <div className="text-xs font-medium text-slate-400">Base Investment</div>
            <div className="text-xs font-semibold text-slate-700">AED 9.8M (2024)</div>
          </div>
        </div>
      </motion.div>

      {/* ── Row 1 — KPI Cards ───────────────────────────────────────────────── */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <KPIInlineCard
          label="Total Value Generated"
          value="AED 47.2M"
          deltaLabel="+39.4% vs prior year"
          deltaPositive
          sublabel="Across efficiency, risk, compliance &amp; safety domains"
          icon={DollarSign}
          iconColor="#107C10"
          iconBg="#F0FAF0"
          valueColor="#107C10"
        />
        <KPIInlineCard
          label="Risk Cost Avoided"
          value="AED 12.4M"
          deltaLabel="3 solutions flagged"
          deltaPositive
          sublabel="From 3 rejected / flagged high-risk AI tools"
          icon={ShieldCheck}
          iconColor="#0F6CBD"
          iconBg="#EAF4FF"
          valueColor="#0F6CBD"
        />
        <KPIInlineCard
          label="ROI Multiple"
          value="4.8×"
          deltaLabel="On AED 9.8M invested"
          deltaPositive
          sublabel="On AED 9.8M governance investment in 2024"
          icon={TrendingUp}
          iconColor="#5C2D91"
          iconBg="#F3EFF8"
          valueColor="#5C2D91"
        />
        <KPIInlineCard
          label="Review Acceleration"
          value="74%"
          deltaLabel="38 days → 10 days avg."
          deltaPositive
          sublabel="Average review cycle reduced from 38 to 10 days"
          icon={Zap}
          iconColor="#9E5A00"
          iconBg="#FFF4E0"
          valueColor="#9E5A00"
        />
      </motion.div>

      {/* ── Row 2 — Projection + Value by Category ───────────────────────────── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Left: 3-Year Value Projection */}
        <div className="xl:col-span-2 bg-white rounded-lg border border-slate-200 shadow-card p-5">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">3-Year Value Projection</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Investment vs. net returns in AED millions · 2023–2026
              </p>
            </div>
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: '#F0FAF0', color: '#107C10' }}
            >
              <TrendingUp size={11} />
              AED 247.7M cumulative net value by 2026
            </div>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={roiProjectionData}
              margin={{ top: 8, right: 16, left: -12, bottom: 0 }}
              barCategoryGap="28%"
              barGap={4}
            >
              <defs>
                <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#107C10" stopOpacity={1} />
                  <stop offset="100%" stopColor="#0D5F0D" stopOpacity={0.85} />
                </linearGradient>
                <linearGradient id="invGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#CBD5E1" stopOpacity={1} />
                  <stop offset="100%" stopColor="#94A3B8" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 12, fill: '#64748B', fontFamily: 'IBM Plex Sans', fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${v}`}
                label={{
                  value: 'AED (M)',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 18,
                  style: { fontSize: 10, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '11px', paddingTop: '14px', fontFamily: 'IBM Plex Sans' }}
              />
              <Bar dataKey="investment" name="Investment" fill="url(#invGrad)" radius={[4, 4, 0, 0]} maxBarSize={52} />
              <Bar dataKey="net" name="Net Returns" fill="url(#netGrad)" radius={[4, 4, 0, 0]} maxBarSize={52} />
              {/* Cumulative reference markers */}
              {cumulativeData.map((d) => (
                <ReferenceLine
                  key={d.year}
                  x={d.year}
                  stroke="transparent"
                  label={{
                    value: `${d.cumulative}M`,
                    position: 'top',
                    fontSize: 9,
                    fill: '#5C2D91',
                    fontFamily: 'IBM Plex Sans',
                    fontWeight: 700,
                  }}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 flex items-center gap-2 px-3 py-2.5 rounded-md" style={{ backgroundColor: '#F3EFF8' }}>
            <TrendingUp size={13} style={{ color: '#5C2D91' }} className="flex-shrink-0" />
            <p className="text-xs font-medium" style={{ color: '#5C2D91' }}>
              Cumulative net value label shown above each year. Projected AED 247.7M total net value by end of 2026, representing a 30× return on cumulative governance investment.
            </p>
          </div>
        </div>

        {/* Right: Value by Category */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-slate-900">Value by Category</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              AED {totalValue.toFixed(1)}M total · 2024 realised value
            </p>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={roiValueCategories}
              layout="vertical"
              margin={{ top: 4, right: 52, left: 4, bottom: 4 }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${v}`}
              />
              <YAxis
                type="category"
                dataKey="category"
                width={140}
                tick={<CategoryYAxisTick />}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CategoryTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={20} label={{
                position: 'right',
                formatter: (v: number) => `AED ${v}M`,
                fontSize: 10,
                fill: '#334155',
                fontFamily: 'IBM Plex Sans',
                fontWeight: 600,
              }}>
                {roiValueCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Legend dots */}
          <div className="mt-3 space-y-1.5 pt-2 border-t border-slate-100">
            {roiValueCategories.map((cat) => (
              <div key={cat.category} className="flex items-start gap-2">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                  style={{ backgroundColor: cat.color }}
                />
                <p className="text-xs text-slate-500 leading-tight">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Row 3 — Value Accumulation Timeline ─────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Monthly Value Accumulation</h3>
              <p className="text-xs text-slate-400 mt-0.5">Value Realised by Month · 2024</p>
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              style={{ backgroundColor: '#EAF4FF', color: '#0F6CBD' }}
            >
              AED 47.2M Total
            </div>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={valueTimelineData}
              margin={{ top: 4, right: 8, left: -12, bottom: 0 }}
            >
              <defs>
                <linearGradient id="efficiencyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#107C10" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#107C10" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F6CBD" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0F6CBD" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="complianceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5C2D91" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#5C2D91" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${v}`}
                label={{
                  value: 'AED (M)',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 18,
                  style: { fontSize: 10, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' },
                }}
              />
              <Tooltip content={<TimelineTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '11px', paddingTop: '10px', fontFamily: 'IBM Plex Sans' }}
              />
              <Area
                type="monotone"
                dataKey="efficiency"
                name="Efficiency"
                stroke="#107C10"
                strokeWidth={2.5}
                fill="url(#efficiencyGrad)"
                dot={false}
                activeDot={{ r: 4, fill: '#107C10' }}
              />
              <Area
                type="monotone"
                dataKey="risk"
                name="Risk Avoidance"
                stroke="#0F6CBD"
                strokeWidth={2}
                fill="url(#riskGrad)"
                dot={false}
                activeDot={{ r: 4, fill: '#0F6CBD' }}
              />
              <Area
                type="monotone"
                dataKey="compliance"
                name="Compliance"
                stroke="#5C2D91"
                strokeWidth={2}
                fill="url(#complianceGrad)"
                dot={false}
                activeDot={{ r: 4, fill: '#5C2D91' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* ── Row 4 — Efficiency Gains + Patient Safety ─────────────────────── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* Left: Before / After Efficiency */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-slate-900">Before / After Efficiency Gains</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Key operational metrics — baseline vs. post-framework deployment
            </p>
          </div>

          <div className="space-y-0 divide-y divide-slate-50">
            {efficiencyComparisons.map((item, idx) => {
              const improved = item.betterIsLower
                ? item.after < item.before
                : item.after > item.before;
              const delta = item.betterIsLower
                ? (((item.before - item.after) / item.before) * 100).toFixed(0)
                : (((item.after - item.before) / item.before) * 100).toFixed(0);
              const absDelta = item.betterIsLower
                ? item.before - item.after
                : item.after - item.before;

              return (
                <div key={idx} className="flex items-center justify-between py-3.5">
                  {/* Metric label */}
                  <div className="w-44 flex-shrink-0">
                    <p className="text-xs font-semibold text-slate-700 leading-tight">{item.metric}</p>
                  </div>

                  {/* Before → After */}
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-sm font-semibold text-slate-400 tabular-nums">
                      {item.before}{item.unit}
                    </span>
                    <ArrowRight size={13} className="text-slate-300 flex-shrink-0" />
                    <span
                      className="text-sm font-bold tabular-nums"
                      style={{ color: improved ? '#107C10' : '#D13438' }}
                    >
                      {item.after}{item.unit}
                    </span>
                  </div>

                  {/* Delta badge */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: improved ? '#F0FAF0' : '#FEF2F0',
                        color: improved ? '#107C10' : '#D13438',
                      }}
                    >
                      {improved ? '+' : '-'}{Math.abs(parseFloat(delta))}%
                    </span>
                    <span className="text-xs text-slate-400">
                      ({item.betterIsLower ? '-' : '+'}{absDelta.toFixed(absDelta % 1 === 0 ? 0 : 1)}{item.unit})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary bar */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Average improvement across all metrics</span>
              <span className="font-bold text-green-700">+68.4% composite gain</span>
            </div>
            <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: '#107C10' }}
                initial={{ width: 0 }}
                animate={{ width: '68%' }}
                transition={{ duration: 0.9, delay: 0.4 }}
              />
            </div>
          </div>
        </div>

        {/* Right: Patient Safety Impact */}
        <div
          className="rounded-lg border border-blue-100 shadow-card p-5 flex flex-col"
          style={{ background: 'linear-gradient(145deg, #EAF4FF 0%, #ffffff 60%)' }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#EAF4FF' }}
                >
                  <Heart size={16} style={{ color: '#0F6CBD' }} />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">Patient Safety Impact</h3>
              </div>
              <p className="text-xs text-slate-400 ml-10">
                Lives &amp; records protected by the DHA governance framework
              </p>
            </div>
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: '#FBEAEA', color: '#D13438' }}
            >
              {patientSafetyMetrics.highRiskFlagged} solutions blocked
            </span>
          </div>

          {/* 3-stat grid */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {/* Encounters */}
            <div className="bg-white rounded-lg border border-blue-100 p-3 text-center shadow-sm">
              <div
                className="text-2xl font-bold leading-none mb-1"
                style={{ color: '#0F6CBD' }}
              >
                {patientSafetyMetrics.patientEncountersProtected.toLocaleString()}
              </div>
              <div className="text-xs font-semibold text-slate-700 mb-1">Patient Encounters</div>
              <div className="text-xs text-slate-400 leading-tight">Protected from 3 rejected / flagged AI tools</div>
            </div>

            {/* Privacy records */}
            <div className="bg-white rounded-lg border border-purple-100 p-3 text-center shadow-sm">
              <div
                className="text-2xl font-bold leading-none mb-1"
                style={{ color: '#5C2D91' }}
              >
                {patientSafetyMetrics.privacyRecordsProtected.toLocaleString()}
              </div>
              <div className="text-xs font-semibold text-slate-700 mb-1">Privacy Records</div>
              <div className="text-xs text-slate-400 leading-tight">Secured via PI-2024-089 intervention</div>
            </div>

            {/* Adverse events */}
            <div className="bg-white rounded-lg border border-green-100 p-3 text-center shadow-sm">
              <div
                className="text-2xl font-bold leading-none mb-1"
                style={{ color: '#107C10' }}
              >
                {patientSafetyMetrics.adverseEventsAvoided}
              </div>
              <div className="text-xs font-semibold text-slate-700 mb-1">Adverse Events</div>
              <div className="text-xs text-slate-400 leading-tight">Avoided via clinical safety interventions</div>
            </div>
          </div>

          {/* Estimated value callout */}
          <div
            className="flex items-center justify-between rounded-lg px-4 py-3 mb-4"
            style={{ backgroundColor: '#F0FAF0', border: '1px solid #C3E6CB' }}
          >
            <div className="flex items-center gap-2">
              <DollarSign size={15} style={{ color: '#107C10' }} />
              <span className="text-xs font-semibold text-slate-700">
                Estimated clinical safety value
              </span>
            </div>
            <span className="text-base font-bold" style={{ color: '#107C10' }}>
              AED 4.8M
            </span>
          </div>

          {/* Alert box */}
          <div
            className="flex gap-3 rounded-lg p-3.5 flex-1"
            style={{ backgroundColor: '#FFF4E0', border: '1px solid #FFD580' }}
          >
            <AlertTriangle
              size={15}
              style={{ color: '#9E5A00' }}
              className="flex-shrink-0 mt-0.5"
            />
            <div>
              <p className="text-xs font-bold mb-1" style={{ color: '#9E5A00' }}>
                Governance Intervention Notice
              </p>
              <p className="text-xs leading-relaxed" style={{ color: '#7A4500' }}>
                The DHA governance framework prevented deployment of{' '}
                <strong>ChronicCare Analytics</strong> (data sovereignty breach) and two other
                high-risk solutions that collectively had access to{' '}
                <strong>14,200+ patient encounters</strong>. Without this framework, these
                tools would have processed patient data on non-UAE infrastructure in violation
                of UAE PDPL and NABIDH data residency requirements.
              </p>
            </div>
          </div>

          {/* Screened solutions footer */}
          <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-center">
                <div className="text-lg font-bold text-slate-800">{patientSafetyMetrics.solutionsScreened}</div>
                <div className="text-xs text-slate-400">Solutions Screened</div>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center">
                <div className="text-lg font-bold" style={{ color: '#D13438' }}>
                  {patientSafetyMetrics.highRiskFlagged}
                </div>
                <div className="text-xs text-slate-400">High-Risk Flagged</div>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center">
                <div className="text-lg font-bold" style={{ color: '#107C10' }}>
                  {patientSafetyMetrics.solutionsScreened - patientSafetyMetrics.highRiskFlagged}
                </div>
                <div className="text-xs text-slate-400">Safely Approved</div>
              </div>
            </div>
            <div
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: '#EAF4FF', color: '#0F6CBD' }}
            >
              {((patientSafetyMetrics.solutionsScreened - patientSafetyMetrics.highRiskFlagged) / patientSafetyMetrics.solutionsScreened * 100).toFixed(0)}% pass rate
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
