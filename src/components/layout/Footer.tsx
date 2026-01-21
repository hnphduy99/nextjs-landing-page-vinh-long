'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Youtube } from 'lucide-react';
import { contactInfo, footerLinks, siteConfig } from '@/constants/data';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id='contact' className='bg-gradient-to-br from-gray-900 to-gray-800 text-white'>
      {/* Main Footer Content */}
      <div className='container-custom section-padding'>
        <div className='grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4'>
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className='mb-6 flex items-center space-x-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#E07B39] to-[#4CAF50]'>
                <span className='text-xl font-bold text-white'>VL</span>
              </div>
              <div>
                <h3 className='text-xl font-bold'>Vĩnh Long</h3>
                <p className='text-sm text-gray-400'>Về là thương</p>
              </div>
            </div>
            <p className='mb-6 leading-relaxed text-gray-400'>{siteConfig.description}</p>

            {/* Social Media */}
            <div className='flex space-x-4'>
              <motion.a
                href='#'
                whileHover={{ scale: 1.1, y: -2 }}
                className='flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#E07B39]'
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                href='#'
                whileHover={{ scale: 1.1, y: -2 }}
                className='flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#E07B39]'
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href='#'
                whileHover={{ scale: 1.1, y: -2 }}
                className='flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#E07B39]'
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
              <h4 className='mb-6 text-lg font-bold'>{section.title}</h4>
              <ul className='space-y-3'>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className='flex items-center text-gray-400 transition-colors hover:text-[#E07B39]'
                    >
                      <span className='mr-2'>›</span>
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
            <h4 className='mb-6 text-lg font-bold'>Liên hệ</h4>
            <ul className='space-y-4'>
              <li className='flex items-start'>
                <MapPin size={20} className='mt-1 mr-3 flex-shrink-0 text-[#E07B39]' />
                <span className='text-gray-400'>{contactInfo.address}</span>
              </li>
              <li className='flex items-center'>
                <Phone size={20} className='mr-3 flex-shrink-0 text-[#E07B39]' />
                <a href={`tel:${contactInfo.phone}`} className='text-gray-400 transition-colors hover:text-[#E07B39]'>
                  {contactInfo.phone}
                </a>
              </li>
              <li className='flex items-center'>
                <Mail size={20} className='mr-3 flex-shrink-0 text-[#E07B39]' />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className='text-gray-400 transition-colors hover:text-[#E07B39]'
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className='flex items-center'>
                <Globe size={20} className='mr-3 flex-shrink-0 text-[#E07B39]' />
                <a
                  href={`https://${contactInfo.website}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-400 transition-colors hover:text-[#E07B39]'
                >
                  {contactInfo.website}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-white/10'>
        <div className='container-custom py-6'>
          <div className='flex flex-col items-center justify-between md:flex-row'>
            <p className='mb-4 text-sm text-gray-400 md:mb-0'>
              © {currentYear} Vĩnh Long Tourism. All rights reserved.
            </p>
            <p className='text-lg font-semibold text-[#E07B39]'>{siteConfig.slogan}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
