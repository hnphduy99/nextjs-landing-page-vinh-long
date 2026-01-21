'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
interface SpecialtyItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  origin: string | null;
}

interface SpecialtiesProps {
  specialties: SpecialtyItem[];
}

export default function Specialties({ specialties }: SpecialtiesProps) {
  return (
    <section id='specialties' className='section-padding bg-white'>
      <div className='container-custom'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-16 text-center'
        >
          <h2 className='mb-4 text-4xl font-bold text-gray-900 md:text-5xl'>Đặc sản Vĩnh Long</h2>
          <p className='mx-auto max-w-2xl text-xl text-gray-600'>Hương vị đặc trưng của vùng đất sông nước</p>
        </motion.div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {specialties.map((specialty, index) => (
            <motion.div
              key={specialty.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className='group card-hover overflow-hidden rounded-2xl bg-white shadow-lg'
            >
              {/* Image */}
              <div className='relative h-72 overflow-hidden'>
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }} className='h-full w-full'>
                  <Image
                    src={specialty.imageUrl}
                    alt={specialty.name}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, 33vw'
                  />
                </motion.div>
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent' />

                {/* Origin Badge */}
                <div className='absolute right-4 bottom-4 left-4'>
                  <span className='inline-block rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#4CAF50] backdrop-blur-sm'>
                    {specialty.origin}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className='p-6'>
                <h3 className='mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-[#E07B39]'>
                  {specialty.name}
                </h3>
                <p className='leading-relaxed text-gray-600'>{specialty.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
