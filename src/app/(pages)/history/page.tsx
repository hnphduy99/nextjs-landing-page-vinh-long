'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { culturalFestivals, historyHero, historyTimeline, peopleValues } from '@/constants/history-festivals-data';
import { motion } from 'framer-motion';
import { Calendar, Heart, History, MapPin, Smile, Users } from 'lucide-react';
import Image from 'next/image';

export default function HistoryPage() {
  const iconMap = {
    Heart: Heart,
    Smile: Smile,
    Users: Users
  };

  return (
    <div className='min-h-screen bg-[#FFF8F0]'>
      <Navbar />

      {/* Hero Section */}
      <section className='relative overflow-hidden bg-slate-900 pt-32 pb-20 text-white'>
        <div className='absolute inset-0 z-0'>
          <Image
            src='https://images.unsplash.com/photo-1596402184320-417d717867cd?q=80&w=2400'
            alt='Vĩnh Long History'
            fill
            className='object-cover opacity-40'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent' />
        </div>

        <div className='container-custom relative z-10'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className='mx-auto max-w-4xl text-center'
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-semibold tracking-wider uppercase backdrop-blur-sm'
            >
              Lịch sử & Con người
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='mb-8 font-serif text-4xl font-bold md:text-7xl'
            >
              {historyHero.subtitle}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className='text-xl leading-relaxed font-light text-white/90 italic md:text-2xl'
            >
              &quot;{historyHero.description}&quot;
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className='overflow-hidden py-24'>
        <div className='container-custom'>
          <div className='mb-20 text-center'>
            <h2 className='mb-4 flex items-center justify-center gap-3 text-3xl font-bold text-gray-900 md:text-5xl'>
              <History className='text-[#E07B39]' /> Dòng Thời Gian Lịch Sử
            </h2>
            <div className='mx-auto h-1 w-24 rounded-full bg-[#E07B39]' />
          </div>

          <div className='relative'>
            {/* Center Line for Desktop */}
            <div className='absolute top-0 bottom-0 left-1/2 hidden w-0.5 -translate-x-1/2 bg-gray-200 lg:block' />

            {historyTimeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative mb-24 flex flex-col items-center last:mb-0 lg:flex-row ${
                  index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Dot */}
                <div className='absolute top-10 left-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[#FFF8F0] bg-[#E07B39] shadow-lg shadow-[#E07B39]/30 lg:block' />

                {/* Content */}
                <div className='w-full px-6 lg:w-1/2 lg:px-12'>
                  <div
                    className={`flex flex-col ${index % 2 === 0 ? 'lg:items-start' : 'lg:items-end'} text-center ${
                      index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'
                    }`}
                  >
                    <span className='mb-2 font-serif text-4xl font-black tracking-tighter text-[#E07B39]/20'>
                      {item.year}
                    </span>
                    <h3 className='mb-4 text-2xl font-bold text-gray-900'>{item.title}</h3>
                    <p className='text-lg leading-relaxed text-gray-600'>{item.description}</p>
                  </div>
                </div>

                {/* Image */}
                <div className='mt-8 w-full px-6 lg:mt-0 lg:w-1/2 lg:px-12'>
                  <div className='relative h-64 overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl md:h-80'>
                    <Image src={item.image} alt={item.title} fill className='object-cover' />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* People Section */}
      <section className='relative overflow-hidden bg-white py-24'>
        <div className='absolute top-0 right-0 h-full w-1/3 translate-x-1/3 -skew-x-12 bg-[#E07B39]/5' />
        <div className='container-custom relative z-10 text-center'>
          <div className='mb-16'>
            <h2 className='mb-6 font-serif text-3xl font-bold text-gray-900 md:text-5xl'>
              Tâm Hồn <span className='text-[#E07B39]'>Người Vĩnh Long</span>
            </h2>
            <p className='mx-auto max-w-2xl text-xl text-gray-600'>
              Nét đẹp văn hóa được kết tinh từ lòng hào sảng của đất, sự hiền hòa của nước.
            </p>
          </div>

          <div className='grid gap-10 md:grid-cols-3'>
            {peopleValues.map((value, index) => {
              const Icon = iconMap[value.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className='group rounded-[2.5rem] border border-[#E07B39]/10 bg-[#FFF8F0] p-10 shadow-xl transition-all duration-300 hover:shadow-2xl'
                >
                  <div className='mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-[#E07B39] shadow-lg transition-colors duration-500 group-hover:bg-[#E07B39] group-hover:text-white'>
                    <Icon size={40} />
                  </div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900'>{value.title}</h3>
                  <p className='leading-relaxed text-gray-600'>{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Festivals Section */}
      <section className='bg-[#FFF8F0] py-24'>
        <div className='container-custom'>
          <div className='mb-20 text-center'>
            <h2 className='mb-6 flex items-center justify-center gap-3 text-3xl font-bold text-gray-900 md:text-5xl'>
              <Calendar className='text-[#4CAF50]' /> Lễ Hội & Văn Hóa Độc Đáo
            </h2>
            <p className='mx-auto max-w-3xl text-xl text-gray-600'>
              Cùng hòa mình vào không khí hội hè đặc trưng, nơi di sản hòa quyện cùng nhịp sống sông nước náo nhiệt.
            </p>
          </div>

          <div className='space-y-16'>
            {culturalFestivals.map((festival, index) => (
              <motion.div
                key={festival.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col items-stretch overflow-hidden rounded-[3rem] bg-white shadow-2xl lg:flex-row ${
                  index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className='relative h-[400px] w-full lg:h-auto lg:w-1/2'>
                  <Image src={festival.image} alt={festival.name} fill className='object-cover' />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden' />
                </div>
                <div className='flex w-full flex-col justify-center p-10 md:p-16 lg:w-1/2'>
                  <span className='mb-4 block text-sm font-bold tracking-widest text-[#E07B39] uppercase'>
                    {festival.tagline}
                  </span>
                  <h3 className='mb-6 text-3xl font-bold text-gray-900 underline decoration-[#E07B39]/20 decoration-8 underline-offset-8 md:text-4xl'>
                    {festival.name}
                  </h3>
                  <p className='mb-8 text-lg leading-relaxed text-gray-600'>{festival.description}</p>
                  <button className='flex items-center gap-2 self-start font-bold text-gray-900 transition-all duration-300 hover:gap-4'>
                    Bắt đầu hành trình <MapPin size={20} className='text-[#E07B39]' />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Quote */}
      <section className='bg-white py-20'>
        <div className='container-custom text-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='relative overflow-hidden rounded-[4rem] bg-gradient-to-br from-[#E07B39] to-[#4CAF50] p-16 text-white'
          >
            <div className='absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10' />
            <div className='relative z-10'>
              <h3 className='mb-6 font-serif text-3xl leading-tight md:text-5xl'>
                &quot;Hào khí ngàn xưa tỏa sáng hôm nay,
                <br />
                Vĩnh Long - Đất lành chim đậu.&quot;
              </h3>
              <p className='text-xl text-white/80'>
                Một hành trình không chỉ đến để ngắm nhìn, mà đến để cảm nhận một tâm hồn Việt hào sảng.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
