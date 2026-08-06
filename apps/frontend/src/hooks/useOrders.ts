
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import type { Order } from "../types/order";

export const useOrders = (
  user: { email: string } | null,
  token: string | null,
) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user || !token) return;

    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const makeRequest = async (currentToken: string | null) => {
          return fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/my`, {
            // Впевніться, що тут вірний шлях (у вас в контролері це 'orders/my')
            headers: {
              Authorization: `Bearer ${currentToken}`,
              "Content-Type": "application/json",
            },
          });
        };

        let res = await makeRequest(token);

        // Логіка оновлення токену, якщо отримали 401
        if (res.status === 401) {
          const refreshRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            {
              method: "POST",
              credentials: "include",
            },
          );

          if (refreshRes.ok) {
            const { accessToken } = await refreshRes.json();
            const currentUser = useAuthStore.getState().user;
            if (currentUser) {
              useAuthStore.getState().login(currentUser, accessToken);
            }
            // Повторюємо запит з новим токеном
            res = await makeRequest(accessToken);
          } else {
            useAuthStore.getState().logout();
            router.push("/login");
            throw new Error("Session expired");
          }
        }

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("COULD NOT LOAD ORDERS.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user, token, router]);

  return {
    orders,
    isLoading,
    error,
  };
};