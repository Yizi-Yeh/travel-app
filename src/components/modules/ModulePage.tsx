"use client";

import { Box, Typography } from "@mui/material";
import { getModuleConfig, type ModuleName } from "@/lib/modules/registry";
import { ModuleList } from "@/components/modules/ModuleList";
import { ModuleForm } from "@/components/modules/ModuleForm";

export function ModulePage({ module }: { module: ModuleName }) {
  const config = getModuleConfig(module);
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {config.title}
      </Typography>
      <ModuleForm config={config} />
      <ModuleList config={config} />
    </Box>
  );
}
