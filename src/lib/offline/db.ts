import { openDB, type DBSchema } from "idb";

export type Mutation = {
  id?: number;
  op: "create" | "update" | "delete";
  module: string;
  payload: Record<string, unknown>;
  createdAt: number;
};

interface OfflineDB extends DBSchema {
  records: {
    key: string;
    value: { key: string; value: unknown; updatedAt: number };
    indexes: { "by-updated": number };
  };
  mutationQueue: {
    key: number;
    value: Mutation;
  };
}

const DB_NAME = "japan-trip-pwa";
const DB_VERSION = 1;

export function getOfflineDB() {
  return openDB<OfflineDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const records = db.createObjectStore("records", { keyPath: "key" });
      records.createIndex("by-updated", "updatedAt");
      db.createObjectStore("mutationQueue", { keyPath: "id", autoIncrement: true });
    },
  });
}
