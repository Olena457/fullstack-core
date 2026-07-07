import * as yup from "yup";

export const createQuizSchema = yup.object({
  title: yup.string().trim().required("Quiz title is required"),
  questions: yup
    .array()
    .of(
      yup.object({
        type: yup.string().oneOf(["BOOLEAN", "INPUT", "CHECKBOX"]).required(),
        text: yup.string().trim().required("Question text is required"),
        optionsRaw: yup.string().when("type", {
          is: "CHECKBOX",
          then: (schema) =>
            schema.required("Enter options separated by commas"),
          otherwise: (schema) => schema.notRequired(),
        }),
        correctAnswerRaw: yup.string().required("Correct answer is required"),
      }),
    )
    .min(1, "Add at least one question")
    .required(),
});

export type CreateQuizFormData = yup.InferType<typeof createQuizSchema>;
