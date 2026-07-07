"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface QuizListItem {
  id: number;
  title: string;
  questionCount: number;
  createdAt: string;
}

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const deleteQuiz = async (id: number) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;

    try {
      const response = await fetch(`http://localhost:4000/quizzes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete quiz");

      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
      toast.success("Quiz deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete quiz");
    }
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        // Виправлено: тепер точно 4000
        const response = await fetch("http://localhost:4000/quizzes");
        if (!response.ok) throw new Error("Failed to fetch quizzes");
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error(error);
        toast.error("Error loading quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return { quizzes, loading, deleteQuiz };
};
