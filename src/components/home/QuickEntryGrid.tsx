"use client";

import Link from "next/link";
import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import { listModules } from "@/lib/modules/registry";

export function QuickEntryGrid() {
  const modules = listModules();

  return (
    <Grid container spacing={2}>
      {modules.map((module) => (
        <Grid item xs={6} key={module.name}>
          <Card variant="outlined">
            <CardActionArea component={Link} href={`/trip/${module.name}`}>
              <CardContent>
                <Typography variant="body1">{module.title}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
