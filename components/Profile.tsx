
import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="p-8 lg:p-12 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Profile Identity Card */}
        <div className="w-full md:w-80 shrink-0 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[48px] p-10 border border-slate-100 dark:border-slate-800 shadow-xl text-center">
            <div className="w-32 h-32 bg-blue-700 rounded-[32px] mx-auto mb-6 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-blue-500/20">
              DS
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Dr. Sehrawat</h3>
            <p className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">IT Intern / Clinician</p>
            <div className="mt-8 pt-8 border-t border-slate-50 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-slate-400 uppercase tracking-widest">Division</span>
                <span className="text-slate-900 dark:text-white uppercase">Research IT</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-slate-400 uppercase tracking-widest">ID Code</span>
                <span className="text-slate-900 dark:text-white uppercase">CCRAS-2025-A1</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-700 rounded-[32px] p-8 text-white space-y-4 shadow-lg shadow-blue-500/10">
            <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.2em]">Clinical Verified</p>
            <p className="text-sm font-medium leading-relaxed">Authorized for Institutional Digital Health Initiatives & Clinical Support Services.</p>
          </div>
        </div>

        {/* Professional Details */}
        <div className="flex-1 space-y-12">
          <section>
            <div className="mb-8">
              <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">Professional Background</span>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Work Experience</h2>
            </div>

            <div className="space-y-8">
              <div className="relative pl-10 border-l-2 border-slate-100 dark:border-slate-800">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-950 shadow-sm"></div>
                <div className="mb-2">
                  <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">IT Intern</h4>
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Central Council for Research in Ayurvedic Sciences (CCRAS), Ministry of Ayush</p>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">Delhi, India • 12/2025 - Present</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Institutional Responsibilities</p>
                    <ul className="space-y-3 text-[13px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        <span>Assisting in the digital transformation of institutional research databases and patient record management systems.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        <span>Working on the integration of traditional ayurvedic knowledge with modern computational frameworks for clinical decision support.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        <span>Supporting multi-disciplinary teams in the development of standards for clinical data exchange within the Ministry of Ayush.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
