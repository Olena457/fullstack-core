"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useAuthStore } from "../../store/authStore";
import { OrderCard } from "../../components/order/OrderCard";
import type { Order } from "../../types/order";

export default function OrdersPage() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

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

  if (!user) {
    return (
      <Box
        sx={{
          p: 4,
          maxWidth: "1400px",
          mx: "auto",
          textAlign: "center",
          mt: 10,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 900, textTransform: "uppercase", mb: 4 }}
        >
          Please login to view your orders
        </Typography>
        <Link href="/login" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "black",
              color: "white",
              borderRadius: 0,
              px: 5,
              py: 1.5,
              fontWeight: "bold",
            }}
          >
            GO TO LOGIN
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: "800px", mx: "auto" }}>
      <Typography
        variant="h3"
        sx={{ fontWeight: 900, textTransform: "uppercase", mb: 2 }}
      >
        Order History
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 6, fontWeight: "bold", textTransform: "uppercase" }}
      >
        ACCOUNT: {user.email}
      </Typography>

      {isLoading ? (
        <Typography sx={{ fontWeight: "bold" }}>LOADING ORDERS...</Typography>
      ) : error ? (
        <Typography sx={{ color: "error.main", fontWeight: "bold" }}>
          {error}
        </Typography>
      ) : !orders || orders.length === 0 ? (
        <Typography sx={{ fontWeight: "bold" }}>NO ORDERS FOUND.</Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </Box>
      )}
    </Box>
  );
}
