
import React, { useState, useEffect } from 'react';

const slides = [
  {
    image: "https://ccras.nic.in/wp-content/uploads/2025/10/CCRAS-Bannar.png",
    title: "Intelligent Healthcare",
    subtitle: "AI-powered diagnosis for better patient outcomes.",
    badge: "Advanced Analysis"
  },
  {
    image: "https://ccras.nic.in/wp-content/uploads/2025/10/CCRAS-INSTU1.jpg",
    title: "Clinical Precision",
    subtitle: "High-accuracy medical image classification.",
    badge: "Research Level"
  }
];

const Hero: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-6 md:px-12 mt-6">
      <div className="relative h-[380px] overflow-hidden rounded-[40px] shadow-xl bg-slate-900 border border-slate-200 dark:border-slate-800">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${
              idx === currentIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
            }`}
          >
            <img src={slide.image} alt="CCRAS Background" className="w-full h-full object-cover opacity-40 grayscale-[0.2]" />
          </div>
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/50 to-transparent flex items-center px-10 md:px-20">
          <div className="max-w-xl space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-600 rounded-lg shadow-lg">
              <span className="text-[9px] font-black text-white uppercase tracking-widest">{slides[currentIdx].badge}</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter">
                {slides[currentIdx].title.split(' ')[0]} <br />
                <span className="text-blue-400">{slides[currentIdx].title.split(' ')[1]}</span>
              </h1>
              <p className="text-slate-300 text-base font-medium leading-relaxed max-w-sm">
                {slides[currentIdx].subtitle} Analysis generated in seconds.
              </p>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 right-10 flex items-center space-x-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`h-1.5 rounded-full transition-all duration-700 ${
                idx === currentIdx ? 'bg-blue-400 w-10 shadow-lg shadow-blue-400/50' : 'bg-white/20 w-3 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
