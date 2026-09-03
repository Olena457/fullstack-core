"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import { useStore } from "./useStore";
import { fetchWithAuth } from "../utils/fetchWithAuth"; 
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

        const response = await fetchWithAuth(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/my`
        );

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