
import React from 'react';
import { DiagnosisResult, ScanType } from '../types';
import { generatePDFReport } from '../services/pdfService';
import DiseaseInfoTabs from './DiseaseInfoTabs';

interface ReportModalProps {
  report: DiagnosisResult;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ report, onClose }) => {
  const supportsVisuals = report.scanType === ScanType.XRAY_CHEST || report.scanType === ScanType.XRAY_KNEE || report.scanType === ScanType.CT;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 lg:p-12 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-7xl h-full max-h-[92vh] rounded-[48px] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-500 border border-slate-200 dark:border-slate-800">
        
        {/* Header Section */}
        <div className="px-10 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 shrink-0">
          <div className="flex items-center space-x-6">
            <img src="https://ccras.nic.in/wp-content/uploads/2025/05/cropped-CCRAS-Trademark-Transparent.png" alt="CCRAS" className="h-10 w-auto" />
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
            <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Multi-Model Analysis Node</p>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Session ID: {report.id}</h2>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all text-slate-400 hover:text-red-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-10 lg:p-14 space-y-12 bg-slate-50/20">
          
          <div className="flex flex-col lg:flex-row-reverse gap-12">
            
            {/* Right: Primary Findings */}
            <div className="flex-1 space-y-10">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.6)] animate-pulse"></div>
                    <span className="text-[12px] font-black text-blue-600 uppercase tracking-[0.3em]">Consensus Diagnostic Impression</span>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-baseline gap-6 border-l-8 border-blue-600 pl-10">
                  <div className="space-y-2">
                    <p className="text-[13px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Primary Finding</p>
                    <h4 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">
                      {report.prediction}
                    </h4>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[13px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] mb-1">Ensemble Confidence</p>
                    <p className="text-5xl font-black text-blue-600">{(report.confidence * 100).toFixed(1)}%</p>
                  </div>
                </div>

                {/* Comparison Matrix */}
                {report.comparisons && (
                  <div className="space-y-4">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] px-2">Model Comparison Matrix</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {report.comparisons.map((c, i) => (
                        <div key={i} className={`p-6 rounded-[32px] border transition-all ${c.status === 'corroborated' ? 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-800' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-800'}`}>
                          <div className="flex justify-between items-start mb-4">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{c.name}</span>
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${c.status === 'corroborated' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}`}>{c.status}</span>
                          </div>
                          <p className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-2">{c.prediction}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic line-clamp-3">"{c.reasoning}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Left: Visual Evidence */}
            <div className="lg:w-[32%] shrink-0 space-y-10">
              <div className="space-y-4">
                <span className="text-[12px] font-black text-slate-500 uppercase tracking-[0.2em] block px-1">Evidence Visualization</span>
                <div className="aspect-square bg-black rounded-[40px] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative">
                   <img src={report.imageUrl || report.original_url} alt="Original Scan" className="w-full h-full object-contain" />
                </div>
                <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">Original Diagnostic Scan</p>
              </div>
            </div>
          </div>

          {/* Bottom: Disease Info */}
          <div className="pt-16 border-t border-slate-200 dark:border-slate-800">
            <DiseaseInfoTabs info={report.info} />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-10 py-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-slate-900 shrink-0 gap-6">
          <div className="flex items-center space-x-3 text-slate-500 text-[11px] font-black uppercase tracking-[0.2em]">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <span>Verified Cross-Model Consolidation</span>
          </div>
          <div className="flex space-x-4 w-full sm:w-auto">
            <button onClick={onClose} className="flex-1 sm:flex-none px-10 py-5 rounded-2xl font-black text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-[12px] uppercase tracking-widest border border-slate-100 dark:border-slate-800">Dismiss</button>
            <button 
              onClick={() => generatePDFReport(report)} 
              className="flex-1 sm:flex-none px-12 py-5 bg-blue-700 hover:bg-blue-800 text-white font-black rounded-2xl shadow-2xl transition-all flex items-center justify-center text-[12px] uppercase tracking-widest group"
            >
              Export Multi-Model Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
