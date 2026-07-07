
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createQuizSchema, CreateQuizFormData } from "../chemas/quiz.schema";

export const useCreateQuiz = () => {
  const router = useRouter();

  const methods = useForm<CreateQuizFormData>({
    resolver: yupResolver(createQuizSchema),
    defaultValues: {
      title: "",
      questions: [
        { type: "INPUT", text: "", optionsRaw: "", correctAnswerRaw: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "questions",
  });

  const onSubmit = async (data: CreateQuizFormData) => {
    const formattedQuestions = data.questions.map((q) => ({
      type: q.type,
      text: q.text,
      options:
        q.type === "CHECKBOX"
          ? q.optionsRaw?.split(",").map((s) => s.trim()) || []
          : [],
      correctAnswer: q.correctAnswerRaw?.split(",").map((s) => s.trim()) || [],
    }));

    const payload = {
      title: data.title,
      questions: formattedQuestions,
    };

    try {
      const response = await fetch("http://localhost:4000/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to create quiz");

      toast.success("Quiz created successfully!");
      router.push("/quizzes");
    } catch (error) {
      toast.error("Error creating quiz. Check console.");
      console.error(error);
    }
  };

  return {
    methods, 
    fields,
    append,
    remove,
    onSubmit,
    isSubmitting: methods.formState.isSubmitting,
  };
};
