"use client";

import { Box, Typography, Container } from "@mui/material";
import { FadeInUp } from "../../components/ui/FadeInUp";
import { AboutCollage } from "../../components/ui/AboutCollage";
import { AboutTextOne } from "../../components/ui/AboutTextOne";
import { AboutTextTwo } from "../../components/ui/AboutTextTwo";
import { AutoSlider } from "../../components/ui/AutoSlider";

export default function AboutPage() {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <FadeInUp>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "1.5rem", sm: "3rem", md: "4.5rem" }, 
              textTransform: "uppercase",
              letterSpacing: { xs: "-0.01em", md: "-0.03em" }, 
              mb: { xs: 5, md: 12 },
              textAlign: "center",
              wordBreak: "break-word",
            }}
          >
            WE ARE&nbsp;
            <Box component="span" sx={{ color: "#FF4500" }}>
              ALTEREGO
            </Box>
          </Typography>
        </FadeInUp>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: { xs: 8, md: 10, lg: 15 },
            mb: { xs: 12, md: 20 },
          }}
        >
          <AboutCollage />
          <AboutTextOne />
        </Box>

        {/* block-2 */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: { xs: 8, md: 10 },
            alignItems: "center",
          }}
        >
          <AboutTextTwo />

          <Box sx={{ order: { xs: 1, md: 2 } }}>
            <FadeInUp delay={0.4}>
              <AutoSlider />
            </FadeInUp>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
