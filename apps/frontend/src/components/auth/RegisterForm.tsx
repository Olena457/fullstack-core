

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField, Typography, Alert, IconButton, InputAdornment } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
}).required();

export type RegisterFormData = yup.InferType<typeof registerSchema>;

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  isLoading: boolean;
  apiError: string | null;
}

export const RegisterForm = ({ onSubmit, isLoading, apiError }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  return (
    <Box sx={{ width: "100%", maxWidth: 400, border: "1px solid black", p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 900, textTransform: "uppercase", mb: 4, textAlign: "center" }}>
        Create Account
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        
        <TextField
          {...register("name")}
          label="Full Name"
          placeholder="John Doe"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          disabled={isLoading}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
        />

        <TextField
          {...register("email")}
          label="Email"
          placeholder="example@mail.com"
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
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {apiError && <Alert severity="error" sx={{ borderRadius: 0 }}>{apiError}</Alert>}

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
          {isLoading ? "Creating account..." : "Sign Up"}
        </Button>

        <Typography sx={{ textAlign: "center", mt: 2 }}>
          Already have an account? <Link href="/login" style={{ fontWeight: "bold", color: "black" }}>Log In</Link>
        </Typography>
      </Box>
    </Box>
  );
};