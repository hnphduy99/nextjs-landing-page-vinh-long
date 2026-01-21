'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Factory, GraduationCap, HeartPulse } from 'lucide-react';
import { modernDevelopment } from '@/constants/about-data';

const iconMap = {
  'trending-up': TrendingUp,
  factory: Factory,
  'graduation-cap': GraduationCap,
  'heart-pulse': HeartPulse
};

export default function ModernDevelopment() {
  return (
    <section className='section-padding relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white'>
      {/* Decorative Background */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-0 left-0 h-96 w-96 rounded-full bg-[#E07B39] blur-3xl' />
        <div className='absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#4CAF50] blur-3xl' />
      </div>

      <div className='container-custom relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-16 text-center'
        >
          <h2 className='mb-4 text-4xl font-bold md:text-5xl'>{modernDevelopment.title}</h2>
          <p className='mx-auto max-w-2xl text-xl text-white/80'>{modernDevelopment.description}</p>
        </motion.div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {modernDevelopment.achievements.map((achievement, index) => {
            const Icon = iconMap[achievement.icon as keyof typeof iconMap];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className='group'
              >
                <div className='card-hover relative h-full rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-lg'>
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className='mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E07B39] to-[#4CAF50] shadow-lg'
                  >
                    <Icon size={32} className='text-white' />
                  </motion.div>

                  {/* Title */}
                  <h3 className='mb-4 text-lg font-semibold text-white/90'>{achievement.title}</h3>

                  {/* Value */}
                  <div className='mb-4'>
                    <span className='bg-gradient-to-r from-[#E07B39] to-[#4CAF50] bg-clip-text text-5xl font-bold text-transparent'>
                      {achievement.value}
                    </span>
                  </div>

                  {/* Description */}
                  <p className='leading-relaxed text-white/70'>{achievement.description}</p>

                  {/* Decorative Element */}
                  <div className='absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-gradient-to-br from-[#E07B39]/20 to-[#4CAF50]/20 blur-2xl transition-transform duration-500 group-hover:scale-150' />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='mt-16 text-center'
        >
          <div className='inline-block rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-lg md:p-12'>
            <h3 className='mb-4 text-2xl font-bold md:text-3xl'>Tầm Nhìn 2030</h3>
            <p className='max-w-4xl text-lg text-white/80 md:text-xl'>
              Phấn đấu đưa Vĩnh Long trở thành tỉnh phát triển khá của vùng Đồng bằng sông Cửu Long, với nền kinh tế
              phát triển bền vững, văn hóa - xã hội tiến보, môi trường sinh thái được bảo vệ, đời sống nhân dân ngày
              càng được nâng cao.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
