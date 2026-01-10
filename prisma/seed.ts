import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding...");

  // Clear existing data
  await prisma.siteSetting.deleteMany();
  await prisma.stat.deleteMany();
  await prisma.festival.deleteMany();
  await prisma.culturalFeature.deleteMany();
  await prisma.notablePersonality.deleteMany();
  await prisma.historicalMilestone.deleteMany();
  await prisma.specialty.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.province.deleteMany();

  // 1. Site Settings
  await prisma.siteSetting.createMany({
    data: [
      { key: "site_title", value: "Vĩnh Long - Nhịp Cầu Nối Những Bờ Vui" },
      {
        key: "site_description",
        value:
          "Khám phá vùng đất giữa hai dòng sông, nơi hội tụ văn hóa, lịch sử và thiên nhiên tươi đẹp",
      },
      { key: "site_slogan", value: "Vĩnh Long - Về là thương" },
      {
        key: "hero_content",
        value: JSON.stringify({
          title: "VĨNH LONG",
          subtitle: "NHỊP CẦU Nối Những Bờ Vui",
          description:
            "Vùng đất giữa hai dòng sông Tiền và sông Hậu, nơi hội tụ tinh hoa văn hóa Nam Bộ.",
          cta: "Khám phá ngay",
          imageUrl:
            "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2400",
        }),
      },
      {
        key: "about_overview",
        value:
          "Vĩnh Long - mảnh đất được ôm trọn bởi hai dòng sông Tiền và sông Hậu, nơi hội tụ tinh hoa văn hóa, lịch sử hào hùng.",
      },
      {
        key: "contact_info",
        value: JSON.stringify({
          address: "Số 1, Đường Hoàng Thái Hiếu, Phường 1, TP. Vĩnh Long",
          phone: "(0270) 3823 891",
          email: "ubnd@vinhlong.gov.vn",
          website: "www.vinhlong.gov.vn",
        }),
      },
    ],
  });

  // 2. Stats
  await prisma.stat.createMany({
    data: [
      {
        label: "Diện tích",
        value: "1.525",
        unit: "km²",
        icon: "map",
        category: "general",
        order: 1,
      },
      {
        label: "Thành lập",
        value: "1732",
        unit: "Dinh Long Hồ",
        icon: "landmark",
        category: "general",
        order: 2,
      },
      {
        label: "Vị trí",
        value: "Trung tâm",
        unit: "ĐBSCL",
        icon: "map-pin",
        category: "general",
        order: 3,
      },
      {
        label: "Tăng trưởng",
        value: "6,5%",
        unit: "GRDP",
        icon: "trending-up",
        category: "modern",
        order: 1,
      },
      {
        label: "Công nghiệp",
        value: "15+",
        unit: "Khu CN",
        icon: "factory",
        category: "modern",
        order: 2,
      },
      {
        label: "Dân số",
        value: "1,02",
        unit: "triệu người",
        icon: "users",
        category: "general",
        order: 4,
      },
    ],
  });

  // 3. Historical Milestones
  await prisma.historicalMilestone.createMany({
    data: [
      {
        year: "1732",
        title: "Thành lập Dinh Long Hồ",
        description:
          "Chúa Nguyễn Phúc Chu cho lập Dinh Long Hồ, đánh dấu sự hình thành chính thức.",
        order: 1,
      },
      {
        year: "1832",
        title: "Tỉnh Vĩnh Long Ra Đời",
        description:
          "Vua Minh Mạng chia Nam Kỳ thành 6 tỉnh, Vĩnh Long chính thức trở thành một trong số đó.",
        order: 2,
      },
      {
        year: "1945-1975",
        title: "Hào Khí Cách Mạng",
        description:
          "Nhân dân Vĩnh Long viết nên những trang sử oanh liệt trong kháng chiến.",
        order: 3,
      },
      {
        year: "1992",
        title: "Tái Lập Tỉnh Vĩnh Long",
        description:
          "Tái lập tỉnh sau thời gian sáp nhập, mở ra chương mới phát triển.",
        order: 4,
      },
    ],
  });

  // 4. Notable Personalities
  await prisma.notablePersonality.createMany({
    data: [
      {
        name: "Võ Văn Kiệt",
        title: "Nguyên Thủ tướng Chính phủ",
        achievement: "Thủ tướng Chính phủ (1991-1997)",
        period: "1922-2008",
        description: "Nhà lãnh đạo xuất sắc của công cuộc đổi mới.",
        order: 1,
      },
      {
        name: "Phạm Hùng",
        title: "Cố Chủ tịch Hội đồng Bộ trưởng",
        achievement: "Chủ tịch Hội đồng Bộ trưởng (1987-1988)",
        period: "1912-1988",
        description: "Người con ưu tú của đất Vĩnh Long.",
        order: 2,
      },
      {
        name: "Nguyễn Thị Bình",
        title: "Nguyên Phó Chủ tịch nước",
        achievement: "Phó Chủ tịch nước (1992-2002)",
        period: "1927-nay",
        description: "Nhà ngoại giao tài ba.",
        order: 3,
      },
    ],
  });

  // 5. Cultural Features
  await prisma.culturalFeature.createMany({
    data: [
      {
        title: "Sự Mến Khách",
        description: "Người Vĩnh Long coi khách đến nhà như người thân trở về.",
        icon: "Heart",
        order: 1,
      },
      {
        title: "Thật Thà & Chất Phác",
        description:
          "Nét đặc trưng của cư dân vùng sông nước, ăn nói ngay thẳng.",
        icon: "Smile",
        order: 2,
      },
      {
        title: "Hào Sảng & Nghĩa Hiệp",
        description:
          "Sẵn sàng chia sẻ, giúp đỡ lẫn nhau mà không hề toan tính.",
        icon: "Users",
        order: 3,
      },
    ],
  });

  // 6. Festivals
  await prisma.festival.createMany({
    data: [
      {
        name: "Lễ Hội Gốm Đỏ Mang Thít",
        tagline: "Khơi dậy di sản nghìn năm",
        description: "Không gian hội tụ của những bàn tay tài hoa.",
        order: 1,
      },
      {
        name: "Lễ Hội Văn Hóa Sông Nước",
        tagline: "Nhịp đập cùng dòng Cửu Long",
        description: "Tái hiện không gian giao thương náo nhiệt trên sông.",
        order: 2,
      },
    ],
  });

  // 7. Provinces, Destinations, Specialties
  const vinhLong = await prisma.province.create({
    data: {
      name: "Vĩnh Long",
      slug: "vinh-long",
      title: "Vĩnh Long - Miền Đất Thuần Khiết",
      subtitle: "Khám phá vẻ đẹp sông nước miền Tây",
      description:
        "Vĩnh Long là một tỉnh nằm ở trung tâm đồng bằng sông Cửu Long...",
      imageUrl: "https://vinhlong.gov.vn/images/slider/banner-vinh-long.jpg",
      destinations: {
        create: [
          {
            name: "Vương quốc Đỏ Mang Thít",
            slogan: "Di sản đương đại rực rỡ dưới ánh hoàng hôn",
            category: "Di sản đương đại",
            description: "Hàng ngàn lò gạch san sát bên dòng sông Cổ Chiên...",
            longDescription:
              "Vương quốc đỏ Mang Thít không chỉ là một làng nghề truyền thống mà còn là một bảo tàng kiến trúc lộ thiên khổng lồ...",
            imageUrl:
              "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=2400",
            highlights: ["Hàng ngàn lò gạch cũ", "Làng nghề 100 năm"],
            experiences: ["Tham quan làng nghề", "Chụp ảnh check-in"],
            order: 1,
          },
          {
            name: "Cù lao An Bình",
            slogan: "Trải nghiệm hương vị miệt vườn sông nước đích thực",
            category: "Du lịch sinh thái",
            description: "Nổi tiếng với những vườn cây ăn trái quanh năm...",
            imageUrl:
              "https://images.unsplash.com/photo-1559131397-f94da358f7ca?q=80&w=2400",
            highlights: ["Chèo xuồng ba lá", "Vườn trái cây"],
            experiences: ["Ngồi xuồng ba lá", "Thưởng thức trái cây"],
            order: 2,
          },
        ],
      },
      specialties: {
        create: [
          {
            name: "Bưởi Năm Roi Bình Minh",
            category: "fruit",
            description:
              "Đặc sản nổi tiếng với múi bưởi hồng tươi, vị ngọt thanh.",
            imageUrl:
              "https://images.unsplash.com/photo-1596706107779-9e1b5a7c6c1e?q=80&w=2400",
            origin: "Bình Minh, Vĩnh Long",
            order: 1,
          },
          {
            name: "Khoai lang Bình Tân",
            category: "fruit",
            description: "Khoai lang ruột tím đặc sản, giàu dinh dưỡng.",
            imageUrl:
              "https://images.unsplash.com/photo-1589927986089-35812388d1f4?q=80&w=2400",
            origin: "Bình Tân, Vĩnh Long",
            order: 2,
          },
        ],
      },
    },
  });

  console.log({ vinhLong });
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
