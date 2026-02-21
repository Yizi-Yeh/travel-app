import { getOfflineDB, type Mutation } from "@/lib/offline/db";

export async function enqueue(input: Omit<Mutation, "createdAt" | "id">) {
  const db = await getOfflineDB();
  const id = await db.add("mutationQueue", { ...input, createdAt: Date.now() });
  return id;
}

export async function listQueue() {
  const db = await getOfflineDB();
  return db.getAll("mutationQueue");
}

export async function clearQueue() {
  const db = await getOfflineDB();
  await db.clear("mutationQueue");
}
