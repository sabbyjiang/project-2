const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/search', require('./search'));
router.get('/', (req, res) => {
    res.render('index');
})

module.exports = router;