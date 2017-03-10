const router = require('express').Router();
const controller = require('./controller');

router.get('/all', controller.findAll);
router.post('/dish', controller.findByDish);
router.post('/by-meal', controller.findByMeal);

module.exports = router;