
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
        bgcolor: "background.default",
        py: { xs: 1.5, sm: 2 },
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          margin: { xs: "0 auto", md: "0 auto 0 8%" },
          px: { xs: 1, sm: 2 },
          display: "flex",
          flexDirection: { xs: "row", md: "row" },
          justifyContent: { xs: "space-between", md: "flex-start" },
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
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "center" },
              gap: { xs: 0.2, md: 1 },
            }}
          >
            <Typography
              component="span"
              sx={{
                fontWeight: 700,
                color: "text.primary",
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
                letterSpacing: "0.06em",
                fontWeight: 600,
                fontSize: { xs: "0.45rem", sm: "0.75rem" },
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
