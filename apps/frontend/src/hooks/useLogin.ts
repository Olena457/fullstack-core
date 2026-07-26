"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import type { LoginFormData } from "../components/auth/schemas/login";

export const useLogin = () => {
  const router = useRouter();
  const loginToStore = useAuthStore((state) => state.login);

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to login");
      }

      loginToStore(result.user, result.accessToken);
      router.push("/products");
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

  return { handleLogin, isLoading, apiError };
};
