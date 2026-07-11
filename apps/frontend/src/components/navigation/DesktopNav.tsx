import { Box } from "@mui/material";
import Link from "next/link";

export const DesktopNav = () => {
  return (
    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 6, fontWeight: 800 }}>
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
  );
};
