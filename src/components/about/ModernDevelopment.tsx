"use client";

import { motion } from "framer-motion";
import { TrendingUp, Factory, GraduationCap, HeartPulse } from "lucide-react";
import { modernDevelopment } from "@/constants/about-data";

const iconMap = {
  "trending-up": TrendingUp,
  factory: Factory,
  "graduation-cap": GraduationCap,
  "heart-pulse": HeartPulse,
};

export default function ModernDevelopment() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#E07B39] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4CAF50] rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {modernDevelopment.title}
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {modernDevelopment.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {modernDevelopment.achievements.map((achievement, index) => {
            const Icon = iconMap[achievement.icon as keyof typeof iconMap];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 card-hover h-full">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-gradient-to-br from-[#E07B39] to-[#4CAF50] rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                  >
                    <Icon size={32} className="text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white/90 mb-4">
                    {achievement.title}
                  </h3>

                  {/* Value */}
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E07B39] to-[#4CAF50]">
                      {achievement.value}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 leading-relaxed">
                    {achievement.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#E07B39]/20 to-[#4CAF50]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Tầm Nhìn 2030
            </h3>
            <p className="text-lg md:text-xl text-white/80 max-w-4xl">
              Phấn đấu đưa Vĩnh Long trở thành tỉnh phát triển khá của vùng Đồng
              bằng sông Cửu Long, với nền kinh tế phát triển bền vững, văn hóa -
              xã hội tiến보, môi trường sinh thái được bảo vệ, đời sống nhân dân
              ngày càng được nâng cao.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
