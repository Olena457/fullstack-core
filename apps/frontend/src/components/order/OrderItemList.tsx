"use client";

import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import { Trash2 } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

export const OrderItemList = () => {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();

  return (
    <Box sx={{ flexGrow: 1 }}>
      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            mb: 3,
            p: 2,
            border: "1px solid black",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              sx={{
                fontWeight: 900,
                textTransform: "uppercase",
                fontSize: "1.2rem",
              }}
            >
              {item.title}
            </Typography>
            <Typography color="text.secondary">
              Size: {item.selectedSize} | Color: {item.selectedColor}
            </Typography>
            <Typography sx={{ fontWeight: "bold", mt: 1 }}>
              ${item.price.toFixed(2)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              type="number"
              size="small"
              value={item.cartQuantity}
              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
              slotProps={{ htmlInput: { min: 1, step: 1 } }}
              sx={{
                width: "80px",
                "& .MuiOutlinedInput-root": { borderRadius: 0 },
              }}
            />
            <Typography
              sx={{ fontWeight: 900, minWidth: "80px", textAlign: "right" }}
            >
              ${(item.price * item.cartQuantity).toFixed(2)}
            </Typography>
            <IconButton
              onClick={() => removeItem(item.id)}
              sx={{
                color: "black",
                borderRadius: 0,
                "&:hover": { bgcolor: "rgba(0,0,0,0.1)" },
              }}
            >
              <Trash2 size={24} />
            </IconButton>
          </Box>
        </Box>
      ))}

      <Button
        onClick={clearCart}
        variant="outlined"
        sx={{
          borderRadius: 0,
          color: "black",
          borderColor: "black",
          fontWeight: "bold",
        }}
      >
        CLEAR CART
      </Button>
    </Box>
  );
};
