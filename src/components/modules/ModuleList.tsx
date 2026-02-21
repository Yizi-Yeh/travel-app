"use client";

import { Box, Typography } from "@mui/material";
import type { ModuleConfig } from "@/lib/modules/registry";

export function ModuleList({ config }: { config: ModuleConfig }) {
  return (
    <Box>
      <Typography variant="body2" color="text.secondary">
        {config.title} 列表（尚未連接資料）
      </Typography>
    </Box>
  );
}
