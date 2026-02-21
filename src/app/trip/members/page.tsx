import { AppShell } from "@/components/AppShell";
import { MemberList } from "@/components/members/MemberList";

const demoMembers = [
  { email: "owner@example.com", role: "OWNER" as const },
  { email: "member@example.com", role: "MEMBER" as const },
];

export default function MembersPage() {
  return (
    <AppShell title="成員管理">
      <MemberList members={demoMembers} canManage />
    </AppShell>
  );
}
