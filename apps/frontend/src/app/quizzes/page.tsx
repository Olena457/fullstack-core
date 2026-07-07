"use client";

import { useQuizzes } from "../../hooks/useQuizzes";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  CircularProgress,
  Button,
  Stack,
} from "@mui/material";
import { Trash2, Eye, Plus } from "lucide-react";
import Link from "next/link";

export default function QuizzesListPage() {
  const { quizzes, loading, deleteQuiz } = useQuizzes();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 3 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Available Quizzes
        </Typography>
        <Button
          component={Link}
          href="/create"
          variant="contained"
          color="primary"
          startIcon={<Plus />}
        >
          Create Quiz
        </Button>
      </Stack>

      {quizzes.length === 0 ? (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 4, textAlign: "center" }}
        >
          No quizzes found. Be the first to create one!
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
          }}
        >
          {quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              elevation={2}
              sx={{
                position: "relative",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom noWrap>
                  {quiz.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Questions: {quiz.questionCount}
                </Typography>
              </CardContent>

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  p: 2,
                  borderTop: "1px solid #f0f0f0",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  component={Link}
                  href={`/quizzes/${quiz.id}`}
                  size="small"
                  startIcon={<Eye size={16} />}
                  variant="outlined"
                >
                  View Details
                </Button>
                <IconButton
                  color="error"
                  onClick={() => deleteQuiz(quiz.id)}
                  size="small"
                >
                  <Trash2 size={18} />
                </IconButton>
              </Stack>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
