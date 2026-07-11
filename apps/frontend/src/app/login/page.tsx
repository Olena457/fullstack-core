"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";

const loginSchema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const loginToStore = useAuthStore((state) => state.login);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setIsLoading(true);
    setApiError(null);
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to login");
      }

      loginToStore(result.user, result.access_token);
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

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
      <Box
        sx={{ width: "100%", maxWidth: 400, border: "1px solid black", p: 4 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            textTransform: "uppercase",
            mb: 4,
            textAlign: "center",
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
              bgcolor: "black",
              color: "white",
              fontWeight: "bold",
              textTransform: "uppercase",
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <Typography sx={{ textAlign: "center", mt: 2 }}>
            Do n &#39; t have an account?
            <Link
              href="/register"
              style={{ fontWeight: "bold", color: "black" }}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
