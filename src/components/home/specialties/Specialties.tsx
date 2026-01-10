"use client";

import { motion } from "framer-motion";
import Image from "next/image";
interface SpecialtyItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  origin: string | null;
}

interface SpecialtiesProps {
  specialties: SpecialtyItem[];
}

export default function Specialties({ specialties }: SpecialtiesProps) {
  return (
    <section id="specialties" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Đặc sản Vĩnh Long
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hương vị đặc trưng của vùng đất sông nước
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specialties.map((specialty, index) => (
            <motion.div
              key={specialty.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg card-hover"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  <Image
                    src={specialty.imageUrl}
                    alt={specialty.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Origin Badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-[#4CAF50]">
                    {specialty.origin}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#E07B39] transition-colors">
                  {specialty.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {specialty.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
