"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface Destination {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

export default function AdminDestinations() {
  const [items, setItems] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/destinations")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa địa điểm này?")) return;
    try {
      const res = await fetch(`/api/admin/destinations?id=${id}`, {
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
          <h2 className="text-3xl font-bold text-slate-900">
            Quản lý điểm đến
          </h2>
          <p className="text-slate-500 mt-1">
            Danh sách các danh lam thắng cảnh tại Vĩnh Long.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#E07B39] text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-[#E07B39]/20 hover:scale-105 transition-all">
          <Plus size={20} /> Thêm mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 group"
          >
            <div className="relative h-48">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-xl text-slate-600 hover:text-[#E07B39] transition-colors shadow-sm">
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
    </div>
  );
}
