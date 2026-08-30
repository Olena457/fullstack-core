"use client";

import { Box, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";

const FadeInUp = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 60, filter: "blur(4px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function AboutPage() {
  return (
    <Box 
      sx={{ 
        bgcolor: "background.default", 
        color: "text.primary", 
        py: { xs: 8, md: 15 }, 
      }}
    >
      <Container maxWidth="lg">
        <FadeInUp>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "3rem", md: "6rem" },
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              mb: { xs: 8, md: 12 },
              textAlign: "center",
            }}
          >
            WE ARE <Box component="span" sx={{ color: "#FF4500" }}>ALTEREGO</Box>
          </Typography>
        </FadeInUp>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: { xs: 8, md: 12 },
            alignItems: "center",
          }}
        >
          
          {/* photo-1 */}
          <Box>
            <FadeInUp delay={0.1}>
              <Box
                component="img"
                src="/images/woman-hat.jpg"
                alt="Alterego Style"
                sx={{
                  width: "100%",
                  borderRadius: 0, 
                  aspectRatio: "3/4",
                  objectFit: "cover",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                }}
              />
            </FadeInUp>
          </Box>
          
          {/* block tekst-1 */}
          <Box>
            <FadeInUp delay={0.3}>
              <Typography variant="h3" sx={{ fontWeight: 900, mb: 3, textTransform: "uppercase", fontSize: { xs: "2rem", md: "2.8rem" } }}>
                Branded.<br/> Unique. Yours.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 3, color: "text.secondary", lineHeight: 1.7 }}>
                We create a space for modern and bold individuals. Our store is not just about clothes; it &#39;s about carefully curated designer collections that help express your true self.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "text.secondary", lineHeight: 1.7 }}>
                Forget the mass market. Choose pieces that speak for you before you even say a word. Your style, your rules.
              </Typography>
            </FadeInUp>
          </Box>

          {/* block-2 */}
          <Box sx={{ order: { xs: 2, md: 1 } }}>
            <FadeInUp delay={0.1}>
              <Typography variant="h3" sx={{ fontWeight: 900, mb: 4, textTransform: "uppercase", fontSize: { xs: "2rem", md: "2.5rem" } }}>
                More Than Just Shopping
              </Typography>
              
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box sx={{ p: 4, border: "1px solid", borderColor: "divider", transition: "transform 0.3s ease", "&:hover": { transform: "translateY(-5px)" } }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: "#FF4500", textTransform: "uppercase" }}>
                    Complimentary Stylist
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    Not sure where to start? Our professional stylists will curate individual looks tailored perfectly to your ALTER EGO, absolutely free of charge.
                  </Typography>
                </Box>
                
                <Box sx={{ p: 4, border: "1px solid", borderColor: "divider", transition: "transform 0.3s ease", "&:hover": { transform: "translateY(-5px)" } }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, textTransform: "uppercase" }}>
                    30-Day Easy Returns
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    If a piece doesn &#39; t fit your vibe or size perfectly, enjoy a hassle-free 30-day return policy. No questions asked, just ultimate shopping freedom.
                  </Typography>
                </Box>
              </Box>
            </FadeInUp>
          </Box>

          {/* block-2 photo */}
          <Box sx={{ order: { xs: 1, md: 2 } }}>
            <FadeInUp delay={0.3}>
              <Box
                component="img"
                src="/images/style-3.jpg"
                alt="Alterego Collection"
                sx={{
                  width: { xs: "100%", md: "85%" },
                  ml: { md: "auto" },
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </FadeInUp>
          </Box>

        </Box>
      </Container>
    </Box>
  );
}