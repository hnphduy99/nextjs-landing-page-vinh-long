"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { notablePersonalities } from "@/constants/about-data";
import { Award } from "lucide-react";

export default function NotablePersonalities() {
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
            Danh Nhân Vĩnh Long
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Những con người tài năng, cống hiến hết mình cho đất nước
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notablePersonalities.map((person, index) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover h-full">
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </motion.div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Period Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-[#E07B39]">
                      {person.period}
                    </span>
                  </div>

                  {/* Name on Image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {person.name}
                    </h3>
                    <p className="text-white/90 text-sm">{person.title}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Achievement Badge */}
                  <div className="flex items-start mb-4 p-3 bg-gradient-to-r from-[#FFF8F0] to-white rounded-lg">
                    <Award
                      size={20}
                      className="text-[#E07B39] mr-2 flex-shrink-0 mt-1"
                    />
                    <p className="text-sm font-semibold text-gray-700">
                      {person.achievement}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {person.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-[#E07B39] to-[#4CAF50] p-8 rounded-2xl shadow-xl">
            <p className="text-white text-lg md:text-xl font-semibold max-w-3xl">
              Và còn rất nhiều con người Vĩnh Long khác đã và đang cống hiến cho
              sự nghiệp xây dựng và bảo vệ Tổ quốc
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
