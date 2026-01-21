'use client';

import MapSection from '@/components/destinations/MapSection';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { destinationsHero, detailedDestinations } from '@/constants/destinations-data';
import { motion } from 'framer-motion';
import { Camera, CheckCircle, Lightbulb } from 'lucide-react';
import Image from 'next/image';

export default function DestinationsPage() {
  return (
    <div className='min-h-screen bg-[#FFF8F0]'>
      <Navbar />

      {/* Hero Section */}
      <section className='relative overflow-hidden bg-linear-to-br from-[#E07B39]/10 via-[#4CAF50]/10 to-[#FFF8F0] pt-32 pb-20'>
        <div className='container-custom relative z-10'>
          <div className='mx-auto max-w-4xl text-center'>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='mb-6 text-4xl font-bold text-gray-900 md:text-6xl'
            >
              {destinationsHero.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className='mb-6 text-xl font-medium text-[#E07B39]'
            >
              {destinationsHero.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='text-lg leading-relaxed text-gray-600'
            >
              {destinationsHero.description}
            </motion.p>
          </div>
        </div>

        {/* Background blobs */}
        <div className='absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E07B39]/5 blur-3xl' />
        <div className='absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#4CAF50]/5 blur-3xl' />
      </section>

      {/* Destinations List */}
      <section className='py-20'>
        <div className='container-custom'>
          <div className='flex flex-col gap-32'>
            {detailedDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className={`grid items-center gap-12 lg:grid-cols-2 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Visual Side */}
                <div className={`space-y-6 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <div className='group relative h-[400px] overflow-hidden rounded-3xl shadow-2xl md:h-[500px]'>
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className='object-cover transition-transform duration-1000 group-hover:scale-110'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
                    <div className='absolute bottom-6 left-6 text-white'>
                      <div className='mb-2 flex items-center gap-2'>
                        <Camera size={20} className='text-[#E07B39]' />
                        <span className='text-xs font-bold tracking-widest uppercase'>Tuyệt phẩm quang cảnh</span>
                      </div>
                      <h3 className='text-3xl font-bold'>{destination.name}</h3>
                    </div>
                  </div>

                  {/* Small Gallery / Thumbnail Grid */}
                  <div className='grid grid-cols-3 gap-4'>
                    {destination.gallery.slice(1).map((img, idx) => (
                      <div key={idx} className='relative h-24 overflow-hidden rounded-2xl shadow-md'>
                        <Image src={img} alt={`${destination.name} gallery ${idx}`} fill className='object-cover' />
                      </div>
                    ))}
                    <div className='relative flex h-24 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-[#E07B39] bg-white text-xs font-bold text-[#E07B39] transition-colors hover:bg-[#E07B39]/5'>
                      + 10 Ảnh
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`space-y-8 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <div>
                    <span className='mb-4 inline-block rounded-full bg-[#E07B39]/10 px-4 py-1.5 text-sm font-bold text-[#E07B39]'>
                      Khám phá Vĩnh Long
                    </span>
                    <h3 className='mb-4 text-4xl font-bold text-gray-900'>{destination.name}</h3>
                    <p className='mb-6 text-xl font-medium text-[#4CAF50] italic'>&quot;{destination.slogan}&quot;</p>
                    <p className='text-lg leading-relaxed text-gray-600'>{destination.longDescription}</p>
                  </div>

                  {/* Experiences List */}
                  <div className='space-y-4'>
                    <h4 className='flex items-center gap-2 text-lg font-bold text-gray-900'>
                      <CheckCircle size={20} className='text-[#4CAF50]' /> Trải nghiệm không thể bỏ qua
                    </h4>
                    <ul className='grid gap-3 sm:grid-cols-2'>
                      {destination.experiences.map((exp, idx) => (
                        <li
                          key={idx}
                          className='flex items-start gap-3 rounded-xl border border-gray-50 bg-white p-3 text-gray-600 shadow-sm'
                        >
                          <span className='mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#E07B39]' />
                          <span className='text-sm'>{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tips Box */}
                  <div className='rounded-2xl border-l-4 border-[#E07B39] bg-gradient-to-r from-[#FFF8F0] to-white p-6 shadow-sm'>
                    <div className='mb-2 flex items-center gap-3 font-bold text-[#E07B39]'>
                      <Lightbulb size={20} /> Mẹo cho chuyến đi
                    </div>
                    <p className='text-sm text-gray-700 italic'>{destination.tips}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapSection />

      {/* Call to Action */}
      <section className='section-padding'>
        <div className='container-custom'>
          <div className='relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#E07B39] to-[#4CAF50] p-12 text-center text-white shadow-2xl md:p-20'>
            <div className='relative z-10'>
              <h2 className='mb-8 text-3xl font-bold md:text-5xl'>
                Bạn đã sẵn sàng bước vào hành trình?
                <br />
                Về Vĩnh Long - Về là thương.
              </h2>
              <button className='rounded-full bg-white px-10 py-4 text-lg font-bold text-[#E07B39] transition-all hover:scale-105 hover:shadow-xl'>
                Lên kế hoạch ngay
              </button>
            </div>
            {/* Decorative background circle */}
            <div className='absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10' />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
