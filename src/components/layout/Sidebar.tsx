import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ClipboardCheck,
  Shield,
  Users,
  ChevronRight,
  Activity,
  Settings,
  HelpCircle,
  TrendingUp,
  Scale,
  AlertOctagon,
  HeartPulse,
} from 'lucide-react';
import type { PageId } from '../../types';

interface NavItem {
  id: PageId;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const coreNavItems: NavItem[] = [
  {
    id: 'executive-overview',
    label: 'Executive Overview',
    sublabel: 'Ecosystem intelligence',
    icon: LayoutDashboard,
  },
  {
    id: 'ai-assessment',
    label: 'AI Solution Assessment',
    sublabel: 'Governance scoring',
    icon: ClipboardCheck,
  },
  {
    id: 'privacy-intelligence',
    label: 'Privacy Intelligence',
    sublabel: 'Risk monitoring',
    icon: Shield,
  },
  {
    id: 'workforce-readiness',
    label: 'Workforce Readiness',
    sublabel: 'Adoption capability',
    icon: Users,
  },
];

const strategicNavItems: NavItem[] = [
  {
    id: 'roi-impact',
    label: 'ROI & Business Value',
    sublabel: 'Value realisation',
    icon: TrendingUp,
  },
  {
    id: 'compliance-intelligence',
    label: 'Compliance Intelligence',
    sublabel: 'Regulatory coverage',
    icon: Scale,
  },
  {
    id: 'risk-command-center',
    label: 'Risk Command Center',
    sublabel: 'Live facility risk',
    icon: AlertOctagon,
  },
  {
    id: 'population-health',
    label: 'Population Health Intelligence',
    sublabel: 'City-wide disease & capacity signals',
    icon: HeartPulse,
  },
];

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

function NavItemButton({
  item,
  isActive,
  onNavigate,
}: {
  item: NavItem;
  isActive: boolean;
  onNavigate: (page: PageId) => void;
}) {
  const Icon = item.icon;
  return (
    <motion.button
      key={item.id}
      onClick={() => onNavigate(item.id)}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-all duration-150 group relative ${
        isActive
          ? 'text-blue-700'
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
      style={isActive ? { backgroundColor: '#EAF4FF' } : {}}
      whileHover={{ x: isActive ? 0 : 1 }}
      whileTap={{ scale: 0.99 }}
    >
      {isActive && (
        <motion.div
          layoutId="activeBar"
          className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r-full"
          style={{ backgroundColor: '#0F6CBD' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      <Icon
        size={16}
        className={isActive ? 'flex-shrink-0' : 'flex-shrink-0 text-slate-400 group-hover:text-slate-600 transition-colors'}
        style={isActive ? { color: '#0F6CBD' } : {}}
      />
      <div className="flex-1 min-w-0">
        <div
          className="text-sm font-medium leading-tight truncate"
          style={isActive ? { color: '#0F6CBD' } : {}}
        >
          {item.label}
        </div>
        <div className="text-xs text-slate-400 mt-0.5 leading-tight truncate">{item.sublabel}</div>
      </div>
      {isActive && (
        <ChevronRight size={12} className="flex-shrink-0 opacity-60" style={{ color: '#0F6CBD' }} />
      )}
    </motion.button>
  );
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      {/* Logo Header */}
      <div className="px-5 pt-6 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #0F6CBD 0%, #0078D4 100%)' }}>
            <Activity size={18} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 leading-tight tracking-tight">Dubai Health</div>
            <div className="text-xs text-slate-400 font-medium leading-tight">Nabidh AI Framework</div>
          </div>
        </div>

        {/* Framework badge */}
        <div className="mt-4 px-3 py-2 rounded-md" style={{ backgroundColor: '#EAF4FF' }}>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-soft"></div>
            <span className="text-xs font-semibold" style={{ color: '#0F6CBD' }}>Framework Active</span>
          </div>
          <div className="text-xs text-slate-500 mt-0.5 font-medium">Q2 2024 · Cycle 3</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {/* Core Nav */}
        <div className="mb-2 px-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Navigation</span>
        </div>
        <div className="space-y-0.5">
          {coreNavItems.map((item) => (
            <NavItemButton
              key={item.id}
              item={item}
              isActive={currentPage === item.id}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-slate-100" />

        {/* Strategic Intelligence Nav */}
        <div className="mb-2 px-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Strategic Intelligence</span>
        </div>
        <div className="space-y-0.5">
          {strategicNavItems.map((item) => (
            <NavItemButton
              key={item.id}
              item={item}
              isActive={currentPage === item.id}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-slate-100" />

        {/* Quick Stats */}
        <div className="px-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Ecosystem Status</span>
        </div>

        <div className="mx-1 rounded-md border border-slate-200 bg-slate-50 overflow-hidden">
          <div className="px-3 py-2.5 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Solutions Approved</span>
            <span className="text-sm font-bold text-slate-900">31</span>
          </div>
          <div className="border-t border-slate-200 px-3 py-2.5 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Under Review</span>
            <span className="text-sm font-bold text-amber-600">8</span>
          </div>
          <div className="border-t border-slate-200 px-3 py-2.5 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Open Incidents</span>
            <span className="text-sm font-bold text-red-600">4</span>
          </div>
          <div className="border-t border-slate-200 px-3 py-2.5 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Governance Score</span>
            <span className="text-sm font-bold" style={{ color: '#0F6CBD' }}>82.4</span>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-slate-100">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: '#0F6CBD' }}>
            DR
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-slate-700 truncate">Dr. Redha</div>
            <div className="text-xs text-slate-400 truncate">Director</div>
          </div>
          <button className="p-1 rounded hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600">
            <Settings size={13} />
          </button>
        </div>

        <div className="mt-2 flex items-center gap-1 px-2">
          <button className="flex items-center gap-1.5 px-2 py-1.5 rounded text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors">
            <HelpCircle size={12} />
            Support
          </button>
          <div className="ml-auto text-xs text-slate-400">v2.4.1</div>
        </div>
      </div>
    </aside>
  );
}
