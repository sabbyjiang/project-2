const router = require('express').Router();
const controller = require('./controller');

router.get('/all', controller.findAll);
router.get('/preferences', controller.findByDiet);
router.get('/:id', controller.findOne);
router.get('/saved/:id', controller.findBySpoonacular);

module.exports = router;