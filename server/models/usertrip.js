'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTrip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserTrip.belongsTo(models.Trip)
      UserTrip.belongsTo(models.User)
    }
  }
  UserTrip.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    UserId: DataTypes.INTEGER,
    TripId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'UserTrip',
  });
  return UserTrip;
};