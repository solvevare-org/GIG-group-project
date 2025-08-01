import React from 'react';
import { Film, Zap, Target, Play, Users } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block bg-red-900 text-red-300 px-6 py-2 rounded-full text-sm font-bold tracking-wider mb-8">
            DISRUPTIVE FINANCIAL EDUCATION
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            BREAK THE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
              SYSTEM
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            <span className="text-red-400 font-bold">"No Right Way"</span> challenges every financial rule you've been taught. 
            This isn't just a film—it's a rebellion against conformity, a manifesto for financial independence.
          </p>
          
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Featuring industry disruptors and backed by powerhouse partners, we're rewriting the playbook 
            on wealth creation, investment strategies, and financial freedom.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="group text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-2xl">
              <Film className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">The Movement</h3>
            <p className="text-gray-400 leading-relaxed">
              A cinematic revolution that exposes the myths of traditional financial advice and empowers individual paths to wealth
            </p>
          </div>

          <div className="group text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-2xl">
              <Zap className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">The Disruption</h3>
            <p className="text-gray-400 leading-relaxed">
              Challenging Wall Street orthodoxy with real stories of unconventional success and alternative investment strategies
            </p>
          </div>

          <div className="group text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-2xl">
              <Target className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">The Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              Democratizing financial education and proving there's no single formula for building generational wealth
            </p>
          </div>
        </div>

        {/* Featured Content */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
          <img 
            src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg" 
            alt="Behind the scenes of No Right Way"
            className="w-full h-80 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group hover:bg-opacity-30 transition-all duration-300">
            <button className="bg-red-600 hover:bg-red-700 text-white p-6 rounded-full transition-all duration-300 transform group-hover:scale-110 shadow-2xl">
              <Play className="w-10 h-10 ml-1" />
            </button>
          </div>
          <div className="absolute bottom-8 left-8 right-8">
            <h4 className="text-2xl font-bold text-white mb-2">Behind the Revolution</h4>
            <p className="text-gray-300">Exclusive footage from the making of financial cinema's most controversial film</p>
          </div>
        </div>

        {/* Industry Partners */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 text-base md:text-lg tracking-widest mb-10 uppercase font-semibold">Powered by Industry Leaders</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 items-center justify-items-center max-w-6xl mx-auto">
            <div className="text-gray-200 font-bold text-base md:text-lg hover:text-red-400 transition-colors cursor-pointer">M88</div>
            <div className="text-gray-200 font-bold text-base md:text-lg hover:text-red-400 transition-colors cursor-pointer">United Talent Agency (UTA)</div>
            <div className="text-gray-200 font-bold text-base md:text-lg hover:text-red-400 transition-colors cursor-pointer">Bassett Vance Production</div>
            <div className="text-gray-200 font-bold text-base md:text-lg hover:text-red-400 transition-colors cursor-pointer">Weild &amp; Co.</div>
            <div className="text-gray-200 font-bold text-base md:text-lg hover:text-red-400 transition-colors cursor-pointer">Ramo Law</div>
            <div className="text-gray-200 font-bold text-base md:text-lg hover:text-red-400 transition-colors cursor-pointer">Anthony Hemingway Productions</div>
            <div className="text-gray-200 font-bold text-base md:text-lg hover:text-red-400 transition-colors cursor-pointer text-center">Weild Foundation for American<br/>Competitiveness</div>
            <div className="text-gray-200 font-bold text-base md:text-lg hover:text-red-400 transition-colors cursor-pointer">Bravelife Productions</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;