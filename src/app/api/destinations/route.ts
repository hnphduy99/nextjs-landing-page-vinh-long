import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: { order: "asc" },
      include: {
        province: {
          select: { name: true, slug: true },
        },
      },
    });

    return NextResponse.json(destinations);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
