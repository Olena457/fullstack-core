
"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Rating,
  Tooltip,
  IconButton,
  alpha,
} from "@mui/material";
import { Trash2 } from "lucide-react";
import type { Review } from "../../types/review";

interface ReviewCardProps {
  review: Review;
  currentUserId?: string | null;
  onDelete?: (id: number) => void;
}

export const ReviewCard = ({
  review,
  currentUserId,
  onDelete,
}: ReviewCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const userName = review.user?.name || "Anonymous";
  const isLongText = review.text.length > 60;
  const isOwner = currentUserId === review.userId;

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        p: { xs: 2, sm: 3 },
        borderRadius: 0,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",

        "&::before, &::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          transition: "opacity 0.5s ease", 
        },

        "&::before": {
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0)} 60%)`,
          opacity: 1, 
        },

        "&::after": {
          background: (theme) =>
            `linear-gradient(315deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0)} 60%)`,
          opacity: 0, 
        },

        "&:hover, &:focus-within": {
          borderColor: "primary.main",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",

          "&::before": {
            opacity: 0,
          },
          "&::after": {
            opacity: 1,
          },
        },

        "& > *": {
          position: "relative",
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 1,
          gap: 2,
        }}
      >
        <Tooltip title={userName} placement="top" arrow>
          <Typography
            sx={{
              fontWeight: 900,
              textTransform: "uppercase",
              color: "text.primary",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: { xs: "140px", sm: "200px" },
            }}
          >
            {userName}
          </Typography>
        </Tooltip>

        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}
        >
          <Typography variant="caption" color="text.secondary">
            {new Date(review.createdAt).toLocaleDateString("uk-UA")}
          </Typography>

          {isOwner && onDelete && (
            <IconButton
              onClick={() => onDelete(review.id)}
              size="small"
              sx={{
                color: "text.secondary",
                p: 0.5,
                "&:hover": { color: "error.main" },
              }}
            >
              <Trash2 size={18} />
            </IconButton>
          )}
        </Box>
      </Box>

      <Rating
        value={review.rating}
        readOnly
        size="small"
        sx={{
          mb: 1.5,
          color: "#9e9e9e",
          "& .MuiRating-iconEmpty": {
            color: "#e0e0e0",
          },
        }}
      />

      <Box sx={{ mt: "auto" }}>
        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.6,
            color: "text.primary",
            fontSize: { xs: "0.875rem", sm: "1rem" },
            display: "-webkit-box",
            WebkitLineClamp: isExpanded ? "unset" : 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {review.text}
        </Typography>

        {isLongText && (
          <Typography
            component="button"
            onClick={() => setIsExpanded(!isExpanded)}
            sx={{
              background: "none",
              border: "none",
              padding: 0,
              marginTop: 1,
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "0.85rem",
              textDecoration: "underline",
              color: "text.secondary",
              transition: "color 0.2s ease",
              "&:hover": {
                color: "secondary.main",
              },
              "&:focus": { outline: "none" },
            }}
          >
            {isExpanded ? "Show less" : "Show more"}
          </Typography>
        )}
      </Box>
    </Box>
  );
};