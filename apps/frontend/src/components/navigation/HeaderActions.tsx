

"use client";

import { Box, Badge, IconButton, Typography } from "@mui/material";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";

const MenuButton = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => (
  <Link href={href} style={{ textDecoration: "none" }}>
    <IconButton
      sx={{
        borderRadius: 0,
        px: 2,
        py: 1,
        "&:hover": { bgcolor: "rgba(0,0,0,0.1)" },
        color: "black",
      }}
    >
      <Typography sx={{ fontWeight: 500, textTransform: "uppercase" }}>
        {children}
      </Typography>
    </IconButton>
  </Link>
);

export const HeaderActions = () => {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.cartQuantity, 0);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <Box
      sx={{ display: "flex", gap: 1, alignItems: "center", fontSize: "16px" }}
    >
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
            <Typography sx={{ fontWeight: 500, textTransform: "uppercase" }}>
              ORDER
            </Typography>
          </Badge>
        </IconButton>
      </Link>

      <MenuButton href="/history">HISTORY</MenuButton>

      {user && (
        <MenuButton href="/history">HISTORY</MenuButton>
      )}

      {/* register */}
      {user ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderLeft: "2px solid black",
            ml: 1,
            pl: 2,
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              textTransform: "uppercase",
              mr: 2,
              display: { xs: "none", sm: "block" },
            }}
          >
            HELLO, {user.name?.split(" ")[0] || "USER"}
          </Typography>
          <IconButton
            onClick={() => {
              logout();
              router.push("/login");
            }}
            sx={{
              color: "black",
              borderRadius: 0,
              "&:hover": { bgcolor: "rgba(0,0,0,0.1)" },
            }}
          >
            <LogOut size={26} strokeWidth={2.5} />
          </IconButton>
        </Box>
      ) : (
        <MenuButton href="/login">LOGIN</MenuButton>
      )}
    </Box>
  );
};