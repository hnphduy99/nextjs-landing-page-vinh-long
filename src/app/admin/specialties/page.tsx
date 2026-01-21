'use client';

import ImageUpload from '@/components/admin/ImageUpload';
import apiClient from '@/lib/api-client';
import { Edit2, Image as ImageIcon, Loader2, Plus, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Province {
  id: string;
  name: string;
}

interface Specialty {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  origin: string;
  description?: string;
  taste?: string;
  provinceId: string;
}

export default function AdminSpecialties() {
  const [items, setItems] = useState<Specialty[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Specialty | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<Partial<Specialty>>({
    name: '',
    category: '',
    origin: '',
    description: '',
    taste: '',
    imageUrl: '',
    provinceId: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [specs, provs] = await Promise.all([
        apiClient.get('/api/admin/specialties'),
        apiClient.get('/api/admin/provinces')
      ]);
      setItems(specs);
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
    if (!confirm('Xóa đặc sản này?')) return;
    try {
      await apiClient.delete(`/api/admin/specialties?id=${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error: any) {
      alert(error.message || 'Lỗi khi xóa');
    }
  };

  const handleOpenModal = (item: Specialty | null = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        category: 'Trái cây',
        origin: 'Vĩnh Long',
        description: '',
        taste: '',
        imageUrl: '',
        provinceId: provinces[0]?.id || ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingItem) {
        await apiClient.patch('/api/admin/specialties', formData);
      } else {
        await apiClient.post('/api/admin/specialties', formData);
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
          <h2 className='text-3xl font-bold text-slate-900'>Quản lý đặc sản</h2>
          <p className='mt-1 text-slate-500'>Các món ăn và trái cây nổi tiếng của vùng đất Vĩnh Long.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className='flex items-center gap-2 rounded-2xl bg-[#4CAF50] px-6 py-3 font-bold text-white shadow-lg shadow-[#4CAF50]/20 transition-all hover:scale-105'
        >
          <Plus size={20} /> Thêm đặc sản
        </button>
      </div>

      <div className='overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-sm'>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse text-left'>
            <thead className='border-b border-slate-100 bg-slate-50'>
              <tr>
                <th className='px-8 py-5 text-sm font-bold text-slate-700'>Hình ảnh</th>
                <th className='px-8 py-5 text-sm font-bold text-slate-700'>Tên đặc sản</th>
                <th className='px-8 py-5 text-sm font-bold text-slate-700'>Loại</th>
                <th className='px-8 py-5 text-sm font-bold text-slate-700'>Xuất xứ</th>
                <th className='px-8 py-5 text-right text-sm font-bold text-slate-700'>Thao tác</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-50'>
              {items.map((item) => (
                <tr key={item.id} className='transition-colors hover:bg-slate-50/50'>
                  <td className='px-8 py-4'>
                    <div className='relative h-16 w-16 overflow-hidden rounded-xl shadow-sm'>
                      {item.imageUrl ? (
                        <Image src={item.imageUrl} alt={item.name} fill className='object-cover' />
                      ) : (
                        <div className='flex h-full w-full items-center justify-center bg-slate-100 text-slate-400'>
                          <ImageIcon size={24} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className='px-8 py-4 text-base font-bold text-slate-900'>{item.name}</td>
                  <td className='px-8 py-4 text-sm text-slate-500 capitalize italic'>{item.category}</td>
                  <td className='px-8 py-4 text-sm text-slate-500'>{item.origin}</td>
                  <td className='px-8 py-4 text-right'>
                    <div className='flex justify-end gap-2'>
                      <button
                        onClick={() => handleOpenModal(item)}
                        className='rounded-xl p-3 text-slate-400 transition-all hover:bg-blue-50 hover:text-blue-500'
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className='rounded-xl p-3 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500'
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm'>
          <div className='animate-in fade-in zoom-in w-full max-w-2xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl duration-200'>
            <div className='flex items-center justify-between border-b border-slate-100 bg-slate-50 px-8 py-6'>
              <h3 className='text-xl font-bold text-slate-900'>
                {editingItem ? 'Chỉnh sửa đặc sản' : 'Thêm đặc sản mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className='text-slate-400 hover:text-slate-600'>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSave} className='custom-scrollbar max-h-[70vh] space-y-5 overflow-y-auto p-8'>
              <div className='grid gap-5 md:grid-cols-2'>
                <div>
                  <label className='mb-2 block text-sm font-bold text-slate-700'>Tên đặc sản</label>
                  <input
                    type='text'
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className='w-full rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#4CAF50]/20'
                    placeholder='VD: Bưởi Năm Roi'
                  />
                </div>
                <div>
                  <label className='mb-2 block text-sm font-bold text-slate-700'>Phân loại</label>
                  <input
                    type='text'
                    required
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className='w-full rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#4CAF50]/20'
                    placeholder='VD: Trái cây'
                  />
                </div>
              </div>

              <div className='grid gap-5 md:grid-cols-2'>
                <div>
                  <label className='mb-2 block text-sm font-bold text-slate-700'>Nguồn gốc</label>
                  <input
                    type='text'
                    required
                    value={formData.origin || ''}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    className='w-full rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#4CAF50]/20'
                    placeholder='VD: Bình Minh, Vĩnh Long'
                  />
                </div>
                <div>
                  <label className='mb-2 block text-sm font-bold text-slate-700'>Huyện quản lý</label>
                  <select
                    value={formData.provinceId || ''}
                    onChange={(e) => setFormData({ ...formData, provinceId: e.target.value })}
                    className='w-full rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#4CAF50]/20'
                  >
                    {provinces.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <ImageUpload
                value={formData.imageUrl || ''}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                onRemove={() => setFormData({ ...formData, imageUrl: '' })}
              />

              <div>
                <label className='mb-2 block text-sm font-bold text-slate-700'>Mô tả ngắn</label>
                <textarea
                  required
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className='w-full resize-none rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#4CAF50]/20'
                />
              </div>

              <div>
                <label className='mb-2 block text-sm font-bold text-slate-700'>Hương vị đặc trưng</label>
                <input
                  type='text'
                  value={formData.taste || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      taste: e.target.value
                    })
                  }
                  className='w-full rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#4CAF50]/20'
                  placeholder='VD: Ngọt thanh, thơm nồng'
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
                  className='flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#4CAF50] px-6 py-4 font-bold text-white shadow-lg shadow-[#4CAF50]/20 transition-all hover:bg-[#3d8b40] disabled:opacity-50'
                >
                  {isSaving && <Loader2 className='animate-spin' size={20} />}
                  Lưu đặc sản
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
