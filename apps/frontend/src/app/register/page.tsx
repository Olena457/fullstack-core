
"use client";

import { Box } from "@mui/material";
import { RegisterForm } from "../../components/auth/RegisterForm";
import { useRegister } from "../../hooks/useRegister";

export default function RegisterPage() {
  const { handleRegister, isLoading, apiError } = useRegister();

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
      <RegisterForm
        onSubmit={handleRegister}
        isLoading={isLoading}
        apiError={apiError}
      />
    </Box>
  );
}