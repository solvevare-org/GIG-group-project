import React from 'react';
import { Shield, Eye, TrendingUp, Users, Lock, Play, FileText, Calendar } from 'lucide-react';

const InvestorPortalSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-red-900/20 border border-red-800 text-red-300 px-6 py-3 rounded-full text-sm font-bold tracking-wider mb-8">
            <Shield className="w-4 h-4" />
            ACCREDITED INVESTORS ONLY
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            EXCLUSIVE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
              INVESTOR PORTAL
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join an elite network of forward-thinking investors. Access live projects, 
            exclusive insights, and behind-the-scenes content.
          </p>
        </div>

        {/* Portal Preview */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-black border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Portal Header */}
            <div className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-400 text-sm font-mono">
                  portal.gigstudios.com
                </div>
              </div>
            </div>

            {/* Portal Content */}
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Live Projects */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-red-500" />
                    <h3 className="text-lg font-bold text-white">Live Projects</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                      <span className="text-gray-300 text-sm">No Right Way</span>
                      <span className="text-green-400 text-xs font-bold">ACTIVE</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                      <span className="text-gray-300 text-sm">Project Alpha</span>
                      <span className="text-yellow-400 text-xs font-bold">COMING</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                      <span className="text-gray-300 text-sm">Series Beta</span>
                      <span className="text-blue-400 text-xs font-bold">PLANNING</span>
                    </div>
                  </div>
                </div>

                {/* Exclusive Content */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <Play className="w-6 h-6 text-red-500" />
                    <h3 className="text-lg font-bold text-white">Exclusive Content</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-900 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-gray-300 text-sm">Director's Cut Footage</span>
                      </div>
                      <p className="text-gray-500 text-xs">Behind-the-scenes exclusive</p>
                    </div>
                    <div className="p-3 bg-gray-900 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-gray-300 text-sm">Investor Insights</span>
                      </div>
                      <p className="text-gray-500 text-xs">Market analysis & trends</p>
                    </div>
                    <div className="p-3 bg-gray-900 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-gray-300 text-sm">Early Screenings</span>
                      </div>
                      <p className="text-gray-500 text-xs">Private premiere access</p>
                    </div>
                  </div>
                </div>

                {/* Network Access */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-red-500" />
                    <h3 className="text-lg font-bold text-white">Private Network</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-900 rounded-lg">
                      <div className="text-gray-300 text-sm mb-1">Active Members</div>
                      <div className="text-2xl font-bold text-white">2,847</div>
                    </div>
                    <div className="p-3 bg-gray-900 rounded-lg">
                      <div className="text-gray-300 text-sm mb-1">Total Investment</div>
                      <div className="text-2xl font-bold text-green-400">$12.4M</div>
                    </div>
                    <div className="p-3 bg-gray-900 rounded-lg">
                      <div className="text-gray-300 text-sm mb-1">Success Rate</div>
                      <div className="text-2xl font-bold text-red-400">94%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Portal Features */}
              <div className="mt-8 grid md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-lg">
                  <FileText className="w-5 h-5 text-red-500" />
                  <span className="text-gray-300 text-sm">Deal Flow</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-lg">
                  <Calendar className="w-5 h-5 text-red-500" />
                  <span className="text-gray-300 text-sm">Events</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-lg">
                  <Eye className="w-5 h-5 text-red-500" />
                  <span className="text-gray-300 text-sm">Analytics</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-lg">
                  <Lock className="w-5 h-5 text-red-500" />
                  <span className="text-gray-300 text-sm">Secure</span>
                </div>
              </div>
            </div>
          </div>

          {/* Access CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">
              <strong>IMPORTANT:</strong> Portal access requires SEC-compliant accredited investor verification. 
              All investments are subject to due diligence and may require additional documentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Request Portal Access
              </button>
              <button className="border-2 border-gray-600 hover:border-red-500 text-gray-300 hover:text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                Learn More
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4 max-w-2xl mx-auto">
              Portal integration powered by secure API with real-time project updates. 
              Technical implementation includes PHP session management and token-based authentication for enterprise-grade security.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorPortalSection;