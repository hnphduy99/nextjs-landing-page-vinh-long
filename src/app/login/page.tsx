"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin");
      } else {
        setError(data.error || "Đăng nhập thất bại");
      }
    } catch (err) {
      setError("Lỗi kết nối máy chủ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Visual Side */}
      <div className="hidden lg:block relative overflow-hidden bg-slate-900">
        <Image
          src="https://images.unsplash.com/photo-1596402184320-417d717867cd?q=80&w=2400"
          alt="Vĩnh Long"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        <div className="absolute bottom-20 left-20 right-20 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-white mb-6 font-primary">
              Quản trị viên <br />
              <span className="text-[#E07B39]">Đất Vĩnh</span>
            </h1>
            <p className="text-xl text-white/80 max-w-lg leading-relaxed">
              Chào mừng bạn trở lại với hệ thống quản lý nội dung du lịch tỉnh
              Vĩnh Long. Mỗi đóng góp của bạn đều giúp vẻ đẹp quê hương vươn xa
              hơn.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex items-center justify-center p-8 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100"
        >
          <div className="mb-10 text-center">
            <div className="w-16 h-16 bg-[#FFF8F0] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#E07B39]">
              <Lock size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              Đăng nhập Admin
            </h2>
            <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-bold">
              Vĩnh Long - Về là thương
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-2">
                Email của bạn
              </label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#E07B39] transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="duyhuynh.work99@gmail.com"
                  className="w-full bg-slate-50 border-none rounded-2xl px-14 py-4 focus:ring-2 focus:ring-[#E07B39]/20 focus:bg-white transition-all outline-none text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-2">
                Mật khẩu
              </label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#E07B39] transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border-none rounded-2xl px-14 py-4 focus:ring-2 focus:ring-[#E07B39]/20 focus:bg-white transition-all outline-none text-slate-900"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 text-red-500 p-4 rounded-xl text-sm border border-red-100 flex items-center gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E07B39] hover:bg-[#c96e33] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-[#E07B39]/25 hover:shadow-xl hover:translate-y-[-2px] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:translate-y-0"
            >
              {loading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <>
                  Bắt đầu làm việc <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-10 text-slate-400 text-sm">
            Hỗ trợ kỹ thuật?{" "}
            <a href="#" className="text-[#E07B39] font-bold hover:underline">
              Liên hệ IT
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
