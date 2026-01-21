'use client';

import apiClient from '@/lib/api-client';
import { motion } from 'framer-motion';
import { FileText, LayoutDashboard, LogOut, MapPin, Settings, Utensils } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/content', label: 'Nội dung chính', icon: FileText },
  { href: '/admin/destinations', label: 'Điểm đến', icon: MapPin },
  { href: '/admin/specialties', label: 'Đặc sản', icon: Utensils },
  { href: '/admin/settings', label: 'Cài đặt', icon: Settings }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiClient.post('/api/auth/logout');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      router.push('/login');
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <aside className='fixed top-0 left-0 z-50 min-h-screen w-64 bg-slate-900 text-white'>
        <div className='p-6'>
          <h1 className='flex items-center gap-2 text-xl font-bold tracking-tight'>
            <span className='text-[#E07B39]'>Vĩnh Long</span> Admin
          </h1>
        </div>

        <nav className='mt-6 space-y-2 px-4'>
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                  isActive
                    ? 'bg-[#E07B39] text-white shadow-lg shadow-[#E07B39]/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className='text-sm font-medium'>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className='absolute bottom-8 left-0 w-full px-4'>
          <button
            onClick={handleLogout}
            className='flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-400 transition-all hover:bg-red-500/10 hover:text-red-500'
          >
            <LogOut size={20} />
            <span className='text-sm font-medium'>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className='ml-64 flex-1 p-8'>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {children}
        </motion.div>
      </main>
    </div>
  );
}
