import React from 'react';
import { Film } from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaXTwitter } from 'react-icons/fa6';

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
              From the Streets to the BoardRooms on WallStreet
            </a>
          </div>

            <div className="mt-12 pt-8 border-t border-gray-800">
              <h3 className="text-white text-lg font-bold mb-4 text-left">Connect with GIG Group</h3>
              <div className="flex gap-6 justify-start items-center">
                <a href="https://instagram.com/gigstudios" target="_blank" rel="noopener" aria-label="Instagram" className="bg-black rounded-lg p-2 border border-white hover:bg-gray-900 transition-colors">
                  <FaInstagram className="w-8 h-8 text-white" />
                </a>
                <a href="https://linkedin.com/company/gigstudios" target="_blank" rel="noopener" aria-label="LinkedIn" className="bg-black rounded-lg p-2 border border-white hover:bg-gray-900 transition-colors">
                  <FaLinkedinIn className="w-8 h-8 text-white" />
                </a>
                <a href="https://facebook.com/gigstudios" target="_blank" rel="noopener" aria-label="Facebook" className="bg-black rounded-lg p-2 border border-white hover:bg-gray-900 transition-colors">
                  <FaFacebookF className="w-8 h-8 text-white" />
                </a>
                <a href="https://twitter.com/gigstudios" target="_blank" rel="noopener" aria-label="X (Twitter)" className="bg-black rounded-lg p-2 border border-white hover:bg-gray-900 transition-colors">
                  <FaXTwitter className="w-8 h-8 text-white" />
                </a>
              </div>
            </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500 text-sm">
              © 2025 From the Streets to the BoardRooms on WallStreet . All rights reserved. • There's no right way, only your way.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;