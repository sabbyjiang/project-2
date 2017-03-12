const router = require('express').Router();
const recipes = require('../../../models/recipes-model');

router.use('/meals', require('./meals'));
router.use('/recipes', require('./recipes'));
router.get('/', (req, res) => {
    recipes.findSome(req.user.id)
        .then(data => {
                res.render('landing', {recipes: data, none: 'Oops! It seems that you have no saved recipes yet!'});
        })
        .catch(err => {
            console.log('Error: Find Some', err);
        });
})

module.exports = router;