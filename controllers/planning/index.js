const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/search', require('./search'));
router.get('/', (req, res) => {
    res.redirect('/planning/user');
})

module.exports = router;