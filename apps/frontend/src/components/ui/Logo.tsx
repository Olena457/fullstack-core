"use client";

import { Typography, Box } from "@mui/material";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/"
      style={{ textDecoration: "none", color: "inherit", outline: "none" }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          color: "black",
          transition: "all 0.3s ease-in-out",

          "&:hover, &:focus-visible, &:active": {
            color: "#FF4500", 

            "& .ego-text": {
              color: "black", 
            },
          },
        }}
      >
        ALTER
        <Box
          component="span"
          className="ego-text"
          sx={{
            color: "#FF4500", 
            transition: "all 0.3s ease-in-out",
          }}
        >
          EGO
        </Box>
      </Typography>
    </Link>
  );
};
