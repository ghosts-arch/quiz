import { Model, Sequelize, DataTypes } from "sequelize";
import type { Question } from "./question";

export class Quiz extends Model {
  declare name: string;
  declare id: number;
  declare questions: Question[];
}

export const initModel = (sequelize: Sequelize) => {
  Quiz.init(
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "quiz",
    }
  );
};
