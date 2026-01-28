
import React from 'react';
import { ScanType } from '../types';

interface DiagnosticCardsProps {
  onSelect: (type: ScanType) => void;
}

const DiagnosticCards: React.FC<DiagnosticCardsProps> = ({ onSelect }) => {
  const cards = [
    {
      type: ScanType.XRAY_CHEST,
      label: "Chest X-ray",
      description: "Specialized analysis for lung and heart-related conditions.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4m16-4H4m16 8H4" /></svg>
      ),
      color: "from-blue-600 to-blue-800",
      accent: "bg-blue-50 dark:bg-blue-900/10",
      textColor: "text-blue-600"
    },
    {
      type: ScanType.XRAY_KNEE,
      label: "Knee X-ray",
      description: "Dedicated screening for Knee Osteoarthritis and joint health.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
      ),
      color: "from-cyan-600 to-blue-700",
      accent: "bg-cyan-50 dark:bg-cyan-900/10",
      textColor: "text-cyan-600"
    },
    {
      type: ScanType.CT,
      label: "Brain & Body CT",
      description: "In-depth imaging for internal organs and complex diagnostics.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15l-5-5m0 0l5-5m-5 5h12" /></svg>
      ),
      color: "from-slate-700 to-slate-900",
      accent: "bg-slate-50 dark:bg-slate-800/20",
      textColor: "text-slate-700 dark:text-slate-400"
    },
    {
      type: ScanType.MRI,
      label: "Neuro/Spine MRI",
      description: "High-resolution scans for soft tissue, nerves, and muscles.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      ),
      color: "from-blue-700 to-indigo-900",
      accent: "bg-indigo-50 dark:bg-indigo-900/10",
      textColor: "text-indigo-600 dark:text-indigo-400"
    },
  ];

  return (
    <section className="px-12 py-16 animate-in fade-in duration-1000">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 border-b border-slate-200 dark:border-slate-800 pb-8 space-y-4 md:space-y-0">
          <div>
            <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">Institutional AI Hub</span>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Clinical Imaging Center</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg max-w-md">Choose a scan category to begin your digital medical review.</p>
          </div>
          <div className="flex space-x-2">
            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100 dark:border-blue-800 uppercase tracking-widest">v2.5 Clinical</span>
            <span className="px-3 py-1 bg-slate-50 dark:bg-slate-800/20 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded-full border border-slate-100 dark:border-slate-800 uppercase tracking-widest">Validated</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, idx) => (
            <button
              key={card.type}
              onClick={() => onSelect(card.type)}
              style={{ animationDelay: `${idx * 150}ms` }}
              className="group relative bg-white dark:bg-slate-900 rounded-[48px] p-8 text-left transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] border border-slate-100 dark:border-slate-800 flex flex-col h-full overflow-hidden animate-in slide-in-from-bottom-5"
            >
              <div className={`absolute top-0 right-0 w-48 h-48 ${card.accent} rounded-bl-[100px] -mr-16 -mt-16 transition-all duration-700 group-hover:scale-110`}></div>
              
              <div className={`mb-8 p-5 rounded-3xl bg-gradient-to-br ${card.color} text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 inline-block w-fit relative z-10`}>
                {card.icon}
              </div>

              <div className="relative z-10 flex-grow">
                <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight leading-tight">{card.label}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-[12px] leading-relaxed mb-8 font-medium">
                  {card.description}
                </p>
              </div>

              <div className="relative z-10 mt-auto flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800/50">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Modality</span>
                  <span className={`text-lg font-black ${card.textColor}`}>Institutional</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center transition-all group-hover:bg-blue-600 group-hover:text-white">
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiagnosticCards;
