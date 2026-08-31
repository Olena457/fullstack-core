"use client";

import { Box } from "@mui/material";
import { FadeInUp } from "./FadeInUp";

export const AboutCollage = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: { xs: "3/4", md: "4/5" },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "5%",
          right: "10%",
          width: "70%",
          height: "85%",
          zIndex: 1,
        }}
      >
        <FadeInUp delay={0.1} fullSize>
          <Box
            component="img"
            src="/images/woman-hat.png"
            alt="Main Style"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            }}
          />
        </FadeInUp>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "-15%",
          width: "45%",
          height: "55%",
          zIndex: 2,
        }}
      >
        <FadeInUp delay={0.4} fullSize>
          <Box
            component="img"
            src="/images/hero.png"
            alt="Secondary Style"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
              border: "5px solid",
              borderColor: "background.default",
            }}
          />
        </FadeInUp>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "65%",
          right: "-16%",
          width: "33%",
          height: "40%",
          zIndex: 3,
        }}
      >
        <FadeInUp delay={0.4} fullSize>
          <Box
            component="img"
            src="/images/men-hat.png"
            alt="Accent Style"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
              border: "5px solid",
              objectPosition: "center center",
              borderColor: "background.default",
            }}
          />
        </FadeInUp>
      </Box>
    </Box>
  );
};
