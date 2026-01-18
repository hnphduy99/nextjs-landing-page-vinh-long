'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { X, Plus } from 'lucide-react';
import Image from 'next/image';

interface GalleryUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  onRemove: (url: string) => void;
}

export default function GalleryUpload({ value = [], onChange, onRemove }: GalleryUploadProps) {
  const onUpload = (result: any) => {
    if (result.event === 'success') {
      onChange([...value, result.info.secure_url]);
    }
  };

  return (
    <div className='w-full space-y-4'>
      <label className='mb-2 block text-sm font-bold text-slate-700'>Thư viện ảnh ({value.length} ảnh)</label>

      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        {value.map((url, index) => (
          <div
            key={url + index}
            className='group relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-100'
          >
            <Image fill src={url} alt='Gallery Image' className='object-cover' />
            <button
              type='button'
              onClick={() => onRemove(url)}
              className='absolute top-2 right-2 rounded-lg bg-white/90 p-1.5 text-red-500 opacity-0 shadow-sm backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-red-500 hover:text-white'
            >
              <X size={16} />
            </button>
          </div>
        ))}

        <CldUploadWidget
          onSuccess={onUpload}
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          options={{
            maxFiles: 1, // Upload one at a time for simplicity in appending
            styles: {
              palette: {
                window: '#FFFFFF',
                windowBorder: '#E2E8F0',
                tabIcon: '#E07B39',
                menuIcons: '#5A616A',
                textDark: '#0F172A',
                textLight: '#FFFFFF',
                link: '#E07B39',
                action: '#E07B39',
                inactiveTabIcon: '#94A3B8',
                error: '#F43F5E',
                inProgress: '#E07B39',
                complete: '#10B981',
                sourceBg: '#F8FAFC'
              }
            }
          }}
        >
          {({ open }) => (
            <button
              type='button'
              onClick={() => open()}
              className='group flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 transition-all hover:border-[#E07B39]/30 hover:bg-slate-100 hover:text-[#E07B39]'
            >
              <div className='rounded-xl bg-white p-3 shadow-sm transition-transform group-hover:scale-110'>
                <Plus size={24} />
              </div>
              <span className='text-xs font-bold'>Thêm ảnh</span>
            </button>
          )}
        </CldUploadWidget>
      </div>
    </div>
  );
}
