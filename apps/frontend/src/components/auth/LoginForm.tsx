
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import { loginSchema } from "../auth/schemas/login";
import type {LoginFormData} from "../auth/schemas/login"

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading: boolean;
  apiError: string | null;
}

export const LoginForm = ({
  onSubmit,
  isLoading,
  apiError,
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        border: 1,
        borderColor: "divider",
        p: 4,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          textTransform: "uppercase",
          mb: 4,
          textAlign: "center",
          color: "text.primary",
        }}
      >
        Login
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          {...register("email")}
          label="Email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={isLoading}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
        />

        <TextField
          {...register("password")}
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          disabled={isLoading}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "text.secondary" }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {apiError && (
          <Alert severity="error" sx={{ borderRadius: 0 }}>
            {apiError}
          </Alert>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{
            mt: 2,
            py: 1.5,
            borderRadius: 0,
            bgcolor: "primary.main",
            color: "background.paper",
            fontWeight: "bold",
            textTransform: "uppercase",
            "&:hover": {
              bgcolor: "action.hover",
              color: "text.primary",
            },
          }}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>

        <Typography sx={{ textAlign: "center", mt: 2, color: "text.primary" }}>
          Don&#39;t have an account?{" "}
          <Link
            href="/register"
            style={{ fontWeight: "bold", color: "inherit" }}
          >
            Register
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};