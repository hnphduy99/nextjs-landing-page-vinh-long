'use client';

import { generalInfo } from '@/constants/about-data';
import { motion } from 'framer-motion';
import { Building, Factory, GraduationCap, HeartPulse, Map, MapPin, TrendingUp, Users } from 'lucide-react';

const iconMap = {
  map: Map,
  'map-pin': MapPin,
  users: Users,
  building: Building,
  'trending-up': TrendingUp,
  factory: Factory,
  'graduation-cap': GraduationCap,
  'heart-pulse': HeartPulse
};

export default function GeneralInfo() {
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
          <h2 className='mb-4 text-4xl font-bold text-gray-900 md:text-5xl'>Thông Tin Tổng Quan</h2>
          <p className='mx-auto max-w-2xl text-xl text-gray-600'>Những con số &quot;biết nói&quot; về Vĩnh Long</p>
        </motion.div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {generalInfo.map((info, index) => {
            const Icon = iconMap[info.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={info.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className='group relative'
              >
                {/* Card */}
                <div className='card-hover relative h-full overflow-hidden rounded-2xl bg-white p-8 shadow-lg'>
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`h-16 w-16 bg-gradient-to-br ${info.color} mb-6 flex items-center justify-center rounded-2xl shadow-lg`}
                  >
                    <Icon size={32} className='text-white' />
                  </motion.div>

                  {/* Content */}
                  <h3 className='mb-3 text-lg font-semibold text-gray-700'>{info.title}</h3>

                  <div className='mb-4'>
                    <span className='gradient-text text-5xl font-bold'>{info.value}</span>
                    <span className='ml-2 text-xl text-gray-600'>{info.unit}</span>
                  </div>

                  <p className='leading-relaxed text-gray-600'>{info.description}</p>

                  {/* Decorative Corner */}
                  <div
                    className={`absolute -right-4 -bottom-4 h-24 w-24 bg-gradient-to-br ${info.color} rounded-full opacity-10 transition-opacity group-hover:opacity-20`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
