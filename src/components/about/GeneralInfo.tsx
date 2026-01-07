"use client";

import { motion } from "framer-motion";
import {
  Map,
  MapPin,
  Users,
  Building,
  TrendingUp,
  Factory,
  GraduationCap,
  HeartPulse,
} from "lucide-react";
import { generalInfo } from "@/constants/about-data";

const iconMap = {
  map: Map,
  "map-pin": MapPin,
  users: Users,
  building: Building,
  "trending-up": TrendingUp,
  factory: Factory,
  "graduation-cap": GraduationCap,
  "heart-pulse": HeartPulse,
};

export default function GeneralInfo() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Thông Tin Tổng Quan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Những con số "biết nói" về Vĩnh Long
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {generalInfo.map((info, index) => {
            const Icon = iconMap[info.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={info.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative bg-white rounded-2xl p-8 shadow-lg card-hover overflow-hidden h-full">
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <Icon size={32} className="text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    {info.title}
                  </h3>

                  <div className="mb-4">
                    <span className="text-5xl font-bold gradient-text">
                      {info.value}
                    </span>
                    <span className="text-xl text-gray-600 ml-2">
                      {info.unit}
                    </span>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {info.description}
                  </p>

                  {/* Decorative Corner */}
                  <div
                    className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${info.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
