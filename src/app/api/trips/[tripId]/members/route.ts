import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { addMember, removeMember } from "@/lib/services/trips";
import { canManageMembers } from "@/lib/authz";

export async function GET(_: Request, { params }: { params: { tripId: string } }) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const members = await prisma.tripMember.findMany({
    where: { tripId: params.tripId, user: { email: session.user.email } },
    include: { user: true },
  });
  if (members.length === 0) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const fullMembers = await prisma.tripMember.findMany({
    where: { tripId: params.tripId },
    include: { user: true },
  });

  return NextResponse.json({ data: fullMembers });
}

export async function POST(req: Request, { params }: { params: { tripId: string } }) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const owner = await prisma.tripMember.findFirst({
    where: { tripId: params.tripId, user: { email: session.user.email } },
  });
  if (!owner || !canManageMembers(owner.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const member = await addMember(owner.userId, params.tripId, body.email);
  return NextResponse.json({ data: member });
}

export async function DELETE(req: Request, { params }: { params: { tripId: string } }) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const owner = await prisma.tripMember.findFirst({
    where: { tripId: params.tripId, user: { email: session.user.email } },
  });
  if (!owner || !canManageMembers(owner.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  await removeMember(owner.userId, params.tripId, body.memberId);
  return NextResponse.json({ ok: true });
}
