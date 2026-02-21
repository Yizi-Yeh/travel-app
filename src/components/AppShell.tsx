import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { TripSwitcher } from "@/components/TripSwitcher";
import { SyncStatus } from "@/components/SyncStatus";
import { AuthButton } from "@/components/AuthButton";

export function AppShell({
  title,
  children,
  isAuthenticated = false,
}: {
  title: string;
  children?: React.ReactNode;
  isAuthenticated?: boolean;
}) {
  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
          <Typography variant="h6">{title}</Typography>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TripSwitcher />
            <SyncStatus status="online" />
            <AuthButton isAuthenticated={isAuthenticated} />
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>{children}</Box>
    </Box>
  );
}
