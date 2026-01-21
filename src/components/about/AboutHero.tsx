'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { aboutOverview } from '@/constants/about-data';

export default function AboutHero() {
  return (
    <section className='relative h-[70vh] min-h-[500px] w-full overflow-hidden'>
      {/* Background Image */}
      <div className='absolute inset-0'>
        <Image
          src='https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2400'
          alt='Vĩnh Long'
          fill
          className='object-cover'
          priority
          quality={90}
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70' />
      </div>

      {/* Content */}
      <div className='relative flex h-full items-center justify-center'>
        <div className='container-custom text-center text-white'>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.p
              className='mb-4 text-lg font-semibold text-[#E07B39] md:text-xl'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Khám phá
            </motion.p>

            <motion.h1
              className='mb-6 text-4xl font-bold md:text-6xl lg:text-7xl'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {aboutOverview.title}
            </motion.h1>

            <motion.h2
              className='mx-auto mb-8 max-w-4xl text-xl text-white/90 md:text-2xl lg:text-3xl'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {aboutOverview.subtitle}
            </motion.h2>

            <motion.p
              className='mx-auto max-w-3xl text-lg leading-relaxed md:text-xl'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {aboutOverview.description}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className='absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-[#FFF8F0] to-transparent'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />
    </section>
  );
}
