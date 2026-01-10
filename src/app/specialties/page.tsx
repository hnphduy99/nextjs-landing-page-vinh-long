"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Utensils,
  Sprout,
  Star,
  Heart,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  specialtyCategories,
  specialtiesHero,
} from "@/constants/specialties-data";

export default function SpecialtiesPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2400"
            alt="Vĩnh Long Specialties"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8F0]/50 via-[#FFF8F0] to-[#FFF8F0]" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#E07B39]/10 text-[#E07B39] font-bold text-sm mb-6 uppercase tracking-widest border border-[#E07B39]/20">
              Ẩm thực & Đặc sản
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-serif underline decoration-[#E07B39]/30 underline-offset-8">
              {specialtiesHero.title}
            </h1>
            <p className="text-xl md:text-2xl text-[#4CAF50] font-medium mb-8">
              {specialtiesHero.subtitle}
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {specialtiesHero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Sections */}
      {specialtyCategories.map((category, catIndex) => (
        <section
          key={category.id}
          className={`py-24 ${
            catIndex % 2 === 0 ? "bg-white" : "bg-[#FFF8F0]"
          }`}
        >
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-16 border-l-8 border-[#E07B39] pl-8"
            >
              <div className="flex items-center gap-4 mb-2 text-[#E07B39]">
                {category.id === "fruits" ? (
                  <Sprout size={32} />
                ) : (
                  <Utensils size={32} />
                )}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase tracking-tight">
                  {category.title}
                </h2>
              </div>
              <p className="text-xl text-gray-600 italic">
                {category.description}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {category.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 h-full flex flex-col hover:shadow-2xl transition-all duration-500">
                    {/* Image Area */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#E07B39] uppercase border border-[#E07B39]/20 shadow-sm flex items-center gap-1">
                          <MapPin size={10} /> {item.origin}
                        </span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#E07B39] transition-colors">
                          {item.name}
                        </h3>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={12}
                              className="fill-[#E07B39] text-[#E07B39]"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 flex-grow flex flex-col">
                      <div className="mb-6 bg-[#FFF8F0] p-4 rounded-2xl border-l-4 border-[#4CAF50]">
                        <p className="text-gray-700 font-medium italic mb-1 text-sm flex items-center gap-2">
                          <Heart size={14} className="text-red-500" /> Vị ngon
                          khó cưỡng:
                        </p>
                        <p className="text-[#4CAF50] font-bold text-sm tracking-wide">
                          {item.taste}
                        </p>
                      </div>

                      <p className="text-gray-600 line-clamp-4 leading-relaxed text-sm mb-6">
                        {item.longDescription}
                      </p>

                      <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-gray-400 text-xs font-medium">
                          Click để xem chi tiết
                        </span>
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="w-10 h-10 rounded-full bg-[#E07B39] text-white flex items-center justify-center hover:bg-[#4CAF50] transition-colors shadow-lg"
                        >
                          <ArrowRight size={18} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Specialty Tips Section */}
      <section className="py-24 bg-gradient-to-br from-[#E07B39] to-[#E07B39]/90 text-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/20"
            >
              <Image
                src="https://images.unsplash.com/photo-1547516508-4c1f9c7c4ec3?q=80&w=2400"
                alt="Local Market"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>

            <div className="space-y-8">
              <h2 className="text-4xl font-bold">Mẹo Thưởng Thức Trọn Vẹn</h2>
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                  <h4 className="font-bold text-xl mb-2">
                    🍎 Trái cây tươi đúng mùa
                  </h4>
                  <p className="text-white/80 leading-relaxed text-sm">
                    Nên ghé thăm Vĩnh Long vào khoảng tháng 5 - tháng 7 dương
                    lịch để thưởng thức các loại trái cây vào mùa chín rộ nhất.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                  <h4 className="font-bold text-xl mb-2">🍽️ Ăn cơm tại vườn</h4>
                  <p className="text-white/80 leading-relaxed text-sm">
                    Món Cá tai tượng chiên xù sẽ ngon nhất khi thưởng thức ngay
                    tại các nhà vườn ở Cù lao An Bình, cùng với không gian xanh
                    mát và gió sông hiền hòa.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                  <h4 className="font-bold text-xl mb-2">🎁 Quà mang về</h4>
                  <p className="text-white/80 leading-relaxed text-sm">
                    Bánh tráng nem và khoai lang Bình Tân là những lựa chọn
                    tuyệt vời để làm quà biếu vì dễ bảo quản và vận chuyển đi
                    xa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
