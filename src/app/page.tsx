import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import History from '@/components/home/History';
import Gallery from '@/components/home/Gallery';
import Directions from '@/components/home/Directions';
import StatsWrapper from '@/components/home/stats/StatsWrapper';
import DestinationsWrapper from '@/components/home/destinations/DestinationsWrapper';
import SpecialtiesWrapper from '@/components/home/specialties/SpecialtiesWrapper';
import { prisma } from '@/lib/prisma';

interface SiteConfig {
  hero_content?: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    imageUrl: string;
  };
  site_title?: string;
  site_slogan?: string;
  [key: string]: any;
}

export default async function Home() {
  // We only fetch minimal site settings for the Hero (fast)
  // Other data is fetched inside their respective Suspense wrappers
  const settings = await prisma.siteSetting.findMany();

  const siteConfig = settings.reduce((acc, curr) => {
    let value = curr.value;
    try {
      value = JSON.parse(curr.value);
    } catch {
      // Keep as string
    }
    return { ...acc, [curr.key]: value };
  }, {} as SiteConfig);

  const heroData = siteConfig.hero_content || {
    title: 'VĨNH LONG',
    subtitle: 'NHỊP CẦU NỐI NHỮNG BỜ VUI',
    description: 'Vùng đất giữa hai dòng sông Tiền và sông Hậu, nơi hội tụ tinh hoa văn hóa Nam Bộ.',
    cta: 'Khám phá ngay',
    imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2400'
  };

  return (
    <div className='min-h-screen'>
      <Navbar />
      <Hero heroContent={heroData} />

      {/* These components now handle their own fetching with Suspense & Skeletons */}
      <StatsWrapper />
      <DestinationsWrapper />
      <SpecialtiesWrapper />

      <History />
      <Gallery />
      <Directions />
      <Footer />
    </div>
  );
}
