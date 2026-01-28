import React, { useState } from 'react';
import { InfoTabContent } from '../types';

interface DiseaseInfoTabsProps {
  info?: Record<string, InfoTabContent>;
}

const DiseaseInfoTabs: React.FC<DiseaseInfoTabsProps> = ({ info }) => {
  if (!info || Object.keys(info).length === 0) {
    return (
      <div className="p-8 text-center text-slate-500">
        <p>No classification data available</p>
      </div>
    );
  }

  const tabNames = Object.keys(info);
  const [activeTab, setActiveTab] = useState(tabNames[0] || '');

  const renderContent = (content: InfoTabContent) => {
    // Handle the tabs array structure from backend
    if (content && Array.isArray(content.tabs) && content.tabs.length > 0) {
      return (
        <div className="space-y-3">
          {content.tabs.map((item, idx) => (
            <div 
              key={idx} 
              className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 border-b border-slate-100 dark:border-slate-800 pb-3 last:border-0"
            >
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider min-w-[140px] shrink-0 py-1">
                {item.label}
              </span>
              <span className="text-[12px] text-slate-800 dark:text-slate-200 leading-snug font-semibold">
                {item.value || '—'}
              </span>
            </div>
          ))}

          {/* <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 border-b border-slate-100 dark:border-slate-800 pb-3 last:border-0">
            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider min-w-[140px] shrink-0 py-1">
              Description
            </span>
            <span className="text-[12px] text-slate-800 dark:text-slate-200 leading-snug font-semibold">
              {content.description || '—'}
            </span>
          </div> */}
        </div>
      );
    }

    return (
      <div className="p-6 bg-slate-50/50 dark:bg-slate-800/10 rounded-lg border border-slate-100 dark:border-slate-800">
        <p className="text-slate-500 dark:text-slate-400 text-sm">No data available</p>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
      {/* Tab Navigation */}
      <div className="px-4 pt-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-950/10">
        <div className="flex overflow-x-auto gap-1 pb-0">
          {tabNames.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-[10px] font-black uppercase tracking-wider transition-all relative whitespace-nowrap rounded-t-xl ${
                activeTab === tab 
                  ? 'text-blue-700 dark:text-blue-400 bg-white dark:bg-slate-900 border-x border-t border-slate-100 dark:border-slate-800' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 lg:p-8 animate-in fade-in duration-300 min-h-[250px]">
        {activeTab && info[activeTab] ? renderContent(info[activeTab]) : null}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default DiseaseInfoTabs;
