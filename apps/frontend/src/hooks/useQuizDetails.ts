"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Question {
  id: number;
  type: "BOOLEAN" | "INPUT" | "CHECKBOX";
  text: string;
  options: string[];
}

interface QuizDetails {
  id: number;
  title: string;
  questions: Question[];
}

export const useQuizDetails = () => {
  const params = useParams();
  const id = params?.id;

  const [quiz, setQuiz] = useState<QuizDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchQuizDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/quizzes/${id}`);
        if (!response.ok) throw new Error("Quiz not found");
        const data = await response.json();
        setQuiz(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, [id]);

  return { quiz, loading, error };
};
