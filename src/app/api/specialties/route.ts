import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const specialties = await prisma.specialty.findMany({
      orderBy: { order: "asc" },
      include: {
        province: {
          select: { name: true },
        },
      },
    });

    return NextResponse.json(specialties);
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
