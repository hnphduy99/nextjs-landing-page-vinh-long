"use client";
import { Eye, MapPin, Sparkles, Utensils, Loader2, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface StatsData {
  destinations: number;
  specialties: number;
  milestones: number;
  festivals: number;
  views: number;
}

interface Activity {
  id: string;
  name: string;
  type: string;
  action: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const [data, setData] = useState<StatsData | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/stats").then((res) => res.json()),
      fetch("/api/admin/activity").then((res) => res.json()),
    ]).then(([stats, activityData]) => {
      setData(stats);
      setActivities(activityData);
      setLoading(false);
    });
  }, []);

  const statsFields = [
    {
      label: "Tổng lượt xem",
      value: data?.views?.toLocaleString() || "0",
      icon: Eye,
      color: "text-blue-600",
      bg: "bg-blue-100",
      subLabel: "Vercel Analytics",
    },
    {
      label: "Địa điểm",
      value: data?.destinations || "0",
      icon: MapPin,
      color: "text-orange-600",
      bg: "bg-orange-100",
      subLabel: "Database",
    },
    {
      label: "Đặc sản",
      value: data?.specialties || "0",
      icon: Utensils,
      color: "text-green-600",
      bg: "bg-green-100",
      subLabel: "Database",
    },
    {
      label: "Lễ hội",
      value: data?.festivals || "0",
      icon: Sparkles,
      color: "text-purple-600",
      bg: "bg-purple-100",
      subLabel: "Database",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-[#E07B39]" size={32} />
      </div>
    );
  }

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
        {statsFields.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div
              className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}
            >
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                {stat.label}
              </p>
              <h3 className="text-2xl font-black text-slate-900">
                {stat.value}
              </h3>
              <p className="text-[10px] text-slate-400 mt-1">{stat.subLabel}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6 font-primary">
            Hoạt động gần đây
          </h3>
          <div className="space-y-6">
            {activities.length > 0 ? (
              activities.map((activity, idx) => (
                <div
                  key={`${activity.type}-${activity.id}-${idx}`}
                  className="flex items-center gap-4 py-4 border-b border-slate-50 last:border-0"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <Clock size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      Đã cập nhật {activity.action} &quot;{activity.name}&quot;
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(activity.updatedAt).toLocaleString("vi-VN")}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-center py-8">
                Chưa có hoạt động nào được ghi lại.
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Trạng thái hệ thống
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-between">
              <span className="text-sm font-medium text-green-700">
                Database (Supabase)
              </span>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-between">
              <span className="text-sm font-medium text-blue-700">
                Analytics (Vercel)
              </span>
              <span className="text-xs font-bold text-blue-600 uppercase">
                Connected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
