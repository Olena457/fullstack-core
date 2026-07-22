"use client";

import { Card, CardContent, Box, Skeleton } from "@mui/material";

export const ProductSkeletonCard = () => {
  return (
    <Card
      sx={{
        borderRadius: 0,
        border: "1px solid #e0e0e0", 
        boxShadow: "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Skeleton
        variant="rectangular"
        height={350}
        animation="wave"
        sx={{ bgcolor: "grey.200" }}
      />

      <CardContent
        sx={{
          p: 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          bgcolor: "white",
        }}
      >
        <Box>
          <Skeleton
            variant="text"
            width="80%"
            height={24}
            animation="wave"
            sx={{ mb: 0.5, bgcolor: "grey.200" }}
          />
          <Skeleton
            variant="text"
            width="40%"
            height={24}
            animation="wave"
            sx={{ mb: 2, bgcolor: "grey.200" }}
          />
        </Box>

        <Skeleton
          variant="rectangular"
          width="100%"
          height={38}
          animation="wave"
          sx={{ bgcolor: "grey.200" }}
        />
      </CardContent>
    </Card>
  );
};
