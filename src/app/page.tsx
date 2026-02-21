import { AppShell } from "@/components/AppShell";
import { HomeContent } from "@/components/home/HomeContent";
import { authConfig } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";

function formatDate(value: Date | null | undefined) {
  if (!value) return undefined;
  return value.toISOString().slice(0, 10);
}

export default async function HomePage() {
  const session = await getServerSession(authConfig);
  const isAuthenticated = Boolean(session?.user?.email);

  if (!isAuthenticated) {
    return (
      <AppShell title="Japan Trip PWA" isAuthenticated={false}>
        <HomeContent isAuthenticated={false} trips={[]} />
      </AppShell>
    );
  }

  const trips = await prisma.trip.findMany({
    where: { members: { some: { user: { email: session!.user!.email! } } } },
    include: { period: true },
    orderBy: { updatedAt: "desc" },
  });

  const tripCards = trips.map((trip) => ({
    id: trip.id,
    name: trip.name,
    location: trip.location,
    period: {
      startDate: formatDate(trip.period?.startDate),
      endDate: formatDate(trip.period?.endDate),
    },
  }));

  return (
    <AppShell title="Japan Trip PWA" isAuthenticated={true}>
      <HomeContent isAuthenticated={true} trips={tripCards} />
    </AppShell>
  );
}
