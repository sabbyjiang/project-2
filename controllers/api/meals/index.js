const router = require('express').Router();
const controller = require('./controller');

router.get('/all', controller.findAll);
router.post('/by-meal', controller.findByMeal);
router.post('/by-dish', controller.findByDish);
router.post('/new', controller.create);
router.delete('/:id', controller.delete);

module.exports = router;