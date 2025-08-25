import  {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import CheckoutPage from './pages/CheckoutPage';
import Preloader from './components/Preloader';
import AccreditationModal from './components/AccreditationModal';
import PressSection from './components/PressSection';
import FounderStorySection from './components/FounderStorySection';
import CountdownSection from './components/CountdownSection';
import CinematicSections from './components/CinematicSections';
import cs9 from '../picture/IMG-20250821-WA0009.jpg';
import cs10 from '../picture/IMG-20250821-WA0010.jpg';
import cs11 from '../picture/IMG-20250821-WA0011.jpg';
import csA from '../picture/IMG-20250821-WA0012.jpg';
import csB from '../picture/IMG-20250821-WA0013.jpg';
// import csC from '../picture/IMG-20250821-WA0014.jpg';
import csD from '../picture/IMG-20250821-WA0015.jpg';
import csE from '../picture/IMG-20250821-WA0016.jpg';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import InvestorPortalSection from './components/InvestorPortalSection';
import SubscriptionSection from './components/SubscriptionSection';
import PerksSection from './components/PerksSection';
import MerchandiseSection from './components/MerchandiseSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaXTwitter } from 'react-icons/fa6';

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
        {/* Cinematic block (3 images) inserted after Hero for strong visual impact */}
        <CinematicSections
          items={[
            { image: cs9, heading: 'The Faces Of Moments', subheading: 'A moment of impact', position: 'center' },
            { image: cs10, heading: 'The Rebellion in Actions', subheading: 'Context and energy', position: 'center' },
            { image: cs11, heading: 'From Wall Street to Revolution', subheading: 'Movement and motion', position: 'center' },

          ]}
        />
        <PressSection />
        <CinematicSections
          items={[
            { image: csA, heading: 'Momentum Builds',subheading: 'Rising Above Limits', position: 'bottom-left' },
            { image: csB, heading: 'Action & Presence', subheading: 'Making Every Moment Count', position: 'bottom-left' },
            
          ]}
        />
        
        <AboutSection />
        <FounderStorySection />
        {/* Cinematic block (2 images) inserted after Founder story to break up text and add imagery */}
        <CinematicSections
          items={[

            { image: csD, heading: 'Community & Motion', subheading: 'Driven by Unity', position: 'center' },
            { image: csE, heading: 'Intimate Frame', subheading: 'A close, intimate frame', position: 'bottom-left' },
          ]}
        />
        <InvestorPortalSection />
        <SubscriptionSection />
        <PerksSection />
        <MerchandiseSection />
        <TestimonialsSection />
        <CountdownSection />
        <ContactSection />
  <Footer />
      </div>

      <AccreditationModal
        isOpen={showAccreditationModal}
        onClose={() => setShowAccreditationModal(false)}
      />

      {/* Improved GIG Social Media Links UI/UX */}
      <div className="mt-16 pb-8 border-t border-gray-800 flex flex-col items-center">
        <h3 className="text-white text-2xl font-bold mb-6 text-center tracking-tight">Connect with GIG Group AND GIG Studios</h3>
      <div className="flex gap-6 justify-center items-center">
          <a
            href="https://www.instagram.com/giggroupinc?igsh=MTQ3eWVvMTRxNW90aw%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
            className="group bg-black rounded-full p-3 border-2 border-white hover:border-pink-500 focus:border-pink-500 transition-all duration-200 shadow-lg"
          >
        <FaInstagram className="w-6 h-6 text-white group-hover:text-pink-500 group-focus:text-pink-500 transition-colors duration-200" />
          </a>
          <a
            href="https://www.linkedin.com/company/gig-group/"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
            className="group bg-black rounded-full p-3 border-2 border-white hover:border-blue-600 focus:border-blue-600 transition-all duration-200 shadow-lg"
          >
        <FaLinkedinIn className="w-6 h-6 text-white group-hover:text-blue-600 group-focus:text-blue-600 transition-colors duration-200" />
          </a>
          <a
            href="https://www.facebook.com/share/1CTyfzdyMi/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener"
            aria-label="Facebook"
            className="group bg-black rounded-full p-3 border-2 border-white hover:border-blue-500 focus:border-blue-500 transition-all duration-200 shadow-lg"
          >
        <FaFacebookF className="w-6 h-6 text-white group-hover:text-blue-500 group-focus:text-blue-500 transition-colors duration-200" />
          </a>
          <a
            href="https://x.com/giginvestment?s=21"
            target="_blank"
            rel="noopener"
            aria-label="X (Twitter)"
            className="group bg-black rounded-full p-3 border-2 border-white hover:border-gray-400 focus:border-gray-400 transition-all duration-200 shadow-lg"
          >
        <FaXTwitter className="w-6 h-6 text-white group-hover:text-gray-400 group-focus:text-gray-400 transition-colors duration-200" />
          </a>
        </div>
        <p className="text-gray-400 text-sm mt-6 text-center">Follow us for updates, news, and more.</p>
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