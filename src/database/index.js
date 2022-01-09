const { Sequelize } = require("sequelize");

const databaseConfig = require("../config/databaseConfig");

const User = require("../models/User");
const Task = require("../models/Task");

const connection = new Sequelize(databaseConfig);

const models = [User, Task];

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models)
);
