"use client";

import { Box, Typography, Container } from "@mui/material";
import { FadeInUp } from "../../components/ui/FadeInUp";
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
              fontSize: { xs: "2.5rem", md: "5rem" },
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              mb: { xs: 6, md: 10 },
              textAlign: "center",
            }}
          >
            WE ARE
            <Box component="span" sx={{ color: "#FF4500" }}>
              ALTEREGO
            </Box>
          </Typography>
        </FadeInUp>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: { xs: 8, md: 10 },
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: { xs: "3/4", md: "4/5" },
            }}
          >
            {/* main photo */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "80%",
                height: "95%",
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

            {/* secondary */}
            <Box
              sx={{
                position: "absolute",
                bottom: "10%",
                left: 0,
                width: "55%",
                height: "65%",
                zIndex: 2,
              }}
            >
              <FadeInUp delay={0.4} fullSize>
                <Box
                  component="img"
                  src="/images/men-hat.png"
                  alt="Secondary Style"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
                    border: "4px solid",
                    borderColor: "background.default",
                  }}
                />
              </FadeInUp>
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: "-5%",
                right: "-5%",
                width: "45%",
                height: "45%",
                zIndex: 3,
              }}
            >
              <FadeInUp delay={0.7} fullSize>
                <Box
                  component="img"
                  src="/images/hero.png"
                  alt="Accent Style"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                    border: "4px solid",
                    borderColor: "background.default",
                  }}
                />
              </FadeInUp>
            </Box>
          </Box>

          {/* block-1 */}
          <Box>
            <FadeInUp delay={0.3}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  mb: 3,
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
                We create a space for modern and bold individuals. Our store is
                not just about clothes; it&#39;s about carefully curated
                designer collections that help express your true self.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.1rem",
                  color: "text.secondary",
                  lineHeight: 1.7,
                }}
              >
                Forget the mass market. Choose pieces that speak for you before
                you even say a word. Your style, your rules.
              </Typography>
            </FadeInUp>
          </Box>

          {/* block-2 */}
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
                    Not sure where to start? Our professional stylists will
                    curate individual looks tailored perfectly to your ALTER
                    EGO, absolutely free of charge.
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
                    If a piece doesn&#39;t fit your vibe or size perfectly,
                    enjoy a hassle-free 30-day return policy. No questions
                    asked, just ultimate shopping freedom.
                  </Typography>
                </Box>
              </Box>
            </FadeInUp>
          </Box>

          {/* block-2 slider */}
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
