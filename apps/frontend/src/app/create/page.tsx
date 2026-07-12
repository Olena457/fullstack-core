"use client";

import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { Plus, Save } from "lucide-react";
import { useCreateQuiz } from "../../hooks/useCreateQuiz";

export default function CreateQuizPage() {
  const { methods, append,onSubmit, isSubmitting } =
    useCreateQuiz();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Create New Quiz
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Quiz Title"
          variant="outlined"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          sx={{ mb: 4 }}
        />

        

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Plus />}
            onClick={() =>
              append({
                type: "INPUT",
                text: "",
                optionsRaw: "",
                correctAnswerRaw: "",
              })
            }
          >
            Add Question
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            startIcon={<Save />}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Quiz"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
