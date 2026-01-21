'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { Image as ImageIcon, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove: () => void;
}

export default function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const onUpload = (result: any) => {
    if (result.event === 'success') {
      onChange(result.info.secure_url);
    }
  };

  return (
    <div className='w-full space-y-4'>
      <label className='mb-2 block text-sm font-bold text-slate-700'>Hình ảnh hiển thị</label>

      {value ? (
        <div className='group relative aspect-video w-full overflow-hidden rounded-4xl border-2 border-slate-100'>
          <Image fill src={value} alt='Upload' className='object-cover' />
          <button
            type='button'
            onClick={onRemove}
            className='absolute top-4 right-4 rounded-xl bg-white/90 p-2 text-red-500 shadow-lg backdrop-blur-sm transition-all hover:bg-red-500 hover:text-white'
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <CldUploadWidget
          onSuccess={onUpload}
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          options={{
            maxFiles: 1,
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
              className='group flex aspect-video w-full flex-col items-center justify-center gap-4 rounded-4xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 transition-all hover:border-[#E07B39]/30 hover:bg-slate-100 hover:text-[#E07B39]'
            >
              <div className='rounded-2xl bg-white p-4 shadow-sm transition-transform group-hover:scale-110'>
                <ImageIcon size={32} />
              </div>
              <div className='text-center'>
                <p className='font-bold text-slate-600'>Nhấn để tải ảnh lên</p>
                <p className='text-xs'>Dung lượng tối đa 10MB</p>
              </div>
            </button>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
}
