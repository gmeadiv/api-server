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

  // switch(method) {
  //   case 'GET':
  //     model.read(request.params.id);
  //     break;
  //   case 'POST':
  //     model.create(request.body);
  //     break;
  //   case 'PUT':
  //     model.update(request.params.id, request.body);
  //     break;
  //   case 'DELETE':
  //     model.delete(request.params.id);
  //     break;
  //   default:
  //     next('MODEL ROUTER ERROR');
  // }
});

router.get('/:model', async (request, response, next) => {
  const model = request.model;
  let records = await model.read();
  response.send(records);
});

router.get('/:model/:id', async (request, response, next) => {
  const model = request.model;
  let record = await model.read(request.params.id);
  response.send(record);
});

router.post('/:model', async (request, response, next) => {
  const model = request.model;
  const json = request.body;
  console.log(model, '<-- MODEL | JSON -->', json);
  let newRecord = await model.create(json);
  response.send(newRecord);
});

module.exports = router;

