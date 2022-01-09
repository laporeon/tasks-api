const { hash } = require("bcrypt");
const { Sequelize, Model } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
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
            msg: "Username is already registered.",
          },
          validate: {
            len: {
              args: [6, 20],
              msg: "Username must have between 6 and 20 characters.",
            },
            notEmpty: {
              args: true,
              msg: "Field USERNAME must not be empy.",
            },
          },
        },
        password: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [8, 20],
              msg: "Password must have between 8 and 20 characters.",
            },
            notEmpty: {
              args: true,
              msg: "Field PASSWORD must not be empy.",
            },
          },
        },
      },
      { sequelize }
    );
    this.addHook("beforeSave", async (user) => {
      if (user.password) user.password = await hash(user.password, 8);
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Task);
  }
}

module.exports = User;
