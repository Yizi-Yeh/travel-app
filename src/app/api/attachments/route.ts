import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createAttachment, getAttachment } from "@/lib/services/attachments";

export async function GET(req: Request) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const attachment = await getAttachment(id);
  if (!attachment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const hasAccess = await prisma.tripMember.findFirst({
    where: { tripId: attachment.tripId, user: { email: session.user.email } },
  });
  if (!hasAccess) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({
    data: {
      id: attachment.id,
      tripId: attachment.tripId,
      ownerType: attachment.ownerType,
      ownerId: attachment.ownerId,
      name: attachment.name,
      mime: attachment.mime,
      size: attachment.size,
      dataBase64: Buffer.from(attachment.blob).toString("base64"),
      createdAt: attachment.createdAt,
      updatedAt: attachment.updatedAt,
    },
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const hasAccess = await prisma.tripMember.findFirst({
    where: { tripId: body.tripId, user: { email: session.user.email } },
  });
  if (!hasAccess) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const attachment = await createAttachment({
    tripId: body.tripId,
    ownerType: body.ownerType,
    ownerId: body.ownerId,
    name: body.name,
    mime: body.mime,
    size: body.size,
    dataBase64: body.dataBase64,
  });

  return NextResponse.json({ data: attachment });
}
