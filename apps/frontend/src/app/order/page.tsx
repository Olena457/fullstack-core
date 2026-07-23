
"use client";

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useAuthStore } from "../../store/authStore";
import { OrderCard } from "../../components/order/OrderCard";
import { useOrders } from "../../hooks/useOrders";

export default function OrdersPage() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const { orders, isLoading, error } = useOrders(user, token);

  if (!user) {
    return (
      <Box
        sx={{
          p: 4,
          maxWidth: "1400px",
          mx: "auto",
          textAlign: "center",
          mt: 10,
          color: "text.primary",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            textTransform: "uppercase",
            mb: 4,
            color: "text.primary",
          }}
        >
          Please login to view your orders
        </Typography>
        <Link href="/login" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "primary.main",
              color: "background.paper",
              borderRadius: 0,
              px: 5,
              py: 1.5,
              fontWeight: "bold",
              "&:hover": { bgcolor: "action.hover", color: "text.primary" },
            }}
          >
            GO TO LOGIN
          </Button>
        </Link>
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