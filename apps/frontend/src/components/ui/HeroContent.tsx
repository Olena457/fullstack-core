"use client";

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { LogoIcon } from "../ui/icons/LogoIcon";
import { ArrowRight } from "lucide-react";

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
          opacity: 0,
          animation: "fadeInTitle 1.5s ease-out 0.5s forwards",
          "@keyframes fadeInTitle": {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },

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
        size="large"
        endIcon={<ArrowRight color="#ffffff" size={20} />}
        sx={{
          borderRadius: 0,
          fontWeight: "bold",
          padding: "8px 16px",
          fontSize: "0.6rem",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.2)"
              : "#000000",
          color: "#ffffff",
          border: "1px solid transparent",
          transition: "all 0.15s ease-in-out",
          "&:hover": {
            borderColor: "#FF4500",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.3)"
                : "#333333",
          },
          "&:focus-visible": {
            outline: "2px solid #FF4500",
            outlineOffset: "2px",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.3)"
                : "#333333",
          },
          "&:active": {
            transform: "scale(0.95)",
            borderColor: "#FF4500",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.15)"
                : "#1a1a1a",
          },
          "& .MuiButton-endIcon": {
            marginLeft: "6px",
            transition: "transform 0.15s ease-in-out",
          },
          "@media (min-width: 768px)": {
            padding: "10px 24px",
            fontSize: "0.85rem",
            "& .MuiButton-endIcon": {
              marginLeft: "8px",
            },
          },
          "@media (min-width: 1200px)": {
            padding: "12px 32px",
            fontSize: "1.2rem",
            "& .MuiButton-endIcon": {
              marginLeft: "12px",
              "& svg": { width: 24, height: 24 },
            },
          },
        }}
      >
        SHOP TRENDS
      </Button>
    </Box>
  );
}
