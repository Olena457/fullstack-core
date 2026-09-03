"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/fetchWithAuth"; // Увага: перевір шлях до файлу fetchWithAuth!
import type { Order } from "../types/order";

export const useOrders = (
  user: { email: string } | null,
  token: string | null,
) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !token) return;

    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetchWithAuth(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/my`,
        );

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
  }, [user, token]);

  return {
    orders,
    isLoading,
    error,
  };
};
