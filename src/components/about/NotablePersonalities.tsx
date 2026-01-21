'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { notablePersonalities } from '@/constants/about-data';
import { Award } from 'lucide-react';

export default function NotablePersonalities() {
  return (
    <section className='section-padding bg-white'>
      <div className='container-custom'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-16 text-center'
        >
          <h2 className='mb-4 text-4xl font-bold text-gray-900 md:text-5xl'>Danh Nhân Vĩnh Long</h2>
          <p className='mx-auto max-w-2xl text-xl text-gray-600'>
            Những con người tài năng, cống hiến hết mình cho đất nước
          </p>
        </motion.div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {notablePersonalities.map((person, index) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className='group'
            >
              <div className='card-hover h-full overflow-hidden rounded-2xl bg-white shadow-lg'>
                {/* Image */}
                <div className='relative h-80 overflow-hidden'>
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }} className='h-full w-full'>
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 100vw, 33vw'
                    />
                  </motion.div>

                  {/* Gradient Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />

                  {/* Period Badge */}
                  <div className='absolute top-4 right-4'>
                    <span className='rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#E07B39] backdrop-blur-sm'>
                      {person.period}
                    </span>
                  </div>

                  {/* Name on Image */}
                  <div className='absolute right-4 bottom-4 left-4'>
                    <h3 className='mb-1 text-2xl font-bold text-white'>{person.name}</h3>
                    <p className='text-sm text-white/90'>{person.title}</p>
                  </div>
                </div>

                {/* Content */}
                <div className='p-6'>
                  {/* Achievement Badge */}
                  <div className='mb-4 flex items-start rounded-lg bg-gradient-to-r from-[#FFF8F0] to-white p-3'>
                    <Award size={20} className='mt-1 mr-2 flex-shrink-0 text-[#E07B39]' />
                    <p className='text-sm font-semibold text-gray-700'>{person.achievement}</p>
                  </div>

                  {/* Description */}
                  <p className='leading-relaxed text-gray-600'>{person.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='mt-16 text-center'
        >
          <div className='inline-block rounded-2xl bg-gradient-to-r from-[#E07B39] to-[#4CAF50] p-8 shadow-xl'>
            <p className='max-w-3xl text-lg font-semibold text-white md:text-xl'>
              Và còn rất nhiều con người Vĩnh Long khác đã và đang cống hiến cho sự nghiệp xây dựng và bảo vệ Tổ quốc
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
