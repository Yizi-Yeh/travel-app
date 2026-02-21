import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { deleteTrip, updateTrip } from "@/lib/services/trips";
import { canManageMembers } from "@/lib/authz";

async function getUserAndRole(tripId: string, email: string) {
  const member = await prisma.tripMember.findFirst({
    where: { tripId, user: { email } },
    include: { user: true },
  });
  return member;
}

export async function GET(_: Request, { params }: { params: { tripId: string } }) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const member = await getUserAndRole(params.tripId, session.user.email);
  if (!member) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const trip = await prisma.trip.findUnique({ where: { id: params.tripId } });
  return NextResponse.json({ data: trip });
}

export async function PATCH(req: Request, { params }: { params: { tripId: string } }) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const member = await getUserAndRole(params.tripId, session.user.email);
  if (!member) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const trip = await updateTrip(member.userId, params.tripId, { name: body.name, notes: body.notes });
  return NextResponse.json({ data: trip });
}

export async function DELETE(_: Request, { params }: { params: { tripId: string } }) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const member = await getUserAndRole(params.tripId, session.user.email);
  if (!member || !canManageMembers(member.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await deleteTrip(member.userId, params.tripId);
  return NextResponse.json({ ok: true });
}
