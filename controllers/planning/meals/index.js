const router = require('express').Router();
const controller = require('./controller');

router.get('/', controller.findAll);
router.post('/dish', controller.findByDish);
router.post('/bymeal', controller.findByMeal);

module.exports = router;