'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axiosInstance from '@/lib/axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axiosInstance.post('api/auth/login', {
        email,
        password
      });

      if (res.data.success) {
        router.push('/admin');
      } else {
        setError(res.data.error || 'Đăng nhập thất bại');
      }
    } catch (err) {
      setError('Lỗi kết nối máy chủ' + (err instanceof Error ? `: ${err.message}` : ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='grid min-h-screen lg:grid-cols-2'>
      {/* Visual Side */}
      <div className='relative hidden overflow-hidden bg-slate-900 lg:block'>
        <Image
          src='https://images.unsplash.com/photo-1596402184320-417d717867cd?q=80&w=2400'
          alt='Vĩnh Long'
          fill
          className='object-cover opacity-60'
        />
        <div className='absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent' />
      </div>

      {/* Form Side */}
      <div className='flex items-center justify-center bg-slate-50 p-8'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className='w-full max-w-md rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-2xl shadow-slate-200/50'
        >
          <div className='mb-10 text-center'>
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF8F0] text-[#E07B39]'>
              <Lock size={32} />
            </div>
            <h2 className='text-3xl font-bold text-slate-900'>Đăng nhập Admin</h2>
            <p className='mt-2 text-sm font-bold tracking-widest text-slate-500 uppercase'>Vĩnh Long - Về là thương</p>
          </div>

          <form onSubmit={handleLogin} className='space-y-6'>
            <div className='space-y-2'>
              <label className='ml-2 text-xs font-bold text-slate-400 uppercase'>Email của bạn</label>
              <div className='group relative'>
                <div className='absolute top-1/2 left-6 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#E07B39]'>
                  <Mail size={20} />
                </div>
                <input
                  type='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='youremail@email.com'
                  className='w-full rounded-2xl border-none bg-slate-50 px-14 py-4 text-slate-900 transition-all outline-none focus:bg-white focus:ring-2 focus:ring-[#E07B39]/20'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label className='ml-2 text-xs font-bold text-slate-400 uppercase'>Mật khẩu</label>
              <div className='group relative'>
                <div className='absolute top-1/2 left-6 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#E07B39]'>
                  <Lock size={20} />
                </div>
                <input
                  type='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='••••••••'
                  className='w-full rounded-2xl border-none bg-slate-50 px-14 py-4 text-slate-900 transition-all outline-none focus:bg-white focus:ring-2 focus:ring-[#E07B39]/20'
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className='flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500'
              >
                <div className='h-1.5 w-1.5 rounded-full bg-red-500' />
                {error}
              </motion.div>
            )}

            <button
              type='submit'
              disabled={loading}
              className='flex w-full items-center justify-center gap-3 rounded-2xl bg-[#E07B39] py-4 text-lg font-bold text-white shadow-lg shadow-[#E07B39]/25 transition-all hover:-translate-y-0.5 hover:bg-[#c96e33] hover:shadow-xl disabled:translate-y-0 disabled:opacity-70'
            >
              {loading ? (
                <Loader2 size={24} className='animate-spin' />
              ) : (
                <>
                  Bắt đầu làm việc <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
