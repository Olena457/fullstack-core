"use client";

import { Box, Badge, IconButton, Typography } from "@mui/material";
import { ShoppingCart, Clock, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";

export const HeaderActions = () => {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.cartQuantity, 0);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
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

      {user ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            ml: { xs: 0, md: 2 },
            borderLeft: { xs: "none", md: "2px solid black" },
            pl: { xs: 0, md: 3 },
          }}
        >
          <Typography
            sx={{
              fontWeight: 900,
              textTransform: "uppercase",
              display: { xs: "none", sm: "block" },
            }}
          >
            HELLO, {user.name ? user.name.split(" ")[0] : "USER"}
          </Typography>
          <IconButton
            onClick={handleLogout}
            sx={{
              color: "black",
              borderRadius: 0,
              "&:hover": { bgcolor: "rgba(0,0,0,0.1)" },
            }}
            title="Logout"
          >
            <LogOut size={26} strokeWidth={2.5} />
          </IconButton>
        </Box>
      ) : (
        <Link href="/login">
          <IconButton
            sx={{
              color: "black",
              borderRadius: 0,
              "&:hover": { bgcolor: "rgba(0,0,0,0.1)" },
            }}
            title="Login"
          >
            <User size={26} strokeWidth={2.5} />
          </IconButton>
        </Link>
      )}
    </Box>
  );
};
