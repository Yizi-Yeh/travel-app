export function canRemoveMember(input: { targetRole: "OWNER" | "MEMBER"; ownersCount: number }) {
  if (input.targetRole === "OWNER" && input.ownersCount <= 1) {
    return false;
  }
  return true;
}
