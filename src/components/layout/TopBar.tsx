import { Bell, ChevronRight, Sparkles, Calendar, MonitorPlay } from 'lucide-react';
import type { PageId } from '../../types';

const pageMeta: Record<PageId, { title: string; description: string; breadcrumb: string[] }> = {
  'executive-overview': {
    title: 'Executive Overview',
    description: 'Ecosystem-wide AI adoption and governance intelligence for Q2 2024',
    breadcrumb: ['DHA Nabidh', 'Executive Overview'],
  },
  'ai-assessment': {
    title: 'AI Solution Assessment',
    description: 'Governance scoring and vendor evaluation for AI solutions entering the healthcare ecosystem',
    breadcrumb: ['DHA Nabidh', 'AI Solution Assessment'],
  },
  'privacy-intelligence': {
    title: 'Privacy Intelligence',
    description: 'Proactive privacy monitoring, anomaly detection and incident management',
    breadcrumb: ['DHA Nabidh', 'Privacy Intelligence'],
  },
  'workforce-readiness': {
    title: 'Workforce Readiness',
    description: 'AI adoption capability and workforce maturity across DHA facilities',
    breadcrumb: ['DHA Nabidh', 'Workforce Readiness'],
  },
  'roi-impact': {
    title: 'ROI & Business Value',
    description: 'Framework value realisation, efficiency gains and business case analysis',
    breadcrumb: ['DHA Nabidh', 'Strategic Intelligence', 'ROI & Business Value'],
  },
  'compliance-intelligence': {
    title: 'Compliance Intelligence',
    description: 'UAE regulatory framework coverage and global peer benchmarking',
    breadcrumb: ['DHA Nabidh', 'Strategic Intelligence', 'Compliance Intelligence'],
  },
  'risk-command-center': {
    title: 'Risk Command Center',
    description: 'Live facility risk monitoring, alert feed and Dubai health network map',
    breadcrumb: ['DHA Nabidh', 'Strategic Intelligence', 'Risk Command Center'],
  },
  'population-health': {
    title: 'Population Health Intelligence',
    description: 'City-wide disease clustering, care-gap mapping and predictive capacity signals',
    breadcrumb: ['DHA Nabidh', 'Strategic Intelligence', 'Population Health Intelligence'],
  },
};

interface TopBarProps {
  currentPage: PageId;
  onOpenCopilot: () => void;
  onPresent?: () => void;
  notificationCount?: number;
}

export default function TopBar({ currentPage, onOpenCopilot, onPresent, notificationCount = 4 }: TopBarProps) {
  const meta = pageMeta[currentPage];
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between flex-shrink-0 sticky top-0 z-10">
      {/* Left: Breadcrumb + Title */}
      <div>
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 mb-0.5">
          {meta.breadcrumb.map((crumb, index) => (
            <span key={index} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight size={11} className="text-slate-300" />}
              <span className={`text-xs font-medium ${
                index === meta.breadcrumb.length - 1
                  ? 'text-slate-700'
                  : 'text-slate-400'
              }`}>
                {crumb}
              </span>
            </span>
          ))}
        </div>

        {/* Page description */}
        <p className="text-xs text-slate-400 hidden md:block">{meta.description}</p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Date */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200">
          <Calendar size={12} className="text-slate-400" />
          <span className="text-xs font-medium text-slate-500">{dateStr}</span>
        </div>

        {/* Present to Board button */}
        {onPresent && (
          <button
            onClick={onPresent}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-all duration-150 hover:bg-slate-100 border border-slate-200 text-slate-600"
          >
            <MonitorPlay size={14} />
            <span className="hidden md:inline">Present</span>
          </button>
        )}

        {/* Notifications */}
        <button className="relative p-2 rounded-md hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700">
          <Bell size={16} />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-bold" style={{ backgroundColor: '#D13438' }}>
              {notificationCount}
            </span>
          )}
        </button>

        {/* Executive Copilot */}
        <button
          onClick={onOpenCopilot}
          className="flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium text-white transition-all duration-150 hover:opacity-90 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #0F6CBD 0%, #0078D4 100%)' }}
        >
          <Sparkles size={14} />
          <span className="hidden sm:inline">Executive Intelligence</span>
        </button>
      </div>
    </header>
  );
}
