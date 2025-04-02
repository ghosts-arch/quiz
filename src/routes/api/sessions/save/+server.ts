import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { SessionStatistiques } from "$lib/server/database/models/session_statistiques";
export const POST: RequestHandler = async ({ request }): Promise<Response> => {
  const { quizName, totalQuestions, score, duration } = await request.json();
  await SessionStatistiques.create({
    quizName: quizName,
    totalQuestions: totalQuestions,
    score: score,
    duration: duration,
  });
  return json(JSON.stringify({ message: "session saved with success" }), {
    status: 201,
  });
};
