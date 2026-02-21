\"use client\";

import { useState } from \"react\";
import MenuIcon from \"@mui/icons-material/Menu\";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from \"@mui/material\";
import { TripSwitcher } from "@/components/TripSwitcher";
import { SyncStatus } from "@/components/SyncStatus";
import { AuthButton } from "@/components/AuthButton";
import { NavList } from "@/components/NavList";

export function AppShell({
  title,
  children,
  isAuthenticated = false,
}: {
  title: string;
  children?: React.ReactNode;
  isAuthenticated?: boolean;
}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 260;

  const drawer = (
    <Box sx={{ width: drawerWidth }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Divider />
      <NavList onNavigate={() => setMobileOpen(false)} />
    </Box>
  );

  return (
    <Box>
      <AppBar position="sticky" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {!isDesktop && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setMobileOpen(true)}
                aria-label="open navigation"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6">{title}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TripSwitcher />
            <SyncStatus status="online" />
            <AuthButton isAuthenticated={isAuthenticated} />
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex" }}>
        {isDesktop ? (
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{ [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" } }}
          >
            {drawer}
          </Drawer>
        )}
        <Box sx={{ flexGrow: 1, p: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
}
