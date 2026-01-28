export enum ScanType {
  XRAY_CHEST = "chest-xray",
  XRAY_KNEE = "knee-xray",
  MRI = "mri-brain",
  CT = "ct-scan"
}

export interface ClassResult {
  label: string;
  confidence: number;
  color?: string;
}

export interface InfoTabContent {
  tabs: Array<{
    label: string;
    value: string;
  }>;
}

export interface ModelComparison {
  name: string;
  prediction: string;
  confidence: number;
  reasoning: string;
  status: 'optimal' | 'divergent' | 'corroborated';
}

export interface DiagnosisResult {
  id: string;
  timestamp: string;
  scanType: ScanType;
  prediction: string;
  severity?: string;  // ADD THIS
  confidence: number;
  icdCode: string;
  primaryAyurvedaCode: string;
  radiologicalObservation: string;
  modelArchitecture?: string;
  detectedAnatomy?: string;
  original_url?: string;
  image_url?: string;
  imageUrl?: string;
  info?: Record<string, InfoTabContent>;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  language: 'en' | 'hi';
  autoSave: boolean;
}
