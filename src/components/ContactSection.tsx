import React, { useState } from 'react';
import { Mail, Send, MessageCircle } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gold via-transparent to-gold"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the <span className="text-gold">Revolution</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Be part of a movement that's redefining financial success. Your journey starts here.
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <Mail className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-gray-400">
                Get exclusive updates, behind-the-scenes content, and early access to new releases
              </p>
            </div>

            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-gray-800 text-white px-6 py-4 rounded-full border border-gray-700 focus:border-gold focus:outline-none transition-colors duration-300 pr-16"
                required
              />
              <button
                type="submit"
                disabled={isSubmitted}
                className="absolute right-2 top-2 bg-gold hover:bg-yellow-600 text-black p-2 rounded-full transition-all duration-300 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            {isSubmitted && (
              <div className="text-center py-4 text-gold font-semibold">
                ✓ Welcome to the revolution! Check your email for confirmation.
              </div>
            )}

            <div className="text-center text-sm text-gray-500">
              By subscribing, you agree to receive updates about No Right Way.
              <br />
              You can unsubscribe at any time.
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-800">
            {/* Social icons removed as requested */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;