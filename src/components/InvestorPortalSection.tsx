import React, { useState } from 'react';
import { Shield, Eye, TrendingUp, Users, Lock, Play, FileText, Calendar } from 'lucide-react';

const InvestorPortalSection: React.FC = () => {
  const [showSponsor, setShowSponsor] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handleSponsorSelect = (tier: string) => {
    setSelectedTier(tier);
    // You can add further logic here (e.g., redirect, open payment, etc.)
  };

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
                  From the Streets to the BoardRooms on WallStreet
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
              <button
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
                onClick={() => setShowSponsor(true)}
              >
                Request Portal Access
              </button>
      {/* Sponsor Modal/Section */}
      {showSponsor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-gray-900 border border-red-500 rounded-2xl p-8 max-w-md w-full mx-2 relative text-center">
            <button
              onClick={() => setShowSponsor(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-white mb-4">Choose Sponsorship Tier</h2>
            <div className="flex flex-col gap-6 items-center">
              <button
                className={`w-full py-4 rounded-xl font-bold text-lg border-2 ${selectedTier === '1000' ? 'border-gold bg-gold text-black' : 'border-gray-700 bg-gray-800 text-white'} hover:border-gold hover:bg-gold hover:text-black transition-all duration-200`}
                onClick={() => handleSponsorSelect('1000')}
              >
                $1,000 Sponsor
              </button>
              <button
                className={`w-full py-4 rounded-xl font-bold text-lg border-2 ${selectedTier === '5000' ? 'border-gold bg-gold text-black' : 'border-gray-700 bg-gray-800 text-white'} hover:border-gold hover:bg-gold hover:text-black transition-all duration-200`}
                onClick={() => handleSponsorSelect('5000')}
              >
                $5,000 Sponsor
              </button>
            </div>
            {selectedTier === '1000' && (
              <div className="mt-8 text-left">
                <h3 className="text-lg font-bold text-gold mb-2">Individual Sponsor – $1,000</h3>
                <div className="bg-gray-800 rounded-lg p-4 text-gray-200 text-sm mb-4">
                  <p>
                    “Hey movie lovers! This is ____ proudly supporting No Right Way, the new film starring Omari Hardwick—best known for Power and Army of the Dead—and directed by Anthony Hemingway. This gripping new drama promises raw performances, deep storytelling, and a visual style that pulls you in from the start. Whether you’re into powerful character journeys or cinematic craftsmanship, No Right Way is one to watch. Thanks to our sponsor, ____ [your brand], making bold stories come alive. Don’t miss it—support great cinema and keep watching for more!”
                  </p>
                </div>
                <form name="PrePage" method="post" action="https://Simplecheckout.authorize.net/payment/CatalogPayment.aspx">
                  <input type="hidden" name="LinkId" value="3957bd27-0fbd-415e-ab16-4ddd0792d23e" />
                  <input type="image" src="//content.authorize.net/images/buy-now-gold.gif" alt="Buy Now" />
                </form>
              </div>
            )}
            {selectedTier === '5000' && (
              <div className="mt-8 text-left">
                <h3 className="text-lg font-bold text-gold mb-2">Corporate Sponsor – $5,000</h3>
                <div className="bg-gray-800 rounded-lg p-4 text-gray-200 text-sm mb-4">
                  <p>
                    “Lights up, film fans! I’m thrilled to bring you something truly special: No Right Way, the much-anticipated new dramatic film from director Anthony Hemingway, starring powerhouse actor Omari Hardwick. You might recognize Omari from his unforgettable roles in Power and Zack Snyder’s Army of the Dead—here, he dives into an emotionally nuanced character, backed by Hemingway’s sharp cinematic vision.
                  </p>
                  <p>
                    This film blends raw intensity with thoughtful storytelling, exploring what it means to make tough choices when the stakes are highest. The kind of movie that grabs you, holds you, and stays with you after the credits roll.
                  </p>
                  <p>
                    We’re proud to share this moment, brought to you by ____ [sponsor], committed to championing compelling narratives and visionary filmmaking. Stay tuned—No Right Way is one film you won’t want to miss. Visit our website (        )to learn more and catch it when it hits theaters or streaming.”
                  </p>
                </div>
                <form name="PrePage" method="post" action="https://Simplecheckout.authorize.net/payment/CatalogPayment.aspx">
                  <input type="hidden" name="LinkId" value="8d1b882e-dc3e-4633-ab49-1252790f10ca" />
                  <input type="image" src="//content.authorize.net/images/buy-now-gold.gif" alt="Buy Now" />
                </form>
              </div>
            )}
          </div>
        </div>
      )}
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