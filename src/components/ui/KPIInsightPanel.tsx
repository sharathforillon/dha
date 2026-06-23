import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

interface InsightConfig {
  title: string;
  subtitle: string;
  accentColor: string;
  summary: string;
  sections: InsightSection[];
}

interface InsightSection {
  label: string;
  type: 'chart-bar' | 'chart-line' | 'stat-grid' | 'list';
  data?: any[];
  stats?: StatItem[];
  items?: ListItem[];
}

interface StatItem {
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
}

interface ListItem {
  name: string;
  value: string | number;
  tag?: string;
  tagColor?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-card-md text-xs">
        <p className="font-semibold text-slate-600 mb-1">{label}</p>
        {payload.map((e: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: e.fill || e.stroke }} />
            <span className="text-slate-500">{e.name ?? e.dataKey}:</span>
            <span className="font-bold text-slate-800">{e.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const insightData: Record<string, InsightConfig> = {
  evaluated: {
    title: 'Solutions Evaluated',
    subtitle: 'Submission pipeline and evaluation throughput',
    accentColor: '#0F6CBD',
    summary: '47 AI solutions have entered the evaluation pipeline this cycle, up 21% on Q1 2024. Evaluation throughput has improved to an average of 6.2 solutions per month.',
    sections: [
      {
        label: 'Monthly Submission Volume',
        type: 'chart-bar',
        data: [
          { month: 'Jan', submissions: 3 },
          { month: 'Feb', submissions: 4 },
          { month: 'Mar', submissions: 5 },
          { month: 'Apr', submissions: 6 },
          { month: 'May', submissions: 7 },
          { month: 'Jun', submissions: 8 },
          { month: 'Jul', submissions: 5 },
          { month: 'Aug', submissions: 6 },
          { month: 'Sep', submissions: 7 },
          { month: 'Oct', submissions: 8 },
          { month: 'Nov', submissions: 9 },
          { month: 'Dec', submissions: 9 },
        ],
      },
      {
        label: 'Pipeline Breakdown',
        type: 'stat-grid',
        stats: [
          { label: 'Approved', value: '31', delta: '+5 this quarter', positive: true },
          { label: 'Conditional', value: '2', delta: 'Conditions pending', positive: false },
          { label: 'Under Review', value: '8', delta: 'Avg 34 days open' },
          { label: 'Remediation', value: '1', delta: 'Returned to vendor', positive: false },
          { label: 'Withdrawn', value: '3', delta: 'Vendor-initiated' },
          { label: 'Avg Review Time', value: '38d', delta: '-12d vs Q1', positive: true },
        ],
      },
    ],
  },
  approved: {
    title: 'Solutions Approved',
    subtitle: 'Approval outcomes and category coverage',
    accentColor: '#107C10',
    summary: '31 AI solutions carry active approval status — a 66% approval rate across all evaluated solutions. Clinical Documentation and Diagnostic AI lead adoption.',
    sections: [
      {
        label: 'Approvals by Category',
        type: 'chart-bar',
        data: [
          { category: 'Clinical Doc', count: 10, fill: '#0F6CBD' },
          { category: 'Diagnostic', count: 7, fill: '#107C10' },
          { category: 'Patient Eng.', count: 5, fill: '#5C2D91' },
          { category: 'Analytics', count: 6, fill: '#00B7C3' },
          { category: 'Med Safety', count: 3, fill: '#FFB900' },
        ],
      },
      {
        label: 'Recent Approvals',
        type: 'list',
        items: [
          { name: 'RadiologyAI Dx', value: '91/100', tag: 'Full Approval', tagColor: '#107C10' },
          { name: 'ClinDoc Copilot', value: '89/100', tag: 'Full Approval', tagColor: '#107C10' },
          { name: 'MedSafe Intelligence', value: '88/100', tag: 'Full Approval', tagColor: '#107C10' },
          { name: 'PatientConnect IQ', value: '82/100', tag: 'Conditional', tagColor: '#9E5A00' },
          { name: 'ClearScribe Pro', value: '76/100', tag: 'Conditional', tagColor: '#9E5A00' },
        ],
      },
    ],
  },
  review: {
    title: 'Solutions Under Review',
    subtitle: 'Active assessments and expected decisions',
    accentColor: '#9E5A00',
    summary: '8 solutions are currently in the active evaluation queue. 3 require urgent board attention — 2 are overdue against target review timelines.',
    sections: [
      {
        label: 'Review Queue — Days Open',
        type: 'chart-bar',
        data: [
          { solution: 'SurgPlan AI', days: 32, fill: '#FFB900' },
          { solution: 'ChronicCare', days: 6, fill: '#107C10' },
          { solution: 'NurseAssist', days: 41, fill: '#D13438' },
          { solution: 'Triage.AI', days: 28, fill: '#FFB900' },
          { solution: 'OptiPharm', days: 19, fill: '#107C10' },
          { solution: 'WoundCare AI', days: 52, fill: '#D13438' },
          { solution: 'DermaDx', days: 14, fill: '#107C10' },
          { solution: 'HeartFlow', days: 38, fill: '#FFB900' },
        ],
      },
      {
        label: 'Review Status Breakdown',
        type: 'stat-grid',
        stats: [
          { label: 'On Schedule', value: '4', delta: 'Within 45-day SLA', positive: true },
          { label: 'At Risk', value: '2', delta: '40–52 days open' },
          { label: 'Overdue', value: '2', delta: 'Exceeded 45-day SLA', positive: false },
          { label: 'Avg Days to Decision', value: '38d', delta: 'Target: 45 days', positive: true },
          { label: 'Next Decision', value: 'Jul 28', delta: 'SurgPlan AI' },
          { label: 'Pending Vendor Info', value: '3', delta: 'Responses due <30 days' },
        ],
      },
    ],
  },
  governance: {
    title: 'Average Governance Score',
    subtitle: 'Ecosystem-wide scoring trend and distribution',
    accentColor: '#5C2D91',
    summary: 'The ecosystem average governance score reached 82.4/100 in December 2024 — a 14.2-point improvement on the Q1 2024 baseline of 68.2, driven by vendor quality improvements and stricter pre-submission guidance.',
    sections: [
      {
        label: 'Score Trend (12 Months)',
        type: 'chart-line',
        data: [
          { month: 'Jan', score: 68.2 },
          { month: 'Feb', score: 70.1 },
          { month: 'Mar', score: 71.8 },
          { month: 'Apr', score: 73.4 },
          { month: 'May', score: 75.0 },
          { month: 'Jun', score: 76.8 },
          { month: 'Jul', score: 78.3 },
          { month: 'Aug', score: 79.7 },
          { month: 'Sep', score: 80.9 },
          { month: 'Oct', score: 81.5 },
          { month: 'Nov', score: 82.0 },
          { month: 'Dec', score: 82.4 },
        ],
      },
      {
        label: 'Score Distribution',
        type: 'stat-grid',
        stats: [
          { label: 'Excellent (≥85)', value: '12', delta: '26% of solutions', positive: true },
          { label: 'Strong (75–84)', value: '19', delta: '40% of solutions', positive: true },
          { label: 'Acceptable (65–74)', value: '8', delta: '17% of solutions' },
          { label: 'Marginal (50–64)', value: '6', delta: '13% of solutions', positive: false },
          { label: 'Highest Score', value: '91', delta: 'RadiologyAI Dx' },
          { label: 'Lowest Score', value: '64', delta: 'ChronicCare Analytics', positive: false },
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy Posture Score',
    subtitle: 'Privacy risk trend and incident impact',
    accentColor: '#0078D4',
    summary: 'The Privacy Posture Score reached 87.6/100, up 16.4 points from baseline. Despite 4 open incidents this month, structural controls implemented in H1 2024 continue to drive improvement.',
    sections: [
      {
        label: 'Privacy Score Trend',
        type: 'chart-line',
        data: [
          { month: 'Jan', score: 71.2 },
          { month: 'Feb', score: 72.8 },
          { month: 'Mar', score: 74.6 },
          { month: 'Apr', score: 76.1 },
          { month: 'May', score: 78.4 },
          { month: 'Jun', score: 80.2 },
          { month: 'Jul', score: 81.8 },
          { month: 'Aug', score: 83.1 },
          { month: 'Sep', score: 84.4 },
          { month: 'Oct', score: 85.6 },
          { month: 'Nov', score: 86.8 },
          { month: 'Dec', score: 87.6 },
        ],
      },
      {
        label: 'Incident Summary (MTD)',
        type: 'stat-grid',
        stats: [
          { label: 'Critical', value: '1', delta: 'PI-2024-089 — Resolved', positive: true },
          { label: 'High', value: '3', delta: '1 open · 2 resolved', positive: false },
          { label: 'Medium', value: '4', delta: '2 open · 2 resolved' },
          { label: 'Low', value: '2', delta: '2 open' },
          { label: 'Records Impacted', value: '26.5K', delta: 'Across 10 incidents', positive: false },
          { label: 'Resolution Rate', value: '40%', delta: '4 of 10 closed' },
        ],
      },
    ],
  },
  workforce: {
    title: 'Workforce Readiness Index',
    subtitle: 'AI adoption capability across DHA facilities',
    accentColor: '#107C10',
    summary: 'The Workforce Readiness Index stands at 74.2/100 — a 19.4-point gain from baseline. Latifa Hospital leads at 84/100 while Community Health Network requires urgent intervention at 58/100.',
    sections: [
      {
        label: 'Readiness by Facility',
        type: 'chart-bar',
        data: [
          { facility: 'Latifa', score: 84, fill: '#107C10' },
          { facility: 'Rashid', score: 78, fill: '#0F6CBD' },
          { facility: 'Dubai Hosp.', score: 71, fill: '#FFB900' },
          { facility: 'Community', score: 58, fill: '#D13438' },
        ],
      },
      {
        label: 'Key Metrics',
        type: 'stat-grid',
        stats: [
          { label: 'On Track', value: '2', delta: 'Latifa + Rashid', positive: true },
          { label: 'At Risk', value: '1', delta: 'Dubai Hospital', positive: false },
          { label: 'Behind Schedule', value: '1', delta: 'Community Health', positive: false },
          { label: 'Staff Trained', value: '7.6K', delta: '63% of total workforce' },
          { label: 'Training Completion', value: '82%', delta: '+14% vs Q1', positive: true },
          { label: 'AI Tools Deployed', value: '22', delta: 'Across 4 facilities', positive: true },
        ],
      },
    ],
  },
};

interface KPIInsightPanelProps {
  insightKey: string | null;
  onClose: () => void;
}

function StatGrid({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {stats.map((stat, i) => (
        <div key={i} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
          <div className="text-xs text-slate-500 mb-1 leading-tight">{stat.label}</div>
          <div className="text-xl font-bold text-slate-900">{stat.value}</div>
          {stat.delta && (
            <div className={`text-xs mt-1 font-medium flex items-center gap-1 ${
              stat.positive === true ? 'text-green-700' : stat.positive === false ? 'text-red-600' : 'text-slate-400'
            }`}>
              {stat.positive === true && <TrendingUp size={9} />}
              {stat.positive === false && <TrendingDown size={9} />}
              {stat.delta}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ListItems({ items }: { items: ListItem[] }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-lg border border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <ArrowRight size={11} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-700">{item.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">{item.value}</span>
            {item.tag && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${item.tagColor}18`, color: item.tagColor }}
              >
                {item.tag}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function KPIInsightPanel({ insightKey, onClose }: KPIInsightPanelProps) {
  const config = insightKey ? insightData[insightKey] : null;

  return (
    <AnimatePresence>
      {config && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-slate-900/20 z-40 backdrop-blur-[1px]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed top-0 right-0 h-full w-[420px] bg-white z-50 shadow-panel flex flex-col border-l border-slate-200"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex-shrink-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: config.accentColor }}
                    />
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: config.accentColor }}>
                      KPI Detail
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">{config.title}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{config.subtitle}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-md hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600 flex-shrink-0 mt-0.5"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Summary */}
              <div
                className="mt-4 p-3.5 rounded-lg text-xs leading-relaxed text-slate-700 border"
                style={{ backgroundColor: `${config.accentColor}0A`, borderColor: `${config.accentColor}25` }}
              >
                {config.summary}
              </div>
            </div>

            {/* Sections */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {config.sections.map((section, i) => (
                <div key={i}>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    {section.label}
                  </h3>

                  {(section.type === 'chart-bar') && section.data && (
                    <ResponsiveContainer width="100%" height={160}>
                      <BarChart data={section.data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                        <XAxis
                          dataKey={Object.keys(section.data[0]).find(k => typeof section.data![0][k] === 'string' && k !== 'fill')}
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
                        <Bar
                          dataKey={Object.keys(section.data[0]).find(k => typeof section.data![0][k] === 'number')}
                          radius={[3, 3, 0, 0]}
                          maxBarSize={36}
                        >
                          {section.data.map((entry, idx) => (
                            <Cell key={idx} fill={entry.fill || config.accentColor} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}

                  {section.type === 'chart-line' && section.data && (
                    <ResponsiveContainer width="100%" height={160}>
                      <LineChart data={section.data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                        <XAxis
                          dataKey="month"
                          tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          domain={['auto', 'auto']}
                          tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke={config.accentColor}
                          strokeWidth={2.5}
                          dot={{ fill: config.accentColor, r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}

                  {section.type === 'stat-grid' && section.stats && (
                    <StatGrid stats={section.stats} />
                  )}

                  {section.type === 'list' && section.items && (
                    <ListItems items={section.items} />
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 border-t border-slate-100 flex-shrink-0 bg-slate-50">
              <p className="text-xs text-slate-400 text-center">
                Data reflects DHA Nabidh platform · Q2 2024 evaluation cycle
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
