const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

class Attendee extends Model {}

Attendee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "events",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Attendee",
  }
);

module.exports = Attendee;
