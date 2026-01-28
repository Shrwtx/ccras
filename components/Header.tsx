
import React from 'react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  fontSize: number;
  setFontSize: (val: number) => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode, fontSize, setFontSize }) => {
  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('main-content');
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full sticky top-0 z-50">
      {/* Top Gov Bar - Official Standard */}
      <div className="bg-[#f0f4f8] dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800 py-1.5 px-4 md:px-12 text-[10px] font-bold text-slate-500 dark:text-slate-400 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/800px-Emblem_of_India.svg.png" alt="India Emblem" className="h-3 w-auto grayscale dark:invert opacity-70" />
            <span className="uppercase tracking-widest">Government of India</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700 hidden md:block">|</span>
          <span className="uppercase tracking-widest hidden md:block">Ministry of Ayush</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#main-content" onClick={handleSkip} className="hover:text-blue-600 transition-colors hidden sm:block outline-none">Skip to content</a>
          <div className="flex items-center space-x-2 border-l border-slate-200 dark:border-slate-700 pl-4">
            <button onClick={() => setFontSize(Math.max(fontSize - 10, 80))} className="w-5 h-5 flex items-center justify-center border border-slate-300 dark:border-slate-700 rounded text-[9px] hover:bg-white dark:hover:bg-slate-700 transition-colors font-black">A-</button>
            <button onClick={() => setFontSize(Math.min(fontSize + 10, 150))} className="w-5 h-5 flex items-center justify-center border border-slate-300 dark:border-slate-700 rounded text-[9px] hover:bg-white dark:hover:bg-slate-700 transition-colors font-black">A+</button>
          </div>
        </div>
      </div>

      {/* Main Portal Header */}
      <header className="h-24 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 md:px-12 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 relative">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <img src="https://ccras.nic.in/wp-content/uploads/2025/05/cropped-CCRAS-Trademark-Transparent.png" alt="CCRAS Logo" className="h-14 w-auto object-contain transition-transform hover:scale-105" />
            <div className="ml-5 border-l border-slate-200 dark:border-slate-800 pl-5">
              <h1 className="text-xl font-black text-[#1e293b] dark:text-white leading-none tracking-tighter">CCRAS</h1>
              <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em] mt-1.5">Medical Intelligence</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden sm:flex items-center px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Network Secure</span>
          </div>

          <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all" aria-label="Toggle Theme">
            {darkMode ? (
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          <div className="flex items-center space-x-3 pl-6 border-l border-slate-200 dark:border-slate-800">
            <div className="text-right hidden md:block">
              <p className="text-xs font-black text-slate-900 dark:text-white uppercase">Dr. Sehrawat</p>
              <p className="text-[9px] text-blue-600 font-bold uppercase tracking-widest">Clinician</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-700 dark:bg-blue-600 flex items-center justify-center text-white text-xs font-black ring-4 ring-blue-500/5">DS</div>
          </div>
        </div>
        
        {/* Institutional Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-blue-600/40 to-transparent"></div>
      </header>
    </div>
  );
};

export default Header;
