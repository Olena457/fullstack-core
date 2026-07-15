"use client";

import { Box, Typography, TextField, Button } from "@mui/material";

interface CheckoutFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const CheckoutForm = ({
  formData,
  handleChange,
  onSubmit,
  isLoading,
}: CheckoutFormProps) => {
  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
      "& fieldset": { borderColor: "black" },
      "&:hover fieldset": { borderColor: "black", borderWidth: "2px" },
      "&.Mui-focused fieldset": { borderColor: "#FF4500", borderWidth: "2px" },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#FF4500" },
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 900, textTransform: "uppercase" }}
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
          fullWidth
          required
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          sx={inputStyles}
        />
        <TextField
          fullWidth
          required
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
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
          fullWidth
          required
          type="email"
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          sx={inputStyles}
        />
        <TextField
          fullWidth
          required
          type="tel"
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          sx={inputStyles}
        />
      </Box>

      <TextField
        fullWidth
        required
        label="Street Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
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
          fullWidth
          required
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          sx={inputStyles}
        />
        <TextField
          fullWidth
          required
          label="Postal Code"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
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
          bgcolor: "black",
          color: "white",
          py: 2,
          fontWeight: "bold",
          fontSize: "1.1rem",
          textTransform: "uppercase",
          "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
          "&.Mui-disabled": { bgcolor: "grey.500", color: "white" },
        }}
      >
        {isLoading ? "Redirecting to Stripe..." : "Pay with Stripe"}
      </Button>
    </Box>
  );
};
