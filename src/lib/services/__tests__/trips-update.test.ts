import { validateTripName } from "@/lib/services/trips";

test("rejects whitespace name", () => {
  expect(() => validateTripName("   ")).toThrow();
});
