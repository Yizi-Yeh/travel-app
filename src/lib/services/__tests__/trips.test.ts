import { validateTripName } from "@/lib/services/trips";

it("rejects empty trip name", () => {
  expect(() => validateTripName("")).toThrow();
});
