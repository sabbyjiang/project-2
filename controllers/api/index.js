const router = require('express').Router();

router.use('/meals', require('./meals'));
router.use('/recipes', require('./recipes'));

module.exports = router;