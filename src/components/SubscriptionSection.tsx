import React from 'react';
import { Check, Star, Crown, Zap, Shield, Eye, Users } from 'lucide-react';

const SubscriptionSection: React.FC = () => {
  const plans = [
    {
      name: 'Insider',
      price: '$29',
      period: 'month',
      icon: Star,
      tagline: 'For the Curious',
      features: [
        'Monthly financial education content',
        'Community forum access',
        'Basic market insights',
        'Email newsletter',
        'Standard support'
      ],
      cta: 'Join Insiders',
      popular: false,
      gradient: 'from-gray-700 to-gray-800'
    },
    {
      name: 'Rebel',
      price: '$99',
      period: 'month',
      icon: Zap,
      tagline: 'For the Disruptors',
      features: [
        'Everything in Insider',
        'Weekly exclusive video content',
        'Behind-the-scenes film access',
        'Live Q&A sessions with experts',
        'Early screening invitations',
        'Merchandise discounts (20%)',
        'Priority community support'
      ],
      cta: 'Become a Rebel',
      popular: true,
      gradient: 'from-red-600 to-red-700'
    },
    {
      name: 'Accredited',
      price: '$299',
      period: 'month',
      icon: Crown,
      tagline: 'For the Elite',
      features: [
        'Everything in Rebel',
        'Private investor portal access',
        'Direct deal flow opportunities',
        'One-on-one strategy consultations',
        'Exclusive premiere events',
        'Digital ownership incentives',
        'VIP merchandise collection',
        'Personal account manager'
      ],
      cta: 'Request Access',
      popular: false,
      gradient: 'from-yellow-600 to-yellow-700',
      restricted: true
    }
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            CHOOSE YOUR
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
              REBELLION
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Every financial revolution starts with a choice. Pick your level of commitment 
            to breaking the system and building wealth your way.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div 
                key={index}
                className={`relative rounded-3xl p-8 transition-all duration-500 hover:scale-105 border-2 ${
                  plan.popular 
                    ? 'bg-gradient-to-b from-red-600 to-red-700 text-white shadow-2xl border-red-400 transform scale-105' 
                    : plan.restricted
                    ? 'bg-gradient-to-b from-yellow-900/20 to-black text-white border-yellow-600/50 hover:border-yellow-500'
                    : 'bg-gradient-to-b from-gray-900 to-black text-white border-gray-700 hover:border-red-500/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <span className="bg-white text-red-600 px-6 py-2 rounded-full text-sm font-black tracking-wider shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {plan.restricted && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-600 text-black px-6 py-2 rounded-full text-sm font-black tracking-wider shadow-lg flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      VERIFICATION REQUIRED
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                    plan.popular ? 'bg-white/20' : plan.restricted ? 'bg-yellow-600/20' : 'bg-red-600/20'
                  }`}>
                    <IconComponent className={`w-10 h-10 ${
                      plan.popular ? 'text-white' : plan.restricted ? 'text-yellow-400' : 'text-red-400'
                    }`} />
                  </div>
                  
                  <h3 className="text-3xl font-black mb-2">{plan.name}</h3>
                  <p className={`text-sm mb-6 ${
                    plan.popular ? 'text-red-100' : plan.restricted ? 'text-yellow-300' : 'text-gray-400'
                  }`}>
                    {plan.tagline}
                  </p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-black">{plan.price}</span>
                    <span className="text-lg opacity-75">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        plan.popular ? 'text-white' : plan.restricted ? 'text-yellow-400' : 'text-red-400'
                      }`} />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.name === 'Insider' ? (
                  <form
                    method="post"
                    action="https://Simplecheckout.authorize.net/payment/CatalogPayment.aspx"
                  >
                    <input type="hidden" name="LinkId" value="90ea3400-9cbf-45b0-81e4-038d0f9c048b" />
                    <button
                      type="submit"
                      className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                        plan.popular
                          ? 'bg-white text-red-600 hover:bg-gray-100'
                          : plan.restricted
                          ? 'bg-yellow-600 text-black hover:bg-yellow-500'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </form>
                ) : plan.name === 'Rebel' ? (
                  <form
                    method="post"
                    action="https://Simplecheckout.authorize.net/payment/CatalogPayment.aspx"
                  >
                    <input type="hidden" name="LinkId" value="6ce195d5-06a2-44ac-a180-c05b5176f946" />
                    <button
                      type="submit"
                      className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                        plan.popular
                          ? 'bg-white text-red-600 hover:bg-gray-100'
                          : plan.restricted
                          ? 'bg-yellow-600 text-black hover:bg-yellow-500'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </form>
                ) : plan.name === 'Accredited' ? (
                  <form
                    method="post"
                    action="https://Simplecheckout.authorize.net/payment/CatalogPayment.aspx"
                  >
                    <input type="hidden" name="LinkId" value="fc8b78a3-0ef1-4c9a-a089-f48d0812a2fd" />
                    <button
                      type="submit"
                      className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                        plan.popular
                          ? 'bg-white text-red-600 hover:bg-gray-100'
                          : plan.restricted
                          ? 'bg-yellow-600 text-black hover:bg-yellow-500'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </form>
                ) : (
                  <button className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-white text-red-600 hover:bg-gray-100' 
                      : plan.restricted
                      ? 'bg-yellow-600 text-black hover:bg-yellow-500'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}>
                    {plan.cta}
                  </button>
                )}

                {plan.restricted && (
                  <p className="text-center text-xs text-yellow-300 mt-4 opacity-75">
                    Subject to accreditation verification
                  </p>
                )}

                {/* Content Delivery Details */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h4 className="text-sm font-bold text-white mb-3">Content Delivery & Access:</h4>
                  <div className="space-y-2 text-xs text-gray-400">
                    {plan.name === 'Insider' && (
                      <>
                        <p><strong>Email:</strong> Weekly newsletter with market insights & film updates</p>
                        <p><strong>Community:</strong> Private Discord server access with 1,000+ members</p>
                        <p><strong>Education:</strong> Monthly live webinars with financial experts</p>
                        <p><strong>Platform:</strong> Basic member dashboard with progress tracking</p>
                      </>
                    )}
                    {plan.name === 'Rebel' && (
                      <>
                        <p><strong>Dashboard:</strong> Premium member portal with exclusive video library</p>
                        <p><strong>Content:</strong> Weekly behind-the-scenes footage & director commentary</p>
                        <p><strong>Live Events:</strong> Bi-weekly Q&A sessions with cast & financial experts</p>
                        <p><strong>Screenings:</strong> Early access invites to private film screenings</p>
                        <p><strong>Mobile App:</strong> iOS/Android app for on-the-go content consumption</p>
                      </>
                    )}
                    {plan.name === 'Accredited' && (
                      <>
                        <p><strong>Portal:</strong> Secure investor dashboard with real-time project updates</p>
                        <p><strong>Deal Flow:</strong> Direct access to vetted investment opportunities</p>
                        <p><strong>Consultation:</strong> Monthly 1-on-1 strategy calls with portfolio managers</p>
                        <p><strong>Events:</strong> VIP premiere invitations & exclusive industry networking</p>
                        <p><strong>Reports:</strong> Quarterly performance reports & market analysis</p>
                        <p><strong>Concierge:</strong> Dedicated account manager for personalized service</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Benefits */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-12 border border-gray-800 max-w-5xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-8">
              All Plans Include
            </h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <Eye className="w-8 h-8 text-red-400 mx-auto mb-3" />
                <p className="text-gray-300 text-sm">Exclusive Content</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-red-400 mx-auto mb-3" />
                <p className="text-gray-300 text-sm">Community Access</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-red-400 mx-auto mb-3" />
                <p className="text-gray-300 text-sm">Secure Platform</p>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 text-red-400 mx-auto mb-3" />
                <p className="text-gray-300 text-sm">Instant Access</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;