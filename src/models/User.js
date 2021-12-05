const { hash } = require("bcrypt");
const Sequelize = require("sequelize");
const connection = require("../database/databaseConfig");

const User = connection.define(
  "User",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
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
    password_hash: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    password: {
      type: Sequelize.VIRTUAL,
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
        if (user.password) user.password_hash = await hash(user.password, 8);
      },
    },
  }
);

User.sync({ force: true });
console.log("Table for User model was just (re)created!");

module.exports = User;
