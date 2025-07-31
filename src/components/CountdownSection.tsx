import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Film, Star } from 'lucide-react';

const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set target date - adjust as needed
  const targetDate = new Date('2025-06-15T00:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="py-20 bg-gradient-to-b from-black via-red-900/10 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600/5 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-red-900/20 border border-red-800 text-red-300 px-6 py-3 rounded-full text-sm font-bold tracking-wider mb-8">
            <Film className="w-4 h-4" />
            WORLD PREMIERE COUNTDOWN
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            THE REVOLUTION
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
              BEGINS SOON
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Mark your calendars. The most anticipated financial education film of the decade 
            premieres exclusively for our community first.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 border border-gray-700 text-center hover:border-red-500/50 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-black text-red-400 mb-2">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-gray-400 text-sm font-semibold tracking-wider">DAYS</div>
          </div>
          
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 border border-gray-700 text-center hover:border-red-500/50 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-black text-red-400 mb-2">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-gray-400 text-sm font-semibold tracking-wider">HOURS</div>
          </div>
          
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 border border-gray-700 text-center hover:border-red-500/50 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-black text-red-400 mb-2">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-gray-400 text-sm font-semibold tracking-wider">MINUTES</div>
          </div>
          
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 border border-gray-700 text-center hover:border-red-500/50 transition-all duration-300">
            <div className="text-4xl md:text-5xl font-black text-red-400 mb-2">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-gray-400 text-sm font-semibold tracking-wider">SECONDS</div>
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">World Premiere Event</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-red-500" />
                  <span>June 15, 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-red-500" />
                  <span>7:00 PM EST / 4:00 PM PST</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-red-500" />
                  <span>Exclusive Subscriber Preview</span>
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-4">
                Be among the first to experience the financial revolution
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105">
                Reserve Your Spot
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Limited to first 10,000 subscribers
              </p>
            </div>
          </div>
        </div>

        {/* Early Access Benefits */}
        <div className="text-center mt-12">
          <h4 className="text-lg font-bold text-white mb-6">Premiere Night Exclusive Benefits</h4>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h5 className="text-white font-semibold mb-2">Live Q&A</h5>
              <p className="text-gray-400 text-sm">Direct access to cast and crew</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h5 className="text-white font-semibold mb-2">Behind the Scenes</h5>
              <p className="text-gray-400 text-sm">Exclusive production footage</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h5 className="text-white font-semibold mb-2">Digital Collectible</h5>
              <p className="text-gray-400 text-sm">Limited edition premiere NFT</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;