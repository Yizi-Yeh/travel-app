"use client";

import Link from "next/link";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { listModules } from "@/lib/modules/registry";

export function NavList({ onNavigate }: { onNavigate: () => void }) {
  const modules = listModules();
  return (
    <List>
      {modules.map((module) => (
        <ListItemButton
          key={module.name}
          component={Link}
          href={`/trip/${module.name}`}
          onClick={onNavigate}
        >
          <ListItemText primary={module.title} />
        </ListItemButton>
      ))}
    </List>
  );
}
