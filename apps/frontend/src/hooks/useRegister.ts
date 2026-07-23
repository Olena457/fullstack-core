
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import type { RegisterFormData } from "../components/auth/schemas/auth";

export const useRegister = () => {
  const router = useRouter();
  const loginToStore = useAuthStore((state) => state.login);

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to register");
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

  return {
    handleRegister,
    isLoading,
    apiError,
  };
};
