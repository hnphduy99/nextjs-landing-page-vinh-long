'use client';

import GalleryUpload from '@/components/admin/GalleryUpload';
import ImageUpload from '@/components/admin/ImageUpload';
import apiClient from '@/lib/api-client';
import { Edit2, Image as ImageIcon, Loader2, Plus, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Province {
  id: string;
  name: string;
}

interface Destination {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  slogan?: string;
  description?: string;
  longDescription?: string;
  provinceId: string;
  gallery?: string[];
  experiences?: string[];
  highlights?: string[];
  tips?: string;
}

export default function AdminDestinations() {
  const [items, setItems] = useState<Destination[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Destination | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<Partial<Destination>>({
    name: '',
    category: '',
    slogan: '',
    description: '',
    longDescription: '',
    imageUrl: '',
    provinceId: '',
    gallery: [],
    experiences: [],
    highlights: [],
    tips: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [dests, provs] = await Promise.all([
        apiClient.get('/api/admin/destinations'),
        apiClient.get('/api/admin/provinces')
      ]);
      setItems(dests);
      setProvinces(provs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa địa điểm này?')) return;
    try {
      await apiClient.delete(`/api/admin/destinations?id=${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error: any) {
      alert(error.message || 'Lỗi khi xóa');
    }
  };

  const handleOpenModal = (item: Destination | null = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        category: 'Du lịch sinh thái',
        slogan: '',
        description: '',
        longDescription: '',
        imageUrl: '',
        provinceId: provinces[0]?.id || '',
        gallery: [],
        experiences: [],
        highlights: [],
        tips: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingItem) {
        await apiClient.patch('/api/admin/destinations', formData);
      } else {
        await apiClient.post('/api/admin/destinations', formData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error: any) {
      alert(error.message || 'Lỗi khi lưu');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading && items.length === 0)
    return (
      <div className='flex h-64 items-center justify-center'>
        <Loader2 className='animate-spin text-[#E07B39]' size={32} />
      </div>
    );

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-3xl font-bold text-slate-900'>Quản lý điểm đến</h2>
          <p className='mt-1 text-slate-500'>Danh sách các danh lam thắng cảnh tại Vĩnh Long.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className='flex items-center gap-2 rounded-2xl bg-[#E07B39] px-6 py-3 font-bold text-white shadow-lg shadow-[#E07B39]/20 transition-all hover:scale-105'
        >
          <Plus size={20} /> Thêm mới
        </button>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {items.map((item) => (
          <div
            key={item.id}
            className='group overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-sm transition-all hover:border-[#E07B39]/20'
          >
            <div className='relative h-48'>
              {item.imageUrl ? (
                <Image src={item.imageUrl} alt={item.name} fill className='object-cover' />
              ) : (
                <div className='flex h-full w-full items-center justify-center bg-slate-100 text-slate-400'>
                  <ImageIcon size={40} />
                </div>
              )}
              <div className='absolute top-4 right-4 flex gap-2'>
                <button
                  onClick={() => handleOpenModal(item)}
                  className='rounded-xl bg-white/90 p-2 text-slate-600 shadow-sm backdrop-blur-sm transition-colors hover:text-[#E07B39]'
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className='rounded-xl bg-white/90 p-2 text-slate-600 shadow-sm backdrop-blur-sm transition-colors hover:text-red-500'
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className='p-6'>
              <span className='text-xs font-bold tracking-wider text-[#E07B39] uppercase'>{item.category}</span>
              <h3 className='mt-1 text-xl font-bold text-slate-900'>{item.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm'>
          <div className='animate-in fade-in zoom-in w-full max-w-2xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl duration-200'>
            <div className='flex items-center justify-between border-b border-slate-100 bg-slate-50 px-8 py-6'>
              <h3 className='text-xl font-bold text-slate-900'>
                {editingItem ? 'Chỉnh sửa địa điểm' : 'Thêm địa điểm mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className='text-slate-400 hover:text-slate-600'>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSave} className='custom-scrollbar max-h-[70vh] space-y-5 overflow-y-auto p-8'>
              <div className='grid gap-5 md:grid-cols-2'>
                <div>
                  <label className='mb-2 block text-sm font-bold text-slate-700'>Tên địa điểm</label>
                  <input
                    type='text'
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className='w-full rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#E07B39]/20'
                    placeholder='VD: Cù lao An Bình'
                  />
                </div>
                <div>
                  <label className='mb-2 block text-sm font-bold text-slate-700'>Danh mục</label>
                  <input
                    type='text'
                    required
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className='w-full rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#E07B39]/20'
                    placeholder='VD: Du lịch sinh thái'
                  />
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-bold text-slate-700'>Slogan / Câu hiệu</label>
                <input
                  type='text'
                  value={formData.slogan || ''}
                  onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                  className='w-full rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#E07B39]/20'
                  placeholder='Nhập slogan ngắn gọn...'
                />
              </div>

              <ImageUpload
                value={formData.imageUrl || ''}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                onRemove={() => setFormData({ ...formData, imageUrl: '' })}
              />

              <GalleryUpload
                value={formData.gallery || []}
                onChange={(urls) => setFormData({ ...formData, gallery: urls })}
                onRemove={(url) =>
                  setFormData({
                    ...formData,
                    gallery: formData.gallery?.filter((g) => g !== url)
                  })
                }
              />

              <div>
                <label className='mb-2 block text-sm font-bold text-slate-700'>Điểm nổi bật (Highlights)</label>
                <div className='space-y-3'>
                  {(formData.highlights || []).map((hl, index) => (
                    <div key={index} className='flex gap-2'>
                      <input
                        type='text'
                        value={hl}
                        onChange={(e) => {
                          const newHl = [...(formData.highlights || [])];
                          newHl[index] = e.target.value;
                          setFormData({ ...formData, highlights: newHl });
                        }}
                        className='flex-1 rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#E07B39]/20'
                        placeholder='Nhập điểm nổi bật...'
                      />
                      <button
                        type='button'
                        onClick={() => {
                          const newHl = formData.highlights?.filter((_, i) => i !== index);
                          setFormData({ ...formData, highlights: newHl });
                        }}
                        className='rounded-xl bg-red-50 p-3 text-red-500 transition-colors hover:bg-red-100'
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type='button'
                    onClick={() =>
                      setFormData({
                        ...formData,
                        highlights: [...(formData.highlights || []), '']
                      })
                    }
                    className='flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-3 font-bold text-slate-500 transition-all hover:border-[#E07B39] hover:text-[#E07B39]'
                  >
                    <Plus size={20} /> Thêm điểm nổi bật
                  </button>
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-bold text-slate-700'>Trải nghiệm không thể bỏ qua</label>
                <div className='space-y-3'>
                  {(formData.experiences || []).map((exp, index) => (
                    <div key={index} className='flex gap-2'>
                      <input
                        type='text'
                        value={exp}
                        onChange={(e) => {
                          const newExp = [...(formData.experiences || [])];
                          newExp[index] = e.target.value;
                          setFormData({ ...formData, experiences: newExp });
                        }}
                        className='flex-1 rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#E07B39]/20'
                        placeholder='Nhập trải nghiệm...'
                      />
                      <button
                        type='button'
                        onClick={() => {
                          const newExp = formData.experiences?.filter((_, i) => i !== index);
                          setFormData({ ...formData, experiences: newExp });
                        }}
                        className='rounded-xl bg-red-50 p-3 text-red-500 transition-colors hover:bg-red-100'
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type='button'
                    onClick={() =>
                      setFormData({
                        ...formData,
                        experiences: [...(formData.experiences || []), '']
                      })
                    }
                    className='flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-3 font-bold text-slate-500 transition-all hover:border-[#E07B39] hover:text-[#E07B39]'
                  >
                    <Plus size={20} /> Thêm trải nghiệm
                  </button>
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-bold text-slate-700'>Mẹo cho chuyến đi</label>
                <textarea
                  rows={2}
                  value={formData.tips || ''}
                  onChange={(e) => setFormData({ ...formData, tips: e.target.value })}
                  className='w-full resize-none rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#E07B39]/20'
                  placeholder='VD: Thời điểm đẹp nhất để tham quan là hoàng hôn...'
                />
              </div>

              <div>
                <label className='mb-2 block text-sm font-bold text-slate-700'>Huyện / Thành phố</label>
                <select
                  value={formData.provinceId || ''}
                  onChange={(e) => setFormData({ ...formData, provinceId: e.target.value })}
                  className='w-full rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#E07B39]/20'
                >
                  {provinces.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='mb-2 block text-sm font-bold text-slate-700'>Mô tả ngắn</label>
                <textarea
                  required
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className='w-full resize-none rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#E07B39]/20'
                />
              </div>

              <div>
                <label className='mb-2 block text-sm font-bold text-slate-700'>Mô tả chi tiết</label>
                <textarea
                  rows={4}
                  value={formData.longDescription || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      longDescription: e.target.value
                    })
                  }
                  className='w-full resize-none rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#E07B39]/20'
                />
              </div>

              <div className='flex gap-4 pt-4'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='flex-1 rounded-2xl bg-slate-50 px-6 py-4 font-bold text-slate-500 transition-all hover:bg-slate-100'
                >
                  Hủy
                </button>
                <button
                  type='submit'
                  disabled={isSaving}
                  className='flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#E07B39] px-6 py-4 font-bold text-white shadow-lg shadow-[#E07B39]/20 transition-all hover:bg-[#c66a2e] disabled:opacity-50'
                >
                  {isSaving && <Loader2 className='animate-spin' size={20} />}
                  Lưu địa điểm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
