const router = require('express').Router();

// all routes here are based in ~/planning

// uses the user router
router.use('/user', require('./user'));
// to search router
router.use('/search', require('./search'));
// Redirects any attempt on just ~/planning to the user page
router.get('/', (req, res) => {
    res.redirect('/planning/user');
})

module.exports = router;