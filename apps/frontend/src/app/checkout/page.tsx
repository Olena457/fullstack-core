
"use client";

import { useEffect } from "react";
import { Box, Typography, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";
import type { CartStore } from "../../store/cartStore";
import type { AuthStore } from "../../types/auth";
import { useCheckout } from "../../hooks/useCheckout"; 

import { CheckoutForm } from "../../components/checkout/CheckoutForm";
import { CheckoutSummary } from "../../components/checkout/CheckoutSummary";

export default function CheckoutPage() {
  const router = useRouter();

  const items = useCartStore((state: CartStore) => state.items);
  const user = useAuthStore((state: AuthStore) => state.user);
  const token = useAuthStore((state: AuthStore) => state.token);

  const { handleProceedToPayment, isLoading, errorMessage } = useCheckout(
    token,
    items,
  );

  useEffect(() => {
    if (items.length === 0) {
      router.push("/products");
    }
  }, [items, router]);

  if (items.length === 0) return null;

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: "1200px",
        mx: "auto",
        mt: 2,
        color: "text.primary",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 900, textTransform: "uppercase", mb: 4 }}
      >
        Checkout
      </Typography>

      {errorMessage && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: 0, border: 1, borderColor: "error.main" }}
        >
          {errorMessage}
        </Alert>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr" },
          gap: 6,
        }}
      >
        <CheckoutForm
          onSubmit={handleProceedToPayment}
          isLoading={isLoading}
          defaultValues={{
            firstName: user?.name?.split(" ")[0] || "",
            lastName: user?.name?.split(" ")[1] || "",
            email: user?.email || "",
          }}
        />

        <CheckoutSummary />
      </Box>
    </Box>
  );
}