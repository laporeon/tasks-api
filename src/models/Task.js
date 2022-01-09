const { Sequelize, Model } = require("sequelize");

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        user_id: {
          type: Sequelize.UUID,
          defaultValue: "",
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
        },
        status: {
          type: Sequelize.STRING,
          defaultValue: "pending",
        },
      },
      { sequelize }
    );

    return this;
  }
  static associate(models) {
    this.belongsTo(models.User);
  }
}

module.exports = Task;
