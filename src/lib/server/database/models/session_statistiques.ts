import { Model, STRING, INTEGER, Sequelize } from "sequelize";

export class SessionStatistiques extends Model {
  declare quizName: string;
  declare totalQuestions: number;
  declare score: number;
  declare duration: number;
  declare createdAt: Date;

  static async lastSessions(): Promise<SessionStatistiques[]> {
    return await SessionStatistiques.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
    });
  }
}

export const initModel = (sequelize: Sequelize) => {
  SessionStatistiques.init(
    {
      quizName: {
        type: STRING,
      },
      totalQuestions: {
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
  // console.log("SessionStatistiques model created");
};
