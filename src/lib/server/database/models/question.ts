import { DataTypes, Model, Sequelize } from "sequelize";
import { Quiz } from "./quiz";
import type { Answer } from "./answer";
export class Question extends Model {
  declare id: number;
  declare label: string;
  declare answer: Answer;
}

export const initModel = (sequelize: Sequelize) => {
  Question.init(
    {
      label: {
        type: DataTypes.STRING,
      },
    },
    { sequelize, modelName: "question" }
  );
};
