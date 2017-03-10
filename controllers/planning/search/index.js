const router = require('express').Router();
const controller = require('./controller');

router.post('/by-ingredients', controller.byIngredients);
router.get('/recipes/:id', controller.recipe);

module.exports = router;