'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart, BookOpen, Music, Sprout } from 'lucide-react';
import { culturalFeatures } from '@/constants/about-data';

const iconMap = {
  heart: Heart,
  'book-open': BookOpen,
  music: Music,
  sprout: Sprout
};

export default function CulturalFeatures() {
  return (
    <section className='section-padding bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFF8F0]'>
      <div className='container-custom'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-16 text-center'
        >
          <h2 className='mb-4 text-4xl font-bold text-gray-900 md:text-5xl'>Đặc Điểm Nổi Bật</h2>
          <p className='mx-auto max-w-2xl text-xl text-gray-600'>Những nét văn hóa đặc trưng của vùng đất Vĩnh Long</p>
        </motion.div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          {culturalFeatures.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className='group'
              >
                <div className='card-hover relative h-full overflow-hidden rounded-2xl bg-white shadow-xl'>
                  {/* Image Background */}
                  <div className='relative h-64 overflow-hidden'>
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className='object-cover transition-transform duration-500 group-hover:scale-110'
                      sizes='(max-width: 768px) 100vw, 50vw'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent' />

                    {/* Icon */}
                    <div className='absolute top-6 left-6'>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className='flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 shadow-lg backdrop-blur-sm'
                      >
                        <Icon size={32} className='text-[#E07B39]' />
                      </motion.div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className='p-8'>
                    <h3 className='mb-4 text-2xl font-bold text-gray-900 transition-colors group-hover:text-[#E07B39]'>
                      {feature.title}
                    </h3>
                    <p className='text-lg leading-relaxed text-gray-600'>{feature.description}</p>
                  </div>

                  {/* Decorative Element */}
                  <div className='absolute -right-2 -bottom-2 h-32 w-32 rounded-full bg-gradient-to-br from-[#E07B39]/10 to-[#4CAF50]/10 blur-2xl transition-transform duration-500 group-hover:scale-150' />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
