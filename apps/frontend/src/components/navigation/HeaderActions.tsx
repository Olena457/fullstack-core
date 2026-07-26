
"use client";

import { Box, Badge, IconButton, Typography, Tooltip } from "@mui/material";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";
import { useState, useEffect } from "react";

const MenuButton = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <IconButton
        sx={{
          borderRadius: 0,
          px: 2,
          py: 1,
          color: "text.primary",
          bgcolor: isActive ? "action.selected" : "transparent",
          "&:hover": {
            bgcolor: isActive ? "action.selected" : "action.hover",
          },
        }}
      >
        <Typography sx={{ fontWeight: 500, textTransform: "uppercase" }}>
          {children}
        </Typography>
      </IconButton>
    </Link>
  );
};

export const HeaderActions = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isOrderActive = pathname === "/cart";

  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.cartQuantity, 0);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{ display: "flex", gap: 1, alignItems: "center", fontSize: "16px" }}
    >
      <Link href="/cart" style={{ textDecoration: "none" }}>
        <IconButton
          sx={{
            color: "text.primary",
            borderRadius: 0,
            px: 2,
            py: 1,
            bgcolor: isOrderActive ? "action.selected" : "transparent",
            "&:hover": {
              bgcolor: isOrderActive ? "action.selected" : "action.hover",
            },
          }}
        >
          <Badge
            badgeContent={totalItems}
            color="error"
            sx={{
              "& .MuiBadge-badge": {
                borderRadius: 0,
                fontWeight: "bold",
                border: 1,
                borderColor: "divider",
              },
            }}
          >
            <Typography sx={{ fontWeight: 500, textTransform: "uppercase" }}>
              ORDER
            </Typography>
          </Badge>
        </IconButton>
      </Link>

      {isMounted && user && (
        <>
          <MenuButton href="/favorites">FAVORITES</MenuButton>
          <MenuButton href="/history">HISTORY</MenuButton>
        </>
      )}

      {isMounted ? (
        user ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 1,
              pl: 2,
            }}
          >
            <Tooltip title={`${user.name || "USER"}`} placement="bottom" arrow>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textTransform: "uppercase",
                  mr: 2,
                  display: { xs: "none", sm: "block" },
                  color: "text.primary",
                  maxWidth: "100px",
                  cursor: "default",
                }}
              >
                {user.name?.split(" ")[0] || "USER"}
              </Typography>
            </Tooltip>

            <IconButton
              onClick={() => {
                logout();
                router.push("/login");
              }}
              sx={{
                color: "text.secondary",
                borderRadius: 0,
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "action.hover",
                  color: "secondary.main",
                },
              }}
            >
              <LogOut size={26} strokeWidth={2.5} />
            </IconButton>
          </Box>
        ) : (
          <MenuButton href="/login">LOGIN</MenuButton>
        )
      ) : (
        <MenuButton href="/login">LOGIN</MenuButton>
      )}
    </Box>
  );
};