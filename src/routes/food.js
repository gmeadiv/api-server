'use strict';

const { food } = require('../models/index.js');

async function findFood(request, response) {

  const id = parseInt(request.params.id);

  try {

    const foundFood = await food.findOne({ where: { id } });
    console.log(foundFood);

    if (foundFood === null) {

      response.status(500).send('NO FOOD FOUND');
      console.log('NO FOOD FOUND');
    } else {

      response.send(foundFood);
      console.log(foundFood);
    }

  } catch (error) {

    response.status(400).send('FIND FOOD ERROR'); 
    console.log('NO FOOD FOUND'); 
  }

}

async function postFood(request, response) {

  try {

    const foodInfo = request.body;
    const newFood = await food.create(foodInfo);

    response.send(newFood);

  } catch (error) {

    response.status(400).send('POST FOOD ERROR'); 
    console.log(error, 'POST FOOD ERROR'); 
  }
}

async function deleteFood(request, response) {

  const id = parseInt(request.params.id);

  try {

    const foundFood = await food.findOne({ where: { id } });

    food.destroy({ where: { id } });

    console.log(foundFood, 'FOOD DESTROYED');
    response.status(200).send(200);

  } catch (error) {

    response.status(400).send('DELETE FOOD ERROR'); 
    console.log('NO FOOD FOUND'); 
  }

}

async function putFood(request, response) {

  const id = parseInt(request.params.id);
  const info = request.body;

  try {

    await food.update(

      {
        type: info.type,
        calories: info.calories,
      },
      {
        where: {id},
      });

    const foundFood = await food.findOne({ where: { id } });
    response.send(foundFood);
    
  } catch (error) {

    response.status(400).send('PUT FOOD ERROR');
    console.log('PUT FOOD ERROR');

  }
}

module.exports = { postFood, deleteFood, findFood, putFood };