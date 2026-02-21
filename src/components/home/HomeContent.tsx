"use client";

import { Box, Divider, Typography } from "@mui/material";
import { SignInPanel } from "@/components/home/SignInPanel";
import { TripCardList, type TripCard } from "@/components/home/TripCardList";

export function HomeContent({ isAuthenticated, trips }: { isAuthenticated: boolean; trips: TripCard[] }) {
  if (!isAuthenticated) {
    return <SignInPanel />;
  }

  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          旅程總覽
        </Typography>
        <TripCardList trips={trips} />
      </Box>
      <Divider />
    </Box>
  );
}
