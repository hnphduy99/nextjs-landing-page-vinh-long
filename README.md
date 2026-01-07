# Landing Page Vĩnh Long

Landing page giới thiệu tỉnh Vĩnh Long với phong cách hiện đại, tinh tế và giàu bản sắc văn hóa địa phương.

## 🎨 Tính năng

- **Hero Section**: Tiêu đề ấn tượng với hình ảnh nền full-screen và hiệu ứng parallax
- **Stats Section**: Hiển thị thông tin cơ bản về Vĩnh Long (diện tích, năm thành lập, vị trí)
- **Destinations Section**: Grid layout giới thiệu các điểm đến nổi tiếng với hiệu ứng zoom khi hover
- **Specialties Section**: Showcase các đặc sản địa phương
- **History Section**: Timeline lịch sử với animation scroll-reveal
- **Footer**: Thông tin liên hệ đầy đủ với social media links
- **Navbar**: Sticky navbar với hiệu ứng đổi màu khi scroll
- **Smooth Scroll**: Cuộn mượt mà giữa các section
- **Responsive Design**: Tối ưu cho mọi thiết bị

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Playfair Display (headings), Inter (body)

## 🎨 Color Scheme

- **Primary**: #E07B39 (Cam Gạch)
- **Secondary**: #4CAF50 (Xanh Lá)
- **Background**: #FFF8F0 (Be/Kem)

## 📁 Cấu trúc Project

```
landing-page/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout chính với SEO metadata
│   │   ├── page.tsx             # Trang chính
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── Hero.tsx             # Hero section
│   │   ├── Stats.tsx            # Statistics section
│   │   ├── Destinations.tsx     # Destinations section
│   │   ├── PlaceCard.tsx        # Card component cho điểm đến
│   │   ├── Specialties.tsx      # Specialties section
│   │   ├── History.tsx          # History timeline
│   │   └── Footer.tsx           # Footer
│   └── constants/
│       └── data.ts              # Tất cả nội dung text
├── next.config.ts               # Next.js configuration
└── package.json
```

## 🚀 Cài đặt và Chạy

### Yêu cầu

- Node.js 18+
- npm hoặc yarn

### Cài đặt dependencies

```bash
npm install
```

### Chạy development server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

### Build production

```bash
npm run build
npm start
```

## ✏️ Tùy chỉnh nội dung

Tất cả nội dung text được lưu trong file `src/constants/data.ts`. Bạn có thể dễ dàng chỉnh sửa:

- **Hero content**: Tiêu đề, mô tả, CTA button
- **Stats data**: Số liệu thống kê
- **Destinations**: Danh sách điểm đến
- **Specialties**: Đặc sản địa phương
- **History**: Nội dung lịch sử và timeline
- **Contact info**: Thông tin liên hệ
- **Footer links**: Các link trong footer

## 🎨 Tùy chỉnh màu sắc

Màu sắc được định nghĩa trong `src/app/globals.css`:

```css
:root {
  --color-primary: 224 123 57; /* #E07B39 - Cam Gạch */
  --color-secondary: 76 175 80; /* #4CAF50 - Xanh Lá */
  --color-background: 255 248 240; /* #FFF8F0 - Be/Kem */
}
```

## 📸 Thay đổi hình ảnh

Hình ảnh hiện tại sử dụng Unsplash placeholders. Để thay đổi:

1. Cập nhật URL trong `src/constants/data.ts`
2. Nếu sử dụng domain khác, thêm vào `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "your-domain.com",
    },
  ],
}
```

## 🌟 Tính năng nổi bật

### Animations

- Scroll-reveal animations với Framer Motion
- Parallax effect trên Hero section
- Hover effects trên cards
- Smooth scroll giữa các sections

### SEO

- Metadata đầy đủ (title, description, keywords)
- Open Graph tags cho social media
- Twitter Card tags
- Semantic HTML structure

### Performance

- Next.js Image optimization
- Code splitting tự động
- Font optimization với next/font

## 📝 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo pull request hoặc issue nếu bạn có ý tưởng cải thiện.

---

**Vĩnh Long - Về là thương** ❤️
