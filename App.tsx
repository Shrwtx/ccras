
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Hero from './components/Hero';
import DiagnosticCards from './components/DiagnosticCards';
import UploadBox from './components/UploadBox';
import ReportModal from './components/ReportModal';
import ReportHistory from './components/ReportHistory';
import AyushInfo from './components/AyushInfo';
import Profile from './components/Profile';
import { ScanType, DiagnosisResult } from './types';
import { runAIDiagnosis } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'history' | 'profile' | 'settings'>('home');
  const [selectedScanType, setSelectedScanType] = useState<ScanType | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState<number>(100); // Percentage
  const [reports, setReports] = useState<DiagnosisResult[]>([]);
  const [currentReport, setCurrentReport] = useState<DiagnosisResult | null>(null);
  const [sessionLastResult, setSessionLastResult] = useState<DiagnosisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedReports = localStorage.getItem('ccras_reports');
    if (savedReports) setReports(JSON.parse(savedReports));
    
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') setIsDarkMode(true);

    const savedFontSize = localStorage.getItem('font_size');
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem('font_size', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    setSessionLastResult(null);
  }, [selectedScanType]);

  const handleDiagnosis = async (image: string) => {
    if (!selectedScanType) return;
    setIsLoading(true);
    setSessionLastResult(null);
    try {
      const result = await runAIDiagnosis(image, selectedScanType);
      const updatedReports = [result, ...reports];
      setReports(updatedReports);
      localStorage.setItem('ccras_reports', JSON.stringify(updatedReports));
      setCurrentReport(result);
      setSessionLastResult(result);
    } catch (error: any) {
      console.error("Diagnosis failed:", error);
      alert(`Error: ${error.message || "Something went wrong with the analysis."}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'history':
        return <ReportHistory reports={reports} onView={setCurrentReport} />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return (
          <div className="p-8 lg:p-12 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-10">
              <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">Configuration Panel</span>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Portal Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-black text-[12px] text-slate-800 dark:text-slate-100 uppercase tracking-widest">Interface Theme</p>
                    <p className="text-[11px] text-slate-500 mt-1">Switch to Dark Mode for clinical night shifts</p>
                  </div>
                  <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${isDarkMode ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>

                <div className="pt-8 border-t border-slate-50 dark:border-slate-800">
                  <p className="font-black text-[12px] text-slate-800 dark:text-slate-100 uppercase tracking-widest">Font Scaling</p>
                  <p className="text-[11px] text-slate-500 mt-1 mb-4">Adjust system-wide text size</p>
                  <div className="flex items-center space-x-4">
                    <button onClick={() => setFontSize(100)} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold uppercase">Reset (100%)</button>
                    <span className="text-xl font-black text-blue-600">{fontSize}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-700 dark:bg-blue-900 rounded-[32px] p-8 text-white space-y-8 shadow-xl shadow-blue-500/10">
                <div className="space-y-2">
                  <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.2em]">Institutional Status</p>
                  <h4 className="text-2xl font-black">Clinical v1.1.0</h4>
                  <div className="flex items-center space-x-2 pt-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Connected to CCRAS Mainframe</span>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-white/10">
                  <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.2em] mb-4">Support Resources</p>
                  <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5">
                    Download Documentation
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'home':
      default:
        return (
          <div id="main-content" tabIndex={-1} className="space-y-4 animate-in fade-in duration-700 pb-12 outline-none">
            {!selectedScanType ? (
              <div className="space-y-0">
                <Hero />
                <div className="px-12 mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-blue-600 transition-colors">Total Scans</p>
                    <p className="text-3xl font-bold text-slate-800 dark:text-white">{reports.length}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">AI Status</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <p className="text-xl font-bold text-slate-800 dark:text-white uppercase">Operational</p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm md:col-span-2 hover:shadow-md transition-shadow">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Recent Diagnosis</p>
                    <p className="text-lg font-bold text-slate-800 dark:text-white truncate">
                      {reports[0] ? `${reports[0].prediction} (${reports[0].scanType})` : 'System Ready for Analysis'}
                    </p>
                  </div>
                </div>
                <DiagnosticCards onSelect={setSelectedScanType} />
                <AyushInfo />
              </div>
            ) : (
              <div className="max-w-6xl mx-auto p-6 md:p-12 animate-in zoom-in-95 fade-in duration-500">
                <button 
                  onClick={() => setSelectedScanType(null)}
                  className="mb-8 flex items-center text-[#1e293b] dark:text-blue-400 hover:text-blue-600 font-bold transition-all group px-4 py-2 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
                >
                  <svg className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                  Back to Hub
                </button>
                <div className="bg-white dark:bg-slate-900 rounded-[48px] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden ring-4 ring-blue-500/10">
                  <div className="px-12 py-10 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-950/20">
                    <div>
                      <h3 className="text-3xl font-bold text-[#1e293b] dark:text-white tracking-tight">AI Analysis: {selectedScanType}</h3>
                      <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Enhanced precision diagnostic mode active.</p>
                    </div>
                    <div className="hidden sm:block px-6 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full border border-blue-100 dark:border-blue-800 tracking-widest uppercase">
                      Session Secure
                    </div>
                  </div>
                  <UploadBox 
                    scanType={selectedScanType} 
                    onUpload={handleDiagnosis} 
                    loading={isLoading} 
                    lastResult={sessionLastResult}
                  />
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-transparent transition-colors duration-300">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <Header 
          darkMode={isDarkMode} 
          setDarkMode={setIsDarkMode} 
          fontSize={fontSize} 
          setFontSize={setFontSize} 
        />
        <main className="flex-1 overflow-y-auto pb-24 custom-scrollbar">
          {renderContent()}
        </main>
        <footer className="p-12 border-t border-slate-200 dark:border-slate-800 text-center bg-white dark:bg-slate-900 transition-colors">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-left space-y-2">
              <img src="https://ccras.nic.in/wp-content/uploads/2025/05/cropped-CCRAS-Trademark-Transparent.png" alt="CCRAS Logo" className="h-10 w-auto grayscale opacity-50 mb-2" />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Official Medical AI Portal</p>
              <p className="text-sm text-slate-500 max-w-md">Dedicated to bridging traditional knowledge with modern AI research for enhanced patient care.</p>
            </div>
            <div className="text-right space-y-4">
              <div className="flex items-center space-x-6 justify-end text-xs font-bold text-blue-600 uppercase tracking-widest">
                <a href="#" className="hover:underline">Privacy Policy</a>
                <a href="#" className="hover:underline">Usage Terms</a>
                <a href="#" className="hover:underline">Contact Support</a>
              </div>
              <p className="text-xs font-bold text-slate-400">© 2024 CCRAS • Ministry of Ayush • Government of India</p>
            </div>
          </div>
        </footer>
      </div>

      {currentReport && (
        <ReportModal report={currentReport} onClose={() => setCurrentReport(null)} />
      )}
    </div>
  );
};

export default App;
