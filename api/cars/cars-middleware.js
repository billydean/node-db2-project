const Cars = require('./cars-model');

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

    next();
  } catch (err) {
    next(err);
  }
}

const checkVinNumberUnique = (req, res, next) => {
  // if vin already in db
  // 400, { message: "vin <vin> already exists"}
  try {

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}