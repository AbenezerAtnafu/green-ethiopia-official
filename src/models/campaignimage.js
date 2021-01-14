'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CampaignImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CampaignImage.belongsTo(models.Campaign, {
        foreignKey: "camp_id",
        onDelete:"CASCADE"
      });
    }
  };
  CampaignImage.init({
    url: DataTypes.STRING,
    description: DataTypes.TEXT,
    camp_id: {
      type: DataTypes.INTEGER,
      onDelete:"CASCADE",
      references:{
        model:'Campaigns',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'CampaignImage',
  });
  return CampaignImage;
};