"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Info } from "lucide-react";

export default function MapSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#E07B39] font-bold tracking-widest uppercase text-sm mb-4 block">
            Bản đồ du lịch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Vĩnh Long Trong Tầm Tay
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#E07B39] to-[#4CAF50] mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Map Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-[#FFF8F0] p-8 rounded-3xl shadow-lg border border-[#E07B39]/10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Navigation className="text-[#E07B39]" /> Chỉ dẫn địa lý
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-md flex-shrink-0">
                    <MapPin className="text-[#4CAF50]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Trung tâm</h4>
                    <p className="text-sm text-gray-600">
                      Thành phố Vĩnh Long là nút giao thông quan trọng nối liền
                      các tỉnh miền Tây.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-md flex-shrink-0">
                    <Info className="text-[#E07B39]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Di chuyển</h4>
                    <p className="text-sm text-gray-600">
                      Dễ dàng tiếp cận bằng đường bộ (Cao tốc Trung Lương - Mỹ
                      Thuận) hoặc đường thủy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-200">
                <p className="text-gray-500 text-sm italic">
                  * Vĩnh Long nằm cách TP. Hồ Chí Minh khoảng 135km về phía Nam.
                </p>
                <button className="w-full mt-6 py-4 bg-gradient-to-r from-[#E07B39] to-[#E07B39]/80 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all">
                  Mở Google Maps
                </button>
              </div>
            </div>
          </motion.div>

          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125554.4082260714!2d105.88126848694038!3d10.255535384185703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a82ec4582f053%3A0x6966113b2e53ef9!2zVsSpbmggTG9uZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1711234567890!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[20%] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
            ></iframe>

            {/* Custom Overlay */}
            <div className="absolute top-6 left-6 pointer-events-none">
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white font-bold text-[#E07B39] text-xs">
                VĨNH LONG INTERACTIVE MAP
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
