"use client";

import { Typography } from "@mui/material";

export default function BackgroundText() {
  return (
    <Typography
      sx={{
        position: "absolute",
        fontWeight: 900,
        zIndex: 2, 
        letterSpacing: "-0.05em",
        userSelect: "none",
        lineHeight: 0.7,
        color: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.2)"
            : "rgba(0, 0, 0, 0.095)",

        top: "30px",
        left: "1%",
        fontSize: "3.5rem",

        "@media (min-width: 375px)": {
          top: "25px",
          left: "1.5%",
          fontSize: "4.1rem",
        },
        "@media (min-width: 768px)": {
          top: "20px",
          left: "2%",
          fontSize: "8rem",
        },
        "@media (min-width: 968px)": {
          top: "18px",
          left: "2.5%",
          fontSize: "11rem",
        },
        "@media (min-width: 1200px)": {
          top: "15px",
          left: "6%",
          fontSize: "14.5rem",
        },
      }}
    >
      ALTEREGO
    </Typography>
  );
}
