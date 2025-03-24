import { Model, STRING, INTEGER } from "sequelize";

export class SessionStatistiques extends Model {}

export const initModel = (sequelize) => {
  SessionStatistiques.init(
    {
      quizName: {
        type: STRING,
      },
      total_questions: {
        type: INTEGER,
      },
      score: {
        type: INTEGER,
      },
      duration: {
        type: INTEGER,
      },
    },
    { sequelize, modelName: "session_statistiques" }
  );
  console.log("SessionStatistiques model created");
};
