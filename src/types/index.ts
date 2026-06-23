export type PageId =
  | 'executive-overview'
  | 'ai-assessment'
  | 'privacy-intelligence'
  | 'workforce-readiness'
  | 'roi-impact'
  | 'compliance-intelligence'
  | 'risk-command-center'
  | 'population-health';

export type AssessmentStatus =
  | 'approved'
  | 'approved_with_conditions'
  | 'requires_remediation'
  | 'rejected'
  | 'under_review';

export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low';

export type IncidentStatus = 'open' | 'investigating' | 'resolved' | 'closed';

export type TrainingStatus = 'on_track' | 'at_risk' | 'behind';

export type TrendDirection = 'improving' | 'stable' | 'declining';

export interface AssessmentDimensions {
  privacyControls: number;
  dataSovereignty: number;
  humanOversight: number;
  explainability: number;
  interoperabilityReadiness: number;
  monitoringCapability: number;
  clinicalSafety: number;
}

export interface AISolution {
  id: string;
  name: string;
  vendor: string;
  category: string;
  clinicalDomain: string;
  version: string;
  description: string;
  deploymentType: string;
  submittedDate: string;
  reviewedDate?: string;
  status: AssessmentStatus;
  overallScore: number;
  dimensions: AssessmentDimensions;
  strengths: string[];
  risks: string[];
  recommendations: string[];
  requiredActions: string[];
  reviewNotes: string;
  assessor: string;
  facilityScope: string[];
}

export interface PrivacyIncident {
  id: string;
  timestamp: string;
  severity: SeverityLevel;
  type: string;
  description: string;
  affectedSystem: string;
  impactedRecords: number;
  status: IncidentStatus;
  resolution?: string;
  assignee: string;
  facility: string;
  daysOpen: number;
}

export interface UserRiskProfile {
  userId: string;
  name: string;
  role: string;
  facility: string;
  riskScore: number;
  anomalies: number;
  lastActivity: string;
  accessPattern: 'normal' | 'elevated' | 'anomalous';
}

export interface Facility {
  id: string;
  name: string;
  shortName: string;
  type: string;
  location: string;
  totalStaff: number;
  clinicalStaff: number;
  aiLiteracyScore: number;
  governanceAwareness: number;
  adoptionReadiness: number;
  trainingCompletion: number;
  capabilityMaturity: number;
  overallReadiness: number;
  activeAISolutions: number;
  trainingStatus: TrainingStatus;
  recommendedActions: string[];
  trend: TrendDirection;
  trendDelta: number;
}

export interface GovernanceTrendPoint {
  month: string;
  monthShort: string;
  governanceScore: number;
  privacyScore: number;
  workforceReadiness: number;
  approvedSolutions: number;
  activeDeployments: number;
}

export interface AccessEventPoint {
  time: string;
  normal: number;
  elevated: number;
  anomalous: number;
}

export interface RiskDistributionPoint {
  category: string;
  value: number;
  color: string;
}

export interface SolutionCategoryPoint {
  name: string;
  count: number;
  color: string;
}

export interface CopilotQuestion {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface KPIMetric {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  delta?: number;
  deltaLabel?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
  icon?: string;
  sublabel?: string;
}
