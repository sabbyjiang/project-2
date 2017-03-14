const router = require('express').Router();
const controller = require('./controller');

// All routes here from ~/planning/search

router.get('/by-ingredients', controller.byIngredients);
router.get('/by-name', controller.byName);
router.get('/recipes/:id', controller.recipe);
router.get('/', controller.landing);

module.exports = router;