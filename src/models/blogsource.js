'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogSource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BlogSource.belongsTo(models.Blog, {
        foreignKey:"blog_id",
        onDelete:"CASCADE"
      });
    }
  };
  BlogSource.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    source_description: DataTypes.TEXT,
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
    modelName: 'BlogSource',
  });
  return BlogSource;
};