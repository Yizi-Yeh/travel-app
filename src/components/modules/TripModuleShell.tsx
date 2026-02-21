import { getServerSession } from "next-auth";
import { AppShell } from "@/components/AppShell";
import { ModulePage } from "@/components/modules/ModulePage";
import { authConfig } from "@/lib/auth";
import { getModuleConfig, type ModuleName } from "@/lib/modules/registry";

export async function TripModuleShell({ module }: { module: ModuleName }) {
  const config = getModuleConfig(module);
  const session = await getServerSession(authConfig);
  const isAuthenticated = Boolean(session?.user?.email);

  return (
    <AppShell title={config.title} isAuthenticated={isAuthenticated}>
      <ModulePage module={module} />
    </AppShell>
  );
}
