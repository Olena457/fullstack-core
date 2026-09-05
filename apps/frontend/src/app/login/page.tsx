
"use client";

import { Box } from "@mui/material";
import { LoginForm } from "../../components/auth/LoginForm";
import { useLogin } from "../../hooks/useLogin";
import BackgroundText from "../../components/ui/BackgroundText";

export default function LoginPage() {
  const { handleLogin, isLoading, apiError } = useLogin();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        bgcolor: "background.default",
        p: 4,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: (theme) =>
            theme.palette.mode === "dark"
              ? `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`
              : `linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
          backgroundSize: { xs: "130px 130px", md: "200px 200px" },
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "10px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 1,
          pointerEvents: "none",
          opacity: 0.6,
        }}
      >
        <BackgroundText />
      </Box>

      <Box
        sx={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 450 }}
      >
        <LoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          apiError={apiError}
        />
      </Box>
    </Box>
  );
}