"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Navigation,
  Bus,
  Bike,
  Info,
  Map as MapIcon,
} from "lucide-react";

export default function Directions() {
  const transportOptions = [
    {
      type: "Xe Khách",
      icon: Bus,
      title: "Phương tiện công cộng",
      description:
        "Nhiều hãng xe uy tín như Phương Trang, Thành Bưởi chạy tuyến TP.HCM - Vĩnh Long liên tục (tần suất 15-30 phút/chuyến).",
      detail:
        "Khởi hành từ Bến xe Miền Tây. Thời gian di chuyển khoảng 2 - 2.5 giờ.",
      color: "text-[#E07B39]",
      bgColor: "bg-[#E07B39]/10",
    },
    {
      type: "Xe Máy / Ô tô",
      icon: Bike,
      title: "Phương tiện cá nhân",
      description:
        "Dành cho những bạn yêu thích khám phá và chủ động thời gian. Đường đi thông thoáng, phong cảnh đẹp.",
      detail:
        "Đi theo QL1A hoặc Cao tốc Trung Lương - Mỹ Thuận. Khoảng cách ~135km.",
      color: "text-[#4CAF50]",
      bgColor: "bg-[#4CAF50]/10",
    },
  ];

  return (
    <section id="location" className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#E07B39] font-bold tracking-widest uppercase text-sm mb-4 block">
            Hành trình du lịch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Bản Đồ & Chỉ Đường
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#E07B39] to-[#4CAF50] mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left: Transport Info */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#FFF8F0] p-8 md:p-10 rounded-[2.5rem] border border-[#E07B39]/10 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#E07B39] flex items-center justify-center text-white shadow-lg">
                  <Navigation size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Cách TP.HCM
                  </h3>
                  <p className="text-[#E07B39] font-bold">
                    Khoảng 135 km (Hơn 2 giờ di chuyển)
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {transportOptions.map((opt, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div
                      className={`w-16 h-16 shrink-0 rounded-2xl ${opt.bgColor} ${opt.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <opt.icon size={32} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 text-lg mb-1">
                        {opt.type}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        {opt.description}
                      </p>
                      <p className="text-[#4CAF50] text-xs font-bold bg-[#4CAF50]/5 inline-block px-3 py-1 rounded-full uppercase tracking-tighter italic">
                        {opt.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-white rounded-2xl border border-gray-100 flex items-start gap-4">
                <Info className="text-[#E07B39] shrink-0 mt-1" size={20} />
                <p className="text-xs text-gray-500 leading-relaxed italic">
                  Vĩnh Long là trung tâm của các tỉnh miền Tây. Từ đây, bạn có
                  thể dễ dàng tiếp nối hành trình sang Cần Thơ, Tiền Giang, Trà
                  Vinh hay Đồng Tháp một cách thuận tiện.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-12 xl:col-span-7 relative h-[500px] lg:h-full min-h-[500px]"
          >
            <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125554.4082260714!2d105.88126848694038!3d10.255535384185703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a82ec4582f053%3A0x6966113b2e53ef9!2zVsSpbmggTG9uZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1711234567890!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="contrast-[1.05] brightness-[0.98] group-hover:brightness-100 transition-all duration-700"
              ></iframe>

              <div className="absolute top-6 left-6 pointer-events-none">
                <div className="bg-[#E07B39] text-white px-5 py-2.5 rounded-full shadow-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                  <MapIcon size={16} /> Interactive Map
                </div>
              </div>

              <div className="absolute bottom-6 right-6">
                <a
                  href="https://maps.app.goo.gl/YourMapLinkHere"
                  target="_blank"
                  className="bg-white hover:bg-black hover:text-white text-gray-900 px-6 py-3 rounded-2xl shadow-xl font-bold text-sm transition-all flex items-center gap-2"
                >
                  <MapPin size={18} className="text-[#E07B39]" /> Xem trên
                  Google Maps
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
