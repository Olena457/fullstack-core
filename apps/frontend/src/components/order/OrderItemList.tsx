
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
          key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            gap: { xs: 2, sm: 3 },
            mb: 3,
            p: { xs: 2, sm: 3 },
            border: 1,
            borderColor: "divider",
          }}
        >
          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Typography
              sx={{
                fontWeight: 900,
                textTransform: "uppercase",
                fontSize: { xs: "1rem", sm: "1.2rem" },
                lineHeight: 1.2,
                mb: 0.5,
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.title}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}
            >
              Size: {item.selectedSize} | Color: {item.selectedColor}
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                mt: 1,
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              ${item.price.toFixed(2)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              width: { xs: "100%", sm: "auto" },
              justifyContent: { xs: "space-between", sm: "flex-start" },
            }}
          >
            <TextField
              type="number"
              size="small"
              value={item.cartQuantity}
              onChange={(e) =>
                updateQuantity(
                  item.id,
                  item.selectedSize,
                  item.selectedColor,
                  Number(e.target.value),
                )
              }
              slotProps={{ htmlInput: { min: 1, step: 1 } }}
              sx={{
                width: { xs: "70px", sm: "80px" },
                "& .MuiOutlinedInput-root": { borderRadius: 0 },
              }}
            />
            <Typography
              sx={{
                fontWeight: 900,
                minWidth: { xs: "auto", sm: "80px" },
                textAlign: { xs: "center", sm: "right" },
                fontSize: { xs: "1rem", sm: "1.1rem" },
              }}
            >
              ${(item.price * item.cartQuantity).toFixed(2)}
            </Typography>
            <IconButton
              onClick={() =>
                removeItem(item.id, item.selectedSize, item.selectedColor)
              }
              sx={{
                color: "text.primary",
                borderRadius: 0,
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <Trash2 size={22} />
            </IconButton>
          </Box>
        </Box>
      ))}

      <Button
        onClick={clearCart}
        variant="outlined"
        sx={{
          borderRadius: 0,
          color: "text.primary",
          borderColor: "text.primary",
          fontWeight: "bold",
          bgcolor: "action.hover",
          width: { xs: "100%", sm: "auto" },
          "&:hover": {
            bgcolor: "action.hover",
            borderColor: "text.primary",
          },
        }}
      >
        CLEAR CART
      </Button>
    </Box>
  );
};