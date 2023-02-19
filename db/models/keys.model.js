const { Sequelize, DataTypes, Model } = require('sequelize');

const KEYS_TABLE = 'keystable';

const schemaKeysSeq = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  p256dh: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  auth: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
};

class Keys extends Model {
  static associate(models) {
    this.hasOne(models.subscriptions, {
      foreignKey: 'keyid',
      as: 'keys'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: KEYS_TABLE,
    };
  }
}

module.exports = { KEYS_TABLE, Keys, schemaKeysSeq };
