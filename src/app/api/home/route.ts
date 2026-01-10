import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [
      settings,
      stats,
      milestones,
      personalities,
      culturalFeatures,
      festivals,
      provinces,
    ] = await Promise.all([
      prisma.siteSetting.findMany(),
      prisma.stat.findMany({ orderBy: { order: "asc" } }),
      prisma.historicalMilestone.findMany({ orderBy: { order: "asc" } }),
      prisma.notablePersonality.findMany({ orderBy: { order: "asc" } }),
      prisma.culturalFeature.findMany({ orderBy: { order: "asc" } }),
      prisma.festival.findMany({ orderBy: { order: "asc" } }),
      prisma.province.findMany({
        include: {
          destinations: { orderBy: { order: "asc" } },
          specialties: { orderBy: { order: "asc" } },
        },
      }),
    ]);

    // Chuyển đổi SiteSettings từ mảng sang object key-value cho dễ dùng
    const siteConfig = settings.reduce((acc, curr) => {
      let value = curr.value;
      try {
        // Thử parse nếu là JSON string
        value = JSON.parse(curr.value);
      } catch {
        // Nếu không phải JSON thì giữ nguyên string
      }
      return { ...acc, [curr.key]: value };
    }, {});

    return NextResponse.json({
      siteConfig,
      stats,
      milestones,
      personalities,
      culturalFeatures,
      festivals,
      provinces,
    });
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
