import type { PageServerLoad } from "./$types";
import { Quiz } from "$lib/server/database/models/quiz";

export const load: PageServerLoad = async ({ params }) => {
  const quizs = await Quiz.findAll({
    attributes: ["name", "id"],
    raw: true,
  });
  return { quizs: quizs };
};
