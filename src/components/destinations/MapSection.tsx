'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation, Info } from 'lucide-react';

export default function MapSection() {
  return (
    <section className='bg-white py-24'>
      <div className='container-custom'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-16 text-center'
        >
          <span className='mb-4 block text-sm font-bold tracking-widest text-[#E07B39] uppercase'>Bản đồ du lịch</span>
          <h2 className='text-4xl font-bold text-gray-900 md:text-5xl'>Vĩnh Long Trong Tầm Tay</h2>
          <div className='mx-auto mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#E07B39] to-[#4CAF50]' />
        </motion.div>

        <div className='grid items-center gap-12 lg:grid-cols-3'>
          {/* Map Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='space-y-6 lg:col-span-1'
          >
            <div className='rounded-3xl border border-[#E07B39]/10 bg-[#FFF8F0] p-8 shadow-lg'>
              <h3 className='mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900'>
                <Navigation className='text-[#E07B39]' /> Chỉ dẫn địa lý
              </h3>

              <div className='space-y-6'>
                <div className='flex gap-4'>
                  <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white shadow-md'>
                    <MapPin className='text-[#4CAF50]' />
                  </div>
                  <div>
                    <h4 className='font-bold text-gray-900'>Trung tâm</h4>
                    <p className='text-sm text-gray-600'>
                      Thành phố Vĩnh Long là nút giao thông quan trọng nối liền các tỉnh miền Tây.
                    </p>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white shadow-md'>
                    <Info className='text-[#E07B39]' />
                  </div>
                  <div>
                    <h4 className='font-bold text-gray-900'>Di chuyển</h4>
                    <p className='text-sm text-gray-600'>
                      Dễ dàng tiếp cận bằng đường bộ (Cao tốc Trung Lương - Mỹ Thuận) hoặc đường thủy.
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-10 border-t border-gray-200 pt-8'>
                <p className='text-sm text-gray-500 italic'>
                  * Vĩnh Long nằm cách TP. Hồ Chí Minh khoảng 135km về phía Nam.
                </p>
                <button className='mt-6 w-full rounded-2xl bg-gradient-to-r from-[#E07B39] to-[#E07B39]/80 py-4 font-bold text-white shadow-lg transition-all hover:shadow-xl'>
                  Mở Google Maps
                </button>
              </div>
            </div>
          </motion.div>

          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className='group relative h-[500px] overflow-hidden rounded-[2.5rem] border-8 border-white shadow-2xl lg:col-span-2'
          >
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125554.4082260714!2d105.88126848694038!3d10.255535384185703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a82ec4582f053%3A0x6966113b2e53ef9!2zVsSpbmggTG9uZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1711234567890!5m2!1svi!2s'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              className='contrast-[1.1] grayscale-[20%] transition-all duration-700 group-hover:grayscale-0'
            ></iframe>

            {/* Custom Overlay */}
            <div className='pointer-events-none absolute top-6 left-6'>
              <div className='rounded-xl border border-white bg-white/90 px-4 py-2 text-xs font-bold text-[#E07B39] shadow-lg backdrop-blur-md'>
                VĨNH LONG INTERACTIVE MAP
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
