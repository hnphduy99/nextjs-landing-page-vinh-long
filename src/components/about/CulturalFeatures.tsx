"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, BookOpen, Music, Sprout } from "lucide-react";
import { culturalFeatures } from "@/constants/about-data";

const iconMap = {
  heart: Heart,
  "book-open": BookOpen,
  music: Music,
  sprout: Sprout,
};

export default function CulturalFeatures() {
  return (
    <section className="section-padding bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFF8F0]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Đặc Điểm Nổi Bật
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Những nét văn hóa đặc trưng của vùng đất Vĩnh Long
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {culturalFeatures.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl card-hover h-full">
                  {/* Image Background */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    {/* Icon */}
                    <div className="absolute top-6 left-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg"
                      >
                        <Icon size={32} className="text-[#E07B39]" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#E07B39] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-gradient-to-br from-[#E07B39]/10 to-[#4CAF50]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
