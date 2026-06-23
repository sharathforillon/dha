import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string | number;
  unit?: string;
  delta?: number;
  deltaLabel?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  sublabel?: string;
  index?: number;
  accent?: boolean;
  onClick?: () => void;
}

export default function KPICard({
  label,
  value,
  unit,
  delta,
  deltaLabel,
  trend = 'neutral',
  icon: Icon,
  iconColor = '#0F6CBD',
  iconBg = '#EAF4FF',
  sublabel,
  index = 0,
  accent = false,
  onClick,
}: KPICardProps) {
  const trendColor = trend === 'up' ? '#107C10' : trend === 'down' ? '#D13438' : '#64748B';
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const isClickable = !!onClick;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      whileHover={isClickable ? { y: -2 } : {}}
      whileTap={isClickable ? { scale: 0.98 } : {}}
      className={`bg-white rounded-lg border p-5 shadow-card transition-all duration-200 group relative ${
        isClickable ? 'cursor-pointer hover:shadow-card-hover' : 'cursor-default'
      } ${accent ? 'border-blue-200' : 'border-slate-200'}`}
      style={accent ? { borderColor: '#BFDBFE' } : {}}
    >
      {/* Clickable hint */}
      {isClickable && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center gap-1 text-xs font-medium" style={{ color: iconColor }}>
          <span>Details</span>
          <ChevronRight size={11} />
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 leading-tight">
            {label}
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold text-slate-900 tracking-tight leading-none">
              {value}
            </span>
            {unit && (
              <span className="text-sm font-medium text-slate-400">{unit}</span>
            )}
          </div>
          {sublabel && (
            <div className="text-xs text-slate-400 mt-1.5 leading-tight">{sublabel}</div>
          )}
          {(delta !== undefined || deltaLabel) && (
            <div className="flex items-center gap-1.5 mt-3">
              <div
                className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold"
                style={{
                  backgroundColor: trend === 'up' ? '#F0FAF0' : trend === 'down' ? '#FBEAEA' : '#F8FAFC',
                  color: trendColor,
                }}
              >
                <TrendIcon size={10} />
                {delta !== undefined && (
                  <span>{trend === 'up' ? '+' : ''}{delta}</span>
                )}
              </div>
              {deltaLabel && (
                <span className="text-xs text-slate-400">{deltaLabel}</span>
              )}
            </div>
          )}
        </div>

        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ml-3 transition-transform duration-200 ${isClickable ? 'group-hover:scale-110' : ''}`}
          style={{ backgroundColor: iconBg }}
        >
          <Icon size={18} style={{ color: iconColor }} />
        </div>
      </div>

      {/* Bottom border accent on hover */}
      {isClickable && (
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-lg scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
          style={{ backgroundColor: iconColor }}
        />
      )}
    </motion.div>
  );
}
