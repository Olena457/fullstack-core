
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
import { useEffect, useState, use } from "react";
import { useAuthStore } from "../../../../store/authStore";
import { fetchWithAuth } from "../../../../utils/fetchWithAuth";
import { CustomerDetailsCard } from "../../../../components/admin/CustomerDetailsCard";
import { DeliveryDetailsCard } from "../../../../components/admin/DeliveryDetailsCard";
import { OrderItemsTable } from "../../../../components/admin/OrderItemsTable";

import type {
  AuthState,
  AdminOrder,
  OrderStatus,
} from "../../../../types/admin";

interface Props {
  params: Promise<{ id: string }>;
}

export default function OrderDetailsPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const token = useAuthStore((state: AuthState) => state.token);

  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !id || id === "undefined") {
      const timer = setTimeout(() => setLoading(false), 0);
      return () => clearTimeout(timer);
    }

    const fetchSingleOrder = async () => {
      try {
        const response = await fetchWithAuth(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
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
      await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status: newStatus }),
        },
      );
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
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          The requested ID was: {id}
        </Typography>
        <Button onClick={() => router.push("/admin")} sx={{ mt: 2 }}>
          BACK TO ADMIN
        </Button>
      </Box>
    );
  }

  const customerName =
    order.user?.name ||
    `${order.firstName || ""} ${order.lastName || ""}`.trim() ||
    "Unknown";

  const customerEmail = order.user?.email || order.email || "No email provided";

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, md: 2 } }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push("/admin")}
        sx={{ mb: 3, color: "text.primary", borderRadius: 0, fontWeight: 700 }}
      >
        BACK TO ADMIN PANEL
      </Button>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, textTransform: "uppercase" }}
          >
            Order #{order.id.slice(0, 8)}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Placed on: {new Date(order.createdAt).toLocaleString()}
          </Typography>
        </Box>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel sx={{ fontWeight: 600 }}>Order Status</InputLabel>
          <Select
            value={order.status}
            label="Order Status"
            onChange={(e) => handleStatusChange(e.target.value)}
            sx={{ borderRadius: 0, fontWeight: 800 }}
          >
            <MenuItem value="PENDING">PENDING</MenuItem>
            <MenuItem value="PAID">PAID</MenuItem>
            <MenuItem value="SHIPPED">SHIPPED</MenuItem>
            <MenuItem value="CANCELLED">CANCELLED</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
          mb: 4,
        }}
      >
        <CustomerDetailsCard
          name={customerName}
          email={customerEmail}
          phone={order.phone || undefined}
        />
        <DeliveryDetailsCard
          city={order.npCity || undefined}
          branch={order.npBranch || undefined}
        />
      </Box>

      <OrderItemsTable
        items={order.items || []}
        totalPrice={order.totalPrice}
      />
    </Box>
  );
}