import { Box, Typography, Rating } from "@mui/material";
import type { Review } from "../../types/review";

interface ReviewSectionProps {
  reviews: Review[];
}

export const ReviewSection = ({ reviews }: ReviewSectionProps) => {
  return (
    <Box sx={{ mt: 8, borderTop: 2, borderColor: "divider", pt: 4 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 900,
          textTransform: "uppercase",
          mb: 4,
          color: "text.primary",
        }}
      >
        Reviews ({reviews.length})
      </Typography>

      {reviews.length === 0 ? (
        <Typography color="text.secondary">
          No reviews yet for this product.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {reviews.map((review) => (
            <Box
              key={review.id}
              sx={{
                border: 1,
                borderColor: "divider",
                p: 3,
                borderRadius: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "text.primary",
                  }}
                >
                  {review.userName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(review.createdAt).toLocaleDateString()}
                </Typography>
              </Box>

              <Rating
                value={review.rating}
                readOnly
                size="small"
                sx={{
                  color: "text.primary",
                  "& .MuiRating-iconEmpty": { color: "action.disabled" },
                }}
              />

              <Typography
                variant="body2"
                sx={{ mt: 1.5, lineHeight: 1.6, color: "text.primary" }}
              >
                {review.comment}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
