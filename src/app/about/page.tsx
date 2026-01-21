import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutHero from '@/components/about/AboutHero';
import GeneralInfo from '@/components/about/GeneralInfo';
import HistoricalTimeline from '@/components/about/HistoricalTimeline';
import NotablePersonalities from '@/components/about/NotablePersonalities';
import CulturalFeatures from '@/components/about/CulturalFeatures';
import ModernDevelopment from '@/components/about/ModernDevelopment';

export const metadata: Metadata = {
  title: 'Giới Thiệu - Vĩnh Long | Vùng Đất Địa Linh Nhân Kiệt',
  description:
    'Tìm hiểu về Vĩnh Long - vùng đất giữa hai dòng sông Tiền và sông Hậu, với lịch sử hào hùng, văn hóa đa dạng và nhiều danh nhân tài năng.',
  keywords: [
    'giới thiệu Vĩnh Long',
    'lịch sử Vĩnh Long',
    'danh nhân Vĩnh Long',
    'văn hóa Vĩnh Long',
    'địa linh nhân kiệt',
    'ĐBSCL'
  ],
  openGraph: {
    title: 'Giới Thiệu - Vĩnh Long | Vùng Đất Địa Linh Nhân Kiệt',
    description:
      'Tìm hiểu về Vĩnh Long - vùng đất giữa hai dòng sông Tiền và sông Hậu, với lịch sử hào hùng, văn hóa đa dạng và nhiều danh nhân tài năng.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2400',
        width: 2400,
        height: 1600,
        alt: 'Vĩnh Long - Vùng đất địa linh nhân kiệt'
      }
    ]
  }
};

export default function AboutPage() {
  return (
    <div className='min-h-screen'>
      <Navbar />
      <AboutHero />
      <GeneralInfo />
      <HistoricalTimeline />
      <NotablePersonalities />
      <CulturalFeatures />
      <ModernDevelopment />
      <Footer />
    </div>
  );
}
