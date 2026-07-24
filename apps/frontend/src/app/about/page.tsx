import { Box, Typography, Container } from "@mui/material";

export default function AboutPage() {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: 2,
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 900,
            textTransform: "uppercase",
            mb: 4,
            color: "text.primary",
          }}
        >
          About company Alter Ego
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            fontSize: "1.1rem",
            lineHeight: 1.8,
          }}
        >
          Here information about your clothing brand.
        </Typography>
      </Container>
    </Box>
  );
}
