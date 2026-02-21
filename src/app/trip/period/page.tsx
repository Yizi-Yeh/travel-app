import { TripModuleShell } from "@/components/modules/TripModuleShell";
import { getModuleConfig } from "@/lib/modules/registry";

export const periodTitle = getModuleConfig("period").title;

export default function Page() {
  return <TripModuleShell module="period" />;
}
