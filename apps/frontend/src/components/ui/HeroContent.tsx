
"use client";

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { LogoIcon } from "../ui/icons/LogoIcon"; 

export default function HeroContent() {
  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 3,
        maxWidth: "500px",
        left: "5%",
        top: "24%",

        "@media (min-width: 375px)": { top: "30%" },
        "@media (min-width: 768px)": { top: "31%" },
        "@media (min-width: 1024px)": { top: "28%" },
        "@media (min-width: 1200px)": { left: "10%", top: "32%" },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 900,
          mb: 2,
          textTransform: "uppercase",
          lineHeight: 1.1,
          fontSize: "2.4rem",

          "@media (min-width: 375px)": { fontSize: "2.6rem" },
          "@media (min-width: 768px)": { fontSize: "3.2rem" },
          "@media (min-width: 968px)": { fontSize: "3.5rem" },
          "@media (min-width: 1024px)": { fontSize: "3.7rem" },
          "@media (min-width: 1200px)": { fontSize: "3.8rem" },
        }}
      >
        REVEAL YOUR <br /> TRUE EGO
        <Box
          component="span"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            verticalAlign: "middle",
            mb: 2, 
            ml: "5px", 
          }}
        >
          <LogoIcon width="0.8em" height="0.6em" color="#FF4500" />
        </Box>
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          mb: 4,
          fontSize: "1.1rem",
          display: { xs: "none", sm: "block" },
        }}
      >
        Your style is your statement, your rules, and
        <br /> your ultimate freedom without compromise.
      </Typography>

      <Button
        component={Link}
        href="/products"
        variant="contained"
        color="primary"
        size="large"
        sx={{
          borderRadius: 0,
          fontWeight: "bold",
          padding: "8px 12px",
          fontSize: "0.6rem",

          "@media (min-width: 768px)": {
            padding: "10px 24px",
            fontSize: "0.85rem",
          },
          "@media (min-width: 1200px)": {
            padding: "12px 32px",
            fontSize: "1.2rem",
          },
        }}
      >
        SHOP THE COLLECTION
      </Button>
    </Box>
  );
}