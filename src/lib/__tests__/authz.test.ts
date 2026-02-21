import { canManageMembers } from "@/lib/authz";

it("owner can manage members", () => {
  expect(canManageMembers("OWNER")).toBe(true);
});
