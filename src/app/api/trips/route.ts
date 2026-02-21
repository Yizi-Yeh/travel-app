import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createTrip } from "@/lib/services/trips";

export async function GET() {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const trips = await prisma.trip.findMany({
    where: { members: { some: { user: { email: session.user.email } } } },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({ data: trips });
}

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const body = await req.json();
  const trip = await createTrip(user.id, { name: body.name, notes: body.notes });
  return NextResponse.json({ data: trip });
}
