
"use client";

import { Box, Typography } from "@mui/material";
import { DesktopNav } from "../components/navigation/DesktopNav"; 

export default function Home() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          borderBottom: 2,
          gap: 1,
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "divider" : "divider",
        }}
      >
        <DesktopNav isHome={true} />
      </Box>

      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h3">WELCOME TO OUR BRAND</Typography>
      </Box>
    </Box>
  );
}