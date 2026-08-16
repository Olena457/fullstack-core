

"use client";

import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useAuthStore } from "../../store/authStore";
import { ReviewSection } from "../../components/review/ReviewSection";
import { ReviewForm } from "../../components/review/ReviewForm";
import { useReviews } from "../../hooks/useReviews"; 
import { useStore } from "../../hooks/useStore";
import CircularProgress from "@mui/material/CircularProgress";

export default function ReviewPage() {
  const isAuthenticated = useStore(useAuthStore, (state) => state.isAuthenticated());
  const token = useStore(useAuthStore, (state) => state.token);

  const [showForm, setShowForm] = useState(false);
  const { reviews, isLoading, error, handleReviewSubmit } = useReviews(token ?? null);

  const onSubmitReview = async (data: { rating: number; comment: string }) => {
    await handleReviewSubmit(data);
    setShowForm(false);
  };

  if (isAuthenticated === undefined) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: "800px", margin: "0 auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, 
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: { xs: 2, sm: 0 },
          mb: { xs: 4, sm: 6 },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            textTransform: "uppercase",
            color: "text.primary",
            fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3rem" }, 
            lineHeight: 1.1,
          }}
        >
          Store Reviews
        </Typography>

        {isAuthenticated && (
          <Button
            variant="contained"
            onClick={() => setShowForm(!showForm)}
            sx={{
              borderRadius: 0,
              bgcolor: "primary.main",
              color: "background.paper",
              fontWeight: "bold",
              px: { xs: 2, sm: 3 },
              py: { xs: 1.5, sm: 1 },
              width: { xs: "100%", sm: "auto" }, 
              fontSize: { xs: "0.875rem", sm: "1rem" },
              "&:hover": { bgcolor: "action.hover", color: "text.primary" },
            }}
          >
            {showForm ? "CANCEL" : "WRITE A REVIEW"}
          </Button>
        )}
      </Box>

      {showForm && isAuthenticated && (
        <Box
          sx={{
            mb: { xs: 4, sm: 6 },
            border: 2,
            borderColor: "text.primary",
            p: { xs: 2, sm: 3 }, 
            bgcolor: "background.paper",
          }}
        >
          <ReviewForm onSubmit={onSubmitReview} />
        </Box>
      )}

      {!isAuthenticated && (
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            p: { xs: 3, sm: 4 },
            mb: { xs: 4, sm: 6 },
            textAlign: "center",
            bgcolor: "background.default", 
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              textTransform: "uppercase",
              mb: 1,
              color: "text.primary",
              fontSize: { xs: "1.2rem", sm: "1.25rem" },
            }}
          >
            Share your feedback
          </Typography>
          <Typography sx={{ mb: 3, color: "text.secondary", fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            You must be logged in to leave a store review.
          </Typography>
          <Link href="/login" passHref style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                borderRadius: 0,
                bgcolor: "primary.main",
                color: "background.paper",
                fontWeight: "bold",
                px: { xs: 3, sm: 4 },
                py: { xs: 1.5, sm: 1 },
                width: { xs: "100%", sm: "auto" }, 
                "&:hover": { bgcolor: "action.hover", color: "text.primary" },
              }}
            >
              LOG IN
            </Button>
          </Link>
        </Box>
      )}

      {isLoading ? (
        <Typography sx={{ fontWeight: "bold", color: "text.primary", fontSize: { xs: "0.9rem", sm: "1rem" } }}>
          LOADING REVIEWS...
        </Typography>
      ) : error ? (
        <Typography sx={{ color: "error.main", fontWeight: "bold", fontSize: { xs: "0.9rem", sm: "1rem" } }}>
          {error}
        </Typography>
      ) : reviews.length === 0 ? (
        <Typography sx={{ fontWeight: "bold", color: "text.secondary", fontSize: { xs: "0.9rem", sm: "1rem" } }}>
          NO REVIEWS YET. BE THE FIRST TO LEAVE ONE!
        </Typography>
      ) : (
        <ReviewSection reviews={reviews} />
      )}
    </Box>
  );
}