import { DataTypes, Model, Sequelize } from "sequelize";

export class Answer extends Model {
  declare label: string;
}

export const initModel = async (sequelize: Sequelize) => {
  Answer.init(
    {
      label: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize }
  );
};
