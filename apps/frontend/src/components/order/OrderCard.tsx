"use client";

import { Box, Typography, Button, Divider, Chip, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../store/cartStore";
import type { Order } from "../../types/order";

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleReorder = () => {
    order.items.forEach((item) => {
      const productMock = {
        id: item.productId,
        title: item.title,
        price: item.price,
        imageUrl: "",
        sizes: [],
        colors: [],
      };
      for (let i = 0; i < item.quantity; i++) {
        addToCart(productMock, item.size, item.color);
      }
    });
    router.push("/cart");
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 0,
        border: "2px solid black",
        boxShadow: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 900, textTransform: "uppercase" }}
        >
          Order #{order.id.slice(-4)}
        </Typography>
        <Chip
          label={order.status}
          sx={{
            borderRadius: 0,
            fontWeight: "bold",
            border: "1px solid black",
            bgcolor: order.status === "DELIVERED" ? "#e0ffe0" : "#fff0e0",
          }}
        />
      </Box>

      <Typography variant="body2" sx={{ mb: 2, fontWeight: "bold" }}>
        {new Date(order.createdAt).toLocaleString()}
      </Typography>

      <Divider sx={{ my: 2, borderColor: "black" }} />

      {order.items.map((item) => (
        <Box
          key={item.id}
          sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            {item.quantity}x {item.title}
            {item.size && ` (Size: ${item.size})`}
            {item.color && ` (Color: ${item.color})`}
          </Typography>
          <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
        </Box>
      ))}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
          pt: 2,
          borderTop: "2px solid black",
        }}
      >
        <Typography sx={{ fontWeight: 900, fontSize: "1.2rem" }}>
          TOTAL: ${order.totalPrice.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          onClick={handleReorder}
          sx={{
            bgcolor: "black",
            color: "white",
            borderRadius: 0,
            fontWeight: "bold",
            "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
          }}
        >
          REORDER
        </Button>
      </Box>
    </Paper>
  );
};
