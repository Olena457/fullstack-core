"use client";

import { Box, Typography } from "@mui/material";
import { FadeInUp } from "./FadeInUp";

export const AboutTextOne = () => {
  return (
    <Box sx={{ alignSelf: "flex-start", pt: { md: 4 } }}>
      <FadeInUp delay={0.3}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            mb: 4,
            textTransform: "uppercase",
            fontSize: { xs: "2rem", md: "2.8rem" },
          }}
        >
          Branded.
          <br /> Unique. Yours.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: "1.1rem",
            mb: 3,
            color: "text.secondary",
            lineHeight: 1.7,
          }}
        >
          We create a space for modern and bold individuals. Our store is not
          just about clothes; it&#39;s about carefully curated designer
          collections that help express your true self.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "1.1rem",
            color: "text.secondary",
            lineHeight: 1.7,
          }}
        >
          Forget the mass market. Choose pieces that speak for you before you
          even say a word. Your style, your rules.
        </Typography>
      </FadeInUp>
    </Box>
  );
};
