import type { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  action?: React.ReactNode;
  compact?: boolean;
}

export default function SectionHeader({
  title,
  description,
  icon: Icon,
  iconColor = '#0F6CBD',
  action,
  compact = false,
}: SectionHeaderProps) {
  return (
    <div className={`flex items-start justify-between ${compact ? 'mb-4' : 'mb-6'}`}>
      <div className="flex items-start gap-3">
        {Icon && (
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ backgroundColor: `${iconColor}18` }}
          >
            <Icon size={15} style={{ color: iconColor }} />
          </div>
        )}
        <div>
          <h2 className={`font-semibold text-slate-900 tracking-tight ${compact ? 'text-base' : 'text-lg'}`}>
            {title}
          </h2>
          {description && (
            <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
      {action && <div className="ml-4 flex-shrink-0">{action}</div>}
    </div>
  );
}
