import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin']
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Vĩnh Long - Nhịp Cầu Nối Những Bờ Vui | Du lịch Vĩnh Long',
  description:
    'Khám phá vùng đất giữa hai dòng sông, nơi hội tụ văn hóa, lịch sử và thiên nhiên tươi đẹp của đồng bằng sông Cửu Long. Vĩnh Long - Về là thương.',
  keywords: [
    'Vĩnh Long',
    'du lịch Vĩnh Long',
    'Cù lao An Bình',
    'Chùa Phật Ngọc Xá Lợi',
    'Vương quốc Đỏ Mang Thít',
    'đặc sản Vĩnh Long',
    'bưởi Năm Roi',
    'ĐBSCL',
    'miền Tây'
  ],
  authors: [{ name: 'Vĩnh Long Tourism' }],
  creator: 'Vĩnh Long Tourism',
  publisher: 'Vĩnh Long Tourism',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://vinhlong.gov.vn',
    title: 'Vĩnh Long - Nhịp Cầu Nối Những Bờ Vui',
    description:
      'Khám phá vùng đất giữa hai dòng sông, nơi hội tụ văn hóa, lịch sử và thiên nhiên tươi đẹp của đồng bằng sông Cửu Long',
    siteName: 'Vĩnh Long Tourism',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2400',
        width: 2400,
        height: 1600,
        alt: 'Vĩnh Long - Vùng đất sông nước'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vĩnh Long - Nhịp Cầu Nối Những Bờ Vui',
    description: 'Khám phá vùng đất giữa hai dòng sông, nơi hội tụ văn hóa, lịch sử và thiên nhiên tươi đẹp',
    images: ['https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2400']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='vi' suppressHydrationWarning className='scroll-smooth'>
      <body className={`${playfairDisplay.variable} ${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
