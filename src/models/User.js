const Sequelize = require("sequelize");
const connection = require("../database/databaseConfig");

const User = connection.define(
  "users",
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
        notNull: {
          msg: "Username must not be empty.",
        },
        len: {
          args: [6, 20],
          msg: "Username must have between 6 and 20 characters.",
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Users",
  }
);

User.sync({ force: true });
console.log("Table for User model was just (re)created!");

module.exports = User;
