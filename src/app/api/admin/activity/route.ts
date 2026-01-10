import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch latest updates from main models
    const [destinations, specialties, festivals] = await Promise.all([
      prisma.destination.findMany({
        take: 3,
        orderBy: { updatedAt: "desc" },
        select: { id: true, name: true, updatedAt: true },
      }),
      prisma.specialty.findMany({
        take: 3,
        orderBy: { updatedAt: "desc" },
        select: { id: true, name: true, updatedAt: true },
      }),
      prisma.festival.findMany({
        take: 3,
        orderBy: { updatedAt: "desc" },
        select: { id: true, name: true, updatedAt: true },
      }),
    ]);

    // Combine and sort by date
    const activities = [
      ...destinations.map((d) => ({
        ...d,
        type: "destination",
        action: "địa điểm",
      })),
      ...specialties.map((s) => ({
        ...s,
        type: "specialty",
        action: "đặc sản",
      })),
      ...festivals.map((f) => ({ ...f, type: "festival", action: "lễ hội" })),
    ]
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, 5);

    return NextResponse.json(activities);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}
