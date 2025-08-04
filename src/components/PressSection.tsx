import React from 'react';
import { ExternalLink, Quote, Star, Award, TrendingUp } from 'lucide-react';

const PressSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-red-900/20 border border-red-800 text-red-300 px-6 py-2 rounded-full text-sm font-bold tracking-wider mb-6">
            INDUSTRY RECOGNITION & PRESS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Making <span className="text-red-500">Headlines</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our revolutionary approach to financial education is gaining attention from industry leaders and major media outlets
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 relative overflow-hidden">
            {/* Deadline Logo Area */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Deadline Hollywood</h3>
                  <p className="text-red-400 text-sm font-semibold">EXCLUSIVE INDUSTRY COVERAGE</p>
                  <p className="text-gray-500 text-xs">August 2024 • Entertainment Industry Leader</p>
                </div>
              </div>
              <a
                href="https://deadline.com/2024/08/omari-hardwick-anthony-hemingway-teaming-no-right-way-1236047979/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300"
              >
                Read Full Article
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Quote */}
            <div className="relative">
              <Quote className="w-8 h-8 text-red-500 opacity-50 mb-4" />
              <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-6 italic font-light">
                "Omari Hardwick and Anthony Hemingway are teaming up for 'No Right Way,' 
                a groundbreaking financial education film that challenges conventional wisdom 
                about wealth building and investment strategies."
              </blockquote>
              <div className="flex items-center justify-between">
                <cite className="text-gray-400 not-italic font-semibold">
                  — Deadline Hollywood, August 2024
                </cite>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-red-500" />
                  ))}
                </div>
              </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-600/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
          </div>

          {/* Additional Press Mentions */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 text-center hover:border-red-500/50 transition-all duration-300">
              <TrendingUp className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <h4 className="text-white font-bold mb-2">Industry Impact</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                "Revolutionary approach to financial education"
              </p>
              <div className="flex justify-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current text-red-500" />
                ))}
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 text-center hover:border-red-500/50 transition-all duration-300">
              <Award className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <h4 className="text-white font-bold mb-2">Critical Acclaim</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                "Challenging Wall Street orthodoxy"
              </p>
              <div className="flex justify-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current text-red-500" />
                ))}
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 text-center hover:border-red-500/50 transition-all duration-300">
              <Star className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <h4 className="text-white font-bold mb-2">Future of Finance</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                "The future of financial cinema"
              </p>
              <div className="flex justify-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current text-red-500" />
                ))}
              </div>
            </div>
          </div>

          {/* Press Kit CTA */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-6 border border-gray-700 max-w-2xl mx-auto">
              <h4 className="text-lg font-bold text-white mb-2">Media & Press Inquiries</h4>
              <p className="text-gray-400 text-sm mb-4">
                Download our AHP press kit or contact our media relations team
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.anthonyhemingway.website/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition-colors inline-flex items-center justify-center"
                >
                  Download AHP Press Kit
                </a>
                <button className="border border-gray-600 hover:border-red-500 text-gray-300 hover:text-white px-6 py-2 rounded-full font-semibold transition-colors">
                  Media Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PressSection;