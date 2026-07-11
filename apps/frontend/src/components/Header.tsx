"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Badge,
  IconButton,
} from "@mui/material";
import { ShoppingCart, Clock, User } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "../store/cartStore";

export const Header = () => {
  const items = useCartStore((state) => state.items);

  const totalItems = items.reduce((sum, item) => sum + item.cartQuantity, 0);

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "white",
        color: "black",
        boxShadow: "none",
        borderBottom: "2px solid black",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        {/*logo*/}
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.05em",
            }}
          >
            ENTROPIC
          </Typography>
        </Link>

        {/* main navigation*/}
        <Box
          sx={{ display: { xs: "none", md: "flex" }, gap: 6, fontWeight: 800 }}
        >
          <Link
            href="/products"
            style={{
              textDecoration: "none",
              color: "inherit",
              textTransform: "uppercase",
            }}
          >
            Home
          </Link>
          <Link
            href="/products"
            style={{
              textDecoration: "none",
              color: "inherit",
              textTransform: "uppercase",
            }}
          >
            Deals
          </Link>
          <Link
            href="/products"
            style={{
              textDecoration: "none",
              color: "inherit",
              textTransform: "uppercase",
            }}
          >
            Story
          </Link>
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {/* story orders */}
          <Link href="/orders">
            <IconButton
              sx={{
                color: "black",
                borderRadius: 0,
                "&:hover": { bgcolor: "rgba(0,0,0,0.1)" },
              }}
            >
              <Clock size={26} strokeWidth={2.5} />
            </IconButton>
          </Link>

          <Link href="/cart">
            <IconButton
              sx={{
                color: "black",
                borderRadius: 0,
                "&:hover": { bgcolor: "rgba(0,0,0,0.1)" },
              }}
            >
              <Badge
                badgeContent={totalItems}
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    borderRadius: 0, 
                    fontWeight: "bold",
                    border: "1px solid black",
                  },
                }}
              >
                <ShoppingCart size={26} strokeWidth={2.5} />
              </Badge>
            </IconButton>
          </Link>

          <Link href="/login">
            <IconButton
              sx={{
                color: "black",
                borderRadius: 0,
                "&:hover": { bgcolor: "rgba(0,0,0,0.1)" },
              }}
            >
              <User size={26} strokeWidth={2.5} />
            </IconButton>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
