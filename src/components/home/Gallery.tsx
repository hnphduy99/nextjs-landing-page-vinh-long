'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const galleryImages = [
  'https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=2400',
  'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?q=80&w=2400',
  'https://images.unsplash.com/photo-1559131397-f94da358f7ca?q=80&w=2400',
  'https://images.unsplash.com/photo-1596402184320-417d717867cd?q=80&w=2400',
  'https://images.unsplash.com/photo-1620138927052-1f8e12479e0a?q=80&w=2400',
  'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=2400',
  'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=2400',
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2400'
];

// Duplicate images for infinite scroll effect
const doubleImages = [...galleryImages, ...galleryImages];

export default function Gallery() {
  return (
    <section id='gallery' className='overflow-hidden bg-white py-24'>
      <div className='container-custom mb-16'>
        <div className='flex flex-col justify-between gap-8 md:flex-row md:items-end'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='max-w-2xl'
          >
            <span className='mb-4 inline-flex items-center gap-2 rounded-full bg-[#E07B39]/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-[#E07B39] uppercase'>
              <span className='h-2 w-2 animate-pulse rounded-full bg-[#E07B39]' />
              Thư viện tinh hoa
            </span>
            <h2 className='text-4xl leading-tight font-bold text-gray-900 md:text-6xl'>
              Vĩnh Long <br />
              <span className='bg-gradient-to-r from-[#E07B39] to-[#4CAF50] bg-clip-text text-transparent'>
                Qua Từng Khoảnh Khắc
              </span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='max-w-md border-l-4 border-[#4CAF50]/30 py-2 pl-6 text-lg text-gray-500 italic'
          >
            &quot;Mỗi bức ảnh là một lời mời gọi, đưa bạn chạm vào nhịp thở của vùng đất phương Nam hào sảng.&quot;
          </motion.p>
        </div>
      </div>

      {/* Infinite Horizontal Scroll - Row 1 */}
      <div className='relative flex overflow-hidden py-4'>
        <motion.div
          animate={{
            x: ['0%', '-50%']
          }}
          transition={{
            duration: 40,
            ease: 'linear',
            repeat: Infinity
          }}
          whileHover={{ animationPlayState: 'paused' }}
          className='flex cursor-pointer gap-6 pr-6'
        >
          {doubleImages.map((src, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotate: 1, y: -10 }}
              className='group relative h-[280px] w-[350px] flex-shrink-0 overflow-hidden rounded-[2.5rem] shadow-xl transition-all duration-700 hover:shadow-[0_20px_50px_rgba(224,123,57,0.3)] md:h-[400px] md:w-[500px]'
            >
              <Image
                src={src}
                alt={`Vinh Long Gallery ${index}`}
                fill
                className='object-cover transition-transform duration-1000 ease-out group-hover:scale-110'
              />
              {/* Overlay with glassmorphism effect on hover */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100' />
              <div className='absolute right-8 bottom-8 left-8 translate-y-full transition-transform duration-500 group-hover:translate-y-0'>
                <p className='mb-1 text-sm font-medium tracking-widest text-white uppercase'>Cảm hứng du lịch</p>
                <h4 className='text-xl font-bold text-white'>Vĩnh Long - Về là thương</h4>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - Reverse Scroll & Smaller Cards */}
      <div className='relative mt-10 flex overflow-hidden py-4'>
        <motion.div
          animate={{
            x: ['-50%', '0%']
          }}
          transition={{
            duration: 50,
            ease: 'linear',
            repeat: Infinity
          }}
          whileHover={{ animationPlayState: 'paused' }}
          className='flex cursor-pointer gap-6 pr-6'
        >
          {doubleImages.map((src, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotate: -1, y: -10 }}
              className='group relative h-[220px] w-[280px] flex-shrink-0 overflow-hidden rounded-[2.5rem] shadow-lg transition-all duration-700 hover:shadow-[0_20px_50px_rgba(76,175,80,0.2)] md:h-[320px] md:w-[420px]'
            >
              <Image
                src={src}
                alt={`Vinh Long Gallery Reverse ${index}`}
                fill
                className='object-cover transition-transform duration-1000 ease-out group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-30 transition-opacity duration-500 group-hover:opacity-100' />
              <div className='absolute right-6 bottom-6 left-6 translate-y-full transition-transform duration-500 group-hover:translate-y-0'>
                <h4 className='text-lg font-bold text-white'>Vẻ đẹp sông nước</h4>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
