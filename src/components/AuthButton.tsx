"use client";

import { Button } from "@mui/material";
import { signIn, signOut } from "next-auth/react";

export function AuthButton({ isAuthenticated = false }: { isAuthenticated?: boolean }) {
  if (isAuthenticated) {
    return (
      <Button color="inherit" onClick={() => signOut()}>
        Sign out
      </Button>
    );
  }
  return (
    <Button color="inherit" onClick={() => signIn("google")}>
      Sign in
    </Button>
  );
}
