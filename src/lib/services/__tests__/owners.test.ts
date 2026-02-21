import { canRemoveMember } from "@/lib/services/owners";

test("cannot remove last owner", () => {
  expect(canRemoveMember({ targetRole: "OWNER", ownersCount: 1 })).toBe(false);
});

test("can remove member", () => {
  expect(canRemoveMember({ targetRole: "MEMBER", ownersCount: 1 })).toBe(true);
});
