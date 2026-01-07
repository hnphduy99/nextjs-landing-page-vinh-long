"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Smile, Users, Calendar, History, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  historyHero,
  historyTimeline,
  peopleValues,
  culturalFestivals,
} from "@/constants/history-festivals-data";

export default function HistoryPage() {
  const iconMap = {
    Heart: Heart,
    Smile: Smile,
    Users: Users,
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1596402184320-417d717867cd?q=80&w=2400"
            alt="Vĩnh Long History"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-sm font-semibold mb-6 uppercase tracking-wider"
            >
              Lịch sử & Con người
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-7xl font-bold mb-8 font-serif"
            >
              {historyHero.subtitle}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 font-light italic leading-relaxed"
            >
              "{historyHero.description}"
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 items-center flex justify-center gap-3">
              <History className="text-[#E07B39]" /> Dòng Thời Gian Lịch Sử
            </h2>
            <div className="w-24 h-1 bg-[#E07B39] mx-auto rounded-full" />
          </div>

          <div className="relative">
            {/* Center Line for Desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

            {historyTimeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col lg:flex-row items-center mb-24 last:mb-0 ${
                  index % 2 === 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Dot */}
                <div className="hidden lg:block absolute left-1/2 top-10 w-4 h-4 rounded-full bg-[#E07B39] border-4 border-[#FFF8F0] -translate-x-1/2 z-10 shadow-lg shadow-[#E07B39]/30" />

                {/* Content */}
                <div className="w-full lg:w-1/2 px-6 lg:px-12">
                  <div
                    className={`flex flex-col ${
                      index % 2 === 0 ? "lg:items-start" : "lg:items-end"
                    } text-center ${
                      index % 2 === 0 ? "lg:text-left" : "lg:text-right"
                    }`}
                  >
                    <span className="text-4xl font-black text-[#E07B39]/20 font-serif mb-2 tracking-tighter">
                      {item.year}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Image */}
                <div className="w-full lg:w-1/2 px-6 lg:px-12 mt-8 lg:mt-0">
                  <div className="relative h-64 md:h-80 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* People Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#E07B39]/5 -skew-x-12 translate-x-1/3" />
        <div className="container-custom relative z-10 text-center">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Tâm Hồn <span className="text-[#E07B39]">Người Vĩnh Long</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nét đẹp văn hóa được kết tinh từ lòng hào sảng của đất, sự hiền
              hòa của nước.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {peopleValues.map((value, index) => {
              const Icon = iconMap[value.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-[#FFF8F0] p-10 rounded-[2.5rem] border border-[#E07B39]/10 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-[#E07B39] mb-8 shadow-lg group-hover:bg-[#E07B39] group-hover:text-white transition-colors duration-500 mx-auto">
                    <Icon size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Festivals Section */}
      <section className="py-24 bg-[#FFF8F0]">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 items-center flex justify-center gap-3">
              <Calendar className="text-[#4CAF50]" /> Lễ Hội & Văn Hóa Độc Đáo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cùng hòa mình vào không khí hội hè đặc trưng, nơi di sản hòa quyện
              cùng nhịp sống sông nước náo nhiệt.
            </p>
          </div>

          <div className="space-y-16">
            {culturalFestivals.map((festival, index) => (
              <motion.div
                key={festival.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col lg:flex-row items-stretch overflow-hidden rounded-[3rem] shadow-2xl bg-white ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto">
                  <Image
                    src={festival.image}
                    alt={festival.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
                </div>
                <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                  <span className="text-[#E07B39] font-bold uppercase tracking-widest text-sm mb-4 block">
                    {festival.tagline}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 underline decoration-[#E07B39]/20 underline-offset-8 decoration-8">
                    {festival.name}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {festival.description}
                  </p>
                  <button className="self-start flex items-center gap-2 text-gray-900 font-bold hover:gap-4 transition-all duration-300">
                    Bắt đầu hành trình{" "}
                    <MapPin size={20} className="text-[#E07B39]" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Quote */}
      <section className="py-20 bg-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-16 rounded-[4rem] bg-gradient-to-br from-[#E07B39] to-[#4CAF50] text-white overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
                "Hào khí ngàn xưa tỏa sáng hôm nay,
                <br />
                Vĩnh Long - Đất lành chim đậu."
              </h3>
              <p className="text-white/80 text-xl">
                Một hành trình không chỉ đến để ngắm nhìn, mà đến để cảm nhận
                một tâm hồn Việt hào sảng.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
