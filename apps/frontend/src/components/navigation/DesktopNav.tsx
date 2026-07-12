import { Box } from "@mui/material";
import Link from "next/link";

export const DesktopNav = () => {
  return (
    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 6, fontWeight: 800 }}>
      <Link
        href="/"
        style={{
          textDecoration: "none",
          color: "inherit",
          textTransform: "uppercase",
        }}
      >
       HOME
      </Link>
      <Link
        href="/products"
        style={{
          textDecoration: "none",
          color: "inherit",
          textTransform: "uppercase",
        }}
      >
       PRODUCTS
      </Link>
      <Link
        href="/review"
        style={{
          textDecoration: "none",
          color: "inherit",
          textTransform: "uppercase",
        }}
      >
       REVIEW
      </Link>
    </Box>
  );
};
