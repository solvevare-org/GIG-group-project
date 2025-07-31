import React, { useState, useEffect } from 'react';
import { Film } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 800);
    const timer2 = setTimeout(() => setStage(2), 2500);
    const timer3 = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      {/* Stage Curtain Animation */}
      <div className="absolute inset-0 flex">
        {/* Left Curtain */}
        <div 
          className={`w-1/2 h-full bg-gradient-to-r from-red-900 via-red-800 to-red-700 transition-transform duration-2000 ease-in-out relative ${
            stage >= 1 ? '-translate-x-full' : ''
          }`}
        >
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-black opacity-50"></div>
          {/* Curtain texture */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-800 via-transparent to-red-900 opacity-30"></div>
        </div>
        
        {/* Right Curtain */}
        <div 
          className={`w-1/2 h-full bg-gradient-to-l from-red-900 via-red-800 to-red-700 transition-transform duration-2000 ease-in-out relative ${
            stage >= 1 ? 'translate-x-full' : ''
          }`}
        >
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-l from-transparent to-black opacity-50"></div>
          {/* Curtain texture */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-800 via-transparent to-red-900 opacity-30"></div>
        </div>
      </div>

      {/* Center seam */}
      <div className={`absolute left-1/2 top-0 bottom-0 w-1 bg-black transform -translate-x-1/2 transition-opacity duration-1000 ${
        stage >= 1 ? 'opacity-0' : 'opacity-100'
      }`}></div>

      {/* Loading Content */}
      <div className={`text-center z-10 transition-all duration-1000 ${
        stage >= 2 ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}>
        <div className="mb-8">
          <Film className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-wider">
          NO RIGHT WAY
        </h1>
        
        <p className="text-red-400 text-lg tracking-[0.3em] mb-8 font-light">
          A GIG STUDIOS PRODUCTION
        </p>
        
        <div className="flex justify-center mb-4">
          <div className="w-32 h-1 bg-red-900 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-500 to-red-600 animate-loading-bar rounded-full"></div>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm tracking-widest">
          ENTERING THE EXPERIENCE
        </p>
      </div>

      {/* Spotlight effect */}
      <div className={`absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-60 transition-opacity duration-2000 ${
        stage >= 1 ? 'opacity-0' : 'opacity-60'
      }`}></div>
    </div>
  );
};

export default Preloader;