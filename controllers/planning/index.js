const router = require('express').Router();

// router.use('/meals', require('./meals'));
router.use('/recipes', require('./recipes'));
router.get('/', (req, res) => {
    res.render('index');
})

module.exports = router;