"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";
import type { CartStore } from "../../store/cartStore";
import type { AuthStore } from "../../types/auth";

// Імпортуємо наші компоненти
import { CheckoutForm } from "../../components/checkout/CheckoutForm";
import { CheckoutSummary } from "../../components/checkout/CheckoutSummary";

export default function CheckoutPage() {
  const router = useRouter();

  const items = useCartStore((state: CartStore) => state.items);
  const user = useAuthStore((state: AuthStore) => state.user);
  const token = useAuthStore((state: AuthStore) => state.token);

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (items.length === 0) {
      router.push("/products");
    }
  }, [items, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: items.map((item) => ({
              productId: item.id,
              quantity: item.cartQuantity,
              size: item.selectedSize,
              color: item.selectedColor,
            })),
            shippingInfo: formData,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to initiate payment session.",
        );
      }

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Stripe URL not returned from backend.");
      }

    } catch (err: unknown) {
      console.error("Checkout Error:", err);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <Box sx={{ p: 4, maxWidth: "1200px", mx: "auto", mt: 2 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 900, textTransform: "uppercase", mb: 4 }}
      >
        Checkout
      </Typography>

      {errorMessage && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: 0, border: "1px solid black" }}
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
          formData={formData}
          handleChange={handleChange}
          onSubmit={handleProceedToPayment}
          isLoading={isLoading}
        />

        <CheckoutSummary />
      </Box>
    </Box>
  );
}
