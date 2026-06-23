import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip,
} from 'recharts';
import {
  Search, Filter, ChevronRight, CheckCircle2, AlertTriangle,
  Lightbulb, ClipboardList, MessageSquare, Building2, Calendar,
  Tag, User, ArrowRight, Info,
} from 'lucide-react';
import { StatusBadge } from '../components/ui/Badge';
import ScoreGauge from '../components/ui/ScoreGauge';
import { aiSolutions } from '../data/syntheticData';
import type { AISolution } from '../types';

const dimensionLabels: Record<string, string> = {
  privacyControls: 'Privacy Controls',
  dataSovereignty: 'Data Sovereignty',
  humanOversight: 'Human Oversight',
  explainability: 'Explainability',
  interoperabilityReadiness: 'Interoperability',
  monitoringCapability: 'Monitoring',
  clinicalSafety: 'Clinical Safety',
};

const dimensionDescriptions: Record<string, string> = {
  privacyControls: 'Encryption, access control, and data minimisation',
  dataSovereignty: 'UAE data residency and processing compliance',
  humanOversight: 'Human-in-the-loop review and approval gates',
  explainability: 'AI reasoning transparency and interpretability',
  interoperabilityReadiness: 'FHIR, HL7, and Nabidh integration capability',
  monitoringCapability: 'Ongoing performance and drift monitoring',
  clinicalSafety: 'Clinical validation and patient safety controls',
};

function getDimScore(score: number) {
  if (score >= 85) return { color: '#107C10', bg: '#F0FAF0', label: 'Strong' };
  if (score >= 75) return { color: '#0F6CBD', bg: '#EAF4FF', label: 'Adequate' };
  if (score >= 65) return { color: '#9E5A00', bg: '#FFF4E0', label: 'Marginal' };
  return { color: '#D13438', bg: '#FBEAEA', label: 'Deficient' };
}

type TabId = 'overview' | 'strengths' | 'risks' | 'actions';

interface SolutionDetailProps {
  solution: AISolution;
}

function SolutionDetail({ solution }: SolutionDetailProps) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const radarData = Object.entries(solution.dimensions).map(([key, value]) => ({
    dimension: dimensionLabels[key] || key,
    score: value,
    fullMark: 100,
  }));

  const tabs: { id: TabId; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { id: 'overview', label: 'Assessment', icon: ClipboardList },
    { id: 'strengths', label: `Strengths (${solution.strengths.length})`, icon: CheckCircle2 },
    { id: 'risks', label: `Risks (${solution.risks.length})`, icon: AlertTriangle },
    { id: 'actions', label: `Actions (${solution.requiredActions.length})`, icon: ArrowRight },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Solution Header */}
      <div className="px-6 py-5 border-b border-slate-200 bg-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <StatusBadge status={solution.status} />
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-medium text-slate-500">{solution.category}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">{solution.name}</h2>
            <p className="text-sm text-slate-500 mt-1">{solution.description}</p>
          </div>
          <ScoreGauge score={solution.overallScore} size="md" />
        </div>

        {/* Meta info */}
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <div className="flex items-center gap-1.5">
            <Building2 size={12} className="text-slate-400" />
            <span className="text-xs text-slate-500">{solution.vendor}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Tag size={12} className="text-slate-400" />
            <span className="text-xs text-slate-500">v{solution.version}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-slate-400" />
            <span className="text-xs text-slate-500">
              {solution.reviewedDate
                ? `Reviewed ${new Date(solution.reviewedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
                : `Submitted ${new Date(solution.submittedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <User size={12} className="text-slate-400" />
            <span className="text-xs text-slate-500">{solution.assessor}</span>
          </div>
        </div>

        {/* Deployment info */}
        <div className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 bg-slate-50 w-fit">
          <Info size={11} className="text-slate-400" />
          <span className="text-xs font-medium text-slate-600">Deployment: {solution.deploymentType}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 bg-white px-6">
        <div className="flex gap-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold border-b-2 transition-all duration-150 ${
                  isActive
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
                style={isActive ? { borderBottomColor: '#0F6CBD', color: '#0F6CBD' } : {}}
              >
                <Icon size={12} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
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
              {/* Radar Chart + Dimension Scores */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Radar */}
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Assessment Radar</h3>
                  <ResponsiveContainer width="100%" height={240}>
                    <RadarChart data={radarData} margin={{ top: 12, right: 32, bottom: 12, left: 32 }}>
                      <PolarGrid stroke="#F1F5F9" />
                      <PolarAngleAxis
                        dataKey="dimension"
                        tick={{ fontSize: 9.5, fill: '#64748B', fontFamily: 'IBM Plex Sans' }}
                      />
                      <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name={solution.name}
                        dataKey="score"
                        stroke="#0F6CBD"
                        fill="#0F6CBD"
                        fillOpacity={0.15}
                        strokeWidth={2}
                      />
                      <Tooltip
                        contentStyle={{
                          fontSize: '11px',
                          fontFamily: 'IBM Plex Sans',
                          border: '1px solid #E2E8F0',
                          borderRadius: '6px',
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Dimension Scores */}
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Dimension Scores</h3>
                  <div className="space-y-2.5">
                    {Object.entries(solution.dimensions).map(([key, score]) => {
                      const conf = getDimScore(score);
                      const pct = score;
                      return (
                        <div key={key}>
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <span className="text-xs font-medium text-slate-700">{dimensionLabels[key]}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className="text-xs font-semibold px-1.5 py-0.5 rounded"
                                style={{ backgroundColor: conf.bg, color: conf.color }}
                              >
                                {conf.label}
                              </span>
                              <span className="text-xs font-bold text-slate-900 w-6 text-right">{score}</span>
                            </div>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: conf.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.6, delay: 0.1 }}
                            />
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">{dimensionDescriptions[key]}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Review Notes */}
              <div className="bg-white rounded-lg border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare size={14} className="text-slate-400" />
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assessor Review Notes</h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{solution.reviewNotes}</p>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">{solution.assessor}</span>
                  {solution.reviewedDate && (
                    <span className="text-xs text-slate-400">
                      {new Date(solution.reviewedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>

              {/* Facility Scope */}
              {solution.facilityScope.length > 0 && (
                <div className="bg-white rounded-lg border border-slate-200 p-5">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Approved Deployment Scope</h3>
                  <div className="flex flex-wrap gap-2">
                    {solution.facilityScope.map((facility) => (
                      <span key={facility} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-green-200 bg-green-50 text-green-800">
                        <CheckCircle2 size={11} className="text-green-600" />
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'strengths' && (
            <motion.div
              key="strengths"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-3">
                {solution.strengths.map((strength, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex gap-3 p-4 rounded-lg border border-green-100 bg-green-50"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={12} className="text-green-700" />
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{strength}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'risks' && (
            <motion.div
              key="risks"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-3">
                {solution.risks.map((risk, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex gap-3 p-4 rounded-lg border border-red-100 bg-red-50"
                  >
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertTriangle size={11} className="text-red-700" />
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{risk}</p>
                  </motion.div>
                ))}

                {solution.recommendations.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Recommendations</h3>
                    <div className="space-y-2.5">
                      {solution.recommendations.map((rec, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          className="flex gap-3 p-4 rounded-lg border border-blue-100 bg-blue-50"
                        >
                          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Lightbulb size={11} className="text-blue-700" />
                          </div>
                          <p className="text-sm text-slate-700 leading-relaxed">{rec}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'actions' && (
            <motion.div
              key="actions"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4 p-4 rounded-lg border border-amber-200 bg-amber-50">
                <div className="flex items-center gap-2 mb-1">
                  <ClipboardList size={13} className="text-amber-700" />
                  <span className="text-xs font-semibold text-amber-800">Required Actions</span>
                </div>
                <p className="text-xs text-amber-700">
                  {solution.requiredActions.length} action{solution.requiredActions.length !== 1 ? 's' : ''} must be completed{' '}
                  {solution.status === 'approved_with_conditions' ? 'to maintain conditional approval status' :
                   solution.status === 'requires_remediation' ? 'before resubmission will be accepted' :
                   'to complete the assessment process'}.
                </p>
              </div>

              <div className="space-y-3">
                {solution.requiredActions.map((action, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex gap-4 p-4 rounded-lg bg-white border border-slate-200"
                  >
                    <div className="w-6 h-6 rounded-full border-2 border-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5 bg-amber-50">
                      <span className="text-xs font-bold text-amber-700">{i + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-700 leading-relaxed">{action}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">Pending vendor response</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function AIAssessment() {
  const [selectedId, setSelectedId] = useState<string>(aiSolutions[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const selectedSolution = aiSolutions.find((s) => s.id === selectedId) || aiSolutions[0];

  const filteredSolutions = aiSolutions.filter((solution) => {
    const matchesSearch =
      solution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      solution.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      solution.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || solution.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusMeta: Record<string, { label: string; count: number }> = {
    all: { label: 'All', count: aiSolutions.length },
    approved: { label: 'Approved', count: aiSolutions.filter((s) => s.status === 'approved').length },
    approved_with_conditions: { label: 'Conditional', count: aiSolutions.filter((s) => s.status === 'approved_with_conditions').length },
    under_review: { label: 'Under Review', count: aiSolutions.filter((s) => s.status === 'under_review').length },
    requires_remediation: { label: 'Remediation', count: aiSolutions.filter((s) => s.status === 'requires_remediation').length },
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Panel — Solution List */}
      <div className="w-80 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col">
        {/* Panel Header */}
        <div className="px-4 pt-5 pb-3 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900 mb-1">AI Solution Registry</h2>
          <p className="text-xs text-slate-400">{aiSolutions.length} solutions · Q2 2024 evaluation cycle</p>

          {/* Search */}
          <div className="mt-3 relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search solutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs rounded-md border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:border-transparent placeholder:text-slate-400 text-slate-700"
              style={{ '--tw-ring-color': '#0F6CBD' } as any}
            />
          </div>

          {/* Filter chips */}
          <div className="mt-2.5 flex gap-1.5 flex-wrap">
            {Object.entries(statusMeta).map(([key, meta]) => (
              <button
                key={key}
                onClick={() => setFilterStatus(key)}
                className={`px-2 py-0.5 rounded text-xs font-medium transition-all duration-150 ${
                  filterStatus === key
                    ? 'text-white'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
                style={filterStatus === key ? { backgroundColor: '#0F6CBD' } : {}}
              >
                {meta.label} ({meta.count})
              </button>
            ))}
          </div>
        </div>

        {/* Solution List */}
        <div className="flex-1 overflow-y-auto py-2">
          {filteredSolutions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center px-4">
              <Filter size={24} className="text-slate-300 mb-2" />
              <p className="text-sm text-slate-500 font-medium">No solutions found</p>
              <p className="text-xs text-slate-400 mt-1">Adjust your search or filter criteria</p>
            </div>
          ) : (
            filteredSolutions.map((solution) => {
              const isSelected = selectedId === solution.id;
              const scoreColor = solution.overallScore >= 85 ? '#107C10'
                : solution.overallScore >= 75 ? '#0F6CBD'
                : solution.overallScore >= 65 ? '#9E5A00'
                : '#D13438';

              return (
                <motion.button
                  key={solution.id}
                  onClick={() => setSelectedId(solution.id)}
                  className={`w-full px-4 py-3.5 text-left border-b border-slate-100 transition-all duration-150 relative ${
                    isSelected ? '' : 'hover:bg-slate-50'
                  }`}
                  style={isSelected ? { backgroundColor: '#F8FCFF' } : {}}
                  whileHover={{ x: isSelected ? 0 : 1 }}
                >
                  {isSelected && (
                    <div
                      className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full"
                      style={{ backgroundColor: '#0F6CBD' }}
                    />
                  )}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-900 truncate">{solution.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5 truncate">{solution.vendor}</div>
                      <div className="mt-2">
                        <StatusBadge status={solution.status} size="sm" />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xl font-bold" style={{ color: scoreColor }}>{solution.overallScore}</div>
                      <div className="text-xs text-slate-400">/100</div>
                      {isSelected && <ChevronRight size={12} className="ml-auto mt-1" style={{ color: '#0F6CBD' }} />}
                    </div>
                  </div>
                </motion.button>
              );
            })
          )}
        </div>

        {/* Panel Footer */}
        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-base font-bold text-green-700">{aiSolutions.filter(s => s.status === 'approved').length}</div>
              <div className="text-xs text-slate-400">Approved</div>
            </div>
            <div>
              <div className="text-base font-bold text-amber-600">{aiSolutions.filter(s => s.status === 'approved_with_conditions').length}</div>
              <div className="text-xs text-slate-400">Conditional</div>
            </div>
            <div>
              <div className="text-base font-bold text-red-600">{aiSolutions.filter(s => s.status === 'requires_remediation' || s.status === 'rejected').length}</div>
              <div className="text-xs text-slate-400">Remediation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Detail */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-hidden flex flex-col"
          >
            <SolutionDetail solution={selectedSolution} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
