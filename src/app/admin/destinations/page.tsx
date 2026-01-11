"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  Image as ImageIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import ImageUpload from "@/components/admin/ImageUpload";

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
}

export default function AdminDestinations() {
  const [items, setItems] = useState<Destination[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Destination | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<Partial<Destination>>({
    name: "",
    category: "",
    slogan: "",
    description: "",
    longDescription: "",
    imageUrl: "",
    provinceId: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [destRes, provRes] = await Promise.all([
        fetch("/api/admin/destinations"),
        fetch("/api/admin/provinces"),
      ]);
      const dests = await destRes.json();
      const provs = await provRes.json();
      setItems(dests);
      setProvinces(provs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa địa điểm này?")) return;
    try {
      const res = await fetch(`/api/admin/destinations?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) setItems(items.filter((item) => item.id !== id));
    } catch {
      alert("Lỗi khi xóa");
    }
  };

  const handleOpenModal = (item: Destination | null = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        category: "Du lịch sinh thái",
        slogan: "",
        description: "",
        longDescription: "",
        imageUrl: "",
        provinceId: provinces[0]?.id || "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch(
        editingItem ? "/api/admin/destinations" : "/api/admin/destinations",
        {
          method: editingItem ? "PATCH" : "POST",
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        setIsModalOpen(false);
        fetchData();
      }
    } catch {
      alert("Lỗi khi lưu");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading && items.length === 0)
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-[#E07B39]" size={32} />
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Quản lý điểm đến
          </h2>
          <p className="text-slate-500 mt-1">
            Danh sách các danh lam thắng cảnh tại Vĩnh Long.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#E07B39] text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-[#E07B39]/20 hover:scale-105 transition-all"
        >
          <Plus size={20} /> Thêm mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 group hover:border-[#E07B39]/20 transition-all"
          >
            <div className="relative h-48">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ImageIcon size={40} />
                </div>
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => handleOpenModal(item)}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-xl text-slate-600 hover:text-[#E07B39] transition-colors shadow-sm"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-xl text-slate-600 hover:text-red-500 transition-colors shadow-sm"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <span className="text-xs font-bold text-[#E07B39] uppercase tracking-wider">
                {item.category}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {item.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900">
                {editingItem ? "Chỉnh sửa địa điểm" : "Thêm địa điểm mới"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>
            <form
              onSubmit={handleSave}
              className="p-8 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar"
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Tên địa điểm
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#E07B39]/20 transition-all font-medium text-slate-900"
                    placeholder="VD: Cù lao An Bình"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Danh mục
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#E07B39]/20 transition-all font-medium text-slate-900"
                    placeholder="VD: Du lịch sinh thái"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Slogan / Câu hiệu
                </label>
                <input
                  type="text"
                  value={formData.slogan || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, slogan: e.target.value })
                  }
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#E07B39]/20 transition-all font-medium text-slate-900"
                  placeholder="Nhập slogan ngắn gọn..."
                />
              </div>

              <ImageUpload
                value={formData.imageUrl || ""}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                onRemove={() => setFormData({ ...formData, imageUrl: "" })}
              />

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Huyện / Thành phố
                </label>
                <select
                  value={formData.provinceId || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, provinceId: e.target.value })
                  }
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#E07B39]/20 transition-all font-medium text-slate-900"
                >
                  {provinces.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Mô tả ngắn
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#E07B39]/20 transition-all font-medium text-slate-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Mô tả chi tiết
                </label>
                <textarea
                  rows={4}
                  value={formData.longDescription || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      longDescription: e.target.value,
                    })
                  }
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#E07B39]/20 transition-all font-medium text-slate-900 resize-none"
                />
              </div>

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
