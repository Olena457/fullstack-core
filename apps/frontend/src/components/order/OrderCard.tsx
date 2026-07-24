
"use client";

import { Box, Typography, Paper, Chip, Divider } from "@mui/material";
import type { Order } from "../../types/order";

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
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
        <Typography sx={{ fontWeight: 900, color: "text.primary" }}>
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

      <Typography variant="body2" color="text.secondary">
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
            }}
          >
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", color: "text.primary" }}
              >
                {item.title}
                <Typography component="span" color="text.secondary">
                  {" "}
                  x {item.quantity}
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

            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
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
          borderTop: 2,
          borderColor: "divider", 
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontWeight: 900, fontSize: "1.1rem", color: "text.primary" }}
        >
          TOTAL: ${order.totalPrice.toFixed(2)}
        </Typography>
      </Box>
    </Paper>
  );
};