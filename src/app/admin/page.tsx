"use client";

import { motion } from "framer-motion";
import { Eye, MapPin, MessageSquare, Utensils } from "lucide-react";

const stats = [
  {
    label: "Tổng lượt xem",
    value: "12,840",
    icon: Eye,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    label: "Địa điểm",
    value: "12",
    icon: MapPin,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    label: "Đặc sản",
    value: "8",
    icon: Utensils,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    label: "Phản hồi",
    value: "48",
    icon: MessageSquare,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Chào mừng trở lại</h2>
        <p className="text-slate-500 mt-1">
          Hệ thống quản trị nội dung Landing Page Vĩnh Long.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow"
          >
            <div
              className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}
            >
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">
                {stat.value}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6 font-primary">
            Hoạt động gần đây
          </h3>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 py-4 border-b border-slate-50 last:border-0"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <MapPin size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">
                    Đã cập nhật thông tin "Vương quốc đỏ Mang Thít"
                  </p>
                  <p className="text-xs text-slate-400">2 giờ trước</p>
                </div>
                <button className="text-sm font-bold text-[#E07B39] hover:underline">
                  Xem
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Trạng thái hệ thống
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-between">
              <span className="text-sm font-medium text-green-700">
                Supabase Connection
              </span>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            <div className="p-4 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-between">
              <span className="text-sm font-medium text-green-700">
                Vercel Deployment
              </span>
              <span className="text-xs font-bold text-green-600 uppercase">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
