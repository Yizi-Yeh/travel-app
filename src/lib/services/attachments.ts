import { prisma } from "@/lib/db";

const allowedMimes = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
]);

export function validateMime(mime: string) {
  return allowedMimes.has(mime);
}

export async function createAttachment(input: {
  tripId: string;
  ownerType: "FLIGHT" | "TRANSPORT" | "ACCOMMODATION" | "INTERNET" | "ENTRY_QRCODE" | "INSURANCE" | "COUPON";
  ownerId: string;
  name: string;
  mime: string;
  size: number;
  dataBase64: string;
}) {
  if (!validateMime(input.mime)) {
    throw new Error("Unsupported mime type");
  }
  const buffer = Buffer.from(input.dataBase64, "base64");
  return prisma.attachment.create({
    data: {
      tripId: input.tripId,
      ownerType: input.ownerType,
      ownerId: input.ownerId,
      name: input.name,
      mime: input.mime,
      size: input.size,
      blob: buffer,
    },
  });
}

export async function getAttachment(id: string) {
  return prisma.attachment.findUnique({ where: { id } });
}
