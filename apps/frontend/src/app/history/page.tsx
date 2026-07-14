"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";
import type { Order } from "../../types/order";

export default function HistoryPage() {
  const router = useRouter();

  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
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
  }, [token, router]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress color="inherit" />
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
    <Box sx={{ maxWidth: 800, mx: "auto", width: "100%", p: 3, mt: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 900, textTransform: "uppercase" }}
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
            borderColor: "black",
          }}
        >
          <Typography sx={{ fontWeight: "bold", mb: 2 }}>
            You haven &#39; t placed any orders yet.
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push("/products")}
            sx={{
              bgcolor: "black",
              color: "white",
              borderRadius: 0,
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            }}
          >
            Start Shopping
          </Button>
        </Paper>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {orders.map((order) => (
            <Paper
              key={order.id}
              variant="outlined"
              sx={{
                p: 3,
                borderRadius: 0,
                borderColor: "black",
                borderLeft: "4px solid black",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Typography sx={{ fontWeight: 900 }}>
                  ORDER #{order.id.slice(0, 8).toUpperCase()}
                </Typography>
                <Chip
                  label={order.status}
                  size="small"
                  sx={{
                    borderRadius: 0,
                    fontWeight: "bold",
                    bgcolor: order.status === "PENDING" ? "#FF4500" : "black",
                    color: "white",
                  }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </Typography>

              <Divider sx={{ my: 2, borderColor: "rgba(0,0,0,0.1)" }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {order.items.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {item.title}
                        <Typography component="span" color="text.secondary">
                          &#88; {item.quantity}
                        </Typography>
                      </Typography>

                      {(item.size || item.color) && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block", mt: 0.2 }}
                        >
                          {[
                            item.size && `Size: ${item.size}`,
                            item.color && `Color: ${item.color}`,
                          ]
                            .filter(Boolean)
                            .join(" | ")}
                        </Typography>
                      )}
                    </Box>

                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 3,
                  pt: 2,
                  borderTop: "2px solid black",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: 900, fontSize: "1.1rem" }}>
                  TOTAL: ${order.totalPrice.toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
