
"use client";

import { Box } from "@mui/material";
import BackgroundText from "../components/ui/BackgroundText";
import HeroContent from "../components/ui/HeroContent";

export default function Home() {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh", 
        maxWidth: "100%",
        bgcolor: "background.default",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: (theme) =>
            theme.palette.mode === "dark"
              ? `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`
              : `linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
          backgroundSize: { xs: "130px 130px", md: "200px 200px" },
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <BackgroundText />

      <Box
        component="img"
        src="/images/hero-1.png"
        alt="Alterego Model"
        sx={{
          position: "absolute",
          right: { xs: "-25%", sm: "-4%", md: "8%", lg: "18%" },
          top: { xs: 0, md: "-2%", lg: "-3%" }, 
          height: { xs: "90%", md: "95%", lg: "100%" },
          objectFit: "contain",
          zIndex: 2,
        }}
      />

      <HeroContent />

      <Box
        component="img"
        src="/images/glasses-1.png"
        alt="Foreground Glasses"
        sx={{
          position: "absolute",
          objectFit: "contain",
          zIndex: 6,

          left: "-2%",
          right: "0",
          bottom: "2%",
          width: "150%",

          "@media (min-width: 375px)": { width: "160%", left: "-5%" },
          "@media (min-width: 425px)": {
            width: "140%",
            left: "-2%",
            bottom: "0%",
          },
          "@media (min-width: 768px)": {
            width: "100%",
            left: "auto",
            right: "-42%",
          },
          "@media (min-width: 1024px)": {
            width: "95%",
            left: "auto",
            right: "-25%",
          },

          "@media (min-width: 1200px)": {
            left: "auto",
            right: "-19.5%", 
            width: "75%", 
          },
        }}
      />
    </Box>
  );
}