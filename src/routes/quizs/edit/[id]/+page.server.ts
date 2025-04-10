import { Answer } from "$lib/server/database/models/answer";
import { Question } from "$lib/server/database/models/question";
import { Quiz } from "$lib/server/database/models/quiz";
import { redirect, type Actions, type Load } from "@sveltejs/kit";

export const load: Load = async ({ params }) => {
  const quiz = await Quiz.findOne({
    where: {
      id: params.id,
    },
    attributes: ["name"],
    include: [
      {
        model: Question,
        as: "questions",
        attributes: ["label"],
        include: [
          {
            model: Answer,
            as: "answer",
            attributes: ["label"],
          },
        ],
      },
    ],
  });
  if (!quiz) {
    redirect(303, "/");
  }
  return {
    quiz: {
      name: quiz?.name,
      questions: quiz.questions
        .map((q) => {
          return {
            question: q.label,
            answer: q.answer.label,
          };
        })
        .flat(),
    },
  };
};

export const actions = {
  default: async ({ request, params, fetch }) => {
    const data = await request.formData();
    const questionLabel = data.get("question_label");
    const answerLabel = data.get("answer_label");
    const response = await fetch("/api/questions/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizId: params.id,
        questionLabel: questionLabel,
        answerLabel: answerLabel,
      }),
    });
    console.log(response);
    // console.log(updatedQuiz);

    // return { questions: questions };
  },
} satisfies Actions;
