
"use client";

import { useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";
import { OrderCard } from "../../components/order/OrderCard";
import { useOrders } from "../../hooks/useOrders";
import { useStore } from "../../hooks/useStore";

export default function OrdersPage() {
  const router = useRouter();
  const user = useStore(useAuthStore, (state) => state.user);
  const token = useStore(useAuthStore, (state) => state.token);
  const isAuthenticated = useStore(useAuthStore, (state) => state.isAuthenticated());

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const { orders, isLoading, error } = useOrders(user ?? null, token ?? null);

  if (isAuthenticated === undefined || isAuthenticated === false || !user) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: "800px", mx: "auto", color: "text.primary" }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 900,
          textTransform: "uppercase",
          mb: 2,
          color: "text.primary",
        }}
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
        <Typography sx={{ fontWeight: "bold", color: "text.primary" }}>
          LOADING ORDERS...
        </Typography>
      ) : error ? (
        <Typography sx={{ color: "error.main", fontWeight: "bold" }}>
          {error}
        </Typography>
      ) : !orders || orders.length === 0 ? (
        <Typography sx={{ fontWeight: "bold", color: "text.secondary" }}>
          NO ORDERS FOUND.
        </Typography>
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