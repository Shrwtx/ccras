
import React, { useState, useRef, useEffect } from 'react';
import { ScanType, DiagnosisResult } from '../types';
import { generatePDFReport } from '../services/pdfService';

interface UploadBoxProps {
  scanType: ScanType;
  onUpload: (image: string) => void;
  loading: boolean;
  lastResult?: DiagnosisResult | null;
}

const UploadBox: React.FC<UploadBoxProps> = ({ scanType, onUpload, loading, lastResult }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    "Spinning up Multi-Engine Inference...",
    "Local Node: Loading Expert Weights...",
    "Cloud Node: Initiating Gemini 3 Pro reasoning...",
    "Clinical Node: Booting MedGemma Expert Engine...",
    "Comparing Results & Generating Consensus..."
  ];

  useEffect(() => { setPreview(null); }, [scanType]);

  useEffect(() => {
    let interval: any;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 800);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900">
      {!preview ? (
        <div className="p-16 h-[450px] flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-[32px] flex items-center justify-center mb-8 border border-slate-100 dark:border-slate-700 shadow-inner group hover:scale-105 transition-transform duration-500">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <h4 className="text-2xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">Clinical Image Input</h4>
          <p className="text-slate-500 max-w-sm mb-10 text-sm font-medium">Please upload a scan in <span className="text-blue-600 font-bold">JPEG, JPG, or PNG</span> format for private institutional analysis.</p>
          <button onClick={() => fileInputRef.current?.click()} className="px-12 py-4 bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95 text-[10px] uppercase tracking-[0.2em]">Select Medical File</button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/jpeg,image/jpg,image/png" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] border-t border-slate-100 dark:border-slate-800">
          <div className="p-10 lg:p-14 border-r border-slate-100 dark:border-slate-800 flex flex-col bg-slate-50/30 dark:bg-slate-950/20">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Preview</span>
              <button onClick={() => setPreview(null)} className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-600">Reset</button>
            </div>
            <div className="flex-1 relative rounded-[40px] overflow-hidden bg-black flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-2xl h-[400px]">
              <img src={preview} alt="Scan Preview" className="max-h-full max-w-full object-contain" />
              {loading && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="scan-line absolute w-full top-0 opacity-40"></div>
                </div>
              )}
            </div>
          </div>
          <div className="p-10 lg:p-14 flex flex-col items-center justify-center text-center bg-white dark:bg-slate-900">
            {loading ? (
              <div className="space-y-12">
                <div className="relative w-48 h-48 mx-auto">
                  <svg className="w-full h-full rotate-[-90deg]">
                    <circle cx="96" cy="96" r="84" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-100 dark:text-slate-800" />
                    <circle cx="96" cy="96" r="84" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="527" strokeDashoffset="300" className="text-blue-600 animate-[spin_3s_linear_infinite]" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="space-y-3">
                  <h5 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Cross-Engine Validation</h5>
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">{steps[loadingStep]}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Parallel Processing: ACTIVE</span>
                  </div>
                </div>
              </div>
            ) : lastResult ? (
              <div className="w-full max-w-md space-y-10 animate-in zoom-in-95 duration-500">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block">Consolidated AI Result</span>
                  <h4 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">{lastResult.prediction}</h4>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/40 p-10 rounded-[40px] border border-slate-100 dark:border-slate-700/50 shadow-inner">
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ensemble Agreement</span>
                    <span className="text-3xl font-black text-blue-600">{(lastResult.confidence * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 transition-all duration-1000 ease-out" style={{ width: `${lastResult.confidence * 100}%` }} />
                  </div>
                </div>
                <button onClick={() => generatePDFReport(lastResult)} className="w-full py-6 bg-blue-700 hover:bg-blue-800 text-white font-black rounded-3xl shadow-2xl transition-all flex items-center justify-center space-x-4 text-[11px] uppercase tracking-widest">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  <span>Download Records</span>
                </button>
              </div>
            ) : (
              <div className="space-y-10">
                <div className="w-24 h-24 mx-auto rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 relative">
                  <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-ping"></div>
                  <svg className="w-12 h-12 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <h5 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Ensemble Engine Ready</h5>
                  <p className="text-sm text-slate-500 font-medium mt-2">Localized {scanType} models & Cloud Experts initialized.</p>
                </div>
                <button onClick={() => onUpload(preview)} className="px-14 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-2xl shadow-blue-600/30 transition-all active:scale-95 text-[11px] uppercase tracking-widest">Begin Multi-Engine Analysis</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadBox;
