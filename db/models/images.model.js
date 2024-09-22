const { Sequelize, DataTypes, Model } = require('sequelize');
const { TODO_TABLE } = require('./todoModel');

const IMAGES_TABLE = 'images';

const schemaImagesSeq = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  imageurl: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  todoid: {
    type: DataTypes.CHAR(36),
    allowNull: false,
    references: {
      model: TODO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
};

class Images extends Model {
  static associate(models) {
    this.belongsTo(models.todo, {
      foreignKey: 'todoid',
      as: 'todo'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: IMAGES_TABLE,

    };
  }
}

module.exports = { IMAGES_TABLE, Images, schemaImagesSeq };
