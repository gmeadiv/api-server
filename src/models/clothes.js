'use strict';

const Clothes = (sequelize, DataTypes) => sequelize.define('Clothes', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.ENUM('s', 'm', 'l', 'xl'),
    allowNull: false,
  },
});

module.exports = Clothes;