'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Trang chủ' },
  { href: '/about', label: 'Giới thiệu' },
  { href: '/destinations', label: 'Điểm đến' },
  { href: '/specialties', label: 'Đặc sản' },
  { href: '/history', label: 'Lịch sử' },
  { href: '/#gallery', label: 'Thư viện' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-lg backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className='container-custom'>
        <div className='flex h-20 items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-3'>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='flex items-center space-x-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full'>
                <Image src='/vl.svg' alt='Vĩnh Long Logo' width={48} height={48} loading='eager' />
              </div>
              <div>
                <h1 className={`text-xl font-bold transition-colors ${isScrolled ? 'text-[#E07B39]' : 'text-white'}`}>
                  Vĩnh Long
                </h1>
                <p className={`text-xs transition-colors ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}>
                  Về là thương
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden items-center space-x-8 md:flex'>
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`relative py-2 font-medium transition-all hover:text-[#E07B39] ${
                      isActive ? 'font-bold text-[#E07B39]' : isScrolled ? 'text-gray-700' : 'text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId='activeNav'
                        className='absolute right-0 -bottom-1 left-0 h-0.5 rounded-full bg-[#E07B39]'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`rounded-lg p-2 transition-colors md:hidden ${isScrolled ? 'text-gray-700' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl md:hidden'
          >
            <div className='space-y-1 px-2 py-4'>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block rounded-xl px-6 py-3 transition-all ${
                      isActive
                        ? 'bg-[#FFF8F0] font-bold text-[#E07B39] shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#E07B39]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
