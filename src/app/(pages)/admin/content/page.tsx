'use client';

import ImageUpload from '@/components/admin/ImageUpload';
import apiClient from '@/lib/api-client';
import { Award, Edit2, Heart, History, Loader2, Plus, Sparkles, Trash2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type ContentType = 'milestones' | 'personalities' | 'features' | 'festivals';

interface ContentItem {
  id: string;
  year?: string;
  title?: string;
  name?: string;
  tagline?: string;
  description: string;
  imageUrl?: string;
  order: number;
}

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState<ContentType>('milestones');
  const [data, setData] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [formData, setFormData] = useState<Partial<ContentItem>>({});
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'milestones', label: 'Mốc lịch sử', icon: History },
    { id: 'personalities', label: 'Danh nhân', icon: Award },
    { id: 'features', label: 'Văn hóa', icon: Heart },
    { id: 'festivals', label: 'Lễ hội', icon: Sparkles }
  ] as const;

  const fetchContent = React.useCallback(() => {
    setLoading(true);
    apiClient
      .get(`/api/admin/content?type=${activeTab}`)
      .then((items) => {
        setData(items);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch content:', error);
        setLoading(false);
      });
  }, [activeTab]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa?')) return;
    try {
      await apiClient.delete(`/api/admin/content?type=${activeTab}&id=${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error: any) {
      alert(error.message || 'Lỗi khi xóa');
    }
  };

  const handleOpenModal = (item: ContentItem | null = null) => {
    setEditingItem(item);
    setFormData(item || { order: data.length + 1 });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const url = editingItem
        ? `/api/admin/content?type=${activeTab}&id=${editingItem.id}`
        : `/api/admin/content?type=${activeTab}`;

      if (editingItem) {
        await apiClient.patch(url, formData);
      } else {
        await apiClient.post(url, formData);
      }

      setIsModalOpen(false);
      fetchContent();
    } catch (error: any) {
      alert(error.message || 'Lỗi khi lưu');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='space-y-8'>
      <div className='flex items-end justify-between'>
        <div>
          <h2 className='text-3xl font-bold text-slate-900'>Quản lý nội dung</h2>
          <p className='mt-1 text-slate-500'>Chỉnh sửa thông tin lịch sử, con người và văn hóa.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className='flex items-center gap-2 rounded-2xl bg-[#E07B39] px-6 py-3 font-bold text-white shadow-lg shadow-[#E07B39]/20 transition-all hover:bg-[#c66a2e]'
        >
          <Plus size={20} />
          Thêm mới
        </button>
      </div>

      <div className='flex w-fit gap-4 rounded-2xl bg-slate-100 p-1'>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 font-bold transition-all ${
                activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className='rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm'>
        {loading ? (
          <div className='flex h-64 items-center justify-center'>
            <Loader2 className='animate-spin text-[#E07B39]' size={32} />
          </div>
        ) : (
          <div className='grid gap-4'>
            {data.map((item) => (
              <div
                key={item.id}
                className='group flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all hover:border-[#E07B39]/20'
              >
                <div>
                  <h4 className='font-bold text-slate-900'>
                    {activeTab === 'milestones' ? <span className='mr-2 text-[#E07B39]'>{item.year}</span> : ''}
                    {item.title || item.name}
                  </h4>
                  <p className='mt-1 text-sm text-slate-500'>{item.description}</p>
                </div>
                <div className='flex gap-2'>
                  <button
                    onClick={() => handleOpenModal(item)}
                    className='rounded-xl p-3 text-slate-400 transition-all hover:bg-blue-50 hover:text-blue-500'
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className='rounded-xl p-3 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500'
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
            {data.length === 0 && <p className='py-12 text-center text-slate-400'>Chưa có dữ liệu cho mục này.</p>}
          </div>
        )}
      </div>

      {/* Modal Tool */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm'>
          <div className='animate-in fade-in zoom-in w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-white shadow-2xl duration-200'>
            <div className='flex items-center justify-between border-b border-slate-100 bg-slate-50 px-8 py-6'>
              <h3 className='text-xl font-bold text-slate-900'>
                {editingItem ? 'Chỉnh sửa' : 'Thêm mới'} {tabs.find((t) => t.id === activeTab)?.label}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className='text-slate-400 hover:text-slate-600'>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSave} className='space-y-5 p-8'>
              {activeTab === 'milestones' && (
                <div>
                  <label className='mb-2 block text-sm font-bold text-slate-700'>Năm</label>
                  <input
                    type='text'
                    required
                    value={formData.year || ''}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className='w-full rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#E07B39]/20'
                    placeholder='VD: 1945'
                  />
                </div>
              )}

              {(activeTab === 'milestones' || activeTab === 'features' || activeTab === 'festivals') && (
                <div>
                  <label className='mb-2 block text-sm font-bold text-slate-700'>Tiêu đề</label>
                  <input
                    type='text'
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className='w-full rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#E07B39]/20'
                    placeholder='Nhập tiêu đề...'
                  />
                </div>
              )}

              {activeTab === 'personalities' && (
                <>
                  <div>
                    <label className='mb-2 block text-sm font-bold text-slate-700'>Họ và tên</label>
                    <input
                      type='text'
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className='w-full rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#E07B39]/20'
                      placeholder='VD: Võ Văn Kiệt'
                    />
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-bold text-slate-700'>Chức vụ/Danh hiệu</label>
                    <input
                      type='text'
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className='w-full rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#E07B39]/20'
                      placeholder='VD: Nguyên Thủ tướng Chính phủ'
                    />
                  </div>
                </>
              )}

              {activeTab === 'festivals' && (
                <div>
                  <label className='mb-2 block text-sm font-bold text-slate-700'>Tagline</label>
                  <input
                    type='text'
                    value={formData.tagline || ''}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className='w-full rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#E07B39]/20'
                    placeholder='VD: Nhịp đập cùng dòng Cửu Long'
                  />
                </div>
              )}

              <div>
                <label className='mb-2 block text-sm font-bold text-slate-700'>Mô tả</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className='w-full resize-none rounded-xl border-none bg-slate-50 px-5 py-3 font-medium text-slate-900 transition-all focus:ring-2 focus:ring-[#E07B39]/20'
                  placeholder='Nhập mô tả chi tiết...'
                />
              </div>

              <ImageUpload
                value={formData.imageUrl || ''}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                onRemove={() => setFormData({ ...formData, imageUrl: '' })}
              />

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
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
