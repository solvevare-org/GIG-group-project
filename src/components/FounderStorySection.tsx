import React from 'react';
import { Users, Target, Zap, ArrowRight, Quote, Film } from 'lucide-react';

const FounderStorySection: React.FC = () => {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Founder Story Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-red-900/20 border border-red-800 text-red-300 px-6 py-2 rounded-full text-sm font-bold tracking-wider mb-8">
            THE STORY BEHIND THE REBELLION
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            FROM WALL STREET
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
              TO REVOLUTION
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Founder Quote & Story */}
          <div>
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 mb-8">
              <Quote className="w-8 h-8 text-red-500 mb-4" />
              <blockquote className="text-xl text-gray-300 leading-relaxed mb-6 italic">
                "I spent 15 years on Wall Street watching the same tired advice destroy more wealth than it created. 
                The system isn't broken—it's working exactly as designed: to keep you dependent."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <Film className="w-6 h-6 text-white" />
                </div>
                <div>
                  <cite className="text-white font-bold not-italic">GIG Studios Founder</cite>
                  <p className="text-gray-400 text-sm">Former Wall Street Executive</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                <span className="text-red-400 font-bold">"No Right Way"</span> was born from frustration—watching 
                brilliant minds trapped by conventional wisdom that serves institutions, not individuals.
              </p>
              
              <p>
                After witnessing the 2008 crash, the COVID market volatility, and countless "expert" predictions 
                fail spectacularly, we realized the truth: <strong className="text-white">every successful investor 
                broke the rules everyone else followed.</strong>
              </p>

              <p>
                This isn't just a film—it's a manifesto. A declaration that your path to wealth doesn't need 
                validation from Wall Street, your financial advisor, or anyone else selling you their "proven system."
              </p>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Why This Matters Now</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">The Conformity Crisis</h4>
                    <p className="text-gray-400">
                      Millions follow identical investment strategies, creating market bubbles and limiting individual potential
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">The Access Problem</h4>
                    <p className="text-gray-400">
                      Elite investment strategies remain locked behind institutional walls, creating artificial scarcity
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">The Innovation Gap</h4>
                    <p className="text-gray-400">
                      Financial education hasn't evolved in decades while markets, technology, and opportunities have transformed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Join the Financial Revolution</h3>
              <p className="text-red-100 mb-6">
                Be part of a movement that's rewriting the rules of wealth creation
              </p>
              <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center gap-3 mx-auto">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-black text-red-400 mb-2">15+</div>
            <div className="text-gray-400">Years Wall Street Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-red-400 mb-2">$2B+</div>
            <div className="text-gray-400">Assets Previously Managed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-red-400 mb-2">50K+</div>
            <div className="text-gray-400">Lives Impacted</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-red-400 mb-2">2025</div>
            <div className="text-gray-400">Revolution Begins</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderStorySection;