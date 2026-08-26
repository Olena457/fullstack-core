"use client";

import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import { OrderCard } from "../../../components/order/OrderCard";
import type {
  AuthState,
  AdminOrder,
  OrderStatus,
} from "../../../types/admin";

interface Props {
  params: { id: string };
}

export default function OrderDetailsPage({ params }: Props) {
  const { id } = params;
  const router = useRouter();
  const token = useAuthStore((state: AuthState) => state.token);

  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchSingleOrder = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setOrder(data);
        }
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleOrder();
  }, [id, token]);

  const handleStatusChange = async (newStatus: string) => {
    if (!order) return;

    setOrder({ ...order, status: newStatus as OrderStatus });

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!order) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography>Order not found.</Typography>
        <Button onClick={() => router.push("/admin")} sx={{ mt: 2 }}>
          Back to Admin
        </Button>
      </Box>
    );
  }

  const customerName = order.user?.name || `${order.firstName || ""} ${order.lastName || ""}`.trim() || "Unknown";

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: { xs: 2, md: 4 } }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push("/admin")}
        sx={{ mb: 4, color: "text.primary", borderRadius: 0 }}
      >
        Back to Orders
      </Button>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, textTransform: "uppercase" }}
          >
            Order Details
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Customer: {customerName} ({order.user?.email || order.email})
          </Typography>
          <Typography color="text.secondary">
            Delivery: {order.npCity}, {order.npBranch} | Phone: {order.phone}
          </Typography>
        </Box>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Order Status</InputLabel>
          <Select
            value={order.status}
            label="Order Status"
            onChange={(e) => handleStatusChange(e.target.value)}
            sx={{ borderRadius: 0, fontWeight: 700 }}
          >
            <MenuItem value="PENDING">PENDING</MenuItem>
            <MenuItem value="PAID">PAID</MenuItem>
            <MenuItem value="SHIPPED">SHIPPED</MenuItem>
            <MenuItem value="CANCELLED">CANCELLED</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <OrderCard order={order} />
    </Box>
  );
}