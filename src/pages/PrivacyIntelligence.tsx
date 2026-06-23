import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  Shield, AlertTriangle, Eye, TrendingUp, TrendingDown,
  Clock, CheckCircle, XCircle, Search, Filter, ChevronDown,
  ChevronUp, ExternalLink, User2, Activity,
} from 'lucide-react';
import { SeverityBadge, IncidentStatusBadge } from '../components/ui/Badge';
import {
  privacyIncidents,
  accessEventData,
  userRiskProfiles,
} from '../data/syntheticData';
import type { PrivacyIncident } from '../types';

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
            <span className="font-semibold text-slate-700">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

interface IncidentRowProps {
  incident: PrivacyIncident;
}

function IncidentRow({ incident }: IncidentRowProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-3.5 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <SeverityBadge severity={incident.severity} size="sm" />
          </div>
          <div className="flex-1 min-w-0 grid grid-cols-4 gap-3 items-center">
            <div className="col-span-1">
              <div className="text-xs font-mono font-semibold text-slate-600">{incident.id}</div>
              <div className="text-xs text-slate-400 mt-0.5">
                {new Date(incident.timestamp).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'short', year: 'numeric',
                })}
              </div>
            </div>
            <div className="col-span-1">
              <div className="text-xs font-medium text-slate-700 truncate">{incident.type}</div>
              <div className="text-xs text-slate-400 mt-0.5 truncate">{incident.facility}</div>
            </div>
            <div className="col-span-1 hidden lg:block">
              <div className="text-xs text-slate-600 truncate">{incident.affectedSystem}</div>
              <div className="text-xs text-slate-400 mt-0.5">
                {incident.impactedRecords > 0 ? `${incident.impactedRecords.toLocaleString()} records` : 'No records affected'}
              </div>
            </div>
            <div className="col-span-1 flex items-center justify-between">
              <IncidentStatusBadge status={incident.status} />
              <div className="flex items-center gap-1.5">
                {incident.daysOpen > 0 && (
                  <span className="text-xs text-slate-400">{incident.daysOpen}d open</span>
                )}
                {expanded ? (
                  <ChevronUp size={14} className="text-slate-400" />
                ) : (
                  <ChevronDown size={14} className="text-slate-400" />
                )}
              </div>
            </div>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 bg-slate-50 border-t border-slate-100">
              <div className="pt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Incident Description</div>
                  <p className="text-xs text-slate-700 leading-relaxed">{incident.description}</p>
                </div>
                {incident.resolution && (
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Resolution</div>
                    <p className="text-xs text-slate-700 leading-relaxed">{incident.resolution}</p>
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-center gap-4 pt-3 border-t border-slate-200">
                <div className="flex items-center gap-1.5">
                  <User2 size={11} className="text-slate-400" />
                  <span className="text-xs text-slate-500">{incident.assignee}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={11} className="text-slate-400" />
                  <span className="text-xs text-slate-500">
                    {new Date(incident.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} GST
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PrivacyIntelligence() {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  const filteredIncidents = privacyIncidents.filter((inc) => {
    const matchesSearch =
      inc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.facility.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.affectedSystem.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || inc.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const openIncidents = privacyIncidents.filter((i) => i.status === 'open' || i.status === 'investigating').length;
  const criticalCount = privacyIncidents.filter((i) => i.severity === 'critical').length;
  const resolvedCount = privacyIncidents.filter((i) => i.status === 'resolved' || i.status === 'closed').length;
  const totalRecordsImpacted = privacyIncidents.reduce((sum, i) => sum + i.impactedRecords, 0);

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
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse-soft"></div>
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-widest">{openIncidents} Active Incidents</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Privacy Intelligence</h1>
          <p className="text-sm text-slate-500 mt-1">
            Proactive privacy monitoring, anomaly detection and incident governance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-xs">
            <ExternalLink size={12} />
            Export Report
          </button>
        </div>
      </motion.div>

      {/* KPI Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Privacy Risk Index */}
        <div className="bg-white rounded-lg border border-amber-200 p-5 shadow-card" style={{ borderColor: '#FCD34D' }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Privacy Risk Index</div>
              <div className="text-3xl font-bold text-slate-900">72.4</div>
              <div className="text-xs font-medium mt-1" style={{ color: '#D13438' }}>
                <TrendingUp size={10} className="inline mr-1" />
                +4.1 over 30 days
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFF4E0' }}>
              <Activity size={18} style={{ color: '#9E5A00' }} />
            </div>
          </div>
          <div className="mt-3 px-2 py-1.5 rounded text-xs font-medium" style={{ backgroundColor: '#FFF4E0', color: '#9E5A00' }}>
            Elevated — Requires monitoring
          </div>
        </div>

        {/* Open Incidents */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Open Incidents</div>
              <div className="text-3xl font-bold text-red-700">{openIncidents}</div>
              <div className="text-xs text-slate-400 mt-1">{criticalCount} critical · {openIncidents - criticalCount} high/medium</div>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FBEAEA' }}>
              <AlertTriangle size={18} style={{ color: '#D13438' }} />
            </div>
          </div>
        </div>

        {/* Records Impacted */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Records Impacted (MTD)</div>
              <div className="text-3xl font-bold text-slate-900">{(totalRecordsImpacted / 1000).toFixed(1)}K</div>
              <div className="text-xs text-slate-400 mt-1">Across {privacyIncidents.length} incidents</div>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#EAF4FF' }}>
              <Eye size={18} style={{ color: '#0F6CBD' }} />
            </div>
          </div>
        </div>

        {/* Resolution Rate */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Resolution Rate</div>
              <div className="text-3xl font-bold text-green-700">{Math.round((resolvedCount / privacyIncidents.length) * 100)}%</div>
              <div className="text-xs text-slate-400 mt-1">{resolvedCount} of {privacyIncidents.length} resolved</div>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F0FAF0' }}>
              <CheckCircle size={18} style={{ color: '#107C10' }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Access Monitoring Chart */}
        <div className="xl:col-span-2 bg-white rounded-lg border border-slate-200 shadow-card p-5">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Access Monitoring — Today</h3>
              <p className="text-xs text-slate-400 mt-0.5">Patient record access events by classification (2-hour intervals)</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#FFF4E0', color: '#9E5A00' }}>
              <Activity size={11} />
              14 anomalous events
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={accessEventData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="normalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F6CBD" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#0F6CBD" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="elevatedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFB900" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#FFB900" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="anomalousGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D13438" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#D13438" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="time"
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
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', fontFamily: 'IBM Plex Sans' }} />
              <Area type="monotone" dataKey="normal" name="Normal" stroke="#0F6CBD" strokeWidth={2} fill="url(#normalGrad)" dot={false} />
              <Area type="monotone" dataKey="elevated" name="Elevated" stroke="#FFB900" strokeWidth={2} fill="url(#elevatedGrad)" dot={false} />
              <Area type="monotone" dataKey="anomalous" name="Anomalous" stroke="#D13438" strokeWidth={2} fill="url(#anomalousGrad)" dot={{ fill: '#D13438', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* User Risk Profiles */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-900">User Risk Profiles</h3>
            <p className="text-xs text-slate-400 mt-0.5">Accounts with elevated access patterns</p>
          </div>
          <div className="space-y-3">
            {userRiskProfiles.map((user) => {
              const riskColor = user.riskScore >= 80 ? '#D13438' : user.riskScore >= 60 ? '#9E5A00' : user.riskScore >= 40 ? '#FFB900' : '#107C10';
              const patternConfig = {
                anomalous: { label: 'Anomalous', color: '#D13438', bg: '#FBEAEA' },
                elevated: { label: 'Elevated', color: '#9E5A00', bg: '#FFF4E0' },
                normal: { label: 'Normal', color: '#107C10', bg: '#F0FAF0' },
              };
              const pc = patternConfig[user.accessPattern];
              return (
                <div key={user.userId} className="p-3 rounded-md border border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: riskColor }}>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-800">{user.name}</div>
                        <div className="text-xs text-slate-400">{user.role}</div>
                        <div className="text-xs text-slate-400">{user.facility}</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-base font-bold" style={{ color: riskColor }}>{user.riskScore}</div>
                      <div className="text-xs text-slate-400">risk score</div>
                    </div>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: pc.bg, color: pc.color }}>
                      {pc.label}
                    </span>
                    <span className="text-xs text-slate-400">{user.anomalies} anomalies detected</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Sensitive Data Access Bar Chart */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Sensitive Data Access Events by Facility</h3>
            <p className="text-xs text-slate-400 mt-0.5">June 2024 — Categorised by event classification</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart
            data={[
              { facility: 'Rashid Hospital', normal: 4820, elevated: 124, anomalous: 18 },
              { facility: 'Dubai Hospital', normal: 3940, elevated: 186, anomalous: 31 },
              { facility: 'Latifa Hospital', normal: 2640, elevated: 72, anomalous: 9 },
              { facility: 'Community Health', normal: 1820, elevated: 94, anomalous: 12 },
            ]}
            margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="facility" tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', fontFamily: 'IBM Plex Sans' }} />
            <Bar dataKey="normal" name="Normal" fill="#0F6CBD" radius={[2, 2, 0, 0]} maxBarSize={40} />
            <Bar dataKey="elevated" name="Elevated" fill="#FFB900" radius={[2, 2, 0, 0]} maxBarSize={40} />
            <Bar dataKey="anomalous" name="Anomalous" fill="#D13438" radius={[2, 2, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Incident Investigation Panel */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg border border-slate-200 shadow-card">
        <div className="px-5 py-4 border-b border-slate-100">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Incident Investigation Panel</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {privacyIncidents.length} total incidents · {filteredIncidents.length} shown
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-48">
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search incidents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400 text-slate-700"
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {['all', 'critical', 'high', 'medium', 'low'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-2.5 py-1 rounded text-xs font-medium capitalize transition-all duration-150 ${
                    severityFilter === sev ? 'text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                  style={severityFilter === sev ? { backgroundColor: '#0F6CBD' } : {}}
                >
                  {sev === 'all' ? 'All' : sev.charAt(0).toUpperCase() + sev.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 grid grid-cols-4 gap-3">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Severity / ID</div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Type / Facility</div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:block">System / Impact</div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</div>
        </div>

        {/* Incident Rows */}
        <div>
          {filteredIncidents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-center">
              <Filter size={20} className="text-slate-300 mb-2" />
              <p className="text-sm text-slate-500">No incidents match your filters</p>
            </div>
          ) : (
            filteredIncidents.map((incident) => (
              <IncidentRow key={incident.id} incident={incident} />
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
