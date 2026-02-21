import { listQueue, clearQueue } from "@/lib/offline/queue";

export async function syncQueue(baseUrl: string, tripId: string) {
  const queue = await listQueue();
  for (const item of queue) {
    await fetch(`${baseUrl}/api/trips/${tripId}/modules/${item.module}`, {
      method: item.op === "delete" ? "DELETE" : item.op === "update" ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item.payload),
    });
  }
  await clearQueue();
}
