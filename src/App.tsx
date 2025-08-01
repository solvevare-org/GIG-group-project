import React, { useState, useEffect } from 'react';
import logo from './assets/IMG-8086.png';
import Preloader from './components/Preloader';
import AccreditationModal from './components/AccreditationModal';
import TrailerModal from './components/TrailerModal';
import PressSection from './components/PressSection';
import FounderStorySection from './components/FounderStorySection';
import CountdownSection from './components/CountdownSection';
import StickyCtaBar from './components/StickyCtaBar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import InvestorPortalSection from './components/InvestorPortalSection';
import SubscriptionSection from './components/SubscriptionSection';
import PerksSection from './components/PerksSection';
import MerchandiseSection from './components/MerchandiseSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [showAccreditationModal, setShowAccreditationModal] = useState(false);
  const [showTrailerModal, setShowTrailerModal] = useState(false);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  const handleAccreditedClick = () => {
    setShowAccreditationModal(true);
  };

  const handleAccreditationConfirm = () => {
    // Here you would implement the actual portal access logic
    // For now, we'll just redirect to a placeholder
    window.open('https://gigstudios.online', '_blank');
  };

  const handleTrailerClick = () => {
    setShowTrailerModal(true);
  };
  return (
    <div className="bg-black text-white relative min-h-screen">
      {/* Logo in top left corner */}
      <img
        src={logo}
        alt="No Right Way Logo"
        className="absolute top-1 left-3 w-32 h-auto z-50 drop-shadow-lg"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      />
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <div className={`transition-opacity duration-1000 ${
        showPreloader ? 'opacity-0' : 'opacity-100'
      }`}>
        <HeroSection 
          onAccreditedClick={handleAccreditedClick}
          onTrailerClick={handleTrailerClick}
        />
        <PressSection />
        <CountdownSection />
        <AboutSection />
        <FounderStorySection />
        <InvestorPortalSection />
        <SubscriptionSection />
        <PerksSection />
        <MerchandiseSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        
        <StickyCtaBar onAccreditedClick={handleAccreditedClick} />
      </div>

      <AccreditationModal
        isOpen={showAccreditationModal}
        onClose={() => setShowAccreditationModal(false)}
        onConfirm={handleAccreditationConfirm}
      />

      <TrailerModal
        isOpen={showTrailerModal}
        onClose={() => setShowTrailerModal(false)}
      />
    </div>
  );
}

export default App;