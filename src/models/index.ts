import { readdirSync } from "fs";
import { join, extname, basename as _basename } from "path";
import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/index";
const basename = _basename(__filename);
const db: { [key: string]: any } = {};

readdirSync(__dirname)
  .filter((file) => {
    return (
      file !== basename &&
      (extname(file) === ".ts" || extname(file) === ".js") &&
      !file.endsWith(".test.ts") &&
      !file.endsWith(".test.js")
    );
  })
  .forEach((file) => {
    const modelModule = require(join(__dirname, file));
    const model = modelModule.default(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
