import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  const regionsQuiz = [
    {
      question: "question 1 about regions",
      answer: "answer 1 about regions",
    },
    {
      question: "question 2 about regions",
      answer: "answer 2 about regions",
    },
    {
      question: "question 3 about regions",
      answer: "answer 3 about regions",
    },
    {
      question: "question 4 about regions",
      answer: "answer 4 about regions",
    },
    {
      question: "question 5 about regions",
      answer: "answer 5 about regions",
    },
    {
      question: "question 6 about regions",
      answer: "answer 6 about regions",
    },
    {
      question: "question 7 about regions",
      answer: "answer 7 about regions",
    },
  ];

  const charactersQuiz = [
    {
      question: "question 1 about characters",
      answer: "answer 1 about characters",
    },
    {
      question: "question 2 about characters",
      answer: "answer 2 about characters",
    },
    {
      question: "question 3 about characters",
      answer: "answer 3 about characters",
    },
    {
      question: "question 4 about characters",
      answer: "answer 4 about characters",
    },
    {
      question: "question 5 about characters",
      answer: "answer 5 about characters",
    },
    {
      question: "question 6 about characters",
      answer: "answer 6 about characters",
    },
    {
      question: "question 7 about characters",
      answer: "answer 7 about characters",
    },
  ];

  const weaponsQuiz = [
    {
      question: "question 1 about weapons",
      answer: "answer 1 about weapons",
    },
    {
      question: "question 2 about weapons",
      answer: "answer 2 about weapons",
    },
    {
      question: "question 3 about weapons",
      answer: "answer 3 about weapons",
    },
    {
      question: "question 4 about weapons",
      answer: "answer 4 about weapons",
    },
    {
      question: "question 5 about weapons",
      answer: "answer 5 about weapons",
    },
    {
      question: "question 6 about weapons",
      answer: "answer 6 about weapons",
    },
    {
      question: "question 7 about weapons",
      answer: "answer 7 about weapons",
    },
  ];

  switch (params.id) {
    case "1":
      return {
        quizName: "regions",
        quiz: regionsQuiz,
      };
    case "2":
      return {
        quizName: "characters",
        quiz: charactersQuiz,
      };
    case "3":
      return {
        quizName: "weapons",
        quiz: weaponsQuiz,
      };
    default:
      error(404, "Quiz not found");
  }
};
