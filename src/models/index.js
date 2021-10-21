'use strict';

require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');

const foodModel = require('./food.js');
const clothesModel = require('./clothes.js');

console.log(process.env.NODE_ENV, '<-- NODE_ENV -<<');

let DATABASE_URL = process.env.DATABASE_URL;

const sequelizeInstance = new Sequelize(DATABASE_URL);

const food = foodModel(sequelizeInstance, DataTypes);
const clothes = clothesModel(sequelizeInstance, DataTypes);

module.exports = {
  db: sequelizeInstance,
  clothes,
  food,
};