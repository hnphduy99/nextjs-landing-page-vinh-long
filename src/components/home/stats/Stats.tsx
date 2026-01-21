'use client';

import { motion } from 'framer-motion';
import { Map, Landmark, MapPin, Users, TrendingUp, Factory, HelpCircle } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  unit: string | null;
  icon: string | null;
}

interface StatsProps {
  statsData: StatItem[];
}

const iconMap = {
  map: Map,
  landmark: Landmark,
  'map-pin': MapPin,
  users: Users,
  'trending-up': TrendingUp,
  factory: Factory
};

export default function Stats({ statsData }: StatsProps) {
  return (
    <section id='about' className='section-padding bg-white'>
      <div className='container-custom'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-16 text-center'
        >
          <h2 className='mb-4 text-4xl font-bold text-gray-900 md:text-5xl'>Vĩnh Long trong con số</h2>
          <p className='mx-auto max-w-2xl text-xl text-gray-600'>
            Những thông tin cơ bản về vùng đất giữa hai dòng sông
          </p>
        </motion.div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {statsData.map((stat, index) => {
            const Icon = (stat.icon && iconMap[stat.icon as keyof typeof iconMap]) || HelpCircle;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className='card-hover rounded-2xl bg-gradient-to-br from-[#FFF8F0] to-white p-8 text-center shadow-lg'
              >
                <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#E07B39] to-[#4CAF50]'>
                  <Icon size={32} className='text-white' />
                </div>
                <div className='gradient-text mb-2 text-5xl font-bold'>{stat.value}</div>
                <div className='mb-2 text-lg text-gray-600'>{stat.unit}</div>
                <div className='text-xl font-semibold text-gray-900'>{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
