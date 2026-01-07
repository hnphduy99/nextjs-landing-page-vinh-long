"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";

interface PlaceCardProps {
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  highlights: string[];
  index: number;
}

export default function PlaceCard({
  name,
  description,
  category,
  imageUrl,
  highlights,
  index,
}: PlaceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 card-hover border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* Category Badge - Glassmorphism */}
        <div className="absolute top-5 left-5 z-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium text-xs shadow-lg uppercase tracking-wider">
            <MapPin size={12} className="mr-2" />
            {category}
          </span>
        </div>

        {/* Gradient Overlay for Text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        <div className="absolute bottom-5 left-5 right-5 text-white">
          <h3 className="text-2xl font-bold mb-1 drop-shadow-md">{name}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-7 space-y-4">
        <p className="text-gray-600 leading-relaxed line-clamp-3 text-sm italic">
          "{description}"
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 pt-2">
          {highlights.map((highlight, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-[#FFF8F0] text-[#E07B39] text-[10px] sm:text-xs rounded-lg font-bold border border-[#E07B39]/10"
            >
              #{highlight}
            </span>
          ))}
        </div>

        {/* Footer info/Action */}
        <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
          <motion.button
            whileHover={{ x: 5 }}
            className="text-[#4CAF50] text-sm font-bold flex items-center group/btn"
          >
            Tìm hiểu thêm
            <svg
              className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
