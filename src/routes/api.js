'use strict';

const express = require('express');
const router = express.Router();
const { food, clothes } = require('../models');

const Collection = require('../models/lib/Collection.js');

const modelMap = {
  food: new Collection(food),
  clothes: new Collection(clothes),
};

router.use('/:model', (request, response, next) => {

  const model = modelMap[request.params.model];
  // const method = request.method;

  if (!model) {
    next('NO MODEL FOUND');
  }

  request.model = model;
  next();
});

// GETS EVERYTHING
router.get('/:model', async (request, response, next) => {
  const model = request.model;
  let records = await model.read();
  console.log(records, '<-- ALL RECORDS -<<');
  response.send(records);
});

// GETS ONE SINGLE THING
router.get('/:model/:id', async (request, response, next) => {
  const model = request.model;
  const id = +request.params.id;

  let record = await model.read(id);
  response.send(record);
});

// CREATES A THING
router.post('/:model', async (request, response, next) => {
  const model = request.model;
  const json = request.body;
  let newRecord = await model.create(json);
  response.send(newRecord);
});

// UPDATES A THING
router.put('/:model/:id', async (request, response, next) => {

  const model = request.model;
  const json = request.body;
  const id = request.params.id;

  try {

    let foundModel = await model.read(id);
    console.log(foundModel, '<-- FOUND MODEL -<<');

    let updatedModel = await foundModel.update(json);
    response.send(updatedModel);


  } catch (error) { console.log(error, '<-- UPDATE ERROR'); }

});

// DELETES A THING
router.delete('/:model/:id', async (request, response, next) => {
  const model = request.model;
  const id = +request.params.id;
  await model.delete(id);
  response.send('RECORD DESTROYED');
});

module.exports = router;

