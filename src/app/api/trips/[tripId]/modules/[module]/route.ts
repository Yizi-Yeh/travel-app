import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getModuleConfig, type ModuleName } from "@/lib/modules/registry";
import { validateRequiredFields } from "@/lib/modules/validators";

const prismaModelMap: Record<ModuleName, keyof typeof prisma> = {
  period: "tripPeriod",
  itinerary: "itineraryDay",
  todo: "todo",
  flight: "flight",
  transport: "transport",
  accommodation: "accommodation",
  internet: "internetPlan",
  "entry-qrcode": "entryQRCode",
  insurance: "insurance",
  expense: "expense",
  checklist: "checklistItem",
  shopping: "shoppingItem",
  coupons: "coupon",
};

async function ensureMember(tripId: string, email: string) {
  const member = await prisma.tripMember.findFirst({
    where: { tripId, user: { email } },
  });
  return member;
}

export async function GET(_: Request, { params }: { params: { tripId: string; module: ModuleName } }) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const member = await ensureMember(params.tripId, session.user.email);
  if (!member) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const model = prismaModelMap[params.module];
  const data = await (prisma[model] as any).findMany({
    where: { tripId: params.tripId },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({ data });
}

export async function POST(req: Request, { params }: { params: { tripId: string; module: ModuleName } }) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const member = await ensureMember(params.tripId, session.user.email);
  if (!member) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const config = getModuleConfig(params.module);
  validateRequiredFields(config, body);

  const model = prismaModelMap[params.module];
  const created = await (prisma[model] as any).create({
    data: { ...body, tripId: params.tripId },
  });

  return NextResponse.json({ data: created });
}

export async function PATCH(req: Request, { params }: { params: { tripId: string; module: ModuleName } }) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const member = await ensureMember(params.tripId, session.user.email);
  if (!member) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  if (!body.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const model = prismaModelMap[params.module];
  const updated = await (prisma[model] as any).update({
    where: { id: body.id },
    data: { ...body },
  });

  return NextResponse.json({ data: updated });
}

export async function DELETE(req: Request, { params }: { params: { tripId: string; module: ModuleName } }) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const member = await ensureMember(params.tripId, session.user.email);
  if (!member) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  if (!body.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const model = prismaModelMap[params.module];
  await (prisma[model] as any).delete({ where: { id: body.id } });

  return NextResponse.json({ ok: true });
}
