"use client";

import { motion } from "framer-motion";
import { Map, Landmark, MapPin } from "lucide-react";
import { statsData } from "@/constants/data";

const iconMap = {
  map: Map,
  landmark: Landmark,
  "map-pin": MapPin,
};

export default function Stats() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Vĩnh Long trong con số
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Những thông tin cơ bản về vùng đất giữa hai dòng sông
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsData.map((stat, index) => {
            const Icon = iconMap[stat.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-[#FFF8F0] to-white p-8 rounded-2xl shadow-lg text-center card-hover"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#E07B39] to-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon size={32} className="text-white" />
                </div>
                <div className="text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-lg text-gray-600 mb-2">{stat.unit}</div>
                <div className="text-xl font-semibold text-gray-900">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
