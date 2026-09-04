
"use client";

import { Box } from "@mui/material";
import { ReviewCard } from "./ReviewCard";
import type { Review } from "../../types/review";

interface ReviewSectionProps {
  reviews: Review[];
  currentUserId?: string | null; 
  onDelete?: (id: number) => void; 
}

export const ReviewSection = ({
  reviews,
  currentUserId,
  onDelete,
}: ReviewSectionProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
        },
        gap: 3,
      }}
    >
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          currentUserId={currentUserId} 
          onDelete={onDelete} 
        />
      ))}
    </Box>
  );
};