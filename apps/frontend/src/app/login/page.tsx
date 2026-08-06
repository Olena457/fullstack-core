"use client";

import { Box } from "@mui/material";
import { LoginForm } from "../../components/auth/LoginForm";
import { useLogin } from "../../hooks/useLogin";

export default function LoginPage() {
  const { handleLogin, isLoading, apiError } = useLogin();

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      }}
    >
      <LoginForm
        onSubmit={handleLogin}
        isLoading={isLoading}
        apiError={apiError}
      />
    </Box>
  );
}
