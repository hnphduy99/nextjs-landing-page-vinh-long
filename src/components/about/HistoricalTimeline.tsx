"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { historicalMilestones } from "@/constants/about-data";

export default function HistoricalTimeline() {
  return (
    <section className="section-padding bg-gradient-to-br from-[#FFF8F0] to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hành Trình Lịch Sử
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Từ vùng đất khai hoang đến Vĩnh Long hiện đại
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E07B39] via-[#4CAF50] to-[#E07B39] transform -translate-x-1/2" />

          <div className="space-y-12">
            {historicalMilestones.map((milestone, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`relative grid lg:grid-cols-2 gap-8 items-center ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content Side */}
                  <div
                    className={`${
                      isEven
                        ? "lg:text-right lg:pr-12"
                        : "lg:pl-12 lg:col-start-2"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-2xl p-8 shadow-xl card-hover"
                    >
                      <div
                        className={`inline-block px-6 py-2 bg-gradient-to-r from-[#E07B39] to-[#4CAF50] rounded-full mb-4`}
                      >
                        <span className="text-white font-bold text-lg">
                          {milestone.year}
                        </span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {milestone.title}
                      </h3>

                      <p className="text-gray-600 text-lg leading-relaxed">
                        {milestone.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Image Side */}
                  <div
                    className={`${
                      isEven
                        ? "lg:col-start-2"
                        : "lg:col-start-1 lg:row-start-1"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative h-80 rounded-2xl overflow-hidden shadow-2xl"
                    >
                      <Image
                        src={milestone.image}
                        alt={milestone.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="w-6 h-6 bg-gradient-to-br from-[#E07B39] to-[#4CAF50] rounded-full border-4 border-white shadow-lg"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
