import React from 'react';
import { Star, Quote, ExternalLink } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Entrepreneur',
      content: '"No Right Way completely changed how I think about building wealth. Finally, someone who gets that there\'s no one-size-fits-all approach to financial success."',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Investor',
      content: '"This film and community gave me the confidence to pursue unconventional investment strategies. The results speak for themselves."',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Business Owner',
      content: '"The rebellious approach to financial education is exactly what I needed. No more cookie-cutter advice - just real, actionable insights."',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What <span className="text-gold">Rebels</span> Say
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join thousands who've embraced their own path to financial freedom
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-gold transition-all duration-300 relative"
            >
              <Quote className="w-8 h-8 text-gold mb-4 opacity-50" />
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {testimonial.content}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
                
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-gold" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4">
              Featured in Press
            </h3>
            <p className="text-gray-400 mb-6">
              Read the exclusive coverage on our revolutionary approach to financial education
            </p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-gold hover:text-yellow-500 font-semibold transition-colors duration-300"
            >
              Read Deadline Article
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;