"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useAuthStore } from "../../store/authStore";
import { ReviewSection } from "../../components/review/ReviewSection";
import { ReviewForm } from "../../components/review/ReviewForm";
import type { Review } from "../../types/review";

export default function ReviewPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const token = useAuthStore((state) => state.token);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`);
        if (res.ok) {
          const data = await res.json();
          setReviews(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error(err);
        setError("COULD NOT LOAD REVIEWS.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleReviewSubmit = async (data: {
    rating: number;
    comment: string;
  }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        rating: data.rating,
        comment: data.comment,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to submit review");
    }

    const newReview = await res.json();
    setReviews((prev) => [newReview, ...prev]);
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
          sx={{ fontWeight: 900, textTransform: "uppercase" }}
        >
          Store Reviews
        </Typography>

        {isAuthenticated && (
          <Button
            variant="contained"
            onClick={() => setShowForm(!showForm)}
            sx={{
              borderRadius: 0,
              bgcolor: "black",
              color: "white",
              fontWeight: "bold",
              px: 3,
              py: 1,
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            }}
          >
            {showForm ? "CANCEL" : "WRITE A REVIEW"}
          </Button>
        )}
      </Box>

      {showForm && isAuthenticated && (
        <Box sx={{ mb: 6, border: "2px solid black", p: 3 }}>
          <ReviewForm onSubmit={handleReviewSubmit} />
        </Box>
      )}

      {!isAuthenticated && (
        <Box
          sx={{
            border: "1px solid black",
            p: 4,
            mb: 6,
            textAlign: "center",
            bgcolor: "#f5f5f5",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 900, textTransform: "uppercase", mb: 1 }}
          >
            Share your feedback
          </Typography>
          <Typography sx={{ mb: 3 }}>
            You must be logged in to leave a store review.
          </Typography>
          <Link href="/login" passHref style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                borderRadius: 0,
                bgcolor: "black",
                color: "white",
                fontWeight: "bold",
                px: 4,
                "&:hover": { bgcolor: "#bdbdbd", color: "black" },
              }}
            >
              LOG IN
            </Button>
          </Link>
        </Box>
      )}

      {isLoading ? (
        <Typography sx={{ fontWeight: "bold" }}>LOADING REVIEWS...</Typography>
      ) : error ? (
        <Typography sx={{ color: "error.main", fontWeight: "bold" }}>
          {error}
        </Typography>
      ) : reviews.length === 0 ? (
        <Typography sx={{ fontWeight: "bold" }}>
          NO REVIEWS YET. BE THE FIRST TO LEAVE ONE!
        </Typography>
      ) : (
        <ReviewSection reviews={reviews} />
      )}
    </Box>
  );
}
