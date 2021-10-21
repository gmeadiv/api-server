'use strict';

const express = require('express');
const { food, clothes } = require('./models');

const app = express();

const apirouter = require('./routes/api.js');

const PORT = process.env.PORT;

const logger = require('./middleware/logger.js');
const validator = require('./middleware/validator.js');
const error404 = require('./error-handlers/404.js');
const error500 = require('./error-handlers/500.js');
const handleFoodFunctions = require('./routes/food.js');
const handleClothesFunctions = require('./routes/clothes.js');

app.use(express.json());
app.use(logger);
// app.use(validator);
app.use('/api', apirouter);

// GETS ALL ITEMS
app.get('/food', async (request, response) => {
  let recordData = await food.findAll();
  response.send(recordData);
});

app.get('/clothes', async (request, response) => {
  let recordData = await clothes.findAll();
  response.send(recordData);
});

// GETS ONE SINGLE ITEM
app.get('/food/:id', handleFoodFunctions.findFood);
app.get('/clothes/:id', handleClothesFunctions.findClothes);

// CREATES ITEM
app.post('/food', handleFoodFunctions.postFood);
app.post('/clothes', handleClothesFunctions.postClothes);

// FINDS AND DELETES ITEM
app.delete('/food/:id', handleFoodFunctions.deleteFood);
app.delete('/clothes/:id', handleClothesFunctions.deleteClothes);

// FINDS AND UPDATES ITEM
app.put('/food/:id', handleFoodFunctions.putFood);
app.put('/clothes/:id', handleClothesFunctions.putClothes);

app.use(error404);
// app.use(error500);

module.exports = {
  server: app,
  start: app.listen(PORT, () => {
    console.log('server is running on', PORT);
  }),
};