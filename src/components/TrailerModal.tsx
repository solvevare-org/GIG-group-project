import React from 'react';
import { X, Play, ExternalLink, Calendar } from 'lucide-react';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrailerModal: React.FC<TrailerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-4xl mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">No Right Way - Official Trailer</h2>
          <p className="text-gray-400">The financial revolution begins here</p>
        </div>

        {/* Trailer Embed - Vimeo Integration Ready */}
        <div className="relative bg-black rounded-xl overflow-hidden mb-6" style={{ paddingBottom: '56.25%' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Production-ready for Vimeo embed */}
            <div className="text-center">
              <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-12 h-12 text-white ml-1" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Trailer Coming Soon</h3>
              <p className="text-gray-400 mb-4">
                Premiering exclusively on Vimeo - subscribers get early access
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Get Notified
                </button>
                <button className="border border-gray-600 hover:border-red-500 text-gray-300 hover:text-white px-6 py-3 rounded-full font-semibold transition-colors">
                  Join Waitlist
                </button>
              </div>
            </div>
          </div>
          
          {/* Production Implementation:
          <iframe
            src="https://player.vimeo.com/video/YOUR_VIDEO_ID?autoplay=1&title=0&byline=0&portrait=0"
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
          */}
        </div>

        <div className="flex justify-center gap-4">
          <p className="text-xs text-gray-500 mb-4">
            Hosted on Vimeo Pro for optimal streaming quality
          </p>
        </div>
        
        <div className="flex justify-center gap-4">
          <a
            href="https://www.gigstudios.online"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Visit GIG Studios
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;