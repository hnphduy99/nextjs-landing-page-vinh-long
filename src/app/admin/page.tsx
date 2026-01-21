'use client';
import apiClient from '@/lib/api-client';
import { motion } from 'framer-motion';
import { Clock, Eye, Loader2, MapPin, Sparkles, Utensils } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StatsData {
  destinations: number;
  specialties: number;
  milestones: number;
  festivals: number;
  views: number;
}

interface Activity {
  id: string;
  itemName: string;
  type: string;
  action: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [data, setData] = useState<StatsData | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([apiClient.get('/api/admin/stats'), apiClient.get('/api/admin/activity')])
      .then(([stats, activityData]) => {
        setData(stats);
        setActivities(activityData.activities || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch dashboard data:', error);
        setLoading(false);
      });
  }, []);

  const statsFields = [
    {
      label: 'Tổng lượt xem',
      value: data?.views?.toLocaleString() || '0',
      icon: Eye,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      subLabel: 'Vercel Analytics'
    },
    {
      label: 'Địa điểm',
      value: data?.destinations || '0',
      icon: MapPin,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      subLabel: 'Database'
    },
    {
      label: 'Đặc sản',
      value: data?.specialties || '0',
      icon: Utensils,
      color: 'text-green-600',
      bg: 'bg-green-100',
      subLabel: 'Database'
    },
    {
      label: 'Lễ hội',
      value: data?.festivals || '0',
      icon: Sparkles,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      subLabel: 'Database'
    }
  ];

  if (loading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <Loader2 className='animate-spin text-[#E07B39]' size={32} />
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      <div>
        <h2 className='text-3xl font-bold text-slate-900'>Chào mừng trở lại</h2>
        <p className='mt-1 text-slate-500'>Hệ thống quản trị nội dung Landing Page Vĩnh Long.</p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {statsFields.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className='relative flex items-center gap-5 overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md'
          >
            <div className={`h-14 w-14 ${stat.bg} ${stat.color} flex items-center justify-center rounded-2xl`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className='text-xs font-bold tracking-wider text-slate-500 uppercase'>{stat.label}</p>
              <h3 className='text-2xl font-black text-slate-900'>{stat.value}</h3>
              <p className='mt-1 text-[10px] text-slate-400'>{stat.subLabel}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className='grid gap-8 lg:grid-cols-3'>
        <div className='rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm lg:col-span-2'>
          <h3 className='font-primary mb-6 text-xl font-bold text-slate-900'>Hoạt động gần đây</h3>
          <div className='space-y-6'>
            {activities.length > 0 ? (
              activities.map((activity, idx) => (
                <div
                  key={`${activity.type}-${activity.id}-${idx}`}
                  className='flex items-center gap-4 border-b border-slate-50 py-4 last:border-0'
                >
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500'>
                    <Clock size={18} />
                  </div>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-slate-900'>
                      Đã {activity.action}{' '}
                      {activity.type === 'destination'
                        ? 'địa điểm'
                        : activity.type === 'specialty'
                          ? 'đặc sản'
                          : 'nội dung'}{' '}
                      &quot;{activity.itemName}&quot;
                    </p>
                    <p className='text-xs text-slate-400'>{new Date(activity.createdAt).toLocaleString('vi-VN')}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className='py-8 text-center text-slate-400'>Chưa có hoạt động nào được ghi lại.</p>
            )}
          </div>
        </div>

        <div className='rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm'>
          <h3 className='mb-6 text-xl font-bold text-slate-900'>Trạng thái hệ thống</h3>
          <div className='space-y-4'>
            <div className='flex items-center justify-between rounded-2xl border border-green-100 bg-green-50 p-4'>
              <span className='text-sm font-medium text-green-700'>Database (Supabase)</span>
              <div className='h-2 w-2 animate-pulse rounded-full bg-green-500' />
            </div>
            <div className='flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50 p-4'>
              <span className='text-sm font-medium text-blue-700'>Analytics (Vercel)</span>
              <span className='text-xs font-bold text-blue-600 uppercase'>Connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
