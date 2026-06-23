import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  Users, GraduationCap, TrendingUp, Target, ChevronRight,
  AlertTriangle, CheckCircle2, Clock, ArrowUpRight,
} from 'lucide-react';
import { TrainingStatusBadge } from '../components/ui/Badge';
import { facilities, adoptionTrendData, workforceHeatmapData } from '../data/syntheticData';
import type { Facility } from '../types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-card-md text-xs">
        <p className="font-semibold text-slate-700 mb-2">{label}</p>
        {payload.map((entry: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-500">{entry.name}:</span>
            <span className="font-semibold text-slate-700">{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

function ReadinessRing({ score, size = 72 }: { score: number; size?: number }) {
  const color = score >= 80 ? '#107C10' : score >= 70 ? '#0F6CBD' : score >= 60 ? '#9E5A00' : '#D13438';
  const r = (size / 2) - 8;
  const circumference = 2 * Math.PI * r;
  const filled = circumference * (score / 100);

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F1F5F9" strokeWidth={6} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeDasharray={`${filled} ${circumference}`}
          strokeLinecap="round"
          style={{
            transformOrigin: `${size / 2}px ${size / 2}px`,
            transform: 'rotate(-90deg)',
            transition: 'stroke-dasharray 0.8s ease-out',
          }}
        />
        <text
          x={size / 2} y={size / 2}
          textAnchor="middle" dominantBaseline="middle"
          fill={color}
          fontFamily="IBM Plex Sans, sans-serif"
          fontSize="14"
          fontWeight="700"
        >
          {score}
        </text>
      </svg>
    </div>
  );
}

function HeatmapCell({ score }: { score: number }) {
  const getBg = (s: number) => {
    if (s >= 85) return { bg: '#107C10', text: 'white', opacity: 0.9 };
    if (s >= 75) return { bg: '#0F6CBD', text: 'white', opacity: 0.85 };
    if (s >= 65) return { bg: '#0078D4', text: 'white', opacity: 0.7 };
    if (s >= 55) return { bg: '#FFB900', text: '#0F172A', opacity: 0.85 };
    return { bg: '#D13438', text: 'white', opacity: 0.85 };
  };
  const conf = getBg(score);
  return (
    <div
      className="flex items-center justify-center rounded text-xs font-bold"
      style={{
        backgroundColor: conf.bg,
        opacity: conf.opacity,
        color: conf.text,
        minWidth: '52px',
        height: '40px',
      }}
    >
      {score}
    </div>
  );
}

interface FacilityCardProps {
  facility: Facility;
  isSelected: boolean;
  onSelect: () => void;
}

function FacilityCard({ facility, isSelected, onSelect }: FacilityCardProps) {
  const readinessColor = facility.overallReadiness >= 80 ? '#107C10'
    : facility.overallReadiness >= 70 ? '#0F6CBD'
    : facility.overallReadiness >= 60 ? '#9E5A00'
    : '#D13438';

  return (
    <motion.button
      onClick={onSelect}
      className={`w-full text-left bg-white rounded-lg border p-5 shadow-card transition-all duration-200 ${
        isSelected ? '' : 'hover:shadow-card-hover hover:border-slate-300'
      }`}
      style={isSelected ? { borderColor: '#0F6CBD', boxShadow: '0 0 0 2px rgba(15,108,189,0.12)' } : { borderColor: '#E2E8F0' }}
      whileHover={{ y: isSelected ? 0 : -1 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <TrainingStatusBadge status={facility.trainingStatus} />
          </div>
          <h3 className="text-sm font-bold text-slate-900 leading-tight mt-1">{facility.name}</h3>
          <p className="text-xs text-slate-400 mt-0.5 leading-tight">{facility.type}</p>
        </div>
        <ReadinessRing score={facility.overallReadiness} size={64} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div>
          <div className="text-xs text-slate-400">AI Literacy</div>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${facility.aiLiteracyScore}%`, backgroundColor: readinessColor }} />
            </div>
            <span className="text-xs font-semibold text-slate-700 w-6 text-right">{facility.aiLiteracyScore}</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400">Training</div>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${facility.trainingCompletion}%`, backgroundColor: readinessColor }} />
            </div>
            <span className="text-xs font-semibold text-slate-700 w-6 text-right">{facility.trainingCompletion}%</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400">Governance</div>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${facility.governanceAwareness}%`, backgroundColor: readinessColor }} />
            </div>
            <span className="text-xs font-semibold text-slate-700 w-6 text-right">{facility.governanceAwareness}</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400">Active AI Solutions</div>
          <div className="text-sm font-bold mt-1" style={{ color: '#0F6CBD' }}>{facility.activeAISolutions} deployed</div>
        </div>
      </div>

      {facility.trend === 'improving' && (
        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium" style={{ color: '#107C10' }}>
          <TrendingUp size={11} />
          +{facility.trendDelta} pts — improving
        </div>
      )}
      {facility.trend === 'stable' && (
        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <Target size={11} />
          Stable — +{facility.trendDelta} pts
        </div>
      )}
    </motion.button>
  );
}

export default function WorkforceReadiness() {
  const [selectedFacilityId, setSelectedFacilityId] = useState(facilities[0].id);
  const selectedFacility = facilities.find((f) => f.id === selectedFacilityId) || facilities[0];

  const ecosystemAvg = Math.round(
    facilities.reduce((sum, f) => sum + f.overallReadiness, 0) / facilities.length
  );

  const radarData = [
    { dimension: 'AI Literacy', score: selectedFacility.aiLiteracyScore, avg: ecosystemAvg },
    { dimension: 'Governance', score: selectedFacility.governanceAwareness, avg: 77 },
    { dimension: 'Adoption', score: selectedFacility.adoptionReadiness, avg: 73 },
    { dimension: 'Training', score: selectedFacility.trainingCompletion, avg: 82 },
    { dimension: 'Capability', score: selectedFacility.capabilityMaturity, avg: 66 },
  ];

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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Workforce Readiness</h1>
          <p className="text-sm text-slate-500 mt-1">
            AI adoption capability and maturity across DHA facilities · Q2 2024
          </p>
        </div>
        <div className="flex items-center gap-3 text-right">
          <div>
            <div className="text-xs text-slate-400 font-medium">Ecosystem Average</div>
            <div className="text-xl font-bold" style={{ color: '#0F6CBD' }}>{ecosystemAvg}<span className="text-sm text-slate-400 font-normal">/100</span></div>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div>
            <div className="text-xs text-slate-400 font-medium">Total Staff</div>
            <div className="text-xl font-bold text-slate-900">
              {(facilities.reduce((sum, f) => sum + f.totalStaff, 0) / 1000).toFixed(1)}K
            </div>
          </div>
        </div>
      </motion.div>

      {/* Facility Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {facilities.map((facility) => (
          <FacilityCard
            key={facility.id}
            facility={facility}
            isSelected={selectedFacilityId === facility.id}
            onSelect={() => setSelectedFacilityId(facility.id)}
          />
        ))}
      </motion.div>

      {/* Selected Facility Detail */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Capability Radar */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-1">{selectedFacility.shortName} — Capability Profile</h3>
          <p className="text-xs text-slate-400 mb-4">vs. ecosystem average</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData} margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
              <PolarGrid stroke="#F1F5F9" />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10, fill: '#64748B', fontFamily: 'IBM Plex Sans' }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name={selectedFacility.shortName} dataKey="score" stroke="#0F6CBD" fill="#0F6CBD" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="Ecosystem Avg" dataKey="avg" stroke="#CBD5E1" fill="#CBD5E1" fillOpacity={0.08} strokeWidth={1.5} strokeDasharray="4 2" />
              <Legend iconSize={8} wrapperStyle={{ fontSize: '10.5px', fontFamily: 'IBM Plex Sans' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Recommended Actions */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-1">Recommended Actions</h3>
          <p className="text-xs text-slate-400 mb-4">{selectedFacility.name}</p>
          <div className="space-y-3">
            {selectedFacility.recommendedActions.map((action, i) => {
              const isUrgent = action.toLowerCase().includes('immediately') || action.toLowerCase().includes('urgently') || action.toLowerCase().includes('emergency') || action.toLowerCase().includes('pause');
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={`flex gap-3 p-3 rounded-md border ${isUrgent ? '' : 'border-slate-200'}`}
                  style={isUrgent ? { borderColor: '#FCD34D', backgroundColor: '#FFFBEB' } : {}}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {isUrgent
                      ? <AlertTriangle size={13} style={{ color: '#9E5A00' }} />
                      : <CheckCircle2 size={13} style={{ color: '#0F6CBD' }} />
                    }
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{action}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Training Status */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-1">Training Status</h3>
          <p className="text-xs text-slate-400 mb-4">{selectedFacility.name} — staff breakdown</p>
          <div className="space-y-4">
            {[
              { label: 'Foundation AI Literacy', completed: selectedFacility.trainingCompletion, total: 100 },
              { label: 'Governance Essentials', completed: selectedFacility.governanceAwareness, total: 100 },
              { label: 'AI Safety & Ethics', completed: Math.round(selectedFacility.trainingCompletion * 0.82), total: 100 },
              { label: 'Advanced AI Operations', completed: Math.round(selectedFacility.capabilityMaturity * 0.74), total: 100 },
            ].map((course) => {
              const color = course.completed >= 80 ? '#107C10' : course.completed >= 65 ? '#0F6CBD' : course.completed >= 50 ? '#FFB900' : '#D13438';
              return (
                <div key={course.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-slate-700">{course.label}</span>
                    <span className="text-xs font-bold" style={{ color }}>{course.completed}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${course.completed}%` }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-slate-500">Staff enrolled</div>
              <div className="text-sm font-bold text-slate-900">
                {selectedFacility.clinicalStaff.toLocaleString()} clinical
              </div>
            </div>
            <TrainingStatusBadge status={selectedFacility.trainingStatus} />
          </div>
        </div>
      </motion.div>

      {/* Heatmap + Adoption Trend */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* Workforce Maturity Heatmap */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-900">Workforce Maturity Heatmap</h3>
            <p className="text-xs text-slate-400 mt-0.5">Score by facility and capability dimension</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-xs font-semibold text-slate-400 pb-3 text-left pr-4 min-w-[120px]">Facility</th>
                  {workforceHeatmapData.dimensions.map((dim) => (
                    <th key={dim} className="text-xs font-medium text-slate-500 pb-3 text-center px-1.5 min-w-[56px]">
                      {dim}
                    </th>
                  ))}
                  <th className="text-xs font-semibold text-slate-500 pb-3 text-center px-1.5 min-w-[56px]">Overall</th>
                </tr>
              </thead>
              <tbody>
                {workforceHeatmapData.facilities.map((facility, rowIdx) => {
                  const fData = facilities[rowIdx];
                  const overallColor = fData.overallReadiness >= 80 ? '#107C10'
                    : fData.overallReadiness >= 70 ? '#0F6CBD'
                    : fData.overallReadiness >= 60 ? '#9E5A00'
                    : '#D13438';
                  return (
                    <tr key={facility}>
                      <td className="pr-4 pb-2">
                        <span className="text-xs font-medium text-slate-700 whitespace-nowrap">{fData.shortName}</span>
                      </td>
                      {workforceHeatmapData.scores[rowIdx].map((score, colIdx) => (
                        <td key={colIdx} className="px-1.5 pb-2">
                          <HeatmapCell score={score} />
                        </td>
                      ))}
                      <td className="px-1.5 pb-2">
                        <div
                          className="flex items-center justify-center rounded text-xs font-bold border-2"
                          style={{
                            borderColor: overallColor,
                            color: overallColor,
                            minWidth: '52px',
                            height: '40px',
                            backgroundColor: `${overallColor}10`,
                          }}
                        >
                          {fData.overallReadiness}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            <span className="text-xs text-slate-400 font-medium">Score:</span>
            {[
              { color: '#D13438', label: '< 55' },
              { color: '#FFB900', label: '55–64' },
              { color: '#0078D4', label: '65–74' },
              { color: '#0F6CBD', label: '75–84' },
              { color: '#107C10', label: '≥ 85' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded" style={{ backgroundColor: item.color, opacity: 0.85 }} />
                <span className="text-xs text-slate-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Adoption Progress Trend */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">AI Tool Adoption Trend</h3>
              <p className="text-xs text-slate-400 mt-0.5">Monthly active AI tool users by staff category</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#F0FAF0', color: '#107C10' }}>
              <ArrowUpRight size={11} />
              +151% YTD
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={adoptionTrendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                {[
                  { id: 'clin', color: '#0F6CBD' },
                  { id: 'nurse', color: '#107C10' },
                  { id: 'pharm', color: '#5C2D91' },
                  { id: 'admin', color: '#00B7C3' },
                ].map(({ id, color }) => (
                  <linearGradient key={id} id={`${id}Grad`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.12} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10.5px', fontFamily: 'IBM Plex Sans', paddingTop: '8px' }} />
              <Area type="monotone" dataKey="clinicians" name="Clinicians" stroke="#0F6CBD" strokeWidth={2} fill="url(#clinGrad)" dot={false} />
              <Area type="monotone" dataKey="nurses" name="Nurses" stroke="#107C10" strokeWidth={2} fill="url(#nurseGrad)" dot={false} />
              <Area type="monotone" dataKey="pharmacists" name="Pharmacists" stroke="#5C2D91" strokeWidth={1.5} fill="url(#pharmGrad)" dot={false} />
              <Area type="monotone" dataKey="admin" name="Administration" stroke="#00B7C3" strokeWidth={1.5} fill="url(#adminGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Ecosystem Summary Banner */}
      <motion.div variants={itemVariants} className="rounded-lg border p-5" style={{ borderColor: '#BFDBFE', backgroundColor: '#F8FCFF' }}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EAF4FF' }}>
              <GraduationCap size={16} style={{ color: '#0F6CBD' }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Ecosystem Workforce Readiness Assessment</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed max-w-3xl">
                The DHA workforce readiness index stands at <strong>74.2/100</strong> — up 19.4 points from the Q2 2023 baseline. Latifa Hospital leads at 84/100 and represents best practice for ecosystem-wide learning. The critical priority is Community Health Network, which requires immediate intervention to bridge a 28-point gap before additional AI solution deployments are authorised.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 grid grid-cols-2 gap-3 text-center">
            <div>
              <div className="text-2xl font-bold" style={{ color: '#107C10' }}>2</div>
              <div className="text-xs text-slate-500">Facilities On Track</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: '#9E5A00' }}>1</div>
              <div className="text-xs text-slate-500">At Risk</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: '#D13438' }}>1</div>
              <div className="text-xs text-slate-500">Behind Schedule</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: '#0F6CBD' }}>22</div>
              <div className="text-xs text-slate-500">AI Tools Deployed</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
