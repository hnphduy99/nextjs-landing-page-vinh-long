import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { logActivity } from '@/lib/admin/activity';

export async function GET() {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: { order: 'asc' },
      include: { province: true }
    });
    return NextResponse.json(destinations);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const destination = await prisma.destination.create({
      data: body
    });

    await logActivity('destination', 'thêm', destination.name);

    return NextResponse.json(destination);
  } catch {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      provinceId,
      name,
      slogan,
      category,
      description,
      longDescription,
      imageUrl,
      gallery,
      highlights,
      experiences,
      tips,
      order
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }

    const destination = await prisma.destination.update({
      where: { id },
      data: {
        provinceId,
        name,
        slogan,
        category,
        description,
        longDescription,
        imageUrl,
        gallery,
        highlights,
        experiences,
        tips,
        order
      }
    });

    await logActivity('destination', 'sửa', destination.name);

    return NextResponse.json(destination);
  } catch (error) {
    console.error('Destination Update Error:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const destination = await prisma.destination.delete({ where: { id } });

    await logActivity('destination', 'xóa', destination.name);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
