"use client";

import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface SiteSetting {
  key: string;
  value: string;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data: SiteSetting[]) => {
        const settingsMap = data.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.key]: curr.value,
          }),
          {}
        );
        setSettings(settingsMap);
        setLoading(false);
      });
  }, []);

  const handleUpdate = async (key: string, value: string) => {
    setSaving(key);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setSettings((prev) => ({ ...prev, [key]: value }));
    } catch (error) {
      alert("Lỗi khi cập nhật cài đặt");
    } finally {
      setSaving(null);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-[#E07B39]" size={32} />
      </div>
    );

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Cấu hình hệ thống</h2>
        <p className="text-slate-500 mt-1">
          Quản lý các thông tin cơ bản và giao diện chính.
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 space-y-6">
          {/* Site Title */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">
              Tiêu đề trang web (Site Title)
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                defaultValue={settings.site_title || ""}
                onBlur={(e) => handleUpdate("site_title", e.target.value)}
                className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#E07B39] transition-all"
              />
              {saving === "site_title" && (
                <Loader2 className="animate-spin mt-4" size={20} />
              )}
            </div>
          </div>

          {/* Site Slogan */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Slogan</label>
            <div className="flex gap-4">
              <input
                type="text"
                defaultValue={settings.site_slogan || ""}
                onBlur={(e) => handleUpdate("site_slogan", e.target.value)}
                className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#E07B39] transition-all"
              />
              {saving === "site_slogan" && (
                <Loader2 className="animate-spin mt-4" size={20} />
              )}
            </div>
          </div>

          {/* Hero Content - Simplified for this demo, usually would be a JSON editor */}
          <div className="pt-6 border-t border-slate-50">
            <h4 className="font-bold text-slate-900 mb-4">
              Mô tả giới thiệu (Hero Description)
            </h4>
            <div className="space-y-2">
              <textarea
                defaultValue={settings.site_description || ""}
                rows={4}
                onBlur={(e) => handleUpdate("site_description", e.target.value)}
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#E07B39] transition-all"
              />
              {saving === "site_description" && (
                <Loader2 className="animate-spin" size={20} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
