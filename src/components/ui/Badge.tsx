import type { AssessmentStatus, SeverityLevel, IncidentStatus, TrainingStatus } from '../../types';

interface StatusBadgeProps {
  status: AssessmentStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<AssessmentStatus, { label: string; bg: string; text: string; dot: string }> = {
  approved: {
    label: 'Approved',
    bg: '#F0FAF0',
    text: '#107C10',
    dot: '#107C10',
  },
  approved_with_conditions: {
    label: 'Approved — Conditions',
    bg: '#FFF4E0',
    text: '#9E5A00',
    dot: '#FFB900',
  },
  requires_remediation: {
    label: 'Requires Remediation',
    bg: '#FEF2F0',
    text: '#C13515',
    dot: '#C13515',
  },
  rejected: {
    label: 'Rejected',
    bg: '#FBEAEA',
    text: '#D13438',
    dot: '#D13438',
  },
  under_review: {
    label: 'Under Review',
    bg: '#EAF4FF',
    text: '#0078D4',
    dot: '#0078D4',
  },
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      }`}
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: config.dot }}
      />
      {config.label}
    </span>
  );
}

interface SeverityBadgeProps {
  severity: SeverityLevel;
  size?: 'sm' | 'md';
}

const severityConfig: Record<SeverityLevel, { label: string; bg: string; text: string; dot: string }> = {
  critical: { label: 'Critical', bg: '#FBEAEA', text: '#D13438', dot: '#D13438' },
  high: { label: 'High', bg: '#FEF2F0', text: '#C13515', dot: '#C13515' },
  medium: { label: 'Medium', bg: '#FFF4E0', text: '#9E5A00', dot: '#FFB900' },
  low: { label: 'Low', bg: '#F0FAF0', text: '#107C10', dot: '#107C10' },
};

export function SeverityBadge({ severity, size = 'md' }: SeverityBadgeProps) {
  const config = severityConfig[severity];
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      }`}
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: config.dot }} />
      {config.label}
    </span>
  );
}

interface IncidentStatusBadgeProps {
  status: IncidentStatus;
}

const incidentStatusConfig: Record<IncidentStatus, { label: string; bg: string; text: string }> = {
  open: { label: 'Open', bg: '#FBEAEA', text: '#D13438' },
  investigating: { label: 'Investigating', bg: '#FFF4E0', text: '#9E5A00' },
  resolved: { label: 'Resolved', bg: '#F0FAF0', text: '#107C10' },
  closed: { label: 'Closed', bg: '#F8FAFC', text: '#64748B' },
};

export function IncidentStatusBadge({ status }: IncidentStatusBadgeProps) {
  const config = incidentStatusConfig[status];
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.label}
    </span>
  );
}

interface TrainingStatusBadgeProps {
  status: TrainingStatus;
}

const trainingStatusConfig: Record<TrainingStatus, { label: string; bg: string; text: string }> = {
  on_track: { label: 'On Track', bg: '#F0FAF0', text: '#107C10' },
  at_risk: { label: 'At Risk', bg: '#FFF4E0', text: '#9E5A00' },
  behind: { label: 'Behind Schedule', bg: '#FBEAEA', text: '#D13438' },
};

export function TrainingStatusBadge({ status }: TrainingStatusBadgeProps) {
  const config = trainingStatusConfig[status];
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.label}
    </span>
  );
}
