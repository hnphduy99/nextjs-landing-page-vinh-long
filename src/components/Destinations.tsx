"use client";

import { motion } from "framer-motion";
import { destinationsData } from "@/constants/data";
import PlaceCard from "./PlaceCard";

export default function Destinations() {
  return (
    <section id="destinations" className="section-padding bg-[#FFF8F0]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Điểm đến hấp dẫn
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá những địa danh nổi tiếng và giàu bản sắc văn hóa của Vĩnh
            Long
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinationsData.map((destination, index) => (
            <PlaceCard
              key={destination.id}
              name={destination.name}
              description={destination.description}
              category={destination.category}
              imageUrl={destination.imageUrl}
              highlights={destination.highlights}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
