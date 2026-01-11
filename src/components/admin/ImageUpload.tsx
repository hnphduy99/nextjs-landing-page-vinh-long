"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove: () => void;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
}: ImageUploadProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUpload = (result: any) => {
    if (result.event === "success") {
      onChange(result.info.secure_url);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <label className="block text-sm font-bold text-slate-700 mb-2">
        Hình ảnh hiển thị
      </label>

      {value ? (
        <div className="relative w-full aspect-video rounded-4xl overflow-hidden border-2 border-slate-100 group">
          <Image fill src={value} alt="Upload" className="object-cover" />
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
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
                window: "#FFFFFF",
                windowBorder: "#E2E8F0",
                tabIcon: "#E07B39",
                menuIcons: "#5A616A",
                textDark: "#0F172A",
                textLight: "#FFFFFF",
                link: "#E07B39",
                action: "#E07B39",
                inactiveTabIcon: "#94A3B8",
                error: "#F43F5E",
                inProgress: "#E07B39",
                complete: "#10B981",
                sourceBg: "#F8FAFC",
              },
            },
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="w-full aspect-video rounded-4xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-4 text-slate-400 hover:bg-slate-100 hover:border-[#E07B39]/30 hover:text-[#E07B39] transition-all group"
            >
              <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                <ImageIcon size={32} />
              </div>
              <div className="text-center">
                <p className="font-bold text-slate-600">Nhấn để tải ảnh lên</p>
                <p className="text-xs">Dung lượng tối đa 10MB</p>
              </div>
            </button>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
}
