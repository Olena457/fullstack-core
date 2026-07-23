"use client";

import { Card, CardContent, Box, Skeleton, useTheme } from "@mui/material";

export const ProductSkeletonCard = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Card
      sx={{
        borderRadius: 0,
        border: `1px solid ${isDark ? "#333333" : "#e0e0e0"}`,
        boxShadow: "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: isDark ? "background.paper" : "white",
      }}
    >
      <Skeleton
        variant="rectangular"
        height={350}
        animation="wave"
        sx={{ bgcolor: isDark ? "grey.800" : "grey.200" }}
      />

      <CardContent
        sx={{
          p: 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          bgcolor: isDark ? "background.paper" : "white",
        }}
      >
        <Box>
          <Skeleton
            variant="text"
            width="80%"
            height={24}
            animation="wave"
            sx={{ mb: 0.5, bgcolor: isDark ? "grey.800" : "grey.200" }}
          />
          <Skeleton
            variant="text"
            width="40%"
            height={24}
            animation="wave"
            sx={{ mb: 2, bgcolor: isDark ? "grey.800" : "grey.200" }}
          />
        </Box>

        <Skeleton
          variant="rectangular"
          width="100%"
          height={38}
          animation="wave"
          sx={{ bgcolor: isDark ? "grey.800" : "grey.200" }}
        />
      </CardContent>
    </Card>
  );
};
