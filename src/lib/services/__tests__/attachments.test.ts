import { validateMime } from "@/lib/services/attachments";

it("allows pdf", () => {
  expect(validateMime("application/pdf")).toBe(true);
});
