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