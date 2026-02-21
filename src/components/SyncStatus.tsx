import { Chip } from "@mui/material";

export type SyncState = "online" | "offline" | "syncing";

export function SyncStatus({ status }: { status: SyncState }) {
  if (status === "syncing") {
    return <Chip size="small" color="warning" label="Syncing" />;
  }
  if (status === "offline") {
    return <Chip size="small" color="default" label="Offline" />;
  }
  return <Chip size="small" color="success" label="Online" />;
}
