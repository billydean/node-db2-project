const Cars = require('./cars-model');
const vinValidator = require('vin-validator');
const db = require('../../data/db-config');

const checkCarId = async (req, res, next) => {
  // if no req.params.id,
    // returns status 404 with { message: "car with id <id> is not found"}
  try {
    const queryId = req.params.id;
    const car = await Cars.getById(req.params.id);
    if (!car) {
      next({ status: 404, message: `car with id ${queryId} is not found`})
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

const checkCarPayload = (req, res, next) => {
  // if any required field missing,
    // 400, {message: "<field name> is missing"}
    // required includes
      // vin
      // make
      // model
      // mileage
  const error = { status: 400 };
  const { vin, make, model, mileage } = req.body;
  if (!vin) {
    error.message = "vin is missing";
  } else if (!make) {
    error.message = "make is missing";
  } else if (!model) {
    error.message = "model is missing";
  } else if (!mileage) {
    error.message = "mileage is missing";
  }
  if (error.message) {
    next(error);
  } else {
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  // if vin invalid
  // 400, { message: "vin <vin> is invalid"}
  try {
  const vin = req.body.vin;
  let isValid = vinValidator.validate(vin);
  if (isValid) {
    next();
  } else {
    next({ status: 400, message: `vin ${vin} is invalid`})
  }
  } catch (err) {
    next(err);
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // if vin already in db
  // 400, { message: "vin <vin> already exists"}
  try {
    const already = await db('cars')
      .where('vin', req.body.vin)
      .first();
    if (already) {
      next({ status: 400, message: `vin ${req.body.vin} already exists` })
    } else {
      next();
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}