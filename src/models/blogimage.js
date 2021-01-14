'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BlogImage.belongsTo(models.Blog, {
        foreignKey: 'blog_id',
        onDelete: "CASCADE"
      });
    }
  };
  BlogImage.init({
    url: DataTypes.STRING,
    description: DataTypes.TEXT,
    blog_id: {
      type: DataTypes.INTEGER,
      onDelete:"CASCADE",
      references:{
        model:'Blogs',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'BlogImage',
  });
  return BlogImage;
};