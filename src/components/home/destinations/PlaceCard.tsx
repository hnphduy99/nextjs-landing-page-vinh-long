'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

interface PlaceCardProps {
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  highlights: string[];
  index: number;
}

export default function PlaceCard({ name, description, category, imageUrl, highlights, index }: PlaceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className='group card-hover relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl'
    >
      {/* Image Container */}
      <div className='relative h-72 overflow-hidden'>
        <motion.div
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className='h-full w-full'
        >
          <Image
            src={imageUrl}
            alt={name}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </motion.div>

        {/* Category Badge - Glassmorphism */}
        <div className='absolute top-5 left-5 z-10'>
          <span className='inline-flex items-center rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-xs font-medium tracking-wider text-white uppercase shadow-lg backdrop-blur-md'>
            <MapPin size={12} className='mr-2' />
            {category}
          </span>
        </div>

        {/* Gradient Overlay for Text */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80' />

        <div className='absolute right-5 bottom-5 left-5 text-white'>
          <h3 className='mb-1 text-2xl font-bold drop-shadow-md'>{name}</h3>
        </div>
      </div>

      {/* Content */}
      <div className='space-y-4 p-7'>
        <p className='line-clamp-3 text-sm leading-relaxed text-gray-600 italic'>&quot;{description}&quot;</p>

        {/* Highlights */}
        <div className='flex flex-wrap gap-2 pt-2'>
          {highlights.map((highlight, idx) => (
            <span
              key={idx}
              className='rounded-lg border border-[#E07B39]/10 bg-[#FFF8F0] px-3 py-1 text-[10px] font-bold text-[#E07B39] sm:text-xs'
            >
              #{highlight}
            </span>
          ))}
        </div>

        {/* Footer info/Action */}
        <div className='flex items-center justify-between border-t border-gray-50 pt-4'>
          <motion.button whileHover={{ x: 5 }} className='group/btn flex items-center text-sm font-bold text-[#4CAF50]'>
            Tìm hiểu thêm
            <svg
              className='ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
