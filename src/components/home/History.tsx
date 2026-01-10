"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  History as HistoryIcon,
  ShieldCheck,
  Map,
} from "lucide-react";

export default function History() {
  return (
    <section
      id="history"
      className="relative py-24 bg-slate-950 overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E07B39]/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4CAF50]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Visual Content (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden border-8 border-slate-900 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1596402184320-417d717867cd?q=80&w=2400"
                alt="Long Ho Dinh History"
                width={800}
                height={1000}
                className="w-full h-[600px] object-cover contrast-125 brightness-75 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex items-center gap-3 text-[#E07B39] mb-4">
                  <ShieldCheck size={32} />
                  <span className="text-sm font-bold tracking-[0.3em] uppercase">
                    Hào Khí Long Hồ
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2 font-serif italic">
                  "Địa Linh Nhân Kiệt"
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Vùng đất hội tụ linh khí của dòng Cửu Long, nơi sinh ra những
                  anh kiệt lỗi lạc của dân tộc.
                </p>
              </div>
            </div>

            {/* Floating Stats or Years */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 -right-10 bg-white p-8 rounded-[2rem] shadow-2xl z-20 hidden md:block"
            >
              <div className="text-[#E07B39] font-black text-5xl font-serif">
                1732
              </div>
              <div className="text-slate-500 font-bold text-sm tracking-widest uppercase mt-2">
                Năm Khai Sinh
              </div>
            </motion.div>
          </motion.div>

          {/* Textual Content (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-10"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E07B39]/30 bg-[#E07B39]/10 text-[#E07B39] text-xs font-bold uppercase tracking-widest mb-8"
              >
                <HistoryIcon size={16} /> Lịch sử & Con người
              </motion.div>

              <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight font-serif">
                Dấu Chân Trên <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#E07B39] to-[#FFAB85]">
                  Đất Thiêng Long Hồ
                </span>
              </h2>

              <p className="text-slate-400 text-xl leading-relaxed mb-10 max-w-2xl">
                Được hình thành từ năm 1732 với tên gọi dinh Long Hồ, Vĩnh Long
                là vùng đất của những danh nhân và những trang sử hào hùng. Nơi
                đây không chỉ có hào khí của tiền nhân đi mở cõi mà còn là quê
                hương của những nhà lãnh đạo lỗi lạc của dân tộc.
              </p>

              <div className="grid sm:grid-cols-2 gap-8 mb-12 text-white">
                <div className="space-y-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-[#E07B39] group-hover:bg-[#E07B39] group-hover:text-white transition-all">
                    <Map size={28} />
                  </div>
                  <h4 className="text-xl font-bold">Vùng Đất Địa Linh</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Vị thế chiến lược giữa lòng đồng bằng sông Cửu Long, nơi hội
                    thụ tinh hoa đất trời.
                  </p>
                </div>
                <div className="space-y-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-[#4CAF50] group-hover:bg-[#4CAF50] group-hover:text-white transition-all">
                    <Users size={28} className="hidden" />{" "}
                    {/* Using simple icon mapping */}
                    <HistoryIcon size={28} />
                  </div>
                  <h4 className="text-xl font-bold">Tinh Thần Nhân Kiệt</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Truyền thống hiếu học, lòng quả cảm và tâm hồn nghệ sĩ lớn
                    đã làm nên danh tiếng Vĩnh Long.
                  </p>
                </div>
              </div>

              <Link
                href="/history"
                className="inline-flex items-center gap-4 px-10 py-5 bg-[#E07B39] hover:bg-[#E07B39]/90 text-white font-bold rounded-full transition-all group shadow-xl shadow-[#E07B39]/20"
              >
                Khám phá hành trình 300 năm{" "}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Simple Helper for Icons
function Users({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
