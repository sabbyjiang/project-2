const router = require('express').Router();
const recipes = require('../../../models/recipes-model');

router.use('/meals', require('./meals'));
router.use('/recipes', require('./recipes'));
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