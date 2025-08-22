import React from 'react';
import img1 from '../../picture/IMG-20250821-WA0009.jpg';
import img2 from '../../picture/IMG-20250821-WA0010.jpg';
import img3 from '../../picture/IMG-20250821-WA0011.jpg';

type Item = {
  image: string;
  heading: string;
  subheading?: string;
  position?: 'center' | 'bottom-left';
};

interface Props {
  items?: Item[];
}

const CinematicSections: React.FC<Props> = ({ items }) => {
  const defaultItems: Item[] = [
    { image: img1, heading: 'The Faces of the Movement', subheading: 'Real rebels. Real change. Real stories.', position: 'center' },
    { image: img2, heading: 'The Rebellion in Action', subheading: 'On the ground, in the markets, in communities.', position: 'bottom-left' },
    { image: img3, heading: 'From Wall Street to Revolution', subheading: 'A new playbook for wealth and power.', position: 'center' }
  ];

  const list = items && items.length ? items : defaultItems;

  return (
    <div>
      {list.map((it, idx) => (
        <section key={idx} className="w-full">
          <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
            <img src={it.image} alt={it.heading} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40"></div>

            {it.position === 'center' ? (
              <div className="relative z-10 flex items-center justify-center w-full h-full px-4">
                <div className="text-center max-w-4xl">
                  <h2 className="text-3xl md:text-6xl font-bold text-white leading-tight">{it.heading}</h2>
                  {it.subheading && <p className="text-gray-300 mt-3">{it.subheading}</p>}
                </div>
              </div>
            ) : (
              <div className="relative z-10 flex items-end justify-start w-full h-full p-6 md:p-12">
                <div className="max-w-3xl">
                  <h2 className="text-3xl md:text-6xl font-bold text-white leading-tight">{it.heading}</h2>
                  {it.subheading && <p className="text-gray-300 mt-2">{it.subheading}</p>}
                </div>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default CinematicSections;
