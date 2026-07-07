import {
  Paper,
  Stack,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { Trash2 } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateQuizFormData } from "../chemas/quiz.schema";

interface QuestionItemProps {
  index: number;
  register: UseFormRegister<CreateQuizFormData>;
  errors: FieldErrors<CreateQuizFormData>;
  remove: (index: number) => void;
  canRemove: boolean;
  currentType: string;
}

export const QuestionItem = ({
  index,
  register,
  errors,
  remove,
  canRemove,
  currentType,
}: QuestionItemProps) => {
  return (
    <Paper elevation={3} sx={{ p: 3, position: "relative" }}>
      {canRemove && (
        <IconButton
          color="error"
          onClick={() => remove(index)}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <Trash2 size={20} />
        </IconButton>
      )}

      <Typography variant="h6" gutterBottom>
        Question {index + 1}
      </Typography>

      <Stack spacing={2}>
        <FormControl fullWidth>
          <InputLabel>Question Type</InputLabel>
          <Select
            label="Question Type"
            {...register(`questions.${index}.type` as const)}
            defaultValue="INPUT"
          >
            <MenuItem value="INPUT">Text Input</MenuItem>
            <MenuItem value="BOOLEAN">True / False</MenuItem>
            <MenuItem value="CHECKBOX">Checkbox (Multiple Options)</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Question Text"
          {...register(`questions.${index}.text` as const)}
          error={!!errors.questions?.[index]?.text}
          helperText={errors.questions?.[index]?.text?.message}
        />

        {currentType === "CHECKBOX" && (
          <TextField
            fullWidth
            label="Options (comma separated, e.g. Apple, Banana, Orange)"
            {...register(`questions.${index}.optionsRaw` as const)}
            error={!!errors.questions?.[index]?.optionsRaw}
            helperText={errors.questions?.[index]?.optionsRaw?.message}
          />
        )}

        <TextField
          fullWidth
          label={
            currentType === "BOOLEAN"
              ? 'Correct Answer (type "true" or "false")'
              : currentType === "CHECKBOX"
                ? "Correct Answers (comma separated)"
                : "Correct Answer"
          }
          {...register(`questions.${index}.correctAnswerRaw` as const)}
          error={!!errors.questions?.[index]?.correctAnswerRaw}
          helperText={errors.questions?.[index]?.correctAnswerRaw?.message}
        />
      </Stack>
    </Paper>
  );
};
