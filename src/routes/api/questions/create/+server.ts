import { Answer } from "$lib/server/database/models/answer";
import { Question } from "$lib/server/database/models/question";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({
  request,
  params,
}): Promise<Response> => {
  const { quizId, questionLabel, answerLabel } = await request.json();
  const createdQuestion = await Question.create({
    label: questionLabel,
    quiz_id: quizId,
  });
  await Answer.create({
    label: answerLabel,
    question_id: createdQuestion.id,
  });
  const updatedQuestion = await Question.findAll({
    where: {
      quiz_id: quizId,
    },
    attributes: ["label"],
    include: [
      {
        model: Answer,
        as: "answer",
        attributes: [["label", "answer_label"]],
      },
    ],
  });
  console.log(updatedQuestion);
  return json(JSON.stringify({ message: "Question created with success" }), {
    status: 201,
  });
};
