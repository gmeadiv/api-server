'use strict';

const message = (sequelize, DataTypes) => sequelize.define('message', {
  words: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  channel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = message;