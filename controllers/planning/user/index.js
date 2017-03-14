const router = require('express').Router();
const recipes = require('../../../models/recipes-model');

// Routing here: ~/planning/user

// Routes to /meals
router.use('/meals', require('./meals'));

// Routes to /recipes
router.use('/recipes', require('./recipes'));

// Finds the most recent recipes from the user and renders it in the index page
router.get('/', (req, res) => {
    recipes.findSome(req.user.id)
        .then(data => {
            res.render('user/index', {recipes: data});
        })
        .catch(err => {
            console.log('Error: Find Some', err);
        });
})

module.exports = router;