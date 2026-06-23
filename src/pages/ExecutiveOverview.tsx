import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  ClipboardCheck, CheckCircle, Clock, BarChart3, Shield, Users,
  TrendingUp, AlertTriangle, Globe2, Heart, Activity, AlertOctagon,
  CheckCircle2, Circle,
} from 'lucide-react';
import KPICard from '../components/ui/KPICard';
import SectionHeader from '../components/ui/SectionHeader';
import KPIInsightPanel from '../components/ui/KPIInsightPanel';
import {
  governanceTrendData,
  riskDistributionData,
  solutionCategoryData,
  ecosystemRadarData,
  aiSolutions,
  liveAlertFeed,
  patientSafetyMetrics,
} from '../data/syntheticData';

const CHART_COLORS = {
  governance: '#0F6CBD',
  privacy: '#107C10',
  workforce: '#5C2D91',
  approved: '#107C10',
  risk: '#D13438',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-card-md">
        <p className="text-xs font-semibold text-slate-700 mb-2">{label}</p>
        {payload.map((entry: any, i: number) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-500">{entry.name}:</span>
            <span className="font-semibold text-slate-700">
              {typeof entry.value === 'number' && entry.value % 1 !== 0
                ? entry.value.toFixed(1)
                : entry.value}
              {entry.name?.includes('Score') || entry.name?.includes('Index') ? '' : ''}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function ExecutiveOverview() {
  const totalSolutions = 47;
  const approved = 31;
  const underReview = 8;
  const [activeInsight, setActiveInsight] = useState<string | null>(null);

  return (
    <>
    <KPIInsightPanel insightKey={activeInsight} onClose={() => setActiveInsight(null)} />
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
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">Live Dashboard</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Executive Overview</h1>
          <p className="text-sm text-slate-500 mt-1">
            Trusted AI Evaluation Framework · Q2 2024 · Dubai Health Ecosystem
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-medium text-slate-400">Last Updated</div>
            <div className="text-xs font-semibold text-slate-700">Today, 06:00 GST</div>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-right">
            <div className="text-xs font-medium text-slate-400">Reporting Cycle</div>
            <div className="text-xs font-semibold text-slate-700">Apr – Jun 2024</div>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <KPICard
            label="Solutions Evaluated"
            value={totalSolutions}
            delta={8}
            deltaLabel="this quarter"
            trend="up"
            icon={ClipboardCheck}
            iconColor="#0F6CBD"
            iconBg="#EAF4FF"
            index={0}
            onClick={() => setActiveInsight('evaluated')}
          />
          <KPICard
            label="Solutions Approved"
            value={approved}
            delta={5}
            deltaLabel="this quarter"
            trend="up"
            icon={CheckCircle}
            iconColor="#107C10"
            iconBg="#F0FAF0"
            index={1}
            onClick={() => setActiveInsight('approved')}
          />
          <KPICard
            label="Under Review"
            value={underReview}
            sublabel="3 require urgent action"
            trend="neutral"
            icon={Clock}
            iconColor="#9E5A00"
            iconBg="#FFF4E0"
            index={2}
            onClick={() => setActiveInsight('review')}
          />
          <KPICard
            label="Avg Governance Score"
            value="82.4"
            unit="/100"
            delta={14.2}
            deltaLabel="vs. baseline"
            trend="up"
            icon={BarChart3}
            iconColor="#5C2D91"
            iconBg="#F3EFF8"
            index={3}
            onClick={() => setActiveInsight('governance')}
          />
          <KPICard
            label="Privacy Posture Score"
            value="87.6"
            unit="/100"
            delta={16.4}
            deltaLabel="vs. baseline"
            trend="up"
            icon={Shield}
            iconColor="#0078D4"
            iconBg="#EAF4FF"
            index={4}
            onClick={() => setActiveInsight('privacy')}
          />
          <KPICard
            label="Workforce Readiness"
            value="74.2"
            unit="/100"
            delta={19.4}
            deltaLabel="vs. baseline"
            trend="up"
            icon={Users}
            iconColor="#107C10"
            iconBg="#F0FAF0"
            index={5}
            onClick={() => setActiveInsight('workforce')}
          />
        </div>
      </motion.div>

      {/* Row 2: Governance Trend + Risk Distribution */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Governance Maturity Trend */}
        <div className="xl:col-span-2 bg-white rounded-lg border border-slate-200 shadow-card p-5">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Governance Maturity Trend</h3>
              <p className="text-xs text-slate-400 mt-0.5">12-month trajectory across key governance dimensions</p>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#F0FAF0', color: '#107C10' }}>
              <TrendingUp size={11} />
              +14.2 pts YTD
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={governanceTrendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="govGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F6CBD" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#0F6CBD" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="privGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#107C10" stopOpacity={0.10} />
                  <stop offset="95%" stopColor="#107C10" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="wfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5C2D91" stopOpacity={0.08} />
                  <stop offset="95%" stopColor="#5C2D91" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="monthShort"
                tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[50, 100]}
                tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '11px', paddingTop: '12px', fontFamily: 'IBM Plex Sans' }}
              />
              <Area
                type="monotone"
                dataKey="governanceScore"
                name="Governance Score"
                stroke={CHART_COLORS.governance}
                strokeWidth={2.5}
                fill="url(#govGrad)"
                dot={false}
                activeDot={{ r: 4, fill: CHART_COLORS.governance }}
              />
              <Area
                type="monotone"
                dataKey="privacyScore"
                name="Privacy Score"
                stroke={CHART_COLORS.privacy}
                strokeWidth={2}
                fill="url(#privGrad)"
                dot={false}
                activeDot={{ r: 4, fill: CHART_COLORS.privacy }}
              />
              <Area
                type="monotone"
                dataKey="workforceReadiness"
                name="Workforce Readiness"
                stroke={CHART_COLORS.workforce}
                strokeWidth={2}
                fill="url(#wfGrad)"
                dot={false}
                activeDot={{ r: 4, fill: CHART_COLORS.workforce }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-slate-900">Risk Distribution</h3>
            <p className="text-xs text-slate-400 mt-0.5">AI solutions by risk classification</p>
          </div>
          <div className="space-y-2.5">
            {riskDistributionData.map((item) => {
              const pct = Math.round((item.value / totalSolutions) * 100);
              return (
                <div key={item.category}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-xs font-medium text-slate-600">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{item.value}</span>
                      <span className="text-xs text-slate-400 w-8 text-right">{pct}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-start gap-2 p-3 rounded-md" style={{ backgroundColor: '#FFF4E0' }}>
              <AlertTriangle size={13} style={{ color: '#9E5A00' }} className="mt-0.5 flex-shrink-0" />
              <p className="text-xs leading-relaxed" style={{ color: '#9E5A00' }}>
                <strong>3 critical risk solutions</strong> require immediate governance board attention before Q3 deployment decisions.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Row 3: Adoption Trend + Categories + Ecosystem Radar */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* AI Adoption Trend */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">AI Adoption Trend</h3>
              <p className="text-xs text-slate-400 mt-0.5">Approved solutions deployed monthly</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={governanceTrendData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="monthShort"
                tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="activeDeployments"
                name="Active Deployments"
                stroke="#0F6CBD"
                strokeWidth={2.5}
                dot={{ fill: '#0F6CBD', r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="approvedSolutions"
                name="Approved Solutions"
                stroke="#107C10"
                strokeWidth={2}
                dot={{ fill: '#107C10', r: 2.5 }}
                strokeDasharray="4 2"
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-3 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-0.5 bg-blue-600 rounded" />
              <span className="text-xs text-slate-500">Active Deployments</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-0.5 bg-green-700 rounded" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #107C10 0px, #107C10 3px, transparent 3px, transparent 6px)' }} />
              <span className="text-xs text-slate-500">Approved Solutions</span>
            </div>
          </div>
        </div>

        {/* Solution Categories */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-900">Solution Categories</h3>
            <p className="text-xs text-slate-400 mt-0.5">Distribution across clinical domains</p>
          </div>
          <div className="flex items-center justify-center mb-2">
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={solutionCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={44}
                  outerRadius={64}
                  paddingAngle={2}
                  dataKey="count"
                >
                  {solutionCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [value, name]}
                  contentStyle={{
                    fontSize: '11px',
                    fontFamily: 'IBM Plex Sans',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5">
            {solutionCategoryData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-slate-600">{item.name}</span>
                </div>
                <span className="text-xs font-semibold text-slate-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ecosystem Readiness Radar */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-slate-900">Ecosystem Readiness Index</h3>
            <p className="text-xs text-slate-400 mt-0.5">vs. target benchmark</p>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <RadarChart data={ecosystemRadarData} margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
              <PolarGrid stroke="#F1F5F9" />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'IBM Plex Sans' }}
              />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="DHA Score"
                dataKey="score"
                stroke="#0F6CBD"
                fill="#0F6CBD"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Radar
                name="Benchmark"
                dataKey="benchmark"
                stroke="#CBD5E1"
                fill="#CBD5E1"
                fillOpacity={0.08}
                strokeWidth={1.5}
                strokeDasharray="4 2"
              />
              <Legend
                iconSize={8}
                wrapperStyle={{ fontSize: '10.5px', fontFamily: 'IBM Plex Sans' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Row 4: Recent Activity Summary */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* Recent Assessments */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Recent Assessments</h3>
              <p className="text-xs text-slate-400 mt-0.5">Latest AI solution governance outcomes</p>
            </div>
            <Globe2 size={15} className="text-slate-400" />
          </div>
          <div className="divide-y divide-slate-100">
            {aiSolutions.slice(0, 5).map((solution) => {
              const statusColors: Record<string, { bg: string; text: string; label: string }> = {
                approved: { bg: '#F0FAF0', text: '#107C10', label: 'Approved' },
                approved_with_conditions: { bg: '#FFF4E0', text: '#9E5A00', label: 'Conditional' },
                requires_remediation: { bg: '#FEF2F0', text: '#C13515', label: 'Remediation' },
                rejected: { bg: '#FBEAEA', text: '#D13438', label: 'Rejected' },
                under_review: { bg: '#EAF4FF', text: '#0078D4', label: 'Under Review' },
              };
              const sc = statusColors[solution.status];
              const scoreColor = solution.overallScore >= 85 ? '#107C10' : solution.overallScore >= 75 ? '#0F6CBD' : solution.overallScore >= 65 ? '#9E5A00' : '#D13438';

              return (
                <div key={solution.id} className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 truncate">{solution.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5 truncate">{solution.vendor} · {solution.category}</div>
                  </div>
                  <div className="flex items-center gap-3 ml-3">
                    <span className="text-sm font-bold" style={{ color: scoreColor }}>{solution.overallScore}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: sc.bg, color: sc.text }}>
                      {sc.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="px-5 py-3 border-t border-slate-100">
            <button className="text-xs font-medium hover:underline" style={{ color: '#0F6CBD' }}>
              View all 47 solutions →
            </button>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Executive Summary</h3>
            <p className="text-xs text-slate-400 mt-0.5">Q2 2024 Governance Board Narrative</p>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex gap-3">
              <div className="w-1 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: '#107C10', minHeight: '48px' }} />
              <div>
                <div className="text-xs font-semibold text-slate-700 mb-1">Governance Acceleration</div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  The DHA ecosystem achieved a 14.2-point governance maturity improvement over 12 months, exceeding the annual target of 10 points. 31 AI solutions are now approved for clinical deployment, supporting an estimated 1,164 daily active users across 4 facilities.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: '#FFB900', minHeight: '48px' }} />
              <div>
                <div className="text-xs font-semibold text-slate-700 mb-1">Priority Actions Required</div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Three high-priority items require board attention: ChronicCare Analytics remediation (data sovereignty), the Community Health Network workforce gap (28 points below average), and resolution of 4 open privacy incidents including 2 classified as high severity.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: '#0F6CBD', minHeight: '40px' }} />
              <div>
                <div className="text-xs font-semibold text-slate-700 mb-1">Q3 Outlook</div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  8 additional solutions are in the evaluation pipeline for Q3 approval. Workforce readiness remains the primary constraint on AI adoption velocity across the ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Row 5 — Patient Safety Impact + Live Alert Feed */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-5 gap-4 pb-6">

        {/* Patient Safety Impact */}
        <div className="xl:col-span-3 rounded-lg border overflow-hidden" style={{ borderColor: '#BFDBFE', background: 'linear-gradient(135deg, #EAF4FF 0%, #F0FAF0 100%)' }}>
          <div className="px-5 pt-5 pb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D13438' }}>
                <Heart size={18} className="text-white" fill="white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Patient Safety Impact</h3>
                <p className="text-xs text-slate-500 mt-0.5">Governance interventions protecting patient care</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: '#F0FAF0', color: '#107C10' }}>
              Q2 2024
            </span>
          </div>

          <div className="grid grid-cols-3 gap-px bg-blue-100 mx-5 mb-5 rounded-xl overflow-hidden">
            <div className="bg-white px-4 py-4 text-center">
              <div className="text-3xl font-bold text-slate-900">{patientSafetyMetrics.patientEncountersProtected.toLocaleString()}</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Patient Encounters</div>
              <div className="text-xs text-slate-400 mt-0.5">Protected by governance</div>
            </div>
            <div className="bg-white px-4 py-4 text-center">
              <div className="text-3xl font-bold text-slate-900">{patientSafetyMetrics.privacyRecordsProtected.toLocaleString()}</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Privacy Records</div>
              <div className="text-xs text-slate-400 mt-0.5">Secured via rapid response</div>
            </div>
            <div className="bg-white px-4 py-4 text-center">
              <div className="text-3xl font-bold text-slate-900">{patientSafetyMetrics.adverseEventsAvoided}</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Adverse Events</div>
              <div className="text-xs text-slate-400 mt-0.5">Prevented by AI screening</div>
            </div>
          </div>

          <div className="mx-5 mb-5 p-3.5 rounded-lg flex items-start gap-2.5" style={{ backgroundColor: 'rgba(255,255,255,0.7)', border: '1px solid #BFDBFE' }}>
            <AlertOctagon size={13} style={{ color: '#0F6CBD' }} className="mt-0.5 flex-shrink-0" />
            <p className="text-xs text-slate-600 leading-relaxed">
              The DHA governance framework <strong>prevented deployment</strong> of ChronicCare Analytics (data sovereignty breach) and two other high-risk solutions with collective access to{' '}
              <strong>14,200+ patient encounters</strong>. Estimated clinical safety value:{' '}
              <strong>AED 4.8M</strong>.
            </p>
          </div>
        </div>

        {/* Live Governance Feed */}
        <div className="xl:col-span-2 bg-white rounded-lg border border-slate-200 shadow-card flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <h3 className="text-sm font-semibold text-slate-900">Live · Governance Feed</h3>
            </div>
            <Activity size={14} className="text-slate-400" />
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-50" style={{ maxHeight: '260px' }}>
            {liveAlertFeed.slice(0, 6).map((alert) => {
              const severityConfig = {
                critical: { color: '#D13438', bg: '#FEF2F0', label: 'Critical' },
                high: { color: '#C13515', bg: '#FFF1EC', label: 'High' },
                medium: { color: '#9E5A00', bg: '#FFF4E0', label: 'Medium' },
                low: { color: '#107C10', bg: '#F0FAF0', label: 'Low' },
              }[alert.severity];

              const statusIcon = alert.status === 'resolved'
                ? <CheckCircle2 size={11} style={{ color: '#107C10' }} />
                : alert.status === 'active'
                ? <Circle size={11} style={{ color: '#D13438' }} className="fill-current" />
                : <Circle size={11} style={{ color: '#9E5A00' }} />;

              return (
                <div key={alert.id} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span
                      className="text-xs font-semibold px-1.5 py-0.5 rounded flex-shrink-0"
                      style={{ backgroundColor: severityConfig.bg, color: severityConfig.color }}
                    >
                      {severityConfig.label}
                    </span>
                    <span className="text-xs text-slate-400 flex-shrink-0">{alert.time}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed line-clamp-2">{alert.message}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {statusIcon}
                    <span className="text-xs text-slate-400">{alert.facility} · {alert.system}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-4 py-3 border-t border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-slate-400">Auto-refreshing · Risk Command Center</span>
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
    </>
  );
}
