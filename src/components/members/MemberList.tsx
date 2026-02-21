"use client";

import { Box, Button, Chip, List, ListItem, ListItemText, TextField } from "@mui/material";
import { useState } from "react";

export type Member = {
  email: string;
  role: "OWNER" | "MEMBER";
};

export function MemberList({ members, canManage = false }: { members: Member[]; canManage?: boolean }) {
  const [email, setEmail] = useState("");

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      {canManage && (
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            label="邀請成員 Email"
            size="small"
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button variant="contained">邀請</Button>
        </Box>
      )}
      <List dense>
        {members.map((member) => (
          <ListItem key={member.email} secondaryAction={canManage ? <Button size="small">移除</Button> : null}>
            <ListItemText primary={member.email} />
            <Chip size="small" label={member.role} sx={{ ml: 1 }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
