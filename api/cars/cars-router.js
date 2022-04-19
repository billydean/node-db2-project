const router = require('express').Router();
const md = require('./cars-middleware')
const Cars = require('./cars-model');

router.get('/', async (req, res, next) => {
    try {
        const cars = await Cars.getAll();
        res.json(cars);
    } catch (err) {
        next(err);
    }
})

router.get('/:id', md.checkCarId, async (req, res, next) => {
    try {
        const car = await Cars.getById(req.params.id);
        res.json(car);
    } catch (err) {
        next(err);
    }
})

router.post('/', (req, res, next) => {
    try {

    } catch (err) {
        next(err);
    }
})

router.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
    })
})

module.exports = router;