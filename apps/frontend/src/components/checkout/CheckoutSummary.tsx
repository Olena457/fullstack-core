"use client";

import { Box, Typography, Paper, Divider } from "@mui/material";
import { useCartStore } from "../../store/cartStore";
import type { CartStore } from "../../store/cartStore";

export const CheckoutSummary = () => {
  const items = useCartStore((state: CartStore) => state.items);
  const getTotalPrice = useCartStore((state: CartStore) => state.getTotalPrice);

  return (
    <Box>
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: 0,
          borderColor: "black",
          position: "sticky",
          top: "100px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 900, textTransform: "uppercase", mb: 3 }}
        >
          Order Summary
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
          {items.map((item) => (
            <Box
              key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {item.title}{" "}
                  <Typography component="span" color="text.secondary">
                    × {item.cartQuantity}
                  </Typography>
                </Typography>
                {(item.selectedSize || item.selectedColor) && (
                  <Typography variant="caption" color="text.secondary">
                    {[item.selectedSize, item.selectedColor]
                      .filter(Boolean)
                      .join(" | ")}
                  </Typography>
                )}
              </Box>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                ${(item.price * item.cartQuantity).toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 2, borderColor: "rgba(0,0,0,0.1)" }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography color="text.secondary">Subtotal</Typography>
                  <Typography sx={{ fontWeight:"bold" }}>
            ${getTotalPrice().toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography color="text.secondary">Shipping</Typography>
          <Typography  sx={{ color: "green", fontWeight:"bold" }}>
            FREE
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            pt: 2,
            borderTop: "2px solid black",
          }}
        >
          <Typography sx={{ fontWeight: 900, fontSize: "1.2rem" }}>
            TOTAL
          </Typography>
          <Typography
            sx={{ fontWeight: 900, fontSize: "1.2rem", color: "#FF4500" }}
          >
            ${getTotalPrice().toFixed(2)}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
