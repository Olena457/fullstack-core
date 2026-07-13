import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Rating,
  Alert,
} from "@mui/material";

interface ReviewFormProps {
  onSubmit: (data: { rating: number; comment: string }) => Promise<void>;
}

export const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
  const [rating, setRating] = useState<number | null>(5);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating) {
      setError("Please select a rating.");
      return;
    }
    if (!comment.trim()) {
      setError("Please write a comment.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await onSubmit({ rating, comment });
      // Очищаємо форму після успішної відправки
      setComment("");
      setRating(5);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to submit review");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 4, mb: 6, border: "1px solid black", p: 4 }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 900, textTransform: "uppercase", mb: 3 }}
      >
        Write a Review
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Typography sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
          Rating:
        </Typography>
        <Rating
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
          size="large"
          sx={{
            color: "black", // Чорні зірки
            "& .MuiRating-iconEmpty": { color: "rgba(0,0,0,0.2)" },
          }}
        />
      </Box>

      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder="Share your thoughts about this piece..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={isLoading}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": { borderRadius: 0 }, // Квадратні кути
        }}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 0 }}>
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{
          borderRadius: 0,
          bgcolor: "black",
          color: "white",
          fontWeight: "bold",
          px: 5,
          py: 1.5,
          textTransform: "uppercase",
          "&:hover": { bgcolor: "#bdbdbd" },
        }}
      >
        {isLoading ? "Submitting..." : "Submit Review"}
      </Button>
    </Box>
  );
};
