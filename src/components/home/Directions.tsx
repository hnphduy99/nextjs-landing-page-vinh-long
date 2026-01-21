'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation, Bus, Bike, Info, Map as MapIcon } from 'lucide-react';

export default function Directions() {
  const transportOptions = [
    {
      type: 'Xe Khách',
      icon: Bus,
      title: 'Phương tiện công cộng',
      description:
        'Nhiều hãng xe uy tín như Phương Trang, Thành Bưởi chạy tuyến TP.HCM - Vĩnh Long liên tục (tần suất 15-30 phút/chuyến).',
      detail: 'Khởi hành từ Bến xe Miền Tây. Thời gian di chuyển khoảng 2 - 2.5 giờ.',
      color: 'text-[#E07B39]',
      bgColor: 'bg-[#E07B39]/10'
    },
    {
      type: 'Xe Máy / Ô tô',
      icon: Bike,
      title: 'Phương tiện cá nhân',
      description:
        'Dành cho những bạn yêu thích khám phá và chủ động thời gian. Đường đi thông thoáng, phong cảnh đẹp.',
      detail: 'Đi theo QL1A hoặc Cao tốc Trung Lương - Mỹ Thuận. Khoảng cách ~135km.',
      color: 'text-[#4CAF50]',
      bgColor: 'bg-[#4CAF50]/10'
    }
  ];

  return (
    <section id='location' className='overflow-hidden bg-white py-24'>
      <div className='container-custom'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-16 text-center'
        >
          <span className='mb-4 block text-sm font-bold tracking-widest text-[#E07B39] uppercase'>
            Hành trình du lịch
          </span>
          <h2 className='text-4xl font-bold text-gray-900 md:text-5xl'>Bản Đồ & Chỉ Đường</h2>
          <div className='mx-auto mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#E07B39] to-[#4CAF50]' />
        </motion.div>

        <div className='grid gap-12 lg:grid-cols-12'>
          {/* Left: Transport Info */}
          <div className='space-y-8 lg:col-span-5'>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='rounded-[2.5rem] border border-[#E07B39]/10 bg-[#FFF8F0] p-8 shadow-xl md:p-10'
            >
              <div className='mb-8 flex items-center gap-4'>
                <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E07B39] text-white shadow-lg'>
                  <Navigation size={28} />
                </div>
                <div>
                  <h3 className='text-2xl font-bold text-gray-900'>Cách TP.HCM</h3>
                  <p className='font-bold text-[#E07B39]'>Khoảng 135 km (Hơn 2 giờ di chuyển)</p>
                </div>
              </div>

              <div className='space-y-8'>
                {transportOptions.map((opt, idx) => (
                  <div key={idx} className='group flex gap-6'>
                    <div
                      className={`h-16 w-16 shrink-0 rounded-2xl ${opt.bgColor} ${opt.color} flex items-center justify-center transition-transform group-hover:scale-110`}
                    >
                      <opt.icon size={32} />
                    </div>
                    <div>
                      <h4 className='mb-1 text-lg font-extrabold text-gray-900'>{opt.type}</h4>
                      <p className='mb-2 text-sm text-gray-600'>{opt.description}</p>
                      <p className='inline-block rounded-full bg-[#4CAF50]/5 px-3 py-1 text-xs font-bold tracking-tighter text-[#4CAF50] uppercase italic'>
                        {opt.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className='mt-12 flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6'>
                <Info className='mt-1 shrink-0 text-[#E07B39]' size={20} />
                <p className='text-xs leading-relaxed text-gray-500 italic'>
                  Vĩnh Long là trung tâm của các tỉnh miền Tây. Từ đây, bạn có thể dễ dàng tiếp nối hành trình sang Cần
                  Thơ, Tiền Giang, Trà Vinh hay Đồng Tháp một cách thuận tiện.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='relative h-[500px] min-h-[500px] lg:col-span-12 lg:h-full xl:col-span-7'
          >
            <div className='group absolute inset-0 overflow-hidden rounded-[3rem] border-8 border-white shadow-2xl'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125554.4082260714!2d105.88126848694038!3d10.255535384185703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a82ec4582f053%3A0x6966113b2e53ef9!2zVsSpbmggTG9uZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1711234567890!5m2!1svi!2s'
                width='100%'
                height='100%'
                style={{ border: 0 }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                className='brightness-[0.98] contrast-[1.05] transition-all duration-700 group-hover:brightness-100'
              ></iframe>

              <div className='pointer-events-none absolute top-6 left-6'>
                <div className='flex items-center gap-2 rounded-full bg-[#E07B39] px-5 py-2.5 text-xs font-bold tracking-widest text-white uppercase shadow-2xl'>
                  <MapIcon size={16} /> Interactive Map
                </div>
              </div>

              <div className='absolute right-6 bottom-6'>
                <a
                  href='https://maps.app.goo.gl/YourMapLinkHere'
                  target='_blank'
                  className='flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-gray-900 shadow-xl transition-all hover:bg-black hover:text-white'
                >
                  <MapPin size={18} className='text-[#E07B39]' /> Xem trên Google Maps
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
