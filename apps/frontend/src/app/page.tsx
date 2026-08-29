
"use client";

import { Box, Typography, Button } from "@mui/material";
import { DesktopNav } from "../components/navigation/DesktopNav";

export default function Home() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#fcfcfc",
        overflow: "hidden",
      }}
    >
      {/* navigation */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          borderBottom: 2,
          gap: 1,
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "divider" : "divider",
          position: "relative",
          zIndex: 20,
          bgcolor: "background.default",
        }}
      >
        <DesktopNav isHome={true} />
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: "calc(100vh - 60px)",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            top: "1%",
            left: "5%",
            fontSize: { xs: "6rem", md: "16rem" },
            fontWeight: 900,
            color: "rgba(0, 0, 0, 0.03)",
            zIndex: 1,
            letterSpacing: "-0.05em",
            userSelect: "none",
          }}
        >
          ALTEREGO
        </Typography>

        {/* man*/}
        <Box
          component="img"
          src="/images/hero-1.png" 
          alt="Alterego Model"
          sx={{
            position: "absolute",
            right: { xs: "-10%", md: "8%" },
            bottom: 0,
            height: { xs: "80%", md: "95%" },
            objectFit: "contain",
            zIndex: 2,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            left: "10%",
            top: "35%",
            zIndex: 3,
            maxWidth: "500px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              mb: 2,
              zIndex: 2,
              textTransform: "uppercase",
              lineHeight: 1.1,
            }}
          >
            REVEAL YOUR <br /> TRUE EGO.
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", mb: 4, fontSize: "1.1rem" }}
          >
            For those unafraid to stand out. Your style is your statement, your
            rules, and your ultimate freedom without compromise.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: 0, px: 4, py: 1.5, fontWeight: "bold" }}
          >
            SHOP THE COLLECTION
          </Button>
        </Box>

        <Box
          component="img"
          src="/images/blue-g.png"
          alt="Foreground Glasses"
          sx={{
            position: "absolute",
            right: { xs: "-40%", md: "-15%" }, 
            bottom: { xs: "-5%", md: "-10%" },
            width: { xs: "150%", md: "90%" }, 
            objectFit: "contain",
            zIndex: 6,
            transform: "rotate(-5deg)", 
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.9) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(255, 255, 255, 0.9) 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
      </Box>
    </Box>
  );
}