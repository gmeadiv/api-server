'use strict';

const { clothes } = require('../models/index.js');

async function findClothes(request, response) {

  const id = parseInt(request.params.id);

  try {

    const foundClothes = await clothes.findOne({ where: { id } });
    console.log(foundClothes);

    if (foundClothes === null) {
      response.status(500).send('NO CLOTHES FOUND');
      console.log('NO CLOTHES FOUND');
    } else {
      response.send(foundClothes);
      console.log(foundClothes);
    }

  } catch (error) {
    response.status(400).send('FIND CLOTHES ERROR'); 
    console.log('NO CLOTHES FOUND'); 
  }

}

async function postClothes(request, response) {

  try {

    const clothesInfo = request.body;
    const newClothes = await clothes.create(clothesInfo);

    response.send(newClothes);
  } catch (error) {
    response.status(400).send('POST CLOTHES ERROR'); 
    console.log('POST CLOTHES ERROR'); 
  }

}

async function deleteClothes(request, response) {

  const id = parseInt(request.params.id);

  try {

    const foundClothes = await clothes.findOne({ where: { id } });

    clothes.destroy({ where: { id } });

    console.log(foundClothes, 'CLOTHES DESTROYED');
    response.status(200).send(200);

  } catch (error) {
    response.status(400).send('DELETE CLOTHES ERROR'); 
    console.log('NO CLOTHES FOUND'); 
  }

}

async function putClothes(request, response) {

  const id = parseInt(request.params.id);
  const info = request.body;

  try {

    await clothes.update(

      {
        type: info.type,
        size: info.size,
      },
      {
        where: {id},
      });

    const foundClothes = await clothes.findOne({ where: { id } });
    response.send(foundClothes);
    
  } catch (error) {

    response.status(400).send('PUT CLOTHES ERROR');
    console.log('PUT CLOTHES ERROR');

  }
}

module.exports = { postClothes, deleteClothes, findClothes, putClothes };