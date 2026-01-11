import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { logActivity } from "@/lib/admin/activity";

export async function GET() {
  try {
    const specialties = await prisma.specialty.findMany({
      orderBy: { order: "asc" },
      include: { province: true },
    });
    return NextResponse.json(specialties);
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const specialty = await prisma.specialty.create({
      data: body,
    });

    await logActivity("specialty", "thêm", specialty.name);

    return NextResponse.json(specialty);
  } catch {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      provinceId,
      name,
      category,
      description,
      imageUrl,
      origin,
      taste,
      order,
    } = body;

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    console.log("Updating specialty in DB...");
    const specialty = await prisma.specialty.update({
      where: { id },
      data: {
        provinceId,
        name,
        category,
        description,
        imageUrl,
        origin,
        taste,
        order,
      },
    });

    console.log("Specialty updated, logging activity...");
    await logActivity("specialty", "sửa", specialty.name);
    console.log("Activity logging called.");

    return NextResponse.json(specialty);
  } catch (error) {
    console.error("Specialty Update Error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ error: "ID required" }, { status: 400 });

    const specialty = await prisma.specialty.delete({ where: { id } });

    await logActivity("specialty", "xóa", specialty.name);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
