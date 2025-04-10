import { Sequelize } from "sequelize";
import { initModel } from "./models/session_statistiques.js";
import { readdir } from "node:fs/promises";
import path, { dirname } from "node:path";
import { Quiz } from "./models/quiz";
import { Question } from "./models/question";
import { Answer } from "./models/answer.js";

const loadModels = async (sequelize: Sequelize) => {
  const modelsFiles = await readdir("src/lib/server/database/models");
  const models = [];
  for (const model of modelsFiles) {
    if (!model.endsWith(".ts")) continue;
    /* @vite-ignore */
    const { initModel } = await import(`./models/${model.split(".")[0]}.ts`);
    models.push(initModel);
    await initModel(sequelize);
  }
  Quiz.hasMany(Question, { foreignKey: "quiz_id", as: "questions" });
  Question.belongsTo(Quiz, { foreignKey: "quiz_id" });
  Question.hasOne(Answer, { foreignKey: "question_id", as: "answer" });
  Answer.belongsTo(Question, { foreignKey: "question_id" });
};

export const initDatabase = async () => {
  const sequelize = new Sequelize({
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    storage: "database.sqlite",
  });
  await loadModels(sequelize);
  await sequelize.sync({ force: true });
};
