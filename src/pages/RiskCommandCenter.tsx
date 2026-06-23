import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import {
  AlertTriangle, Activity, Clock, Shield, RefreshCw,
  MapPin, Zap,
} from 'lucide-react';
import {
  facilityRiskMapData,
  liveAlertFeed,
  riskTrendByFacility,
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

// ─── Risk Color Helpers ────────────────────────────────────────────────────────

const riskColors: Record<string, string> = {
  low: '#107C10',
  medium: '#F59E0B',
  high: '#D13438',
};

const riskBgColors: Record<string, string> = {
  low: '#F0FAF0',
  medium: '#FFF9EC',
  high: '#FEF2F0',
};

// ─── Severity Helpers ──────────────────────────────────────────────────────────

const severityConfig: Record<string, { bg: string; text: string; label: string }> = {
  critical: { bg: '#D13438', text: '#fff', label: 'Critical' },
  high:     { bg: '#C13515', text: '#fff', label: 'High' },
  medium:   { bg: '#9E5A00', text: '#fff', label: 'Medium' },
  low:      { bg: '#64748B', text: '#fff', label: 'Low' },
};

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  active:        { bg: '#FEF2F0', text: '#D13438', label: 'Active' },
  acknowledged:  { bg: '#FFF4E0', text: '#9E5A00', label: 'Acknowledged' },
  investigating: { bg: '#EAF4FF', text: '#0F6CBD', label: 'Investigating' },
  resolved:      { bg: '#F0FAF0', text: '#107C10', label: 'Resolved' },
};

// ─── Custom Tooltip ────────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-lg">
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

// ─── KPI Card ─────────────────────────────────────────────────────────────────

interface KPICardProps {
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

function KPICard({ label, value, unit, delta, deltaPositive, sublabel, color, icon: Icon, iconBg }: KPICardProps) {
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
            <span
              className="text-xs font-semibold"
              style={{ color: deltaPositive ? '#107C10' : '#D13438' }}
            >
              {delta}
            </span>
          </div>
        )}
        {sublabel && (
          <p className="text-xs text-slate-400 mt-1">{sublabel}</p>
        )}
      </div>
    </div>
  );
}

// ─── Dubai Facility Risk Map ───────────────────────────────────────────────────

function DubaiFacilityMap() {
  const [hoveredFacility, setHoveredFacility] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5 flex flex-col" style={{ minHeight: '420px' }}>
      {/* Card Header */}
      <div className="flex items-start justify-between mb-4 flex-shrink-0">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Dubai Facility Risk Map</h3>
          <p className="text-xs text-slate-400 mt-0.5">Live risk posture by facility location</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-50 border border-slate-200 text-slate-500">
          <MapPin size={11} />
          Dubai, UAE
        </div>
      </div>

      {/* Map Container */}
      <div className="relative flex-1 overflow-hidden rounded-lg" style={{ minHeight: '320px' }}>

        {/* SVG Map */}
        <svg
          viewBox="0 0 600 380"
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
        >
          {/* Cartographic grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94A3B8" strokeWidth="0.5" opacity="0.15" />
            </pattern>
          </defs>

          {/* Sea fill — Arabian Gulf (above coastline) */}
          <path
            d="M 0,0 L 600,0 L 600,72 C 572,74 548,76 524,79 C 496,82 470,85 446,88 C 426,91 410,94 394,97 C 378,100 362,102 342,104 C 316,107 292,110 268,114 C 244,118 222,122 202,126 C 182,130 164,134 154,128 C 146,120 148,102 144,90 C 140,80 130,78 124,90 C 118,102 116,118 108,128 C 95,138 80,142 60,148 C 35,155 15,165 0,175 Z"
            fill="#DBEAFE"
            opacity="0.55"
          />

          {/* Land fill — Dubai desert/land (below coastline) */}
          <path
            d="M 0,380 L 0,175 C 15,165 35,155 60,148 C 80,142 95,138 108,128 C 116,118 118,102 124,90 C 130,78 140,80 144,90 C 148,102 146,120 154,128 C 164,134 182,130 202,126 C 222,122 244,118 268,114 C 292,110 316,107 342,104 C 362,102 378,100 394,97 C 410,94 426,91 446,88 C 470,85 496,82 524,79 C 548,76 572,74 600,72 L 600,380 Z"
            fill="#F0EDE8"
          />

          {/* Grid overlay */}
          <rect width="600" height="380" fill="url(#grid)" />

          {/* Coastline stroke */}
          <path
            d="M 0,175 C 15,165 35,155 60,148 C 80,142 95,138 108,128 C 116,118 118,102 124,90 C 130,78 140,80 144,90 C 148,102 146,120 154,128 C 164,134 182,130 202,126 C 222,122 244,118 268,114 C 292,110 316,107 342,104 C 362,102 378,100 394,97 C 410,94 426,91 446,88 C 470,85 496,82 524,79 C 548,76 572,74 600,72"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="1.5"
            opacity="0.6"
          />

          {/* Dubai Creek */}
          <path
            d="M 360,104 Q 362,145 365,185 Q 367,215 369,240"
            stroke="#93C5FD"
            strokeWidth="3"
            fill="none"
            opacity="0.7"
            strokeLinecap="round"
          />

          {/* Neighbourhood / district labels */}
          <text x="220" y="50" fill="#60A5FA" fontSize="11" fontFamily="IBM Plex Sans, sans-serif" fontStyle="italic" textAnchor="middle">Arabian Gulf</text>
          <text x="376" y="185" fill="#60A5FA" fontSize="7" fontFamily="IBM Plex Sans, sans-serif" textAnchor="start">Dubai Creek</text>
          <text x="245" y="210" fill="#94A3B8" fontSize="8" fontFamily="IBM Plex Sans, sans-serif" textAnchor="middle">Bur Dubai</text>
          <text x="410" y="155" fill="#94A3B8" fontSize="8" fontFamily="IBM Plex Sans, sans-serif" textAnchor="middle">Deira</text>
          <text x="295" y="225" fill="#94A3B8" fontSize="8" fontFamily="IBM Plex Sans, sans-serif" textAnchor="middle">Downtown</text>
          <text x="80" y="220" fill="#94A3B8" fontSize="8" fontFamily="IBM Plex Sans, sans-serif" textAnchor="middle">Marina</text>
        </svg>

        {/* Facility Markers — absolutely positioned over SVG */}
        {facilityRiskMapData.map((facility) => {
          const color = riskColors[facility.risk];
          const isHovered = hoveredFacility === facility.id;

          return (
            <div
              key={facility.id}
              className="absolute"
              style={{
                left: `${facility.xPct}%`,
                top: `${facility.yPct}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
              }}
              onMouseEnter={() => setHoveredFacility(facility.id)}
              onMouseLeave={() => setHoveredFacility(null)}
            >
              {/* Tooltip popup — appears above marker */}
              {isHovered && (
                <div
                  className="absolute bottom-full left-1/2 mb-3 w-44 rounded-lg border shadow-lg p-2.5 pointer-events-none"
                  style={{
                    transform: 'translateX(-50%)',
                    backgroundColor: '#fff',
                    borderColor: color,
                    borderWidth: '1.5px',
                    zIndex: 20,
                  }}
                >
                  <div className="text-xs font-bold text-slate-800 mb-1 leading-tight">{facility.name}</div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">Risk Score</span>
                    <span className="text-xs font-bold" style={{ color }}>{facility.riskScore}/100</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">Active Alerts</span>
                    <span className="text-xs font-semibold text-slate-700">{facility.activeAlerts}</span>
                  </div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-slate-500">AI Solutions</span>
                    <span className="text-xs font-semibold text-slate-700">{facility.aiSolutions}</span>
                  </div>
                  <div
                    className="text-xs font-semibold px-2 py-0.5 rounded-full text-center capitalize"
                    style={{ backgroundColor: riskBgColors[facility.risk], color }}
                  >
                    {facility.risk} risk
                  </div>
                  {/* Arrow */}
                  <div
                    className="absolute top-full left-1/2"
                    style={{
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '5px solid transparent',
                      borderRight: '5px solid transparent',
                      borderTop: `6px solid ${color}`,
                    }}
                  />
                </div>
              )}

              {/* Pulse ring */}
              {facility.risk === 'high' && (
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: 32,
                    height: 32,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: `2px solid ${color}`,
                    opacity: 0.4,
                  }}
                  animate={{ scale: [1, 1.7], opacity: [0.4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeOut' }}
                />
              )}

              {facility.risk === 'medium' && (
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: 28,
                    height: 28,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: `2px solid ${color}`,
                    opacity: 0.35,
                  }}
                  animate={{ scale: [1, 1.5], opacity: [0.35, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut' }}
                />
              )}

              {/* Outer glow ring */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 20,
                  height: 20,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: color,
                  opacity: 0.18,
                }}
              />

              {/* Center dot */}
              <div
                className="relative rounded-full border-2 border-white shadow-md cursor-pointer transition-transform"
                style={{
                  width: 14,
                  height: 14,
                  backgroundColor: color,
                  transform: isHovered ? 'scale(1.35)' : 'scale(1)',
                  transition: 'transform 0.15s ease',
                }}
              />

              {/* Short name label below marker */}
              {!isHovered && (
                <div
                  className="absolute top-full left-1/2 mt-1 text-center whitespace-nowrap"
                  style={{ transform: 'translateX(-50%)' }}
                >
                  <span
                    className="text-xs font-semibold px-1.5 py-0.5 rounded shadow-sm"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      color: '#475569',
                      fontSize: '9px',
                      lineHeight: 1.4,
                    }}
                  >
                    {facility.shortName}
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-3 left-3 bg-white bg-opacity-90 rounded-md border border-slate-200 p-2 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide" style={{ fontSize: '9px' }}>Risk Level</div>
          {(['low', 'medium', 'high'] as const).map((level) => (
            <div key={level} className="flex items-center gap-1.5 mb-1 last:mb-0">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: riskColors[level] }} />
              <span className="capitalize" style={{ fontSize: '10px', color: '#64748B' }}>{level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Live Alert Feed ───────────────────────────────────────────────────────────

function LiveAlertFeed() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5 flex flex-col" style={{ minHeight: '420px' }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <h3 className="text-sm font-semibold text-slate-900">Live · Governance Events</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Real-time alerts across the ecosystem</p>
        </div>
        <Zap size={15} className="text-slate-400" />
      </div>

      {/* Alert List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1" style={{ maxHeight: '310px' }}>
        {liveAlertFeed.map((alert) => {
          const sev = severityConfig[alert.severity];
          const stat = statusConfig[alert.status];

          return (
            <div
              key={alert.id}
              className="rounded-lg border border-slate-100 p-3 hover:bg-slate-50 transition-colors cursor-default"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: sev.bg, color: sev.text, fontSize: '10px' }}
                  >
                    {sev.label}
                  </span>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full border"
                    style={{ backgroundColor: stat.bg, color: stat.text, borderColor: 'transparent', fontSize: '10px' }}
                  >
                    {stat.label}
                  </span>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">{alert.time}</span>
              </div>
              <p className="text-sm text-slate-700 leading-snug mb-1">{alert.message}</p>
              <p className="text-xs text-slate-400">{alert.system} · {alert.facility}</p>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 flex-shrink-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
        >
          <RefreshCw size={12} className="text-slate-400" />
        </motion.div>
        <span className="text-xs text-slate-400">Showing live feed · Auto-refreshing</span>
      </div>
    </div>
  );
}

// ─── Risk Trend Chart ──────────────────────────────────────────────────────────

function RiskTrendChart() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-card p-5">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Facility Risk Score Trend — 6 Months</h3>
          <p className="text-xs text-slate-400 mt-0.5">Monthly composite risk score by facility (lower is better)</p>
        </div>
        <div
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ backgroundColor: '#F0FAF0', color: '#107C10' }}
        >
          <Activity size={11} />
          All facilities improving
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={riskTrendByFacility} margin={{ top: 4, right: 16, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'IBM Plex Sans' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
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
          <ReferenceLine
            y={50}
            stroke="#D13438"
            strokeDasharray="5 3"
            strokeWidth={1.5}
            label={{
              value: 'Target Threshold',
              position: 'insideTopRight',
              fontSize: 10,
              fill: '#D13438',
              fontFamily: 'IBM Plex Sans',
            }}
          />
          <Line
            type="monotone"
            dataKey="rashid"
            name="Rashid Hospital"
            stroke="#0F6CBD"
            strokeWidth={2.5}
            dot={{ fill: '#0F6CBD', r: 3.5 }}
            activeDot={{ r: 5, fill: '#0F6CBD' }}
          />
          <Line
            type="monotone"
            dataKey="dubai"
            name="Dubai Hospital"
            stroke="#D13438"
            strokeWidth={2.5}
            dot={{ fill: '#D13438', r: 3.5 }}
            activeDot={{ r: 5, fill: '#D13438' }}
          />
          <Line
            type="monotone"
            dataKey="latifa"
            name="Latifa Hospital"
            stroke="#107C10"
            strokeWidth={2.5}
            dot={{ fill: '#107C10', r: 3.5 }}
            activeDot={{ r: 5, fill: '#107C10' }}
          />
          <Line
            type="monotone"
            dataKey="community"
            name="Community Health"
            stroke="#FFB900"
            strokeWidth={2.5}
            dot={{ fill: '#FFB900', r: 3.5 }}
            activeDot={{ r: 5, fill: '#FFB900' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function RiskCommandCenter() {
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
            <motion.div
              className="w-2 h-2 rounded-full bg-red-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            />
            <span className="text-xs font-semibold text-red-700 uppercase tracking-widest">Live · Risk Command</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Risk Command Center</h1>
          <p className="text-sm text-slate-500 mt-1">
            Ecosystem-wide AI risk monitoring · Dubai Health Governance Platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-medium text-slate-400">Last Refreshed</div>
            <div className="text-xs font-semibold text-slate-700">Today, 09:41 GST</div>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-right">
            <div className="text-xs font-medium text-slate-400">Monitoring Period</div>
            <div className="text-xs font-semibold text-slate-700">Jan – Jun 2024</div>
          </div>
        </div>
      </motion.div>

      {/* Row 1 — KPI Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard
          label="Ecosystem Risk Score"
          value="48.9"
          unit="/100"
          delta="-6.2 pts this quarter"
          deltaPositive={true}
          color="#9E5A00"
          icon={Shield}
          iconBg="#FFF4E0"
        />
        <KPICard
          label="Facilities Monitored"
          value={4}
          sublabel="22 AI solutions active"
          color="#0F6CBD"
          icon={MapPin}
          iconBg="#EAF4FF"
        />
        <KPICard
          label="Active Alerts"
          value={5}
          sublabel="2 critical, 2 high, 1 medium"
          color="#D13438"
          icon={AlertTriangle}
          iconBg="#FEF2F0"
        />
        <KPICard
          label="Mean Time to Resolve"
          value="4.2"
          unit=" hrs"
          sublabel="vs. 12.8 hrs baseline"
          color="#107C10"
          icon={Clock}
          iconBg="#F0FAF0"
        />
      </motion.div>

      {/* Row 2 — Map + Alert Feed */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <div className="xl:col-span-3">
          <DubaiFacilityMap />
        </div>
        <div className="xl:col-span-2">
          <LiveAlertFeed />
        </div>
      </motion.div>

      {/* Row 3 — Risk Trend (full width) */}
      <motion.div variants={itemVariants}>
        <RiskTrendChart />
      </motion.div>
    </motion.div>
  );
}
