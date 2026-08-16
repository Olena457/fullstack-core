
import { Box, Typography, Rating } from "@mui/material";
import type { Review } from "../../types/review";

interface ReviewSectionProps {
  reviews: Review[];
}

export const ReviewSection = ({ reviews }: ReviewSectionProps) => {
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
        Reviews ({reviews.length})
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
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 3 },
          }}
        >
          {reviews.map((review) => (
            <Box
              key={review.id}
              sx={{
                border: 1,
                borderColor: "divider",
                p: { xs: 2, sm: 3 },
                borderRadius: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                  mb: 1,
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "text.primary",
                    fontSize: { xs: "0.9rem", sm: "1rem" },
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
                sx={{
                  mt: 1.5,
                  lineHeight: 1.6,
                  color: "text.primary",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
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