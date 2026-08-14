

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
        p: { xs: 2, sm: 3, md: 4 },
        bgcolor: "background.paper",
        border: 2,
        borderColor: "divider",
        height: "fit-content",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 900,
          textTransform: "uppercase",
          mb: { xs: 2, sm: 4 },
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
        }}
      >
        Summary
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, alignItems: "center" }}>
        <Typography color="text.secondary" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
          Items count:
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 900, fontSize: { xs: "1rem", sm: "1.25rem" } }}>
          {items.reduce((sum, item) => sum + item.cartQuantity, 0)} pcs
        </Typography>
      </Box>

      <Divider sx={{ my: { xs: 2, sm: 3 }, borderColor: "divider" }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: { xs: 3, sm: 4 }, alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
          TOTAL:
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 900, fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
          ${totalPrice.toFixed(2)}
        </Typography>
      </Box>

      <Button
        onClick={handleProceedToCheckout}
        fullWidth
        variant="contained"
        disabled={items.length === 0}
        sx={{
          bgcolor: "primary.main",
          color: "background.paper",
          borderRadius: 0,
          py: { xs: 1.5, sm: 2 },
          fontSize: { xs: "0.9rem", sm: "1.1rem" },
          fontWeight: 900,
          letterSpacing: "1px",
          "&:hover": {
            bgcolor: "action.hover",
            color: "text.primary",
          },
          "&.Mui-disabled": {
            bgcolor: "action.disabledBackground",
            color: "action.disabled",
          },
        }}
      >
        PROCEED TO CHECKOUT
      </Button>
    </Box>
  );
};
