"use client";

import { useEffect, Suspense } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cartStore"; 
function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (clearCart) {
      clearCart();
    }
  }, [clearCart]);

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
          border: 1,
          borderColor: "divider",
          borderRadius: 0,
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <CheckCircle size={80} color="#10B981" strokeWidth={1.5} />
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            textTransform: "uppercase",
            mb: 2,
            color: "text.primary",
          }}
        >
          Payment Successful!
        </Typography>

        <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
          Thank you for your purchase. Your order has been placed and is being
          processed.
        </Typography>

        {orderId && (
          <Box
            sx={{
              bgcolor: "action.hover",
              p: 2,
              mb: 4,
              border: 1,
              borderColor: "divider",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 0.5 }}
            >
              Order Reference Number:
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              {orderId}
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            component={Link}
            href="/history"
            fullWidth
            variant="outlined"
            sx={{
              borderRadius: 0,
              py: 1.5,
              fontWeight: "bold",
              borderColor: "text.primary",
              color: "text.primary",
              "&:hover": {
                borderColor: "text.primary",
                bgcolor: "action.hover",
              },
            }}
          >
            View Orders
          </Button>
          <Button
            component={Link}
            href="/products"
            fullWidth
            variant="contained"
            sx={{
              borderRadius: 0,
              py: 1.5,
              fontWeight: "bold",
              bgcolor: "primary.main",
              color: "background.paper",
              "&:hover": { bgcolor: "action.hover", color: "text.primary" },
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<Box sx={{ minHeight: "70vh" }} />}>
      <SuccessContent />
    </Suspense>
  );
}
