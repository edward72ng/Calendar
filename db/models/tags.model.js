const { Sequelize, DataTypes, Model } = require('sequelize');
const {USUARIOS_TABLE} = require('./usuariosModel')

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
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: TAGS_TABLE
    };
  }
}

module.exports = { TAGS_TABLE, Tags, schemaTagsSeq };
