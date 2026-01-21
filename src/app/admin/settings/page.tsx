'use client';

import apiClient from '@/lib/api-client';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SiteSetting {
  key: string;
  value: string;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get<SiteSetting[]>('/api/admin/settings')
      .then((data) => {
        const settingsMap = data.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.key]: curr.value
          }),
          {}
        );
        setSettings(settingsMap);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch settings:', error);
        setLoading(false);
      });
  }, []);

  const handleUpdate = async (key: string, value: string) => {
    setSaving(key);
    try {
      await apiClient.put('/api/admin/settings', { key, value });
      setSettings((prev) => ({ ...prev, [key]: value }));
    } catch (error: any) {
      alert(error.message || 'Lỗi khi cập nhật cài đặt');
    } finally {
      setSaving(null);
    }
  };

  if (loading)
    return (
      <div className='flex h-64 items-center justify-center'>
        <Loader2 className='animate-spin text-[#E07B39]' size={32} />
      </div>
    );

  return (
    <div className='max-w-4xl space-y-8'>
      <div>
        <h2 className='text-3xl font-bold text-slate-900'>Cấu hình hệ thống</h2>
        <p className='mt-1 text-slate-500'>Quản lý các thông tin cơ bản và giao diện chính.</p>
      </div>

      <div className='overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-sm'>
        <div className='space-y-6 p-8'>
          {/* Site Title */}
          <div className='space-y-2'>
            <label className='text-sm font-bold text-slate-700'>Tiêu đề trang web (Site Title)</label>
            <div className='flex gap-4'>
              <input
                type='text'
                defaultValue={settings.site_title || ''}
                onBlur={(e) => handleUpdate('site_title', e.target.value)}
                className='flex-1 rounded-2xl border-none bg-slate-50 px-6 py-4 transition-all focus:ring-2 focus:ring-[#E07B39]'
              />
              {saving === 'site_title' && <Loader2 className='mt-4 animate-spin' size={20} />}
            </div>
          </div>

          {/* Site Slogan */}
          <div className='space-y-2'>
            <label className='text-sm font-bold text-slate-700'>Slogan</label>
            <div className='flex gap-4'>
              <input
                type='text'
                defaultValue={settings.site_slogan || ''}
                onBlur={(e) => handleUpdate('site_slogan', e.target.value)}
                className='flex-1 rounded-2xl border-none bg-slate-50 px-6 py-4 transition-all focus:ring-2 focus:ring-[#E07B39]'
              />
              {saving === 'site_slogan' && <Loader2 className='mt-4 animate-spin' size={20} />}
            </div>
          </div>

          {/* Hero Content - Simplified for this demo, usually would be a JSON editor */}
          <div className='border-t border-slate-50 pt-6'>
            <h4 className='mb-4 font-bold text-slate-900'>Mô tả giới thiệu (Hero Description)</h4>
            <div className='space-y-2'>
              <textarea
                defaultValue={settings.site_description || ''}
                rows={4}
                onBlur={(e) => handleUpdate('site_description', e.target.value)}
                className='w-full rounded-2xl border-none bg-slate-50 px-6 py-4 transition-all focus:ring-2 focus:ring-[#E07B39]'
              />
              {saving === 'site_description' && <Loader2 className='animate-spin' size={20} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
