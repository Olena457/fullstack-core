
"use client";

import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useAuthStore } from "../../store/authStore";
import { ReviewSection } from "../../components/review/ReviewSection";
import { ReviewForm } from "../../components/review/ReviewForm";
import { useReviews } from "../../hooks/useReviews"; 

export default function ReviewPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const token = useAuthStore((state) => state.token);

  const [showForm, setShowForm] = useState(false);
  const { reviews, isLoading, error, handleReviewSubmit } = useReviews(token);

  const onSubmitReview = async (data: { rating: number; comment: string }) => {
    await handleReviewSubmit(data);
    setShowForm(false);
  };

  return (
    <Box sx={{ p: 4, maxWidth: "800px", margin: "0 auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 6,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            textTransform: "uppercase",
            color: "text.primary",
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
              px: 3,
              py: 1,
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
            mb: 6,
            border: 2,
            borderColor: "text.primary",
            p: 3,
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
            p: 4,
            mb: 6,
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
            }}
          >
            Share your feedback
          </Typography>
          <Typography sx={{ mb: 3, color: "text.secondary" }}>
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
                px: 4,
                "&:hover": { bgcolor: "action.hover", color: "text.primary" },
              }}
            >
              LOG IN
            </Button>
          </Link>
        </Box>
      )}

      {isLoading ? (
        <Typography sx={{ fontWeight: "bold", color: "text.primary" }}>
          LOADING REVIEWS...
        </Typography>
      ) : error ? (
        <Typography sx={{ color: "error.main", fontWeight: "bold" }}>
          {error}
        </Typography>
      ) : reviews.length === 0 ? (
        <Typography sx={{ fontWeight: "bold", color: "text.secondary" }}>
          NO REVIEWS YET. BE THE FIRST TO LEAVE ONE!
        </Typography>
      ) : (
        <ReviewSection reviews={reviews} />
      )}
    </Box>
  );
}