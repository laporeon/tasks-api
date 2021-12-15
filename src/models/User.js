const { hash } = require("bcrypt");
const { DataTypes } = require("sequelize");

const Task = require("../models/Task");

const connection = require("../config/databaseConfig");

const User = connection.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username already in use.",
      },
      validate: {
        len: {
          args: [6, 20],
          msg: "Username must have between 6 and 20 characters.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: "",
      validate: {
        len: {
          args: [8, 20],
          msg: "Password must have between 8 and 20 characters.",
        },
      },
    },
  },
  {
    tableName: "users",
    hooks: {
      async beforeSave(user) {
        if (user.password) user.password = await hash(user.password, 8);
      },
    },
  }
);

User.hasMany(Task, {
  foreignKey: "user_id",
});

module.exports = User;
