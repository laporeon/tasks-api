const { DataTypes } = require("sequelize");
const connection = require("../config/databaseConfig");

const Task = connection.define(
  "Task",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  },
  {
    tableName: "tasks",
  }
);

module.exports = Task;
