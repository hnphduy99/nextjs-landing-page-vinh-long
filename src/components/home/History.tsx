'use client';

import { motion } from 'framer-motion';
import { ArrowRight, History as HistoryIcon, Map, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function History() {
  return (
    <section id='history' className='relative overflow-hidden bg-slate-950 py-24'>
      {/* Background Decorative Elements */}
      <div className='pointer-events-none absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-[#E07B39]/10 to-transparent' />
      <div className='pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#4CAF50]/10 blur-[120px]' />

      <div className='container-custom relative z-10'>
        <div className='grid items-center gap-16 lg:grid-cols-12'>
          {/* Visual Content (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='relative lg:col-span-5'
          >
            <div className='relative z-10 overflow-hidden rounded-[3rem] border-8 border-slate-900 shadow-2xl'>
              <Image
                src='https://images.unsplash.com/photo-1596402184320-417d717867cd?q=80&w=2400'
                alt='Long Ho Dinh History'
                width={800}
                height={1000}
                className='h-[600px] w-full scale-105 object-cover brightness-75 contrast-125'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent' />

              <div className='absolute right-10 bottom-10 left-10'>
                <div className='mb-4 flex items-center gap-3 text-[#E07B39]'>
                  <ShieldCheck size={32} />
                  <span className='text-sm font-bold tracking-[0.3em] uppercase'>Hào Khí Long Hồ</span>
                </div>
                <h3 className='mb-2 font-serif text-3xl font-bold text-white italic'>&quot;Địa Linh Nhân Kiệt&quot;</h3>
                <p className='text-sm leading-relaxed text-slate-300'>
                  Vùng đất hội tụ linh khí của dòng Cửu Long, nơi sinh ra những anh kiệt lỗi lạc của dân tộc.
                </p>
              </div>
            </div>

            {/* Floating Stats or Years */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className='absolute -top-10 -right-10 z-20 hidden rounded-[2rem] bg-white p-8 shadow-2xl md:block'
            >
              <div className='font-serif text-5xl font-black text-[#E07B39]'>1732</div>
              <div className='mt-2 text-sm font-bold tracking-widest text-slate-500 uppercase'>Năm Khai Sinh</div>
            </motion.div>
          </motion.div>

          {/* Textual Content (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='space-y-10 lg:col-span-7'
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='mb-8 inline-flex items-center gap-2 rounded-full border border-[#E07B39]/30 bg-[#E07B39]/10 px-4 py-2 text-xs font-bold tracking-widest text-[#E07B39] uppercase'
              >
                <HistoryIcon size={16} /> Lịch sử & Con người
              </motion.div>

              <h2 className='mb-8 font-serif text-5xl leading-tight font-bold text-white md:text-7xl'>
                Dấu Chân Trên <br />
                <span className='bg-linear-to-r from-[#E07B39] to-[#FFAB85] bg-clip-text text-transparent'>
                  Đất Thiêng Long Hồ
                </span>
              </h2>

              <p className='mb-10 max-w-2xl text-xl leading-relaxed text-slate-400'>
                Được hình thành từ năm 1732 với tên gọi dinh Long Hồ, Vĩnh Long là vùng đất của những danh nhân và những
                trang sử hào hùng. Nơi đây không chỉ có hào khí của tiền nhân đi mở cõi mà còn là quê hương của những
                nhà lãnh đạo lỗi lạc của dân tộc.
              </p>

              <div className='mb-12 grid gap-8 text-white sm:grid-cols-2'>
                <div className='group space-y-4'>
                  <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-[#E07B39] transition-all group-hover:bg-[#E07B39] group-hover:text-white'>
                    <Map size={28} />
                  </div>
                  <h4 className='text-xl font-bold'>Vùng Đất Địa Linh</h4>
                  <p className='text-sm leading-relaxed text-slate-500'>
                    Vị thế chiến lược giữa lòng đồng bằng sông Cửu Long, nơi hội thụ tinh hoa đất trời.
                  </p>
                </div>
                <div className='group space-y-4'>
                  <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-[#4CAF50] transition-all group-hover:bg-[#4CAF50] group-hover:text-white'>
                    <Users size={28} className='hidden' /> {/* Using simple icon mapping */}
                    <HistoryIcon size={28} />
                  </div>
                  <h4 className='text-xl font-bold'>Tinh Thần Nhân Kiệt</h4>
                  <p className='text-sm leading-relaxed text-slate-500'>
                    Truyền thống hiếu học, lòng quả cảm và tâm hồn nghệ sĩ lớn đã làm nên danh tiếng Vĩnh Long.
                  </p>
                </div>
              </div>

              <Link
                href='/history'
                className='group inline-flex items-center gap-4 rounded-full bg-[#E07B39] px-10 py-5 font-bold text-white shadow-xl shadow-[#E07B39]/20 transition-all hover:bg-[#E07B39]/90'
              >
                Khám phá hành trình 300 năm{' '}
                <ArrowRight size={20} className='transition-transform group-hover:translate-x-2' />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Simple Helper for Icons
function Users({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
      <path d='M16 3.13a4 4 0 0 1 0 7.75' />
    </svg>
  );
}
