"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import { useStore } from "./useStore";
import type { Order } from "../types/order";

export const useOrderHistory = () => {
  const router = useRouter();

  const token = useStore(useAuthStore, (state) => state.token);
  const user = useStore(useAuthStore, (state) => state.user);
  const isAuthenticated = useStore(useAuthStore, (state) =>
    state.isAuthenticated(),
  );

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token === undefined || isAuthenticated === undefined) return;

    if (!token || !isAuthenticated) {
      router.push("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setIsLoading(true);

        const makeRequest = async (currentToken: string | null) => {
          return fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/my`, {
            headers: {
              Authorization: `Bearer ${currentToken}`,
              "Content-Type": "application/json",
            },
          });
        };

        let response = await makeRequest(token);

        if (response.status === 401) {
          const refreshResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            {
              method: "POST",
              credentials: "include",
            },
          );

          if (refreshResponse.ok) {
            const { accessToken } = await refreshResponse.json();
            const currentUser = useAuthStore.getState().user;
            if (currentUser) {
              useAuthStore.getState().login(currentUser, accessToken);
            }
            response = await makeRequest(accessToken);
          } else {
            useAuthStore.getState().logout();
            router.push("/login");
            throw new Error("Session expired. Please log in again.");
          }
        }

        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError("Could not load your order history. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [token, isAuthenticated, router]);

  return {
    orders,
    isLoading: isLoading || token === undefined,
    error,
    user,
    mounted: token !== undefined,
  };
};
