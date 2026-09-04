"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/fetchWithAuth"; 
import type { Review } from "../types/review";

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reviews/store`,
        );

        if (res.ok) {
          const data = await res.json();
          setReviews(Array.isArray(data) ? data : []);
        } else {
          setError("COULD NOT LOAD REVIEWS.");
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
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
      {
        method: "POST",
        body: JSON.stringify({
          rating: data.rating,
          text: data.comment,
        }),
      },
    );

    if (!res.ok) {
      throw new Error("Failed to submit review");
    }

    const newReview = await res.json();
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleDeleteReview = async (id: number) => {
    try {
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews/${id}`,
        { method: "DELETE" },
      );

      if (!res.ok) {
        throw new Error("Failed to delete review");
      }

      setReviews((prev) => prev.filter((review) => review.id !== id));
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  return {
    reviews,
    isLoading,
    error,
    handleReviewSubmit,
    handleDeleteReview, 
  };
};
