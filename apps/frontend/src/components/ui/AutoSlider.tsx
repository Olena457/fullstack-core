
"use client";

import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const sliderImages = [
  "/images/style-1.png",
  "/images/style-3.png",
  "/images/style-4.png",
];

export const AutoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "1/1",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={sliderImages[currentIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain", 
          }}
          alt="Style Collection"
        />
      </AnimatePresence>
    </Box>
  );
};