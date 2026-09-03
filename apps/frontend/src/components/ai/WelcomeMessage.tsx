import { Box, Typography } from "@mui/material";

export const WelcomeMessage = () => (
  <Box
    sx={{
      mt: 4,
      px: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}
  >
    <Typography
      variant="body1"
      sx={{ fontWeight: 700, mb: 1, textTransform: "uppercase" }}
    >
      Welcome to the store
    </Typography>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ maxWidth: { xs: "100%", sm: "80%" } }}
    >
      Looking for an oversized fit? Need to find something on SALE? Or just want
      recommendations for a new drop? Ask me anything.
    </Typography>
  </Box>
);
