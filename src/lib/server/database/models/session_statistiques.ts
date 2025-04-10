import { Model, DataTypes, Sequelize } from "sequelize";

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
        type: DataTypes.STRING,
      },
      totalQuestions: {
        type: DataTypes.INTEGER,
      },
      score: {
        type: DataTypes.INTEGER,
      },
      duration: {
        type: DataTypes.INTEGER,
      },
    },
    { sequelize, modelName: "session_statistiques" }
  );
};
