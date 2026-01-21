'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Utensils, Sprout, Star, Heart, MapPin, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { specialtyCategories, specialtiesHero } from '@/constants/specialties-data';

export default function SpecialtiesPage() {
  return (
    <div className='min-h-screen bg-[#FFF8F0]'>
      <Navbar />

      {/* Hero Section */}
      <section className='relative overflow-hidden pt-32 pb-20'>
        <div className='absolute inset-0 z-0'>
          <Image
            src='https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2400'
            alt='Vĩnh Long Specialties'
            fill
            className='object-cover opacity-20'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-[#FFF8F0]/50 via-[#FFF8F0] to-[#FFF8F0]' />
        </div>

        <div className='container-custom relative z-10 text-center'>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className='mb-6 inline-block rounded-full border border-[#E07B39]/20 bg-[#E07B39]/10 px-4 py-1.5 text-sm font-bold tracking-widest text-[#E07B39] uppercase'>
              Ẩm thực & Đặc sản
            </span>
            <h1 className='mb-6 font-serif text-4xl font-bold text-gray-900 underline decoration-[#E07B39]/30 underline-offset-8 md:text-6xl'>
              {specialtiesHero.title}
            </h1>
            <p className='mb-8 text-xl font-medium text-[#4CAF50] md:text-2xl'>{specialtiesHero.subtitle}</p>
            <p className='mx-auto max-w-3xl text-lg leading-relaxed text-gray-600'>{specialtiesHero.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Categories Sections */}
      {specialtyCategories.map((category, catIndex) => (
        <section key={category.id} className={`py-24 ${catIndex % 2 === 0 ? 'bg-white' : 'bg-[#FFF8F0]'}`}>
          <div className='container-custom'>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='mb-16 border-l-8 border-[#E07B39] pl-8'
            >
              <div className='mb-2 flex items-center gap-4 text-[#E07B39]'>
                {category.id === 'fruits' ? <Sprout size={32} /> : <Utensils size={32} />}
                <h2 className='text-3xl font-bold tracking-tight text-gray-900 uppercase md:text-4xl'>
                  {category.title}
                </h2>
              </div>
              <p className='text-xl text-gray-600 italic'>{category.description}</p>
            </motion.div>

            <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3'>
              {category.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className='group'
                >
                  <div className='flex h-full flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl'>
                    {/* Image Area */}
                    <div className='relative h-64 overflow-hidden'>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className='object-cover transition-transform duration-700 group-hover:scale-110'
                      />
                      <div className='absolute top-4 right-4 z-10'>
                        <span className='flex items-center gap-1 rounded-full border border-[#E07B39]/20 bg-white/90 px-3 py-1 text-[10px] font-bold text-[#E07B39] uppercase shadow-sm backdrop-blur-md'>
                          <MapPin size={10} /> {item.origin}
                        </span>
                      </div>
                      <div className='absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />
                      <div className='absolute right-6 bottom-6 left-6'>
                        <h3 className='mb-1 text-2xl font-bold text-white transition-colors group-hover:text-[#E07B39]'>
                          {item.name}
                        </h3>
                        <div className='flex gap-1'>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={12} className='fill-[#E07B39] text-[#E07B39]' />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className='flex flex-grow flex-col p-8'>
                      <div className='mb-6 rounded-2xl border-l-4 border-[#4CAF50] bg-[#FFF8F0] p-4'>
                        <p className='mb-1 flex items-center gap-2 text-sm font-medium text-gray-700 italic'>
                          <Heart size={14} className='text-red-500' /> Vị ngon khó cưỡng:
                        </p>
                        <p className='text-sm font-bold tracking-wide text-[#4CAF50]'>{item.taste}</p>
                      </div>

                      <p className='mb-6 line-clamp-4 text-sm leading-relaxed text-gray-600'>{item.longDescription}</p>

                      <div className='mt-auto flex items-center justify-between border-t border-gray-50 pt-6'>
                        <span className='text-xs font-medium text-gray-400'>Click để xem chi tiết</span>
                        <motion.button
                          whileHover={{ x: 5 }}
                          className='flex h-10 w-10 items-center justify-center rounded-full bg-[#E07B39] text-white shadow-lg transition-colors hover:bg-[#4CAF50]'
                        >
                          <ArrowRight size={18} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Specialty Tips Section */}
      <section className='bg-gradient-to-br from-[#E07B39] to-[#E07B39]/90 py-24 text-white'>
        <div className='container-custom'>
          <div className='grid items-center gap-16 md:grid-cols-2'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className='relative h-[400px] overflow-hidden rounded-[3rem] border-4 border-white/20 shadow-2xl'
            >
              <Image
                src='https://images.unsplash.com/photo-1547516508-4c1f9c7c4ec3?q=80&w=2400'
                alt='Local Market'
                fill
                className='object-cover'
              />
              <div className='absolute inset-0 bg-black/20' />
            </motion.div>

            <div className='space-y-8'>
              <h2 className='text-4xl font-bold'>Mẹo Thưởng Thức Trọn Vẹn</h2>
              <div className='space-y-6'>
                <div className='rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md transition-colors hover:bg-white/20'>
                  <h4 className='mb-2 text-xl font-bold'>🍎 Trái cây tươi đúng mùa</h4>
                  <p className='text-sm leading-relaxed text-white/80'>
                    Nên ghé thăm Vĩnh Long vào khoảng tháng 5 - tháng 7 dương lịch để thưởng thức các loại trái cây vào
                    mùa chín rộ nhất.
                  </p>
                </div>
                <div className='rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md transition-colors hover:bg-white/20'>
                  <h4 className='mb-2 text-xl font-bold'>🍽️ Ăn cơm tại vườn</h4>
                  <p className='text-sm leading-relaxed text-white/80'>
                    Món Cá tai tượng chiên xù sẽ ngon nhất khi thưởng thức ngay tại các nhà vườn ở Cù lao An Bình, cùng
                    với không gian xanh mát và gió sông hiền hòa.
                  </p>
                </div>
                <div className='rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md transition-colors hover:bg-white/20'>
                  <h4 className='mb-2 text-xl font-bold'>🎁 Quà mang về</h4>
                  <p className='text-sm leading-relaxed text-white/80'>
                    Bánh tráng nem và khoai lang Bình Tân là những lựa chọn tuyệt vời để làm quà biếu vì dễ bảo quản và
                    vận chuyển đi xa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
