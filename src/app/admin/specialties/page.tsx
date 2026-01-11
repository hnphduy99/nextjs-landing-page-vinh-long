"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Loader2,
  X,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import ImageUpload from "@/components/admin/ImageUpload";

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
    name: "",
    category: "",
    origin: "",
    description: "",
    taste: "",
    imageUrl: "",
    provinceId: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [specRes, provRes] = await Promise.all([
        fetch("/api/admin/specialties"),
        fetch("/api/admin/provinces"),
      ]);
      const specs = await specRes.json();
      const provs = await provRes.json();
      setItems(specs);
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
    if (!confirm("Xóa đặc sản này?")) return;
    try {
      const res = await fetch(`/api/admin/specialties?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) setItems(items.filter((item) => item.id !== id));
    } catch {
      alert("Lỗi khi xóa");
    }
  };

  const handleOpenModal = (item: Specialty | null = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        category: "Trái cây",
        origin: "Vĩnh Long",
        description: "",
        taste: "",
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
      const res = await fetch("/api/admin/specialties", {
        method: editingItem ? "PATCH" : "POST",
        body: JSON.stringify(formData),
      });

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
          <h2 className="text-3xl font-bold text-slate-900">Quản lý đặc sản</h2>
          <p className="text-slate-500 mt-1">
            Các món ăn và trái cây nổi tiếng của vùng đất Vĩnh Long.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#4CAF50] text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-[#4CAF50]/20 hover:scale-105 transition-all"
        >
          <Plus size={20} /> Thêm đặc sản
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-sm font-bold text-slate-700">
                  Hình ảnh
                </th>
                <th className="px-8 py-5 text-sm font-bold text-slate-700">
                  Tên đặc sản
                </th>
                <th className="px-8 py-5 text-sm font-bold text-slate-700">
                  Loại
                </th>
                <th className="px-8 py-5 text-sm font-bold text-slate-700">
                  Xuất xứ
                </th>
                <th className="px-8 py-5 text-sm font-bold text-slate-700 text-right">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-8 py-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-sm">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                          <ImageIcon size={24} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-4 font-bold text-slate-900 text-base">
                    {item.name}
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-500 capitalize italic">
                    {item.category}
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-500">
                    {item.origin}
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="p-3 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
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
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900">
                {editingItem ? "Chỉnh sửa đặc sản" : "Thêm đặc sản mới"}
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
                    Tên đặc sản
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#4CAF50]/20 transition-all font-medium text-slate-900"
                    placeholder="VD: Bưởi Năm Roi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Phân loại
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#4CAF50]/20 transition-all font-medium text-slate-900"
                    placeholder="VD: Trái cây"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Nguồn gốc
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.origin || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, origin: e.target.value })
                    }
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#4CAF50]/20 transition-all font-medium text-slate-900"
                    placeholder="VD: Bình Minh, Vĩnh Long"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Huyện quản lý
                  </label>
                  <select
                    value={formData.provinceId || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, provinceId: e.target.value })
                    }
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#4CAF50]/20 transition-all font-medium text-slate-900"
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
                value={formData.imageUrl || ""}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                onRemove={() => setFormData({ ...formData, imageUrl: "" })}
              />

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
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#4CAF50]/20 transition-all font-medium text-slate-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Hương vị đặc trưng
                </label>
                <input
                  type="text"
                  value={formData.taste || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      taste: e.target.value,
                    })
                  }
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#4CAF50]/20 transition-all font-medium text-slate-900"
                  placeholder="VD: Ngọt thanh, thơm nồng"
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
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-white bg-[#4CAF50] hover:bg-[#3d8b40] transition-all shadow-lg shadow-[#4CAF50]/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSaving && <Loader2 className="animate-spin" size={20} />}
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
