"use client";
import { useEffect, useState } from "react";
import type { Review } from "../types/review";

export const useReviews = (token: string | null) => {
  const [reviews, setReviews] = useState<Review[]>([]);
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
  };

  return {
    reviews,
    isLoading,
    error,
    handleReviewSubmit,
  };
};
