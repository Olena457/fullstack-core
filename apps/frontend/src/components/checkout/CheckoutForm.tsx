"use client";

import { Box, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { checkoutSchema } from "../auth/schemas/checkout";
import type {CheckoutFormData} from "../auth/schemas/checkout"

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isLoading: boolean;
}

export const CheckoutForm = ({ onSubmit, isLoading }: CheckoutFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(checkoutSchema),
  });

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
      "& fieldset": { borderColor: "divider" }, 
      "&:hover fieldset": { borderColor: "text.primary", borderWidth: "2px" }, 
      "&.Mui-focused fieldset": {
        borderColor: "secondary.main",
        borderWidth: "2px",
      }, 
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "secondary.main" }, 
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 900,
          textTransform: "uppercase",
          color: "text.primary",
        }}
      >
        1. Shipping Information
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TextField
          {...register("firstName")}
          fullWidth
          label="First Name"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          disabled={isLoading}
          sx={inputStyles}
        />
        <TextField
          {...register("lastName")}
          fullWidth
          label="Last Name"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          disabled={isLoading}
          sx={inputStyles}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TextField
          {...register("email")}
          fullWidth
          type="email"
          label="Email Address"
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={isLoading}
          sx={inputStyles}
        />
        <TextField
          {...register("phone")}
          fullWidth
          type="tel"
          label="Phone Number"
          error={!!errors.phone}
          helperText={errors.phone?.message}
          disabled={isLoading}
          sx={inputStyles}
        />
      </Box>

      <TextField
        {...register("address")}
        fullWidth
        label="Street Address"
        error={!!errors.address}
        helperText={errors.address?.message}
        disabled={isLoading}
        sx={inputStyles}
      />

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TextField
          {...register("city")}
          fullWidth
          label="City"
          error={!!errors.city}
          helperText={errors.city?.message}
          disabled={isLoading}
          sx={inputStyles}
        />
        <TextField
          {...register("postalCode")}
          fullWidth
          label="Postal Code"
          error={!!errors.postalCode}
          helperText={errors.postalCode?.message}
          disabled={isLoading}
          sx={inputStyles}
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{
          mt: 2,
          borderRadius: 0,
          bgcolor: "primary.main", 
          color: "background.paper",
          py: 2,
          fontWeight: "bold",
          fontSize: "1.1rem",
          textTransform: "uppercase",
          "&:hover": {
            bgcolor: "action.hover", 
            color: "text.primary",
          },
          "&.Mui-disabled": {
            bgcolor: "action.disabledBackground", 
            color: "action.disabled",
          },
        }}
      >
        {isLoading ? "Redirecting to Stripe..." : "Pay with Stripe"}
      </Button>
    </Box>
  );
};
