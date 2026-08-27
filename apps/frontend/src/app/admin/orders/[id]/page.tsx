
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
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { useAuthStore } from "../../../../store/authStore";
import type {
  AuthState,
  AdminOrder,
  OrderStatus,
} from "../../../../types/admin";
import type { OrderItemType } from "../../../../types/order";

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
    <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, md: 4 } }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push("/admin")}
        sx={{ mb: 4, color: "text.primary", borderRadius: 0, fontWeight: 700 }}
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
            variant="h4"
            sx={{ fontWeight: 900, textTransform: "uppercase" }}
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
        <Paper
          variant="outlined"
          sx={{ p: 3, borderRadius: 0, borderColor: "divider" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <PersonOutlinedIcon />
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, textTransform: "uppercase" }}
            >
              Customer Details
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "baseline" }}>
              <Typography color="text.secondary">Name:</Typography>
              <Typography sx={{ fontWeight: 600 }}>{customerName}</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "baseline" }}>
              <Typography color="text.secondary">Email:</Typography>
              <Typography sx={{ fontWeight: 600 }}>{customerEmail}</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "baseline" }}>
              <Typography color="text.secondary">Phone:</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {order.phone || "—"}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper
          variant="outlined"
          sx={{ p: 3, borderRadius: 0, borderColor: "divider" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <LocalShippingOutlinedIcon />
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, textTransform: "uppercase" }}
            >
              Nova Poshta Delivery
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "baseline" }}>
              <Typography color="text.secondary">City:</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {order.npCity || "—"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "baseline" }}>
              <Typography color="text.secondary">Branch:</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {order.npBranch || "—"}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Paper
        variant="outlined"
        sx={{ borderRadius: 0, borderColor: "divider" }}
      >
        <Box
          sx={{
            p: 3,
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <ReceiptOutlinedIcon />
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, textTransform: "uppercase" }}
          >
            Order Items
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: "action.hover" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800 }}>PRODUCT</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>ATTRIBUTES</TableCell>
                <TableCell align="center" sx={{ fontWeight: 800 }}>
                  QTY
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 800 }}>
                  PRICE
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 800 }}>
                  TOTAL
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items?.map((item: OrderItemType) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Typography sx={{ fontWeight: 600 }}>
                      {item.product?.title || "Unknown Product"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      SKU: {item.product?.sku || "—"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {item.size && (
                      <Typography variant="body2">
                        Size: <strong>{item.size}</strong>
                      </Typography>
                    )}
                    {item.color && (
                      <Typography variant="body2">
                        Color: <strong>{item.color}</strong>
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{ fontWeight: 600 }}>
                      x{item.quantity}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    ${Number(item.product?.price || 0).toFixed(2)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>
                    $
                    {(Number(item.product?.price || 0) * item.quantity).toFixed(
                      2,
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "flex-end",
            bgcolor: "action.hover",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            TOTAL PAID: ${order.totalPrice.toFixed(2)}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}