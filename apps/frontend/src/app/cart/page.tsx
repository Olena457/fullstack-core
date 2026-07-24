
"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useCartStore } from "../../store/cartStore";
import { OrderItemList } from "../../components/order/OrderItemList";
import { OrderSidebar } from "../../components/order/OrderSidebar";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (items.length === 0) {
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
          sx={{ fontWeight: 900, textTransform: "uppercase", mb: 2 }}
        >
          Your cart is empty
        </Typography>
        <Link href="/products" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "primary.main",
              color: "background.paper",
              borderRadius: 0,
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "action.hover",
                color: "text.primary",
              },
            }}
          >
            CONTINUE SHOPPING
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: "1400px", mx: "auto", color: "text.primary" }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 900, textTransform: "uppercase", mb: 3 }}
      >
        Shopping Cart
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 6,
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <OrderItemList />
        <OrderSidebar />
      </Box>
    </Box>
  );
}
