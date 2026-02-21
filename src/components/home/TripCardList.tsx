"use client";

import { Card, CardContent, Grid, Typography } from "@mui/material";

export type TripCard = {
  id: string;
  name: string;
  location?: string | null;
  period?: { startDate?: string | null; endDate?: string | null } | null;
};

function formatRange(period?: TripCard["period"]) {
  if (!period?.startDate && !period?.endDate) return "";
  const start = period?.startDate ?? "";
  const end = period?.endDate ?? "";
  return `${start} ~ ${end}`.trim();
}

export function TripCardList({ trips }: { trips: TripCard[] }) {
  return (
    <Grid container spacing={2}>
      {trips.map((trip) => (
        <Grid item xs={12} key={trip.id}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">{trip.name}</Typography>
              {trip.location && (
                <Typography variant="body2" color="text.secondary">
                  {trip.location}
                </Typography>
              )}
              {formatRange(trip.period) && (
                <Typography variant="body2" color="text.secondary">
                  {formatRange(trip.period)}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
