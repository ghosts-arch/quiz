import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { QuizInformations } from "$lib/server/database/models/quiz";

export const GET: RequestHandler = async ({ request }): Promise<Response> => {
  const result = QuizInformations.findAll({
    attributes: ["quizName"],
  });
  return json(result);
};
