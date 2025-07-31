import React, { useState, useEffect } from 'react';
import { Shield, X } from 'lucide-react';

interface StickyCtaBarProps {
  onAccreditedClick: () => void;
}

const StickyCtaBar: React.FC<StickyCtaBarProps> = ({ onAccreditedClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show after scrolling past the hero section
      setIsVisible(scrollPosition > windowHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-red-600 to-red-700 border-t border-red-500 shadow-2xl animate-slide-up backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Shield className="w-6 h-6 text-white" />
            <div className="text-center sm:text-left">
              <h3 className="text-white font-bold text-lg">Ready to Join the Financial Revolution?</h3>
              <p className="text-red-100 text-sm">Exclusive access for accredited investors</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onAccreditedClick}
              className="bg-white text-red-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Access
            </button>
            <button className="hidden sm:block border-2 border-white text-white px-4 py-2 rounded-full font-semibold hover:bg-white hover:text-red-600 transition-all duration-300 text-sm">
              Learn More
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="text-white hover:text-red-200 transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCtaBar;