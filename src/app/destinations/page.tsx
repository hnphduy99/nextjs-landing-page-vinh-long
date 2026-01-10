"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle, Info, Lightbulb, MapPin, Camera } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MapSection from "@/components/destinations/MapSection";
import {
  detailedDestinations,
  destinationsHero,
} from "@/constants/destinations-data";

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[#E07B39]/10 via-[#4CAF50]/10 to-[#FFF8F0]">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              {destinationsHero.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-[#E07B39] font-medium mb-6"
            >
              {destinationsHero.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              {destinationsHero.description}
            </motion.p>
          </div>
        </div>

        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E07B39]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4CAF50]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </section>

      {/* Destinations List */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex flex-col gap-32">
            {detailedDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual Side */}
                <div
                  className={`space-y-6 ${index % 2 !== 0 ? "lg:order-2" : ""}`}
                >
                  <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Camera size={20} className="text-[#E07B39]" />
                        <span className="text-xs font-bold uppercase tracking-widest">
                          Tuyệt phẩm quang cảnh
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold">{destination.name}</h3>
                    </div>
                  </div>

                  {/* Small Gallery / Thumbnail Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {destination.gallery.slice(1).map((img, idx) => (
                      <div
                        key={idx}
                        className="relative h-24 rounded-2xl overflow-hidden shadow-md"
                      >
                        <Image
                          src={img}
                          alt={`${destination.name} gallery ${idx}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                    <div className="relative h-24 rounded-2xl bg-white flex items-center justify-center border border-dashed border-[#E07B39] text-[#E07B39] font-bold text-xs cursor-pointer hover:bg-[#E07B39]/5 transition-colors">
                      + 10 Ảnh
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div
                  className={`space-y-8 ${index % 2 !== 0 ? "lg:order-1" : ""}`}
                >
                  <div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#E07B39]/10 text-[#E07B39] font-bold text-sm mb-4">
                      Khám phá Vĩnh Long
                    </span>
                    <h3 className="text-4xl font-bold text-gray-900 mb-4">
                      {destination.name}
                    </h3>
                    <p className="text-xl font-medium text-[#4CAF50] italic mb-6">
                      "{destination.slogan}"
                    </p>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {destination.longDescription}
                    </p>
                  </div>

                  {/* Experiences List */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <CheckCircle size={20} className="text-[#4CAF50]" /> Trải
                      nghiệm không thể bỏ qua
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {destination.experiences.map((exp, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-gray-600 bg-white p-3 rounded-xl shadow-sm border border-gray-50"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E07B39] mt-2 flex-shrink-0" />
                          <span className="text-sm">{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tips Box */}
                  <div className="p-6 bg-gradient-to-r from-[#FFF8F0] to-white border-l-4 border-[#E07B39] rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3 text-[#E07B39] mb-2 font-bold">
                      <Lightbulb size={20} /> Mẹo cho chuyến đi
                    </div>
                    <p className="text-gray-700 italic text-sm">
                      {destination.tips}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapSection />

      {/* Call to Action */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-[#E07B39] to-[#4CAF50] rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">
                Bạn đã sẵn sàng bước vào hành trình?
                <br />
                Về Vĩnh Long - Về là thương.
              </h2>
              <button className="px-10 py-4 bg-white text-[#E07B39] font-bold rounded-full text-lg hover:shadow-xl hover:scale-105 transition-all">
                Lên kế hoạch ngay
              </button>
            </div>
            {/* Decorative background circle */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
