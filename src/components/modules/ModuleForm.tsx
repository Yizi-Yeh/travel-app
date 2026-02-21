"use client";

import { Box, Button, TextField } from "@mui/material";
import type { ModuleConfig } from "@/lib/modules/registry";

export function ModuleForm({ config }: { config: ModuleConfig }) {
  return (
    <Box component="form" sx={{ mb: 2, display: "grid", gap: 1 }}>
      {config.fields.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          name={field.name}
          required={field.required}
          fullWidth
          size="small"
        />
      ))}
      <Button variant="contained">新增</Button>
    </Box>
  );
}
