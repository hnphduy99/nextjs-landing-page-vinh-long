import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { logActivity } from "@/lib/admin/activity";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  try {
    if (type === "milestones") {
      const data = await prisma.historicalMilestone.findMany({
        orderBy: { order: "asc" },
      });
      return NextResponse.json(data);
    }
    if (type === "personalities") {
      const data = await prisma.notablePersonality.findMany({
        orderBy: { order: "asc" },
      });
      return NextResponse.json(data);
    }
    if (type === "features") {
      const data = await prisma.culturalFeature.findMany({
        orderBy: { order: "asc" },
      });
      return NextResponse.json(data);
    }
    if (type === "festivals") {
      const data = await prisma.festival.findMany({
        orderBy: { order: "asc" },
      });
      return NextResponse.json(data);
    }
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const body = await request.json();

  try {
    let data;
    if (type === "milestones") {
      data = await prisma.historicalMilestone.create({ data: body });
    } else if (type === "personalities") {
      data = await prisma.notablePersonality.create({ data: body });
    } else if (type === "features") {
      data = await prisma.culturalFeature.create({ data: body });
    } else if (type === "festivals") {
      data = await prisma.festival.create({ data: body });
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await logActivity(
      type as string,
      "thêm",
      (data as any).title || (data as any).name || "Nội dung"
    );

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const body = await request.json();

  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  // Remove ID or other read-only fields from body to avoid Prisma errors
  const { id: _, updatedAt: __, createdAt: ___, ...updateData } = body;

  try {
    let data;
    if (type === "milestones") {
      data = await prisma.historicalMilestone.update({
        where: { id },
        data: updateData,
      });
    } else if (type === "personalities") {
      data = await prisma.notablePersonality.update({
        where: { id },
        data: updateData,
      });
    } else if (type === "features") {
      data = await prisma.culturalFeature.update({
        where: { id },
        data: updateData,
      });
    } else if (type === "festivals") {
      data = await prisma.festival.update({ where: { id }, data: updateData });
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await logActivity(
      type as string,
      "sửa",
      (data as any).title || (data as any).name || "Nội dung"
    );

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  try {
    let data;
    if (type === "milestones")
      data = await prisma.historicalMilestone.delete({ where: { id } });
    else if (type === "personalities")
      data = await prisma.notablePersonality.delete({ where: { id } });
    else if (type === "features")
      data = await prisma.culturalFeature.delete({ where: { id } });
    else if (type === "festivals")
      data = await prisma.festival.delete({ where: { id } });
    else return NextResponse.json({ error: "Invalid type" }, { status: 400 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await logActivity(
      type as string,
      "xóa",
      (data as any).title || (data as any).name || "Nội dung"
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
