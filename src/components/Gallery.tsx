"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=2400",
  "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?q=80&w=2400",
  "https://images.unsplash.com/photo-1559131397-f94da358f7ca?q=80&w=2400",
  "https://images.unsplash.com/photo-1596402184320-417d717867cd?q=80&w=2400",
  "https://images.unsplash.com/photo-1620138927052-1f8e12479e0a?q=80&w=2400",
  "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=2400",
  "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=2400",
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2400",
];

// Duplicate images for infinite scroll effect
const doubleImages = [...galleryImages, ...galleryImages];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-white overflow-hidden">
      <div className="container-custom mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 text-[#E07B39] font-bold tracking-[0.2em] uppercase text-xs mb-4 bg-[#E07B39]/10 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#E07B39] animate-pulse" />
              Thư viện tinh hoa
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Vĩnh Long <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07B39] to-[#4CAF50]">
                Qua Từng Khoảnh Khắc
              </span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-gray-500 max-w-md italic text-lg border-l-4 border-[#4CAF50]/30 pl-6 py-2"
          >
            "Mỗi bức ảnh là một lời mời gọi, đưa bạn chạm vào nhịp thở của vùng
            đất phương Nam hào sảng."
          </motion.p>
        </div>
      </div>

      {/* Infinite Horizontal Scroll - Row 1 */}
      <div className="relative flex overflow-hidden py-4">
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
          whileHover={{ animationPlayState: "paused" }}
          className="flex gap-6 pr-6 cursor-pointer"
        >
          {doubleImages.map((src, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotate: 1, y: -10 }}
              className="relative w-[350px] md:w-[500px] h-[280px] md:h-[400px] flex-shrink-0 rounded-[2.5rem] overflow-hidden group shadow-xl hover:shadow-[0_20px_50px_rgba(224,123,57,0.3)] transition-all duration-700"
            >
              <Image
                src={src}
                alt={`Vinh Long Gallery ${index}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              {/* Overlay with glassmorphism effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-8 left-8 right-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white text-sm font-medium tracking-widest uppercase mb-1">
                  Cảm hứng du lịch
                </p>
                <h4 className="text-white text-xl font-bold">
                  Vĩnh Long - Về là thương
                </h4>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - Reverse Scroll & Smaller Cards */}
      <div className="relative flex overflow-hidden mt-10 py-4">
        <motion.div
          animate={{
            x: ["-50%", "0%"],
          }}
          transition={{
            duration: 50,
            ease: "linear",
            repeat: Infinity,
          }}
          whileHover={{ animationPlayState: "paused" }}
          className="flex gap-6 pr-6 cursor-pointer"
        >
          {doubleImages.map((src, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotate: -1, y: -10 }}
              className="relative w-[280px] md:w-[420px] h-[220px] md:h-[320px] flex-shrink-0 rounded-[2.5rem] overflow-hidden group shadow-lg hover:shadow-[0_20px_50px_rgba(76,175,80,0.2)] transition-all duration-700"
            >
              <Image
                src={src}
                alt={`Vinh Long Gallery Reverse ${index}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 right-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h4 className="text-white text-lg font-bold">
                  Vẻ đẹp sông nước
                </h4>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
