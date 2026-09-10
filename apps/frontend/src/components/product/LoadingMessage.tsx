"use client";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { AnimatedGreyText } from "./AnimatedGreyText";
import { ProductSkeletonCard } from "./ProductSkeletonCard";

export const LoadingMessage = () => {
  const [showSlowMessage, setShowSlowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSlowMessage(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {showSlowMessage && (
        <Box
          sx={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            pointerEvents: "none",
            animation: "fadeIn 0.5s ease-out",
            "@keyframes fadeIn": {
              "0%": { opacity: 0 },
              "100%": { opacity: 1 },
            },
          }}
        >
          <AnimatedGreyText />
        </Box>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 3,
        }}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeletonCard key={index} />
        ))}
      </Box>
    </Box>
  );
};
