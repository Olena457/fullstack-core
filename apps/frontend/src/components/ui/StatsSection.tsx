
import { Box, Typography } from "@mui/material";

export const StatsSection = () => {
  const stats = [
    { value: "10k+", label: "ORDERS DELIVERED" },
    { value: "99%", label: "POSITIVE REVIEWS" },
    { value: "100%", label: "EXCLUSIVE DESIGNS" },
  ];

  return (
    <Box
      sx={{
        px: { xs: 2, md: 3 },
     
        bgcolor: "transparent",
        mb: { xs: 2 },
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          margin: { xs: "0 auto", md: "0 auto 0 8%" },
          px: { xs: 1 },
          display: "flex",
          flexDirection: { xs: "row", md: "row" },
          justifyContent: { xs: "space-between" },
          alignItems: "center",
          gap: { xs: 2, md: 3 },
          textAlign: { xs: "left", md: "left", lg: "left" },
        }}
      >
        {stats.map((stat, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row", md: "row" },
              alignItems: { xs: "flex-start", md: "center" },
              gap: { xs: 0.2, md: 1 },
            }}
          >
            <Typography
              component="span"
              sx={{
                fontWeight: 700,
                color: "secondary.main",
                fontSize: { xs: "0.7rem", md: "0.9rem" },
                lineHeight: 1.2,
              }}
            >
              {stat.value}
            </Typography>
            <Typography
              component="span"
              sx={{
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: { xs: "0.04rem", sm: "0.07rem", lg: "0.08rem" },
                fontWeight: 600,
                fontSize: { xs: "0.4rem", sm: "0.75rem" },
                lineHeight: 1.2,
              }}
            >
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
