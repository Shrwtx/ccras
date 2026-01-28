import React, { useState } from 'react';

const AyushInfo: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "About the Ministry",
      content: "The Ministry of Ayush focuses on traditional healthcare systems. It modernizes systems like Ayurveda, Siddha, and Unani to integrate with contemporary medical needs, ensuring safety and standard care.",
      icon: "🏛️"
    },
    {
      title: "CCRAS Role",
      content: "As India's apex center for research in Ayurveda, CCRAS applies scientific methodologies to validate traditional therapies, optimizing their utility in modern hospitals.",
      icon: "🔬"
    },
    {
      title: "AI Integration",
      content: "Our Medical AI division leverages deep learning to assist clinicians in rapid decision-making, bridging clinical radiology with profound traditional knowledge.",
      icon: "⚡"
    }
  ];

  return (
    <section className="px-12 py-20 bg-slate-50/30 dark:bg-slate-950/20 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em]">Resource Center</span>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mt-3 tracking-tighter">Institutional Guidelines</h2>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[48px] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
          <div className="md:w-1/3 bg-slate-50 dark:bg-slate-800/30 p-10 space-y-3 border-r border-slate-200 dark:border-slate-800">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full text-left p-6 rounded-[24px] transition-all duration-300 font-black text-[13px] uppercase tracking-widest flex items-center space-x-5 border ${
                  activeTab === idx 
                  ? 'bg-white dark:bg-slate-700 shadow-xl shadow-blue-500/5 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-900' 
                  : 'text-slate-500 border-transparent hover:bg-white/50 dark:hover:bg-slate-700/50'
                }`}
              >
                <span className="text-2xl opacity-80">{tab.icon}</span>
                <span>{tab.title}</span>
              </button>
            ))}
          </div>

          <div className="md:w-2/3 p-12 md:p-20 flex items-center bg-white dark:bg-slate-900">
            <div className="max-w-2xl animate-in fade-in slide-in-from-right-8 duration-700">
              <h4 className="text-4xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">{tabs[activeTab].title}</h4>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-[1.8] mb-12 font-medium">{tabs[activeTab].content}</p>
              <a href="https://ayush.gov.in" target="_blank" rel="noreferrer" className="inline-flex items-center text-blue-700 dark:text-blue-400 font-black text-[11px] uppercase tracking-[0.2em] group">
                Visit Official Archive
                <svg className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AyushInfo;