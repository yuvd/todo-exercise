import { Sequelize } from "sequelize";

const sqlUrl = "postgres://@localhost:5432/todo-db";
const sequelize = new Sequelize(sqlUrl);

export default sequelize;
