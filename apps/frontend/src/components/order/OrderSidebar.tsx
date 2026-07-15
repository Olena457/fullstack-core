
"use client";

import { Box, Typography, Button, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../store/cartStore";

export const OrderSidebar = () => {
  const router = useRouter();
  const { items } = useCartStore();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.cartQuantity,
    0,
  );

  const handleProceedToCheckout = () => {
    router.push("/checkout");
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", lg: "400px" },
        flexShrink: 0,
        p: 4,
        bgcolor: "#f5f5f5",
        border: "2px solid black",
        height: "fit-content",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 900, textTransform: "uppercase", mb: 4 }}
      >
        Summary
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography color="text.secondary">Items count:</Typography>
        <Typography variant="h6" sx={{ fontWeight: 900 }}>
          {items.reduce((sum, item) => sum + item.cartQuantity, 0)} pcs
        </Typography>
      </Box>

      <Divider sx={{ my: 3, borderColor: "black" }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          TOTAL:
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 900 }}>
          ${totalPrice.toFixed(2)}
        </Typography>
      </Box>

      <Button
        onClick={handleProceedToCheckout}
        fullWidth
        variant="contained"
        disabled={items.length === 0}
        sx={{
          bgcolor: "black",
          color: "white",
          borderRadius: 0,
          py: 2,
          fontSize: "1.1rem",
          fontWeight: 900,
          letterSpacing: "1px",
          "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
          "&.Mui-disabled": { bgcolor: "grey.500", color: "white" },
        }}
      >
        PROCEED TO CHECKOUT
      </Button>
    </Box>
  );
};