import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { TripSwitcher } from "@/components/TripSwitcher";
import { SyncStatus } from "@/components/SyncStatus";

export function AppShell({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
          <Typography variant="h6">{title}</Typography>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TripSwitcher />
            <SyncStatus status="online" />
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>{children}</Box>
    </Box>
  );
}
