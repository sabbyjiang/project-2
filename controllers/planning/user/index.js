const router = require('express').Router();
const AuthService = require('../../../services/auth');
const User = require('../../../models/user-model');
const passport = require('passport');

router.use('/meals', require('./meals'));
router.use('/recipes', require('./recipes'));
router.get('/', (req, res) => {
    res.render('index');
})

module.exports = router;