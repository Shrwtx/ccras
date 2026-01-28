
import { ScanType, DiagnosisResult, InfoTabContent } from "../types";
import { getLocalPrediction } from "./apiService";

/**
 * CCRAS Diagnostic Service (Local First)
 * Strictly utilizes the institutional Model Factory (EfficientNet/DenseNet).
 */
export const runAIDiagnosis = async (
  image: string,
  scanType: ScanType
): Promise<DiagnosisResult> => {
  // Call the Local Model Factory (FastAPI)
  const localData = await getLocalPrediction(image, scanType);
  
  if (!localData) {
    throw new Error(
      "Institutional AI Node Offline. Please verify that the local model server is active on port 8000."
    );
  }

  // Convert the Factory Response to the UI state
  return {
    id: localData.id || `LOC-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    timestamp: new Date().toISOString(),
    scanType,
    prediction: localData.prediction,
    confidence: localData.confidence,
    icdCode: localData.icdCode,
    primaryAyurvedaCode: localData.info?.['AYURVEDA CLASSIFICATION']?.rows?.[0]?.[2] || "N/A",
    radiologicalObservation: localData.radiologicalObservation || "Local neural analysis complete.",
    modelArchitecture: localData.modelArchitecture, 
    detectedAnatomy: localData.detectedAnatomy,
    imageUrl: localData.original_url || image,
    heatmap_url: localData.heatmap_url,
    overlay_url: localData.overlay_url,
    info: localData.info,
    allResults: localData.all_results || []
  };
};
