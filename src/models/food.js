'use strict';

const Food = (sequelize, DataTypes) => sequelize.define('FoodItem', {

  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  calories: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  
});

module.exports = Food;