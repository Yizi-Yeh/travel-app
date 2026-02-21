import { authConfig } from "@/lib/auth";

it("uses Google provider", () => {
  expect(authConfig.providers.length).toBe(1);
});
