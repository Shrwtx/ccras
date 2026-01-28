import { ScanType, ClassResult, InfoTabContent } from "../types";

const LOCAL_API_URL = "http://127.0.0.1:8000";

export interface LocalPredictionResponse {
  id?: string;
  prediction: string;
  confidence: number;
  icdCode: string;
  radiologicalObservation?: string;
  modelArchitecture?: string; 
  detectedAnatomy?: string; 
  original_url: string; 
  heatmap_url?: string;  
  overlay_url?: string;  
  image_url?: string;    
  all_results: ClassResult[];
  info?: Record<string, InfoTabContent>;
}

export const getLocalPrediction = async (
  base64Image: string,
  scanType: ScanType
): Promise<LocalPredictionResponse | null> => {
  let endpoint = "";
  
  // Map scan types to backend endpoints - FIXED
  switch(scanType) {
    case ScanType.XRAY_CHEST: 
      endpoint = "/predict/chest-xray"; 
      break;
    case ScanType.XRAY_KNEE: 
      endpoint = "/predict/knee-xray"; 
      break;
    case ScanType.MRI: 
      endpoint = "/predict/mri-brain"; 
      break;
    case ScanType.CT: 
      endpoint = "/predict/ct-scan"; 
      break;
    default: 
      endpoint = "/predict/chest-xray"; 
      break;
  }

  try {
    const parts = base64Image.split(',');
    if (parts.length < 2) return null;
    
    const byteString = atob(parts[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: 'image/jpeg' });

    const formData = new FormData();
    formData.append('file', blob, 'scan.jpg');

    const response = await fetch(`${LOCAL_API_URL}${endpoint}`, {
      method: 'POST',
      body: formData,
      signal: AbortSignal.timeout(15000) 
    });

    if (!response.ok) {
      console.error("Local API responded with error:", response.status);
      return null;
    }

    const data = await response.json();
    
    const resolveUrl = (url?: string) => {
      if (!url) return undefined;
      if (url.startsWith('http') || url.startsWith('data:')) return url;
      return `${LOCAL_API_URL}${url.startsWith('/') ? '' : '/'}${url}`;
    };
    
    return {
      ...data,
      original_url: resolveUrl(data.original_url || data.imageUrl),
      heatmap_url: resolveUrl(data.heatmap_url),
      overlay_url: resolveUrl(data.overlay_url),
      image_url: resolveUrl(data.image_url),
      all_results: data.all_results || [],
      info: data.info || {}
    };
    
  } catch (error) {
    console.error("Local prediction error:", error);
    return null;
  }
};
