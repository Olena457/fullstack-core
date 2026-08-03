"use client";

import { Box, Drawer, IconButton, Typography, Badge } from "@mui/material";
import { X, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "../../../src/store/authStore";
import { useCartStore } from "../../../src/store/cartStore";
import { useState, useEffect } from "react";

import type { MobileMenuProps, MobileMenuItemProps } from "../../types/mobileMenu";

const MobileMenuItem = ({
  href,
  children,
  isActive,
  onClick,
  endIcon,
}: MobileMenuItemProps) => (
  <Link href={href} style={{ textDecoration: "none" }} onClick={onClick}>
    <Box
      sx={{
        py: 2.5,
        px: 3,
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: isActive ? "action.selected" : "transparent",
        color: "text.primary",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "&:hover": { bgcolor: isActive ? "action.selected" : "action.hover" },
      }}
    >
      <Typography
        sx={{ fontWeight: 900, textTransform: "uppercase", fontSize: "1.2rem" }}
      >
        {children}
      </Typography>
      {endIcon && (
        <Box sx={{ display: "flex", alignItems: "center" }}>{endIcon}</Box>
      )}
    </Box>
  </Link>
);

export const MobileMenu = ({ isOpen, onClose, isHome }: MobileMenuProps) => {
  const pathname = usePathname();
  const router = useRouter();

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

  const navItems = ["HOME", "PRODUCTS", "REVIEW"];
  if (isHome) navItems.push("ABOUT");

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: 350 },
          bgcolor: "background.paper",
          backgroundImage: "none",
        },
      }}
    >
      {/* menu header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          p: 2,
          borderBottom: 2,
          borderColor: "divider",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            borderRadius: 0,
            border: 1,
            borderColor: "divider",
            color: "text.primary",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <X size={28} strokeWidth={2.5} />
        </IconButton>
      </Box>

      {/* Навігація */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {navItems.map((item) => {
          const href = item === "HOME" ? "/" : `/${item.toLowerCase()}`;
          const isActive =
            href === "/" ? pathname === href : pathname.startsWith(href);
          return (
            <MobileMenuItem
              key={item}
              href={href}
              isActive={isActive}
              onClick={onClose}
            >
              {item}
            </MobileMenuItem>
          );
        })}
      </Box>

      {/* Дії (Кошик, профіль) */}
      <Box sx={{ mt: "auto", borderTop: 2, borderColor: "divider" }}>
        <MobileMenuItem
          href="/cart"
          isActive={pathname === "/cart"}
          onClick={onClose}
          endIcon={
            <Badge
              badgeContent={totalItems}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  borderRadius: 0,
                  fontWeight: "bold",
                  border: 1,
                  borderColor: "background.paper",
                },
              }}
            />
          }
        >
          CART
        </MobileMenuItem>

        {isMounted ? (
          user ? (
            <>
              <MobileMenuItem
                href="/favorites"
                isActive={pathname === "/favorites"}
                onClick={onClose}
              >
                FAVORITES
              </MobileMenuItem>
              <MobileMenuItem
                href="/history"
                isActive={pathname === "/history"}
                onClick={onClose}
              >
                HISTORY
              </MobileMenuItem>

              {/* Профіль юзера */}
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  bgcolor: "action.hover",
                }}
              >
                <Typography
                  sx={{ fontWeight: 900, textTransform: "uppercase" }}
                >
                  {user.name?.split(" ")[0] || "USER"}
                </Typography>
                <IconButton
                  onClick={() => {
                    logout();
                    onClose();
                    router.push("/login");
                  }}
                  sx={{
                    borderRadius: 0,
                    color: "text.primary",
                    border: 1,
                    borderColor: "divider",
                  }}
                >
                  <LogOut size={20} strokeWidth={2.5} />
                </IconButton>
              </Box>
            </>
          ) : (
            <MobileMenuItem
              href="/login"
              isActive={pathname === "/login"}
              onClick={onClose}
            >
              LOGIN
            </MobileMenuItem>
          )
        ) : null}
      </Box>
    </Drawer>
  );
};