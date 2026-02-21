import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export function AppShell({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>{children}</Box>
    </Box>
  );
}
