"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Loader2,
  History,
  Award,
  Heart,
  Sparkles,
  X,
} from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

type ContentType = "milestones" | "personalities" | "features" | "festivals";

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
  const [activeTab, setActiveTab] = useState<ContentType>("milestones");
  const [data, setData] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [formData, setFormData] = useState<Partial<ContentItem>>({});
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: "milestones", label: "Mốc lịch sử", icon: History },
    { id: "personalities", label: "Danh nhân", icon: Award },
    { id: "features", label: "Văn hóa", icon: Heart },
    { id: "festivals", label: "Lễ hội", icon: Sparkles },
  ] as const;

  const fetchContent = React.useCallback(() => {
    setLoading(true);
    fetch(`/api/admin/content?type=${activeTab}`)
      .then((res) => res.json())
      .then((items) => {
        setData(items);
        setLoading(false);
      });
  }, [activeTab]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa?")) return;
    try {
      const res = await fetch(`/api/admin/content?type=${activeTab}&id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) setData(data.filter((item) => item.id !== id));
    } catch {
      alert("Lỗi khi xóa");
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

      const res = await fetch(url, {
        method: editingItem ? "PATCH" : "POST",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchContent();
      }
    } catch {
      alert("Lỗi khi lưu");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Quản lý nội dung
          </h2>
          <p className="text-slate-500 mt-1">
            Chỉnh sửa thông tin lịch sử, con người và văn hóa.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#E07B39] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#c66a2e] transition-all shadow-lg shadow-[#E07B39]/20"
        >
          <Plus size={20} />
          Thêm mới
        </button>
      </div>

      <div className="flex gap-4 p-1 bg-slate-100 rounded-2xl w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="animate-spin text-[#E07B39]" size={32} />
          </div>
        ) : (
          <div className="grid gap-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-[#E07B39]/20 transition-all"
              >
                <div>
                  <h4 className="font-bold text-slate-900">
                    {activeTab === "milestones" ? (
                      <span className="text-[#E07B39] mr-2">{item.year}</span>
                    ) : (
                      ""
                    )}
                    {item.title || item.name}
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">
                    {item.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="p-3 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
            {data.length === 0 && (
              <p className="text-center py-12 text-slate-400">
                Chưa có dữ liệu cho mục này.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Modal Tool */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900">
                {editingItem ? "Chỉnh sửa" : "Thêm mới"}{" "}
                {tabs.find((t) => t.id === activeTab)?.label}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-5">
              {activeTab === "milestones" && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Năm
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.year || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#E07B39]/20 transition-all font-medium text-slate-900"
                    placeholder="VD: 1945"
                  />
                </div>
              )}

              {(activeTab === "milestones" ||
                activeTab === "features" ||
                activeTab === "festivals") && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Tiêu đề
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#E07B39]/20 transition-all font-medium text-slate-900"
                    placeholder="Nhập tiêu đề..."
                  />
                </div>
              )}

              {activeTab === "personalities" && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#E07B39]/20 transition-all font-medium text-slate-900"
                      placeholder="VD: Võ Văn Kiệt"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Chức vụ/Danh hiệu
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#E07B39]/20 transition-all font-medium text-slate-900"
                      placeholder="VD: Nguyên Thủ tướng Chính phủ"
                    />
                  </div>
                </>
              )}

              {activeTab === "festivals" && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.tagline || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, tagline: e.target.value })
                    }
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#E07B39]/20 transition-all font-medium text-slate-900"
                    placeholder="VD: Nhịp đập cùng dòng Cửu Long"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Mô tả
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#E07B39]/20 transition-all font-medium text-slate-900 resize-none"
                  placeholder="Nhập mô tả chi tiết..."
                />
              </div>

              <ImageUpload
                value={formData.imageUrl || ""}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                onRemove={() => setFormData({ ...formData, imageUrl: "" })}
              />

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 transition-all"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-white bg-[#E07B39] hover:bg-[#c66a2e] transition-all shadow-lg shadow-[#E07B39]/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSaving && <Loader2 className="animate-spin" size={20} />}
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
