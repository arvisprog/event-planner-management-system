const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.associate = (models) => {
  User.hasMany(models.Attendee, { foreignKey: "userId" });
};

module.exports = User;
