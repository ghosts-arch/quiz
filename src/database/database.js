import { Sequelize } from "sequelize";
import { initModel } from "./models/session_statistiques.js";

export const initDatabase = () => {
  const sequelize = new Sequelize({
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    storage: "database.sqlite",
  });
  initModel(sequelize);
  sequelize.sync();
};
