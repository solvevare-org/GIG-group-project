import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Shield } from 'lucide-react';

interface HeroSectionProps {
  onAccreditedClick: () => void;
  onTrailerClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onAccreditedClick }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      const el = sectionRef.current;
      if (el) {
        setShowScrollIndicator(el.scrollHeight > el.clientHeight + 10);
      }
    };
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-8 md:pt-16">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        {/* Cinematic grain effect */}
        <div className="absolute inset-0 opacity-30 bg-gradient-to-t from-transparent via-gray-900 to-transparent animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
        
        <div className="flex flex-col items-center mb-2 md:mb-4">
          <span className="block text-base md:text-xl font-extrabold tracking-widest uppercase text-red-500 drop-shadow mb-1">
            NOW IN DEVELOPMENT
          </span>
          <span className="block text-xs md:text-base text-gray-100 font-bold tracking-widest uppercase mb-1">
            FROM THE DESK OF ANTHONY HEMINGWAY
          </span>
        </div>

        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-none tracking-tight">
          NO RIGHT
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700">
            WAY
          </span>
        </h1>
        <div className="mb-6">
          <p className="text-base md:text-lg text-gray-200 font-semibold tracking-wide">
            Directed by: Anthony Hemingway<br />
            Produced by: Anthony Hemingway and Joe Incaprera<br />
            Written by: Anthony Hemingway, Ashoka <br className="hidden md:inline" />
            Thomas and Clay Ayers
          </p>
        </div>
        
        {/* <p className="text-xl md:text-3xl text-gray-300 mb-4 font-light tracking-wide">
          Break Financial Conformity
        </p> */}
        
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
          A disruptive finance drama challenging conventional wisdom. 
          <span className="text-red-400 font-semibold"> There's no single path to success.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
          <button 
            onClick={onAccreditedClick}
            className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center gap-3 shadow-2xl border border-red-500 text-center"
          >
            <span className="flex items-center justify-center gap-3 w-full">
              <Shield className="w-6 h-6" />
              <span className="block w-full text-center">
                INSTITUTIONAL AND ACCREDITED INVESTORS TERM SHEET
              </span>
            </span>
          </button>
          {/* <button 
            onClick={onTrailerClick}
            className="border-2 border-white hover:border-red-500 text-white hover:text-red-400 px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 flex items-center gap-3"
          >
            <Play className="w-5 h-5" />
            Watch Trailer
          </button> */}
        </div>
        <div className="flex justify-center mb-10">
          <div className=" text-gray-200 px-4 py-3 rounded-md shadow-md text-center max-w-2xl w-full">
            <span className="text-xs md:text-sm font-semibold tracking-wide leading-snug">
              EXECUTIVE PRODUCED BY: COURTNEY B. VANCE, ANGELA BASSETT, OMARI HARDWICK,<br className="hidden md:inline" /> LYNETTE RAMIREZ AND DAVID WEILD IV
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator: only show if scrollable */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white opacity-70" />
        </div>
      )}

      {/* Cinematic borders */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default HeroSection;