import { prisma } from "@/lib/db";
import { canManageMembers } from "@/lib/authz";

export function validateTripName(name: string) {
  if (!name.trim()) {
    throw new Error("Trip name is required");
  }
}

export async function createTrip(userId: string, data: { name: string; notes?: string | null }) {
  validateTripName(data.name);
  return prisma.trip.create({
    data: {
      name: data.name,
      notes: data.notes ?? null,
      members: {
        create: [{ userId, role: "OWNER" }],
      },
    },
  });
}

export async function updateTrip(userId: string, tripId: string, data: { name?: string; notes?: string | null }) {
  const member = await prisma.tripMember.findUnique({
    where: { tripId_userId: { tripId, userId } },
  });
  if (!member) {
    throw new Error("Forbidden");
  }
  if (data.name) validateTripName(data.name);
  return prisma.trip.update({
    where: { id: tripId },
    data: {
      name: data.name,
      notes: data.notes ?? undefined,
    },
  });
}

export async function deleteTrip(userId: string, tripId: string) {
  const member = await prisma.tripMember.findUnique({
    where: { tripId_userId: { tripId, userId } },
  });
  if (!member || !canManageMembers(member.role)) {
    throw new Error("Forbidden");
  }
  return prisma.trip.delete({ where: { id: tripId } });
}

export async function addMember(ownerId: string, tripId: string, email: string) {
  const owner = await prisma.tripMember.findUnique({
    where: { tripId_userId: { tripId, userId: ownerId } },
  });
  if (!owner || !canManageMembers(owner.role)) {
    throw new Error("Forbidden");
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }
  return prisma.tripMember.create({
    data: { tripId, userId: user.id, role: "MEMBER" },
  });
}

export async function removeMember(ownerId: string, tripId: string, memberId: string) {
  const owner = await prisma.tripMember.findUnique({
    where: { tripId_userId: { tripId, userId: ownerId } },
  });
  if (!owner || !canManageMembers(owner.role)) {
    throw new Error("Forbidden");
  }
  return prisma.tripMember.delete({ where: { id: memberId } });
}
