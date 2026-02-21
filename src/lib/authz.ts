export type TripRole = "OWNER" | "MEMBER";

export function canManageMembers(role: TripRole) {
  return role === "OWNER";
}
