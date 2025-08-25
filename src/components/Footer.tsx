import React from 'react';
import { Film } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Film className="w-8 h-8 text-gold" />
            <span className="text-2xl font-bold text-white">NO RIGHT WAY</span>
          </div>
          
          <p className="text-gray-400 mb-6">
            From the Streets to the BoardRooms on WallStreet
          </p>

          <div className="flex justify-center gap-8 mb-8 text-sm">
            <a href="#" className="text-gray-400 hover:text-gold transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-gold transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-gold transition-colors duration-300">
              Contact
            </a>
            <a href="https://theurbanren.myspreadshop.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors duration-300">
              Merchandise
            </a>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500 text-sm">
              © 2025 Copyrights No Right Way or GIG Studio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;