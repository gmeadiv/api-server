'use strict';

class Collection {
  constructor(model) {
    this.model = model;
  }

  async read(id, options = {}) {
    try {

      let records = null;

      if (id) {
        options['where'] = {id};
        records = await this.model.findOne(options);
        console.log(records);
      } else {
        records = await this.model.findAll(options);
        console.log(records);
      }
    }
    catch (error) {console.log(error, '<-- READ ERROR');}
  }

  async create(json) {
    
    try {
      let record = await this.model.create(json);

      console.log(record);
    } catch (error) {console.log(error, '<-- CREATE ERROR');}

  } 

  async update(id, json) {
    try {
      let record = await this.model.findOne(id);
      let updatedRecord = await record.update(json);
      console.log(updatedRecord);
    } catch (error) {console.log(error, '<-- UPDATE ERROR');}
  }

  async delete(id) {
    try {
      let deleteRows = await this.model.destroy({where: {id}});
      console.log(deleteRows);
    } catch (error) {console.log(error, '<-- DELETE ERROR');}
  }
}

module.exports = Collection;