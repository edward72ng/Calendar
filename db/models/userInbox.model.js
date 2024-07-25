const { Sequelize, DataTypes, Model } = require('sequelize');
const { USUARIOS_TABLE} = require('./usuariosModel');
const { FOLDERS_TABLE } = require('./folders.model');

const USER_INBOX_TABLE = 'userinbox';

const schemaUserInbox = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  userid: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    references: {
      model: USUARIOS_TABLE,
      key: 'uid',
    },
  },
  folder_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    references: {
      model: FOLDERS_TABLE,
      key: 'id',
    },
  },
};

class UserInbox extends Model {
  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: USER_INBOX_TABLE,
    };
  }
}

module.exports = { USER_INBOX_TABLE, UserInbox, schemaUserInbox };
