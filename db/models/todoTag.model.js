const { Sequelize, DataTypes, Model } = require('sequelize');
const {TODO_TABLE } = require('./todoModel')
const {TAGS_TABLE} = require('./tags.model')

const TODOTAGS_TABLE = 'todotags';

const schemaTodoTagsSeq = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  tagid: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
        model: TAGS_TABLE,
        key: 'id'
      }
  },
  todoid: {
    type:DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: TODO_TABLE,
      key: 'id'
    }
  }
};

class TodoTags extends Model {
  static associate(models) {
    
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: TODOTAGS_TABLE
    };
  }
}

module.exports = { TODOTAGS_TABLE, TodoTags, schemaTodoTagsSeq };
