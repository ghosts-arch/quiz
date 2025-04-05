import { Quiz } from "$lib/server/database/models/quiz";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const quizName = data.get("quizName");
    const createdQuiz = await Quiz.create({ name: quizName });
    redirect(303, `/quizs/edit/${createdQuiz.id}`);
  },
} satisfies Actions;
