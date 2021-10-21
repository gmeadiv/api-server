'use strict';

const message = (sequelize, DataTypes) => sequelize.define('message', {
  words: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  channels: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = message;