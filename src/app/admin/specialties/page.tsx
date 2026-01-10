"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Loader2, Tag } from "lucide-react";
import Image from "next/image";

interface Specialty {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  origin: string;
}

export default function AdminSpecialties() {
  const [items, setItems] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/specialties")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Xóa đặc sản này?")) return;
    try {
      const res = await fetch(`/api/admin/specialties?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      alert("Lỗi khi xóa");
    }
  };

  if (loading)
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
        <button className="flex items-center gap-2 bg-[#4CAF50] text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-[#4CAF50]/20 hover:scale-105 transition-all">
          <Plus size={20} /> Thêm đặc sản
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
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
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-8 py-4 font-bold text-slate-900">
                  {item.name}
                </td>
                <td className="px-8 py-4 text-sm text-slate-500 capitalize">
                  {item.category}
                </td>
                <td className="px-8 py-4 text-sm text-slate-500">
                  {item.origin}
                </td>
                <td className="px-8 py-4 text-right">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
