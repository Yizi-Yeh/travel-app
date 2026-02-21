import { validateTripName } from "@/lib/services/trips";

test("accepts location", () => {
  expect(() => validateTripName("Trip")).not.toThrow();
});
