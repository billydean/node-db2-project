const db = require('../../data/db-config')

const getAll = () => {
  return db('cars');
}

const getById = id => {
  // where id = id
  return db('cars').where('id', id).first();
}

const create = async car => {
  // insert car into 'cars'
  const [id] = await db('cars').insert(car);
  return getById(id)
}

module.exports = {
  getAll,
  getById,
  create
}