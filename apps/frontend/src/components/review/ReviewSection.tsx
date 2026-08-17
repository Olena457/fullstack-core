
import { Box, Typography } from "@mui/material";
import type { Review } from "../../types/review";
import { ReviewCard } from "./ReviewCard";

interface ReviewSectionProps {
  reviews: Review[];
  currentUserId?: string | null;
  onDeleteReview?: (id: number) => void;
}

export const ReviewSection = ({
  reviews,
  currentUserId,
  onDeleteReview,
}: ReviewSectionProps) => {
  return (
    <Box
      sx={{
        mt: { xs: 4, sm: 8 },
        borderTop: 2,
        borderColor: "divider",
        pt: { xs: 2, sm: 4 },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 900,
          textTransform: "uppercase",
          mb: { xs: 3, sm: 4 },
          color: "text.primary",
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
        }}
      >
        REVIEWS {reviews.length}
      </Typography>

      {reviews.length === 0 ? (
        <Typography
          color="text.secondary"
          sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
        >
          No reviews yet. Be the first to share your thoughts!
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: { xs: 2, sm: 3 },
          }}
        >
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              currentUserId={currentUserId}
              onDelete={onDeleteReview}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};