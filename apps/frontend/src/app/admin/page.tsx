"use client";

import {
  Box,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useRouter } from "next/navigation";
import { OrderCard } from "../../components/order/OrderCard";
import type { AuthState, AdminOrder } from "../../types/admin";

export default function AdminPage() {
  const router = useRouter();

  const { user, token } = useAuthStore((state: AuthState) => ({
    user: state.user,
    token: state.token,
  }));

  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (!user || user.role !== "ADMIN") {
      router.push("/");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, router, token, isMounted]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );
      if (response.ok) {
        setOrders(
          orders.map((o) =>
            o.id === orderId ? { ...o, status: newStatus } : o,
          ),
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  if (!isMounted) return null;
  if (loading)
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Loading...</Typography>
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: { xs: 2, md: 4 } }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 900, mb: 4, textTransform: "uppercase" }}
      >
        Admin Panel - Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {orders.map((order) => (
            <Paper
              key={order.id}
              sx={{ p: 3, border: 1, borderColor: "divider", borderRadius: 0 }}
            >
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  ORDER #{order.id.slice(0, 8).toUpperCase()}
                </Typography>

                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={order.status}
                    label="Status"
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    <MenuItem value="PENDING">PENDING</MenuItem>
                    <MenuItem value="PAID">PAID</MenuItem>
                    <MenuItem value="SHIPPED">SHIPPED</MenuItem>
                    <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Customer:</strong> {order.user?.name} (
                  {order.user?.email})
                </Typography>
                <Typography variant="body2">
                  <strong>Delivery:</strong> {order.npCity}, {order.npBranch}
                </Typography>
                <Typography variant="body2">
                  <strong>Phone:</strong> {order.phone}
                </Typography>
              </Box>

              <OrderCard order={order} />
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
