import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import { Quiz } from "$lib/server/database/models/quiz";

export const GET: RequestHandler = async ({ params }): Promise<Response> => {
  const result = await Quiz.findAll({
    where: {
      id: params.id,
    },
  });
  return json(result);
};

export const DELETE: RequestHandler = async ({ params }): Promise<Response> => {
  try {
    const result = await Quiz.destroy({ where: { id: params.id } });
    if (result) {
      return json({ message: "Quiz deleted with success" }, { status: 204 });
    } else {
      return json({ error: "No quiz founded with this id" }, { status: 400 });
    }
  } catch (error: unknown) {
    return json(error, { status: 500 });
  }
};
