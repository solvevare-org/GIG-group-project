import React from 'react';
import { Users, Video, Gift, Calendar, Award, Headphones } from 'lucide-react';

const PerksSection: React.FC = () => {
  const perks = [
    {
      icon: Video,
      title: 'Exclusive Content',
      description: 'Early access to premium financial education videos and documentaries'
    },
    {
      icon: Users,
      title: 'Community Access',
      description: 'Join a rebellious community of independent wealth builders'
    },
    {
      icon: Gift,
      title: 'Merch Discounts',
      description: 'Up to 30% off on exclusive No Right Way merchandise'
    },
    {
      icon: Calendar,
      title: 'VIP Events',
      description: 'Exclusive invites to film premieres and financial workshops'
    },
    {
      icon: Award,
      title: 'Behind the Scenes',
      description: 'Exclusive access to film production and brand development'
    },
    {
      icon: Headphones,
      title: 'Private Podcasts',
      description: 'Members-only financial strategy discussions and interviews'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What You <span className="text-gold">Get</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join the movement and unlock exclusive perks designed for financial rebels
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {perks.map((perk, index) => {
            const IconComponent = perk.icon;
            return (
              <div 
                key={index}
                className="group bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-gold transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{perk.title}</h3>
                <p className="text-gray-400 leading-relaxed">{perk.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gold to-yellow-600 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-black mb-4">Ready to Rebel?</h3>
            <p className="text-black text-lg mb-6 opacity-90">
              Join thousands who've already chosen their own path to financial freedom
            </p>
            <button className="bg-black text-gold px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all duration-300">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerksSection;