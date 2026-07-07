import * as yup from 'yup';

const questionSchema = yup
  .object({
    type: yup
      .string()
      .oneOf(['BOOLEAN', 'INPUT', 'CHECKBOX'], 'Invalid question type')
      .required('Question type is required'),
    text: yup.string().trim().required('Question text is required'),
    options: yup.array().of(yup.string().trim().required()).default([]),
    correctAnswer: yup
      .array()
      .of(yup.string().trim().required())
      .min(1, 'At least one correct answer is required')
      .required('Correct answer is required'),
  })
  .test('question-validation', 'Invalid question configuration', function (question) {
    if (!question) return false;

    const { type, options = [], correctAnswer = [] } = question;

    if (type === 'BOOLEAN') {
      if (correctAnswer.length !== 1) {
        return this.createError({
          path: `${this.path}.correctAnswer`,
          message: 'Boolean question must have exactly one correct answer (true or false)',
        });
      }
      if (!['true', 'false'].includes(correctAnswer[0])) {
        return this.createError({
          path: `${this.path}.correctAnswer`,
          message: 'Boolean correct answer must be "true" or "false"',
        });
      }
    }

    if (type === 'INPUT') {
      if (correctAnswer.length !== 1 || !correctAnswer[0]) {
        return this.createError({
          path: `${this.path}.correctAnswer`,
          message: 'Input question must have one non-empty correct answer',
        });
      }
    }

    if (type === 'CHECKBOX') {
      if (!options || options.length < 2) {
        return this.createError({
          path: `${this.path}.options`,
          message: 'Checkbox question must have at least 2 options',
        });
      }
      const invalidAnswers = correctAnswer.filter((answer) => !options.includes(answer));
      if (invalidAnswers.length > 0) {
        return this.createError({
          path: `${this.path}.correctAnswer`,
          message: 'Correct answers must be selected from the provided options',
        });
      }
    }

    return true;
  });

export const createQuizSchema = yup.object({
  title: yup.string().trim().required('Quiz title is required'),
  questions: yup
    .array()
    .of(questionSchema)
    .min(1, 'Quiz must have at least one question')
    .required('Questions are required'),
});

export type CreateQuizInput = yup.InferType<typeof createQuizSchema>;
