import React from 'react';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import hoodieImg from '../assets/urban-progressive hoodie.jpg';
import toteImg from '../assets/urban-progressive.jpg';
import capImg from '../assets/urban-progressive cap.jpg';
const MerchandiseSection: React.FC = () => {
  const featuredItems = [
    {
      name: 'WALL STREET BONDS URBAN RENAISSANCE - Stanley/Stella Cruiser Organic Hoodie',
      price: '$45.99',
      image: hoodieImg
    },
    {
      name: 'WALL STREET BONDS URBAN RENAISSANCE - Eco-Friendly Cotton Tote',
      price: '$20.49',
      image: toteImg
    },
    {
      name: 'WALL STREET BONDS URBAN RENAISSANCE - Organic Baseball Cap',
      price: '$21.99',
      image: capImg
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Wear the <span className="text-gold">Movement</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Express your financial rebellion with our exclusive merchandise collection
          </p>
          <a 
            href="https://theurbanren.myspreadshop.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gold hover:bg-yellow-600 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingBag className="w-5 h-5" />
            Shop the Movement
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {featuredItems.map((item, index) => (
            <div 
              key={index}
              className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gold transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="relative bg-white rounded-t-xl p-4 flex items-center justify-center h-64">
                <img 
                  src={item.image}
                  alt={item.name}
                  className="max-h-56 w-auto object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-2xl font-bold text-gold">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Powered by Spreadshop • Worldwide shipping available
          </p>
        </div>
      </div>
    </section>
  );
};

export default MerchandiseSection;