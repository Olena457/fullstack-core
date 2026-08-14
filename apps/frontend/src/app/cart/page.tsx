

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
          p: { xs: 2, sm: 4 }, 
          maxWidth: "1400px",
          mx: "auto",
          textAlign: "center",
          mt: { xs: 5, sm: 10 },
          color: "text.primary",
        }}
      >
        <Typography
          variant="h4"
          sx={{ 
            fontWeight: 900, 
            textTransform: "uppercase", 
            mb: 2,
            fontSize: { xs: "1.5rem", sm: "2.125rem" } 
          }}
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
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              fontWeight: "bold",
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
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
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: "1400px", mx: "auto", color: "text.primary" }}>
      <Typography
        variant="h4"
        sx={{ 
          fontWeight: 900, 
          textTransform: "uppercase", 
          mb: { xs: 2, sm: 3 },
          fontSize: { xs: "1.5rem", sm: "2.125rem" } 
        }}
      >
        Shopping Cart
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: { xs: 3, lg: 6 },
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <OrderItemList />
        <OrderSidebar />
      </Box>
    </Box>
  );
}