"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import type { CheckoutFormData } from "../types/checkout";
import type { CartItem } from "../types/cart";

export const useCheckout = (token: string | null, items: CartItem[]) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleProceedToPayment = async (data: CheckoutFormData) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const makeRequest = async (currentToken: string | null) => {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/checkout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentToken}`,
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
        });
      };

      let response = await makeRequest(token);

      if (response.status === 401) {
        console.log("Token expired, attempting to refresh...");

        const refreshResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {
            method: "POST",
            credentials: "include",
          },
        );

        if (refreshResponse.ok) {
          const { accessToken } = await refreshResponse.json();

          const user = useAuthStore.getState().user;
          if (user) {
            useAuthStore.getState().login(user, accessToken);
          }

          response = await makeRequest(accessToken);
        } else {
          useAuthStore.getState().logout();
          router.push("/login");
          throw new Error("Session expired. Please log in again.");
        }
      }

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
