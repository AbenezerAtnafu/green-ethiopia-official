'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Campaign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Campaign.hasMany(models.CampaignImage, {
        foreignKey:"camp_id",
        as:'images'
      });
    }
  };
  Campaign.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    place: DataTypes.STRING,
    video_url: DataTypes.STRING,
    join_us_url: DataTypes.STRING,
    start_date: DataTypes.STRING,
    end_date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Campaign',
  });
  return Campaign;
};