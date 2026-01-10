"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { contactInfo, footerLinks, siteConfig } from "@/constants/data";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white"
    >
      {/* Main Footer Content */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#E07B39] to-[#4CAF50] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">VL</span>
              </div>
              <div>
                <h3 className="font-bold text-xl">Vĩnh Long</h3>
                <p className="text-sm text-gray-400">Về là thương</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              {siteConfig.description}
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#E07B39] transition-colors"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#E07B39] transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#E07B39] transition-colors"
              >
                <Youtube size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="text-lg font-bold mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#E07B39] transition-colors flex items-center"
                    >
                      <span className="mr-2">›</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-bold mb-6">Liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin
                  size={20}
                  className="text-[#E07B39] mr-3 mt-1 flex-shrink-0"
                />
                <span className="text-gray-400">{contactInfo.address}</span>
              </li>
              <li className="flex items-center">
                <Phone
                  size={20}
                  className="text-[#E07B39] mr-3 flex-shrink-0"
                />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-gray-400 hover:text-[#E07B39] transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-[#E07B39] mr-3 flex-shrink-0" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-400 hover:text-[#E07B39] transition-colors"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center">
                <Globe
                  size={20}
                  className="text-[#E07B39] mr-3 flex-shrink-0"
                />
                <a
                  href={`https://${contactInfo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#E07B39] transition-colors"
                >
                  {contactInfo.website}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Vĩnh Long Tourism. All rights reserved.
            </p>
            <p className="text-[#E07B39] font-semibold text-lg">
              {siteConfig.slogan}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
