"use client";

import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useOrderHistory } from "../../hooks/useOrderHistory";
import { OrderCard } from "../../components/order/OrderCard";

export default function HistoryPage() {
  const router = useRouter();
  const { orders, isLoading, error, user, mounted } = useOrderHistory();

  if (!mounted || isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: "center", mt: 10 }}>
        <Typography color="error" sx={{ fontWeight: "bold" }}>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        width: "100%",
        p: 3,
        mt: 4,
        bgcolor: "background.default",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          textTransform: "uppercase",
          color: "text.primary",
        }}
        gutterBottom
      >
        Order History
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Welcome back, {user?.name || user?.email}. Here are your previous
        purchases.
      </Typography>

      {orders.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 0,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Typography sx={{ fontWeight: "bold", mb: 2, color: "text.primary" }}>
            You haven &#39; t placed any orders yet.
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push("/products")}
            sx={{
              bgcolor: "primary.main",
              color: "background.paper",
              borderRadius: 0,
              "&:hover": {
                bgcolor: "action.hover",
                color: "text.primary",
              },
            }}
          >
            Start Shopping
          </Button>
        </Paper>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </Box>
      )}
    </Box>
  );
}
