
"use client";
import { useState } from "react";
import type { CheckoutFormData } from "../types/checkout";
import type { CartItem } from "../types/cart";

export const useCheckout = (token: string | null, items: CartItem[]) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleProceedToPayment = async (data: CheckoutFormData) => {
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
            ...data,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to initiate payment session.",
        );
      }

      const responseData = await response.json();

      if (responseData.url) {
        window.location.href = responseData.url;
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

  return { handleProceedToPayment, isLoading, errorMessage };
};
