"use client";

import { useQuizDetails } from "../../../hooks/useQuizDetails";
import {
  Box,
  Typography,
  Paper,
  Stack,
  CircularProgress,
  Button,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  TextField,
} from "@mui/material";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function QuizDetailPage() {
  const { quiz, loading, error } = useQuizDetails();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !quiz) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3, textAlign: "center" }}>
        <Typography color="error" variant="h6" gutterBottom>
          {error || "Quiz not found"}
        </Typography>
        <Button component={Link} href="/quizzes" startIcon={<ArrowLeft />}>
          Back to list
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Button
        component={Link}
        href="/quizzes"
        startIcon={<ArrowLeft size={18} />}
        sx={{ mb: 3 }}
      >
        Back to Quizzes
      </Button>

      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        {quiz.title}
      </Typography>

      <Stack spacing={3}>
        {quiz.questions.map((question, index) => (
          <Paper
            key={question.id}
            elevation={2}
            sx={{ p: 3, backgroundColor: "#fafafa" }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center", mb: 2 }} 
            >
              <Typography variant="h6" component="h2">
                Question {index + 1}
              </Typography>
              <Chip
                label={question.type}
                size="small"
                color="secondary"
                variant="outlined"
              />
            </Stack>

            <Typography variant="body1" sx={{ mb: 3, fontWeight: 500 }}>
              {question.text}
            </Typography>

            <Box sx={{ pointerEvents: "none", opacity: 0.8 }}>
              {question.type === "BOOLEAN" && (
                <RadioGroup row>
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="True"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="False"
                  />
                </RadioGroup>
              )}

              {question.type === "INPUT" && (
                <TextField
                  fullWidth
                  placeholder="User text answer will be here"
                  variant="outlined"
                  size="small"
                />
              )}

              {question.type === "CHECKBOX" && (
                <FormGroup>
                  {question.options.map((option, optIdx) => (
                    <FormControlLabel
                      key={optIdx}
                      control={<Checkbox />}
                      label={option}
                    />
                  ))}
                </FormGroup>
              )}
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
