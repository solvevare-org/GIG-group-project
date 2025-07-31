import React from 'react';
import { Play, ChevronDown, Shield, ExternalLink } from 'lucide-react';

interface HeroSectionProps {
  onAccreditedClick: () => void;
  onTrailerClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onAccreditedClick, onTrailerClick }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        {/* Cinematic grain effect */}
        <div className="absolute inset-0 opacity-30 bg-gradient-to-t from-transparent via-gray-900 to-transparent animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="inline-block bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wider mb-6">
            NOW IN PRODUCTION
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-none tracking-tight">
          NO RIGHT
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700">
            WAY
          </span>
        </h1>
        
        <p className="text-xl md:text-3xl text-gray-300 mb-4 font-light tracking-wide">
          Break Financial Conformity
        </p>
        
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
          A disruptive financial education film challenging conventional wisdom. 
          <span className="text-red-400 font-semibold"> There's no single path to success.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button 
            onClick={onAccreditedClick}
            className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 shadow-2xl border border-red-500"
          >
            <Shield className="w-6 h-6" />
            Accredited and Institutional Investors
          </button>
          
          <button 
            onClick={onTrailerClick}
            className="border-2 border-white hover:border-red-500 text-white hover:text-red-400 px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 flex items-center gap-3"
          >
            <Play className="w-5 h-5" />
            Watch Trailer
          </button>
        </div>

        {/* Key Players */}
        <div className="text-center text-gray-500 text-sm tracking-widest">
          <p className="mb-2">FEATURING</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm">
            <a href="#" className="hover:text-red-400 transition-colors cursor-pointer">M88</a>
            <a href="#" className="hover:text-red-400 transition-colors cursor-pointer">UTA</a>
            <a href="#" className="hover:text-red-400 transition-colors cursor-pointer">BASSETT VANCE PRODUCTION</a>
            <a href="#" className="hover:text-red-400 transition-colors cursor-pointer">WEILD & CO.</a>
            <a href="#" className="hover:text-red-400 transition-colors cursor-pointer">RAMO LAW</a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white opacity-70" />
      </div>

      {/* Cinematic borders */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default HeroSection;