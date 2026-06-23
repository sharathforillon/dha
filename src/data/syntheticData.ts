import type {
  AISolution,
  PrivacyIncident,
  UserRiskProfile,
  Facility,
  GovernanceTrendPoint,
  AccessEventPoint,
  RiskDistributionPoint,
  SolutionCategoryPoint,
  CopilotQuestion,
} from '../types';

// ─── AI Solutions ────────────────────────────────────────────────────────────

export const aiSolutions: AISolution[] = [
  {
    id: 'sol-001',
    name: 'ClinDoc Copilot',
    vendor: 'NovaMed AI Technologies',
    category: 'Clinical Documentation',
    clinicalDomain: 'Multi-Specialty',
    version: '3.4.1',
    description: 'AI-powered clinical documentation assistant that generates structured clinical notes from physician dictation using large language models trained on clinical corpora. Integrates natively with existing EMR systems.',
    deploymentType: 'SaaS — Dubai Cloud Region',
    submittedDate: '2024-01-15',
    reviewedDate: '2024-02-28',
    status: 'approved',
    overallScore: 89,
    dimensions: {
      privacyControls: 91,
      dataSovereignty: 88,
      humanOversight: 94,
      explainability: 82,
      interoperabilityReadiness: 90,
      monitoringCapability: 87,
      clinicalSafety: 93,
    },
    strengths: [
      'Comprehensive data residency controls with all processing confined to DHA-approved UAE infrastructure',
      'Robust human-in-the-loop workflow requiring physician review and attestation before note finalization',
      'Fully auditable suggestion trail with confidence scores visible to clinical staff',
      'Validated HL7 FHIR R4 integration with DHA Nabidh platform confirmed',
      'Demonstrated clinical safety in 18-month pilot across 3,200 patient encounters with zero clinical errors',
    ],
    risks: [
      'Model training dataset provenance documentation requires supplementary verification for post-2023 updates',
      'Edge case performance in complex multi-morbidity scenarios needs additional validation',
    ],
    recommendations: [
      'Implement quarterly model drift monitoring with clinical validation threshold alerts',
      'Establish structured feedback loop between clinical champions and vendor AI team',
      'Expand pilot to include paediatric specialties before broad deployment',
      'Conduct annual third-party algorithmic audit with findings disclosed to DHA governance board',
    ],
    requiredActions: [
      'Submit updated model card documenting 2024 training dataset composition by Q3 2024',
      'Complete integration certification for Nabidh Release 4.2 within 60 days of release',
    ],
    reviewNotes: 'ClinDoc Copilot demonstrates strong governance maturity and clinical safety controls. The solution represents a best-in-class example of responsible clinical AI deployment. Approved for ecosystem-wide deployment subject to standard monitoring requirements. Assessor recommends this solution as a reference implementation for future documentation AI evaluations.',
    assessor: 'Dr. Khalid Al-Rashidi, Clinical AI Review Board',
    facilityScope: ['Rashid Hospital', 'Dubai Hospital', 'Latifa Hospital', 'Community Health Network'],
  },
  {
    id: 'sol-002',
    name: 'ClearScribe Pro',
    vendor: 'AudioMed Technologies GmbH',
    category: 'Ambient Clinical Scribe',
    clinicalDomain: 'Ambulatory Care',
    version: '2.1.0',
    description: 'Ambient voice AI system that passively listens to patient-physician encounters and generates structured clinical documentation in real-time. Processes audio streams using federated on-device models.',
    deploymentType: 'On-Premise + Edge Processing',
    submittedDate: '2024-02-08',
    reviewedDate: '2024-04-12',
    status: 'approved_with_conditions',
    overallScore: 76,
    dimensions: {
      privacyControls: 78,
      dataSovereignty: 72,
      humanOversight: 88,
      explainability: 69,
      interoperabilityReadiness: 74,
      monitoringCapability: 71,
      clinicalSafety: 82,
    },
    strengths: [
      'On-device audio processing ensures patient voice data never leaves the clinical environment',
      'Structured physician review workflow prevents direct note insertion without attestation',
      'Clinical safety performance validated in 1,200 encounters across outpatient settings',
      'Transparent confidence scoring surfaced in physician review interface',
    ],
    risks: [
      'Audio retention policy requires clarification — current default retains transcription buffers for 72 hours',
      'FHIR integration is version-locked to R3; R4 upgrade roadmap needed for Nabidh compatibility',
      'Explainability framework does not provide specialty-specific reasoning pathways',
      'Third-party audio processing library introduces supply chain dependency not documented in vendor SLA',
    ],
    recommendations: [
      'Mandate immediate-deletion policy for audio buffers following transcription confirmation',
      'Require FHIR R4 upgrade within 6 months as condition of continued approval',
      'Implement specialty-aware model configurations with documented clinical validation per specialty',
    ],
    requiredActions: [
      'Deliver revised audio retention policy with zero-retention option within 30 days',
      'Provide FHIR R4 migration roadmap with committed delivery date within 45 days',
      'Submit third-party library security assessment within 60 days',
      'Complete DHA data processing agreement addendum within 15 days',
    ],
    reviewNotes: 'ClearScribe Pro demonstrates promising clinical utility with strong on-device privacy architecture. However, gaps in data sovereignty documentation and FHIR compatibility require remediation before full ecosystem deployment. Approved with conditions for limited deployment at Rashid Hospital Ambulatory Care only. Conditions must be resolved within 90 days for continued operation.',
    assessor: 'Ms. Fatima Al-Zahra, Privacy & Governance Lead',
    facilityScope: ['Rashid Hospital'],
  },
  {
    id: 'sol-003',
    name: 'RadiologyAI Dx',
    vendor: 'HealthVision Systems Inc.',
    category: 'Diagnostic AI',
    clinicalDomain: 'Radiology',
    version: '5.0.3',
    description: 'FDA-cleared AI diagnostic assistant for chest X-ray and CT analysis, providing structured findings with confidence intervals and differential prioritization. Designed as decision support for radiologists.',
    deploymentType: 'On-Premise — Hospital Infrastructure',
    submittedDate: '2023-11-20',
    reviewedDate: '2024-01-18',
    status: 'approved',
    overallScore: 91,
    dimensions: {
      privacyControls: 93,
      dataSovereignty: 95,
      humanOversight: 97,
      explainability: 88,
      interoperabilityReadiness: 91,
      monitoringCapability: 89,
      clinicalSafety: 95,
    },
    strengths: [
      'FDA 510(k) clearance and CE marking with extensive clinical validation across 280,000 imaging studies',
      'All inference processing performed on-premise — no patient imaging data transmitted externally',
      'Saliency mapping provides pixel-level visual explanation for all AI findings surfaced to radiologists',
      'Mandatory radiologist review gate — system cannot generate final report autonomously',
      'Continuous performance monitoring dashboard with facility-specific sensitivity/specificity metrics',
      'Full DICOM and HL7 FHIR R4 compliance verified through Nabidh integration certification programme',
    ],
    risks: [
      'Performance validation on regional Middle Eastern population demographics requires supplementary study',
      'Vendor model update cadence (quarterly) requires re-validation protocol to be embedded in governance plan',
    ],
    recommendations: [
      'Commission DHA-sponsored retrospective validation study on UAE patient imaging population',
      'Implement automated performance regression alerts triggered by model updates',
      'Establish radiologist feedback mechanism for edge cases to enrich training dataset',
    ],
    requiredActions: [
      'Complete UAE population validation study protocol submission within 90 days',
      'Integrate model update notification into DHA governance calendar',
    ],
    reviewNotes: 'RadiologyAI Dx represents the highest governance maturity observed in this evaluation cycle. The solution demonstrates exemplary human oversight architecture, comprehensive explainability, and robust clinical safety controls. Approved without conditions for deployment across all DHA radiology facilities. Recommended as Tier 1 AI solution and governance benchmark.',
    assessor: 'Prof. Ahmed Al-Mansouri, Clinical AI Review Board',
    facilityScope: ['Rashid Hospital', 'Dubai Hospital', 'Latifa Hospital'],
  },
  {
    id: 'sol-004',
    name: 'PatientConnect IQ',
    vendor: 'Engage Health Solutions',
    category: 'Patient Engagement',
    clinicalDomain: 'Patient Experience',
    version: '1.8.2',
    description: 'Multilingual AI-powered patient engagement platform providing symptom pre-screening, appointment scheduling optimization, care pathway guidance, and post-discharge follow-up. Supports Arabic and English.',
    deploymentType: 'SaaS — Multi-Region',
    submittedDate: '2024-03-01',
    reviewedDate: '2024-05-14',
    status: 'approved_with_conditions',
    overallScore: 82,
    dimensions: {
      privacyControls: 84,
      dataSovereignty: 79,
      humanOversight: 86,
      explainability: 81,
      interoperabilityReadiness: 83,
      monitoringCapability: 78,
      clinicalSafety: 84,
    },
    strengths: [
      'Native Arabic language support with culturally appropriate healthcare communication validated by clinical linguists',
      'Clear escalation pathways to human clinical coordinators for all symptom-related interactions',
      'Transparent reasoning display for symptom triage recommendations visible to patients',
      'Strong consent management framework with granular patient opt-in controls',
    ],
    risks: [
      'Multi-region data residency configuration requires UAE-only enforcement — current default allows EU fallback',
      'Symptom triage accuracy for paediatric cases not independently validated in Arabic language',
      'Monitoring dashboard does not surface conversation-level anomaly detection',
    ],
    recommendations: [
      'Mandate UAE-only data residency configuration as deployment prerequisite',
      'Commission paediatric Arabic triage validation study before deployment at Latifa Hospital',
      'Implement conversation anomaly monitoring with clinical escalation triggers',
    ],
    requiredActions: [
      'Enforce UAE-only data residency configuration and provide technical evidence within 21 days',
      'Submit paediatric triage validation protocol within 45 days',
      'Deliver enhanced monitoring dashboard with anomaly detection within 90 days',
    ],
    reviewNotes: 'PatientConnect IQ shows strong patient engagement capability and cultural alignment. Data residency configuration deficiency is the primary barrier to full approval and must be remediated immediately. Approved with conditions for deployment at Rashid Hospital and Dubai Hospital adult services only. Latifa Hospital deployment suspended pending paediatric validation.',
    assessor: 'Ms. Maryam Al-Hashimi, Patient Safety Officer',
    facilityScope: ['Rashid Hospital', 'Dubai Hospital'],
  },
  {
    id: 'sol-005',
    name: 'ChronicCare Analytics',
    vendor: 'PredictiveCare AI Ltd.',
    category: 'Clinical Analytics',
    clinicalDomain: 'Chronic Disease Management',
    version: '2.0.1',
    description: 'Machine learning risk stratification platform predicting 12-month hospitalization risk for patients with Type 2 Diabetes, Heart Failure, and COPD using structured EMR data and lab results.',
    deploymentType: 'SaaS — UK Infrastructure (Primary)',
    submittedDate: '2024-04-15',
    reviewedDate: '2024-06-20',
    status: 'requires_remediation',
    overallScore: 64,
    dimensions: {
      privacyControls: 61,
      dataSovereignty: 52,
      humanOversight: 71,
      explainability: 58,
      interoperabilityReadiness: 68,
      monitoringCapability: 63,
      clinicalSafety: 75,
    },
    strengths: [
      'Demonstrated predictive accuracy (AUC 0.83) in UK NHS validation cohort for heart failure readmission',
      'Human review required before risk stratification results influence care pathway assignment',
      'Clear model card documentation for UK training cohort with feature importance rankings',
    ],
    risks: [
      'Primary data processing infrastructure located in UK — critical data sovereignty violation for UAE patient data',
      'Model trained exclusively on UK population — demographic, genetic and lifestyle factors differ significantly in UAE',
      'SHAP explanations provided but not validated for clinical interpretability by UAE clinicians',
      'No UAE or MENA region validation cohort study submitted',
      'Monitoring capability limited to aggregate performance — no patient-level anomaly detection',
      'Consent framework does not meet UAE PDPL requirements for predictive analytics use',
    ],
    recommendations: [
      'Reject current deployment request and require UAE infrastructure migration as primary condition',
      'Mandate UAE/MENA population validation study with minimum 10,000 patient cohort',
      'Require clinical interpretability validation of SHAP explanations by UAE clinicians before resubmission',
      'Develop UAE PDPL-compliant consent framework for predictive analytics',
    ],
    requiredActions: [
      'Migrate all data processing to UAE infrastructure — mandatory condition for resubmission',
      'Commission UAE population validation study and submit results with reapplication',
      'Revise consent framework to meet UAE PDPL Article 4 requirements',
      'Engage DHA Clinical AI Review Board for pre-submission meeting before next application',
      'Provide detailed remediation roadmap within 30 days',
    ],
    reviewNotes: 'ChronicCare Analytics cannot be approved in its current state. The UK infrastructure deployment model creates a fundamental data sovereignty violation that cannot be mitigated through technical controls. Additionally, the absence of UAE population validation raises significant clinical safety concerns given well-documented population-specific risk factor differences. Vendor must address all critical findings before resubmission. DHA reserves the right to conduct an on-site technical audit upon reapplication.',
    assessor: 'Dr. Omar Al-Kaabi, Data Sovereignty Review Panel',
    facilityScope: [],
  },
  {
    id: 'sol-006',
    name: 'MedSafe Intelligence',
    vendor: 'PharmAI Corporation',
    category: 'Medication Safety',
    clinicalDomain: 'Pharmacy & Prescribing',
    version: '4.2.0',
    description: 'AI-powered medication safety platform providing real-time drug interaction checking, allergy cross-referencing, contraindication alerts, and dose optimization recommendations at the point of prescribing.',
    deploymentType: 'On-Premise — Hospital Infrastructure',
    submittedDate: '2023-12-10',
    reviewedDate: '2024-02-05',
    status: 'approved',
    overallScore: 88,
    dimensions: {
      privacyControls: 90,
      dataSovereignty: 93,
      humanOversight: 92,
      explainability: 86,
      interoperabilityReadiness: 88,
      monitoringCapability: 84,
      clinicalSafety: 91,
    },
    strengths: [
      'Entirely on-premise deployment with no external data transmission — complete data sovereignty',
      'All prescribing recommendations require pharmacist or physician acceptance — hardcoded human gate',
      'Alert rationale displayed in plain language with referenced clinical evidence source',
      'Validated against DHA formulary and UAE medication regulations',
      'Real-time performance monitoring with false positive/negative tracking by medication class',
    ],
    risks: [
      'Drug interaction database update mechanism requires formalised DHA validation process for new entries',
      'Alert fatigue monitoring metrics not yet integrated with hospital incident reporting system',
    ],
    recommendations: [
      'Establish quarterly DHA formulary alignment review process with vendor clinical pharmacist team',
      'Integrate alert fatigue metrics into hospital patient safety reporting dashboard',
    ],
    requiredActions: [
      'Submit drug interaction database governance protocol for DHA review within 60 days',
      'Deliver alert fatigue integration with hospital incident reporting within 120 days',
    ],
    reviewNotes: 'MedSafe Intelligence demonstrates strong clinical safety and governance controls appropriate for a high-stakes prescribing support application. The on-premise architecture ensures complete data sovereignty. Approved for deployment across all DHA facilities. The solution represents a reference implementation for medication safety AI governance.',
    assessor: 'Dr. Khalid Al-Rashidi, Clinical AI Review Board',
    facilityScope: ['Rashid Hospital', 'Dubai Hospital', 'Latifa Hospital', 'Community Health Network'],
  },
  {
    id: 'sol-007',
    name: 'SurgPlan AI',
    vendor: 'PrecisionSurgery Technologies',
    category: 'Surgical Support',
    clinicalDomain: 'Surgical Specialties',
    version: '1.2.0',
    description: 'AI-assisted surgical planning platform using 3D imaging reconstruction and biomechanical modeling to support pre-operative planning for orthopaedic, cardiovascular and neurosurgical procedures.',
    deploymentType: 'On-Premise — Surgical Suite Integration',
    submittedDate: '2024-05-20',
    reviewedDate: undefined,
    status: 'under_review',
    overallScore: 71,
    dimensions: {
      privacyControls: 78,
      dataSovereignty: 81,
      humanOversight: 85,
      explainability: 62,
      interoperabilityReadiness: 69,
      monitoringCapability: 58,
      clinicalSafety: 74,
    },
    strengths: [
      'On-premise deployment with no patient imaging data transmitted externally',
      'All surgical plans require dual surgeon review and approval before operative use',
      'CE-marked for orthopaedic applications with supporting clinical evidence portfolio',
    ],
    risks: [
      'Cardiovascular and neurosurgical applications lack regulatory clearance documentation',
      'Explainability framework limited — 3D model generation reasoning not transparent to surgeons',
      'Monitoring capability is early stage — no post-surgical outcome tracking implemented',
      'Clinical validation limited to European patient population; no MENA validation data',
      'FHIR integration not yet certified for Nabidh compatibility',
    ],
    recommendations: [
      'Restrict deployment to CE-marked orthopaedic application only pending cardiovascular/neurosurgical clearance',
      'Develop surgeon-facing explainability interface for 3D model generation decisions',
      'Implement post-surgical outcome tracking as part of monitoring framework',
    ],
    requiredActions: [
      'Submit regulatory clearance documentation for cardiovascular and neurosurgical applications',
      'Provide MENA population validation study plan within 30 days',
      'Deliver Nabidh FHIR integration certification within 45 days',
      'Submit enhanced explainability framework design within 60 days',
    ],
    reviewNotes: 'SurgPlan AI presents an innovative surgical planning capability with strong data sovereignty architecture. However, the assessment is currently incomplete — regulatory clearance for non-orthopaedic applications is pending review, and clinical validation gaps require resolution. Assessment under active review with target completion date of Q3 2024. Interim deployment not permitted pending assessment completion.',
    assessor: 'Prof. Ahmed Al-Mansouri, Clinical AI Review Board',
    facilityScope: [],
  },
];

// ─── Privacy Incidents ────────────────────────────────────────────────────────

export const privacyIncidents: PrivacyIncident[] = [
  {
    id: 'PI-2024-089',
    timestamp: '2024-06-02T09:14:00Z',
    severity: 'critical',
    type: 'Unauthorised Data Export',
    description: 'Bulk export of 2,847 patient records detected from ClinDoc Copilot API endpoint to unregistered external IP address. Export included structured clinical notes and demographic data.',
    affectedSystem: 'ClinDoc Copilot — API Gateway',
    impactedRecords: 2847,
    status: 'resolved',
    resolution: 'Compromised service account credentials identified and revoked within 4 hours. API gateway firewall rules updated. Affected patients notified in compliance with UAE PDPL Article 23. Regulatory notification submitted to DHA Privacy Office.',
    assignee: 'Ahmad Al-Farsi, Security Operations',
    facility: 'Rashid Hospital',
    daysOpen: 0,
  },
  {
    id: 'PI-2024-094',
    timestamp: '2024-06-08T14:32:00Z',
    severity: 'high',
    type: 'Anomalous Access Pattern',
    description: 'Elevated access pattern detected in oncology patient records module. Single user account accessed 340 records within 2.5 hours, significantly exceeding baseline of 28 records per session. AI monitoring system triggered automated alert.',
    affectedSystem: 'PatientConnect IQ — Records Access Module',
    impactedRecords: 340,
    status: 'investigating',
    assignee: 'Sara Al-Mahmoud, Privacy Investigations',
    facility: 'Dubai Hospital',
    daysOpen: 13,
  },
  {
    id: 'PI-2024-101',
    timestamp: '2024-06-15T11:05:00Z',
    severity: 'high',
    type: 'Training Data PHI Exposure',
    description: 'Discovery that AI model fine-tuning dataset submitted by vendor ChronicCare Analytics contains unmasked UAE patient identifiers in 412 records. Dataset was provided in violation of DHA data anonymisation requirements.',
    affectedSystem: 'ChronicCare Analytics — Model Training Pipeline',
    impactedRecords: 412,
    status: 'open',
    assignee: 'Dr. Rania Hassan, Data Governance',
    facility: 'Multiple Facilities',
    daysOpen: 6,
  },
  {
    id: 'PI-2024-107',
    timestamp: '2024-06-17T03:44:00Z',
    severity: 'medium',
    type: 'Brute Force Authentication Attempt',
    description: 'Multiple failed authentication attempts (847 in 90 minutes) detected against MedSafe Intelligence administrative console from external IP range registered to non-approved jurisdiction.',
    affectedSystem: 'MedSafe Intelligence — Admin Console',
    impactedRecords: 0,
    status: 'resolved',
    resolution: 'IP range blocked at perimeter firewall. Account lockout policy enforced. No successful authentications confirmed. Penetration test commissioned to validate access control robustness.',
    assignee: 'Ahmad Al-Farsi, Security Operations',
    facility: 'Latifa Hospital',
    daysOpen: 0,
  },
  {
    id: 'PI-2024-112',
    timestamp: '2024-06-18T23:17:00Z',
    severity: 'medium',
    type: 'Out-of-Hours Access',
    description: 'User account accessed 58 patient records through RadiologyAI Dx between 23:00 and 02:30, outside assigned shift hours. No on-call assignment found for this period in scheduling system.',
    affectedSystem: 'RadiologyAI Dx — PACS Integration',
    impactedRecords: 58,
    status: 'resolved',
    resolution: 'Access verified as legitimate emergency radiologist cover following staff rota error. Scheduling system updated. No privacy violation confirmed. Monitoring alert tuning applied to reduce similar false positives.',
    assignee: 'Noor Al-Qasimi, Privacy Investigations',
    facility: 'Rashid Hospital',
    daysOpen: 0,
  },
  {
    id: 'PI-2024-118',
    timestamp: '2024-06-19T09:30:00Z',
    severity: 'medium',
    type: 'Data Retention Violation',
    description: 'AI system audit logs for ClearScribe Pro retained for 18 months, exceeding the DHA-mandated 12-month retention policy. 6 months of logs covering approximately 14,200 patient sessions require secure deletion.',
    affectedSystem: 'ClearScribe Pro — Audit Log System',
    impactedRecords: 14200,
    status: 'open',
    assignee: 'Dr. Rania Hassan, Data Governance',
    facility: 'Rashid Hospital',
    daysOpen: 2,
  },
  {
    id: 'PI-2024-125',
    timestamp: '2024-06-20T15:22:00Z',
    severity: 'medium',
    type: 'API PII Disclosure',
    description: 'PatientConnect IQ REST API response inadvertently included unfiltered patient email addresses and phone numbers in JSON payload returned to third-party integration endpoint. Issue identified during routine API security scan.',
    affectedSystem: 'PatientConnect IQ — Integration API',
    impactedRecords: 193,
    status: 'investigating',
    assignee: 'Sara Al-Mahmoud, Privacy Investigations',
    facility: 'Dubai Hospital',
    daysOpen: 1,
  },
  {
    id: 'PI-2024-131',
    timestamp: '2024-05-28T07:55:00Z',
    severity: 'high',
    type: 'Unauthorised Data Transfer',
    description: 'Encrypted backup of clinical data transmitted to EU cloud region by ClearScribe Pro backup scheduler. UAE data residency requirement violated. 34GB of clinical session data affected.',
    affectedSystem: 'ClearScribe Pro — Backup Scheduler',
    impactedRecords: 8420,
    status: 'resolved',
    resolution: 'Backup scheduler reconfigured to UAE-only endpoints. EU copy securely deleted with cryptographic erasure certificate obtained. Vendor issued formal notice of contract breach. Condition added to approval requiring monthly residency compliance attestation.',
    assignee: 'Dr. Omar Al-Kaabi, Data Sovereignty',
    facility: 'Rashid Hospital',
    daysOpen: 0,
  },
  {
    id: 'PI-2024-137',
    timestamp: '2024-06-20T11:14:00Z',
    severity: 'low',
    type: 'Audit Trail Gap',
    description: 'RadiologyAI Dx audit logs show 23-minute gap where AI recommendation acceptance/rejection events were not recorded due to a scheduled system maintenance window that was not properly handled.',
    affectedSystem: 'RadiologyAI Dx — Audit Trail',
    impactedRecords: 0,
    status: 'open',
    assignee: 'Noor Al-Qasimi, Privacy Investigations',
    facility: 'Dubai Hospital',
    daysOpen: 1,
  },
  {
    id: 'PI-2024-143',
    timestamp: '2024-06-21T08:00:00Z',
    severity: 'low',
    type: 'Consent Metadata Gap',
    description: 'Research consent metadata flag not properly propagated from Nabidh patient consent record to PatientConnect IQ data processing layer, potentially allowing research data use for 17 patients who had withdrawn consent.',
    affectedSystem: 'PatientConnect IQ — Consent Integration',
    impactedRecords: 17,
    status: 'open',
    assignee: 'Dr. Rania Hassan, Data Governance',
    facility: 'Community Health Network',
    daysOpen: 0,
  },
];

// ─── User Risk Profiles ───────────────────────────────────────────────────────

export const userRiskProfiles: UserRiskProfile[] = [
  {
    userId: 'USR-4421',
    name: 'M. Al-Rashidi',
    role: 'Senior Registrar',
    facility: 'Dubai Hospital',
    riskScore: 87,
    anomalies: 14,
    lastActivity: '2024-06-21T09:14:00Z',
    accessPattern: 'anomalous',
  },
  {
    userId: 'USR-2819',
    name: 'F. Khouri',
    role: 'Clinical Coordinator',
    facility: 'Rashid Hospital',
    riskScore: 62,
    anomalies: 7,
    lastActivity: '2024-06-20T16:45:00Z',
    accessPattern: 'elevated',
  },
  {
    userId: 'USR-7103',
    name: 'A. Al-Zahrawi',
    role: 'Pharmacist',
    facility: 'Latifa Hospital',
    riskScore: 48,
    anomalies: 4,
    lastActivity: '2024-06-21T08:30:00Z',
    accessPattern: 'elevated',
  },
  {
    userId: 'USR-5582',
    name: 'S. Naqvi',
    role: 'Radiologist',
    facility: 'Rashid Hospital',
    riskScore: 31,
    anomalies: 2,
    lastActivity: '2024-06-21T07:22:00Z',
    accessPattern: 'normal',
  },
];

// ─── Facilities ───────────────────────────────────────────────────────────────

export const facilities: Facility[] = [
  {
    id: 'fac-001',
    name: 'Rashid Hospital',
    shortName: 'Rashid',
    type: 'Tertiary Referral Centre',
    location: 'Oud Metha, Dubai',
    totalStaff: 3840,
    clinicalStaff: 2210,
    aiLiteracyScore: 74,
    governanceAwareness: 82,
    adoptionReadiness: 79,
    trainingCompletion: 88,
    capabilityMaturity: 71,
    overallReadiness: 78,
    activeAISolutions: 8,
    trainingStatus: 'on_track',
    trend: 'improving',
    trendDelta: 6.2,
    recommendedActions: [
      'Complete advanced AI governance training for 180 remaining clinical staff by Q3 2024',
      'Establish AI Clinical Champion network across all 14 specialties',
      'Deploy ClinDoc Copilot to remaining 4 specialties — Cardiology, Neurology, Oncology, Paediatrics',
    ],
  },
  {
    id: 'fac-002',
    name: 'Dubai Hospital',
    shortName: 'Dubai Hosp.',
    type: 'Tertiary General Hospital',
    location: 'Al Baraha, Dubai',
    totalStaff: 3120,
    clinicalStaff: 1840,
    aiLiteracyScore: 68,
    governanceAwareness: 76,
    adoptionReadiness: 72,
    trainingCompletion: 79,
    capabilityMaturity: 65,
    overallReadiness: 71,
    activeAISolutions: 6,
    trainingStatus: 'at_risk',
    trend: 'stable',
    trendDelta: 1.4,
    recommendedActions: [
      'Accelerate AI literacy training — 42% of clinical staff have not completed Foundation module',
      'Appoint dedicated AI Governance Lead to manage active incident backlog',
      'Address 2 open privacy incidents (PI-2024-094, PI-2024-125) within 10 business days',
      'Enrol in DHA AI Governance Intensive Programme for department heads',
    ],
  },
  {
    id: 'fac-003',
    name: 'Latifa Hospital',
    shortName: 'Latifa',
    type: "Women's & Children's Hospital",
    location: 'Umm Hurair, Dubai',
    totalStaff: 1920,
    clinicalStaff: 1240,
    aiLiteracyScore: 81,
    governanceAwareness: 88,
    adoptionReadiness: 85,
    trainingCompletion: 92,
    capabilityMaturity: 78,
    overallReadiness: 84,
    activeAISolutions: 5,
    trainingStatus: 'on_track',
    trend: 'improving',
    trendDelta: 9.1,
    recommendedActions: [
      'Proceed with MedSafe Intelligence deployment to complete the AI clinical safety suite',
      'Develop AI governance case studies for sharing across DHA network — facility is best-in-class',
      'Explore paediatric AI validation partnership with DHA Research Department',
    ],
  },
  {
    id: 'fac-004',
    name: 'Community Health Network',
    shortName: 'Community',
    type: 'Primary Care Network (14 Centres)',
    location: 'Multiple, Dubai',
    totalStaff: 2840,
    clinicalStaff: 1680,
    aiLiteracyScore: 52,
    governanceAwareness: 61,
    adoptionReadiness: 56,
    trainingCompletion: 68,
    capabilityMaturity: 48,
    overallReadiness: 58,
    activeAISolutions: 3,
    trainingStatus: 'behind',
    trend: 'improving',
    trendDelta: 3.8,
    recommendedActions: [
      'Implement emergency AI literacy programme — network is 28 points below ecosystem average',
      'Appoint AI Governance Coordinators at each of 14 centres to localise training delivery',
      'Pause new AI solution deployments until Foundation training completion exceeds 80%',
      'Request DHA AI Readiness Team embedded support for 90-day intensive programme',
      'Resolve PI-2024-143 consent metadata issue immediately — assess scope across all 14 centres',
    ],
  },
];

// ─── Governance Trend Data ─────────────────────────────────────────────────────

export const governanceTrendData: GovernanceTrendPoint[] = [
  { month: 'January 2024', monthShort: 'Jan', governanceScore: 67.4, privacyScore: 71.2, workforceReadiness: 54.8, approvedSolutions: 18, activeDeployments: 28 },
  { month: 'February 2024', monthShort: 'Feb', governanceScore: 69.1, privacyScore: 72.8, workforceReadiness: 57.2, approvedSolutions: 21, activeDeployments: 31 },
  { month: 'March 2024', monthShort: 'Mar', governanceScore: 71.3, privacyScore: 74.6, workforceReadiness: 59.4, approvedSolutions: 24, activeDeployments: 35 },
  { month: 'April 2024', monthShort: 'Apr', governanceScore: 73.8, privacyScore: 76.1, workforceReadiness: 62.1, approvedSolutions: 26, activeDeployments: 38 },
  { month: 'May 2024', monthShort: 'May', governanceScore: 75.2, privacyScore: 78.4, workforceReadiness: 64.7, approvedSolutions: 28, activeDeployments: 41 },
  { month: 'June 2024', monthShort: 'Jun', governanceScore: 76.9, privacyScore: 80.2, workforceReadiness: 67.3, approvedSolutions: 31, activeDeployments: 44 },
  { month: 'July 2024', monthShort: 'Jul', governanceScore: 78.4, privacyScore: 81.8, workforceReadiness: 69.5, approvedSolutions: 33, activeDeployments: 47 },
  { month: 'August 2024', monthShort: 'Aug', governanceScore: 79.6, privacyScore: 83.1, workforceReadiness: 71.2, approvedSolutions: 35, activeDeployments: 49 },
  { month: 'September 2024', monthShort: 'Sep', governanceScore: 80.8, privacyScore: 84.4, workforceReadiness: 72.8, approvedSolutions: 37, activeDeployments: 52 },
  { month: 'October 2024', monthShort: 'Oct', governanceScore: 81.4, privacyScore: 85.6, workforceReadiness: 73.6, approvedSolutions: 38, activeDeployments: 54 },
  { month: 'November 2024', monthShort: 'Nov', governanceScore: 82.1, privacyScore: 86.8, workforceReadiness: 74.8, approvedSolutions: 40, activeDeployments: 57 },
  { month: 'December 2024', monthShort: 'Dec', governanceScore: 82.4, privacyScore: 87.6, workforceReadiness: 75.9, approvedSolutions: 42, activeDeployments: 59 },
];

// ─── Access Event Data ────────────────────────────────────────────────────────

export const accessEventData: AccessEventPoint[] = [
  { time: '00:00', normal: 142, elevated: 8, anomalous: 1 },
  { time: '02:00', normal: 98, elevated: 5, anomalous: 0 },
  { time: '04:00', normal: 76, elevated: 3, anomalous: 0 },
  { time: '06:00', normal: 184, elevated: 12, anomalous: 2 },
  { time: '08:00', normal: 847, elevated: 34, anomalous: 3 },
  { time: '10:00', normal: 1240, elevated: 48, anomalous: 5 },
  { time: '12:00', normal: 1084, elevated: 41, anomalous: 4 },
  { time: '14:00', normal: 1320, elevated: 52, anomalous: 7 },
  { time: '16:00', normal: 1156, elevated: 67, anomalous: 14 },
  { time: '18:00', normal: 742, elevated: 29, anomalous: 3 },
  { time: '20:00', normal: 418, elevated: 18, anomalous: 2 },
  { time: '22:00', normal: 263, elevated: 11, anomalous: 1 },
];

// ─── Risk Distribution ────────────────────────────────────────────────────────

export const riskDistributionData: RiskDistributionPoint[] = [
  { category: 'Critical', value: 3, color: '#D13438' },
  { category: 'High', value: 8, color: '#C13515' },
  { category: 'Medium', value: 19, color: '#9E5A00' },
  { category: 'Low', value: 17, color: '#107C10' },
];

// ─── Solution Categories ──────────────────────────────────────────────────────

export const solutionCategoryData: SolutionCategoryPoint[] = [
  { name: 'Clinical Documentation', count: 12, color: '#0F6CBD' },
  { name: 'Diagnostic AI', count: 8, color: '#0078D4' },
  { name: 'Patient Engagement', count: 9, color: '#5C2D91' },
  { name: 'Analytics & Prediction', count: 11, color: '#107C10' },
  { name: 'Medication Safety', count: 4, color: '#00B7C3' },
  { name: 'Surgical Support', count: 3, color: '#8764B8' },
];

// ─── Executive Copilot Questions ──────────────────────────────────────────────

export const copilotQuestions: CopilotQuestion[] = [
  {
    id: 'q1',
    question: 'Which solutions require governance review?',
    category: 'Governance',
    answer: `Three solutions currently require governance attention:\n\n**SurgPlan AI** (71/100) is under active assessment — 4 open action items remain unresolved, including missing regulatory clearance for cardiovascular applications. Target completion is Q3 2024.\n\n**ChronicCare Analytics** (64/100) has been returned for remediation. Critical data sovereignty violations must be resolved before resubmission. A formal remediation roadmap is due within 30 days.\n\n**ClearScribe Pro** holds conditional approval with 4 outstanding conditions. The FHIR R4 migration deadline is 45 days. Continued operation at Rashid Hospital is contingent on timely resolution.`,
  },
  {
    id: 'q2',
    question: 'What are the highest-risk AI solutions?',
    category: 'Risk',
    answer: `**ChronicCare Analytics** presents the highest governance risk at 64/100 — the only solution below the 70-point minimum threshold. Primary concerns: UK-based data infrastructure (UAE sovereignty violation), absence of MENA population validation, and non-compliant consent framework under UAE PDPL.\n\n**ClearScribe Pro** (76/100) carries elevated risk through its ongoing data residency compliance condition and the Q1 PI-2024-131 incident (34GB transferred to EU region). Continued monitoring is critical.\n\n**SurgPlan AI** (71/100) has significant gaps in explainability and post-operative monitoring capability that elevate clinical safety risk for cardiovascular and neurosurgical applications.`,
  },
  {
    id: 'q3',
    question: 'Which facilities need additional enablement?',
    category: 'Workforce',
    answer: `**Community Health Network** (58/100 overall readiness) requires urgent intervention. At 28 points below the ecosystem average, only 68% of staff have completed Foundation AI training. Recommendation: pause new AI deployments and implement an emergency 90-day intensive programme with embedded DHA support.\n\n**Dubai Hospital** (71/100) is at risk — 42% of clinical staff have not completed Foundation training, and 2 active privacy incidents require assigned governance leadership. An AI Governance Lead appointment is recommended within 30 days.\n\n**Rashid Hospital** (78/100) is on track but 180 clinical staff remain pending advanced governance training before Q3 target.`,
  },
  {
    id: 'q4',
    question: 'What privacy trends require executive attention?',
    category: 'Privacy',
    answer: `The Privacy Risk Index currently sits at 72.4 — a 4-point increase over 30 days, driven by three concurrent high-severity incidents.\n\n**Immediate attention**: PI-2024-101 (ChronicCare Analytics training data containing unmasked PHI — 412 records) and PI-2024-094 (anomalous access to 340 oncology records at Dubai Hospital) are both open and require executive escalation.\n\n**Systemic trend**: Peak anomalous access events occur between 14:00–18:00 across all facilities, with 14 events recorded during this window. Review of shift-handover procedures and access controls during this period is recommended.\n\nThe Privacy Posture Score has improved from 71.2 to 87.6 over 12 months, indicating structural governance improvements are taking effect.`,
  },
  {
    id: 'q5',
    question: 'Which assessments remain unresolved?',
    category: 'Assessments',
    answer: `**Active Assessment**: SurgPlan AI — under review since May 20, 2024 with 4 outstanding items. Assessor: Prof. Al-Mansouri. Expected completion: Q3 2024.\n\n**Pending Resubmission**: ChronicCare Analytics — returned for remediation on June 20, 2024. Vendor remediation roadmap due July 21, 2024. Full resubmission expected Q4 2024 earliest.\n\n**Conditional Approvals Monitoring**: Both ClearScribe Pro and PatientConnect IQ have time-bound conditions under active tracking. ClearScribe Pro's FHIR R4 milestone expires in 38 days — vendor has not yet confirmed delivery schedule.\n\nRecommendation: Schedule executive governance review for July 2024 to address the SurgPlan AI assessment and ChronicCare Analytics remediation status.`,
  },
];

// ─── Ecosystem Radar Data ─────────────────────────────────────────────────────

export const ecosystemRadarData = [
  { dimension: 'AI Governance', score: 82, benchmark: 75 },
  { dimension: 'Privacy', score: 88, benchmark: 80 },
  { dimension: 'Clinical Safety', score: 85, benchmark: 82 },
  { dimension: 'Interoperability', score: 79, benchmark: 76 },
  { dimension: 'Workforce', score: 74, benchmark: 70 },
  { dimension: 'Vendor Quality', score: 81, benchmark: 75 },
];

// ─── Workforce Heatmap Data ───────────────────────────────────────────────────

export const workforceHeatmapData = {
  facilities: ['Rashid Hospital', 'Dubai Hospital', 'Latifa Hospital', 'Community Health'],
  dimensions: ['AI Literacy', 'Governance', 'Adoption', 'Training', 'Capability'],
  scores: [
    [74, 82, 79, 88, 71],  // Rashid Hospital
    [68, 76, 72, 79, 65],  // Dubai Hospital
    [81, 88, 85, 92, 78],  // Latifa Hospital
    [52, 61, 56, 68, 48],  // Community Health
  ],
};

// ─── ROI & Business Value Data ────────────────────────────────────────────────

export const roiValueCategories = [
  { category: 'Review Efficiency Gains', value: 18.4, color: '#107C10', description: 'Staff time saved via automated screening & scoring' },
  { category: 'Risk Cost Avoidance', value: 12.4, color: '#0F6CBD', description: 'Estimated harm prevented from flagged/rejected AI tools' },
  { category: 'Regulatory Compliance', value: 8.2, color: '#5C2D91', description: 'Audit savings + fine avoidance under UAE PDPL & NABIDH' },
  { category: 'Clinical Safety Impact', value: 4.8, color: '#00B7C3', description: 'Prevented adverse events from high-risk tool deployments' },
  { category: 'Vendor Management', value: 3.4, color: '#8764B8', description: 'Faster onboarding + structured SLA enforcement' },
];

export const roiProjectionData = [
  { year: '2023', investment: 4.2, returns: 8.1, net: 3.9 },
  { year: '2024', investment: 9.8, returns: 47.2, net: 37.4 },
  { year: '2025E', investment: 11.2, returns: 89.4, net: 78.2 },
  { year: '2026E', investment: 12.8, returns: 142.0, net: 129.2 },
];

export const efficiencyComparisons = [
  { metric: 'AI Review Timeline', before: 38, after: 10, unit: 'days', betterIsLower: true },
  { metric: 'Governance Maturity Score', before: 68.2, after: 82.4, unit: '/100', betterIsLower: false },
  { metric: 'Privacy Incidents Resolved', before: 48, after: 87, unit: '%', betterIsLower: false },
  { metric: 'Vendor Compliance Rate', before: 52, after: 91, unit: '%', betterIsLower: false },
  { metric: 'Staff AI Literacy', before: 31, after: 74, unit: '%', betterIsLower: false },
];

export const patientSafetyMetrics = {
  solutionsScreened: 47,
  highRiskFlagged: 3,
  patientEncountersProtected: 14200,
  privacyRecordsProtected: 2847,
  adverseEventsAvoided: 12,
  estimatedValueAED: 4800000,
};

export const valueTimelineData = [
  { month: 'Jan', efficiency: 0.8, risk: 0.4, compliance: 0.3 },
  { month: 'Feb', efficiency: 1.2, risk: 0.6, compliance: 0.5 },
  { month: 'Mar', efficiency: 1.6, risk: 0.9, compliance: 0.7 },
  { month: 'Apr', efficiency: 2.1, risk: 1.1, compliance: 0.9 },
  { month: 'May', efficiency: 2.6, risk: 1.3, compliance: 1.1 },
  { month: 'Jun', efficiency: 3.2, risk: 1.5, compliance: 1.4 },
  { month: 'Jul', efficiency: 3.9, risk: 1.8, compliance: 1.6 },
  { month: 'Aug', efficiency: 4.5, risk: 2.0, compliance: 1.8 },
  { month: 'Sep', efficiency: 5.2, risk: 2.3, compliance: 2.0 },
  { month: 'Oct', efficiency: 5.9, risk: 2.6, compliance: 2.2 },
  { month: 'Nov', efficiency: 6.8, risk: 2.9, compliance: 2.4 },
  { month: 'Dec', efficiency: 7.8, risk: 3.3, compliance: 2.7 },
];

// ─── Compliance Intelligence Data ─────────────────────────────────────────────

export const uaeComplianceFrameworks = [
  { id: 'c1', framework: 'NABIDH', fullName: 'National Unified Medical Record – DHA', coverage: 98, status: 'compliant' as const, lastAudit: 'Mar 2024', nextReview: 'Sep 2024' },
  { id: 'c2', framework: 'UAE PDPL', fullName: 'Federal Personal Data Protection Law', coverage: 94, status: 'compliant' as const, lastAudit: 'Apr 2024', nextReview: 'Oct 2024' },
  { id: 'c3', framework: 'DHA Digital Health', fullName: 'DHA Digital Health & AI Policy 2024', coverage: 97, status: 'compliant' as const, lastAudit: 'Feb 2024', nextReview: 'Aug 2024' },
  { id: 'c4', framework: 'DOH Abu Dhabi', fullName: 'Department of Health Abu Dhabi Standards', coverage: 89, status: 'partial' as const, lastAudit: 'Jan 2024', nextReview: 'Jul 2024' },
  { id: 'c5', framework: 'UAE AI Strategy', fullName: 'UAE National AI Strategy 2031', coverage: 91, status: 'compliant' as const, lastAudit: 'Mar 2024', nextReview: 'Sep 2024' },
  { id: 'c6', framework: 'HAAD', fullName: 'Health Authority Abu Dhabi – Interop Standards', coverage: 82, status: 'partial' as const, lastAudit: 'Dec 2023', nextReview: 'Jun 2024' },
];

export const intlComplianceFrameworks = [
  { id: 'i1', framework: 'ISO 42001', fullName: 'AI Management System Standard', coverage: 86, status: 'partial' as const, category: 'ISO' },
  { id: 'i2', framework: 'WHO AI Ethics', fullName: 'WHO Guidance on Ethics & Governance of AI for Health', coverage: 93, status: 'compliant' as const, category: 'WHO' },
  { id: 'i3', framework: 'EU AI Act', fullName: 'EU Artificial Intelligence Act (Reference)', coverage: 81, status: 'partial' as const, category: 'EU' },
  { id: 'i4', framework: 'NIST AI RMF', fullName: 'NIST Artificial Intelligence Risk Management Framework', coverage: 88, status: 'compliant' as const, category: 'NIST' },
  { id: 'i5', framework: 'ISO 27001', fullName: 'Information Security Management System', coverage: 95, status: 'compliant' as const, category: 'ISO' },
  { id: 'i6', framework: 'HL7 FHIR R4', fullName: 'HL7 Fast Healthcare Interoperability Resources R4', coverage: 90, status: 'compliant' as const, category: 'HL7' },
];

export const globalBenchmarkRadar = [
  { dimension: 'Governance', DHA: 82, Singapore: 88, NHS: 79, MayoClinic: 85, Cleveland: 77 },
  { dimension: 'Privacy', DHA: 88, Singapore: 85, NHS: 82, MayoClinic: 83, Cleveland: 80 },
  { dimension: 'Clinical Safety', DHA: 85, Singapore: 82, NHS: 88, MayoClinic: 91, Cleveland: 87 },
  { dimension: 'Interoperability', DHA: 79, Singapore: 84, NHS: 76, MayoClinic: 82, Cleveland: 79 },
  { dimension: 'Workforce', DHA: 74, Singapore: 78, NHS: 72, MayoClinic: 80, Cleveland: 75 },
  { dimension: 'Vendor Mgmt', DHA: 81, Singapore: 79, NHS: 74, MayoClinic: 83, Cleveland: 78 },
];

// ─── Risk Command Center Data ─────────────────────────────────────────────────

export const facilityRiskMapData = [
  { id: 'fac-001', name: 'Rashid Hospital', shortName: 'Rashid', risk: 'medium' as const, riskScore: 42, activeAlerts: 2, location: 'Oud Metha', xPct: 57, yPct: 63, aiSolutions: 8 },
  { id: 'fac-002', name: 'Dubai Hospital', shortName: 'Dubai H.', risk: 'high' as const, riskScore: 71, activeAlerts: 4, location: 'Al Baraha', xPct: 66, yPct: 42, aiSolutions: 6 },
  { id: 'fac-003', name: 'Latifa Hospital', shortName: 'Latifa', risk: 'low' as const, riskScore: 18, activeAlerts: 0, location: 'Umm Hurair', xPct: 53, yPct: 68, aiSolutions: 5 },
  { id: 'fac-004', name: 'Community Health', shortName: 'Community', risk: 'high' as const, riskScore: 64, activeAlerts: 1, location: 'Bur Dubai', xPct: 36, yPct: 72, aiSolutions: 3 },
];

export const liveAlertFeed = [
  { id: 'ALT-001', time: '2 min ago', severity: 'critical' as const, facility: 'Dubai Hospital', message: 'Anomalous access: 340 oncology records accessed in 2.5 hrs', system: 'PatientConnect IQ', status: 'active' as const },
  { id: 'ALT-002', time: '14 min ago', severity: 'high' as const, facility: 'Rashid Hospital', message: 'ClearScribe Pro FHIR R4 condition deadline in 8 days — vendor unresponsive', system: 'ClearScribe Pro', status: 'active' as const },
  { id: 'ALT-003', time: '31 min ago', severity: 'medium' as const, facility: 'Community Health', message: 'Training completion at 68% — below 80% required threshold', system: 'Workforce Module', status: 'acknowledged' as const },
  { id: 'ALT-004', time: '1 hr ago', severity: 'medium' as const, facility: 'Multiple', message: 'ChronicCare Analytics remediation roadmap overdue by 3 days', system: 'ChronicCare Analytics', status: 'acknowledged' as const },
  { id: 'ALT-005', time: '2 hr ago', severity: 'low' as const, facility: 'Dubai Hospital', message: 'Audit log gap resolved — maintenance window documented', system: 'RadiologyAI Dx', status: 'resolved' as const },
  { id: 'ALT-006', time: '3 hr ago', severity: 'high' as const, facility: 'Rashid Hospital', message: 'Data retention violation — ClearScribe Pro logs exceed 12-month policy', system: 'ClearScribe Pro', status: 'investigating' as const },
  { id: 'ALT-007', time: '4 hr ago', severity: 'low' as const, facility: 'Latifa Hospital', message: 'Governance milestone reached — 92% staff training completion', system: 'Workforce Module', status: 'resolved' as const },
  { id: 'ALT-008', time: '5 hr ago', severity: 'medium' as const, facility: 'Dubai Hospital', message: 'PII disclosure in API response — 193 records affected', system: 'PatientConnect IQ', status: 'investigating' as const },
];

export const riskTrendByFacility = [
  { month: 'Jan', rashid: 58, dubai: 82, latifa: 34, community: 79 },
  { month: 'Feb', rashid: 54, dubai: 79, latifa: 30, community: 76 },
  { month: 'Mar', rashid: 51, dubai: 75, latifa: 28, community: 73 },
  { month: 'Apr', rashid: 48, dubai: 78, latifa: 25, community: 70 },
  { month: 'May', rashid: 45, dubai: 74, latifa: 22, community: 67 },
  { month: 'Jun', rashid: 42, dubai: 71, latifa: 18, community: 64 },
];

// ─── Adoption Trend (Monthly Active AI Tool Users) ───────────────────────────

export const adoptionTrendData = [
  { month: 'Jan', clinicians: 284, nurses: 412, pharmacists: 98, admin: 156 },
  { month: 'Feb', clinicians: 318, nurses: 447, pharmacists: 112, admin: 171 },
  { month: 'Mar', clinicians: 362, nurses: 493, pharmacists: 129, admin: 188 },
  { month: 'Apr', clinicians: 401, nurses: 534, pharmacists: 147, admin: 203 },
  { month: 'May', clinicians: 448, nurses: 581, pharmacists: 162, admin: 221 },
  { month: 'Jun', clinicians: 497, nurses: 628, pharmacists: 178, admin: 244 },
  { month: 'Jul', clinicians: 539, nurses: 671, pharmacists: 191, admin: 262 },
  { month: 'Aug', clinicians: 574, nurses: 702, pharmacists: 208, admin: 279 },
  { month: 'Sep', clinicians: 611, nurses: 738, pharmacists: 223, admin: 294 },
  { month: 'Oct', clinicians: 648, nurses: 774, pharmacists: 241, admin: 312 },
  { month: 'Nov', clinicians: 681, nurses: 808, pharmacists: 254, admin: 327 },
  { month: 'Dec', clinicians: 714, nurses: 842, pharmacists: 267, admin: 341 },
];

// ─── Population Health Intelligence Data ──────────────────────────────────────

export const chronicDiseaseTrendData = [
  { month: 'Jul', diabetes: 9.2, diabetesPrior: 8.6, hypertension: 14.1, cardiovascular: 6.8 },
  { month: 'Aug', diabetes: 9.3, diabetesPrior: 8.7, hypertension: 14.2, cardiovascular: 6.8 },
  { month: 'Sep', diabetes: 9.4, diabetesPrior: 8.7, hypertension: 14.3, cardiovascular: 6.9 },
  { month: 'Oct', diabetes: 9.5, diabetesPrior: 8.8, hypertension: 14.4, cardiovascular: 6.9 },
  { month: 'Nov', diabetes: 9.6, diabetesPrior: 8.9, hypertension: 14.5, cardiovascular: 7.0 },
  { month: 'Dec', diabetes: 9.7, diabetesPrior: 9.0, hypertension: 14.6, cardiovascular: 7.0 },
  { month: 'Jan', diabetes: 9.8, diabetesPrior: 9.0, hypertension: 14.6, cardiovascular: 7.1 },
  { month: 'Feb', diabetes: 9.9, diabetesPrior: 9.1, hypertension: 14.7, cardiovascular: 7.1 },
  { month: 'Mar', diabetes: 10.0, diabetesPrior: 9.2, hypertension: 14.8, cardiovascular: 7.2 },
  { month: 'Apr', diabetes: 10.1, diabetesPrior: 9.3, hypertension: 14.9, cardiovascular: 7.2 },
  { month: 'May', diabetes: 10.3, diabetesPrior: 9.3, hypertension: 14.9, cardiovascular: 7.3 },
  { month: 'Jun', diabetes: 10.4, diabetesPrior: 9.4, hypertension: 15.0, cardiovascular: 7.3 },
];

export const populationRiskDistribution: RiskDistributionPoint[] = [
  { category: 'Critical', value: 8, color: '#D13438' },
  { category: 'High', value: 22, color: '#C13515' },
  { category: 'Medium', value: 41, color: '#9E5A00' },
  { category: 'Low', value: 29, color: '#107C10' },
];

export const diseaseClusters = [
  { id: 'cl-1', cluster: 'Type 2 diabetes, age 35–50', district: 'Al Karama', vsBaseline: 34, confidence: 91, priority: 'critical' as const },
  { id: 'cl-2', cluster: 'Paediatric asthma', district: 'Jebel Ali Industrial', vsBaseline: 28, confidence: 87, priority: 'high' as const },
  { id: 'cl-3', cluster: 'Hypertension, age 50+', district: 'Deira', vsBaseline: 19, confidence: 83, priority: 'high' as const },
  { id: 'cl-4', cluster: 'Vitamin D deficiency', district: 'Citywide', vsBaseline: 15, confidence: 78, priority: 'medium' as const },
  { id: 'cl-5', cluster: 'Gestational diabetes', district: 'Al Quoz', vsBaseline: 12, confidence: 74, priority: 'medium' as const },
];

export const alKaramaClusterAgeBands = [
  { ageBand: '35–40', alKarama: 8.1, cityAverage: 6.2 },
  { ageBand: '41–45', alKarama: 11.4, cityAverage: 8.0 },
  { ageBand: '46–50', alKarama: 14.2, cityAverage: 9.8 },
];

export const careGaps = [
  { id: 'gap-1', title: 'Post-PTCA patients without 6-month cardiology follow-up', detail: '1,240 patients across 14 facilities · last follow-up >180 days ago' },
  { id: 'gap-2', title: 'T2DM patients with no HbA1c test in 9+ months', detail: '8,900 patients citywide · concentrated in Al Karama, Deira' },
  { id: 'gap-3', title: 'Paediatric immunisation lapses, age 4–6 booster', detail: '3,650 children · Jebel Ali, Al Quoz primary care network' },
  { id: 'gap-4', title: 'Hypertension patients with no BP reading in 12+ months', detail: '11,200 patients · disproportionately age 60+' },
];

export const careGapClosureByDistrict = [
  { district: 'Al Karama', identified: 3, closed: 1 },
  { district: 'Deira', identified: 2, closed: 1 },
  { district: 'Jebel Ali', identified: 2, closed: 0 },
  { district: 'Al Quoz', identified: 2, closed: 1 },
  { district: 'Other districts', identified: 3, closed: 0 },
];

export const capacityForecastData = [
  { label: 'Today', demandIndex: 100 },
  { label: '+5d', demandIndex: 101.5 },
  { label: '+10d', demandIndex: 103 },
  { label: '+15d', demandIndex: 104.8 },
  { label: '+20d', demandIndex: 106 },
  { label: '+25d', demandIndex: 107.2 },
  { label: '+30d', demandIndex: 108.4 },
];

export const facilityCapacityRisk = [
  { facility: 'Dubai Hospital', projectedPeak: 97, risk: 'critical' as const },
  { facility: 'Rashid Hospital', projectedPeak: 93, risk: 'high' as const },
  { facility: 'Latifa Hospital', projectedPeak: 91, risk: 'high' as const },
  { facility: 'Community Health Network', projectedPeak: 90, risk: 'medium' as const },
];

export const d33CapacityOutcomes = [
  { outcome: 'Reduced wait times', detail: 'Early redistribution of demand before facilities hit capacity' },
  { outcome: 'Cost efficiency', detail: 'Staffing and resource planning ahead of predicted surges' },
  { outcome: 'Equity of access', detail: 'Visibility into which districts are underserved relative to demand' },
];

export const populationHealthImpactTrend = [
  { year: '2024', riskIndex: 74.1 },
  { year: '2025', riskIndex: 68.9 },
  { year: '2026', riskIndex: 62.4 },
];

export const populationHealthScorecard = [
  { indicator: 'Population health risk index', y2024: '74.1', y2025: '68.9', y2026: '62.4', yoy: '−9.4%', sentiment: 'good' as const },
  { indicator: 'Chronic disease index', y2024: '61.0', y2025: '64.8', y2026: '68.2', yoy: '+5.2%', sentiment: 'bad' as const },
  { indicator: 'Care continuity score', y2024: '69.2', y2025: '75.8', y2026: '81.4', yoy: '+7.4%', sentiment: 'good' as const },
  { indicator: 'Care gaps closed', y2024: '14', y2025: '21', y2026: '38', yoy: '+81%', sentiment: 'good' as const },
  { indicator: 'Facility overload events', y2024: '19', y2025: '13', y2026: '6', yoy: '−54%', sentiment: 'good' as const },
  { indicator: 'Disease clusters detected', y2024: '—', y2025: '3', y2026: '5', yoy: 'New capability', sentiment: 'new' as const },
];
