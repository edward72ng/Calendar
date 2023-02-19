const { Sequelize, DataTypes, Model } = require('sequelize');
const {KEYS_TABLE} = require('./keys.model')
const {USUARIOS_TABLE} = require('./usuariosModel')

const SUBSCRIPTIONS_TABLE = 'subscriptions';

const schemaSubscriptionsSeq = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  endpoint: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  expirationTime: {
    type: DataTypes.DATE,
    default: null
  },
  keyid: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: KEYS_TABLE,
      key: 'id'
    }
  },
  userid: {
    type:DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: USUARIOS_TABLE,
      key: 'uid'
    }
  }
};

class Subscriptions extends Model {
  static associate(models) {
    this.belongsTo(models.keystable, {
      foreignKey: 'keyid',
      as: 'keys'
    });

    this.belongsTo(models.usuarios, {
      foreignKey: 'userid',
      as: 'subscriptions'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: SUBSCRIPTIONS_TABLE
    };
  }
}

module.exports = { SUBSCRIPTIONS_TABLE, Subscriptions, schemaSubscriptionsSeq };
