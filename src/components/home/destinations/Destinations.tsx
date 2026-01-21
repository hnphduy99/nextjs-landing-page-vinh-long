'use client';

import { motion } from 'framer-motion';
import PlaceCard from './PlaceCard';
interface DestinationItem {
  id: string;
  name: string;
  description: string;
  category: string | null;
  imageUrl: string;
  highlights: string[];
}

interface DestinationsProps {
  destinations: DestinationItem[];
}

export default function Destinations({ destinations }: DestinationsProps) {
  return (
    <section id='destinations' className='section-padding bg-[#FFF8F0]'>
      <div className='container-custom'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-16 text-center'
        >
          <h2 className='mb-4 text-4xl font-bold text-gray-900 md:text-5xl'>Điểm đến hấp dẫn</h2>
          <p className='mx-auto max-w-2xl text-xl text-gray-600'>
            Khám phá những địa danh nổi tiếng và giàu bản sắc văn hóa của Vĩnh Long
          </p>
        </motion.div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {destinations.map((destination, index) => (
            <PlaceCard
              key={destination.id}
              name={destination.name}
              description={destination.description}
              category={destination.category || ''}
              imageUrl={destination.imageUrl}
              highlights={destination.highlights}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
