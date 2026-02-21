import { buildScopedWhere, sanitizeUpdatePayload } from "@/lib/modules/guards";

test("buildScopedWhere scopes by id and tripId", () => {
  expect(buildScopedWhere("rec", "trip")).toEqual({ id: "rec", tripId: "trip" });
});

test("sanitizeUpdatePayload strips id and tripId", () => {
  const input = { id: "x", tripId: "t", name: "ok" };
  expect(sanitizeUpdatePayload(input)).toEqual({ name: "ok" });
});
