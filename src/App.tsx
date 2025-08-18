import  {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import CheckoutPage from './pages/CheckoutPage';
import Preloader from './components/Preloader';
import AccreditationModal from './components/AccreditationModal';
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

function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [showAccreditationModal, setShowAccreditationModal] = useState(false);
  const [, setShowTrailerModal] = useState(false);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  const handleAccreditedClick = () => {
    setShowAccreditationModal(true);
  };

  // Removed unused accreditation confirm handler; modal handles redirect internally.

  const handleTrailerClick = () => {
    setShowTrailerModal(true);
  };
  return (
    <div className="bg-black text-white relative min-h-screen">
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <div className={`transition-opacity duration-1000 ${
        showPreloader ? 'opacity-0' : 'opacity-100'
  } pt-12 sm:pt-0`}>
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
      />

      {/* GIG Social Media Links - moved above Footer, reduced margin */}
      <div className="flex flex-col items-center gap-2 mt-4 mb-0">
        <h3 className="text-lg font-bold text-white mb-2">Connect with GIG Group</h3>
        <div className="flex gap-4">
          <a href="https://www.instagram.com/giggroupinc?igsh=MTQ3eWVvMTRxNW90aw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500" title="Instagram">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
          </a>
          <a href="https://www.linkedin.com/company/gig-group/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400" title="LinkedIn">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><line x1="8" y1="11" x2="8" y2="16"/><line x1="8" y1="8" x2="8" y2="8"/><line x1="12" y1="11" x2="12" y2="16"/><path d="M16 11v3a2 2 0 0 1-4 0v-3"/></svg>
          </a>
          <a href="https://www.facebook.com/share/1CTyfzdyMi/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600" title="Facebook">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 8h-2a2 2 0 0 0-2 2v2h4"/><line x1="12" y1="16" x2="12" y2="12"/></svg>
          </a>
          <a href="https://x.com/giginvestment?s=21" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400" title="X">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M4 20L20 4M4 4l16 16"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}

export default App;