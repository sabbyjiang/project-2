const router = require('express').Router();
const controller = require('./controller');

// routes here are from ~/planning/user/recipes

router.get('/all', controller.findAll);
router.get('/preferences', controller.findByDiet);
router.get('/edit', controller.edit);
router.get('/:id', controller.findOne);
router.get('/saved/:id', controller.findBySpoonacular);

module.exports = router;