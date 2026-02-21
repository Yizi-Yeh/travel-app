"use client";

import { Box, Button, Typography } from "@mui/material";
import { signIn } from "next-auth/react";

export function SignInPanel() {
  return (
    <Box sx={{ textAlign: "center", mt: 6, display: "grid", gap: 2 }}>
      <Typography variant="h5">開始管理你的日本旅程</Typography>
      <Typography variant="body2" color="text.secondary">
        登入後即可建立旅程、管理行程與離線使用。
      </Typography>
      <Button variant="contained" onClick={() => signIn("google")}>使用 Google 登入</Button>
    </Box>
  );
}
