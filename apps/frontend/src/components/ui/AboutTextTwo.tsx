"use client";

import { Box, Typography } from "@mui/material";
import { FadeInUp } from "./FadeInUp";

export const AboutTextTwo = () => {
  return (
    <Box sx={{ order: { xs: 2, md: 1 } }}>
      <FadeInUp delay={0.2}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            mb: 4,
            textTransform: "uppercase",
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          More Than Just Shopping
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box
            sx={{
              p: 4,
              border: "1px solid",
              borderColor: "divider",
              transition: "transform 0.4s ease",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 1,
                color: "#FF4500",
                textTransform: "uppercase",
              }}
            >
              Complimentary Stylist
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.6 }}
            >
              Not sure where to start? Our professional stylists will curate
              individual looks tailored perfectly to your ALTER EGO, absolutely
              free of charge.
            </Typography>
          </Box>

          <Box
            sx={{
              p: 4,
              border: "1px solid",
              borderColor: "divider",
              transition: "transform 0.4s ease",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, mb: 1, textTransform: "uppercase" }}
            >
              30-Day Easy Returns
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.6 }}
            >
              If a piece doesn&#39;t fit your vibe or size perfectly, enjoy a
              hassle-free 30-day return policy. No questions asked, just
              ultimate shopping freedom.
            </Typography>
          </Box>
        </Box>
      </FadeInUp>
    </Box>
  );
};
