const { Sequelize, DataTypes, Model } = require('sequelize');
const {USUARIOS_TABLE} = require('./usuariosModel')
const {COLORS_TABLE} = require('./color.models')

const TAGS_TABLE = 'tags';

const schemaTagsSeq = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  tag: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: 'rgba(217,217,214,255)'
  },
  colorid: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
        model: COLORS_TABLE,
        key: 'id'
      }
  },
  userid: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
        model: USUARIOS_TABLE,
        key: 'uid'
      }
  }
};

class Tags extends Model {
  static associate(models) {
    this.belongsToMany(models.todo,{
        through: models.todotags,
        foreignKey: 'tagid',
        otherKey: 'todoid',
        as: 'myTags'
    })

    this.belongsTo(models.colors,{
      as: 'myColor',
      foreignKey: 'colorid'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: TAGS_TABLE
    };
  }
}

module.exports = { TAGS_TABLE, Tags, schemaTagsSeq };
