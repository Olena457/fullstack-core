
"use client";

import { Box, Typography, Paper, Chip, Divider, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../store/cartStore";
import type { Order } from "../../types/order";
import type { Product } from "../../types/product";

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const router = useRouter();

  const handleReorder = () => {
    const addToCart = useCartStore.getState().addToCart;
    order.items.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        addToCart(item.product as Product, item.size, item.color);
      }
    });
    router.push("/cart");
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 0,
        borderColor: "divider",
        borderLeft: 4,
        borderLeftColor: "primary.main",
        bgcolor: "background.paper",
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
        <Typography sx={{ fontWeight: 900, color: "text.primary", fontSize: { xs: "0.9rem", sm: "1rem" } }}>
          ORDER #{order.id.slice(0, 8).toUpperCase()}
        </Typography>
        <Chip
          label={order.status}
          size="small"
          sx={{
            borderRadius: 0,
            fontWeight: "bold",
            bgcolor:
              order.status === "PENDING" ? "secondary.main" : "primary.main",
            color: "background.paper",
          }}
        />
      </Box>

      <Typography color="text.secondary" sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
        Placed on: {new Date(order.createdAt).toLocaleDateString()}
      </Typography>

      <Divider sx={{ my: 2, borderColor: "divider" }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {order.items.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{ 
                  fontWeight: "bold", 
                  color: "text.primary",
                  fontSize: { xs: "0.85rem", sm: "0.875rem" },
                  lineHeight: 1.3
                }}
              >
                {item.product?.title || "Unknown Product"}
                <Typography 
                  component="span" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: "inherit",
                    whiteSpace: "nowrap" 
                  }}
                >
                  &nbsp;x {item.quantity}
                </Typography>
              </Typography>

              {(item.size || item.color) && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 0.5, fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
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

            <Typography
              sx={{ 
                fontWeight: "bold", 
                color: "text.primary",
                fontSize: { xs: "0.85rem", sm: "0.875rem" }
              }}
            >
              ${((item.product?.price || 0) * item.quantity).toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: { xs: 2, sm: 3 },
          pt: 2,
          borderTop: 2,
          borderColor: "divider",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontWeight: 900, fontSize: { xs: "0.95rem", sm: "1.1rem" }, color: "text.primary" }}
        >
          TOTAL: ${order.totalPrice.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          onClick={handleReorder}
          sx={{
            bgcolor: "primary.main",
            color: "background.paper",
            borderRadius: 0,
            fontWeight: "bold",
            fontSize: { xs: "0.7rem", sm: "0.875rem" },
            px: { xs: 1.5, sm: 2 },
            py: { xs: 0.5, sm: 0.75 },
            minWidth: { xs: "100px", sm: "auto" },
            "&:hover": {
              bgcolor: "action.hover",
              color: "text.primary",
            },
          }}
        >
          Order Again
        </Button>
      </Box>
    </Paper>
  );
};