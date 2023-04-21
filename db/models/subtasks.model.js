const { Sequelize, DataTypes, Model } = require('sequelize');
const { TODO_TABLE } = require('./todoModel');

const SUBTASK_TABLE = 'subtask';

const schemaSubtaskSeq = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  details: {
    type: DataTypes.TEXT,
  },
  taskid: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: TODO_TABLE,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
};

class Subtask extends Model {
  static associate(models) {
   
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: SUBTASK_TABLE,
    };
  }
}

module.exports = { SUBTASK_TABLE, Subtask, schemaSubtaskSeq };
