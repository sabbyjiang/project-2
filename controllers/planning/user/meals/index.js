const router = require('express').Router();
const controller = require('./controller');

// all routes here from ~/planning/user/meals/

router.get('/all', controller.findAll);
router.get('/dish', controller.findByDish);
router.get('/by-meal', controller.findByMeal);
router.get('/', (req, res) => {
    res.redirect('/planning/user/meals/all');
})

module.exports = router;