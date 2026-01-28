import React from 'react';
import { DiagnosisResult } from '../types';
import { generatePDFReport } from '../services/pdfService';

interface ReportHistoryProps {
  reports: DiagnosisResult[];
  onView: (report: DiagnosisResult) => void;
}

const ReportHistory: React.FC<ReportHistoryProps> = ({ reports, onView }) => {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Diagnostic History</h2>
            <p className="text-slate-500 dark:text-slate-400">View and manage clinical reports generated during this session.</p>
          </div>
          <div className="flex space-x-2">
            <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl text-blue-600 dark:text-blue-400 font-bold text-sm">
              {reports.length} Total Reports
            </div>
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-[32px] p-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-700">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">No Reports Found</h3>
            <p className="text-slate-500 max-w-xs mx-auto">Complete a diagnosis on the home screen to see your report history here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {reports.map((report) => (
              <div 
                key={report.id}
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700 flex items-center group"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-black flex-shrink-0 border border-slate-200 dark:border-slate-700 mr-6">
                  <img src={report.imageUrl} alt="Scan Thumb" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase rounded">
                      {report.scanType}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">
                      ID: {report.id}
                    </span>
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-800 dark:text-white truncate mb-1">
                    {report.prediction}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {new Date(report.timestamp).toLocaleDateString()} at {new Date(report.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>

                <div className="text-right flex flex-col items-end space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-400">CONFIDENCE</span>
                    <span className="text-lg font-black text-slate-800 dark:text-slate-200">
                      {(report.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => generatePDFReport(report)}
                      className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                      title="Download PDF"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </button>
                    <button 
                      onClick={() => onView(report)}
                      className="px-6 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all active:scale-95"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportHistory;