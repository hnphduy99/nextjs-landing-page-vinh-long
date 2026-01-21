'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { historicalMilestones } from '@/constants/about-data';

export default function HistoricalTimeline() {
  return (
    <section className='section-padding bg-gradient-to-br from-[#FFF8F0] to-white'>
      <div className='container-custom'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-16 text-center'
        >
          <h2 className='mb-4 text-4xl font-bold text-gray-900 md:text-5xl'>Hành Trình Lịch Sử</h2>
          <p className='mx-auto max-w-2xl text-xl text-gray-600'>Từ vùng đất khai hoang đến Vĩnh Long hiện đại</p>
        </motion.div>

        <div className='relative'>
          {/* Timeline Line */}
          <div className='absolute top-0 bottom-0 left-1/2 hidden w-1 -translate-x-1/2 transform bg-gradient-to-b from-[#E07B39] via-[#4CAF50] to-[#E07B39] lg:block' />

          <div className='space-y-12'>
            {historicalMilestones.map((milestone, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`relative grid items-center gap-8 lg:grid-cols-2 ${isEven ? '' : 'lg:flex-row-reverse'}`}
                >
                  {/* Content Side */}
                  <div className={`${isEven ? 'lg:pr-12 lg:text-right' : 'lg:col-start-2 lg:pl-12'}`}>
                    <motion.div whileHover={{ scale: 1.02 }} className='card-hover rounded-2xl bg-white p-8 shadow-xl'>
                      <div
                        className={`mb-4 inline-block rounded-full bg-gradient-to-r from-[#E07B39] to-[#4CAF50] px-6 py-2`}
                      >
                        <span className='text-lg font-bold text-white'>{milestone.year}</span>
                      </div>

                      <h3 className='mb-4 text-2xl font-bold text-gray-900 md:text-3xl'>{milestone.title}</h3>

                      <p className='text-lg leading-relaxed text-gray-600'>{milestone.description}</p>
                    </motion.div>
                  </div>

                  {/* Image Side */}
                  <div className={`${isEven ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1'}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className='relative h-80 overflow-hidden rounded-2xl shadow-2xl'
                    >
                      <Image
                        src={milestone.image}
                        alt={milestone.title}
                        fill
                        className='object-cover'
                        sizes='(max-width: 768px) 100vw, 50vw'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div className='absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform lg:block'>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className='h-6 w-6 rounded-full border-4 border-white bg-gradient-to-br from-[#E07B39] to-[#4CAF50] shadow-lg'
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
